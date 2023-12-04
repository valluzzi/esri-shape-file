"use strict";

var parseZPoint = function parseZPoint(data) {
  var pointXY = parsePoint(data);
  pointXY.coordinates.push(data.readDoubleLE(16));
  return pointXY;
};
var parseZPointArray = function parseZPointArray(data, zOffset, num, coordinates) {
  var i = 0;
  while (i < num) {
    coordinates[i].push(data.readDoubleLE(zOffset));
    i++;
    zOffset += 8;
  }
  return coordinates;
};
var parseZArrayGroup = function parseZArrayGroup(data, zOffset, num, coordinates) {
  var i = 0;
  while (i < num) {
    coordinates[i] = parseZPointArray(data, zOffset, coordinates[i].length, coordinates[i]);
    zOffset += coordinates[i].length << 3;
    i++;
  }
  return coordinates;
};
var parseZMultiPoint = function parseZMultiPoint(data) {
  var geoJson = parseMultiPoint(data);
  if (!geoJson) {
    return null;
  }
  var num;
  if (geoJson.type === 'Point') {
    geoJson.coordinates.push(data.readDoubleLE(72));
    return geoJson;
  } else {
    num = geoJson.coordinates.length;
  }
  var zOffset = 52 + (num << 4);
  geoJson.coordinates = parseZPointArray(data, zOffset, num, geoJson.coordinates);
  return geoJson;
};
var parseZPolyline = function parseZPolyline(data) {
  var geoJson = parsePolyline(data);
  if (!geoJson) {
    return null;
  }
  var num = geoJson.coordinates.length;
  var zOffset;
  if (geoJson.type === 'LineString') {
    zOffset = 60 + (num << 4);
    geoJson.coordinates = parseZPointArray(data, zOffset, num, geoJson.coordinates);
    return geoJson;
  } else {
    var totalPoints = geoJson.coordinates.reduce(function (a, v) {
      return a + v.length;
    }, 0);
    zOffset = 56 + (totalPoints << 4) + (num << 2);
    geoJson.coordinates = parseZArrayGroup(data, zOffset, num, geoJson.coordinates);
    return geoJson;
  }
};
var parseZPolygon = function parseZPolygon(data) {
  return polyFuncs(parseZPolyline(data));
};
module.exports = {
  parseZPoint: parseZPoint,
  parseZPointArray: parseZPointArray,
  parseZArrayGroup: parseZArrayGroup,
  parseZMultiPoint: parseZMultiPoint,
  parseZPolyline: parseZPolyline,
  parseZPolygon: parseZPolygon
};