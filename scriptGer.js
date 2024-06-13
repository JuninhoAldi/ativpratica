function loja() {
    window.location.href = "loja.html";
}

let produtos = [];

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

    const linha = document.createElement("tr");
    linha.innerHTML = `
        <td>${nome}</td>
        <td>${descricao}</td> <!-- Mudança aqui: "descrição" para "descricao" -->
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

function editarProduto(botao) {
    const linha = botao.parentNode.parentNode;

    const nome = linha.cells[0].textContent;
    const descricao = linha.cells[1].textContent; 
    const preco = linha.cells[2].textContent;

    const edicao = `
    <form>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" value="${nome}">

        <label for="descricao">Descrição:</label> <!-- Mudança aqui: "descrição" para "descricao" -->
        <input type="text" id="descricao" value="${descricao}"> <!-- Mudança aqui: "descrição" para "descricao" -->

        <label for="preco">Preço:</label>
        <input type="number" id="preco" value="${preco}">

        <button type="button" onclick="salvarEdicao(this)">Salvar</button>
    </form>
   `;
    linha.innerHTML = edicao;
}

function salvarEdicao(botao) {
    const linha = botao.parentNode.parentNode.parentNode;

    const nome = linha.querySelector("#nome").value;
    const descricao = linha.querySelector("#descricao").value; 
    const preco = linha.querySelector("#preco").value;

    const indice = produtos.findIndex(produto => produto.nome === nome);
    produtos[indice].descricao = descricao; 
    produtos[indice].preco = preco;

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${descricao}</td> <!-- Mudança aqui: "descrição" para "descricao" -->
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

    linha.remove();
}
