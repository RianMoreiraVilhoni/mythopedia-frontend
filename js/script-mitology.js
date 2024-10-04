document.addEventListener("DOMContentLoaded", function () {
    fetchMitologias();

    const mitologiaFormElement = document.getElementById('mitologiaFormElement');
    if (mitologiaFormElement) {
        mitologiaFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveMitologia();
        });
    } else {
        console.error("Error: Element with ID 'mitologiaFormElement' not found.");
    }
});

function fetchMitologias() {
    fetch('http://127.0.0.1:8000/mythologies')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('mitologiaList');
            if (!list) {
                console.error("Error: Element with ID 'mitologiaList' not found.");
                return;
            }

            list.innerHTML = '<ul class="list-group border border-danger">';
            data.mitologias.forEach(mitologia => {
                list.innerHTML += `
                    <li class="list-group-item m-2 p-2 border-bottom">
                        <div class="row d-flex justify-content-between">
                            <div class="col"><strong>${mitologia.nome}</strong></div>
                            <div class="col">Descrição: ${mitologia.descricao}</div>
                            <div class="col">Origem: ${mitologia.origem}</div>
                            <div class="col">Período Histórico: ${mitologia.periodo_historico}</div>
                            <div class="col">Quantidade de Deuses: ${mitologia.qtd_deuses}</div>
                            <div class="col">Texto Sagrado: ${mitologia.texto_sagrado}</div>
                            <div class="col">Mitologia Principal: ${mitologia.mitologia_principal ? 'Sim' : 'Não'}</div>
                            <div class="col">Símbolo Principal: ${mitologia.simbolo_principal}</div>
                            <div class="col">Criador: ${mitologia.criador}</div>
                            <div class="col">
                                <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${mitologia.id}, '${mitologia.nome}', '${mitologia.descricao}', '${mitologia.origem}', '${mitologia.periodo_historico}', ${mitologia.qtd_deuses}, '${mitologia.texto_sagrado}', ${mitologia.mitologia_principal}, '${mitologia.simbolo_principal}', '${mitologia.criador}')">Editar</button>
                            </div>
                            <div class="col">
                                <button class="btn btn-danger btn-sm float-end" onclick="deleteMitologia(${mitologia.id})">Deletar</button>
                            </div>
                        </div>
                    </li>`;
            });
            list.innerHTML += '</ul>';
        })
        .catch(error => {
            console.error("Error fetching mitologias:", error);
        });
}

