const Record = require('./Record.js')

module.exports = class Book extends Record {

  static getDbKey() {
    return "books"
  }

  importFormData(formData) {
    super.importFormData(formData)
    this.name = formData.get('name')
    this.author = formData.get('author')
    this.editor = formData.get('editor')
    this.created_at = formData.get('created_at')
    this.quantity = formData.get('quantity')
  }


}