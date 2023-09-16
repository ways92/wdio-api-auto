const chai = require("chai");
const expect = require("chai").expect;
const chaiJsonSchema = require("chai-json-schema");
chai.use(chaiJsonSchema)
const { getToken } = require( "../helper/getToken" )
const { getIsbn } = require( "../helper/getIsbn" )
const { pathBooks } = require( "../pages/bookStore" )
const { validBodyPostBooks, invalidBodyPostBooks } = require( "../data/books" )
const requestApi = require( "../base/baseRequest" )
const schema = require( "../schema/books/booksSchema" )
const { validUserId, invalidUserId } = require( "../data/accountUser" )
let token, isbnNumber, headersEP;


before( async () => {
    token = await getToken()
    isbnNumber = await getIsbn()
} )

beforeEach( async () => {
    headersEP = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
    }
} )


describe( 'BookStore API Test', () => {
    
    it( 'Success delete list of Books', async () => {
        const response = await requestApi.delete( pathBooks )
            .query( validUserId )
            .set( headersEP );
        expect( response.statusCode ).to.equal( 204 );
    } )

    it( 'Failed delete list of Books with invalid UserId', async () => {
        const response = await requestApi.delete( pathBooks )
            .query( invalidUserId )
            .set( headersEP );
        expect( response.statusCode ).to.equal( 401 );
    } )

    it( 'Failed delete list of Books with unauthorized user', async () => {
        headersEP.Authorization=''
        const response = await requestApi.delete( pathBooks )
            .query( validUserId )
            .set( headersEP );
        expect( response.statusCode ).to.equal( 401 );
        expect( response.body.message ).to.equal( 'User not authorized!' );
        expect( response.body).to.be.jsonSchema(schema.invalidAddListBooksSchema)
    } )


    it( 'Success add list of Books', async () => {
        validBodyPostBooks.collectionOfIsbns[0].isbn = isbnNumber
        const response = await requestApi.post( pathBooks )
            .set( headersEP )
            .send( validBodyPostBooks );
        expect( response.statusCode ).to.equal( 201 );
        expect( response.body).to.be.jsonSchema(schema.validAddListBooksSchema)
    } )

    it( 'Failed add list Books with invalid isbn', async () => {
        const response = await requestApi.post( pathBooks )
            .set( headersEP )
            .send( invalidBodyPostBooks );
        expect( response.statusCode ).to.equal( 400 );
        expect( response.body).to.be.jsonSchema(schema.invalidAddListBooksSchema)
    } )

    it( 'Failed add list Books with unauthorized user', async () => {
        headersEP.Authorization=''
        const response = await requestApi.post( pathBooks )
            .set( headersEP )
            .send( invalidBodyPostBooks );
        expect( response.statusCode ).to.equal( 401 );
        expect( response.body.message ).to.equal( 'User not authorized!' );
        expect( response.body).to.be.jsonSchema(schema.invalidAddListBooksSchema)
    } )


} )