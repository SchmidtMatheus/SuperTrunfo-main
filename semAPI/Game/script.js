var cartaBranca = {
        nome: "",
        imagem: "",
        atributos: {
            Velocidade: "",
            Força: "",
            Inteligencia: ""
        }
};
var  baralho = [
        carta1 = {
            nome: "Batman",
            imagem:"https://assets.reedpopcdn.com/the-batman-hbo-max.jpg/BROK/thumbnail/1200x1200/quality/100/the-batman-hbo-max.jpg",
            atributos: {
                Velocidade: 3,
                Força: 6,
                Inteligencia: 10
        }
    },
        carta2 = {
            nome: "Superman",
            imagem: "https://rollingstone.uol.com.br/media/uploads/ator_henry_cavill_como_personagem_da_dc_superman_foto_reproducao_dc.png",
            atributos: {
                Velocidade: 7,
                Força: 10,
                Inteligencia: 5
            }
        },
        carta3 = {
            nome: "Flash",
            imagem:"https://files.tecnoblog.net/wp-content/uploads/thumbs/2019/06/293458-thumb-serp-1200x675.jpg",
            atributos: {
                Velocidade: 10,
                Força: 6,
                Inteligencia: 7
            } 
        },
        carta4 = {
            nome: "Lanterna Verde",
            imagem:"https://br.web.img3.acsta.net/newsv7/19/10/30/00/25/0765468.jpg",
            atributos: {
                Velocidade: 8,
                Força: 5,
                Inteligencia: 7
            } 
        },
        carta5 = {
            nome: "Mulher Maravilha",
            imagem:"https://upload.wikimedia.org/wikipedia/pt/thumb/9/9f/Mulher_Maravilha_2009.jpg/250px-Mulher_Maravilha_2009.jpg",
            atributos: {
                Velocidade: 7,
                Força: 9,
                Inteligencia: 6
            } 
        },
        carta6 = {
            nome: "Caçador de Marte",
            imagem:"https://jovemnerd.com.br/wp-content/uploads/Injustice_Martian_Manhunter_1.jpg",
            atributos: {
                Velocidade: 5,
                Força: 6,
                Inteligencia: 10
            } 
        },
        carta7 = {
            nome: "Iron Man",
            imagem:"https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SL1024_.jpg",
            atributos: {
                Velocidade: 8,
                Força: 7,
                Inteligencia: 10
            }
        },
        carta8 = {
            nome: "Capitão América",
            imagem:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdbsyfOOH4z4PDLqMmRavTyAjYKwSU2SGA_Q&usqp=CAU",
            atributos: {
                Velocidade: 7,
                Força: 8,
                Inteligencia: 5
            } 
        },
        carta9 = {
            nome: "Homem Aranha",
            imagem:"https://static1.purebreak.com.br/articles/9/98/61/9/@/392535--homem-aranha-3-multiverso-teorias-c-diapo-3.jpg",
            atributos: {
                Velocidade: 8,
                Força: 7,
                Inteligencia: 9
            } 
        },
        carta10 = {
            nome: "Thor",
            imagem:"https://3.bp.blogspot.com/-D3Da6tAWuTM/WIfuzOJOh3I/AAAAAAAAC7I/lo0U2VmFtC4m5LuXSEnksq948svd6RhhACLcB/w1200-h630-p-k-no-nu/verdadeira-historia-do-thor-1.jpg",
            atributos: {
                Velocidade: 6,
                Força: 10,
                Inteligencia: 5
            } 
        },
]
var deckJogador = [];
var deckMaquina = [];
var cartaJogador;
var cartaMaquina;
var ganhador = 0;
var placar = [0,0];

function iniciar(){
    divideCartas();
    sortear();
    document.getElementById("mensagem").innerHTML = "Escolha o atributo do herói";
    document.getElementById("iniciar").disabled = true;
    document.getElementById("joga").disabled = false;
    exibirAtributos();
    document.getElementById("placar").innerHTML = `Placar ${placar[0]} x ${placar[1]}`;
}

