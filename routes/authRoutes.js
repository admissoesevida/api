const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/github',
    passport.authenticate('github', { failureRedirect: '/login' })
  );

  app.post(
    '/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/');
    }
  );

  app.get('/auth/google/callback', passport.authenticate('google'));

  app.get('/auth/github/callback', passport.authenticate('github'));

  app.get('/auth/current_user', (req, res) => {
    res.send(req.user);
  });
};
