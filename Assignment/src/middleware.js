
const jwt = require('jsonwebtoken');


module.exports = function bearerToken(app){
const checkTocken = (req, res, next) => {
    let token = req. headers['x-access-token'] || req.headers['authorization'];
   
    if(token = undefined){
        return res.status(401).send({"error": "Token is not present"});
    }

   
    if(token.startswith('Bearer')) {
        token = token.slice(7, token.length);
    }
}
if(token){
    jwt.verify(token, "thisismysecret", (err, decoded)=> {
if(err){
    return res.json({
        success: false,
        message: "Token is not right..."
    })
}else{
      req.decoded = decoded;
      next();
}
    })
}else{
    return res.json({
        success: false,
        message: "Token is not right..."
    })
}

app.get("/api/get", async (req, res) => {
    checkTocken(req, res, () =>{
        console.log(req.decoded);
return res.status(200).send({data: "get data success"});
    });
});

app.post("/api/get", async (req, res) => {
    checkTocken(req, res, () =>{
        console.log(req.decoded);
return res.status(200).send({data: "create data success"});
    });
});

app.put("/api/get", async (req, res) => {
    checkTocken(req, res, () =>{
        console.log(req.decoded);
return res.status(200).send({data: "update data success"});
    });
});


}