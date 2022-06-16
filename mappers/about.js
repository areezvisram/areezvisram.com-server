// Map about data from database into user-friendly format and in correct order
const mapAboutSkillLanguageData = (aboutSkillLanguageObjects, type) => {
    const unOrderedList = aboutSkillLanguageObjects.map((aboutObj) => aboutObj.doc.name);
    const indices = aboutSkillLanguageObjects.map((aboutObj) => aboutObj.doc.index);

    var list = [];
    for (var i = 0; i < indices.length; i++) {
        const index = indices[i];
        list[index] = unOrderedList[i];
    }
    return { [type + 's']: list }
}

const mapAboutListData = (aboutListObjects) => {
    const list = aboutListObjects.map((aboutListObject) => {
        const { icon, sentence } = aboutListObject.doc;
        return {
            icon,
            sentence
        }
    });

    return { list: list };
}

module.exports = {
    mapAboutSkillLanguageData,
    mapAboutListData,
}