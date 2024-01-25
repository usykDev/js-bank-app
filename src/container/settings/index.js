import {
  Form,
  REG_EXP_EMAIL,
  REG_EXP_PASSWORD,
} from '../../script/form'

import { saveSession } from '../../script/session'

class ChangeEmailForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
    PASSWORD: 'password',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Enter the value in the field',
    IS_BIG: 'The value must be less than 30 characters',
    EMAIL: 'Enter the correct value of the e-mail address',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG
    }

    if (name === this.FIELD_NAME.EMAIL) {
      if (!REG_EXP_EMAIL.test(String(value))) {
        return this.FIELD_ERROR.EMAIL
      }
    }
  }

  submit = async () => {
    if (this.disabled === true) {
    } else {
      console.log(this.value)

      this.setAlert('progress', 'Loading')
    }

    try {
      const res = await fetch('/change-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.convertData(),
      })

      const data = await res.json()

      if (res.ok) {
        this.setAlert('success', data.message)
        saveSession(data.session)
        location.assign('/')
      } else {
        this.setAlert('error', data.message)
      }
    } catch (error) {
      this.setAlert('error', error.message)
    }
  }

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.EMAIL]:
        this.value[this.FIELD_NAME.EMAIL],
      [this.FIELD_NAME.PASSWORD]:
        this.value[this.FIELD_NAME.PASSWORD],
      ['token']: session.token,
    })
  }
}

window.changeEmailForm = new ChangeEmailForm()

// ===========================================

class ChangePasswordForm extends Form {
  FIELD_NAME = {
    PASSWORD_OLD: 'passwordOld',
    PASSWORD_NEW: 'passwordNew',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Enter the value in the field',
    IS_BIG: 'The value must be less than 30 characters',
    PASSWORD_NEW:
      'The password must consist of at least 8 characters, including at least one number, lowercase and uppercase letters',
  }

  checkDisabled = () => {
    let disabled = false

    Object.values(this.FIELD_NAME).forEach((name) => {
      if (
        this.error[name] ||
        this.value[name] === undefined
      ) {
        disabled = true
      }
    })

    const el = document.querySelector(`.button--password`)

    if (el) {
      const isDisabled = Boolean(disabled)
      const alert = document.querySelector(`.alert`)

      el.classList.toggle('button--disabled', isDisabled)

      if (isDisabled) {
        el.setAttribute('disabled', 'true')
      } else {
        el.removeAttribute('disabled')

        alert.className = 'alert alert--disabled'
      }
    }

    this.disabled = disabled
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 30) {
      return this.FIELD_ERROR.IS_BIG
    }

    if (name === this.FIELD_NAME.PASSWORD_NEW) {
      if (!REG_EXP_PASSWORD.test(String(value))) {
        return this.FIELD_ERROR.PASSWORD_NEW
      }
    }
  }

  submit = async () => {
    if (this.disabled === true) {
    } else {
      console.log(this.value)

      this.setAlert('progress', 'Loading')
    }

    try {
      const res = await fetch('/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: this.convertData(),
      })

      const data = await res.json()

      if (res.ok) {
        this.setAlert('success', data.message)
        saveSession(data.session)
        location.assign('/')
      } else {
        this.setAlert('error', data.message)
      }
    } catch (error) {
      this.setAlert('error', error.message)
    }
  }

  setAlert = (status, text) => {
    const el = document.querySelector(`.alert--password`)

    if (status === 'progress') {
      el.className = 'alert alert--password alert--progress'
    } else if (status === 'success') {
      el.className = 'alert alert--password alert--success'
    } else if (status === 'error') {
      el.className = 'alert alert--password alert--error'
    } else {
      el.className = 'alert alert--password alert--disabled'
    }

    if (text) el.innerText = text
  }

  convertData = () => {
    return JSON.stringify({
      [this.FIELD_NAME.PASSWORD_OLD]:
        this.value[this.FIELD_NAME.PASSWORD_OLD],
      [this.FIELD_NAME.PASSWORD_NEW]:
        this.value[this.FIELD_NAME.PASSWORD_NEW],
      ['token']: session.token,
    })
  }
}

window.changePasswordForm = new ChangePasswordForm()
