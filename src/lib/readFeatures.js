const Buffer = require('buffer').Buffer;
const fetch = require('node-fetch');
const fetchBigRange = require('./http.js').fetchBigRange;
const parseFeatures = require('./readShp.js').parseFeatures;



const __CACHE__ = {}
/**
 * fetchFeatures
 * @param {*} fileshp - url of the shp file with or without .shp extension
 * @param {*} bbox - bbox is optional, if not provided all features are returned
 * @returns features that are inside the bbox
 */
const fetchFeatures = async(fileshp, bbox) => {
    
    const features = await fetch(fileshp)
        .then(response => response.arrayBuffer())
        .then(buffer => buffer.slice(100)) //skip header
        .then(buffer => Buffer.from(buffer))
        .then(buffer => parseFeatures(buffer))

   
    //console.log(features)
    return {"type":"FeatureCollection","features":features}
}

module.exports = { fetchFeatures }