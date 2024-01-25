const { UserNotification } = require('./notification')

// const {
//   default: UserNotification,
// } = require('../component/notification')

class User {
  static #list = []
  static #listNotifications = []

  static #count = 1

  constructor({ email, password }) {
    this.id = User.#count++

    this.email = String(email).toLocaleLowerCase()
    this.password = String(password)
    this.isConfirm = false
    this.notifications = User.#listNotifications
  }

  static create(data) {
    const user = new User(data)

    this.#list.push(user)

    console.log(this.#list)

    return user
  }

  static createNotification(text, type) {
    const notification = new UserNotification(text, type)

    this.#listNotifications.push(notification)

    return notification
  }

  static updatePassword(password, passwordNew) {
    const user = this.getByPassword(password)

    if (user) {
      user.password = String(passwordNew)
      console.log('Password updated successfully:', user)
    } else {
      console.log(
        'User not found with the provided old password.',
      )
    }
  }

  static getByEmail(email) {
    return (
      this.#list.find(
        (user) =>
          user.email === String(email).toLocaleLowerCase(),
      ) || null
    )
  }

  static getByPassword(password) {
    return (
      this.#list.find(
        (user) => user.password === String(password),
      ) || null
    )
  }
}

module.exports = {
  User,
}
