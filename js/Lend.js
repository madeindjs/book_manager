const Record = require('./Record.js');

module.exports = class Lend extends Record {
  static getDbKey() {
    return "lend"
  }

  importFormData(formData) {
    super.importFormData(formData)
    this.name = formData.get('name')
    this.people = formData.get('people')
    this.date = formData.get('date')
    this.action = formData.get('action')
  }
}