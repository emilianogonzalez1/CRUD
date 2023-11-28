// API
const USERS = 'https://65650f5ceb8bb4b70ef12fe5.mockapi.io/users';

// Results
const results = document.getElementById('results');

// Alert
const alertError = document.getElementById('alert-error');
// Show alert function
function showAlert() {
    alertError.classList.add('show');
    setTimeout(() => {
        alertError.classList.remove('show')
    }, 1000);
}


// SEARCH RECORDS
// Elements
const inputGetId = document.getElementById("inputGetId");
const btnGet = document.getElementById("btnGet");

// Search users function
function searchUsers() {
    fetch(USERS)
        .then(response => {
            if (!response.ok) {
                throw new Error("The request wasn't successful")
            }
            return response.json();
        })
        .then(data => {
            results.innerHTML = '';
            data.forEach(user => {
                results.innerHTML += `<div class="p-1"><p>ID: ${user.id}</p><p>NAME: ${user.name}</p><p>LASTNAME: ${user.lastname}</p></div>`;
            });
        })
        .catch(error => {
            console.error(error);
            showAlert(); 
            results.value = '';
        });
    };
    
// Event listener search record
btnGet.addEventListener('click', () => {
    if (!inputGetId.value) {
        searchUsers()
    } else {
        fetch(USERS + `/${inputGetId.value}`)
        .then(response => {
            if (!response.ok) {
                throw new Error("The request wasn't successful")
            }
            return response.json()
        })
        .then(data => {
            results.innerHTML = '';
            results.innerHTML = `<div class="p-1"><p>ID: ${data.id}</p><p>NAME: ${data.name}</p><p>LASTNAME: ${data.lastname}</p></div>`
            inputGetId.value = '';
        })
        .catch(error => {
            console.error(error);
            showAlert();
            inputGetId.value = '';
            results.value = '';
        })
    }
});


// REGISTER RECORD 
// Elements
const inputPostNombre = document.getElementById('inputPostNombre');
const inputPostApellido = document.getElementById('inputPostApellido');
const btnPost = document.getElementById('btnPost');

// Register record function
function registerRecord() {
        const record = {
            name: inputPostNombre.value,
            lastname: inputPostApellido.value
        }

        fetch(USERS, {
            method: 'POST',
            body: JSON.stringify(record)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("The request wasn't successful")
            }
            return response.json()
            })
            .then(data => {
                searchUsers();
                inputPostNombre.value = '';
                inputPostApellido.value = '';                
            })
            .catch(error => {
                console.error(error);
                showAlert();
                inputPostNombre.value = '';
                inputPostApellido.value = '';
                results.value = '';
            })
};

// Event listener register record
function areInputsValid() {
    if (inputPostNombre.value && inputPostApellido.value) {
        btnPost.disabled = false;
        btnPost.addEventListener("click", registerRecord)    
    } else {
        btnPost.disabled = true;
        btnPost.removeEventListener("click", registerRecord);
    }
};

// MODIFY RECORD
// Elements
const inputPutId = document.getElementById("inputPutId");
const inputPutNombre = document.getElementById("inputPutNombre");
const inputPutApellido = document.getElementById("inputPutApellido");

const btnModal = document.getElementById("btnModal");
const btnSendChanges = document.getElementById("btnSendChanges");
const btnModalClose = document.getElementById("btnModalClose");

// Is input valid modify function
function isInputValidModify() {
    if (inputPutId.value) {
        btnModal.disabled = false;
    } else {
        btnModal.disabled = true;
    }
}

// Are inputs valid modify function
function areInputsValidModal() {
    if (inputPutNombre.value && inputPutApellido.value) {
        btnSendChanges.disabled = false;
        btnSendChanges.addEventListener('click', modifyRegister)
    } else {
        btnSendChanges.disabled = true;
        btnSendChanges.addEventListener('click', modifyRegister)
    }
};

// Modify register function
function modifyRegister() {
    record = {
        name: inputPutNombre.value,
        lastname: inputPutApellido.value
    };

    fetch(USERS + `/${inputPutId.value}`, {
        method: 'PUT',
        body: JSON.stringify(record)
    })
    .then(response => {
        console.log(response)
        btnModal.click();
        inputPutId.value = '';
        if (!response.ok) {
            throw new Error("The request wasn't successful")
        }
        return response.json()
    })
    .then(data => {
        searchUsers();
    })
    .catch(error => {
        console.error(error);
        showAlert();
        inputPutId.value = '';
        results.value = '';
    })
};

// DELETE RECORD
// Elements
const inputDelete = document.getElementById('inputDelete');
const btnDelete = document.getElementById('btnDelete');

// Is input valid delete function
function isInputValidDelete() {
    if (inputDelete.value) {
        btnDelete.disabled = false;
        btnDelete.addEventListener('click', deleteRecord) 
    } else {
        btnDelete.disabled = true;
        btnDelete.removeEventListener('click', deleteRecord)
    }
};

// Delete record function
function deleteRecord() {
    fetch(USERS + `/${inputDelete.value}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("The request wasn't successful")
        }
        return response.json()
    })
    .then(data => {
        searchUsers();
        inputDelete.value = '';
    })
    .catch(error => {
        console.error(error);
        showAlert();
        inputDelete.value = '';
        results.value = '';
    })
};