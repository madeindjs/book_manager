const Record = require('./Record.js');

module.exports = class Fav extends Record {
  static getDbKey() {
    return "favs"
  }

  importFormData(formData) {
    this.name = formData.get('name')
    this.author = formData.get('author')
    this.editor = formData.get('editor')
  }
}
