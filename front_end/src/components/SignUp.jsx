import axios from 'axios'
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';
import Form from 'react-bootstrap/Form';

function SignUp({handleJustifyClick, justifyActive}){
    function signUp(){
        // this will come into effect once the it's a form to submit not a button you'll use get elementbyid().value to get the form values
        let name=document.getElementById('name').value
        let lastName= document.getElementById('lastName').value
        let jobTitle=document.getElementById('jobTitle').value
        let email=document.getElementById('email').value
        let password=document.getElementById('password').value
        axios.post('/sign_up', {
          name: name,
          lastName: lastName,
          jobTitle: jobTitle,  
          email: email, 
          password: password
        }).then((response)=>{
            // usenavigate
          document.location.href='/'
          console.log('response from server: ', response)
        })
      }

      return(
          <div>

            <MDBInput wrapperClass='mb-2' label='First Name' id='name' type='text'/>
            <MDBInput wrapperClass='mb-2' label='Last Name' id='lastName' type='text'/>
            <MDBInput wrapperClass='mb-2' label='Email' id='email' type='email'/>
            <MDBInput wrapperClass='mb-2' label='Password' id='password' type='password'/>
            <Form.Select>
              <option>Select A Job Title</option>
              <option>Software Developer</option>
              <option>Sales Engineer</option>
              <option>Product Manager</option>
              <option>Surfer Dude</option>
            </Form.Select>
            <div className='d-flex justify-content-center mb-2'>
              <MDBCheckbox name='flexCheck' id='flexCheckDefault' label='I have read and agree to the terms' />
            </div>

            <MDBBtn id="signup-btn" className="mb-2 w-100" onClick={signUp}>Sign Up</MDBBtn>
          <p className="text-center">Already have an account? &nbsp; 
           <a href='#' onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>
             Log in
           </a>
          </p>
          </div>
      )
}

export default SignUp
