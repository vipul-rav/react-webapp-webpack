const paths = require('../../paths');

module.exports = [
  { from: paths.resolveFromRoot('public'), to: 'public' },

  {
    from: paths.resolveFromRoot('src/assets/icons'),

    to: 'icons'
  },
  {
    from: paths.resolveFromRoot('src/assets/images'),

    to: 'images'
  }
];
