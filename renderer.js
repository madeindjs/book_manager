const ViewHelper = require('./js/ViewHelper.js')
const Book = require('./js/Book.js')


let appVue = new Vue({
  el: '#app',

  data: {
    books: [
      {
        name: "Harry Potter : A l'école des sorcier",
        author: 'J.K. Rowling',
        editor: 'Gallimard Jeunesse',
        created_at: '22/10/2015',
        quantity: 5,
      },
    ]
  },
  methods: {
    addBook: function () {
      this.books.push({
        name: "Harry Potter : A l'école des sorcier",
        author: 'J.K. Rowling',
        editor: 'Gallimard Jeunesse',
        created_at: '22/10/2015',
        quantity: 5,
      })
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


document.getElementById('book_form').addEventListener('submit', (e) => {
  e.preventDefault();
  let formData = new FormData(document.getElementById('book_form'));
  // create book from form
  let book = new Book()
  book.name = formData.get('name')
  book.author = formData.get('author')
  book.editor = formData.get('editor')
  book.created_at = formData.get('created_at')
  // save & display books
  book.save()
  viewHelper.showTab('books')


})
