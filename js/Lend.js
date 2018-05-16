const Record = require('./Record.js');

module.exports = class Lend extends Record {
  static getDbKey() {
    return "lend"
  }

  importFormData(formData) {
    this.nameBook = formData.get('nameBook')
    this.people = formData.get('people')
    this.date = formData.get('date')
    this.action = formData.get('action')
  }
}
