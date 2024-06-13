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

function checkout(botao){
    const input =document.getElementById("inputs");
    input.innerHTML = "<input type='text' placeholder='Nome'> " +
    "<input type='text' placeholder='Endereço'> " +
    "<input type='text' placeholder='Telefone'>";

    const pagamento = document.getElementById("pagamento");
    pagamento.innerHTML = "<label>Forma de Pagamento:</label><br>" +
    "<input type='radio' name='forma_pagamento' value='cartao'> Cartão<br>" +
    "<input type='radio' name='forma_pagamento' value='pix'> Pix";

    botao.style.display = "none";
    
    const finalizarCompra = document.getElementById("finalizar");
    finalizarCompra.innerHTML = "<button onclick='finalizarCompraAlerta()'>Finalizar Compra</button>";
}

function finalizarCompraAlerta(){
        window.confirm("Você deseja confirmar a Compra?");
        window.alert("Obrigado pela Compra!")
}