function logErrors (err, req, res, next) {
  console.log('[logErrors]: ');
  console.error(err.stack);
  next(err);
}

function clientErrorHandler(err, req, res, next) {
  console.log('[clientErrorHandler]: ');
  if (req.xhr) {
    res.status(500).send({ error: 'Something failed!' });
  } else {
    next(err);
  }
}

function errorHandler(err, req, res, next) {
  console.log('[errorHandler]: ');
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).send({message:err.message});
  //res.render('error', { error: err });
}

const apiError = { logErrors, clientErrorHandler, errorHandler };

module.exports = apiError;