const app = require('express')();
const keys = require('./config/keys');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

mongoose.connect(
  keys.MONGO_URI,
  { useNewUrlParser: true }
);

require('./models/User');

require('./services/passport');

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.COOKIE_KEY]
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

require('./routes/authRoutes')(app);

app.get('/', (req, res) => {
  res.send('Bem vindo à API da ADMV. Acesse /login para se autenticar.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
