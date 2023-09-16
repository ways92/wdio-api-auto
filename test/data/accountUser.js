require( "dotenv" ).config()
const { USER, PASS, USER_ID} = process.env;

const userData = {
    userName: USER,
    password: PASS
};

const validUserId = {
    UserId: USER_ID
};

const invalidUserId = {
    UserId: "qwerty"
};

module.exports = {
  userData,
  validUserId,
  invalidUserId
};