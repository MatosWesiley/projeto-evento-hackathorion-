
const botoesNavegacao = document.querySelectorAll(".item-nav");
const botoesTela = document.querySelectorAll("[data-tela]");
const telas = document.querySelectorAll(".tela");

function abrirTela(nomeTela) {
    telas.forEach(function(tela) {
        tela.classList.remove("ativa");
    });

    const telaSelecionada = document.getElementById(nomeTela);

    if (!telaSelecionada) {
        return;
    }

    telaSelecionada.classList.add("ativa");

    botoesNavegacao.forEach(function(botao) {
        botao.classList.toggle(
            "ativo",
            botao.dataset.tela === nomeTela
        );
    });

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

botoesTela.forEach(function(botao) {
    botao.addEventListener("click", function() {
        abrirTela(botao.dataset.tela);
    });
});

document.getElementById("salvar-perfil").addEventListener("click", function() {
    const nome = document.getElementById("nome").value.trim();
    const email = document.getElementById("email").value.trim();
    const mensagem = document.getElementById("mensagem-perfil");

    if (!nome || !email) {
        mensagem.style.color = "#B42318";
        mensagem.textContent = "Preencha o nome e o e-mail.";
        return;
    }

    mensagem.style.color = "#247447";
    mensagem.textContent = "Informações preenchidas com sucesso!";
});


if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("./service-worker.js")
            .catch(function(erro) {
                console.error("Erro ao ativar modo offline:", erro);
            });
    });
}
