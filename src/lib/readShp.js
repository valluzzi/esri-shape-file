
const { ogr } = require('./const');
/**
 * isClockWise - return true if the polygon is clockwise
 * @param {*} array 
 * @returns 
 */
const isClockWise = (array)=> {
  let sum = 0;
  let prev, cur;
  for (let i=1; i < array.length;i++) {
    prev = cur || array[0];
    cur = array[i];
    sum += ((cur[0] - prev[0]) * (cur[1] + prev[1]));
  }
  return sum > 0;
}

/**
 * polyReduce - reduce the array of polygons into an array of arrays of polygons
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
const polyReduce = (a, b) =>{
  if (isClockWise(b) || !a.length) {
    a.push([b]);
  } else {
    a[a.length - 1].push(b);
  }
  return a;
}

const readGeometry = (tran) =>{

    let num = this.headers.shpCode;
    num = (num > 20) ? num - 20 : num;
      
    if (!(num in shpFuncObj)) {
      throw new Error('I don\'t know that shp type');
    }
    this.parseFunc = this[shpFuncObj[num]];
    this.parseCoord = makeParseCoord(tran);
}//end readGeometry


const makeParseCoord = (trans) => {
  if (trans) {
    return function (data, offset) {
      const args = [data.readDoubleLE(offset), data.readDoubleLE(offset + 8)];
      return trans.inverse(args);
    };
  } else {
    return function (data, offset) {
      return [data.readDoubleLE(offset), data.readDoubleLE(offset + 8)];
    };
  }
}

const parseCoord = (data, offset) => {
  return [data.readDoubleLE(offset), data.readDoubleLE(offset + 8)];
}


const parsePoint = (data) => {
    return {
      type: 'Point',
      coordinates: parseCoord(data, 0)
    }
}


const parsePointArray = (data, offset, num) => {
    const out = [];
    let done = 0;
    while (done < num) {
      out.push(parseCoord(data, offset));
      offset += 16;
      done++;
    }
    return out;
}


const parseArrayGroup = (data, offset, partOffset, num, tot) => {
    const out = [];
    let done = 0;
    let curNum; let nextNum = 0;
    let pointNumber;
    while (done < num) {
      done++;
      partOffset += 4;
      curNum = nextNum;
      if (done === num) {
        nextNum = tot;
      } else {
        nextNum = data.readInt32LE(partOffset);
      }
      pointNumber = nextNum - curNum;
      if (!pointNumber) {
        continue;
      }
      out.push(parsePointArray(data, offset, pointNumber));
      offset += (pointNumber << 4);
    }
    return out;
}


const parseMultiPoint = (data) => {
    const out = {};
    const num = data.readInt32LE(32, true);
    if (!num) {
      return null;
    }
    const mins = parseCoord(data, 0);
    const maxs = parseCoord(data, 16);

    const offset = 36;

    return {
      bbox: [ mins[0], mins[1], maxs[0], maxs[1]],
      type: (num === 1) ? 'Point' : 'MultiPoint',
      coordinates: (num === 1) ? parseCoord(data, offset) : parsePointArray(data, offset, num)
    }
};
  

const parsePolyline = (data) =>{
    const out = {};
    const numParts = data.readInt32LE(32);
    if (!numParts) {
      return null;
    }
    const mins = parseCoord(data, 0);
    const maxs = parseCoord(data, 16);
    out.bbox = [mins[0], mins[1], maxs[0], maxs[1]];
    const num = data.readInt32LE(36);
    let offset, partOffset;
    if (numParts === 1) {
      out.type = 'LineString';
      offset = 44;
      out.coordinates = parsePointArray(data, offset, num);
    } else {
      out.type = 'MultiLineString';
      offset = 40 + (numParts << 2);
      partOffset = 40;
      out.coordinates = parseArrayGroup(data, offset, partOffset, numParts, num);
    }
    return out;
}
  

const polyFuncs = (out) => {
    if (!out) {
      return out;
    }
    if (out.type === 'LineString') {
      out.type = 'Polygon';
      out.coordinates = [out.coordinates];
      return out;
    } else {
      out.coordinates = out.coordinates.reduce(polyReduce, []);
      if (out.coordinates.length === 1) {
        out.type = 'Polygon';
        out.coordinates = out.coordinates[0];
        return out;
      } else {
        out.type = 'MultiPolygon';
        return out;
      }
    }
  };
  

const parsePolygon = (data) => {
  return polyFuncs(parsePolyline(data));
}



/**
 * parseFeature
 * @param {*} data 
 * @param {*} offset 
 * @returns 
 */
const parseFeature = (data, offset) => {

    offset = offset || 0;
    const fid = data.readInt32BE(offset);
    const length = data.readInt32BE(offset+4) << 1;
    const type = data.readInt32LE(offset+8);
    const buff = data.slice(offset+12, offset+length+8); //why +8?
    
    let feature = {}
    
    if (type == ogr.GEOMETRY.Point){
        feature = parsePoint(buff);
    }else if (type == ogr.GEOMETRY.MultiPoint ){
        feature = parseMultiPoint(buff);
    }else if (type == ogr.GEOMETRY.LineString){
        feature = parsePolyline(buff);
    }else if (type == ogr.GEOMETRY.MultiLineString ){
        feature = parsePolyline(buff);
    }else if (type == ogr.GEOMETRY.Polygon ){
        feature = parsePolygon(buff);
    }else if (type == ogr.GEOMETRY.MultiPolygon ){
        feature = parsePolygon(buff);
    }else {  
        feature = parsePolygon(buff);
    }
    //addidional info
    feature.id = fid;
    feature.length = length;
    return feature 
}

/**
 * parseFeatures
 * @param {*} data 
 * @returns a FeatureCollection (GeoJSON)
 */
const parseFeatures = (data) => {

    let offset = 0;
    const features = [];
    while (offset < data.length) {
        let geom = parseFeature(data, offset);
        let feature = {
          "id":geom.id,
          "type":"Feature",
          "geometry":geom,
          "properties":{}
        }
        features.push(feature);
        offset += geom.length + 8;
    }
    return features; //geojson
}

module.exports = { parseFeatures, parseFeature }