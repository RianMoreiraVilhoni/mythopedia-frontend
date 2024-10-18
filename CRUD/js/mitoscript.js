<<<<<<< HEAD
document.addEventListener("DOMContentLoaded", function () {
    fetchMitologia();

    const MitologiaFormElement = document.getElementById('MitologiaFormElement');
    if (MitologiaFormElement) {
        MitologiaFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveMitologia();
        });
    } else {
        console.error("Error: Element with ID 'MitologiaFormElement' not found.");
    }
});

function fetchMitologia() {
    fetch('http://localhost:8000/mythologies')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('MitologiaList');
            list.innerHTML = ''; // Limpa o conteúdo anterior

            data.mytologies.forEach(mitologia => {
                list.innerHTML += `
                    <div class="card border rounded-lg shadow-lg overflow-hidden mb-6">
                        <div class="image">
                            <img src="http://localhost:8000/images/${mitologia.mytology_profile_img}" alt="${mitologia.name}" class="w-full h-48 object-cover">
                        </div>
                        <div class="content p-4">
                            <h2 class="text-xl font-bold mb-2">${mitologia.name}</h2>
                            <p class="text-gray-700 text-sm mb-2">Id: ${mitologia.id}</p>
                            <p class="text-gray-700 text-sm mb-2">Sub-description: ${mitologia.sub_description}</p>
                            <p class="text-gray-700 text-sm mb-2">Description: ${mitologia.description}</p>
                            <p class="text-gray-700 text-sm mb-2">Origin: ${mitologia.origin}</p>
                            <p class="text-gray-700 text-sm mb-2">Period: ${mitologia.period}</p>
                            <p class="text-gray-700 text-sm mb-2">Gods Qty: ${mitologia.gods_qty}</p>
                            <p class="text-gray-700 text-sm mb-2">Sacred Texts: ${mitologia.sacred_texts}</p>
                            <p class="text-gray-700 text-sm mb-2">Main Mythology: ${mitologia.main_mytology}</p>
                            <p class="text-gray-700 text-sm mb-2">Creator: ${mitologia.creator}</p>
                            <p class="text-gray-700 text-sm mb-2">Created on: ${mitologia.data_creation}</p>
                            <p class="text-gray-700 text-sm mb-2">Last Update: ${mitologia.last_update}</p>
                            <p class="text-gray-700 text-sm mb-2">Main Symbol: ${mitologia.main_symbol}</p>

                            <!-- Botões de Ação -->
                            <button class="btn btn-warning mr-2" style="background-color: #1abc9c;" onclick="showEditForm()">Atualizar</button>

                            <button style="background-color: #e74c3c;" onclick="deleteMitologia('${mitologia.id}')">Apagar</button>
                        </div>
                    </div>`;
            });
        })
        .catch(error => console.error("Error fetching mitologias:", error));
}

function ShowInputs() {
    const inputs = document.getElementById('inputs')
    inputs.innerHTML += `
    
    <section id="MitologiaForm" class="MitologiaForm"
                            style="padding: 2rem; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 0.5rem;">
                            <h2 id="formTitle"
                                style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #4a5568;">
                                Cadastrar nova Mitologia</h2>
                            <form id="MitologiaFormElement" style="display: flex; flex-direction: column; gap: 1.5rem;">
                                <input type="hidden" id="MitologiaId">

                                <div>
                                    <label for="name"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Nome</label>
                                    <input type="text" id="name"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="sub_description"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Sub-descrição</label>
                                    <input type="text" id="sub_description"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="description"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Descrição</label>
                                    <textarea id="description"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required></textarea>
                                </div>

                                <div>
                                    <label for="origin"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Origem</label>
                                    <input type="text" id="origin"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="period"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Período</label>
                                    <input type="text" id="period"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="gods_qty"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Quantidade
                                        de Deuses</label>
                                    <input type="number" id="gods_qty"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>
        
                                <div>
                                    <label for="sacred_texts"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Textos
                                        Sagrados</label>
                                    <input type="text" id="sacred_texts"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="main_mytology"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Mitologia
                                        Principal</label>
                                    <input type="text" id="main_mytology"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="creator"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Criador</label>
                                    <input type="text" id="creator"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="data_creation"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Data
                                        de Criação</label>
                                    <input type="date" id="data_creation"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="last_update"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Última
                                        Atualização</label>
                                    <input type="date" id="last_update"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="main_symbol"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Símbolo
                                        Principal</label>
                                    <input type="text" id="main_symbol"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="mytology_banner"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Banner
                                        da Mitologia (URL)</label>
                                    <input type="txt" id="mytology_banner"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="mytology_profile_img"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Imagem
                                        de Perfil (URL)</label>
                                    <input type="txt" id="mytology_profile_img"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <button type="submit" onclick="saveMitologia()"
                                    style="padding: 0.75rem 1.5rem; background-color: #4f46e5; color: white; font-weight: bold; border-radius: 0.375rem; cursor: pointer; transition: background-color 0.3s;">
                                    Salvar
                                </button>
                            </form>
                        </section>
    `
}


