document.addEventListener("DOMContentLoaded", function () {
    fetchStories();

    const historyFormElement = document.getElementById('HistoryFormElement');
    if (historyFormElement) {
        historyFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveStory();
        });
    } else {
        console.error("Error: Element with ID 'HistoryFormElement' not found.");
    }
});

function fetchStories() {
    fetch('http://localhost:8000/history/stories')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('StoryList');
            list.innerHTML = ''; // Limpa o conteúdo anterior

            data.stories.forEach(story => {
                list.innerHTML += `
                    <div class="card border rounded-lg shadow-lg overflow-hidden mb-6">
                        <div class="content p-4">
                            <h2 class="text-xl font-bold mb-2">${story.title}</h2>
                            <p class="text-gray-700 text-sm mb-2">Id: ${story.id}</p>
                            <p class="text-gray-700 text-sm mb-2">Author: ${story.author}</p>
                            <p class="text-gray-700 text-sm mb-2">Content: ${story.content}</p>
                            <p class="text-gray-700 text-sm mb-2">Source: ${story.source}</p>
                            <p class="text-gray-700 text-sm mb-2">Published on: ${new Date(story.publish_time).toLocaleDateString()}</p>
                            <p class="text-gray-700 text-sm mb-2">Last Updated: ${new Date(story.last_updated).toLocaleDateString()}</p>
                            <p class="text-gray-700 text-sm mb-2">Views: ${story.views}</p>
                            <p class="text-gray-700 text-sm mb-2">Age Classification: ${story.age_classification}</p>
                            <p class="text-gray-700 text-sm mb-2">God ID: ${story.god}</p>
                            <p class="text-gray-700 text-sm mb-2">Mythology ID: ${story.mythology}</p>

                            <!-- Botões de Ação -->
                            <button class="btn btn-warning mr-2" style="background-color: #1abc9c;" onclick="showEditForm(${story.id}, '${story.title}', '${story.content}', '${story.author}', '${story.source}', '${story.publish_time}', '${story.last_updated}', ${story.views}, ${story.age_classification}, ${story.god}, ${story.mythology})">Atualizar</button>

                            <button style="background-color: #e74c3c;" onclick="deleteStory(${story.id})">Apagar</button>
                        </div>
                    </div>`;
            });
        })
        .catch(error => console.error("Error fetching stories:", error));
}

function showAddForm() {
    const formElement = document.getElementById('HistoryForm');
    if (formElement) {
        formElement.classList.remove('d-none');
    } else {
        console.error("Error: Element with ID 'HistoryForm' not found.");
    }

    document.getElementById('HistoryId').value = '';
    document.getElementById('title').value = '';
    document.getElementById('content').value = '';
    document.getElementById('author').value = '';
    document.getElementById('source').value = '';
    document.getElementById('publish_time').value = '';
    document.getElementById('last_updated').value = '';
    document.getElementById('views').value = '';
    document.getElementById('age_classification').value = '';
    document.getElementById('god').value = '';
    document.getElementById('mythology').value = '';
    document.getElementById('formTitle').innerText = 'Adicionar História';
}

function showEditForm(id, title, content, author, source, publish_time, last_updated, views, age_classification, god, mythology) {
    document.getElementById('HistoryForm').classList.remove('d-none');
    document.getElementById('HistoryId').value = id;
    document.getElementById('title').value = title;
    document.getElementById('content').value = content;
    document.getElementById('author').value = author;
    document.getElementById('source').value = source;
    document.getElementById('publish_time').value = publish_time.split('T')[0]; // Formato YYYY-MM-DD
    document.getElementById('last_updated').value = last_updated.split('T')[0]; // Formato YYYY-MM-DD
    document.getElementById('views').value = views;
    document.getElementById('age_classification').value = age_classification;
    document.getElementById('god').value = god;
    document.getElementById('mythology').value = mythology;
    document.getElementById('formTitle').innerText = 'Editar História';
}

function saveStory() {
    const id = document.getElementById('HistoryId').value;
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const author = document.getElementById('author').value;
    const source = document.getElementById('source').value;
    const publish_time = document.getElementById('publish_time').value;
    const last_updated = document.getElementById('last_updated').value;
    const views = document.getElementById('views').value;
    const age_classification = document.getElementById('age_classification').value;
    const god = document.getElementById('god').value;
    const mythology = document.getElementById('mythology').value;

    const method = id ? 'PATCH' : 'POST';
    const url = id ? `http://localhost:8000/history/stories${id}` : 'http://localhost:8000/history/stories';

    const storyData = {
        title,
        content,
        author,
        source,
        publish_time,
        last_updated,
        views,
        age_classification,
        god,
        mythology
    };

    fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(storyData)
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
        fetchStories();
        document.getElementById('HistoryForm').classList.add('d-none');
    })
    .catch(error => {
        console.error("Error saving story:", error);
    });
}

function deleteStory(id) {
    fetch(`http://localhost:8000/stories/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Error deleting story: ${response.status}`);
        }
        return response.json();
    })
    .then(() => {
        fetchStories();
    })
    .catch(error => console.error("Error deleting story:", error));
}
