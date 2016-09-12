/* jshint node: true */
'use strict';

module.exports = {
  fingerprintAssetMap: false,
  prepend: '',
  // Double negation:
  // Exclude files that are not translations
  // "!" is the negating symbole
  exclude: ['!**/translations/**/*.json']
};
