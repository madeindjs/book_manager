module.exports = class StorageHelper {

  constructor() {
    this.dbKey = "books";
    // add a value if not exists
    if(localStorage.getItem(this.dbKey) === null) {
      localStorage.setItem(this.dbKey, JSON.stringify([]))
    }
  }

  search(key, value) {
    return this.all().find((el) => {
      return el[key] === value
    })
  }

  add(value) {
    let values = this.all()
    values.push(value)
    localStorage.setItem(this.dbKey, JSON.stringify(values))
  }

  getById(id) {
    let values = this.all()
    if(values[id] === undefined) {
      return {error: true, message: 'Cannot find element for id ' + id}
    }
    return values[id]
  }

  all() {
    return JSON.parse(localStorage.getItem(this.dbKey))
  }

}
