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
    return action === 'show' ? 'Show' : action === 'edit' ? 'Edit' : 'Create';
}

function getModalFields(action, data, id) {
    if (action === 'show') {
        return `
            <p>ID: ${id}</p>
            <label>Marca: ${data.attributes.marca}</label><br><br>
            <label>Nome: ${data.attributes.nome}</label><br><br>
            <label>Prezzo: ${data.attributes.prezzo}</label><br>`;
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
            <button onclick="${action === 'edit' ? `saveEdited(${id})` : 'saveCreated()'}">${action === 'edit' ? 'Save Changes' : 'Create Product'}</button>`;
    }
}

function closeModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
    modal.remove();
}


//aggiungere modale per chiedere la conferma di eliminare un prodotto
//fare un file unico con richieste fetch per tutti i vari metodi
/*
file js:
modal.js
script.js
fetch.js
altro.js (nel caso vedere come strutturare)
*/