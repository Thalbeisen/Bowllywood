exports.userIndex = (req, res) =>
    res.status(200).json({
        message: 'Hello Controller',
    });

exports.userCreate = (req, res) =>
    res.status(201).json({
        message: 'CREATED',
    });
