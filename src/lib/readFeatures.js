const Buffer = require('buffer').Buffer;
const fetch = require('node-fetch');
const { readDbf } = require('./readDbf.js');
const { on } = require('events');
const fetchBigRange = require('./http.js').fetchBigRange;
const parseFeatures = require('./readShp.js').parseFeatures;



const __CACHE__ = {}
/**
 * fetchFeatures
 * @param {*} fileshp - url of the shp file with or without .shp extension
 * @param {*} bbox - bbox is optional, if not provided all features are returned
 * @returns features that are inside the bbox
 */
const fetchFeatures = async(fileshp, bbox, onlyshape) => {
    
    const features = await fetch(fileshp)
        .then(response => response.arrayBuffer())
        .then(buffer => buffer.slice(100)) //skip header
        .then(buffer => Buffer.from(buffer))
        .then(buffer => parseFeatures(buffer))

    // merge prperties from dbf file
    if (!onlyshape){
        await readDbf(fileshp).then(properties => {
            return properties.map((property, j) => {
                features[j].properties = property
            })
        })
    }

    //console.log(features)
    return {"type":"FeatureCollection","features":features}
}

module.exports = { fetchFeatures }