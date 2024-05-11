import bcrypt from 'bcryptjs';
import User from "../models/User.js";
import Role from "../models/Role.js";

export const registerUser = async (req, res, next) => {
    try {
        if(req.body) {
            const role = await Role.find({role: 'User'});
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt);

            const user = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                role: role
            })
            await user.save();
            return res.status(200).send('User has been created sucessfully!')
        } else {
            return res.status(400).send('Bad Request!');
        }
    } catch (error) {
        return res.status(500).send('Internal Server Error!');
    }
}

export const loginUser = async (req, res, next) => {
    try {
        if((req.body.username || req.body.email) && req.body.password) {
            const user = await User.findOne({username: req.body.username});
            if(user) {
                const hashedPassword = await bcrypt.compare(req.body.password, user.password);
                if(hashedPassword) {
                    return res.status(200).send('You\'ve been logged in sucessfully');
                } else {
                    return res.status(401).send('Username or Password is wrong');
                }
            } else {
                return res.status(404).send('User with follow username not found');
            }
        } else {
            return res.status(400).send('Enter Username or Password');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Internal Server Error!');
    }
}
