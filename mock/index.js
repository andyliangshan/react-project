'use strict';

module.exports = function(router) {
  router.get('/api/hello', (req, res) => {
    res.json({
      status: 0,
      data: 'Hi, this is an example.'
    });
  });
}
