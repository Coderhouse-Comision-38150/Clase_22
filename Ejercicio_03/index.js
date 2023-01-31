const fs = require('fs')

// Cargar el objeto JSON
fs.readFile('holding.json', 'utf-8', (err, data) => {
    if (err) throw err;

    let obj = JSON.parse(data);

    // Normalizar el objeto
    let normalizedObj =  {};
    for (const [key, value] of Object.entries(obj)){
        if(typeof value === 'Object') {
                let subObj = {};
            for (const [subKey, subValue] of Object.entries(value)){
                subObj[`${key}_${subKey}`] = subValue;
            }
            Object.assign(normalizedObj, subObj);
        } else {
            normalizedObj = value;
        }
    }

    // Imprimir el objeto normalizado
    console.log(normalizedObj)

    // Desnormalizar el objeto
    let desnormalizarObj = {};
    for(const [key, value] of Object.entries(normalizedObj)){
        let parts = key.split('_');
        if(parts.length > 1){
            let subObjKey = part.slice(0, -1).join('_');
            let subKey = parts[parts.length -1];
            if(subObjKey in desnormalizarObj) {
                desnormalizarObj[subObjKey][subKey] = value;
            } else {
                desnormalizarObj[subObjKey] = { [subKey]: value };
            } 
        } else {
            desnormalizarObj[key] = value
        }   
    }

    // Imprimir el objeto desnormalizado en pantalla
    console.log(desnormalizarObj)

    // Imprimir el largo del objeto original, normalizado y desnormalizado

    // Contamos el largo de nuestros objetos
    let originalLength = JSON.stringify(obj).length;
    let normalizedLength = JSON.stringify(normalizedObj).length;
    let desnormalizedLegth = JSON.stringify(desnormalizarObj).length;

    // Mostramos en consola
    console.log('Largo original: ', originalLength);
    console.log('Largo normalizado: ', normalizedLength);
    console.log('Largo desnormalizado: ', desnormalizedLegth)

    // Mostrar el porcentaje de compresión
    let compressionPercentage = 100 - (normalizedLength / originalLength * 100);
    console.log('Porcejante de compresión: ', compressionPercentage.toFixed(2));
})