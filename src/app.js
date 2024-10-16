const express = require('express')
const app = express()
const port = 7070

// app.use((req, res) => {
//   res.send('Hello World!')
// })

// app.use('/', (req, res) => {
//   res.send('Avinash Sharma')
// })


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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})