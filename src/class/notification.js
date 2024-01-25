class UserNotification {
  constructor(text, type) {
    this.text = text
    this.type = type
    this.date = new Date()
  }

  getData() {
    return this
  }
}

module.exports = {
  UserNotification,
}
