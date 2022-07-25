const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys')

// CREATE OPTS ARRAY AND PASS ATTRIBUTES TO IT

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

// EXPORT THE PASSPORT MODULE

module.exports = passport => {

// EMPTY PASSPORT OBJECT WILL USE BELOW PARAMS WHICH HAVE BEEN PASSED IN
// TO "VALIDATE" THE PASSPORT. ONCE DONE, THE JWT_PAYLOAD IS CREATED AND PASSED
    passport.use(
        new JwtStrategy(opts, (jwt_payload, done) => {

// COMPARISON OF USER INPUT TO USER DB RECORD
            User.findById(jwt_payload.id)
                .then(user => {
        // IF USER INPUT IS VALID, PROCESS IS DONE, RETURN USER
                    if (user) {
                        return done(null, user);
                    }
        // IF USER INPUT IS INVALID, PROCESS WILL BE DENIED
                    return done(null, false);
                })
                .catch(err => console.log(err));
        })
    );
};