// class StripeButton {
//   static submit() {
//     if (window.session) {
//       const { token } = window.session

//       if (token) {
//         location.assign(`/balance?token=${token}`)
//       } else {
//         location.assign('/receive')
//       }
//     }

//     // location.assign('/receive')
//   }
// }

import { Form } from '../../script/form'

import { saveSession } from '../../script/session'

class PaymentSystem extends Form {
  FIELD_NAME = {
    AMOUNT: 'amount',
  }
  FIELD_ERROR = {
    IS_EMPTY: 'Enter the number in the field',
    IS_BIG: 'The value must be less than 7 digits',
    IS_INVALID: 'The value is not correct',
    DECIMAL:
      'A decimal number should only include up to two digits after the decimal point.',
  }

  validate = (name, value) => {
    if (String(value).length < 1) {
      return this.FIELD_ERROR.IS_EMPTY
    }

    if (String(value).length > 7) {
      return this.FIELD_ERROR.IS_BIG
    }

    if (isNaN(Number(value))) {
      return this.FIELD_ERROR.IS_INVALID
    }

    if (Number(value) <= 0) {
      return this.FIELD_ERROR.IS_INVALID
    }

    if (
      String(value).startsWith('0') &&
      !String(value).includes('.')
    ) {
      return this.FIELD_ERROR.IS_INVALID
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

  submitStripe = async () => {
    if (this.disabled === true) {
      this.validateAll()
    } else {
      console.log(this.value)

      this.setAlert('progress', 'Loading')
    }

    try {
      const res = await fetch('/receive-stripe', {
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

  submitCoin = async () => {
    if (this.disabled === true) {
      this.validateAll()
    } else {
      console.log(this.value)

      this.setAlert('progress', 'Loading')
    }

    try {
      const res = await fetch('/receive-coin', {
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
      [this.FIELD_NAME.AMOUNT]:
        this.value[this.FIELD_NAME.AMOUNT],
      ['token']: session.token,
    })
  }
}

window.paymentSystem = new PaymentSystem()
