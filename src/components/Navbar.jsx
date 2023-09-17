import React from 'react'

const Navbar = () => {
    return (
        <div className="navbar">
            <span className="logo">
                Sychat
            </span>
            <div className="user">
                <img src="./avatar.png"/>
                <span>John</span>
                <button>logout</button>
            </div>
        </div>
    )
}

export default Navbar