const mapExperienceData = (experienceObjects) => {    
    const unOrderedList = experienceObjects.map((experienceObject) =>  {
        const { company, position, startDate, endDate, description } = experienceObject.doc;
        return {
            company,
            position,
            startDate,
            endDate,
            description
        }
    });        
    const indices = experienceObjects.map((experienceObject) => experienceObject.doc.index);
    
    var list = [];
    for(var i = 0; i < indices.length; i++) {
        const index = indices[i];
        list[index] = unOrderedList[i];
    };

    return list;    
}

module.exports = {
    mapExperienceData
}