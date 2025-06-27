const urlApi = 'https://api-filmes.ctdscleoracy.click/';

//cria funcao para fazer upload da imagem

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

    let capaCaminho = "";

    const file = document.getElementById("capaDoFilme").files[0];
    if (file) {
        try {
            capaCaminho = await uploadImagem(file);
        } catch (error) {
            alert("Erro ao fazer upload da imagem:" + error.message);
            return;
        }
    }

    const filme = {
        nome: document.getElementById("nome").value,
        duracao: parseInt(document.getElementById("duracao").value),
        dataDeLancamento: document.getElementById("dataDeLancamento").value,
        classificacaoIndicativa: document.getElementById("classificacaoIndicativa").value,
        diretor: document.getElementById("diretor").value,
        linkTrailler: document.getElementById("linkDoTrailler").value,
        categoria: document.getElementById("categoria").value,
        capa_do_filme: capaCaminho,
        elenco: document.getElementById("elenco").value,
        sinopse: document.getElementById("sinopse").value
    };

    try {
        const urlAdicionar = urlApi + "adicionar";
        const response = await fetch(urlAdicionar, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(filme)

        });

        const result = await response.json();

        if(response.ok){
            alert("Filme cadastrado com sucesso!");
            document.getElementById("formFilme").reset();
        } else{
            alert("Erro ao cadastrar filme: " + (result.message || result.erro));
        }

    } catch (error) {
        console.error("Erro ao enviar filme: ", error);
        alert("Erro ao enviar filme: " + error.message);
    }
});  