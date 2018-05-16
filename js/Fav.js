const Record = require('./Record.js');

module.exports = class Fav extends Record {
  constructor() {
    super('favs');
  }

  importFormData(formData) {
    this.name = formData.get('name')
    this.author = formData.get('author')
    this.editor = formData.get('editor')
  }
}
