const ViewHelper = require('./js/ViewHelper.js');

let viewHelper = new ViewHelper();

document.querySelector('aside ul').addEventListener('click', (e) => {
  let target = e.target;

  if(e.target.nodeName == 'LI'){
    viewHelper.showTab(e.target.dataset.link);
  }
})
