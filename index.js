const express = require('express')
const app = express()
var token = ""
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const CharacterAI = require('./node_characterai');
const characterAI = new CharacterAI();

app.get('/', (req, res) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food"]);
})

app.post('/', function(req, res) {


(async() => {
    if (req.body.auth == ""){
		characterAI.unauthenticate()
		token = await characterAI.authenticateAsGuest();
    }else{
		characterAI.unauthenticate()
		characterAI.setGuest(true)
		characterAI.setAuthenticated(true)
		characterAI.setToken(req.body.auth)
	}
    const characterId = "roCAnDLY3GUGRwUS1iR_GncjvxvntJtdGFsDZGtPMBo"
    const chat = await characterAI.createOrContinueChat(characterId);
    var response = await chat.sendAndAwaitResponse('hi', true)

  res.send({
    'Answer': response.text,
	'Token': token,
  });
})();

});

app.listen(process.env.PORT || 3000)