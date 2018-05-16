const {dialog} = require("electron").remote;
const fs = require('fs')
const convert = require('xml-js')

const ViewHelper = require('./js/ViewHelper.js')
const Book = require('./js/Book.js')
const Fav = require('./js/Fav.js')


let appVue = new Vue({
  el: '#app',

  data: {
    books: Book.all(),
    favs: Fav.all(),
  },
  methods: {
    addBook: function () {
      let book = new Book()
      book.importFormData(new FormData(document.getElementById('book_form')))
      book.save()
      this.books = Book.all() // reload
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
