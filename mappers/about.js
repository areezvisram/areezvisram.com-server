const mapAboutData = (aboutObjects, type) => {
    const unOrderedList = aboutObjects.map((aboutObj) => aboutObj.doc.name);    
    const indices = aboutObjects.map((aboutObj) => aboutObj.doc.index);
    
    var list = [];
    for(var i = 0; i < indices.length; i++) {
        const index = indices[i];
        list[index] = unOrderedList[i];
    }
    console.log(list);
    return { [type + 's']: list }
}

module.exports = {
    mapAboutData
}