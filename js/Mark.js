const Record = require('./Record.js');

module.exports = class Mark extends Record {
  static getDbKey() {
    return "mark"
  }

  importFormData(formData) {
    this.name_of_book = formData.get('name_of_book')
    this.page = formData.get('page')
    this.date_read_at = formData.get('date_read_at')
  }
}
