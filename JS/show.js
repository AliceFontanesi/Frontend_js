function showProduct(action, productId) {
    fetch(`http://localhost:8000/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Prodotto visualizzato con successo:', data);
            if(action == "show"){
                openModal("show", productId, data.data);
            }else{
                openModal("edit", productId, data.data);
            }
            
        })
        .catch(error => {
            console.error('Errore:', error);
        });
}