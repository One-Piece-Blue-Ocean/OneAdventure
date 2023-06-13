const { chatToken } = require('../controller/index');

module.exports = (app) => {
  app.post('/chatToken', chatToken);
};
