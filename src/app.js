const express = require('express')
const { connectionDB } = require('./config/database')
const User = require('./models/user');
const { isValidSignUpData } = require('./utils/validation');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const { userAuth } = require('./middleware/auth');

const app = express()
const port = 7070

app.use(express.json());
app.use(cookieParser());

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
  const { firstName, lastName, emailId, password } = req.body;
  try {

    // validating the data
    isValidSignUpData(req.body);

    // encrypting the password
    const passwordHash = await bcrypt.hash(password, 10);

    // Saving the user to db
    const user = new User({ firstName, lastName, emailId, password: passwordHash });
    await user.save();

    res.status(201).send('User added successfully'); // 201 Created
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).send(error.message);
  }
})

app.post('/login', async (req, res) => {

  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user || user === null) {
      throw new Error("Invalid credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();


      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Login Successful!!!");
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.status(400).send("ERROR : " + err.message);
  }
})

app.get('/userbyemail', async (req, res) => {


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

app.get('/profile', userAuth, async (req, res) => {

  try {
    const user = req.user;

    res.send(user);
  } catch (error) {
    res.send(error.message)
  }
})

app.patch('/user/:userId', async (req, res) => {

  const data = req.body;
  const userId = req.params.userId;
  try {
    const ALLOWED_FIELDS = ['password', 'age', 'gender', 'skills'];
    const ifValidToUpdate = Object.keys(data).every((key) => ALLOWED_FIELDS.includes(key));

    if (!ifValidToUpdate) {
      throw new Error('Invalid fields to update');
    }
    const updated = await User.findByIdAndUpdate(userId, data, { returnDocument: 'after', runValidators: true });
    res.send({ message: 'updated succsessfully', updated });
  } catch (error) {
    res.send(error.message)
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
