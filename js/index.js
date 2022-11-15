console.log("Shit works")
const emailSignup = document.getElementById("floatingInputSignUp")
const passSignup = document.getElementById("floatingPasswordSignUp")
const passSignin = document.getElementById("floatingPassword-signin")
const emailSignin = document.getElementById("floatingInput-signin")
const nummberChange = document.querySelector(".numberChange")
const changes = document.getElementById("changes")

import { initializeApp } from "firebase/app"
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    updateDoc,
    getDocs, getDoc
} from "firebase/firestore"


const firebaseConfig = {
    apiKey: "AIzaSyD4krVZ0LaMmvzBfuDCjJYso6LkjIgIaNY",
    authDomain: "daxoppgave2.firebaseapp.com",
    projectId: "daxoppgave2",
    storageBucket: "daxoppgave2.appspot.com",
    messagingSenderId: "622167249135",
    appId: "1:622167249135:web:db19ae6488848a41634b1a"
  };

initializeApp(firebaseConfig);

const db = getFirestore()

const colRef = collection(db, `login`)

let currentNumber = 0;
const balls = collection(db, 'number')
// const ball = collection(db, 'number', 'gzeyGptBTv9PoPig7vHv' )
// getDoc(ball)
//   .then((doc) => {
//     console.log(doc.data(), doc.id)
//   })





onSnapshot(balls, (snapshot) => {
    let ball = []
    snapshot.docs.forEach((doc) =>{
        ball.push({...doc.data(), id: doc.id})
    })
    ball.forEach((item) => {
        let currentNumbel = item.numberValue;
        console.log(currentNumbel)
        nummberChange.innerHTML = `${currentNumbel}`;
        currentNumber = parseInt(currentNumbel);
        
    })
  })



changes.addEventListener("click",(e) => {
    console.log(e.target.classList[0])
    const docRef = doc(db, 'number', "gzeyGptBTv9PoPig7vHv" );
    switch (e.target.classList[0]) {
        case "plus":
            currentNumber = currentNumber + 1;
            nummberChange.innerHTML = currentNumber;
            updateDoc(docRef, {
                numberValue: `${currentNumber}`
            })
            break;
        case "minus":
            currentNumber = currentNumber - 1;
            nummberChange.innerHTML = currentNumber;
            updateDoc(docRef, {
                numberValue: `${currentNumber}`
            })
            break;
        default:
            break;
    }
})


const addUser = document.querySelector(".sign-up")
addUser.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log("User was added")
    addDoc(colRef, {
        email: emailSignup.value,
        pass: passSignup.value
    })
    .then(() => {
        addUser.value = "";
    })
})
console.log("Shit works")
onSnapshot(colRef, (snapshot) => {
    let login = []
    snapshot.docs.forEach((doc) =>{
        login.push({...doc.data(), id: doc.id})
    })
    console.log(login)
  })

const loginUser = document.querySelector(".sign-in")
loginUser.addEventListener("submit", (e) => {
    e.preventDefault()
    onSnapshot(colRef, (snapshot) => {
        let login = []
        snapshot.docs.forEach((doc) =>{
            login.push({...doc.data(), id: doc.id})
        })
        console.log("Works")
        login.forEach((item) => {
            if (item.email == emailSignin.value && item.pass === passSignin.value) {
                console.log("SHIT FUCKING WORKS!!!")
                console.log(item.email, "has logged in!!")
            }
        })
      })
})
