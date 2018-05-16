module.exports = class Record {
  // variable static qui donne la clé enregistré
  static getDbKey() {
    return 'record'// to implement
  }
// Recupere tous les entrée en Json du localStarage
  static all() {
    let all = JSON.parse(localStorage.getItem(this.getDbKey()))
    if(all === undefined) {
      return []
    }
    return all
  }


  static where(key, value) {
    return this.all().find((el) => {
      if(el[key] == value) {
        let instance = new Record();
        for(var prop in el){
            instance[prop] = el[prop];
        }
        console.log(instance)
        return instance
      }
    })
  }

  constructor() {
    // add a value if not exists
    if(localStorage.getItem(this.constructor.getDbKey()) === null) {
      localStorage.setItem(this.constructor.getDbKey(), JSON.stringify([]))
    }
  }


  save() {
    // set timestamp if id not defined
    if(this.id === undefined) {
      this.id = new Date().getTime()
    }

    let values = this.constructor.all()
    values.push(this)
    localStorage.setItem(this.constructor.getDbKey(), JSON.stringify(values))
  }

  static delete(id) {
    //return tous les id qui ne sont pas les meme ue celui que l'on veut pour ensuite
    let all = this.all().filter((el) => {return el['id'] != id})
    // pour ensuite enregistrer
    localStorage.setItem(this.getDbKey(), JSON.stringify(all))
  }

  // getById(id) {
  //   let values = this.all()
  //   if(values[id] === undefined) {
  //     return {error: true, message: 'Cannot find element for id ' + id}
  //   }
  //   return values[id]
  // }



}
