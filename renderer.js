const ViewHelper = require('./js/ViewHelper.js')
const Book = require('./js/Book.js')



let appVue = new Vue({
  el: '#app',

  data: {
    books: Book.all()
  },
  methods: {
    addBook: function () {
      let book = new Book()
      book.importFormData(new FormData(document.getElementById('book_form')))
      book.save()
      this.books = Book.all() // reload
      viewHelper.showTab('books')
    },
    deleteBook: function(e) {
      let book = Book.where('id', e.target.id)
      console.log(book)

      Book.delete(e.target.id)
      this.books = Book.all()
    }
  },
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
