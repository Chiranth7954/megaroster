$(document).foundation()

const megaroster = {
  init() {
    this.max = 0
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
    }

    this.buildListItem(student)
  },

  buildListItem(student) {
    console.log(student)
  },
}
megaroster.init()
