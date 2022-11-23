const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {
  console.log(req.headers)

  if (!req.headers.authorization) {
    return res.status(401).send('Unauthorized');
  }

  try {
    const token = req.headers.authorization.split(' ')[1]
    const user = jwt.verify(token, 'jwt-secret')
    console.log(user);
  } catch (error) {
    console.log(error);
    return res.status(401).send('Unauthorized');
  }
  await next()
}

module.exports = auth;