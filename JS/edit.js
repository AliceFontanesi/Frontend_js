function openEditModal(id, nome, marca, prezzo) {
    var modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>Edit Product</h2>
            <p>ID: ${id}</p>
            <label>Marca</label><br>
            <input type="text" id="editMarca" value="${marca}">
            <br><br>
            <label>Nome</label><br>
            <input type="text" id="editNome" value="${nome}">
            <br><br>
            <label>Prezzo</label><br>
            <input type="number" id="editPrezzo" value="${prezzo}">
            <br><br>
            <button onclick="saveEdited(${id})">Save Changes</button>
        </div>
    `;

    document.body.appendChild(modal);

    modal.style.display = 'block';
}

function closeModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
    modal.remove();
}

function saveEdited(productId) {
    var editedNome = document.getElementById('editNome').value;
    var editedMarca = document.getElementById('editMarca').value;
    var editedPrezzo = document.getElementById('editPrezzo').value;

    // Dati da inviare nella richiesta PATCH
    var patchData = {
        "data": {
            "type": "products",
            "id": productId,
            "attributes": {
                "nome": editedNome,
                "marca": editedMarca,
                "prezzo": editedPrezzo
            }
        }
    };

    // Opzioni per la richiesta fetch
    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patchData)
    };

    // URL dell'API
    var url = 'http://localhost:8000/products/' + productId;

    // Esegui la richiesta fetch
    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Modifiche salvate con successo:', data);
            var tableRow = document.getElementById('productRow_' + productId);
            tableRow.cells[1].innerText = editedMarca;
            tableRow.cells[2].innerText = editedNome;
            tableRow.cells[3].innerText = editedPrezzo;
            closeModal(); 
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}

