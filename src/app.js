const express = require('express')
const app = express()
const port = 7070
const { userAuth, adminAuth } = require('./middleware/auth')

// app.use((req, res) => {
//   res.send('Hello World!')
// })

app.use('/user', userAuth)
app.use('/admin', adminAuth)


// app.use('/demo', (req, res) => {
//   res.send('Hello World! Demo')
// })

app.get('/user', (req, res) => {
  return res.send('Hello World! User');
})

app.post('/user', (req, res) => {
  console.log("🚀 ~ app.post ~ res: DB call done, user data saved successfully")
  return res.send('DB call done, user data saved successfully');
})

app.delete('/user', (req, res) => {
  console.log("🚀 ~ app.post ~ res: deleted successfully!")
  return res.send('DB call done, deleted successfully');
})

// this works for both /username & name
app.get('/(user)?name', (req, res) => {
  return res.send({ firstName: 'Avinash', lastName: 'Sharma' });
})


// complex usage of regex patterns - here it means that the pattern starts with anything but ends with hole is valid like asshole is valid
app.get(/.*hole/, (req, res) => {
  return res.send({ firstName: 'Avinash', lastName: 'Sharma' });
})

app.get('/userwithid', (req, res) => {
  console.log("🚀 ~ app.get ~ req:", req.query);
  return res.send({ firstName: 'Avinash', lastName: 'Sharma' });
})

app.get('/userwithparams/:userId', (req, res) => {
  console.log("🚀 ~ app.get ~ req:", req.params);
  console.log("🚀 ~ app.get ~ req:", req.query);
  return res.send({ firstName: 'Avinash', lastName: 'Sharma', paramsPassed: req.params.userId, queryPassed: req.query.data });
})


// we can use next() keyword to forward the request to another route
app.get('/admin/multiple-routes-check', (req, res, next) => {
  console.log("🚀 ~ app.get ~ multiple-routes-check")
  // res.send('multiple-routes-check');
  next();
}, (req, res, next) => {
  console.log("🚀 ~ app.get ~ multiple-routes-check 2")
  res.send('multiple-routes-check 2', next());
}, (req, res, next) => {
  console.log("🚀 ~ app.get ~ multiple-routes-check 3")
  if (!true) {
    res.status(200).send({ response: 'nothing to display' })
  } else {
    next();
  }

}, (req, res) => {
  res.status(200).send({ response: 'Authorized but, status is false ' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})