document.addEventListener("DOMContentLoaded", function () {
    fetchMitologia();

    const bandeiraFormElement = document.getElementById('bandeiraFormElement');
    if (bandeiraFormElement) {
        bandeiraFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveMitologia();
        });
    } else {
        console.error("Error: Element with ID 'MitologiaFormElement' not found.");
    }
});

function fetchMitologia() {
    fetch('http://localhost:8000/mythologies')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('MitologiaList');
            if (!list) {
                console.error("Error: Element with ID 'MitologiaList' not found.");
                return;
            }

            list.innerHTML = '<div class="card">';
            data.bandeiras.forEach(bandeira => {
                list.innerHTML += `
                    <div class="image"><img src="${mitologia.mytology_profile_img}"></img></div>
                        <div class="content">
                            <a href="#">
                                <span class="title">
                                    ${mitologia.name}
                                </span>
                            </a>

                        <p class="desc">
                            ${mitologia.id} 
                        </p>
                        <p class="desc">
                            ${mitologia.sub_description} 
                        </p>
                        <p class="desc">
                            ${mitologia.description} 
                        </p>
                        <p class="desc">
                            ${mitologia.origin} 
                        </p>
                        <p class="desc">
                            ${mitologia.period} 
                        </p>
                        <p class="desc">
                            ${mitologia.gods_qty} 
                        </p>
                        <p class="desc">
                            ${mitologia.sacred_texts} 
                        </p>
                        <p class="desc">
                            ${mitologia.main_mytology} 
                        </p>
                        <p class="desc">
                            ${mitologia.creator} 
                        </p>
                        <p class="desc">
                            ${mitologia.data_creation} 
                        </p>
                        <p class="desc">
                            ${mitologia.last_update} 
                        </p>
                        <p class="desc">
                            ${mitologia.main_symbol} 
                        </p>
                        <p class="desc">
                            ${mitologia.mytology_banner} 
                        </p>
                    </div>`;
            });
            list.innerHTML += '</div>';
        })
        .catch(error => {
            console.error("Error fetching mitologias:", error);
        });
}

function showAddForm() {
    document.getElementById('MitologiaForm').classList.remove('d-none');
    document.getElementById('MitologiasId').value = '';
    document.getElementById('name').value = '';
    document.getElementById('sub_description').value = '';
    document.getElementById('description').value = '';
    document.getElementById('origin').value = '';
    document.getElementById('period').value = '';
    document.getElementById('gods_qty').value = '';
    document.getElementById('sacred_texts').value = '';
    document.getElementById('main_mytology').value = '';
    document.getElementById('creator').value = '';
    document.getElementById('data_creation').value = '';
    document.getElementById('last_update').value = '';
    document.getElementById('main_symbol').value = '';
    document.getElementById('mytology_banner').value = '';
    document.getElementById('mytology_profile_img').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar Mitologia';
}

function showEditForm(id, name, sub_description, description, origin, period, gods_qty, sacred_texts, sacred_texts, main_mytology, creator, data_creation, last_update, main_symbol, mytology_banner, mytology_profile_img) {
    document.getElementById('bandeiraForm').classList.remove('d-none');
    document.getElementById('bandeiraId').value = id;
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

function saveBandeira() {
    const id = document.getElementById('bandeiraId').value;
    const nome = document.getElementById('nome').value;
    const tarifa = parseFloat(document.getElementById('tarifa').value);
    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/mythologies/${id}` : 'http://localhost:8000/mythologies';

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, tarifa })
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
            fetchBandeiras();
            document.getElementById('bandeiraForm').classList.add('d-none');
        })
        .catch(error => {
            console.error("Error saving bandeira:", error);
        });
}


function deleteBandeira(id) {
    fetch(`http://localhost:8000/mythologies/${id}`, {
        method: 'DELETE'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(() => fetchBandeiras())
        .catch(error => {
            console.error("Error deleting bandeira:", error);
        });
}


document.addEventListener("DOMContentLoaded", function () {
    fetchBandeiras();

    const bandeiraFormElement = document.getElementById('bandeiraFormElement');
    if (bandeiraFormElement) {
        bandeiraFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveBandeira();
        });
    } else {
        console.error("Error: Element with ID 'UniConFormElement' not found.");
    }
});