const requestApi = require( "../base/baseRequest" )
const { userData } = require( "../data/accountUser" )
const { pathGenerateToken } = require( "../pages/account" )
const headers = {
        "Content-Type": "application/json",
    }

const getToken = async () => {
    const response = await requestApi.post( pathGenerateToken )
        .set(headers)
        .send(userData);
    return response.body.token;
};

module.exports = {
    getToken,
};