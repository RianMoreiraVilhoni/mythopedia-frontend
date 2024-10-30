document.addEventListener("DOMContentLoaded", function () {
    fetchMitologia();

    const searchInput = document.getElementById('searchInput');
    const suggestions = document.getElementById('suggestions');

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        if (query) {
            filterMitologia(query);
        } else {
            suggestions.style.display = 'none'; // Esconde as sugestões se a caixa estiver vazia
        }
    });
//  <div class="card">
//                             <a href="pg-mitologias.html?idmitologico=${mitologia.id}">
//                                 <div class="caption">
//                                     Mitologia ${mitologia.name}
//                                 </div>
//                                 <img src="http://localhost:8000/images/${mitologia.mytology_profile_img}" alt="Mitologia ${mitologia.name}">
//                                 <div class="symbol">
//                                     <span class="material-symbols-outlined">
//                                         ${mitologia.main_symbol}
//                                     </span>
//                                 </div>
//                             </a>
//                         </div>
    function fetchMitologia() {
        fetch('http://localhost:8000/mythologies')
            .then(response => response.json())
            .then(data => {
                const list = document.getElementById('MitologiaList');
                list.innerHTML = ''; // Limpa o conteúdo anterior

                data.mytologies.forEach(mitologia => {
                    list.innerHTML += `
                    <div class="card">
                    <a href="pg-mitologias.html?idmitologico=${mitologia.id}">
                <img alt="${mitologia.name}" height="300"
                    src="http://localhost:8000/images/${mitologia.mytology_profile_img}"
                    width="200" />
                <div class="category">
                    MITOLOGIA
                </div>
                <div class="icon">
                    <img alt="Mitology icon" height="40"
                        src="http://localhost:8000/images/${mitologia.main_symbol}"
                        width="40" />
                </div>
                <div class="title">
                ${mitologia.name}
                </div>
                <div class="guide">
                    Guiar
                </div>
                </a>
            </div>
                       `;
                });
            })
            .catch(error => console.error("Error fetching mitologias:", error));
    }

    function filterMitologia(query) {
        fetch('http://localhost:8000/mythologies')
            .then(response => response.json())
            .then(data => {
                const filtered = data.mytologies.filter(mitologia => 
                    mitologia.name.toLowerCase().includes(query)
                );

                suggestions.innerHTML = ''; // Limpa as sugestões anteriores

                filtered.forEach(mitologia => {
                    suggestions.innerHTML += `
                        <div onclick="selectMitologia(${mitologia.id})">
                            Mitologia ${mitologia.name}
                        </div>
                    `;
                });

                suggestions.style.display = filtered.length > 0 ? 'block' : 'none'; // Mostra/esconde as sugestões
            })
            .catch(error => console.error("Error fetching mitologias:", error));
    }

    window.selectMitologia = function(id) {
        // Redireciona para a página de mitologia com o ID selecionado
        window.location.href = `pg-mitologias.html?idmitologico=${id}`;
    };

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

[...document.querySelectorAll('.column')].map(column => {
	column.style.setProperty('--animation', 'slide');
	column.style.setProperty('height', '200%');
	column.innerHTML = column.innerHTML + column.innerHTML;
});

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

[...document.querySelectorAll('.column')].map(column => {
    column.style.setProperty('--animation', 'slide');
    column.style.setProperty('height', '200%');
    column.innerHTML = column.innerHTML + column.innerHTML;
});

document.getElementById("enviar-btn").addEventListener("click", function () {
    const tiSection = document.querySelector(".ti");
    const formContainer = document.querySelector(".card-email");

    tiSection.style.transform = "translateX(-10%)";


    formContainer.style.display = "block";
    setTimeout(() => {
        formContainer.style.transform = "translateX(10%)";
    }, 10);
});