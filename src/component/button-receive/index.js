class ReceiveButton {
  static locate() {
    // if (window.session) {
    //   const { token } = window.session

    //   if (token) {
    //     location.assign(`/receive?token=${token}`)
    //   } else {
    //     location.assign('/receive')
    //   }
    // }
    location.assign('/receive')
  }
}

window.receiveButton = ReceiveButton
