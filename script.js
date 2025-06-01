// Controla os botões internos dentro da caixa-conteudo para abrir e fechar seus conteúdos

function abrirCaixa(id) {
  const caixas = [
    "caixa-Explorar",
    "caixa-Progresso",
    "caixa-Midia",
    "caixa-Mais",
    "caixa-conteudo",
  ];

  const larguraTela = window.innerWidth;

  // Se for botão "Mais" e tela <= 1283, abrimos caixa-conteudo
  let idParaAbrir = id;
  if (id === "caixa-Mais" && larguraTela <= 1283) {
    idParaAbrir = "caixa-conteudo";
  }

  const botoes = document.querySelectorAll(".caixa-botao button");
  const caixaAtual = document.getElementById(idParaAbrir);
  const estaAberta = caixaAtual.style.display === "block";

  if (estaAberta) {
    // Se a caixa já está aberta, fecha ela toda
    caixaAtual.style.display = "none";

    // Também fecha todas as sub-caixas internas, se for caixa-conteudo
    if (idParaAbrir === "caixa-conteudo") {
      document
        .querySelectorAll("#caixa-conteudo .caixa-fechar")
        .forEach((el) => {
          el.style.display = "none";
        });
    }

    botoes.forEach((botao) => {
      if (botao.getAttribute("onclick").includes(id)) {
        botao.classList.remove("ativo");
      }
    });
  } else {
    // Fecha todas as caixas
    caixas.forEach((caixaId) => {
      const el = document.getElementById(caixaId);
      if (el) el.style.display = "none";
    });

    botoes.forEach((botao) => botao.classList.remove("ativo"));

    // Abre a caixa atual
    caixaAtual.style.display = "block";

    if (idParaAbrir === "caixa-conteudo") {
      // Se caixa-conteudo abrir, fecha todas sub-caixas primeiro
      document
        .querySelectorAll("#caixa-conteudo .caixa-fechar")
        .forEach((el) => {
          el.style.display = "none";
        });

      // Não abre automaticamente nenhum grupo aqui (igual seu original)
    }

    botoes.forEach((botao) => {
      if (botao.getAttribute("onclick").includes(id)) {
        botao.classList.add("ativo");
      }
    });
  }
}

// Código extra para os botões internos da caixa-conteudo funcionarem
document.querySelectorAll("#caixa-conteudo .grupo .botao").forEach((botao) => {
  botao.addEventListener("click", () => {
    const caixaFechar = botao.nextElementSibling; // div .caixa-fechar do grupo
    const aberto = caixaFechar.style.display === "block";

    // Fecha todas as sub-caixas primeiro
    document.querySelectorAll("#caixa-conteudo .caixa-fechar").forEach((el) => {
      el.style.display = "none";
    });

    // Remove classe ativo de todos botões internos
    document.querySelectorAll("#caixa-conteudo .grupo .botao").forEach((b) => {
      b.classList.remove("ativo");
    });

    // Se não estava aberto, abre o que foi clicado
    if (!aberto) {
      caixaFechar.style.display = "block";
      botao.classList.add("ativo");
    }
  });
});
