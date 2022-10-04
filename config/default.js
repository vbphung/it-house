const dotenv = require("dotenv");

dotenv.config();

// config variables of `config` package
module.exports = {
  mongo: {
    uri: null,
  },
  firebase: {
    serviceAccount: null,
  },
  redis: {
    url: null,
  },
};
