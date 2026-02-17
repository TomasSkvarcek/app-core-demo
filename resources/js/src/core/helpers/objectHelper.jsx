function isObjectEmpty(obj) {
    return (
        typeof obj === 'undefined' || obj === null
        ||
        (
            obj &&
            Object.keys(obj).length === 0 &&
            obj.constructor === Object
        )
    );
}

function findValueInObject(searchValue, object, objKey = 'key', objValueKey = 'value') {
    return object?.find(item => item[objKey] === searchValue)?.[objValueKey]
}

function hasPropertyLike(obj, propertyLike) {
    return Object.keys(obj).some(key => key.includes(propertyLike));
}

export {
    isObjectEmpty,
    findValueInObject,
    hasPropertyLike
}
