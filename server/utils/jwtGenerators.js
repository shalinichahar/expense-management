const jwt = require("jsonwebtoken");
require("dotenv").config(); // getting access to env variable

function jwtGenerator(user_id) {
  const payload = {
    user: user_id
  };
  
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

module.exports = jwtGenerator;


// {
//   "jwtToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiMjJlYTJhNGItZWUzMS00ZDM3LWE5OWEtZjdhNmM5MzNiZDY2IiwiaWF0IjoxNzA3Mzc5ODg4LCJleHAiOjE3MDczODM0ODh9.RjCSj2tHsNY84x6xsmcbleZIhW-Ecf2reK43kG0b7fE"
// }