// Map about data from database into user-friendly format and in correct order
const mapAboutData = (aboutObjects, type) => {
    const unOrderedList = aboutObjects.map((aboutObj) => aboutObj.doc.name);
    const indices = aboutObjects.map((aboutObj) => aboutObj.doc.index);

    var list = [];
    for (var i = 0; i < indices.length; i++) {
        const index = indices[i];
        list[index] = unOrderedList[i];
    }
    return { [type + 's']: list }
}

module.exports = {
    mapAboutData
}