const App = {

  init() {
    const personForm = document.querySelector('form')
    personForm.addEventListener('submit', this.handleSubmit.bind(this))
  },

  renderButton(value, name) {
    const buttonRendered = document.createElement('BUTTON')
    buttonRendered.appendChild(document.createTextNode(name))
    return buttonRendered
  },

  renderPerson(person) {
    const personRendered = document.createElement('li')
    Array.from(person).map((input, _i, _formElements) => {
      if(input.value) {
        personRendered.innerHTML = `${input.value + '    '}`
        const btnDelete = this.renderButton(input.value, 'DELETE')
        personRendered.appendChild(btnDelete)
        btnDelete.addEventListener('click', (ev) => {
          personRendered.parentNode.removeChild(personRendered)
        })
        personRendered.appendChild(document.createTextNode('    ')) // aesthetic
        const btnPromote = this.renderButton(input.value, 'PROMOTE')
        personRendered.appendChild(btnPromote)
        btnPromote.addEventListener('click', (ev) => {
          personRendered.style.color = 'blue'
        })
      }
      input.value = ''
    })
    return personRendered
  },

  handleSubmit(ev) {
    ev.preventDefault()
    const form = ev.target
    const details = document.querySelector('.details')

    const person = this.renderPerson(form.elements)
    details.insertBefore(person, details.childNodes[0])
  }
}

App.init()
