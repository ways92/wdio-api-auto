const requestApi = require( "../base/baseRequest" )
const { pathBooks } = require( "../pages/bookStore" )

const getIsbn = async () => {
    const response = await requestApi.get( pathBooks );
    return response.body.books[0].isbn;
};

module.exports = {
    getIsbn,
};