function showAddForm() {
    document.getElementById('mitologiaForm').classList.remove('d-none');
    document.getElementById('mitologiaId').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('origem').value = '';
    document.getElementById('periodo_historico').value = '';
    document.getElementById('qtd_deuses').value = '';
    document.getElementById('texto_sagrado').value = '';
    document.getElementById('mitologia_principal').value = '';
    document.addEventListener("DOMContentLoaded", function () {
        fetchMitologias();
    
        const mitologiaFormElement = document.getElementById('mitologiaFormElement');
        if (mitologiaFormElement) {
            mitologiaFormElement.addEventListener('submit', function (event) {
                event.preventDefault();
                saveMitologia();
            });
        } else {
            console.error("Error: Element with ID 'mitologiaFormElement' not found.");
        }
    });
    
    function fetchMitologias() {
        fetch('http://127.0.0.1:8000/mythologies')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const list = document.getElementById('mitologiaList');
                if (!list) {
                    console.error("Error: Element with ID 'mitologiaList' not found.");
                    return;
                }
    
                list.innerHTML = '<ul class="list-group border border-danger">';
                data.mitologias.forEach(mitologia => {
                    list.innerHTML += `
                        <li class="list-group-item m-2 p-2 border-bottom">
                            <div class="row d-flex justify-content-between">
                                <div class="col"><strong>${mitologia.nome}</strong></div>
                                <div class="col">Descrição: ${mitologia.descricao}</div>
                                <div class="col">Origem: ${mitologia.origem}</div>
                                <div class="col">Período Histórico: ${mitologia.periodo_historico}</div>
                                <div class="col">Quantidade de Deuses: ${mitologia.qtd_deuses}</div>
                                <div class="col">Texto Sagrado: ${mitologia.texto_sagrado}</div>
                                <div class="col">Mitologia Principal: ${mitologia.mitologia_principal ? 'Sim' : 'Não'}</div>
                                <div class="col">Símbolo Principal: ${mitologia.simbolo_principal}</div>
                                <div class="col">Criador: ${mitologia.criador}</div>
                                <div class="col">
                                    <button class="btn btn-info btn-sm float-end ms-2" onclick="showEditForm(${mitologia.id}, '${mitologia.nome}', '${mitologia.descricao}', '${mitologia.origem}', '${mitologia.periodo_historico}', ${mitologia.qtd_deuses}, '${mitologia.texto_sagrado}', ${mitologia.mitologia_principal}, '${mitologia.simbolo_principal}', '${mitologia.criador}')">Editar</button>
                                </div>
                                <div class="col">
                                    <button class="btn btn-danger btn-sm float-end" onclick="deleteMitologia(${mitologia.id})">Deletar</button>
                                </div>
                            </div>
                        </li>`;
                });
                list.innerHTML += '</ul>';
            })
            .catch(error => {
                console.error("Error fetching mitologias:", error);
            });
    }
    
    function showAddForm() {
        document.getElementById('mitologiaForm').classList.remove('d-none');
        document.getElementById('mitologiaId').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('descricao').value = '';
        document.getElementById('origem').value = '';
        document.getElementById('periodo_historico').value = '';
        document.getElementById('qtd_deuses').value = '';
        document.getElementById('texto_sagrado').value = '';
        document.getElementById('mitologia_principal').checked = false; // Ajuste para booleano
        document.getElementById('simbolo_principal').value = '';
        document.getElementById('criador').value = '';
        document.getElementById('formTitle').innerText = 'Adicionar Mitologia';
    }
    
    function showEditForm(id, nome, descricao, origem, periodo_historico, qtd_deuses, texto_sagrado, mitologia_principal, simbolo_principal, criador) {
        document.getElementById('mitologiaForm').classList.remove('d-none');
        document.getElementById('mitologiaId').value = id;
        document.getElementById('nome').value = nome;
        document.getElementById('descricao').value = descricao;
        document.getElementById('origem').value = origem;
        document.getElementById('periodo_historico').value = periodo_historico;
        document.getElementById('qtd_deuses').value = qtd_deuses;
        document.getElementById('texto_sagrado').value = texto_sagrado;
        document.getElementById('mitologia_principal').checked = mitologia_principal; // Ajuste para booleano
        document.getElementById('simbolo_principal').value = simbolo_principal;
        document.getElementById('criador').value = criador;
        document.getElementById('formTitle').innerText = 'Editar Mitologia';
    }
    
    function saveMitologia() {
        const id = document.getElementById('mitologiaId').value;
        const nome = document.getElementById('nome').value;
        const descricao = document.getElementById('descricao').value; // String
        const origem = document.getElementById('origem').value; // String
        const periodo_historico = document.getElementById('periodo_historico').value; // String
        const qtd_deuses = parseInt(document.getElementById('qtd_deuses').value, 10); // Inteiro
        const texto_sagrado = document.getElementById('texto_sagrado').value; // String
        const mitologia_principal = document.getElementById('mitologia_principal').checked; // Boolean
        const simbolo_principal = document.getElementById('simbolo_principal').value; // String
        const criador = document.getElementById('criador').value; // String
    
        const method = id ? 'PATCH' : 'POST';
        const url = id ? `http://127.0.0.1:8000/mythologies/${id}` : 'http://127.0.0.1:8000/mythologies';
    
        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nome, descricao, origem, periodo_historico, qtd_deuses, texto_sagrado, mitologia_principal, simbolo_principal, criador })
        })
        .then(response => {
            if (!response.ok) {
                return response.text().then(errorText => {
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
                });
            }
            return response.json();
        })
        .then(() => {
            fetchMitologias();
            document.getElementById('mitologiaForm').classList.add('d-none');
        })
        .catch(error => {
            console.error("Error saving mitologia:", error);
        });
    }
    
    function deleteMitologia(id) {
        fetch(`http://127.0.0.1:8000/mythologies/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => fetchMitologias())
        .catch(error => {
            console.error("Error deleting mitologia:", error);
        });
    }
    document.getElementById('simbolo_principal').value = '';
    document.getElementById('criador').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Mitologia';
}

function showEditForm(id, nome, descricao, origem, periodo_historico, qtd_deuses, texto_sagrado, mitologia_principal, simbolo_principal, criador) {
    document.getElementById('mitologiaForm').classList.remove('d-none');
    document.getElementById('mitologiaId').value = id;
    document.getElementById('nome').value = nome;
    document.getElementById('descricao').value = descricao;
    document.getElementById('origem').value = origem;
    document.getElementById('periodo_historico').value = periodo_historico;
    document.getElementById('qtd_deuses').value = qtd_deuses;
    document.getElementById('texto_sagrado').value = texto_sagrado;
    document.getElementById('mitologia_principal').value = mitologia_principal; 
    document.getElementById('simbolo_principal').value = simbolo_principal;
    document.getElementById('criador').value = criador;
    document.getElementById('formTitle').innerText = 'Editar Mitologia';
}

function saveMitologia() {
    const id = document.getElementById('mitologiaId').value;
    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value; // String
    const origem = document.getElementById('origem').value; // String
    const periodo_historico = document.getElementById('periodo_historico').value; // String
    const qtd_deuses = parseInt(document.getElementById('qtd_deuses').value, 100); // Inteiro
    const texto_sagrado = document.getElementById('texto_sagrado').value; // String
    const mitologia_principal = document.getElementById('mitologia_principal').value; // String
    const simbolo_principal = document.getElementById('simbolo_principal').value; // String
    const criador = document.getElementById('criador').value; // String

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://127.0.0.1:8000/mythologies/${id}` : 'http://127.0.0.1:8000/mythologies';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, descricao, origem, periodo_historico, qtd_deuses, texto_sagrado, mitologia_principal, simbolo_principal, criador })
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(errorText => {
                throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
            });
        }
        return response.json();
    })
    .then(() => {
        fetchMitologias();
        document.getElementById('mitologiaForm').classList.add('d-none');
    })
    .catch(error => {
        console.error("Error saving mitologia:", error);
    });
}

function deleteMitologia(id) {
    fetch(`http://127.0.0.1:8000/mythologies/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(() => fetchMitologias())
    .catch(error => {
        console.error("Error deleting mitologia:", error);
    });
}
