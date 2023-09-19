import React, { useState } from 'react'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../../firebase'

const Search = () => {
  const [username, setUsername] = useState("")
  const [user, setUser] = useState(null)
  const [err, setErr] = useState(false)

  const handleSearch = async () => {
    console.log(username)
    const q = query(collection(db, "users",
      where("displayName", "==", username)
    ))
    console.log("q is", q)
    try {
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        console.log(doc.id, "=>", doc.data())
        setUser(doc.data())
      })
    } catch (error) {
      setErr(error)
    }

  }

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch()
  }
  return (
    <div className="search">
      <div className="searchForm">
        <input type="text"
          name="serach" id="search"
          placeholder="find A User "
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found</span>}
      {
        user && (
          <div className="userChat">
            <img src="/avatar.png" alt="" />
            <div className="userChatInfo">
              <span>Jane</span>
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Search