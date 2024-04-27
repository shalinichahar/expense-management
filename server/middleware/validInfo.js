module.exports = (req, res, next) => {
  const { email, name, password } = req.body;

function validEmail(userEmail) {
  return true;
}

  if (req.path === "/register") {
    // console.log(!email.length);
    if (![email, name, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");  // 401 - unauthenticated
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.json("Invalid Email");
    }
  }

  next();  // if everything's ok continue the route
};