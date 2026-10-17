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

const campoNome = document.getElementById("nome");
const campoEmail = document.getElementById("email");
const mensagemPerfil = document.getElementById("mensagem-perfil");

try {
    const salvo = JSON.parse(localStorage.getItem("olesc-perfil"));
    if (salvo) {
        campoNome.value = salvo.nome || "";
        campoEmail.value = salvo.email || "";
    }
} catch (erro) {
    console.error("Não foi possível ler o perfil salvo:", erro);
}

document.getElementById("salvar-perfil").addEventListener("click", function() {
    const nome = campoNome.value.trim();
    const email = campoEmail.value.trim();

    if (!nome || !email) {
        mensagemPerfil.style.color = "#B42318";
        mensagemPerfil.textContent = "Preencha o nome e o e-mail.";
        return;
    }

    try {
        localStorage.setItem("olesc-perfil", JSON.stringify({ nome: nome, email: email }));
        mensagemPerfil.style.color = "#247447";
        mensagemPerfil.textContent = "Perfil salvo neste aparelho.";
    } catch (erro) {
        mensagemPerfil.style.color = "#B42318";
        mensagemPerfil.textContent = "Não foi possível salvar neste navegador.";
    }
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
        navigator.serviceWorker.register("./service-worker.js")
            .catch(function(erro) {
                console.error("Erro ao ativar modo offline:", erro);
            });
    });
}