const { GoogleSocialLogin } = require('cypress-social-logins').plugins

/// <reference types="cypress" />
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  on('task', {
    GoogleSocialLogin: GoogleSocialLogin,
  })
}
