const { default: axios } = require("axios")

const getAddressDetail = async function(lat,log){
    let mapResult = await axios.get(`${process.env.MAP_API_URL}?lat=${lat}&lon=${log}`,{
        headers:{
            "x-api-key" : process.env.MAP_API_KEY
        }
    }).then(res => res.data);

    return {
        address: mapResult.address,
        province: mapResult.province,
        city: mapResult.city,
        district: mapResult.region
    }
}

module.exports = {
    getAddressDetail
}