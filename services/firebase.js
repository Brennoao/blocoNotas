import { initializeApp, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { APIKEY, AUTHDOMAIN, DATABASEURL, PROJECTID, STORAGEBUCKET, MESSAGINGSENDERID, APPID } from '@env'

let app
try {
    app = getApp()
} catch (error) {

    const firebaseConfig = {
        apiKey: APIKEY,
        authDomain: AUTHDOMAIN,
        databaseURL: DATABASEURL,
        projectId: PROJECTID,
        storageBucket: STORAGEBUCKET,
        messagingSenderId: MESSAGINGSENDERID,
        appId: APPID
    };

    // Initialize Firebase
    app = initializeApp(firebaseConfig);
    console.log(firebaseConfig)
}

const db = getDatabase(app)

export { db }