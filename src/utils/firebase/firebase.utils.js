import { initializeApp } from 'firebase/app'
import {
        getAuth,
        signInWithRedirect,
        signInWithPopup,
        GoogleAuthProvider,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        signOut, onAuthStateChanged
    } from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs,
} from 'firebase/firestore'



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCrPNBo0skOuyDRrrdEB3dn-BtRQOTBh8c",
    authDomain: "crown-clothing-db-3d0e2.firebaseapp.com",
    projectId: "crown-clothing-db-3d0e2",
    storageBucket: "crown-clothing-db-3d0e2.firebasestorage.app",
    messagingSenderId: "838139812379",
    appId: "1:838139812379:web:afd9da8c9c50302e9136be"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const google_provider = new GoogleAuthProvider()
google_provider.setCustomParameters({
    prompt : "select_account"
}
)
export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, google_provider) 
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, google_provider) 

export const db = getFirestore(firebaseApp)

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);
    try {
        objectsToAdd.forEach(object => {
            const docRef = doc(collectionRef, object.title.toLowerCase());
            batch.set(docRef, object);
        });
        await batch.commit();
    } catch (error) {
        console.log("Error: ",error);
    }
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoriesMap = querySnapshot.docs.reduce((acc, docSnapShot) => {
        const {items, title} = docSnapShot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})
    return categoriesMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    // console.log(userDocRef)

    const userSnapShot = await getDoc(userDocRef)
    // console.log(userSnapShot)
    // console.log(userSnapShot.exists())

    // if user data not exist
    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date()
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            });
        }catch (error){
            console.log("error creating the user: ", error)
        }
    }

    // if user data exist return back userDocRef
    return userDocRef;   
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
    // console.log("User created succesfully")
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
    return await signInWithEmailAndPassword(auth, email, password);
}
export const signOutAuthUser = async () => await signOut(auth)
export const onAuthStateChangeListener = (callback) => onAuthStateChanged(auth, callback)