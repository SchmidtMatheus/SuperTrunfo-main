var requesturl = "https://akabab.github.io/superhero-api/api/all.json";
var request = new XMLHttpRequest();
var deckJogador = [];
var deckMaquina = [];
var cartaJogador;
var superHero = [];
var ganhador = 0;
var placar = [0,0];

request.open('GET', requesturl);
request.responseType = 'json';
request.send();

function requestJSON(){
request.onload = function() {
    var carta = request.response;

    for(i = 0; i< carta.length;i++) {
            superHero.id = carta.id,
            superHero.name = carta.name,
            superHero.intelligence = carta.powerstats.intelligence,
            superHero.strength = carta.powerstats.strength,
            superHero.speed = carta.powerstats.speed,
            superHero.durability = carta.powerstas.durability,
            superHero.power = carta.powerstats.power,
            superHero.combat = carta.powerstats.combat,
            superHero.image = carta.images.lg
        }
        return superHero;
  }

  
}





function iniciar(){
    requestJSON();
    divideCartas();
    sortear();
    document.getElementById("mensagem").innerHTML = "Escolha o atributo do herói";
    document.getElementById("iniciar").disabled = true;
    document.getElementById("joga").disabled = false;
    exibirAtributos();
    document.getElementById("placar").innerHTML = `Placar ${placar[0]} x ${placar[1]}`;
}

function divideCartas() {
    let cartaAux = superHero.slice();
    let superHero;
  
    deckJogador = [];
    deckMaquina = [];
  
    while (cartaAux.length > 0) {
        superHero = parseInt(Math.random() * cartaAux.length);
        deckJogador.push(cartaAux[superHero]);
        cartaAux.splice(superHero, 1);
    
        superHero = parseInt(Math.random() * cartaAux.length);
        deckMaquina.push(cartaAux[superHero]);
        cartaAux.splice(superHero, 1);
    }
}

function sortear(){
    ganhador = vencedor();
    if(ganhador == 0){
        let numeroCartaJogador = parseInt(Math.random() * deckJogador.length);
        let numerocarta = parseInt(Math.random() * deckMaquina.length);
        cartaJogador = deckJogador[numeroCartaJogador];
        superHero = deckMaquina[numerocarta];
        exibirCartaJogador();
        exibirAtributos();
        limpacarta();
        document.getElementById("sorteio").disabled = true;
        document.getElementById("joga").disabled = false;
        document.getElementById("mensagem").innerHTML = "Escolha o atributo do herói";
    }else{
        placar = [0,0];
        cartaJogador = null;
        superHero = null;
    }
}

function exibirCartaJogador(){
    let superHero = document.getElementById("areaJogador");
    superHero.style.backgroundImage = `url(${cartaJogador.image})`;
}

function exibircarta(){
    let maquina = document.getElementById("areaMaquina");
    let name = `<p class="nomeCarta">${superHero.name}</p>`;
    maquina.style.backgroundImage = `url(${superHero.image})`; 
    let opcoes = document.getElementById("atributos-maquina");
    let texto = "";
    for(let atributo in carta.atributos){
        texto+= "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + ": " + superHero.atributos[atributo] + "</p>";
    }
    opcoes.innerHTML = name + texto;
}

function limpacarta(){
    let revelar = document.getElementById("areaMaquina");
    revelar.style.backgroundImage = `${cartaBranca.image}`;
    let maquina = document.getElementById("areaMaquina");
    let name = `<p class="nomeCarta">${cartaBranca.name}</p>`;
    maquina.style.backgroundImage = `url(${cartaBranca.image})`;
    let opcoes = document.getElementById("atributos-maquina");
    let texto = "";
    for(let atributo in cartaBranca.atributos){
        texto+= "<p type='text' name='atributo' value='" + atributo + "'>" + " " + "</p>";
    }
    opcoes.innerHTML = name + texto;
}

function exibirAtributos(){
    let opcoes = document.getElementById("opcoes-atributos");
    let nome = `<p class="nomeCarta">${cart.nome}</p>`;
    let texto = "";
    for(let atributo in cartaJogador.atributos){
        texto+= "<input type='radio' name='atributo' value='" + atributo + "' checked>" + atributo + ": " + cartaJogador.atributos[atributo] + "<br>";
    }
    opcoes.innerHTML = nome + texto;
}

function atributoSelecionado(){
    let pegaAtributo = document.getElementsByName("atributo");
    for(let i = 0; i < pegaAtributo.length; i++){
        if(pegaAtributo[i].checked){
            return pegaAtributo[i].value;
        }
    }
}

function jogar(){
    exibircarta();
    let atributo = atributoSelecionado();
    let resultado = document.getElementById("mensagem");
    let valorCartaJogador = cartaJogador.atributos[atributo];
    let valorcarta = superHero.atributos[atributo];
    document.getElementById("sorteio").disabled = false;
    document.getElementById("joga").disabled = true;

    if((atributo == "speed" || atributo == "intelligence" || atributo == "strength" || atributo == "durability" || atributo == "power" || atributo == "combat") && valorCartaJogador > valorcarta){
        resultado.innerHTML = `Você venceu, sua ${atributo} é maior!`;
        placar[0]++;
    }else if((atributo == "speed" || atributo == "intelligence" || atributo == "strength" || atributo == "durability" || atributo == "power" || atributo == "combat") && valorCartaJogador < valorcarta){
        resultado.innerHTML = `Você perdeu, sua ${atributo} é menor!`;
        placar[1]++;
    }else if((atributo == "speed" || atributo == "intelligence" || atributo == "strength" || atributo == "durability" || atributo == "power" || atributo == "combat") && valorCartaJogador == valorcarta){
        resultado.innerHTML = "Empate!"
    }
    document.getElementById("placar").innerHTML = `Placar ${placar[0]} x ${placar[1]}`;
}

function vencedor(){
    if(placar[0] == 5){
        document.getElementById("mensagem").innerHTML = "Parabéns, você venceu!"
        document.getElementById("joga").disabled = true;
        document.getElementById("sorteio").disabled = true;
        document.getElementById("iniciar").disabled = false;
        return true;
    }else if(placar[1] == 5){
        document.getElementById("mensagem").innerHTML = "Você perdeu! Tente novamente"
        document.getElementById("joga").disabled = true;
        document.getElementById("sorteio").disabled = true;
        document.getElementById("iniciar").disabled = false;
        return true;
    }else{
        return false;
    }
}