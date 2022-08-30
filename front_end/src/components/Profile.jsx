import {useReducer, useState} from 'react';
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.css"
import Image from 'react-bootstrap/Image'

function Profile({user}) {
    console.log('profile component')
    // const [user, setUser] = useState('')

    // console.log('user before', user)

    // function getProfileInfo(event) {
    // this will come into effect once the it's a form to submit not a button you'll use get elementbyid().value to get the form values
    // event.preventDefault()
    // axios.get('/profile_page').then(response => 
    //     // (console.log(response.data)
    //     (setUser(response.data,[])
    //     ))
      
        // console.log(user1.values)

        function split(str) {
            return str.toString().split('')
            
        }

        // console.log('user after', user)
        let a = (user && user.date_joined)
        // console.log(a)
        // let b = a.toString()[0]
        // console.log(typeof a)

    return (
        // <div style={{ display: "inline-flex", padding: 30, marginInline: '20%',  }}>
        <div>
            {/* profile pic */}
            <div className='profile_info container'>
                <div className='circle'>
                    {/* <Image className='pic' style={{ height: '500px'}} src={user && user.profile_picture} ></Image> */}
                    <Image className='pic' style={{ height: '500px'}} src="https://images.squarespace-cdn.com/content/v1/536e785fe4b0b84b930da48c/1649365755383-3MQD2BJVWVWR793E8IWY/Headshot+Photographer+020.jpg" ></Image>
                </div>
                {/* <div > */}
                    <div className='profile_text'>
                        <h3 className='profile_title'>Name: </h3>
                        <h3 className='profile_title'>Current Job Title: </h3>
                        <h3 className='profile_title'>Email Address: </h3>
                        <h3 className='profile_title'>Member Since: </h3>
                    </div>
                    <div className='profile_text'>
                        <h3>{user && user.first_name} {user && user.last_name}</h3>
                        <h3>{user && user.job_title}</h3>
                        <h3>{user && user.email}</h3>
                        <h3>{user && user.date_joined}</h3>
                    </div>
                    {/* <div className="textbox">
                        <h3>Name: {user && user.first_name} {user && user.last_name}</h3>
                    </div>
                    <div className="textbox">
                        <h3>Current Job Title: {user && user.job_title}</h3>
                    </div>
                    <div className="textbox">
                        <h3>Email Address: {user && user.email} </h3>
                    </div>
                    <div className="textbox">
                        <h3>Member Since: {user && user.date_joined} </h3>
                    </div> */}
                    {/* <h3><a className='edit_profile' href='/#/profile/edit'>Edit Profile</a></h3> */}
                {/* </div> */}
            </div>
        </div>
  )
}

export default Profile
