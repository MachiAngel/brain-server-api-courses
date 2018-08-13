const Clarifai = require('clarifai')

const app = new Clarifai.App({
  apiKey: process.env.Clarifai_API 
})


const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
    .then(data => {
      res.json(data);
    })
    .catch(e => {
      res.status(400).json({errMsg:'unable work with API'})
    })
}

const handleImage = (req, res, db) => {

  

  const { id } = req.body
  db('users')
    .where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json({ entries: entries[0] })
    })
    .catch(e => {
      res.status(400).json({ errMsg: 'unable to get entries' });
    })

}

module.exports = {
  handleImage,
  handleApiCall
}