const ViewHelper = require('./js/ViewHelper.js')
const Book = require('./js/Book.js')
const Fav = require('./js/Fav.js')


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
    ],
    favs: [
      {
        name: "Harry Potter : A l'école des sorcier",
        author: 'J.K. Rowling',
        editor: 'Gallimard Jeunesse',
      },
    ]
  },
  methods: {
    addBook: function () {
      let book = new Book()
      book.importFormData(new FormData(document.getElementById('book_form')))
      book.save()

      viewHelper.showTab('books')


      this.books.push({
        name: book.name,
        author: book.author,
        editor: book.editor,
        created_at: book.created_at,
        quantity: book.quantity,
      })
    },
    addFav: function () {
      let fav = new Fav()
      fav.importFormData(new FormData(document.getElementById('fav_form')))
      fav.save()

      viewHelper.showTab('favs')


      this.favs.push({
        name: fav.name,
        author: fav.author,
        editor: fav.editor,
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
