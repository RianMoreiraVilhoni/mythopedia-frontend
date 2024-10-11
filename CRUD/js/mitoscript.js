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
                            <img src="${mitologia.mytology_profile_img}" alt="${mitologia.name}" class="w-full h-48 object-cover">
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

function showEditForm(id, name, sub_description, description, origin, period, gods_qty, sacred_texts, sacred_texts, main_mytology, creator, data_creation, last_update, main_symbol, mytology_banner, mytology_profile_img) {
    document.getElementById('MitologiaForm').classList.remove('d-none');
    document.getElementById('MitologiasId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('sub_description').value = sub_description;
    document.getElementById('description').value = description;
    document.getElementById('origin').value = origin;
    document.getElementById('period').value = period;
    document.getElementById('gods_qty').value = gods_qty;
    document.getElementById('sacred_texts').value = sacred_texts;
    document.getElementById('main_mytology').value = main_mytology;
    document.getElementById('creator').value = creator;
    document.getElementById('data_creation').value = data_creation;
    document.getElementById('last_update').value = last_update;
    document.getElementById('main_symbol').value = main_symbol;
    document.getElementById('mytology_banner').value = mytology_banner;
    document.getElementById('mytology_profile_img').value = mytology_profile_img;
    document.getElementById('formTitle').innerText = 'Editar Mitologia';
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
});