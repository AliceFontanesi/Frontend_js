function openCreateModal() {
    var modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>Edit Product</h2>
            <label>Marca</label><br>
            <input type="text" id="editMarca" value="">
            <br><br>
            <label>Nome</label><br>
            <input type="text" id="editNome" value="">
            <br><br>
            <label>Prezzo</label><br>
            <input type="number" id="editPrezzo" value="">
            <br><br>
            <button onclick="saveCreated()">Save Changes</button>
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

function saveCreated() {

    var editedNome = document.getElementById('editNome').value;
    var editedMarca = document.getElementById('editMarca').value;
    var editedPrezzo = document.getElementById('editPrezzo').value;

    var postData = {
        "data": {
            "type": "products",
            "attributes": {
                "nome": editedNome,
                "marca": editedMarca,
                "prezzo": editedPrezzo
            }
        }
    };

    // Opzioni per la richiesta fetch
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    };


    var url = 'http://localhost:8000/products';

    fetch(url, options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Prodotto creato con successo:', data);

            var productId = data.data.id;
            var productName = data.data.attributes.nome;
            var productMarca = data.data.attributes.marca;
            var productPrezzo = data.data.attributes.prezzo;

            var table = document.getElementById('myTable'); 
            var newRow = table.insertRow(-1); // Nuova riga alla fine della tabella
            newRow.id = 'productRow_' + productId;

            newRow.innerHTML = `
            <td>${productId}</td>
            <td>${productName}</td>
            <td>${productMarca}</td>
            <td>${productPrezzo}</td>
            <td>
                <button onclick="showProduct(${productId})">Show</button>
                <button onclick="openEditModal(${productId}, '${productName}', '${productMarca}', ${productPrezzo})">Edit</button>
                <button onclick="deleteProduct(${productId})">Delete</button>
            </td>
        `;


            closeModal();
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}

