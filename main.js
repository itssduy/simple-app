import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getDatabase, ref, push} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";

const appSettings = {
    databaseURL: "https://simple-app-a492d-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings);
const db = getDatabase(app);
const shoppingList = ref(db, 'shoppingList');

const itemform = document.getElementById("itemForm");


itemform.addEventListener('submit', (e)=>{
    e.preventDefault();

    const data = new FormData(itemform);
    const item = data.get('item');
    
    push(shoppingList, item);
})