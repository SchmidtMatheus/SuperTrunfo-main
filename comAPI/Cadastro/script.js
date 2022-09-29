function AddHero(){

const hero = {
    "name": document.getElementById("name").value,
    "picture": document.getElementById("picture").value,
    "intelligence": document.getElementById("intelligence").value,
    "strength": document.getElementById("strength").value,
    "speed": document.getElementById("speed").value,
    "durability": document.getElementById("durability").value,
    "power": document.getElementById("power").value,
    "combat": document.getElementById("combat").value,
    }; 

    DownloadHero();   


function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  function DownloadHero(){
      download(JSON.stringify(hero), "hero.json", "text/plain");
  }
}

