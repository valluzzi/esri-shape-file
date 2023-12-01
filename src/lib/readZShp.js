

const parseZPoint = (data) =>{
    const pointXY = parsePoint(data);
    pointXY.coordinates.push(data.readDoubleLE(16));
    return pointXY;
}

const parseZPointArray = (data, zOffset, num, coordinates) => {
    let i = 0;
    while (i < num) {
      coordinates[i].push(data.readDoubleLE(zOffset));
      i++;
      zOffset += 8;
    }
    return coordinates;
}

const parseZArrayGroup = (data, zOffset, num, coordinates) => {
    let i = 0;
    while (i < num) {
      coordinates[i] = parseZPointArray(data, zOffset, coordinates[i].length, coordinates[i]);
      zOffset += (coordinates[i].length << 3);
      i++;
    }
    return coordinates;
}


  
const parseZMultiPoint = (data) =>{
    const geoJson = parseMultiPoint(data);
    if (!geoJson) {
      return null;
    }
    let num;
    if (geoJson.type === 'Point') {
      geoJson.coordinates.push(data.readDoubleLE(72));
      return geoJson;
    } else {
      num = geoJson.coordinates.length;
    }
    const zOffset = 52 + (num << 4);
    geoJson.coordinates = parseZPointArray(data, zOffset, num, geoJson.coordinates);
    return geoJson;
}


const parseZPolyline = (data) => {
    const geoJson = parsePolyline(data);
    if (!geoJson) {
      return null;
    }
    const num = geoJson.coordinates.length;
    let zOffset;
    if (geoJson.type === 'LineString') {
      zOffset = 60 + (num << 4);
      geoJson.coordinates = parseZPointArray(data, zOffset, num, geoJson.coordinates);
      return geoJson;
    } else {
      const totalPoints = geoJson.coordinates.reduce( (a, v)=> {
        return a + v.length;
      }, 0);
      zOffset = 56 + (totalPoints << 4) + (num << 2);
      geoJson.coordinates = parseZArrayGroup(data, zOffset, num, geoJson.coordinates);
      return geoJson;
    }
}


const parseZPolygon = (data) => {
  return polyFuncs(parseZPolyline(data));
}

module.exports = { parseZPoint, parseZPointArray, parseZArrayGroup, parseZMultiPoint, parseZPolyline,  parseZPolygon  }