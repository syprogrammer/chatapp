import React from 'react'
import { createUserWithEmailAndPassword,updateProfile } from 'firebase/auth'
import { auth, storage } from '../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'


const Register = async () => {
    const handleSubmit = (e) => {
        e.preventDefault()
        const displayName = e.target['name'].value
        const email = e.target['email'].value
        const password = e.target['password'].value
        const file = e.target['file'].files[0]
        const [Err, setErr] = useState('')
        try {
            const res = createUserWithEmailAndPassword(auth, email, password)
            const storageRef = ref(storage, displayName)
            uploadTask.on((error) => {
                setErr(true)
            }, () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                    console.log("file available at", downloadURL)
                    await updateProfile(res.user,{
                        displayName,
                        photoURL:downloadURL
                    })
                })
            })
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
                    <input type="text" name="name" id="name" placeholder='display name' />
                    <input type="email" name="email" id="email" placeholder="email" />
                    <input type="password" name="password" id="password" placeholder="password" />
                    <input type="file"
                        name="file" id="file"

                    />
                    <label>
                        <img src="./uploadimage.png" alt="upload image" />
                        <span>Add an avatar</span>
                    </label>
                    <button>Sign up</button>
                </form>
                <p>You do have an account? Login</p>
            </div>
        </div>
    )
}

export default Register