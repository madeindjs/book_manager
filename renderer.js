const {
  dialog
} = require("electron").remote;
const fs = require('fs')
const convert = require('xml-js')

const ViewHelper = require('./js/ViewHelper.js')
const Book = require('./js/Book.js')
const Fav = require('./js/Fav.js')
const Mark = require('./js/Mark.js')
const Lend = require('./js/Lend.js')
const Record = require('./js/Record.js')



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
    newBook: function() {
      document.querySelectorAll('#book_form input').forEach((input) => {
        input.value = ''
      })
      viewHelper.showTab('new_book')
    },
    newFav: function() {
      document.querySelectorAll('#fav_form input').forEach((input) => {
        input.value = ''
      })
      viewHelper.showTab('new_fav')
    },
    newLend: function() {
      document.querySelectorAll('#lend_form input').forEach((input) => {
        input.value = ''
      })
      viewHelper.showTab('new_lend')
    },
    newMark: function() {
      document.querySelectorAll('#mark_form input').forEach((input) => {
        input.value = ''
      })
      viewHelper.showTab('new_mark')
    },
    saveBook: function() {
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
    editBook: function(e) {
      let book = Book.where('id', e.target.id)
      console.log(book instanceof Record)
      //book.fillForm('book_form')
      document.querySelector('#book_form input[name="id"]').value = book.id
      document.querySelector('#book_form input[name="name"]').value = book.name
      document.querySelector('#book_form input[name="author"]').value = book.author
      document.querySelector('#book_form input[name="editor"]').value = book.editor
      document.querySelector('#book_form input[name="created_at"]').value = book.created_at
      document.querySelector('#book_form input[name="quantity"]').value = book.quantity
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
        filters: [{
            name: 'Fichier CSV',
            extensions: ['csv']
          },
          {
            name: 'Fichier XML',
            extensions: ['xml']
          },
          {
            name: 'Fichier JSON',
            extensions: ['json']
          },
        ]
      })

      // stop execution if user not choose any file
      if (savePath == undefined) {
        alert('Merci de remplir une extension valide bordel!')
        return
      }

      // get file extension
      let extension = savePath.split('.').pop()
      let fileContent = ''
      let allBooks = Book.all()

      // fill fileContent following file extension
      switch (extension) {
        case 'csv':
          fileContent = allBooks.map((book) => {
              return book.name + ";" + book.author + ";" + book.editor + ";" + book.created_at + ";" + book.quantity
            })
            .join('\r\n')
          break;
        case 'xml':
          fileContent = convert.js2xml(allBooks, {
            compact: true
          })
          break;
        case 'json':
          fileContent = JSON.stringify(allBooks)
          break;
        default:
          alert('Merci de remplir une extension valide bordel!')
          return;
      }


      // create file with fileContent
      fs.writeFile(savePath, fileContent, function(err) {
        if (err) {
          // handle error
          alert("Le fichier n'a pas pu être sauvegardé")
        } else {
          // display success
          alert("Le fichier a été sauvegardé")
        }
      });
    },
    exportFavs: function() {
      // show save dialog
      let savePath = dialog.showSaveDialog({
        title: 'Exporter vos favoris',
        filters: [{
            name: 'Fichier CSV',
            extensions: ['csv']
          },
          {
            name: 'Fichier XML',
            extensions: ['xml']
          },
          {
            name: 'Fichier JSON',
            extensions: ['json']
          },
        ]
      })

      // stop execution if user not choose any file
      if (savePath == undefined) {
        alert('Merci de remplir une extension valide bordel!')
        return
      }

      // get file extension
      let extension = savePath.split('.').pop()
      let fileContent = ''
      let allFavs = Fav.all()

      // fill fileContent following file extension
      switch (extension) {
        case 'csv':
          fileContent = allFavs.map((fav) => {
              return fav.name + ";" + fav.author + ";" + fav.editor + ";"
            })
            .join('\r\n')
          break;
        case 'xml':
          fileContent = convert.js2xml(allFavs, {
            compact: true
          })
          break;
        case 'json':
          fileContent = JSON.stringify(allFavs)
          break;
        default:
          alert('Merci de remplir une extension valide bordel!')
          return;
      }

      // create file with fileContent
      fs.writeFile(savePath, fileContent, function(err) {
        if (err) {
          // handle error
          alert("Le fichier n'a pas pu être sauvegardé")
        } else {
          // display success
          alert("Le fichier a été sauvegardé")
        }
      });
    },
    exportMarks: function() {
      // show save dialog
      let savePath = dialog.showSaveDialog({
        title: 'Exporter vos Marques-pages',
        filters: [{
            name: 'Fichier CSV',
            extensions: ['csv']
          },
          {
            name: 'Fichier XML',
            extensions: ['xml']
          },
          {
            name: 'Fichier JSON',
            extensions: ['json']
          },
        ]
      })

      // stop execution if user not choose any file
      if (savePath == undefined) {
        alert('Merci de remplir une extension valide bordel!')
        return
      }

      // get file extension
      let extension = savePath.split('.').pop()
      let fileContent = ''
      let allMarks = Mark.all()

      // fill fileContent following file extension
      switch (extension) {
        case 'csv':
          fileContent = allMarks.map((mark) => {
              return mark.name_of_book + ";" + mark.page + ";" + mark.date_read_at + ";"
            })
            .join('\r\n')
          break;
        case 'xml':
          fileContent = convert.js2xml(allMarks, {
            compact: true
          })
          break;
        case 'json':
          fileContent = JSON.stringify(allMarks)
          break;
        default:
          alert('Merci de remplir une extension valide bordel!')
          return;
      }

      // create file with fileContent
      fs.writeFile(savePath, fileContent, function(err) {
        if (err) {
          // handle error
          alert("Le fichier n'a pas pu être sauvegardé")
        } else {
          // display success
          alert("Le fichier a été sauvegardé")
        }
      });
    },
    exportLends: function() {
      // show save dialog
      let savePath = dialog.showSaveDialog({
        title: 'Exporter vos emprunts',
        filters: [{
            name: 'Fichier CSV',
            extensions: ['csv']
          },
          {
            name: 'Fichier XML',
            extensions: ['xml']
          },
          {
            name: 'Fichier JSON',
            extensions: ['json']
          },
        ]
      })

      // stop execution if user not choose any file
      if (savePath == undefined) {
        alert('Merci de remplir une extension valide bordel!')
        return
      }

      // get file extension
      let extension = savePath.split('.').pop()
      let fileContent = ''
      let allLends = Lend.all()

      // fill fileContent following file extension
      switch (extension) {
        case 'csv':
          fileContent = allLends.map((lend) => {
              return lend.nameBook + ";" + lend.people + ";" + lend.date + ";" + lend.action + ";"
            })
            .join('\r\n')
          break;
        case 'xml':
          fileContent = convert.js2xml(allLends, {
            compact: true
          })
          break;
        case 'json':
          fileContent = JSON.stringify(allLends)
          break;
        default:
          alert('Merci de remplir une extension valide bordel!')
          return;
      }

      // create file with fileContent
      fs.writeFile(savePath, fileContent, function(err) {
        if (err) {
          // handle error
          alert("Le fichier n'a pas pu être sauvegardé")
        } else {
          // display success
          alert("Le fichier a été sauvegardé")
        }
      });
    },
    saveFav: function() {
      let fav = new Fav()
      fav.importFormData(new FormData(document.getElementById('fav_form')))
      fav.save()
      viewHelper.showTab('favs')
      this.favs = Fav.all()
    },
    saveMark: function() {
      let mark = new Mark()
      mark.importFormData(new FormData(document.getElementById('mark_form')))
      mark.save()

      viewHelper.showTab('mark')

      this.marks = Mark.all()
    },
    saveLend: function() {
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
  if (e.target.nodeName == 'LI') {
    viewHelper.showTab(e.target.dataset.link)
  }
})