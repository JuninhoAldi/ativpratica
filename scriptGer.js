function loja(){
    window.location.href = "loja.html";
}

let produtos = [];

function criarProduto(){
    const nome = document.getElementById("nome").value;
    const descrição = document.getElementById("descrição").value;
    const preço = document.getElementById("preço").value;

    const produto = {
        nome: nome,
        descrição: descrição,
        preço : preço
    };

    produtos.push(produto);

    const linha = document.createElement("tr");
    linha.innerHTML = `
        <td>${nome}</td>
        <td>${descrição}</td>
        <td>${preço}</td>
        <td>
            <button class="editar" onclick="editarProduto(this)">Editar</button>
            <button class="remover" onclick="removerProduto(this)">Remover</button>
        </td>
    `;
    
    document.getElementById("tProdutos").appendChild(linha);

    document.getElementById("nome").value = "";
    document.getElementById("descrição").value = "";
    document.getElementById("preço").value = "";
}

function editarProduto(botao){
    const linha = botao.parentNode.parentNode;

    const nome = linha.cells[0].textContent;
    const descrição = linha.cells[1].textContent;
    const preço = linha.cells[2].textContent;

    const edição = `
    <form>
        <label for="nome">Nome:</label>
        <input type="text" id="nome" value="${nome}">

        <label for="descrição">Descrição:</label>
        <input type="text" id="descrição" value="${descrição}">

        <label for="preço">Preço:</label>
        <input type="number" id="preço" value="${preço}">

        <button type="button" onclick="salvarEdição(this)">Salvar</button>
    </form>
   `;
   linha.innerHTML = edição;
}

function salvarEdição(botao){
    const linha = botao.parentNode.parentNode.parentNode;

    const nome = linha.querySelector("#nome").value;
    const descrição = linha.querySelector("#descrição").value;
    const preço = linha.querySelector("#preço").value;

    const indice = produtos.findIndex(produto => produto.nome === nome);
    produtos[indice].descrição = descrição;
    produtos[indice].preço = preço;

    linha.innerHTML = `
        <td>${nome}</td>
        <td>${descrição}</td>
        <td>${preço}</td>
        <td>
            <button class="editar" onclick="editarProduto(this)">Editar</button>
            <button class="remover" onclick="removerProduto(this)">Remover</button>
        </td>
    `;
}

function removerProduto(botao){
    const linha = botao.parentNode.parentNode;

    const indice = produtos.findIndex(produto => produto.nome === linha.cells[0].textContent);
    produtos.splice(indice, 1);

    linha.remove();
}
