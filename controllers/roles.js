const Role = require('../models/roles');

exports.rolesList = async (req, res) => {
    try {
        const roles = await Role.find({});
        console.log(roles);

        if (!roles) {
            res.status(404).json({
                message: 'Aucun rôle trouvé',
            });
        }
        const listObject = JSON.parse(JSON.stringify(roles));
        res.status(200).send({
            data: listObject,
        });
    } catch (err) {
        res.status(500).json({
            err,
        });
    }
};

exports.roleNew = async (req, res) => {
    try {
        const role = new Role({ ...req.body });
        const createdRole = await role.save();
        const roleObject = JSON.parse(JSON.stringify(createdRole));
        res.status(201).json(roleObject);
    } catch (err) {
        res.status(400).json({
            message:
                'Impossible de créer le rôle, veuillez contacter votre administrateur système',
        });
    }
};

exports.roleDetails = async (req, res) => {
    try {
        const filteredRole = { _id: req.params.id };
        const roleDetails = await Role.findOne(filteredRole);
        if (!roleDetails) {
            res.status(404).json({
                message: "Aucun rôle trouvé pour l'id donné",
            });
        }
        res.status(200).send({
            data: roleDetails,
        });
    } catch (err) {
        res.status(500).json({
            err,
        });
    }
};

exports.roleDelete = async (req, res) => {
    try {
        const selectedRole = await Role.findOne({ _id: req.params.id });

        if (!selectedRole) {
            res.status(404).json({
                message: "Aucun rôle trouvé pour l'id donné",
            });
        }
        await Role.findOneAndDelete({
            _id: req.params.id,
        });
        res.status(200).json({
            message: 'Rôle supprimé avec succès',
        });
    } catch (err) {
        res.status(500).json({
            err,
        });
    }
};
