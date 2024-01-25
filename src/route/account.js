// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

const { User } = require('../class/user')
const { Confirm } = require('../class/confirm')
const { Session } = require('../class/session')

User.create({
  email: 'test@mail.com',
  password: 123,
})

// ================================================================

router.get('/balance', function (req, res) {
  const token = req.query.token

  const session = Session.get(token)

  console.log(session)

  res.render('balance', {
    name: 'balance',

    component: [
      'button-settings',
      'button-notifications',
      'button-send',
      'button-receive',
    ],

    title: 'Balance page',

    data: {
      userEmail: session.user.email,
    },
  })
})

// ================================================================

router.get('/notifications', function (req, res) {
  const token = req.query.token

  const session = Session.get(token)

  const notifications = session.user.notifications // solve this
  const notificationsCopy = []

  const now = new Date()

  notifications.forEach((element) => {
    const timeDifferenceInMinutes = Math.floor(
      (now - element.date) / (1000 * 60),
    )

    const elementCopy = {
      ...element,
      date: timeDifferenceInMinutes.toString(),
    }

    notificationsCopy.push(elementCopy)
  })

  notificationsCopy.reverse()

  res.render('notifications', {
    name: 'notifications',

    component: ['back-button', 'notification'],

    title: 'Balance page',

    data: {
      notifications: notificationsCopy || [],
    },
  })
})

// ==================================

module.exports = router
