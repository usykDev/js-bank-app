document.addEventListener('DOMContentLoaded', () => {
  if (window.session) {
    const { user } = window.session
    const { token } = window.session

    if (user.isConfirm) {
      location.assign(`/balance?token=${token}`)
    } else {
      location.assign('/signup-confirm')
    }
  } else {
    location.assign('/welcome-page')
  }
})