function showAddForm() {
    const formElement = document.getElementById('MitologiaForm');
    if (formElement) {
        formElement.classList.remove('d-none');
    } else {
        console.error("Error: Element with ID 'MitologiaForm' not found.");
    }

    document.getElementById('MitologiaId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('sub_description').value = '';
    document.getElementById('description').value = '';
    document.getElementById('origin').value = '';
    document.getElementById('period').value = '';
    document.getElementById('gods_qty').value = '';
    document.getElementById('sacred_texts').value = '';
    document.getElementById('main_mytology').value = '';
    document.getElementById('creator').value = '';
    document.getElementById('main_symbol').value = '';
    document.getElementById('mytology_banner').value = '';
    document.getElementById('mytology_profile_img').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Mitologia';
}

function showEditForm(id, name, sub_description, description, origin, period, gods_qty, sacred_texts, main_mytology, creator, data_creation, last_update, main_symbol, mytology_banner, mytology_profile_img) {
    document.getElementById('mitologiaId').value = id;
    document.getElementById('mitologiaName').value = name;
    document.getElementById('mitologiaSubDescription').value = sub_description;
    document.getElementById('mitologiaDescription').value = description;
    document.getElementById('mitologiaOrigin').value = origin;
    document.getElementById('mitologiaPeriod').value = period;
    document.getElementById('mitologiaGodsQty').value = gods_qty;
    document.getElementById('mitologiaSacredTexts').value = sacred_texts;
    document.getElementById('mitologiaMainMytology').value = main_mytology;
    document.getElementById('mitologiaCreator').value = creator;
    document.getElementById('mitologiaDataCreation').value = data_creation;
    document.getElementById('mitologiaLastUpdate').value = last_update;
    document.getElementById('mitologiaMainSymbol').value = main_symbol;
    document.getElementById('mitologiaBanner').value = mytology_banner;
    document.getElementById('mitologiaProfileImg').value = mytology_profile_img;

    // Mostra o formulário de edição
    document.getElementById('formSection').style.display = 'block';
}

function saveMitologia() {
    const id = document.getElementById('MitologiaId').value;
    const name = document.getElementById('name').value;
    const sub_description = document.getElementById('sub_description').value;
    const description = document.getElementById('description').value;
    const origin = document.getElementById('origin').value;
    const period = document.getElementById('period').value;
    const gods_qty = document.getElementById('gods_qty').value;
    const sacred_texts = document.getElementById('sacred_texts').value;
    const main_mytology = document.getElementById('main_mytology').value;
    const creator = document.getElementById('creator').value;
    const data_creation = document.getElementById('data_creation').value;
    const last_update = document.getElementById('last_update').value;
    const main_symbol = document.getElementById('main_symbol').value;
    const mytology_banner = document.getElementById('mytology_banner').value;
    const mytology_profile_img = document.getElementById('mytology_profile_img').value;

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/mythologies/${id}` : 'http://localhost:8000/mythologies';

    const mitologiaData = {
        name,
        sub_description,
        description,
        origin,
        period,
        gods_qty,
        sacred_texts,
        main_mytology,
        creator,
        data_creation,
        last_update,
        main_symbol,
        mytology_banner,
        mytology_profile_img
    };

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mitologiaData)
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
            fetchMitologia();
            document.getElementById('MitologiaForm').classList.add('d-none');
        })
        .catch(error => {
            console.error("Error saving mitologia:", error);
        });
}



function deleteMitologia(id) {
    fetch(`http://localhost:8000/mythologies/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao apagar mitologia: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            fetchMitologia();
        })
        .catch(error => console.error("Error deleting Mitologia:", error));
}


document.addEventListener("DOMContentLoaded", function () {
    fetchMitologia();

    const MitologiaFormElement = document.getElementById('MitologiaFormElement');
    if (MitologiaFormElement) {
        MitologiaFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveMitologia();
        });
    } else {
        console.error("Error: Element with ID 'UniConFormElement' not found.");
    }
