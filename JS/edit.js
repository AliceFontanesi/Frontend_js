function saveEdited(productId) {
    var editedNome = document.getElementById('editNome').value;
    var editedMarca = document.getElementById('editMarca').value;
    var editedPrezzo = document.getElementById('editPrezzo').value;

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

    var options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(patchData)
    };

    var url = 'http://localhost:8000/products/' + productId;

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

