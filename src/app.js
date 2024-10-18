const express = require('express')
const { connectionDB } = require('./config/database')
const User = require('./models/user');

const app = express()
const port = 7070

app.use(express.json());

app.post('/signup', async (req, res) => {
  console.log("🚀 ~ app.post ~ req:", req.body);

  const { firstName, lastName, emailId, password, age, gender } = req.body;

  const user = new User(req.body)


  try {
    // saving the user to db
    await user.save();
    res.send('User added successfully')
  } catch (error) {
    res.send(error)
  }
})

// const user = new User(userObject);


connectionDB().then(() => {
  console.log('DB connected');
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
}).catch((err) => {
  console.log("🚀 ~ connectionDB ~ err:", err)
})
