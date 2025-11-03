import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const appSettings = {
    databaseURL: "https://simple-app-a492d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const db = getDatabase(app);
const shoppingList = ref(db, 'shoppingList');


const shoppingListElement = document.getElementById('shopping-list');
const itemform = document.getElementById("itemForm");
const input = document.querySelector('input')



itemform.addEventListener('submit', (e)=>{
    e.preventDefault();

    const data = new FormData(itemform);
    let item = data.get('item');
    

    resetInputs();
    addToList(item);



    push(shoppingList, item);
})


const resetInputs = ()=>{
    input.value = '';
}

const addToList = (item, id)=>{
    const newItem = document.createElement("li");
    newItem.innerHTML += item;

    const location = ref(db, `shoppingList/${id}`)
    newItem.addEventListener("dblclick", ()=>{
        remove(location);
    })
    shoppingListElement.append(newItem);
}

const clearList = ()=>{
    shoppingListElement.innerHTML = '';
}

onValue(shoppingList, (snapshot)=>{

    clearList();
    if(snapshot.exists()){
        const listValues = Object.entries(snapshot.val());
        listValues.map((x, i)=>{
            const curItemId = x[0];
            const curItemVal = x[1];

        addToList(curItemVal, curItemId);
        })
    } else {
        shoppingListElement.innerHTML = "No items here... yet";
    }
    
});


// let users = {
//     "00": "sindre@scrimba.com",
//     "01": "per@scrimba.com",
//     "02": "frode@scrimba.com"
// }


// let scrimbaUserEmails = Object.values(users);
// let scrimbaUserIds = Object.keys(users);

// let scrimbaUserEntries = Object.entries(users);

