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


module.exports = { fetchText, fetchRange }