"use strict";

var _this = void 0;
var _require = require('./const'),
  ogr = _require.ogr;
/**
 * isClockWise - return true if the polygon is clockwise
 * @param {*} array 
 * @returns 
 */
var isClockWise = function isClockWise(array) {
  var sum = 0;
  var prev, cur;
  for (var i = 1; i < array.length; i++) {
    prev = cur || array[0];
    cur = array[i];
    sum += (cur[0] - prev[0]) * (cur[1] + prev[1]);
  }
  return sum > 0;
};

/**
 * polyReduce - reduce the array of polygons into an array of arrays of polygons
 * @param {*} a 
 * @param {*} b 
 * @returns 
 */
var polyReduce = function polyReduce(a, b) {
  if (isClockWise(b) || !a.length) {
    a.push([b]);
  } else {
    a[a.length - 1].push(b);
  }
  return a;
};
var readGeometry = function readGeometry(tran) {
  var num = _this.headers.shpCode;
  num = num > 20 ? num - 20 : num;
  if (!(num in shpFuncObj)) {
    throw new Error('I don\'t know that shp type');
  }
  _this.parseFunc = _this[shpFuncObj[num]];
  _this.parseCoord = makeParseCoord(tran);
}; //end readGeometry

var makeParseCoord = function makeParseCoord(trans) {
  if (trans) {
    return function (data, offset) {
      var args = [data.readDoubleLE(offset), data.readDoubleLE(offset + 8)];
      return trans.inverse(args);
    };
  } else {
    return function (data, offset) {
      return [data.readDoubleLE(offset), data.readDoubleLE(offset + 8)];
    };
  }
};
var parseCoord = function parseCoord(data, offset) {
  return [data.readDoubleLE(offset), data.readDoubleLE(offset + 8)];
};
var parsePoint = function parsePoint(data) {
  return {
    type: 'Point',
    coordinates: parseCoord(data, 0)
  };
};
var parsePointArray = function parsePointArray(data, offset, num) {
  var out = [];
  var done = 0;
  while (done < num) {
    out.push(parseCoord(data, offset));
    offset += 16;
    done++;
  }
  return out;
};
var parseArrayGroup = function parseArrayGroup(data, offset, partOffset, num, tot) {
  var out = [];
  var done = 0;
  var curNum;
  var nextNum = 0;
  var pointNumber;
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
    offset += pointNumber << 4;
  }
  return out;
};
var parseMultiPoint = function parseMultiPoint(data) {
  var out = {};
  var num = data.readInt32LE(32, true);
  if (!num) {
    return null;
  }
  var mins = parseCoord(data, 0);
  var maxs = parseCoord(data, 16);
  var offset = 36;
  return {
    bbox: [mins[0], mins[1], maxs[0], maxs[1]],
    type: num === 1 ? 'Point' : 'MultiPoint',
    coordinates: num === 1 ? parseCoord(data, offset) : parsePointArray(data, offset, num)
  };
};
var parsePolyline = function parsePolyline(data) {
  var out = {};
  var numParts = data.readInt32LE(32);
  if (!numParts) {
    return null;
  }
  var mins = parseCoord(data, 0);
  var maxs = parseCoord(data, 16);
  out.bbox = [mins[0], mins[1], maxs[0], maxs[1]];
  var num = data.readInt32LE(36);
  var offset, partOffset;
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
};
var polyFuncs = function polyFuncs(out) {
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
var parsePolygon = function parsePolygon(data) {
  return polyFuncs(parsePolyline(data));
};

/**
 * parseFeature
 * @param {*} data 
 * @param {*} offset 
 * @returns 
 */
var parseFeature = function parseFeature(data, offset) {
  offset = offset || 0;
  var fid = data.readInt32BE(offset);
  var length = data.readInt32BE(offset + 4) << 1;
  var type = data.readInt32LE(offset + 8);
  var buff = data.slice(offset + 12, offset + length + 8); //why +8?

  var feature = {};
  if (type == ogr.GEOMETRY.Point) {
    feature = parsePoint(buff);
  } else if (type == ogr.GEOMETRY.MultiPoint) {
    feature = parseMultiPoint(buff);
  } else if (type == ogr.GEOMETRY.LineString) {
    feature = parsePolyline(buff);
  } else if (type == ogr.GEOMETRY.MultiLineString) {
    feature = parsePolyline(buff);
  } else if (type == ogr.GEOMETRY.Polygon) {
    feature = parsePolygon(buff);
  } else if (type == ogr.GEOMETRY.MultiPolygon) {
    feature = parsePolygon(buff);
  } else {
    feature = parsePolygon(buff);
  }
  //addidional info
  feature.id = fid;
  feature.length = length;
  return feature;
};

/**
 * parseFeatures
 * @param {*} data 
 * @returns a FeatureCollection (GeoJSON)
 */
var parseFeatures = function parseFeatures(data) {
  var offset = 0;
  var features = [];
  while (offset < data.length) {
    var geom = parseFeature(data, offset);
    var feature = {
      "id": geom.id,
      "type": "Feature",
      "geometry": geom,
      "properties": {}
    };
    features.push(feature);
    offset += geom.length + 8;
  }
  return features; //geojson
};
module.exports = {
  parseFeatures: parseFeatures,
  parseFeature: parseFeature
};