document.addEventListener("DOMContentLoaded", function () {
    fetchComments();

    const commentFormElement = document.getElementById('commentFormElement');
    if (commentFormElement) {
        commentFormElement.addEventListener('submit', function (event) {
            event.preventDefault();
            saveComment();
        });
    }
});

function fetchComments() {
    fetch('http://localhost:8000/comments')
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('commentList');
            list.innerHTML = '';

            data.comments.forEach(comment => {
                list.innerHTML += `
                    <div class="border rounded-lg shadow-lg p-4 mb-4">
                        <p><strong>Comentário:</strong> ${comment.comment}</p>
                        <p><strong>Data:</strong> ${new Date(comment.date).toLocaleString()}</p>
                        <p><strong>Última Atualização:</strong> ${new Date(comment.last_update).toLocaleString()}</p>
                        <p><strong>Likes:</strong> ${comment.likes}</p>
                        <button class="btn btn-warning mr-2" style="background-color: #1abc9c;" onclick="showEditForm(${comment.id})">Atualizar</button>
                        <button style="background-color: #e74c3c;" onclick="deleteComment(${comment.id})">Apagar</button>
                    </div>`;
            });
        })
        .catch(error => console.error("Error fetching comments:", error));
}

function showCommentForm() {
    document.getElementById('commentFormContainer').innerHTML = `
        <section id="commentForm" class="p-4 bg-white shadow-md rounded">
            <h2 class="text-xl font-bold mb-4">Cadastrar Novo Comentário</h2>
            <form id="commentFormElement">
                <div>
                    <label for="comment">Comentário</label>
                    <input type="text" id="comment" required class="w-full p-2 border rounded">
                </div>
                <div>
                    <label for="likes">Likes</label>
                    <input type="number" id="likes" value="0" class="w-full p-2 border rounded">
                </div>
                <div>
                    <label for="user">Usuário ID</label>
                    <input type="number" id="user" required class="w-full p-2 border rounded">
                </div>
                <div>
                    <label for="god">Deus ID</label>
                    <input type="number" id="god" class="w-full p-2 border rounded">
                </div>
                <div>
                    <label for="mytology">Mitologia ID</label>
                    <input type="number" id="mytology" class="w-full p-2 border rounded">
                </div>
                <div>
                    <label for="history">História ID</label>
                    <input type="number" id="history" class="w-full p-2 border rounded">
                </div>
                <button type="submit" class="mt-4 bg-blue-500 text-white p-2 rounded">Salvar</button>
            </form>
        </section>
    `;
}

function saveComment() {
    const comment = document.getElementById('comment').value;
    const likes = document.getElementById('likes').value;
    const user = document.getElementById('user').value;
    const god = document.getElementById('god').value;
    const mytology = document.getElementById('mytology').value;
    const history = document.getElementById('history').value;

    const newComment = {
        comment,
        likes: parseInt(likes),
        user,
        god: god ? parseInt(god) : null,
        mytology: mytology ? parseInt(mytology) : null,
        history: history ? parseInt(history) : null
    };

    fetch('http://localhost:8000/comments', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newComment)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao salvar comentário');
        }
        return response.json();
    })
    .then(() => {
        fetchComments();
        document.getElementById('commentFormContainer').innerHTML = '';
    })
    .catch(error => console.error("Error saving comment:", error));
}

function deleteComment(id) {
    fetch(`http://localhost:8000/comments/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao apagar comentário');
        }
        return response.json();
    })
    .then(() => {
        fetchComments();
    })
    .catch(error => console.error("Error deleting comment:", error));
}

function showEditForm(id) {
    // Aqui você pode implementar a lógica para mostrar um formulário de edição
}
