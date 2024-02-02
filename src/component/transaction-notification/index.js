document.addEventListener('DOMContentLoaded', () => {
  let cardElements = document.querySelectorAll('.card')

  cardElements.forEach((el) => {
    let cardTitleElement = el.querySelector('.card__title')
    let cardImageElement = el.querySelector('.card__image')

    let transactionTitle = cardTitleElement.textContent

    if (transactionTitle === 'Stripe') {
      cardImageElement.src = '/svg/stripe.svg'
    } else if (transactionTitle === 'Coin') {
      cardImageElement.src = '/svg/coin.svg'
    } else {
      cardImageElement.src = '/svg/person.svg'
    }

    let cardTypeElement = el.querySelector('.card__type')
    let cardAmountElement =
      el.querySelector('.card__amount')

    let transactionType = cardTypeElement.textContent

    if (transactionType === 'Receipt') {
      cardAmountElement.className =
        'card__amount card__amount-plus'
    } else {
      cardAmountElement.className =
        'card__amount card__amount-minus'
    }
  })
})

class TransactionButton {
  static locate(event) {
    const element = event.currentTarget
    if (window.session) {
      const { token } = window.session

      if (token) {
        const transactionId = element.getAttribute(
          'transaction-id',
        )

        location.assign(
          `/transaction?token=${token}&transactionId=${transactionId}`,
        )
      } else {
        location.assign('/transaction')
      }
    }
  }
}

window.transactionButton = TransactionButton
