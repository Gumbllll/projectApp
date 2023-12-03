export const getFlag = (string) => {
    const lowerString = string.toLowerCase();
    const flag = lowerString.split(" ").join("-");

    return flag;
};
