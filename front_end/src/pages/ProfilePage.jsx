import axios from "axios"
import Profile from '../components/Profile'
import NavBar from '../components/NavBar'
import React, { useEffect, useState } from "react"
import { Button } from "react-bootstrap"



function ProfilePage({user}) {

    console.log('This is the Profile page')
    // console.log({'props':props})
    // let data = axios.get('/profile_page')
    // .then(response => {
    //     (console.log(data.data)
    //     // return response.data}
    // ) 
        
      
        // console.log(user)
        // console.log('user test', user)

    return (
        <div>
            <NavBar />
            <h1 style={{marginLeft: '50px'}}>My Profile </h1>
            <Profile user={user}/>
            
        </div>
    )
}
export default ProfilePage