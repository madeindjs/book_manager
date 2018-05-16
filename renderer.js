const {dialog} = require("electron").remote;
const fs = require('fs')
const convert = require('xml-js')

const ViewHelper = require('./js/ViewHelper.js')
const Book = require('./js/Book.js')
const Fav = require('./js/Fav.js')
const Mark = require('./js/Mark.js')
const Lend = require('./js/Lend.js')


// utilisation de Vuejs
let appVue = new Vue({
  // el correspond,  a l'élèment cibler, dans ce cas la l'id=app placer dans la premiere div class=row
  el: '#app',
  /* data correspond, au donnée du formulaire que l'on recupere grace au foreach de l'index
  et on recupere la methode all() pour tous les recuperer*/
  data: {
    books: Book.all(),
    favs: Fav.all(),
    marks: Mark.all(),
    lends: Lend.all()
  },
  /* methods correspond, au function d'ajout ou de suppression
  et les utiliser dans l'index au niveau @prevent.submit des formulaire */
  methods: {
    addBook: function () {
      let book = new Book()
      /* on importe les donnée  saisie du formulaire a partir de Book.js et
      en  passant par l'id du formulaire en question */
      book.importFormData(new FormData(document.getElementById('book_form')))
      // on enregistre ces donnée la grace a la méthode save() dans Record
      book.save()
      this.books = Book.all() // reload
      // On affiche l'onglet en question  grace a la méthode showTab
      viewHelper.showTab('books')
    },
    updateBook: function(e) {
      let book = Book.where('id', e.target.id)

      debugger

      document.querySelector('#book_form input[name="name"]').value = book.name

      viewHelper.showTab('new_book')
    },
    deleteBook: function(e) {
      // let book = Book.where('id', e.target.id)
      // console.log(book)

      Book.delete(e.target.id)
      this.books = Book.all()
    },
    exportBooks: function() {
      // show save dialog
      let savePath = dialog.showSaveDialog({
        title: 'Exporter les livres',
        filters: [
          {name: 'Fichier CSV', extensions: ['csv']},
          {name: 'Fichier XML', extensions: ['xml']},
          {name: 'Fichier JSON', extensions: ['json']},
        ]
      })

      let extension = savePath.split('.').pop()
      let fileData = ''
      let allBooks = Book.all()

      switch (extension) {
        case 'csv':
          fileData = allBooks.map((book) => {
                               return book.name + ";" + book.author + ";" + book.editor + ";" + book.created_at + ";" + book.quantity
                             })
                            .join('\r\n')
          break;
        case 'xml':
          fileData = convert.js2xml(allBooks, {compact: true})
          break;
        case 'json':
          fileData = JSON.stringify(allBooks)
          break;
      }


      fs.writeFile(savePath, fileData, function(err) {
      });
    },
    addFav: function () {
      let fav = new Fav()
      fav.importFormData(new FormData(document.getElementById('fav_form')))
      fav.save()

      viewHelper.showTab('favs')

      this.favs = Fav.all()
    },
    addMark: function () {
      let mark = new Mark()
      mark.importFormData(new FormData(document.getElementById('mark_form')))
      mark.save()

      viewHelper.showTab('mark')

      this.marks = Mark.all()
    },
    addLend: function () {
      let lend = new Lend()
      lend.importFormData(new FormData(document.getElementById('lend_form')))
      lend.save()

      viewHelper.showTab('lend')

      this.lends = Lend.all()
    },
    deleteBook: function(e) {
      /*let book = Book.where('id', e.target.id)
      console.log(book)*/
      // utilisation de la methode delete js situé dans Record.js pour tous
      Book.delete(e.target.id)
      this.books = Book.all()
    },
    deleteFav: function(e) {
      Fav.delete(e.target.id)
      this.favs = Fav.all()
    },
    deleteMark: function(e) {
      Mark.delete(e.target.id)
      this.marks = Mark.all()
    },
    deleteLend: function(e) {
      Lend.delete(e.target.id)
      this.lends = Lend.all()
    }
  }
})



let viewHelper = new ViewHelper()

document.querySelector('aside ul').addEventListener('click', (e) => {
  let target = e.target
  if(e.target.nodeName == 'LI'){
    viewHelper.showTab(e.target.dataset.link)
  }
})

// onclick, permettant de cibler l'id du bouton en question et d'afficher l'onglet correspondant
document.getElementById('new_book_button').addEventListener('click', (e) => {
  viewHelper.showTab('new_book')
})

document.getElementById('new_favs_button').addEventListener('click', (e) => {
  viewHelper.showTab('add_fav');
})

document.getElementById('new_mark_button').addEventListener('click', (e) => {
  viewHelper.showTab('new_mark');
})

document.getElementById('new_lend_button').addEventListener('click', (e) => {
  viewHelper.showTab('new_lend');
})
