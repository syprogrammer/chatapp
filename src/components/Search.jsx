import React from 'react'

const Search = () => {
  return (
    <div className="search">
        <div className="searchForm">
            <input type="text"
             name="serach" id="search"
              placeholder="find A User " />
        </div>
        <div className="userChat">
            <img src="/avatar.png" alt="" />
            <div className="userChatInfo">
                <span>Jane</span>
            </div>
        </div>
    </div>
  )
}

export default Search