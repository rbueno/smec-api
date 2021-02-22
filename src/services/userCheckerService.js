const userRepository = require("../repository/userRepository");
const textContent = require("../utils/textContent");
const linkedIn = require('../config/api/linkedIn');

function userCheckerService({ user }) {
  async function isApplicableToSME() {
    const { findById } = userRepository();
    const result = await findById({ id: user.id })
    if (!!result.role.includes('sme')) return { isApplicable: false, message: textContent.warning.alreadySME };
    if (result.smeProfile.status !== 'not allowed') return { isApplicable: false, message: textContent.warning.notApplicable };
    return { isApplicable: true, url: linkedIn({ userId: user.id }) }
  }

  function isSME() {

  }

  function isAdmin() {

  }

  return {
    isApplicableToSME,
    isSME,
    isAdmin,
  }

}

module.exports = userCheckerService;