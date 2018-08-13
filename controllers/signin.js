

const handleSignin = (req, res, db, bcrypt) => {

  const { email, password } = req.body

  if (!email, !password) {
    return res.status(400).json({ errMsg: 'incorrect form submisstion' })
  }

  db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {

      const isValid = bcrypt.compareSync(password, data[0].hash)
      console.log(isValid)
      if (isValid) {
        db.select('*').from('users')
          .where('email', '=', email)
          .then(users => {
            res.json(users[0])
          })
          .catch(e => res.status(400).json({ errMsg: 'unable to get user' }))
      } else {
        res.status(400).json({ errMsg: 'wrong credentials !!' })
      }

    })
    .catch(e => {
      console.log(e.message)
      res.status(400).json({ errMsg: 'wrong credentials' })
    })

}

module.exports = {
  handleSignin
}