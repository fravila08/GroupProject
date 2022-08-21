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
      <Icon.ThreeDots className="icon"/>
      
    </a>
  ));

function SectionHeader(){
    // number just for example of bringing in prop
    const number = 5


    console.log('section header component')
    
    return (
        <div className='section_header'>
            <div className='container'>
                <Icon.PlusCircle onClick={number} className="icon"/>
                <h2 >Application Category</h2>
                
                <Dropdown>
                    <Dropdown.Toggle as={CustomToggle} />
                    
                    <Dropdown.Menu className='dropdown' size="sm" title="">
                    <Dropdown.Header>Options</Dropdown.Header>
                    <div >
                        <Dropdown.Item href="#/action-1">Delete All</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Move All</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Do Something else</Dropdown.Item>
                    </div>
                    </Dropdown.Menu>
                </Dropdown>
                    {/* <Icon.ThreeDots className="icon"/> */}
            </div>
            <h3>{number} jobs</h3>
        </div>

    )
}

export default SectionHeader
