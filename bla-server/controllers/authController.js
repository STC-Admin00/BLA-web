const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const _ = require('lodash');
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SNDGRD_API_KEY);

const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password ) return res.status(400).json({ 'message': 'Email Address and Password are both required.'})

    const foundUser = await User.findOne({ email: email }).exec();
    if (!foundUser) return res.sendStatus(401);
// EVALUATE PASSWORD
    const match = await bcrypt.compare(password, foundUser.password);
    if (match) {
// REFERENCE ROLES
        const roles = Object.values(foundUser.roles).filter(Boolean);
// CREATE JWTs - ACCESS
        const accessToken = jwt.sign(
            {
                "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCSS_TKN_SCRT,
            { expiresIn: '30s'}
             );
// CREATE JWTs - REFRESH
            const refreshToken = jwt.sign(
                { "UserInfo": {
                    "email": foundUser.email,
                    "roles": roles
                } },
                process.env.RFRSH_TKN_SCRT,
                { expiresIn: '1h' }
            );
// SAVE REFRESH TOKEN TO CURRENT USER
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
            console.log(result)
            res.cookie('jwt', refreshToken, { httpOnly: true, sameSite: 'None', secure: true, maxAge: 24 * 60 * 60 * 1000 }); // secure: true,
            res.json({ foundUser, roles, accessToken });
    } else {
        res.sendStatus(401);
    }
}

const forgotPassword = async (req, res) => {
// VALIDATE USER EMAIL
    const { email } = req.body;
    if (!email) res.status(400).json({ 'message': 'Email Address and Password are both required.'});
// CREATE THE USER
    User.findOne({email}, (err, user) => {
        if (err || !user) {
            return res.status(400).json({error: "Email does not exist."})
        }

// IF VALID USER IS FOUND SEND 
   
    const token = jwt.sign({_id: User._id}, process.env.RST_PWD_KEY, {expiresIn: '15m'});
    const msg = {
        to: email,
        from: 'support@blacklitapp.com',
        subject: 'Password Assistance - Black Lit App',
        text: 'Please click on the link provided below to reset your password.',
        html: `<h2>Please click on the link provided below to reset your password.</h2>
                <p>${process.env.CLIENT_URL}/resetpassword/${token}</p>`    
    };       
    
    return user.updateOne({resetLink: token}, function(err, success) {
        if (err) {
        return res.status(400).json({ 'message': 'Email Address and Password are both required.'});
        } else {
        sgMail
        .send(msg, function (error, body) {
            if (error) {
                res.json({
                    error: err.message
                })
            }
            return res.json({message: "Email has been sent."})
        })
}
})
})
}

const resetPassword = async (req, res) => {
    const { resetLink, newPwd } = req.body;
    const safePass = await bcrypt.hash(newPwd, 15);
    if (resetLink) {
        jwt.verify(resetLink, process.env.RST_PWD_KEY, function(error, data) {
            if (error) {
                return res.status(401).json({
                    error: "Incorrect or expired token."
                })
            }
            User.findOne({resetLink}, (err, user) => {
                if (err || !user) {
                    return res.status(400).json({error: "This token does not exist."})
                }
                const msg = {
                    to: user.email,
                    from: 'support@blacklitapp.com',
                    subject: 'Password Assistance - Black Lit App',
                    text: 'Your password has been updated. Enjoy your reading!',
                    html: `<h2>Your password has been updated. Enjoy your reading!</h2>`    
                };
                const obj = {
                    password: safePass
                }
                sgMail
                .send(msg, function (error, body) {
                if (error) {
                res.json({
                    error: error.message
                })
                }
                return res.json({message: "Email has been sent."})
                })
                user = _.extend(user, obj);
                user.save((err, result) => {
                    if (err) {
                        return res.status(400).json({error: "Reset password error."})
                    } else {
                        return res.status(200).json({error: "Your password has been changed."})
                    }
                })
            })
        })
    } else {
        return res.status(401).json({error: "Authentication error."})
    } 
}



module.exports = { handleLogin, forgotPassword, resetPassword };