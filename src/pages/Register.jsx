import React, { useState } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, storage, db } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { doc, setDoc } from "firebase/firestore"
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [Err, setErr] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const displayName = e.target['name'].value
        const email = e.target['email'].value
        const password = e.target['password'].value
        const file = e.target['file'].files[0]
        if(!file){
            setErr("please choose profile image")
            return 
        }
        try {
          
            const res = await createUserWithEmailAndPassword(auth, email, password)
            console.log(res.user)
            const storageRef = ref(storage, displayName)
            await uploadBytesResumable(storageRef, file).then(() => {
                console.log("file", file)
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        console.log("res user", res.user)
                        //Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        //create user on firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        //create empty user chats on firestore
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });

        } catch (error) {
            console.log(error)
            setErr(true)
        }

    }


    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">SyChat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit}>
                    <input type="text" required name="name" id="name" placeholder='display name' />
                    <input type="email" required name="email" id="email" placeholder="email" />
                    <input type="password" required name="password" id="password" placeholder="password" />
                    <input type="file"
                        name="file" id="file"
                        
                    />
                    <label htmlFor='file'>
                        <img src="./uploadimage.png" alt="upload image" />
                        <span>Add an avatar</span>
                    </label>{
                        Err  && (
                            <p className='error-msg'>{Err}</p>
                        )
                    }
                    <button>Sign up</button>
                </form>
                <p>You do have an account? <Link to="/login">Login</Link></p>
            </div>
        </div>
    )
}

export default Register