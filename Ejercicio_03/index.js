const fs = require('fs');

// Load JSON object from file
fs.readFile('holding.json', 'utf-8', (err, data) => {
  if (err) throw err;
  
  let obj = JSON.parse(data);

  // Normalize JSON object
  let normalizedObj = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === 'object') {
      let subObj = {};
      for (const [subKey, subValue] of Object.entries(value)) {
        subObj[`${key}_${subKey}`] = subValue;
      }
      Object.assign(normalizedObj, subObj);
    } else {
      normalizedObj[key] = value;
    }
  }

  // Print normalized object
  console.log(normalizedObj);

  // Denormalize JSON object
  let denormalizedObj = {};
  for (const [key, value] of Object.entries(normalizedObj)) {
    let parts = key.split('_');
    if (parts.length > 1) {
      let subObjKey = parts.slice(0, -1).join('_');
      let subKey = parts[parts.length - 1];
      if (subObjKey in denormalizedObj) {
        denormalizedObj[subObjKey][subKey] = value;
      } else {
        denormalizedObj[subObjKey] = { [subKey]: value };
      }
    } else {
      denormalizedObj[key] = value;
    }
  }

  // Print denormalized object
  console.log(denormalizedObj);

  // Print length of original, normalized, and denormalized objects
  let originalLength = JSON.stringify(obj).length;
  let normalizedLength = JSON.stringify(normalizedObj).length;
  let denormalizedLength = JSON.stringify(denormalizedObj).length;
  console.log(`Original length: ${originalLength}`);
  console.log(`Normalized length: ${normalizedLength}`);
  console.log(`Denormalized length: ${denormalizedLength}`);

  // Print compression percentage
  let compressionPercentage = 100 - (normalizedLength / originalLength * 100);
  console.log(`Compression percentage: ${compressionPercentage.toFixed(2)}%`);
});