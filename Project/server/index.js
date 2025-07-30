const express = require('express')
const app = express()
const cors = require('cors');
const ValidateContact = require('./utils/ValidateContact')
const customError = require('./utils/customError')
const mongoose = require('mongoose')
const Contact = require('./models/contact')
require('dotenv').config()
const wrapAsync = require('./utils/wrapAsync')
const Layout = require('./utils/Agenda/Layout')
const startAgenda = require('./utils/Agenda/agendaInit')
const CouponCodes = require('./models/couponCode')
const User = require('./models/user')
//Sessioning done 
const cookieParser = require('cookie-parser')
const session = require('express-session')
//Authorization dependencies 
const passport = require('passport')
const LocalStrategy = require('passport-local')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const ValidateUser = require('./utils/ValidateUser')
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
let port = 3000
app.use(cors({
  origin: 'http://192.168.1.31:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/Internship');
  console.log('Connected to mongodb!')
}

app.use(cookieParser("Secret-code"))
app.use(session({
  secret: 'YemeraSecretHai',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false, // set to true only if using HTTPS
    httpOnly: true,
    sameSite: 'lax'
  }
}))
//Passport requirements
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://192.168.1.31:5173/auth/google/callback"
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if user already exists
    let existingUser = await User.findOne({ googleId: profile.id });

    if (existingUser) return done(null, existingUser);

    // Otherwise, create a new user
    const newUser = new User({
      googleId: profile.id,
      email: profile.emails[0].value,
      username: profile.displayName // optional
    });

    await newUser.save();
    done(null, newUser);
  } catch (err) {
    done(err);
  }
}));

userValidation = (req, res, next) => {
  const response = ValidateUser.validate(req.body)
  if (response.error) {
    throw new customError(400, response.error.details[0].message)
  } else next()
}
//Explicitly called session checking router handler to help create server to make client create a session id
app.get('/session-check', (req, res) => {
  req.session.greeting = 'Welcome, Akshay!';
  res.send('Session initialized');
});
//Starting main function
main()
startAgenda()
const ContactValidation = (req, res, next) => {
  const response = ValidateContact.validate(req.body)
  if (response.error) {
    throw new customError(400, response.error.details[0].message)
  }
  else next()
}

function generateOTP() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
app.post('/addContact', ContactValidation, wrapAsync(async (req, res) => {
  const { email, code } = req.body;

  const coupon = await CouponCodes.findOne({ code });
  if (!coupon) {
    return res.status(400).send({ error: 'Coupon Code not found' });
  }

  let contact = await Contact.findOne({ email });

  const otp = generateOTP();

    contact = new Contact({ email, otp, coupon: coupon._id });  

  await contact.save();
  await Layout(email, "One Time Password for verification", "New User",
    `Your One Time Password is:<br/><strong>${otp}</strong><br/><br/>Don't share this code.`);

  const populatedContact = await Contact.findById(contact._id).populate('coupon');
  res.status(200).send(populatedContact);
}));
app.get('/', (req, res) => {
  res.send('working')
})
app.get('/checkOtp/:id', wrapAsync(async (req, res) => {
  let { userotp, email } = req.query
  const { id } = req.params
  let user = await Contact.findById(id)
  if (!user) return res.status(404).send({ error: 'User not found' });
  if (user.otp === userotp) {
    res.send(`Validation successful`)
    user.otp = null
    await user.save()

  } else {
    res.status(404).send({ error: `OTP not valid! Authentication unsuccessfull` })
  }
}))
app.post('/resendOtp', wrapAsync(async (req, res) => {
  const { id, email } = req.body;
  const user = await Contact.findById(id);
  if (!user || user.email !== email) {
    return res.status(404).send({ error: 'User not found or email mismatch' });
  }
  const newOtp = generateOTP();
  user.otp = newOtp;
  await user.save();

  await Layout(
    email,
    'Resent OTP for verification',
    'Rockford User',
    `Your new OTP is:<br/><br/><strong>${newOtp}</strong><br/><br/>Please verify and do not share this code.`
  );

  res.send({ message: 'New OTP sent successfully' });
}));
app.post('/saveContact/:id', wrapAsync(async (req, res) => {
  console.log(req.body)
  const obj = req.body
  const { id } = req.params
  const contact = await Contact.findById(id)
  contact.set(obj);
}))

