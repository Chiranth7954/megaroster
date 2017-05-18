$(document).foundation()

const megaroster = {
  students: [],

  init() {
    this.studentList = document.querySelector('#student-list')
    this.max = 0
    this.setupEventListeners()
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudent.bind(this))
  },

  addStudent(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: ++this.max,
      name: f.studentName.value,
      promotion: false, //
    }

    this.students.unshift(student)

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)
    localStorage.setItem('name', 'student.name') // window.localStorage
    f.reset()

    localStorage.setItem('roster', JSON.stringify(this.students))
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem(student) {
    const template = document.querySelector('.student.template')
    const li = template.cloneNode(true)
    li.querySelector('.student-name').textContent = student.name
    li.dataset.id = student.id
    this.removeClassName(li, 'template')

    li
      .querySelector('button.remove')
      .addEventListener('click', this.removeStudent.bind(this))

    li
      .querySelector('button.promote')
      .addEventListener('click', this.promoteStudent.bind(this))

      li //
        .querySelector('button.moveup')
        .addEventListener('click', this.moveUpStudent.bind(this))

      li //
        .querySelector('button.movedown')
        .addEventListener('click', this.moveDownStudent.bind(this))

    return li
  },

  removeStudent(ev, student) {
    const btn = ev.target
    btn.closest('.student').remove()
    this.students.splice(this.students.indexOf(student), 1) // students array
    localStorage.removeItem('roster', JSON.stringify(this.students))         // local storage
  },

  promoteStudent(ev, student) {
    const btn = ev.target
    btn.closest('.student').style.color = 'white'
    this.students[student].promotion = true //
  },

  moveUpStudent(ev) { //
    const btn = ev.target
    const node = btn.closest('.student')
    const parent = node.parentNode
    const prev = node.previousSibling
    parent.insertBefore(parent.removeChild(node), prev)
  },

  moveDownStudent(ev) { //
    const btn = ev.target
    const node = btn.closest('.student')
    const parent = node.parentNode
    const next = node.nextSibling.nextSibling
    parent.insertBefore(parent.removeChild(node), next)
  },

  removeClassName(el, className) {
    el.className = el.className.replace(className, '').trim()
  },
}
megaroster.init()
