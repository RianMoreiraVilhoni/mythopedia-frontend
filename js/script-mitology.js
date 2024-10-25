document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idMitologia = urlParams.get('idmitologico');

    if (idMitologia) {
        fetchMitologia(idMitologia);
        fetchHistorias(idMitologia); // Chama a função para buscar histórias
    } else {
        console.error("ID da mitologia não encontrado na URL.");
    }
});

// Função para buscar informações da mitologia pelo ID
function fetchMitologia(id) {
    fetch(`http://localhost:8000/mythologies/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar mitologia: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('mitoname').innerText = `Guia definitivo para a mitologia ${data.name}`;
            document.getElementById('sub-desc').innerText = data.sub_description;
            document.getElementById('inside-text').innerHTML = `<h3>${data.description}</h3>`;
            
            const imgElement = document.querySelector('.img-in-main');
            if (data.mytology_profile_img) {
                imgElement.style.backgroundImage = `url(http://localhost:8000/images/${data.mytology_profile_img})`;
            }
            
            const imgBanner = document.querySelector('.bg-img');
            if (data.mytology_banner) {
                imgBanner.style.backgroundImage = `url(http://localhost:8000/images/${data.mytology_banner})`;
            }
            
            const resourcesBox = document.getElementById('popular-resources-box');
            if (Array.isArray(data.popular_resources)) {
                data.popular_resources.forEach(resource => {
                    resourcesBox.innerHTML += `<a href="${resource.link}">${resource.title}</a>`;
                });
            }
        })
        .catch(error => {
            console.error("Error fetching mythology:", error);
        });
}

// Função para buscar histórias da mitologia pelo ID
function fetchHistorias(id) {
    fetch(`http://localhost:8000/history/mythologies/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar história: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const list = document.getElementById('story-list');
            list.innerHTML = ''; // Limpa o conteúdo anterior

            if (Array.isArray(data.mytologies)) {
                data.mytologies.forEach(story => {
                    list.innerHTML += `
                    <div>
                        <a href="#">AAA${story.title}</a>
                    </div>
                    `;
                });
            }
        })
        .catch(error => {
            console.error("Error fetching story:", error);
        });
}
