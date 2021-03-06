$(document).foundation()

class Megaroster {
  constructor() {
    this.studentList = document.querySelector('#student-list')
    this.students = []
    this.max = 0
    this.setupEventListeners()
    this.load()
  }

  setupEventListeners() {
    document
      .querySelector('#new-student')
      .addEventListener('submit', this.addStudentViaForm.bind(this))
  }

  load() {
    const rosterString = localStorage.getItem('roster')
    const rosterArray = JSON.parse(rosterString)
    if (rosterArray) {
      rosterArray
        .reverse()
        .map(this.addStudent.bind(this))
    }
  }

  addStudentViaForm(ev) {
    ev.preventDefault()
    const f = ev.target
    const student = {
      id: ++this.max,
      name: f.studentName.value,
    }
    this.addStudent(student)
    f.reset()
  }

  addStudent(student) {
    this.students.unshift(student)

    const listItem = this.buildListItem(student)
    this.prependChild(this.studentList, listItem)
    localStorage.setItem('name', 'student.name')
    if (student.id > this.max) {
      this.max = student.id
    }
    this.save()
  }

  prependChild(parent, child) {
    parent.insertBefore(child, parent.firstChild)
  }

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
    this.setUpActions(li, student)

    return li
  }

  setUpActions(li, student) {
    li
      .querySelector('[contenteditable]')
      .addEventListener('blur', this.editStudent.bind(this, student))

    li
      .querySelector('[contenteditable]')
      .addEventListener('keypress', this.updateStudent.bind(this))

    li
      .querySelector('button.remove')
      .addEventListener('click', this.removeStudent.bind(this))

    li
      .querySelector('button.promote')
      .addEventListener('click', this.promoteStudent.bind(this, student))

      li
        .querySelector('button.move-up')
        .addEventListener('click', this.moveUpStudent.bind(this, student))

      li
        .querySelector('button.move-down')
        .addEventListener('click', this.moveDownStudent.bind(this, student))
  }

  save() {
    localStorage.setItem('roster', JSON.stringify(this.students))
  }

  editStudent(student, ev) {
    student.name = ev.target.textContent // actual editing in HTML
    this.save()
  }

  updateStudent(ev) {
    if (ev.keyCode === 13) { // updates with Enter press
      ev.preventDefault()
      ev.target.blur()
    }
  }

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
  }

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
  }

  moveUpStudent(student, ev) {
    const btn = ev.target
    const li = btn.closest('.student')

    const index = this.students.findIndex((currentStudent, i) => {
      return currentStudent.id === student.id
    })

    if (index > 0) {
      const previousStudent = this.students[index - 1]
      this.students[index - 1] = student
      this.students[index] = previousStudent
      this.studentList.insertBefore(li, li.previousElementSibling)
      this.save()
    }
  }

  moveDownStudent(student, ev) {
    const btn = ev.target
    const li = btn.closest('.student')

    const index = this.students.findIndex((currentStudent, i) => {
      return currentStudent.id === student.id
    })

    if (index < this.students.length - 1) {
      const nextStudent = this.students[index + 1]
      this.students[index + 1] = student
      this.students[index] = nextStudent
      this.studentList.insertBefore(li, li.nextElementSibling.nextElementSibling)
      this.save()
    }
  }

  removeClassName(el, className) {
    el.className = el.className.replace(className, '').trim()
  }
}
const roster = new Megaroster() // for debugging purposes
