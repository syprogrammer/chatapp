import React from 'react'

const Chats = () => {
    return (
        <div className="chats">
            {
                [1, 2, 3, 4].map((item) => {
                    return (
                        <div className="userChat" key={item}>
                            <img
                                src="avatar.png"
                                alt="avatar"
                            />

                            <div className="userChatInfo">
                                <span>Jane</span>
                                <p>Hello</p>
                            </div>

                        </div>
                    )
                })
            }
        </div>
    )
}

export default Chats