$(document).foundation()

const megaroster = {
  students: [],

  init() {
    this.studentList = document.querySelector('#student-list')
    this.max = 0
    this.setupEventListeners()
    this.load()
  },

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudentViaForm.bind(this))
  },

  load() {
    const rosterString = localStorage.getItem('roster')
    const rosterArray = JSON.parse(rosterString)
    if (rosterArray) {
      rosterArray
        .reverse()
        .map(this.addStudent.bind(this))
    }
  },

  addStudentViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: ++this.max,
      name: f.studentName.value,
    }
    this.addStudent(student)
    f.reset()
  },

  addStudent(student) {
    this.students.unshift(student)

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)
    localStorage.setItem('name', 'student.name')
    if (student.id > this.max) {
      this.max = student.id
    }
    this.save()
  },

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  },

  buildListItem(student) {
    const template = document.querySelector('.student.template')
    const li = template.cloneNode(true)
    li.querySelector('.student-name').textContent = student.name
    li.setAttribute('title', student.name) // hover over name shows name IRL
    li.dataset.id = student.id

    if (student.promoted) {
      li.classList.add('promoted')
    }

    this.removeClassName(li, 'template')

    li
      .querySelector('button.remove')
      .addEventListener('click', this.removeStudent.bind(this))

    li
      .querySelector('button.promote')
      .addEventListener('click', this.promoteStudent.bind(this, student))

      li
        .querySelector('button.moveup')
        .addEventListener('click', this.moveUpStudent.bind(this))

      li
        .querySelector('button.movedown')
        .addEventListener('click', this.moveDownStudent.bind(this))

    return li
  },

  save() {
    localStorage.setItem('roster', JSON.stringify(this.students))
  },

  removeStudent(ev) {
    const btn = ev.target
    const li = btn.closest('.student')

    for (let i = 0; i < this.students.length; i++) {
      let currentId = this.students[i].id.toString()
      if (currentId === li.dataset.id) {
        this.students.splice(i, 1)
        break
      }
    }

    li.remove()
    this.save()
  },

  promoteStudent(student, ev) {
    const btn = ev.target
    const li = btn.closest('.student')
    student.promoted = !student.promoted

    if (student.promoted) {
      li.classList.add('promoted')
    } else {
      li.classList.remove('promoted')
    }

    this.save()
  },

  moveUpStudent(ev) {
    const btn = ev.target
    const node = btn.closest('.student')
    const parent = node.parentNode
    const prev = node.previousSibling
    parent.insertBefore(parent.removeChild(node), prev)
  },

  moveDownStudent(ev) {
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
