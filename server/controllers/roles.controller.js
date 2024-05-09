import Role from '../models/Role.js';

//region Create Role
export const createRole = async (req, res, next) => {
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
}

//region Read Roles
export const readRoles = async (req, res, next) => {
    try {
        const roles = await Role.find({});
        return res.status(200).send(roles);
    } catch (error) {
        return res.status(500, 'Internal Server Error');
    }
}

//region Update Role
export const updateRole = async (req, res, next) => {
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
}

//region Delete Role
export const deleteRole = async (req, res, next) => {
    try {
        const role = await Role.findById({_id: req.params.id});
        if(role) {
            const deletedRole = await Role.findByIdAndDelete(
                req.params.id,
                {$set: req.body},
                {new: true}
            );
            return res.status(200).send('The Role has been deleted!');
        } else {
            return res.status(404).send('Role Not Found');
        }
    } catch (error) {
        return res.status(500, 'Internal Server Error');
    }
}