document.addEventListener('DOMContentLoaded', function() {
    fetch('http://localhost:8000/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta: ' + response.status);
            }
            return response.json();
        })
        .then(data => {
            console.log('Risposta ricevuta:', data); 
            displayProducts(data.data); 
        })
        .catch(error => {
            console.error('Errore:', error);
        });
});



function displayProducts(products) {
    const productsContainer = document.getElementById('products-container'); 
    
    if (products.length === 0) {
        productsContainer.innerHTML = '<tr><td colspan="5">Nessun prodotto disponibile al momento.</td></tr>';
        return;
    }

    products.forEach(product => {
        const productRow = document.createElement('tr');
        productRow.id = 'productRow_' + product.id;
        
        productRow.innerHTML = `
            <td>${product.id}</td>
            <td>${product.attributes.marca}</td>
            <td>${product.attributes.nome}</td>
            <td>${product.attributes.prezzo}</td>
            <td>
                <button onclick="showProduct('show', ${product.id})">Show</button>
                <button onclick="showProduct('edit', ${product.id})">Edit</button>
<<<<<<< HEAD
                <button onclick="openModal('delete', ${product.id}, [])">Delete</button>
=======
                <button onclick="deleteProduct(${product.id})">Delete</button>
>>>>>>> 3beb4734fbff6d913fe9aa7d5b2a5ccafea30b77
            </td>
        `;

        productsContainer.appendChild(productRow);
    });
}




