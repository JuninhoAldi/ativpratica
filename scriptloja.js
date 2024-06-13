document.addEventListener("DOMContentLoaded", () => {
    carregarProdutos();
    carregarCarrinho();
});

function carregarProdutos() {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const catalogo = document.getElementById("catalogoProdutos");

    produtos.forEach(produto => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.descricao}</td>
            <td>${produto.preco}</td>
            <td><button onclick="adicionarAoCarrinho('${produto.nome}')">Adicionar ao Carrinho</button></td>
        `;
        catalogo.appendChild(linha);
    });
}

let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

function salvarCarrinho() {
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
}

function carregarCarrinho() {
    const carrinhoProdutos = document.getElementById("carrinhoProdutos");
    carrinhoProdutos.innerHTML = "";
    let total = 0;

    carrinho.forEach(item => {
        total += item.preco * item.quantidade;
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${item.nome}</td>
            <td>${item.preco}</td>
            <td>${item.quantidade}</td>
            <td><button onclick="removerDoCarrinho('${item.nome}')">Remover</button></td>
        `;
        carrinhoProdutos.appendChild(linha);
    });

    document.getElementById("totalCarrinho").textContent = total.toFixed(2);
}

function adicionarAoCarrinho(nome) {
    const produtos = JSON.parse(localStorage.getItem('produtos')) || [];
    const produto = produtos.find(prod => prod.nome === nome);
    const itemCarrinho = carrinho.find(item => item.nome === nome);

    if (itemCarrinho) {
        itemCarrinho.quantidade++;
    } else {
        carrinho.push({ ...produto, quantidade: 1 });
    }

    salvarCarrinho();
    carregarCarrinho();
}

function removerDoCarrinho(nome) {
    const index = carrinho.findIndex(item => item.nome === nome);

    if (index !== -1) {
        carrinho.splice(index, 1);
    }

    salvarCarrinho();
    carregarCarrinho();
}
