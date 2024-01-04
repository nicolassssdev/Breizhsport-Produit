const passwordValidator = require('password-validator');
const emailValidator = require('email-validator');

const schema = new passwordValidator();

schema
  .is().min(8)
  .is().max(100)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().symbols(1)
  .has().not().spaces();

class Utilisateur {
  constructor(userId, username, hashPassword, email, isConfirmed, pictureUrl, role) {
    this.userId = userId;
    this.username = this.validateUniqueUsername(username);
    this.hashPassword = this.validatePassword(hashPassword);
    this.email = this.validateEmail(email);
    this.isConfirmed = isConfirmed;
    this.pictureUrl = pictureUrl;
    this.role = role;
  }

  async validateUniqueUsername(username) {
    const existingUser = await Utilisateur.findOne({ username: username });

    if (existingUser) {
      throw new Error('Le nom d\'utilisateur est déjà pris.');
    }

    return username;
  }

  validatePassword(password) {
    if (!schema.validate(password)) {
      throw new Error('Le mot de passe ne respecte pas les contraintes de complexité.');
    }
  }

  validateEmail(email) {
    if (!emailValidator.validate(email)) {
      throw new Error('L\'adresse e-mail n\'est pas valide.');
    }
    return email;
  }
}

module.exports = Utilisateur;
