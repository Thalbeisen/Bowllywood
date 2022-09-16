const options = {
    failOnErrors: true, // Whether or not to throw when parsing errors. Defaults to false.
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Bollywood API',
            version: '1.0.0',
            description:
                'Application utilisateur et métier du restaurant Bollywood.',
            license: {
                name: 'Licence MIT',
                url: 'https://spdx.org/licenses/MIT.html',
            },
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'],
};

module.exports = options;
