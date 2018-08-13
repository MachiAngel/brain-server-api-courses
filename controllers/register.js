



const handleRegister = (req, res, db, bcrypt) => {

  const { email, name, password } = req.body

  if (!email, !name, !password) {
    return res.status(400).json({errMsg:'incorrect form submisstion'})
  }

  console.time('hash')
  const hash = bcrypt.hashSync(password, 10)
  console.timeEnd('hash')

  db.transaction(trx => {

    trx.insert({
      hash: hash,
      email: email,
    })
      .into('login')
      .returning('email')
      .then(loginEmail => {
        return trx('users')
          .returning('*')
          .insert({
            email: loginEmail[0],
            name,
            joined: new Date()
          }).then(users => {
            res.json(users[0]);
          })
      })
      .then(trx.commit)
      .catch(trx.rollback)
  })
  .catch(e => {
    res.status(400).json({ errMsg: 'unable to add' })
  })

}

module.exports = {
  handleRegister
}