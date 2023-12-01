// import { expect } from 'chai';
// import { readQix } from '../src/lib/readQix.js'
// import { readShx } from '../src/lib/readShx.js';
// import { parseFeatures } from '../src/lib/readShp.js';
// import fetch from 'node-fetch';

const expect = require('chai').expect;
const readShx = require('../src/lib/readShx.js').readShx;
const fetchFeatures = require('../src/lib/readFeatures.js').fetchFeatures;
const fetch = require('node-fetch');
const { readDbf, readRecord } = require('../src/lib/readDbf.js');
const { juststem } = require('../src/lib/filesystem.js');
const { fetchBig } = require('../src/lib/http.js');

describe("Cloud Optimized Shapefie", function(){

    //const fileshp = "http://localhost:4000/test/points.shp" 
    const fileshp = "http://localhost:4000/test/polygons.shp" 
    
    


    describe("read features test", function() {

        it("should read shp file and returning features...", async function(){

            // 42,6954446°  11,0009458° : 42,6961292°  11,0017836°
            // 42,6956298°  11,0011264° : 42,695801°  11,0013359°
            //let bbox = [ 6.947933560256047, 50.93524649574008, 6.948181808339482, 50.935330990035474]
            //let bbox = [6.947496935862917, 50.93142308123861, 6.948127164234398, 50.931920134983194]
            let bbox = [6.95366, 50.9255,    6.96621,  50.93576]
            console.log("bbox",bbox)
            let features = await fetchFeatures(fileshp)
            console.log("features:",features)

            expect(true).to.equal(true);

            
        })
    });

    // describe("read shx test", function() {

    //     it("should read shx file", async function(){

    //         let nodes = await readShx(fileshp)
    //         console.log(nodes)

    //         expect(nodes.length>0).to.equal(true);

    //     })

    // })

    // describe("read dbf test", function() {

    //     it("should read dbf file", async function(){

    //         let record = await readRecord(fileshp,2)
    //         console.log(record)
    //         expect(record!==undefined).to.equal(true);
    //     })

    // })

    


   

})