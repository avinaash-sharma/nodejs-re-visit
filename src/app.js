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

  const user = new User(req.body);
  try {
    // Saving the user to db
    await user.save();
    res.status(201).send('User added successfully'); // 201 Created
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send(error.message);
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

app.delete('/delete-by-email', async (req, res) => {
  console.log("🚀 ~ app.delete ~ req.body.emailId:", req.body.emailId)
  const emailId = req.body.emailId;
  try {
    const result = await User.findOneAndDelete({ emailId });

    if (!result) {
      return res.status(404).send('User not found');
    }

    res.send('User deleted successfully');
  } catch (error) {
    res.send(error)
  }
})

app.delete('/delete-by-id', async (req, res) => {
  console.log("🚀 ~ app.delete ~ req.body.emailId:", req.body.userId)
  const userId = req.body.userId;
  try {
    const result = await User.findByIdAndDelete(userId);

    if (!result) {
      return res.status(404).send('User not found');
    }

    res.send({ message: 'deleted succsessfully', result });
  } catch (error) {
    res.send(error)
  }
})

app.patch('/user', async (req, res) => {
  const data = req.body;
  try {
    const updated = await User.findByIdAndUpdate(data.userId, data, { returnDocument: 'after', runValidators: true });
    res.send({ message: 'updated succsessfully', updated });
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
