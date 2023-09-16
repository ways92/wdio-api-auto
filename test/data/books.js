require( "dotenv" ).config()
const { USER_ID } = process.env;

const validBodyPostBooks = {
  userId: USER_ID,
  collectionOfIsbns: [
    {
      isbn: ""
    }
  ]
}

const invalidBodyPostBooks = {
  userId: USER_ID,
  collectionOfIsbns: [
    {
      isbn: "qwerty"
    }
  ]
}


module.exports = {
    validBodyPostBooks,
    invalidBodyPostBooks
};