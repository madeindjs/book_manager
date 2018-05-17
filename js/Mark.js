const Record = require('./Record.js');

module.exports = class Mark extends Record {
  static getDbKey() {
    return "mark"
  }

  importFormData(formData) {
    super.importFormData(formData)
    this.name = formData.get('name')
    this.page = formData.get('page')
    this.read_at = formData.get('read_at')
  }
}