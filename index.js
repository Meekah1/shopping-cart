import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js';

const appSettings = {
  databaseURL:
    'https://playground-5e617-default-rtdb.europe-west1.firebasedatabase.app/',
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, 'data');

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


  if (snapshot.exists()) {

   clearShoppingList();

   let itemsArray = Object.entries(snapshot.val());

   for (let i = 0; i < itemsArray.length; i++) {
     let currentItem = itemsArray[i];
     let currentItemID = currentItem[0];
     let currentItemValue = currentItem[1];

     appendItemToListItemsInputs(currentItem);
   }

  } else {
    shoppingList.innerHTML = "Nothing to see here ..."
  }


});

function clearShoppingList () {
  shoppingList.innerHTML = '';
}


function clearInputField () {

inputField.value = "";

}

function appendItemToListItemsInputs(item) {
  let itemID = item[0]
  let itemValue = item[1]

  let newElement = document.createElement('li');

  newElement.textContent = itemValue;

  // newElement.classList.add('item');



  newElement.addEventListener("click", function() {
    let exactLocationInDB = ref(database, `data/${itemID}`);

    remove(exactLocationInDB);

  })

  shoppingList.append(newElement)
  // shoppingList.innerHTML += `<li>${inputValue}</li>`;

}
