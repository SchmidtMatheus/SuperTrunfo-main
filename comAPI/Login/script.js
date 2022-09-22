function ValidarFormulario(){
    var username = document.getElementById("username")
    var password = document.getElementById("password")

    if (username.value =="Trunfo" && password.value =="password")
    {
        localStorage.setItem("acesso", true)
        alert("usuário autenticado!")

        window.location.href = "../Cadastro/index.html"

    } else {
        alert ("Usuário ou senha inválidos!")
    }
}