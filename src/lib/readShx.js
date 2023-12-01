// import { Buffer } from 'buffer'; // https://www.npmjs.com/package/buffer
// import fetch  from 'node-fetch';

const { Buffer } = require('buffer');
//const fetch = require('node-fetch');
const { fetchRange } = require('./http');
const { forceext } = require('./filesystem');


// Bytes 0-3: File Code (Hex value of 0x0000270A)
// Bytes 4-23: Unused/Reserved
// Bytes 24-27: File Length (in 16-bit words)
// Bytes 28-31: Version (Hex value of 0x00000000)
// Bytes 32-35: Shape Type (See the Shapefile specification for values)
// Bytes 36-67: Bounding Box (Min X, Min Y, Max X, Max Y)
// Bytes 68-83: Unused/Reserved

const headers = {
    "mode":"cors",
    "Access-Control-Allow-Origin":"*",
}

/**
 * readShx
 * @param {*} url 
 */
const readShx = async(url) =>{

    //fileshx = forceext(url.split("|")[0],"shx")
    let fileshx=forceext(url.split("|")[0], "shx")
    //const buff = await fetch(fileshx, headers).then(response => response.arrayBuffer()).then(buffer => Buffer.from(buffer))
    const buff = await fetchRange(fileshx)
    //console.log("==>",buff.byteLength)
    let fileLength = buff.readInt32BE(24)*2
    //console.log(">>>",fileLength)
    let fid = 0
    let nodes = {}
    let offset = 100
    while (offset<buff.byteLength) {
        let idx = buff.readInt32BE(offset)
        let feature_length = buff.readInt32BE(offset+4)
        //console.log(fid, idx, feature_length)
        nodes[fid] = ({
            fid: fid,
            offset: idx*2, //offset in bytes
            length: feature_length*2 
        })

        offset += 8
        fid+=1
    }

    return nodes
}

module.exports = { readShx }