const express = require('express');
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors');
const config = require('./config');
require('./models').connect(config.dbUri);
const authCheck = require('./middleware/auth-check');
const authRoutes = require('./routes/auth');
const app = express();
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());

const localSignup = require('./passport/local-signup');
const localLogin = require('./passport/local-login');
passport.use('local-login', localLogin);
passport.use('local-signup', localSignup);
app.use('/auth', authRoutes);

app.listen(port, () => {
  console.log(`Server is running on port `+ port);
});
