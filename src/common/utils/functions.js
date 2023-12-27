const isTrue = (value) => ["true",1,true].includes(value);

const removePropertyInObject = (target= {}, properties = [])=>{
    for (const item of properties) {
        delete target[item]
    }
    return JSON.parse(JSON.stringify(target));
}

module.exports = {
    isTrue, removePropertyInObject
}