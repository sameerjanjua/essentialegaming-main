import { initializeApp } from "firebase/app";
import { createContext, useContext, useEffect, useState } from "react";
import { EmailAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, reauthenticateWithCredential, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { addDoc, arrayRemove, arrayUnion, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { setForms } from "../store/actions/FormAction";
import { getConfigForms } from "../store/actions/RegFormConfigAction";
import { FETCH_EVENTDATA_SUCCESS, FETCH_EVENT_SUCCESS } from "../store/types";


const FirebaseContext = createContext(null);

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,

    // apiKey: "AIzaSyC6rnQeQeMZJRIhA7OFuhC6UWC0_DCnPKs",
    // authDomain: "egaming-f72d2.firebaseapp.com",
    // projectId: "egaming-f72d2",
    // storageBucket: "egaming-f72d2.appspot.com",
    // messagingSenderId: "778235540301",
    // appId: "1:778235540301:web:c4009544f2c6ed82413d04"
};

export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const storageRef = ref(storage);

export const FirebaseProvider = (props) => {

    // const [user, setUser] = useState(null);
    const [user, setUser] = useState(() => {
        // Load user from local storage initially if available
        const storedUser = localStorage.getItem('egamingUser');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            if (user) {
                setUser(user);
                localStorage.setItem('egamingUser', JSON.stringify(118));
            } else {
                setUser(null);
                localStorage.removeItem('egamingUser');
            }
        })
    }, [])

    const isLoggedIn = user ? true : false;


    // useEffect(() => {
    //     // let unsubscribe;

    //     const handleAuthStateChanged = async () => {
    //         try {
    //             // Check if user exists in local storage
    //             const storedUser = localStorage.getItem('user');
    //             if (storedUser) {
    //                 // If user exists in local storage, parse it and set user
    //                 setUser(JSON.parse(storedUser));
    //             } else {
    //                 // Otherwise, wait for the auth state change and update user
    //                 // unsubscribe = 
    //                 onAuthStateChanged(firebaseAuth, (user) => {
    //                     setUser(user);
    //                     // Store user in local storage
    //                     localStorage.setItem('user', JSON.stringify(user));
    //                 });
    //             }
    //         } catch (error) {
    //             console.error('Error occurred during authentication state change:', error);
    //             setUser(null);
    //         }
    //     };

    //     handleAuthStateChanged();

    // return () => {
    //     if (unsubscribe) {
    //         unsubscribe();
    //     }
    // };
    // }, []);

    const signUpUserWithEmailAndPassword = async (email, password, displayName, country, state, city, profileImage) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
            const user = userCredential.user;
            await firebaseAuth.signOut();

            if(profileImage) {

            const imageRef = ref(storage, `uploads/profile_images/${Date.now()}-${profileImage.name}`);
            const uploadResult = await uploadBytes(imageRef, profileImage);

            const fileRef = ref(storageRef, uploadResult.ref.fullPath);
            const photoURL = await getDownloadURL(fileRef);

            console.log(email, password, displayName, country, photoURL);

            await setDoc(doc(firestore, "users", user.uid), {
                email,
                displayName,
                country,
                state: state ? state : "", 
                city : city ? city : "",
                roles: "user",
                createdAt: serverTimestamp(),
                profileImage: photoURL,
                id: user.uid,
            })
            
            console.log("after sign up");
        } else {
            await setDoc(doc(firestore, "users", user.uid), {
                email,
                displayName,
                country,
                state: state ? state : "", 
                city : city ? city : "",
                roles: "user",
                createdAt: serverTimestamp(),
                profileImage: "",
                id: user.uid,
            })
            console.log("after sign up");
        }
        }
        catch (error) {
            console.log("error in signup : ", error);
            throw error;
        }
    }

    const handleSubUserProfile = async (user, email, displayName, category) => {

        console.log(user);


        return await setDoc(doc(firestore, "users", user.uid), {
            email,
            displayName,
            category,
            roles: "user",
            timeStamp: serverTimestamp(),
        })
    }

    const signInUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(firebaseAuth, email, password);
    }

    const logOutUser = () => {
        return firebaseAuth.signOut();
    }

    const getUserData = (userID) => {
        return new Promise(async (resolve) => {
            if (userID) {
                const userDocRef = doc(collection(firestore, "users"), userID);

                // const userDocSnapShot = await getDoc(userDocRef);
                // const userData = userDocSnapShot.data();
                // resolve(userData)

                // console.log(userData);

                onSnapshot(userDocRef, (snapShot) => {
                    const userData = { id: snapShot.id, ...snapShot.data() };
                    resolve({ userData });
                });
            }
        })
    }



    const handleUpdateUserProfile = async (userID, updateDisplayName, updateCountry, updateProfileImage) => {

        if (updateProfileImage) {
            const imageRef = ref(storage, `uploads/profile_images/${Date.now()}-${updateProfileImage.name}`);
            const uploadResult = await uploadBytes(imageRef, updateProfileImage);

            const fileRef = ref(storageRef, uploadResult.ref.fullPath);
            const photoURL = await getDownloadURL(fileRef);

            if (user && user.photoURL) {
                const previousImgRef = ref(storage, user.photoURL);
                await deleteObject(previousImgRef);
            }

            await updateProfile(user, {
                photoURL: photoURL
            })

            await updateDoc(doc(firestore, "users", userID), {
                profileImage: photoURL,
            })

            console.log('Profile Image updated.');
        }

        if (updateDisplayName) {

            await updateProfile(user, {
                displayName: updateDisplayName,
            })

            await updateDoc(doc(firestore, "users", userID), {
                displayName: updateDisplayName,
            })

            console.log('displayName updated.');
        }

        if (updateCountry) {

            await updateDoc(doc(firestore, "users", userID), {
                country: updateCountry,
            })

            console.log('country updated.');
        }

        console.log(user);
        console.log('Profile updated successfully');
    }





    const handleUpdateForm = async (formID, updatedName, updatedEmail, updatedPhone, updatedCity, updatedCategory, updatedRecipt, preImage, updatedStatus) => {

        console.log('Form Updation Start.');

        if (updatedRecipt) {

            console.log('Started Image updating...');
            const imageRef = ref(storage, `uploads/images/${Date.now()}-${updatedRecipt.name}`);
            const uploadResult = await uploadBytes(imageRef, updatedRecipt);

            const fileRef = ref(storageRef, uploadResult.ref.fullPath);
            const photoURL = await getDownloadURL(fileRef);

            if (preImage) {
                console.log('Started Image old path deletion...');
                const previousImgRef = ref(storage, preImage);
                await deleteObject(previousImgRef);
            }

            console.log('Started firestore updating...');

            await updateDoc(doc(firestore, "registrationforms", formID), {
                imageURL: photoURL,
            })

            console.log('Form Image updated.');
        }

        if (updatedName) {

            await updateDoc(doc(firestore, "registrationforms", formID), {
                name: updatedName,
            })

            console.log('Name updated.');
        }

        if (updatedEmail) {

            await updateDoc(doc(firestore, "registrationforms", formID), {
                email: updatedEmail,
            })

            console.log('Email updated.');
        }

        if (updatedPhone) {

            await updateDoc(doc(firestore, "registrationforms", formID), {
                phone: updatedPhone,
            })

            console.log('Phone updated.');
        }

        if (updatedCity) {

            await updateDoc(doc(firestore, "registrationforms", formID), {
                city: updatedCity,
            })

            console.log('City updated.');
        }

        if (updatedCategory) {

            await updateDoc(doc(firestore, "registrationforms", formID), {
                category: updatedCategory,
            })

            console.log('Category updated.');
        }

        if (updatedStatus) {

            await updateDoc(doc(firestore, "registrationforms", formID), {
                status: updatedStatus,
            })

            console.log('Status updated.');
        }

        console.log('Form updated successfully');
    }



    const handleRegistrationForm = async (name, email, phone, city, category, recipt) => {

        if (recipt) {

            const imageRef = ref(storage, `uploads/images/${Date.now()}-${recipt.name}`);
            const uploadResult = await uploadBytes(imageRef, recipt);

            const fileRef = ref(storageRef, uploadResult.ref.fullPath);
            const photoURL = await getDownloadURL(fileRef);

            await addDoc(collection(firestore, `registrationforms`), {
                name,
                email,
                phone,
                city,
                category,
                imageURL: photoURL,
                status: "Pending",
            });

        } else {

            await addDoc(collection(firestore, `registrationforms`), {
                name,
                email,
                phone,
                city,
                category,
                imageURL: "",
                status: "Pending",
            });

        }
    }

    const listAllForms = async (dispatch) => {

        onSnapshot(collection(firestore, "registrationforms"), (snapShot) => {
            let list = [];
            snapShot.docs.forEach((doc) => {
                list.push({ id: doc.id, ...doc.data() });
            });
            dispatch(setForms(list));
        });
    }

    const handleAuthenticateUser = (passwordGet) => {
        const credential = EmailAuthProvider.credential(user.email, passwordGet);
        return reauthenticateWithCredential(user, credential);
    }

    const handleDeleteForm = async (formID, preImage) => {

        console.log('form deleted started.');
        await deleteDoc(doc(firestore, 'registrationforms', formID));
        console.log('form deleted.');

        if (preImage) {
            console.log('image deleted started.');
            const imageRef = ref(storage, preImage);
            await deleteObject(imageRef);
            console.log('image deleted.');
        }

        console.log('Form and associated image deleted successfully.');
    }


    const handleAddFormConfig = async () => {
        await addDoc(collection(firestore, "formsConfig"), {
            label: "",
            type: "",
            value: [
                { subvalue: "" },
            ],
            timestamp: serverTimestamp(),
        })
    }

    const handleGetFormConfig = async (dispatch) => {
        onSnapshot(
            query(collection(firestore, 'formsConfig'), orderBy('timestamp', 'asc')),
            (snapshot) => {
                let formConfig = [];
                snapshot.docs.forEach((doc) => {
                    formConfig.push({ id: doc.id, ...doc.data() });
                });
                dispatch(getConfigForms(formConfig));
            })
    }

    const handleUpdateFormConfig = async (formID, label, inputType) => {

        if (label) {
            await updateDoc(doc(firestore, "formsConfig", formID), {
                label: label,
            })
        }
        if (inputType) {
            await updateDoc(doc(firestore, "formsConfig", formID), {
                type: inputType,
            })
        }
    }

    const handleDeleteFormConfig = async (formID) => {
        console.log('form deleted started.');
        await deleteDoc(doc(firestore, 'formsConfig', formID));
        console.log('form deleted.');
    }

    const handleAddValueConfig = async (formID) => {
        const emptySubvalue = { subvalue: "" };

        await updateDoc(doc(firestore, "formsConfig", formID), {
            value: arrayUnion(emptySubvalue),
        })
    }

    const handleUpdateValueConfig = async (formID, value, updatedValue) => {
        console.log("value and id", value, formID);

        const formConfigSnapshot = await getDoc(doc(firestore, "formsConfig", formID));
        const currentData = formConfigSnapshot.data();

        const indexOfItemToUpdate = currentData.value.findIndex(item => item.subvalue === value);

        if (indexOfItemToUpdate !== -1) {

            const isUpdatedValueExist = currentData.value.some(item => item.subvalue === updatedValue);

            if (isUpdatedValueExist) {
                console.error("Error: Updated value already exists in the array");
            } else {
                const updatedValueArray = [...currentData.value];
                updatedValueArray[indexOfItemToUpdate] = { subvalue: updatedValue };

                await updateDoc(doc(firestore, "formsConfig", formID), {
                    value: updatedValueArray,
                });

                console.log(`Array item updated successfully for form with ID: ${formID}`);
            }
        } else {
            console.error("Item not found in the array");
        }
    }


    const handleDeleteValueConfig = async (formID, valueToDelete) => {

        console.log("delete value", valueToDelete);

        await updateDoc(doc(firestore, "formsConfig", formID), {
            value: arrayRemove({ subvalue: valueToDelete }),
        });
    }


    const handleAddEvent = async (eventName, eventImage, eventLocation, eventStartDate, eventEndDate, eventShortDes, eventDetailDes) => {

        const imageRef = ref(storage, `uploads/event_images/${Date.now()}-${eventImage.name}`);
        const uploadResult = await uploadBytes(imageRef, eventImage);

        const fileRef = ref(storageRef, uploadResult.ref.fullPath);
        const photoURL = await getDownloadURL(fileRef);

        if (eventEndDate) {

            await addDoc(collection(firestore, `events`), {
                eventName,
                eventImage: photoURL,
                eventLocation,
                eventStartDate,
                eventEndDate,
                eventShortDes,
                eventDetailDes,
                status: "coming",
            });

        } else {

            await addDoc(collection(firestore, `events`), {
                eventName,
                eventImage: photoURL,
                eventLocation,
                eventStartDate,
                eventEndDate: "",
                eventShortDes,
                eventDetailDes,
                status: "coming",
            });

        }
    }

    const listAllEvents = async (dispatch) => {

        onSnapshot(collection(firestore, "events"), (snapShot) => {
            let event = [];
            snapShot.docs.forEach((doc) => {
                event.push({ id: doc.id, ...doc.data() });
            });
            dispatch({ type: FETCH_EVENT_SUCCESS, payload: { event } });
        });
    }

    const getEventData = async (eventId, dispatch) => {
        console.log("firebase function");

        const eventRef = doc(firestore, "events", eventId);

        onSnapshot(eventRef, (snapShot) => {
            const eventData = { id: snapShot.id, ...snapShot.data() };
            console.log(eventData);
            dispatch({ type: FETCH_EVENTDATA_SUCCESS, payload: { eventData } });
        });
    }


    const handleUpdateEvent = async (updateEventName, updateEventImage, updateEventLocation, updateEventStartDate, updateEventEndDate, updateEventShortDes, updateEventDetailDes, updatedStatus, eventWinner, eventRunnerUp, preEventImage, eventId) => {

        console.log('Event Updation Start.');

        if (updateEventImage) {

            console.log('Started Image updating...');
            const imageRef = ref(storage, `uploads/event_images/${Date.now()}-${updateEventImage.name}`);
            const uploadResult = await uploadBytes(imageRef, updateEventImage);

            const fileRef = ref(storageRef, uploadResult.ref.fullPath);
            const photoURL = await getDownloadURL(fileRef);

            console.log('Started firestore updating...');

            await updateDoc(doc(firestore, "events", eventId), {
                eventImage: photoURL,
            })

            if (preEventImage) {
                console.log('Started Image old path deletion...');
                const previousImgRef = ref(storage, preEventImage);
                await deleteObject(previousImgRef);
            }


            console.log('Form Image updated.');
        }

        if (updateEventName) {

            await updateDoc(doc(firestore, "events", eventId), {
                eventName: updateEventName,
            })

            console.log('Event Name updated.');
        }

        if (updateEventLocation) {

            await updateDoc(doc(firestore, "events", eventId), {
                eventLocation: updateEventLocation,
            })

            console.log('Event Location updated.');
        }

        if (updateEventStartDate) {

            await updateDoc(doc(firestore, "events", eventId), {
                eventStartDate: updateEventStartDate,
            })

            console.log('Event Start Date updated.');
        }

        if (updateEventEndDate) {

            await updateDoc(doc(firestore, "events", eventId), {
                eventEndDate: updateEventEndDate,
            })

            console.log('Event End Date updated.');
        }

        if (updateEventShortDes) {

            await updateDoc(doc(firestore, "events", eventId), {
                eventShortDes: updateEventShortDes,
            })

            console.log('Event Short Des. updated.');
        }

        if (updateEventDetailDes) {

            await updateDoc(doc(firestore, "events", eventId), {
                eventDetailDes: updateEventDetailDes,
            })

            console.log('Event Short Des. updated.');
        }

        if (updatedStatus) {

            await updateDoc(doc(firestore, "events", eventId), {
                status: updatedStatus,
            })

            console.log('Event Status updated.');
        }

        if (eventWinner) {

            await updateDoc(doc(firestore, "events", eventId), {
                winner: eventWinner,
            })

            console.log('Event Winner updated.');
        }

        if (eventRunnerUp) {

            await updateDoc(doc(firestore, "events", eventId), {
                runnerUp: eventRunnerUp,
            })

            console.log('Event RunnerUp updated.');
        }

        console.log('Form updated successfully');
    }


    const handleDeleteEvent = async (eventId, eventImage) => {

        console.log('form deleted started.');
        await deleteDoc(doc(firestore, 'events', eventId));
        console.log('form deleted.');

        if (eventImage) {
            console.log('image deleted started.');
            const imageRef = ref(storage, eventImage);
            await deleteObject(imageRef);
            console.log('image deleted.');
        }

        console.log('Form and associated image deleted successfully.');
    }




















    return <FirebaseContext.Provider
        value={{
            signUpUserWithEmailAndPassword,
            signInUserWithEmailAndPassword,
            // handleUserProfile,
            handleSubUserProfile,
            isLoggedIn,
            logOutUser,
            getUserData,
            user,
            handleUpdateUserProfile,
            handleRegistrationForm,
            listAllForms,
            handleUpdateForm,
            handleAuthenticateUser,
            handleDeleteForm,
            handleAddFormConfig,
            handleGetFormConfig,
            handleUpdateFormConfig,
            handleDeleteFormConfig,
            handleAddValueConfig,
            handleUpdateValueConfig,
            handleDeleteValueConfig,

            handleAddEvent,
            listAllEvents,
            handleUpdateEvent,
            getEventData,
            handleDeleteEvent,
        }}
    >
        {props.children}
    </FirebaseContext.Provider>
}