function divideCartas() {
    let baralhoAux = baralho.slice();
    let carta;
  
    deckJogador = [];
    deckMaquina = [];
  
    while (baralhoAux.length > 0) {
        carta = parseInt(Math.random() * baralhoAux.length);
        deckJogador.push(baralhoAux[carta]);
        baralhoAux.splice(carta, 1);
    
        carta = parseInt(Math.random() * baralhoAux.length);
        deckMaquina.push(baralhoAux[carta]);
        baralhoAux.splice(carta, 1);
    }
}

function sortear(){
    ganhador = vencedor();
    if(ganhador == 0){
        let numeroCartaJogador = parseInt(Math.random() * deckJogador.length);
        let numeroCartaMaquina = parseInt(Math.random() * deckMaquina.length);
        cartaJogador = deckJogador[numeroCartaJogador];
        cartaMaquina = deckMaquina[numeroCartaMaquina];
        exibirCartaJogador();
        exibirAtributos();
        limpaCartaMaquina();
        document.getElementById("sorteio").disabled = true;
        document.getElementById("joga").disabled = false;
        document.getElementById("mensagem").innerHTML = "Escolha o atributo do herói";
    }else{
        placar = [0,0];
        cartaJogador = null;
        cartaMaquina = null;
    }
}

function exibirCartaJogador(){
    let carta = document.getElementById("areaJogador");
    carta.style.backgroundImage = `url(${cartaJogador.imagem})`;
}

function exibirCartaMaquina(){
    let maquina = document.getElementById("areaMaquina");
    let nome = `<p class="nomeCarta">${cartaMaquina.nome}</p>`;
    maquina.style.backgroundImage = `url(${cartaMaquina.imagem})`; 
    let opcoes = document.getElementById("atributos-maquina");
    let texto = "";
    for(let atributo in cartaMaquina.atributos){
        texto+= "<p type='text' name='atributo' value='" + atributo + "'>" + atributo + ": " + cartaMaquina.atributos[atributo] + "</p>";
    }
    opcoes.innerHTML = nome + texto;
}

function limpaCartaMaquina(){
    let revelar = document.getElementById("areaMaquina");
    revelar.style.backgroundImage = `${cartaBranca.imagem}`;
    let maquina = document.getElementById("areaMaquina");
    let nome = `<p class="nomeCarta">${cartaBranca.nome}</p>`;
    maquina.style.backgroundImage = `url(${cartaBranca.imagem})`;
    let opcoes = document.getElementById("atributos-maquina");
    let texto = "";
    for(let atributo in cartaBranca.atributos){
        texto+= "<p type='text' name='atributo' value='" + atributo + "'>" + " " + "</p>";
    }
    opcoes.innerHTML = nome + texto;
}

function exibirAtributos(){
    let opcoes = document.getElementById("opcoes-atributos");
    let nome = `<p class="nomeCarta">${cartaJogador.nome}</p>`;
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
    exibirCartaMaquina();
    let atributo = atributoSelecionado();
    let resultado = document.getElementById("mensagem");
    let valorCartaJogador = cartaJogador.atributos[atributo];
    let valorCartaMaquina = cartaMaquina.atributos[atributo];
    document.getElementById("sorteio").disabled = false;
    document.getElementById("joga").disabled = true;
    if(atributo == "Força" && valorCartaJogador < valorCartaMaquina){
        resultado.innerHTML = "Você perdeu, sua Força é menor!";
        placar[1]++;
    }else if(atributo == "Força" && valorCartaJogador > valorCartaMaquina){
        resultado.innerHTML = "Você ganhou, sua Força é maior";
        placar[0]++;
    }else if((atributo == "Velocidade" || atributo == "Inteligencia") && valorCartaJogador > valorCartaMaquina){
        resultado.innerHTML = `Você venceu, sua ${atributo} é maior!`;
        placar[0]++;
    }else if((atributo == "Velocidade" || atributo == "Inteligencia") && valorCartaJogador < valorCartaMaquina){
        resultado.innerHTML = `Você perdeu, sua ${atributo} é menor!`;
        placar[1]++;
    }else if((atributo == "Velocidade" || atributo == "Inteligencia" || atributo == "Força") && valorCartaJogador == valorCartaMaquina){
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