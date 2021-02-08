const paths = require('../paths');

module.exports = [
    { from: paths.resolveFromRoot('config'), to: 'config' },

    {
        from: paths.resolveFromRoot('src/assets/font'),

        to: 'font',
    },
    {
        from: paths.resolveFromRoot('src/assets/icons'),

        to: 'icons',
    },
    {
        from: paths.resolveFromRoot('src/assets/images'),

        to: 'images',
    },
];
