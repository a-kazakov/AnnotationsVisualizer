export function iterToArray(iterator) {
    let result = [];
    for (let e of iterator) {
        result.push(e);
    }
    return result;
}
