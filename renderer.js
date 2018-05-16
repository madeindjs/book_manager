const ViewHelper = require('./js/ViewHelper.js')
const Book = require('./js/Book.js')
const Fav = require('./js/Fav.js')
const Mark = require('./js/Mark.js')
const Lend = require('./js/Lend.js')



let appVue = new Vue({
  el: '#app',

  data: {
    books: Book.all(),
    favs: Fav.all(),
    marks: Mark.all(),
    lends: Lend.all()
  },
  methods: {
    addBook: function () {
      let book = new Book()
      book.importFormData(new FormData(document.getElementById('book_form')))
      book.save()
      this.books = Book.all() // reload
      viewHelper.showTab('books')
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
      //let book = Book.where('id', e.target.id)
      //console.log(book)

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
