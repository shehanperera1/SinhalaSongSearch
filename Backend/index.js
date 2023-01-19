const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(cors())

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);


// searching on query

app.post('/srcsearchmetaphor', async (req, res) => {
  const { SrcmetaphorSearch } = require('./SearchEngine');
  const data = await SrcmetaphorSearch(req.body.query);
  res.json(data);
})

app.post('/tgtsearchmetaphor', async (req, res) => {
  const { TgtmetaphorSearch } = require('./SearchEngine');
  const data = await TgtmetaphorSearch(req.body.query);
  res.json(data);
})

app.post('/srcautocomplete', async (req, res) => {
  const { SrcAutoComplete } = require('./SearchEngine');
  const data = await SrcAutoComplete(req.body.query);
  res.json(data);
})

app.post('/tgtautocomplete', async (req, res) => {
  const { TgtAutoComplete } = require('./SearchEngine');
  const data = await TgtAutoComplete(req.body.query);
  res.json(data);
})

app.post("/otherfieldsearch", async (req, res) => {
  const { OtherFieldSearch } = require("./SearchEngine");
  const data = await OtherFieldSearch(req.body.query,req.body.field);
  res.json(data);
});

app.listen(3001, () => console.log('server running at 3001'));