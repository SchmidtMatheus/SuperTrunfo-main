var requesturl = "https://akabab.github.io/carta-api/api/all.json";
var deckJogador = [];
var deckMaquina = [];
var cartaJogador;
var carta = [];
var ganhador = 0;
var placar = [0,0];

function iniciar(){

    const json = fetch(requesturl,{
        method:'GET'
    }).then(function() {
      console.log(json)

      var array = Object.keys(json).map(i => JSON.parse(json[Number(i)]));
    
      carta = array.map(jsonData => {
        return {
          'id': jsonData.id,
          'name': jsonData.name,
          'intelligence': jsonData.intelligence,
          'strength': jsonData.strength,
          'speed': jsonData.speed,
          'durability': jsonData.durability,
          'power': jsonData.power,
          'combat' : jsonData.combat,
          'image' : jsonData.image,
        }
    });
    });

    divideCartas();
    sortear();
    document.getElementById("mensagem").innerHTML = "Escolha o atributo do herói";
    document.getElementById("iniciar").disabled = true;
    document.getElementById("joga").disabled = false;
    exibirAtributos();
    document.getElementById("placar").innerHTML = `Placar ${placar[0]} x ${placar[1]}`;
}

function divideCartas() {
    let cartaAux = carta.slice();
    let carta;
  
    deckJogador = [];
    deckMaquina = [];
  
    while (cartaAux.length > 0) {
        carta = parseInt(Math.random() * cartaAux.length);
        deckJogador.push(cartaAux[carta]);
        cartaAux.splice(carta, 1);
    
        carta = parseInt(Math.random() * cartaAux.length);
        deckMaquina.push(cartaAux[carta]);
        cartaAux.splice(carta, 1);
    }
}

function sortear(){
    ganhador = vencedor();
    if(ganhador == 0){
        let numeroCartaJogador = parseInt(Math.random() * deckJogador.length);
        let numerocarta = parseInt(Math.random() * deckMaquina.length);
        cartaJogador = deckJogador[numeroCartaJogador];
        carta = deckMaquina[numerocarta];
        exibirCartaJogador();
        exibirAtributos();
        limpacarta();
        document.getElementById("sorteio").disabled = true;
        document.getElementById("joga").disabled = false;
        document.getElementById("mensagem").innerHTML = "Escolha o atributo do herói";
    }else{
        placar = [0,0];
        cartaJogador = null;
        carta = null;
    }
}

function exibirCartaJogador(){
    let carta = document.getElementById("areaJogador");
    carta.style.backgroundImage = `url(${cartaJogador.image})`;
}

function exibircarta(){
    let maquina = document.getElementById("areaMaquina");
    let name = `<p class="nomeCarta">${carta.name}</p>`;
    maquina.style.backgroundImage = `url(${carta.image})`; 
    let opcoes = document.getElementById("atributos-maquina");
    let texto = "";
    for(let atributo in carta.atributos){
        texto+= "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + ": " + carta.atributos[atributo] + "</p>";
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
    let valorcarta = carta.atributos[atributo];
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