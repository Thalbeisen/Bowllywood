const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Doc API CDA Amiens avec Swagger',
            version: '0.1.0',
            description: 'Documentation CRUD de Bollywood',
            license: {
                name: 'MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        servers: [
            {
                url: 'http://localhost:5000',
                description: 'Serveur localhost',
            },
            {
                url: 'https://bowllywood.herokuapp.com',
                description: 'Serveur Heroku',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

module.exports = options;
