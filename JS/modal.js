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
<<<<<<< HEAD
    return action === 'show' ? 'Show' : action === 'edit' ? 'Edit' : action === 'delete' ? 'Delete' : 'Create';
=======
    return action === 'show' ? 'Show' : action === 'edit' ? 'Edit' : 'Create';
>>>>>>> 3beb4734fbff6d913fe9aa7d5b2a5ccafea30b77
}

function getModalFields(action, data, id) {
    if (action === 'show') {
        return `
            <p>ID: ${id}</p>
            <label>Marca: ${data.attributes.marca}</label><br><br>
            <label>Nome: ${data.attributes.nome}</label><br><br>
            <label>Prezzo: ${data.attributes.prezzo}</label><br>`;
<<<<<<< HEAD
    } else if (action === 'delete') {
        return `
            <p>Sei sicuro di voler eliminare questo prodotto? ${id}</p>
            <button onclick="deleteProduct(${id})">Yes</button>
            <button onclick="closeModal()">No</button>`;
=======
>>>>>>> 3beb4734fbff6d913fe9aa7d5b2a5ccafea30b77
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
<<<<<<< HEAD
            <button onclick="saveProduct('${action}', ${id})">${action === 'edit' ? 'Save Changes' : 'Create Product'}</button>`;
    }
}


=======
            <button onclick="${action === 'edit' ? `saveEdited(${id})` : 'saveCreated()'}">${action === 'edit' ? 'Save Changes' : 'Create Product'}</button>`;
    }
}

>>>>>>> 3beb4734fbff6d913fe9aa7d5b2a5ccafea30b77
function closeModal() {
    var modal = document.querySelector('.modal');
    modal.style.display = 'none';
    modal.remove();
}
<<<<<<< HEAD
=======


//aggiungere modale per chiedere la conferma di eliminare un prodotto
//fare un file unico con richieste fetch per tutti i vari metodi
/*
file js:
modal.js
script.js
fetch.js
altro.js (nel caso vedere come strutturare)
*/
>>>>>>> 3beb4734fbff6d913fe9aa7d5b2a5ccafea30b77
