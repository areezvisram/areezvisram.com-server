const mapProjects = (projects) => {    
    const unOrderedList = projects.map((project) =>  {
        const { name, description, languages, github, external } = project.doc;
        return {
            name,
            description,
            languages,
            github,
            external
        }
    });        
    const indices = projects.map((project) => project.doc.index);
    
    var list = [];
    for(var i = 0; i < indices.length; i++) {
        const index = indices[i];
        list[index] = unOrderedList[i];
    };

    return list;    
}

module.exports = {
    mapProjects
}