=======
document.addEventListener("DOMContentLoaded", function () {
    fetchMitologia();

    const MitologiaFormElement = document.getElementById('MitologiaFormElement');
    if (MitologiaFormElement) {
        MitologiaFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveMitologia();
        });
    } else {
        console.error("Error: Element with ID 'MitologiaFormElement' not found.");
    }
});

function fetchMitologia() {
    fetch('http://localhost:8000/mythologies')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('MitologiaList');
            list.innerHTML = ''; // Limpa o conteúdo anterior

            data.mytologies.forEach(mitologia => {
                list.innerHTML += `
                    <div class="card border rounded-lg shadow-lg overflow-hidden mb-6">
                        <div class="image">
                            <img src="http://localhost:8000/images/${mitologia.mytology_profile_img}" alt="${mitologia.name}" class="w-full h-48 object-cover">
                        </div>
                        <div class="content p-4">
                            <h2 class="text-xl font-bold mb-2">${mitologia.name}</h2>
                            <p class="text-gray-700 text-sm mb-2">Id: ${mitologia.id}</p>
                            <p class="text-gray-700 text-sm mb-2">Sub-description: ${mitologia.sub_description}</p>
                            <p class="text-gray-700 text-sm mb-2">Description: ${mitologia.description}</p>
                            <p class="text-gray-700 text-sm mb-2">Origin: ${mitologia.origin}</p>
                            <p class="text-gray-700 text-sm mb-2">Period: ${mitologia.period}</p>
                            <p class="text-gray-700 text-sm mb-2">Gods Qty: ${mitologia.gods_qty}</p>
                            <p class="text-gray-700 text-sm mb-2">Sacred Texts: ${mitologia.sacred_texts}</p>
                            <p class="text-gray-700 text-sm mb-2">Main Mythology: ${mitologia.main_mytology}</p>
                            <p class="text-gray-700 text-sm mb-2">Creator: ${mitologia.creator}</p>
                            <p class="text-gray-700 text-sm mb-2">Created on: ${mitologia.data_creation}</p>
                            <p class="text-gray-700 text-sm mb-2">Last Update: ${mitologia.last_update}</p>
                            <p class="text-gray-700 text-sm mb-2">Main Symbol: ${mitologia.main_symbol}</p>

                            <!-- Botões de Ação -->
                            <button class="btn btn-warning mr-2" style="background-color: #1abc9c;" onclick="showEditForm()">Atualizar</button>

                            <button style="background-color: #e74c3c;" onclick="deleteMitologia('${mitologia.id}')">Apagar</button>
                        </div>
                    </div>`;
            });
        })
        .catch(error => console.error("Error fetching mitologias:", error));
}

function ShowInputs() {
    const inputs = document.getElementById('inputs')
    inputs.innerHTML += `
    
    <section id="MitologiaForm" class="MitologiaForm"
                            style="padding: 2rem; background-color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); border-radius: 0.5rem;">
                            <h2 id="formTitle"
                                style="font-size: 1.5rem; font-weight: bold; margin-bottom: 1.5rem; color: #4a5568;">
                                Cadastrar nova Mitologia</h2>
                            <form id="MitologiaFormElement" style="display: flex; flex-direction: column; gap: 1.5rem;">
                                <input type="hidden" id="MitologiaId">

                                <div>
                                    <label for="name"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Nome</label>
                                    <input type="text" id="name"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="sub_description"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Sub-descrição</label>
                                    <input type="text" id="sub_description"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="description"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Descrição</label>
                                    <textarea id="description"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required></textarea>
                                </div>

                                <div>
                                    <label for="origin"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Origem</label>
                                    <input type="text" id="origin"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="period"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Período</label>
                                    <input type="text" id="period"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="gods_qty"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Quantidade
                                        de Deuses</label>
                                    <input type="number" id="gods_qty"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>
        
                                <div>
                                    <label for="sacred_texts"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Textos
                                        Sagrados</label>
                                    <input type="text" id="sacred_texts"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="main_mytology"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Mitologia
                                        Principal</label>
                                    <input type="text" id="main_mytology"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="creator"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Criador</label>
                                    <input type="text" id="creator"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="data_creation"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Data
                                        de Criação</label>
                                    <input type="date" id="data_creation"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="last_update"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Última
                                        Atualização</label>
                                    <input type="date" id="last_update"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="main_symbol"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Símbolo
                                        Principal</label>
                                    <input type="text" id="main_symbol"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="mytology_banner"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Banner
                                        da Mitologia (URL)</label>
                                    <input type="txt" id="mytology_banner"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <div>
                                    <label for="mytology_profile_img"
                                        style="display: block; font-size: 0.875rem; font-weight: 600; color: #4a5568;">Imagem
                                        de Perfil (URL)</label>
                                    <input type="txt" id="mytology_profile_img"
                                        style="margin-top: 0.25rem; width: 100%; padding: 0.5rem; border: 1px solid #d2d6dc; border-radius: 0.375rem; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);"
                                        required>
                                </div>

                                <button type="submit" onclick="saveMitologia()"
                                    style="padding: 0.75rem 1.5rem; background-color: #4f46e5; color: white; font-weight: bold; border-radius: 0.375rem; cursor: pointer; transition: background-color 0.3s;">
                                    Salvar
                                </button>
                            </form>
                        </section>
    `
}


