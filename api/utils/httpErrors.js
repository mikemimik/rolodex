'use strict';

class HTTPClientError extends Error {
  constructor (message) {
    if (message instanceof Object) {
      super(JSON.stringify(message));
    } else {
      super(message);
    }
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.statusCode = null;
  }
}
exports.HTTPClientError = HTTPClientError;

class HTTP400Error extends HTTPClientError {
  constructor (message = 'Bad Request') {
    super(message);
    this.statusCode = 400;
  }
}
exports.HTTP400Error = HTTP400Error;

class HTTP401Error extends HTTPClientError {
  constructor (message = 'Unauthorized') {
    super(message);
    this.statusCode = 401;
  }
}
exports.HTTP401Error = HTTP401Error;

class HTTP403Error extends HTTPClientError {
  constructor (message = 'Forbidden') {
    super(message);
    this.statusCode = 403;
  }
}
exports.HTTP403Error = HTTP403Error;

class HTTP404Error extends HTTPClientError {
  constructor (message = 'Not found') {
    super(message);
    this.statusCode = 404;
  }
}
exports.HTTP404Error = HTTP404Error;
