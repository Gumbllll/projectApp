export const idGenerator = () => {
    return "id" + (Math.random() * 1e10).toString(16).slice(2);
}