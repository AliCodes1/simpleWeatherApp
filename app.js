const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");

const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    
    const apiKey="4f5d9dc6c6445af48c25359e9e25a3eb"
    
    var query=req.body.cityName
    const url="https://api.openweathermap.org/data/2.5/weather?APPID="+apiKey+"&units=metric&q="+query+""
    
    https.get(url,function(response){
        response.on("data",function(data){
            const weatherInfo=JSON.parse(data);
            var temp=weatherInfo.main.temp;
            var description=weatherInfo.weather[0].description;
            var icon=weatherInfo.weather[0].icon;
            var imgURL="https://openweathermap.org/img/wn/"+ icon +"@2x.png"
            console.log(imgURL)
            res.write("<h1>The weather in "+query+" is " +temp+ " degrees celsius.</h1>");
            res.write("The weather is currently "+description);
            res.write("<br><img src="+imgURL+">");
            res.send();

        });

    })
})


app.listen(3000,function(req,res){
    console.log("Server running");
});