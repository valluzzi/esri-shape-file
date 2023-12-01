const Buffer = require('buffer').Buffer;
const fetch = require('node-fetch');

const fetchText = async(url) => {
    
    const params = {
        "mode": "cors",
        "Access-Control-Allow-Origin": "*"
    }

    return fetch(url, params)
        .then(response => response.text())
}

const fetchRange = async(url, range) => {

    const params = {
        "mode": "cors",
        "Access-Control-Allow-Origin": "*"
    }
    if (range!=undefined){
        const [start, end] = range
        params.headers = {Range: `bytes=${start}-${end}`}
    }
    //console.log("fetch...",url)
    let buff = await fetch(url, params)
        .then(response => response.arrayBuffer())
        .then(buffer => Buffer.from(buffer))

    //Intercept error
    let text = buff.toString("utf-8",0,64)
    //console.log(text)
    if (text.indexOf("<!DOCTYPE html>")>=0)
        return null
    if (text.indexOf("<title>Error</title>")>=0)
        return null 
    
    return buff 
}

/**
 * fetchBigRange
 * @param {*} url 
 * @param {*} bigrange 
 * @returns 
 */
const fetchBigRange = async(url, bigrange) => {

    let promises = []

    const [start, end] = bigrange
    let ranges = []
    let step = 4096*1024 // 4MB
    let j = start
    while(j+step<end){
        let range = [j, j+step-1]
        ranges.push(range)
        j = j+step
    } 
    if (j<end) ranges.push([j, end])
    // ---

    for(let range of ranges){
        let promise = fetchRange(url, range)
        promises.push(promise)
    }    
    let buffers = await Promise.all(promises)
    return Buffer.concat(buffers)
}


module.exports = { fetchText, fetchRange, fetchBigRange }