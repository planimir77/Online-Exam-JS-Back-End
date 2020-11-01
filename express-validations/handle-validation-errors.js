const { validationResult } = require('express-validator');

function handleValidationErrors(req, res, next) {
  const validationRes = validationResult(req);
  if (validationRes.isEmpty()) {

    return next();
  }
  let message = '';
  validationRes.errors.forEach(err => {
    message += err.msg + '. ';
  });
  console.log(validationRes.errors);
  
  res.render(req.url.substring(1), {errorMessage: message, ...req.body, })
}

module.exports = handleValidationErrors;