export const revisitedIsAddendSegmentNecessary = (pagination: number, length: number) => {
    return (length % pagination);
}


export const paginate = function <T>(items: T[], pagination: number,  addend: number = 0) {
    const pageNumber = Math.round(((items.length + addend) / pagination));
    const segments = [];

    for (let pageIndex = 0; pageIndex < pageNumber; pageIndex++) {
        segments.push(items.slice(pageIndex * pagination, ((pageIndex + 1) * pagination)));
    }
    return segments;
}

export const swap = (arr: Array<any>, indexOne: number, indexTwo: number) => {
    
}
