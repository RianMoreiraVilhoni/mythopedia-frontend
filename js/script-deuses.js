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
