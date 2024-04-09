function deleteProduct(productId) {
    fetch(`http://localhost:8000/products/${productId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta: ' + response.status);
        }
        console.log('Prodotto eliminato con successo');
        closeModal()
        removeTableRow(productId); 
    })
    .catch(error => {
        console.error('Errore:', error);
    });
}


function removeTableRow(productId) {
    const row = document.getElementById('productRow_' + productId);
    if (row) {
        row.remove(); 
    } else {
        console.error('Riga non trovata per il prodotto con ID:', productId);
    }
}

