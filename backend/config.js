// Example of a configuration file
module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/admin',
    TOKEN_SECRET: process.env.TOKEN_SECRET || 'defaultsecretkey',
  };
  