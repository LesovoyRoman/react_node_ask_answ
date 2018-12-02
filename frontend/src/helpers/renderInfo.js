import React from "react";

export const userInfoData = (data, authUser) => {
    if(data.user && data.user_id !== authUser.id) return (
        <span style={{float: 'right', fontSize: '12px'}}>by {data.user[0].name}</span>
    )

    return (
        <span style={{float: 'right', fontSize: '12px'}}>by You</span>
    )
}