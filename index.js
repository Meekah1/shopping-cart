import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://playground-5e617-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const dataInDB = ref(database, 'data')

const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
const listItemsInput = document.getElementById('shopping-list');

addButton.addEventListener('click', function () {
  let inputValue = inputField.value;
  
  push(dataInDB, inputValue)

  inputField.value = ""

  listItemsInput.innerHTML +=  `<li>${inputValue}</li>`;

});
