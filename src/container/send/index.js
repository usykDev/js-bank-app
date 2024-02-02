import { Form, REG_EXP_EMAIL } from '../../script/form'

import { saveSession } from '../../script/session'

class SendForm extends Form {
  FIELD_NAME = {
    EMAIL: 'email',
    AMOUNT: 'amount',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Enter the value in the field',
    IS_BIG: 'The value must be less than 30 characters',
    EMAIL: 'Enter the correct value of the e-mail address',
    IS_INVALID: 'The value is not correct',
    DECIMAL:
      'A decimal number should only include up to two digits after the decimal point.',
  }

  validate = (name, value) => {
    if (name === this.FIELD_NAME.AMOUNT) {
      if (Number(value) <= 0) {
        return this.FIELD_ERROR.IS_INVALID
      }
    }

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

    if (name === this.FIELD_NAME.AMOUNT) {
      if (isNaN(Number(value))) {
        return this.FIELD_ERROR.IS_INVALID
      }
    }

    if (name === this.FIELD_NAME.AMOUNT) {
      if (
        String(value).startsWith('0') &&
        !String(value).includes('.')
      ) {
        return this.FIELD_ERROR.IS_INVALID
      }
    }

    if (name === this.FIELD_NAME.AMOUNT) {
      if (
        String(value).includes('.') &&
        String(value).split('.')[1].length > 2
      ) {
        return this.FIELD_ERROR.DECIMAL
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
      const res = await fetch('/send', {
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
      [this.FIELD_NAME.AMOUNT]:
        this.value[this.FIELD_NAME.AMOUNT],
      ['token']: session.token,
    })
  }
}

window.sendForm = new SendForm()
