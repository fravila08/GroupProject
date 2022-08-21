import axios from 'axios'
import React, { useState } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import { LinkedInLoginButton } from "react-social-login-buttons";
import { GoogleLoginButton } from "react-social-login-buttons";
import { MDBLink } from 'mdbreact';

function SignIn({handleJustifyClick, justifyActive}){
    function signIn(event){
        event.preventDefault()
        let email= document.getElementById('emailSignIn').value
        let password= document.getElementById('passwordSignIn').value
        axios.post('/sign_in', {
          email: email, 
          password: password
        }).then((response)=>{
          console.log('response from server: ', response)
          window.location.reload()
        })
    }

    return (
        <div>
          <div className="text-center mb-3">
            <div className='d-flex flex-column'>
              <GoogleLoginButton />
              <LinkedInLoginButton />

            </div>
            <div id="signin-divider"></div>
            <p className="text-center mt-3">or:</p>
          </div>

            <MDBInput id='emailSignIn' wrapperClass='mb-2' label='Email address'  type='email'/>
            <MDBInput id='passwordSignIn' wrapperClass='mb-2' label='Password' type='password'/>

          <div className="d-flex justify-content-between mx-4 mb-2">
            <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn id="signin-btn" onClick={signIn} className="mb-2 w-100">Sign in</MDBBtn>
          <p className="text-center">Need an account?&nbsp; 
           <a href='#' onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>
             Sign Up
           </a>
          </p>
          
            
        </div>
    )
}

export default SignIn;
