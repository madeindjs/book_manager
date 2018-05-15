module.exports = class ViewHelper {

    showTab(tabName) {
      let sections = document.querySelectorAll('[data-view]').forEach((section) => {
        section.classList.add('hidden')
      })

      document.querySelector('[data-view="' + tabName + '"]').classList.remove('hidden')
    }

}
