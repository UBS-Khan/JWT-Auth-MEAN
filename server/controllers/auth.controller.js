import bcrypt from 'bcryptjs';
import User from "../models/User.js";
import Role from '../models/Role.js';

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
