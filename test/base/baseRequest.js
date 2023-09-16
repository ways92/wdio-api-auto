require( "dotenv" ).config()
const { BASE_URL } = process.env
const supertest = require( "supertest" );
const requestApi = supertest( BASE_URL )

module.exports = requestApi