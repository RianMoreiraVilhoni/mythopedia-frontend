document.addEventListener("DOMContentLoaded", function () {
    fetchGods();

    const GodsFormElement = document.getElementById('GodsFormElement');
    if (GodsFormElement) {
        GodsFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveGod();
        });
    } else {
        console.error("Error: Element with ID 'GodsFormElement' not found.");
    }
});

// Função para buscar todos os deuses
function fetchGods() {
    fetch('http://localhost:8000/gods')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('GodsList');
            list.innerHTML = ''; // Limpa o conteúdo anterior

            data.gods.forEach(god => {
                list.innerHTML += `
                    <div class="card border rounded-lg shadow-lg overflow-hidden mb-6">
                        <div class="image">
                            <img src="${god.sacred_animal}" alt="${god.name}" class="w-full h-48 object-cover">
                        </div>
                        <div class="content p-4">
                            <h2 class="text-xl font-bold mb-2">${god.name}</h2>
                            <p class="text-gray-700 text-sm mb-2">Id: ${god.id}</p>
                            <p class="text-gray-700 text-sm mb-2">Sub-descrição: ${god.sub_description}</p>
                            <p class="text-gray-700 text-sm mb-2">Descrição: ${god.description}</p>
                            <p class="text-gray-700 text-sm mb-2">Símbolo: ${god.symbol}</p>
                            <p class="text-gray-700 text-sm mb-2">Domínio: ${god.domain}</p>
                            <p class="text-gray-700 text-sm mb-2">Parentesco: ${god.kinship}</p>
                            <p class="text-gray-700 text-sm mb-2">Características: ${god.caracteristics}</p>
                            <p class="text-gray-700 text-sm mb-2">Animal Sagrado: ${god.sacred_animal}</p>
                            <p class="text-gray-700 text-sm mb-2">Cor Sagrada: ${god.sacred_colour}</p>
                            <p class="text-gray-700 text-sm mb-2">Criado em: ${god.data_creation}</p>
                            <p class="text-gray-700 text-sm mb-2">Última atualização: ${god.last_update}</p>

                            <!-- Botões de Ação -->
                            <button class="btn btn-warning mr-2" style="background-color: #1abc9c;" onclick="showEditForm(${god.id}, '${god.name}', '${god.sub_description}', '${god.description}', '${god.symbol}', '${god.domain}', '${god.kinship}', '${god.caracteristics}', '${god.sacred_animal}', '${god.sacred_colour}', '${god.data_creation}', '${god.last_update}')">Atualizar</button>

                            <button style="background-color: #e74c3c;" onclick="deleteGod(${god.id})">Apagar</button>
                        </div>
                    </div>`;
            });
        })
        .catch(error => console.error("Error fetching gods:", error));
}

// Função para exibir o formulário de adição de novo deus
function showAddForm() {
    const formElement = document.getElementById('GodsForm');
    if (formElement) {
        formElement.classList.remove('d-none');
    } else {
        console.error("Error: Element with ID 'GodsForm' not found.");
    }

    // Limpar os campos do formulário para um novo registro
    document.getElementById('GodId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('sub_description').value = '';
    document.getElementById('description').value = '';
    document.getElementById('symbol').value = '';
    document.getElementById('domain').value = '';
    document.getElementById('kinship').value = '';
    document.getElementById('caracteristics').value = '';
    document.getElementById('sacred_animal').value = '';
    document.getElementById('sacred_colour').value = '';
    document.getElementById('data_creation').value = '';
    document.getElementById('last_update').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Deus';
}

// Função para exibir o formulário de edição de deus existente
function showEditForm(id, name, sub_description, description, symbol, domain, kinship, caracteristics, sacred_animal, sacred_colour, data_creation, last_update) {
    document.getElementById('GodsForm').classList.remove('d-none');
    document.getElementById('GodId').value = id;
    document.getElementById('name').value = name;
    document.getElementById('sub_description').value = sub_description;
    document.getElementById('description').value = description;
    document.getElementById('symbol').value = symbol;
    document.getElementById('domain').value = domain;
    document.getElementById('kinship').value = kinship;
    document.getElementById('caracteristics').value = caracteristics;
    document.getElementById('sacred_animal').value = sacred_animal;
    document.getElementById('sacred_colour').value = sacred_colour;
    document.getElementById('data_creation').value = data_creation;
    document.getElementById('last_update').value = last_update;
    document.getElementById('formTitle').innerText = 'Editar Deus';
}

// Função para salvar um novo deus ou atualizar um existente
function saveGod() {
    const id = document.getElementById('GodId').value;
    const name = document.getElementById('name').value;
    const sub_description = document.getElementById('sub_description').value;
    const description = document.getElementById('description').value;
    const symbol = document.getElementById('symbol').value;
    const domain = document.getElementById('domain').value;
    const kinship = document.getElementById('kinship').value;
    const caracteristics = document.getElementById('caracteristics').value;
    const sacred_animal = document.getElementById('sacred_animal').value;
    const sacred_colour = document.getElementById('sacred_colour').value;
    const data_creation = document.getElementById('data_creation').value;
    const last_update = document.getElementById('last_update').value;

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/gods/${id}` : 'http://localhost:8000/gods';

    const godData = {
        name,
        sub_description,
        description,
        symbol,
        domain,
        kinship,
        caracteristics,
        sacred_animal,
        sacred_colour,
        data_creation,
        last_update
    };

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(godData)
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
            fetchGods();
            document.getElementById('GodsForm').classList.add('d-none');
        })
        .catch(error => {
            console.error("Error saving god:", error);
        });
}

// Função para apagar um deus
function deleteGod(id) {
    fetch(`http://localhost:8000/gods/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao apagar deus: ${response.status}`);
            }
            return response.json();
        })
        .then(() => {
            fetchGods();
        })
        .catch(error => console.error("Error deleting god:", error));
}
