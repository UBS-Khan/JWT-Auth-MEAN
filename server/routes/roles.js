import express from 'express';
import Role from '../models/Role.js'

const router = express.Router();

router.get('/create', async (req, res, next) => {
    try {
        if(req.body.role && req.body.role !== '') {
            const createRole = new Role(req.body);
            await createRole.save();
            return res.status(200).send('The Role has been created');
        } else {
            return res.status(400).send('Bad Request');
        }
    } catch (error) {
        return res.status('500', 'Internal Server Error');
    }
})

router.put('/update/:id', async (req, res, next) => {
    try {
        const role = await Role.findById({_id: req.params.id});
        if(role) {
            const updatedRole = await Role.findByIdAndUpdate(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            return res.status(200).send('The Role has been updated!');
        } else {
            return res.status(404).send('Role Not Found');
        }
    } catch (error) {
        return res.status(500, 'Internal Server Error');
    }
})

export default router;