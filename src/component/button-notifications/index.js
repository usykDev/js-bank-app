class NotificationsButton {
  static locate() {
    if (window.session) {
      const { token } = window.session

      if (token) {
        location.assign(`/notifications?token=${token}`)
      } else {
        location.assign('/notifications')
      }
    }
  }
}

window.notificationsButton = NotificationsButton
