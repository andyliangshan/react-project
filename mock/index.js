'use strict';

module.exports = function(router) {
  router.get('/api/user/:id', (req, res) => {
    res.json({
      status: 0,
      data: {
        name: 'evan2x',
        avatar: 'https://avatars2.githubusercontent.com/u/10445139?v=3&s=460',
        email: 'evan2zaw@gmail.com',
        github: 'https://github.com/evan2x',
        id: req.params.id
      }
    });
  });

  router.get('/api/date', (req, res) => {
    res.json({
      status: 0,
      data: new Date()
    });
  });
}
