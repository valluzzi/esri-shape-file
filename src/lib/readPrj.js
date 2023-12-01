const { forceext } = require('./filesystem');
const { fetchText } = require('./http');
/**
 * readHeader
 */
const GetSpatialRef = async(fileshp) =>{
    
    let fileprj = forceext(fileshp, 'prj')
    return await fetchText(fileprj)
    
}


module.exports = { GetSpatialRef }