function showAddForm() {
    const formElement = document.getElementById('MitologiaForm');
    if (formElement) {
        formElement.classList.remove('d-none');
    } else {
        console.error("Error: Element with ID 'MitologiaForm' not found.");
    }

    document.getElementById('MitologiaId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('sub_description').value = '';
    document.getElementById('description').value = '';
    document.getElementById('origin').value = '';
    document.getElementById('period').value = '';
    document.getElementById('gods_qty').value = '';
    document.getElementById('sacred_texts').value = '';
    document.getElementById('main_mytology').value = '';
    document.getElementById('creator').value = '';
    document.getElementById('main_symbol').value = '';
    document.getElementById('mytology_banner').value = '';
    document.getElementById('mytology_profile_img').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Mitologia';
}

function showEditForm(id, name, sub_description, description, origin, period, gods_qty, sacred_texts, main_mytology, creator, data_creation, last_update, main_symbol, mytology_banner, mytology_profile_img) {
    document.getElementById('mitologiaId').value = id;
    document.getElementById('mitologiaName').value = name;
    document.getElementById('mitologiaSubDescription').value = sub_description;
    document.getElementById('mitologiaDescription').value = description;
    document.getElementById('mitologiaOrigin').value = origin;
    document.getElementById('mitologiaPeriod').value = period;
    document.getElementById('mitologiaGodsQty').value = gods_qty;
    document.getElementById('mitologiaSacredTexts').value = sacred_texts;
    document.getElementById('mitologiaMainMytology').value = main_mytology;
    document.getElementById('mitologiaCreator').value = creator;
    document.getElementById('mitologiaDataCreation').value = data_creation;
    document.getElementById('mitologiaLastUpdate').value = last_update;
    document.getElementById('mitologiaMainSymbol').value = main_symbol;
    document.getElementById('mitologiaBanner').value = mytology_banner;
    document.getElementById('mitologiaProfileImg').value = mytology_profile_img;

    // Mostra o formulário de edição
    document.getElementById('formSection').style.display = 'block';
}

function saveMitologia() {
    const id = document.getElementById('MitologiaId').value;
    const name = document.getElementById('name').value;
    const sub_description = document.getElementById('sub_description').value;
    const description = document.getElementById('description').value;
    const origin = document.getElementById('origin').value;
    const period = document.getElementById('period').value;
    const gods_qty = document.getElementById('gods_qty').value;
    const sacred_texts = document.getElementById('sacred_texts').value;
    const main_mytology = document.getElementById('main_mytology').value;
    const creator = document.getElementById('creator').value;
    const data_creation = document.getElementById('data_creation').value;
    const last_update = document.getElementById('last_update').value;
    const main_symbol = document.getElementById('main_symbol').value;
    const mytology_banner = document.getElementById('mytology_banner').value;
    const mytology_profile_img = document.getElementById('mytology_profile_img').value;

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/mythologies/${id}` : 'http://localhost:8000/mythologies';

    const mitologiaData = {
        name,
        sub_description,
        description,
        origin,
        period,
        gods_qty,
        sacred_texts,
        main_mytology,
        creator,
        data_creation,
        last_update,
        main_symbol,
        mytology_banner,
        mytology_profile_img
    };

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(mitologiaData)
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
            fetchMitologia();
            document.getElementById('MitologiaForm').classList.add('d-none');
        })
        .catch(error => {
            console.error("Error saving mitologia:", error);
        });
}



function deleteMitologia(id) {
    fetch(`http://localhost:8000/mythologies/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao apagar mitologia: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            fetchMitologia();
        })
        .catch(error => console.error("Error deleting Mitologia:", error));
}


document.addEventListener("DOMContentLoaded", function () {
    fetchMitologia();

    const MitologiaFormElement = document.getElementById('MitologiaFormElement');
    if (MitologiaFormElement) {
        MitologiaFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveMitologia();
        });
    } else {
        console.error("Error: Element with ID 'UniConFormElement' not found.");
    }
>>>>>>> 97344cd (primero)
});