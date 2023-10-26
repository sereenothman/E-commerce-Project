const User=require("../models/users.models")
const session = require('express-session');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const generateToken=require("../jwt/generateToken")

class users{

    static login= (req, res) => {
        const { email, password } = req.body;
        User.findOne({ email, password })
            .then((user) => {
                if (!user) {
                    return res.status(404).json({ message: 'User not found' });
                }
                const token = generateToken(user);
                req.session.token = token;
                res.json({ message: 'User logged in', token });
            })
            .catch((error) => {
                res.status(500).json({ error: 'Failed to log in' });
            });
    
    }
    static register=(req, res) => {
        const { username, email, password  } = req.body;
        const user = new User({ username, email, password });
        user.save()
            .then((savedUser) => {
                const token = generateToken(savedUser);
                req.session.token = token;
                res.json({ message: 'User registered', token });
            })
            .catch((error) => {
                res.status(500).json(error);
            });
    }

    static logout=(req, res) => {
        delete req.session.token;
        res.json({ message: 'User logged out' });
      }
}
 



module.exports=users