document.addEventListener("DOMContentLoaded", function () {
    // Recuperar o ID da deuses da URL
    const urlParams = new URLSearchParams(window.location.search);
    const iddeuses = urlParams.get('idmitologico');

    if (idMitologia) {
        fetchDeuses(iddeuses);
    } else {
        console.error("ID da mitologia não encontrado na URL.");
    }
});

// Função para buscar informações do deus pelo ID
function fetchDeuses(id) {
    fetch(`http://localhost:8000/gods/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar deuses: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Preencher os elementos da página com os dados da mitologia
            document.getElementById('mitoname').innerText = `Guia definitivo para a mitologia ${data.name}`;
            document.getElementById('sub-desc').innerText = data.sub_description;
            document.getElementById('inside-text').innerHTML = `<h3>${data.description}</h3>`;
            // Caso haja uma imagem da mitologia, você pode definir a imagem aqui
            const imgElement = document.querySelector('.img-in-main');
            imgElement.style.backgroundImage = `url(http://localhost:8000/images/${data.mytology_profile_img})`;
            const imgBanner =document.querySelector('.bg-img');
            imgBanner.style.backgroundImage = `url(http://localhost:8000/images/${data.mytology_banner})`
            
            // Popular recursos se houver
            const resourcesBox = document.getElementById('popular-resources-box');
            data.popular_resources.forEach(resource => {
                resourcesBox.innerHTML += `<a href="${resource.link}">${resource.title}</a>`;
            });
        })
        .catch(error => {
            console.error("Error fetching mythology:", error);
        });
}
