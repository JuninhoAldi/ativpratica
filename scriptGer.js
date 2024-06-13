function loja() {
    window.location.href = "loja.html";
}

let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

function salvarProdutos() {
    localStorage.setItem('produtos', JSON.stringify(produtos));
}

function criarProduto() {
    const nome = document.getElementById("nome").value;
    const descricao = document.getElementById("descricao").value;
    const preco = document.getElementById("preco").value;

    const produto = {
        nome: nome,
        descricao: descricao,
        preco: preco
    };

    produtos.push(produto);
    salvarProdutos();

    const linha = document.createElement("tr");
    linha.innerHTML = `
        <td>${nome}</td>
        <td>${descricao}</td>
        <td>${preco}</td>
        <td>
            <button class="editar" onclick="editarProduto(this)">Editar</button>
            <button class="remover" onclick="removerProduto(this)">Remover</button>
        </td>
    `;

    document.getElementById("tProdutos").appendChild(linha);

    document.getElementById("nome").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("preco").value = "";
}

function carregarProdutos() {
    produtos.forEach(produto => {
        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.descricao}</td>
            <td>${produto.preco}</td>
            <td>
                <button class="editar" onclick="editarProduto(this)">Editar</button>
                <button class="remover" onclick="removerProduto(this)">Remover</button>
            </td>
        `;
        document.getElementById("tProdutos").appendChild(linha);
    });
}

function editarProduto(botao) {
    const linha = botao.parentNode.parentNode;
    const nome = linha.cells[0].textContent;
    const descricao = linha.cells[1].textContent;
    const preco = linha.cells[2].textContent;

    const edicao = `
        <td><input type="text" id="nome" value="${nome}"></td>
        <td><input type="text" id="descricao" value="${descricao}"></td>
        <td><input type="number" id="preco" value="${preco}"></td>
        <td>
            <button type="button" onclick="salvarEdicao(this, '${nome}')">Salvar</button>
        </td>
    `;
    linha.innerHTML = edicao;
}

function salvarEdicao(botao, nomeOriginal) {
    const linha = botao.parentNode.parentNode;
    const nome = linha.querySelector("#nome").value;
    const descricao = linha.querySelector("#descricao").value;
    const preco = linha.querySelector("#preco").value;

    const indice = produtos.findIndex(produto => produto.nome === nomeOriginal);
    produtos[indice] = { nome, descricao, preco };
    salvarProdutos();

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${descricao}</td>
        <td>${preco}</td>
        <td>
            <button class="editar" onclick="editarProduto(this)">Editar</button>
            <button class="remover" onclick="removerProduto(this)">Remover</button>
        </td>
    `;
}

function removerProduto(botao) {
    const linha = botao.parentNode.parentNode;

    const indice = produtos.findIndex(produto => produto.nome === linha.cells[0].textContent);
    produtos.splice(indice, 1);
    salvarProdutos();

    linha.remove();
}

document.addEventListener("DOMContentLoaded", carregarProdutos);
