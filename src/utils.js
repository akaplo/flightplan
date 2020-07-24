export const moveItemInArray = (input, from, to) => {
    const toReturn = input;
    toReturn.splice(to, 0, toReturn.splice(from, 1)[0]);
    return toReturn;
};
