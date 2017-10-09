if (process.env.NODE_ENV === 'production') {
  module.exports = require('./configureApi.prod');
} else {
  module.exports = require('./configureApi.dev');
}
