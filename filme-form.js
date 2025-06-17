const urlApi = 'https://api-filmes.ctdscleoracy.click/';

async function uploadImagem(file) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('authkey', '1');

    const urlUpload = urlApi + 'uploadImagem';
    const response = await fetch(urlUpload, {
        method: 'POST',
        body: formData
    });

    if (!response.ok) {
        const erro = await response.json();
        throw new Error(erro.erro || 'Erro no upload da imagem');
    }

    const result = await response.json();
    return result.caminho;
}

document.getElementById("formFilme").addEventListener("submit", async function (e) {
    e.preventDefault();

    const filme = {
        nome: document.getElementById("nome").value,
        duracao: parseInt(document.getElementById("duracao").value),
        dataDeLancamento: document.getElementById("dataDeLancamento").value,
        classificacaoIndicativa: document.getElementById("classificacaoIndicativa").value,
        diretor: document.getElementById("diretor").value,
        linkDoTrailler: document.getElementById("linkDoTrailler").value,
        categoria: document.getElementById("categoria").value,
        capaDoFilme: document.getElementById("formFile").files[0]
            ? document.getElementById("formFile").files[0].name
            : "Sem imagem",
        elenco: document.getElementById("elenco").value,
        sinopse: document.getElementById("sinopse").value,


    };

    console.log(filme);

})  