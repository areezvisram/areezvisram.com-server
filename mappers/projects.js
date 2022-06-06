// Map project data from database into user-friendly format and in correct order
const mapProjects = (projects) => {
    const unOrderedList = projects.map((project) => {
        const { name, description, languages, github, external , image_url } = project.doc;
        return {
            name,
            description,
            languages,
            github,
            external,
            image_url
        }
    });
    const indices = projects.map((project) => project.doc.index);

    var list = [];
    for (var i = 0; i < indices.length; i++) {
        const index = indices[i];
        list[index] = unOrderedList[i];
    };

    return list;
}

module.exports = {
    mapProjects
}