const iconv = require('iconv-lite');
const { StringDecoder } = require('string_decoder');
const { forceext } = require('./filesystem');
const { fetchText, fetchRange } = require('./http');


/**
 * createDecoder
 */
const createDecoder = (encoding)=> {
  
  const decoder = (buffer)=> {
    let out = iconv.decode(buffer, encoding);
    return out.replace(/\0/g, '').trim();
  }

  const defaultDecoder = (data)=> {
    let decoder = new StringDecoder();
    let out = decoder.write(data) + decoder.end();
    return out.replace(/\0/g, '').trim();
  }

  if (!encoding) {
    return defaultDecoder;
  }
  if (!iconv.encodingExists(encoding)) {
    if (encoding.length > 5 && iconv.encodingExists(encoding.slice(5))) {
      encoding = encoding.slice(5);
    } else {
      return defaultDecoder;
    }
  }
  return decoder;
}


/**
 * dbfHeader
 * @param {*} buffer 
 * @param {*} decoder 
 * @returns 
 */
const dbfHeader = (buffer, encoding) =>{
  
  const header = {

    lastUpdated:new Date(buffer.readUInt8(1) + 1900, buffer.readUInt8(2)+1, buffer.readUInt8(3)),
    records:buffer.readUInt32LE(4),
    headerLen:buffer.readUInt16LE(8),
    recLen:buffer.readUInt16LE(10),
    fields : [],
    decoder : createDecoder(encoding)
  }

  let offset = 32;
  while (offset < header.headerLen-1) {
    header.fields.push({
      name: header.decoder(buffer.slice(offset, offset + 11)),
      dtype: String.fromCharCode(buffer.readUInt8(offset + 11)),
      width: buffer.readUInt8(offset + 16),
      precision: buffer.readUInt8(offset + 17)
    });
    if (buffer.readUInt8(offset + 32) === 13) {
      break;
    } else {
      offset += 32;
    }
  }
  return header;
}

/**
 * parseValue
 */
const parseValue=(buffer, offset, length, dtype, decoder) =>{
  let data = buffer.slice(offset, offset + length);
  let textData = decoder(data);
  switch (dtype) {
    case 'N':
    case 'F':
    case 'O':
      return parseFloat(textData, 10);
    case 'D':
      return new Date(textData.slice(0, 4), parseInt(textData.slice(4, 6), 10) - 1, textData.slice(6, 8));
    case 'L':
      return textData.toLowerCase() === 'y' || textData.toLowerCase() === 't';
    default:
      return textData;
  }
}

/**
 * parseRow
 */
const parseRow = (buffer, offset, rowHeaders, decoder)=> {
  let record = {};
  for(let header of rowHeaders){
    let fieldValue = parseValue(buffer, offset, header.width, header.dtype, decoder);
    offset += header.width;
    if (typeof fieldValue !== 'undefined') {
      record[header.name] = fieldValue;
    }
  }
  return record;
}


const __CACHE__ = {}

/**
 * readHeader
 */
const readHeader = async(fileshp) =>{

  if (!__CACHE__[fileshp]){
    __CACHE__[fileshp] = true;
    let filecpg = forceext(fileshp, 'cpg')
    let filedbf = forceext(fileshp, 'dbf')  
    //let encoding = await fetch(filecpg).then(res => res.text()).then(text => text.trim());
    let encoding = await fetchText(filecpg).then(text => text.trim());
    
    console.log("encoding:", encoding)
    encoding = encoding || 'utf-8';
    let buffer = await fetchRange(filedbf, [0,1023])
    let header = dbfHeader(buffer, encoding);
    __CACHE__[fileshp] = header;
  }
  
  return __CACHE__[fileshp];
}


/**
 * readDbf
 */
const readDbf = async(fileshp) =>{

  let filecpg = forceext(fileshp, 'cpg')  
  let encoding = await fetchText(filecpg).then(text => text.trim());
  encoding = encoding || 'utf-8';

  let filedbf = forceext(fileshp, 'dbf')
  let buffer = await fetchRange(filedbf)

  let header = dbfHeader(buffer, encoding);
  //console.log(header)

  let offset  = ((header.fields.length + 1) << 5) + 2;
  let reccount = header.records;
  
  //console.log("offset:",offset)

  let out = [];
  for(let j=0; j<reccount; j++){
    let record = parseRow(buffer, offset, header.fields, header.decoder)
    out.push(record);
    offset += header.recLen;
  }
  return out;
};

const readRecord = async(fileshp, fid) =>{

  fid = fid || 0;
  let filedbf = forceext(fileshp, 'dbf')
  let header = await readHeader(fileshp);
  let offset  = ((header.fields.length + 1) << 5) + 2;
  offset += fid * header.recLen;

  let buffer = await fetchRange(filedbf, [offset, offset+header.recLen-1])

  return parseRow(buffer, 0, header.fields, header.decoder)
}


module.exports = { readDbf, readRecord }