app.post('/furtherDetails', wrapAsync(async (req, res) => {
  const { email, ...updateFields } = req.body;

  if (!email) return res.status(400).send({ error: 'Email is required to identify user.' });

  const contact = await Contact.findOne({ email });
  if (!contact) return res.status(404).send({ error: 'Contact not found.' });

  // Apply updates
  contact.set(updateFields);
  await contact.save();

  const updatedContact = await Contact.findById(contact._id).populate('coupon');
  res.send(updatedContact);
}));


app.post('/signup', userValidation, wrapAsync(async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const user = new User({ email, username });
    await User.register(user, password);

    req.login(user, (err) => {
      if (err) {
        console.log('[ERROR] req.login failed:', err);
        return next(err);
      }
      console.log('[SUCCESS] User signed up & logged in:', req.user);
      console.log('[SESSION]', req.session);
      res.send({ message: 'User signed up successfully', user: req.user });
    });
  } catch (err) {
    console.log('[ERROR] Signup exception:', err);
    res.status(500).send({ error: err.message });
  }
}));
//Login route
app.post('/login', userValidation, (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err || !user) {
      console.log('[ERROR] Login failed:', err || info);
      return res.status(401).send({ error: 'Login failed' });
    }
    req.login(user, (loginErr) => {
      if (loginErr) {
        console.log('[ERROR] req.login failed:', loginErr);
        return next(loginErr);
      }
      console.log('[SUCCESS] User logged in:', req.user);
      console.log('[SESSION]', req.session);
      res.send({ message: 'Login successful', user: req.user });
    });
  })(req, res, next);
});
//Logout user 
app.get('/logout', (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        next(err)
      } else res.send('User logout successful!!')
    })
  } catch (err) {
    res.status(400).send(err)
  }
})


//GOOGLE AUTH ROUTES
// Trigger Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google OAuth callback
app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://192.168.1.31:5173/login'
  }),
  async (req, res) => {
    // ✔️ Email logic here — fires only on success
    await Layout(
      req.user.email,
      "Welcome to RockFord!",
      req.user.username || req.user.fullname,
      "We're thrilled to have you onboard via Google. Start browsing upcoming events and RSVP today."
    );

    // Then redirect
    res.redirect('http://192.168.1.31:5173/WinnersList');
  }
);




app.get('/WinnersList', wrapAsync(async (req, res) => {
  let list = await Contact.find({}).populate('coupon')
  res.send(list)
}))

app.get('/isAuthenticated',(req, res) => {
    if (req.isAuthenticated()) {
        res.send(req.user);
    } else {
        res.send('❌ Not authenticated');
    }
})

app.get('/findInfo', wrapAsync(async (req, res) => {
  let contacts = await Contact.find({}).populate('coupon');

  // 🛠 Normalize all coupon subdocs and ensure lowercase type values
  contacts = contacts.map(c => {
    if (c.coupon && typeof c.coupon.toObject === 'function') {
      const normalized = c.coupon.toObject();
      if (normalized.type) {
        normalized.type = normalized.type.toLowerCase();
      }
      c.coupon = normalized;
    }
    return c;
  });
let coupons = await CouponCodes.find({})

  let info = {};
  info.contactLength = contacts.length;

  // 🧾 Total coupons assigned
  info.totalCoupons = contacts.filter(c => c.coupon?.code).length;

  // 💸 Total cashback coupons redeemed
  info.couponLength = coupons.length

  // ⏳ Pending users with active OTPs
  info.pending = contacts.filter(c => c.otp !== null && c.otp !== undefined).length;

  res.send(info);
}));
app.use('/', (err, req, res, next) => {
  let { status = 400, message = 'Something Went wrong' } = err
  console.error(err.stack); // inside error middleware
  res.status(status).send(message)
})


app.listen(port, '0.0.0.0',() => { console.log(`App Running at port http://192.168.1.31:3000`), console.log(`Backend Dashboard running at http://localhost:5173/WinnersList 😉😉😉`) })