function ValidarFormulario(){
    var username = document.getElementById("username")
    var password = document.getElementById("password")

    console.log(username.value+password.value)

    if (username.value =="PPW2" && password.value =="ppw2")
    {
        localStorage.setItem("acesso", true)
        alert("usuário autenticado!")

        window.location.href = "../game/index.html"

    } else {
        alert ("Usuário ou senha inválidos!")
    }
}