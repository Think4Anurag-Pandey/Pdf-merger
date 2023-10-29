const express = require('express')
const app = express()
app.use('/static',express.static('public'))
const path=require('path')
const multer=require('multer')
const upload=multer({dest:'uploads/'})
const {mergerfunc}=require('./mergepdf')
const localhost= '127.0.0.1'
const port = 3000

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,"templets/index.html"))
})
app.post('/merge', upload.array('pdf', 2), async (req, res, next)=> {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
    console.log(req.files)
  let timestamp= await  mergerfunc(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path))
    // res.send();
    res.redirect(`http://${localhost}:${port}/static/${timestamp}.pdf`)
  })

// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname,"templets/index.html"))
// })

app.listen(port, () => {
  console.log(`Example app listening on port http://${localhost}:${port}`)
})