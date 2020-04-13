var unirest = require("unirest");

module.exports = (to, text) => {
    var req = unirest("POST", "https://fapimail.p.rapidapi.com/email/send");
    
    req.headers({
        "x-rapidapi-host": "fapimail.p.rapidapi.com",
        "x-rapidapi-key": "bdd7e4a89fmsha541771b1825c29p1a6c75jsna07d8797a39c",
        "content-type": "application/json",
        "accept": "application/json"
    });
    
    req.type("json");
    req.send({
        "recipient": to,
        "sender": "nevvord@gmail.com",
        "subject": "OLZ",
        "message": text
    });
    
    req.end(function (res) {
        if (res.error) throw new Error(res.error);
    
        console.log(res.body);
    });

}
