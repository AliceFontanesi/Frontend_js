function openModal(action, id, data) {
    var modal = document.createElement('div');
    modal.classList.add('modal');

    var modalContent = `
        <div class="modal-content">
            <span class="close" onclick="closeModal()">&times;</span>
            <h2>${getActionTitle(action)} Product</h2>
            ${getModalFields(action, data, id)}
        </div>`;

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);
    modal.style.display = 'block';
}

function getActionTitle(action) {
    return action === 'show' ? 'Show' : action === 'edit' ? 'Edit' : action === 'delete' ? 'Delete' : 'Create';
}

function getModalFields(action, data, id) {
    if (action === 'show') {
        return `
            <p>ID: ${id}</p>
            <label>Marca: ${data.attributes.marca}</label><br><br>
            <label>Nome: ${data.attributes.nome}</label><br><br>
            <label>Prezzo: ${data.attributes.prezzo}</label><br>`;
    } else if (action === 'delete') {
        return `
            <p>Sei sicuro di voler eliminare questo prodotto?</p>
            <button onclick="sendFetchRequest('http://localhost:8000/products/${id}', 'DELETE', null, null, ${id})">Yes</button>
            <button onclick="closeModal()">No</button>`;
    } else {
        const marcaValue = data.length === 0 ? '' : data.attributes.marca || '';
        const nomeValue = data.length === 0 ? '' : data.attributes.nome || '';
        const prezzoValue = data.length === 0 ? '' : data.attributes.prezzo || '';

        return `
            <label>Marca</label><br>
            <input type="text" id="editMarca" value="${marcaValue}">
            <br><br>
            <label>Nome</label><br>
            <input type="text" id="editNome" value="${nomeValue}">
            <br><br>
            <label>Prezzo</label><br>
            <input type="number" id="editPrezzo" value="${prezzoValue}">
            <br><br>
            <button onclick="saveProduct('${action}', ${id})">${action === 'edit' ? 'Save Changes' : 'Create Product'}</button>`;
    }
}


function closeModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
    modal.remove();
}
