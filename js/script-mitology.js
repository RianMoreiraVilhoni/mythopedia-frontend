document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const idMitologia = urlParams.get('idmitologico');

    if (idMitologia) {
        fetchMitologia(idMitologia);
        fetchHistorias(idMitologia); // Chama a função para buscar histórias
        fetchComments(idMitologia)
    } else {
        console.error("ID da mitologia não encontrado na URL.");
    }
});

function fetchMitologia(id) {
    fetch(`http://localhost:8000/mythologies/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar mitologia: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('nome-mito').innerText = `Mitologia ${data.name}`;
            // document.getElementById('sub-desc').innerText = `${data.sub_description}`;
            document.getElementById('inside-text').innerHTML = `<p>${data.description}</p>`;
            
            const imgElement = document.getElementById('bg-img');
            if (data.mytology_profile_img) {
                imgElement.innerHTML = `<img src="http://localhost:8000/images/${data.mytology_profile_img}" alt="Foto Mito" id="img-in-main" class="img-in-main" style="height:550px;">`;
            }
            
            // const imgBanner = document.getElementById('bg-img');
            // if (data.mytology_banner) {
            //     imgBanner.innerHTML = `<img src="http://localhost:8000/images/${data.mytology_banner}" alt="Foto Mito" id="img-in-main" class="img-in-main">`;
            // }

            const resourcesBox = document.getElementById('popular-resources-box');
            if (Array.isArray(data.popular_resources)) {
                resourcesBox.innerHTML = ''; // Limpa o conteúdo anterior
                data.popular_resources.forEach(resource => {
                    resourcesBox.innerHTML += `<a href="${resource.link}">${resource.title}</a>`;
                });
            }
        })
        .catch(error => {
            console.error("Error fetching mythology:", error);
        });
}

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

            // Verifique se 'stories' é o campo correto retornado pela API
            if (Array.isArray(data.stories)) {
                data.stories.forEach(story => {
                    list.innerHTML += `
                        

            <div class="card-carousel">
                <!-- Cards dinâmicos que virão do banco de dados -->
                <!-- Exemplo de um único card -->
                <div class="card_carro">
                    <div class="image_historia"><img src="http://localhost:8000/images/${story.source}" alt="img-his"></div>
                    <div class="title">${story.title}</div>
                    <div class="description">Lorem Ipsum is simply dummy text of the printing industry.</div>
                    <a href="#" class="button">Visualizar</a>
                </div>
                
            </div>

           
                    `;
                });
            } else {
                console.error("Nenhuma história encontrada.");
            }
        })
        .catch(error => {
            console.error("Error fetching story:", error);
        });
}

function fetchComments(id) {
    fetch(`http://localhost:8000/comments/mitology/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao buscar comentário: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
           // Verifique a estrutura dos dados
            const list = document.getElementById('comment-list');
            list.innerHTML = '';
            console.log(data)
            if (Array.isArray(data.comments)) {
                
                data.comments.forEach(comentario => {
                    list.innerHTML += `
                        <div class="comment-card">
                            <div class="comment-header">
                                <span class="username">${comentario.user.name}</span>
                                <span class="time">${comentario.last_update}</span>
                            </div>
                            <div class="comment-body">${comentario.comment}</div>
                            <div class="comment-footer"></div>
                        </div>
                    `;
                });
            } else {
                console.error("Nenhum comentário encontrado");
            }
        })
        .catch(error => {
            console.error("Error fetching comments:", error);
        });
}


document.addEventListener("DOMContentLoaded", function () {
    const animatedElements = document.querySelectorAll('.fotos_mito');

    function animateOnScroll() {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = rect.top < window.innerHeight - 100;

            if (isVisible) {
                element.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Executa no carregamento da página
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector('.card-carousel');
    const cards = document.querySelectorAll('.card_carro');
    let currentIndex = 0;
    const visibleCards = 4;
    const cardWidth = cards[0].offsetWidth + 100;

    function updateCarousel() {
        const offset = -currentIndex * cardWidth;
        carousel.style.transform = `translateX(${offset}px)`;
    }

    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = currentIndex > 0 ? currentIndex - 1 : cards.length - visibleCards;
        updateCarousel();
    });

    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex < cards.length - visibleCards) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    setInterval(() => {
        currentIndex = (currentIndex < cards.length - visibleCards) ? currentIndex + 1 : 0;
        updateCarousel();
    }, 3000);
});

document.getElementById("enviar-btn").addEventListener("click", function () {
    const tiSection = document.querySelector(".ti");
    const formContainer = document.querySelector(".form-container");

    tiSection.style.transform = "translateX(-10%)";


    formContainer.style.display = "block";
    setTimeout(() => {
        formContainer.style.transform = "translateX(10%)";
    }, 10);
});
