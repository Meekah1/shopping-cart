import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://playground-5e617-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'shoppingList');

const inputField = document.getElementById('input-field');
const addButton = document.getElementById('add-button');
const shoppingList = document.getElementById('shopping-list');

addButton.addEventListener('click', function () {
  let inputValue = inputField.value;
  
  push(shoppingListInDB, inputValue)

  clearInputField()

// appendItemToListItemsInputs(inputValue)

});

onValue(shoppingListInDB, function(snapshot) {

  clearShoppingList();

  let itemsArray = Object.values(snapshot.val());

  for (let i = 0; i < itemsArray.length; i++) {
     appendItemToListItemsInputs(itemsArray[i]);
  }

});

function clearShoppingList () {
  shoppingList.innerHTML = '';
}


function clearInputField () {

inputField.value = "";

}

function appendItemToListItemsInputs(inputValue) {

  shoppingList.innerHTML += `<li>${inputValue}</li>`;

}
