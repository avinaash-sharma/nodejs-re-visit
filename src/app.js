const express = require('express')
const { connectionDB } = require('./config/database')
const User = require('./models/user');

const app = express()
const port = 7070

app.use(express.json());

// get all users

app.get('/feed', async (req, res) => {

  try {
    const users = await User.find({});
    if (users.length > 0) {
      res.send(users);
    } else {
      res.status(404).send('No users found');
    }
  } catch (error) {
    res.send(error.message);
  }

})

app.post('/signup', async (req, res) => {
  console.log("🚀 ~ app.post ~ req:", req.body);

  const user = new User(req.body)
  try {
    // saving the user to db
    await user.save();
    res.send('User added successfully')
  } catch (error) {
    res.send(error)
  }
})

app.get('/userbyemail', async (req, res) => {

  console.log("🚀 ~ app.get ~ req.body.emailId:", req.body.emailId)
  try {
    const user = await User.findOne({ emailId: req.body.emailId }, 'firstName');
    res.send(user);

    // if (user.length > 0) {
    //   res.send(user);
    // } else {
    //   res.status(404).send('No user found');
    // }
  } catch (error) {
    res.send(error.message);
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
