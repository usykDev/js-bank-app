document.addEventListener('DOMContentLoaded', () => {
  let transactionTypeElement = document.querySelector(
    '.transaction-type',
  )
  let cardAmountElement = document.querySelector(
    '.transaction__amount',
  )

  let transactionType = transactionTypeElement.textContent

  if (transactionType === 'Receipt') {
    cardAmountElement.className =
      'transaction__amount transaction__amount-plus'
  } else {
    cardAmountElement.className =
      'transaction__amount transaction__amount-minus'
  }
})
