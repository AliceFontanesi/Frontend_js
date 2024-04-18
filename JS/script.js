document.addEventListener('DOMContentLoaded', function() {
    sendFetchRequest('http://localhost:8000/products', 'GET', null, null, null)
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
                <button onclick="openModal('delete', ${product.id}, [])">Delete</button>
            </td>
        `;

        productsContainer.appendChild(productRow);
    });
}




