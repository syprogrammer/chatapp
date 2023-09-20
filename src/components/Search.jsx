import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, getDoc, setDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore'
import { db } from '../../firebase'
import { AuthContext } from '../context/AuthContext'

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)
  const { currentUser } = useContext(AuthContext)

  const handleSearch = async () => {
    console.log(username)

    const q = query(collection(db, "users"),
      where("displayName", "==", username));
    console.log("q is", q)
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        setUser(doc.data())
      });

    } catch (error) {
      setErr(error)
    }

  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }

  const handleSelect = async () => {
    //check whether the group (chats in firestore) exist or not
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid
    console.log(combinedId)
    // create user chats 
    const res = await getDoc(doc(db, "chats", combinedId))
    console.log(res.exists())
    try {
      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] })
        //create user chats
        await updateDoc(doc(db,"userChats",currentUser.uid),{
          [combinedId + ".userInfo"]:{
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })
        //for other user
        await updateDoc(doc(db,"userChats",user.uid),{
          [combinedId + ".userInfo"]:{
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL
          },
          [combinedId+".date"]:serverTimestamp()
        })


      }
    } catch (error) {
      console.log(error)
    }
    setUser(null)
    setUsername("")
  }

  return (
    <div className="search">
      <div className="searchForm">
        <input type="text"
          name="serach" id="search"
          placeholder="find A User "
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
      </div>
      {err && <span>User not found</span>}
      {
        user && (
          <div className="userChat" onClick={handleSelect}>
            <img src={user.photoURL} alt="" />
            <div className="userChatInfo">
              <span>{user.displayName}</span>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Search