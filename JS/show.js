function showProduct(productId) {
    fetch(`http://localhost:8000/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Prodotto visualizzato con successo:', data);
            openShowModal(data.data)
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}



function openShowModal(data) {
    var modal = document.createElement('div');
    modal.classList.add('modal');

    modal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>Show Product</h2>
            <p>ID: ${data.id}</p>
            <label>Marca: ${data.attributes.marca}</label><br>
            <br>
            <label>Nome: ${data.attributes.nome}</label><br>
            <br>
            <label>Prezzo: ${data.attributes.prezzo}</label><br>
        </div>
    `;

    document.body.appendChild(modal);

    modal.style.display = 'block';
}






