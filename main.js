const Bitcoin = require("bitcoin-address-generator");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const port = 4000

let address;
function gen(){

Bitcoin.createWalletAddress((response) => {
  address = response;
});

}

app.use(express.static('views'))
  app.set('view engine', 'ejs');
  app.get('/', (req, res) => {
    res.render('index')
  })
  
  app.use(bodyParser.urlencoded({ extended: true })); 
  app.post("/address", (req, res) => {
    gen();
    res.render('address', {address:address})
  })

  app.listen(port, () => {
    console.log(`running at http://localhost:${port}`)
  })
