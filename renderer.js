const ViewHelper = require('./js/ViewHelper.js')
const StorageHelper = require('./js/StorageHelper.js')

let viewHelper = new ViewHelper()
let storageHelper = new StorageHelper()

document.querySelector('aside ul').addEventListener('click', (e) => {
  let target = e.target

  if(e.target.nodeName == 'LI'){
    viewHelper.showTab(e.target.dataset.link)
  }
})

storageHelper.add({
  name: 'Alex',
  value: 'Rousseau'
})


document.getElementById('new_book_button').addEventListener('click', (e) => {
  viewHelper.showTab('new_book')
})
