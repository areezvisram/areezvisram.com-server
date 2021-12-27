const mapAboutData = (aboutObjects) => {
    const list = aboutObjects.map((aboutObj) => aboutObj.doc.name);    
    return list;
}

module.exports = {
    mapAboutData
}