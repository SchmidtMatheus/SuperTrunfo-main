function AddHero(){
    var hero = {
    "name": document.getElementById("name"),
    "picture" :document.getElementById("picture"),
    "intellignece" :document.getElementById("intelligence"),
    "strength" :document.getElementById("strength"),
    "speed" :document.getElementById("speed"),
    "durability" :document.getElementById("durability"),
    "power" :document.getElementById("power"),
    "combat" :document.getElementById("combat"),
    "image": document.getElementById("image")
    };


var requesturl = "https://akabab.github.io/superhero-api/api/all.json";
var request = new XMLHttpRequest();

request.open('POST', requesturl);
request.responseType = 'json';
request.send(JSON.stringify(hero));

}