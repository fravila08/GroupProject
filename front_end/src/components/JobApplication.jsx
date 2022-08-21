import React from 'react'
import {Dropdown} from 'react-bootstrap';
import * as Icon from 'react-bootstrap-icons';

{/* you'll need to do npm i bootstrap-icons */}


const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={e => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      <Icon.PencilSquare className="icon"/>
      
    </a>
  ));

function JobApplication(){
    // number just for example of bringing in prop
    const number = 5


    console.log('job application')
    
    return (
        <div className='job_application'>
            <div className='container company_title'>
                <div className='container'>
                <img height='50px' src='https://scontent-iad3-2.xx.fbcdn.net/v/t39.30808-6/278920076_142880888270439_1182193600203795978_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=9XW9orhKgZcAX_6UYRN&_nc_ht=scontent-iad3-2.xx&oh=00_AT-IhWe2PYdQqXJiuG-agauTtUCFpucJNgA1K_iUFe4SHw&oe=6305E8EE'></img>
                <h2 className='company_title2'> Company Name</h2>
                </div>

                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />
                    
                    <Dropdown.Menu className='dropdown' size="sm" title="">
                        <Dropdown.Header>Options</Dropdown.Header>
                        <Dropdown.Item href="#/action-1">Move</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Edit</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Delete</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <Icon.PencilSquare className="icon"/> */}
            </div>
            <div className='container job_title'>
                <h2> Job Title</h2>
                
                
                    {/* <Icon.ThreeDots className="icon"/> */}
            </div>
            <h3>Submitted on 8/12/2022 (7 days ago)</h3>
        </div>

    )
}

export default JobApplication
