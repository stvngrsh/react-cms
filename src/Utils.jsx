const arrayPush = (doc, array) => {
    let obj = doc.data();
    if(!obj.deleted) {
        obj.id = doc.id;
        array.push(obj);
    }
}

export {arrayPush};