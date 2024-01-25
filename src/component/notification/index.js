document.addEventListener('DOMContentLoaded', () => {
  let cardElements = document.querySelectorAll('.card')

  cardElements.forEach((el) => {
    // Select the elements inside the loop
    let cardTypeElement = el.querySelector('.card__type')
    let cardImageElement = el.querySelector('.card__image')

    let notificationType = cardTypeElement.textContent

    if (notificationType === 'Announcement') {
      cardImageElement.src = '/svg/announcement.svg'
    } else if (notificationType === 'Warning') {
      cardImageElement.src = '/svg/warning.svg'
    } else {
      cardImageElement.src = '/path/to/warning-image.jpg'
    }
  })
})
