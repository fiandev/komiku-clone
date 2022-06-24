const express = require("express")
const axios = require("axios")
const { apiUrl } = require("./config")
const { getBaseUrl } = require("./helper/functionz")
const app = express()
const port = process.env.PORT || 3600
app.locals({ getBaseUrl })

app.set("views", "./views"),
app.set("view engine", "ejs")
app.use(express.static(__dirname + '/public'));

app.get("/", async (req, res) => {
  let latest = {}, popular = {};
  let thumb;
  
  await axios.get(`${apiUrl}/latest`)
  .then(result => {
    latest = result
  })
  await axios.get(`${apiUrl}/popular`)
  .then(result => {
    popular = result
  })
  
  res.render("index", {
    "latest": latest,
    "popular": popular
  })
})
app.get("/read/:slug", async (req, res) => {
  const slug = req.params.slug
  let popular, latest;
  await axios.get(`${apiUrl}/popular`)
  .then(result => {
    popular = result
  })
  await axios.get(`${apiUrl}/chapter/${slug}`).then(result => {
    res.render("read", {
      "comic": result,
      "popular": popular,
    })
  })
})
app.get("/type/:type", async (req, res) => {
  const type = req.params.type
  let latest = {}, popular = {}
  let thumb
  
  await axios.get(`${apiUrl}/${type}/latest`)
  .then(result => {
    latest = result
  })
  await axios.get(`${apiUrl}/${type}/popular`)
  .then(result => {
    popular = result
  })
  
  res.render("index", {
    "latest": latest,
    "popular": popular,
    "type": type
  })
})

app.get("/detail/:slug", async (req, res) => {
  const slug = req.params.slug
  let popular;
  await axios.get(`${apiUrl}/popular`)
  .then(result => {
    popular = result
  })
  await axios.get(`${apiUrl}/detail/${slug}`).then(result => {
    if(result.data.data.title == ""){
      res.status(404).send('Not found');
    } else {
      res.render("detail", {
       "comic": result,
       "popular": popular
      })
    }
  })
})

app.get("/search", async (req, res) => {
  const q = req.query.q
  console.log(q);
  let popular;
  await axios.get(`${apiUrl}/popular`)
  .then(result => {
    popular = result
  })
  await axios.get(`${apiUrl}/search/${q}`).then(result => {
    res.render("search", {
     "query": q,
     "comics": result,
     "popular": popular
    })
  })
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})