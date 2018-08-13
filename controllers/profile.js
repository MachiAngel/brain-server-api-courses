

const handleProfileGet = (req, res, db) => {
  const { id } = req.params
  db('users')
    .select('*')
    .where({
      id
    })
    .then(users => {

      if (users.length) {
        res.json(users[0]);
        return
      }
      res.status(400).json({ errMsg: 'Not found' });
    })
    .catch(e => {
      res.status(400).json({ errMsg: 'error getting user' });
    })

}

module.exports = {
  handleProfileGet
}