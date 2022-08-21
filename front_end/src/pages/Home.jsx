import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import axios from 'axios'
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox
} from 'mdb-react-ui-kit';

export default function Home({user}) {
  const [justifyActive, setJustifyActive] = useState('tab1');;

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };


  return (
    <div className="App">
      <MDBContainer className="p-3 my-5 d-flex flex-column w-100">
          <MDBContainer className="p-3 my-5 d-flex flex-column w-100">
            {user && <p>Welcome, {user.name}</p>}
            <MDBTabsContent>
              <MDBTabsPane show={justifyActive === 'tab1'}>
                <SignIn handleJustifyClick={handleJustifyClick} justifyActive={justifyActive} />
              </MDBTabsPane>
              <MDBTabsPane show={justifyActive === 'tab2'}>
                <SignUp handleJustifyClick={handleJustifyClick} justifyActive={justifyActive} />
              </MDBTabsPane>
            </MDBTabsContent>
          </MDBContainer>
      </MDBContainer>
    </div>
  )
}

