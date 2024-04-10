function saveProduct(action, productId = null) {
    const editedNome = document.getElementById('editNome').value;
    const editedMarca = document.getElementById('editMarca').value;
    const editedPrezzo = document.getElementById('editPrezzo').value;

    const url = productId ? `http://localhost:8000/products/${productId}` : 'http://localhost:8000/products';
    const method = action === 'edit' ? 'PATCH' : 'POST';
    const body = prepareBody(action, productId, editedNome, editedMarca, editedPrezzo);

    sendFetchRequest(url, method, body, action, productId);
}



function prepareBody(action, productId, editedNome, editedMarca, editedPrezzo) {
    const body = {
        data: {
            type: 'products',
            attributes: {
                nome: editedNome,
                marca: editedMarca,
                prezzo: editedPrezzo
            }
        }
    };
    
    if (action === 'edit') 
        body.data.id = productId;

    return JSON.stringify(body);
}



function sendFetchRequest(url, method, body, action, productId) {
    const requestOptions = {method: method};

    if (method === 'PATCH' || method === 'POST') {
        requestOptions.headers = {'Content-Type': 'application/json'};
        requestOptions.body = body;
    }

    fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Errore nella richiesta: ' + response.status);
        }
        if (method === 'DELETE') {
            console.log('Prodotto eliminato con successo');
            closeModal();
            removeTableRow(productId); 
            return;
        }
        return response.json();
    })
    .then(data => {
        if (method !== 'DELETE') 
            handleResponse(action, productId, data);
    })
    .catch(error => {
        console.error('Errore:', error);
    });
}



function handleResponse(action, productId, data) {
    if (action === 'edit') {
        console.log('Modifiche salvate con successo:', data);
        updateTableRow(productId, data.data);
    } else {
        console.log('Prodotto creato con successo:', data);
        const newRow = createTableRow(data.data);
        document.getElementById('myTable').appendChild(newRow);
    }
    closeModal();
}



function updateTableRow(productId, product) {
    const tableRow = document.getElementById('productRow_' + productId);
    if (tableRow) {
        tableRow.cells[1].innerText = product.attributes.marca;
        tableRow.cells[2].innerText = product.attributes.nome;
        tableRow.cells[3].innerText = product.attributes.prezzo;
    } else 
        console.error('Riga non trovata per il prodotto con ID:', productId);
}



function createTableRow(product) {
    const newRow = document.createElement('tr');
    newRow.id = 'productRow_' + product.id;
    newRow.innerHTML = `
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
    return newRow;
}



function removeTableRow(productId) {
    const row = document.getElementById('productRow_' + productId);
    if (row) 
        row.remove(); 
    else 
        console.error('Riga non trovata per il prodotto con ID:', productId);
}


