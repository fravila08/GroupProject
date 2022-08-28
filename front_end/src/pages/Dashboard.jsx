import axios from "axios"
import React, { useEffect, useState } from "react"
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import NavBar from "../components/NavBar";
import { MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter, MDBIcon, MDBBadge, MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Board from 'react-trello'
import AddButton from '../components/AddButton'
import AddJobModal from "../components/AddJobModal";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


function Dashboard(props) {

  const [companyName, setCompanyName] = useState('')
  const [companyLink, setCompanyLink] = useState('')
  const [jobTitle, setTitle] = useState('')
  const [salary, setSalary] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [activeCard, setActiveCard] = useState(null);


  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);

  // sets state of current jobs to empty list
  const [currentJobs, setCurrentJobs] = useState([])

  const [lgShow, setLgShow] = useState(false);
  const [smShow, setSmShow] = useState(false);

  const [modal, setModal] = useState(false);
  const [addedJob, setAddedJob] = useState(false);
console.log(currentJobs)
  //sets state of current jobs to current list based on back end request

  const getJobs = () => {
       axios.get("jobs").then((response) =>
         setCurrentJobs(
           response.data.map((job) => {
             return {
               id: job.id,
               title: job.company_name,
               description: job.job_title,
               label: (
                 <a href={job.company_link} target="_blank">
                   <button type="button" class="btn-sm btn-primary btn-rounded">
                     apply
                   </button>
                 </a>
               ),
               draggable: true,
             };
           })
         )
       );
  }
  useEffect(() => {
    console.log(addedJob)
    getJobs()
 

  }, [addedJob])


  const data = {
    lanes: [
      {
        id: 'lane1',
        title: 'Interested',
        label: currentJobs.length,
        cards: currentJobs,
        disallowAddingCard: true,

      },
      {
        id: 'lane2',
        title: 'Applied',
        label: '0/0',
        cards: [],
        disallowAddingCard: true,
      },
      {
        id: 'lane3',
        title: 'Interview Scheduled',
        label: '0/0',
        cards: [],
        disallowAddingCard: true,
      },
      {
        id: 'lane4',
        title: 'Received Offer',
        label: '0/0',
        cards: [],
        disallowAddingCard: true,
      }
    ]
  }

  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleCardModal = () => {
    setLgShow(!lgShow);
  };

  const components = {
    LaneFooter: function noRefCheck() { },

  };


  const onCardClick = (cardId, metadata, laneId) => {
    console.log('clicked card in', laneId);
    console.log('state of cardModalIsOpen?', cardModalIsOpen);
    console.log('cardId:', cardId, 'metadata', metadata);
    setActiveCard(cardId);
    setCardModalIsOpen(!cardModalIsOpen);
    toggleCardModal();
  }
  const deleteJob = (jobId) => {
    axios.delete(`jobs/${jobId}`)
      .then(setCurrentJobs(currentJobs.filter(job => job.id != jobId)))
      .then(console.log('job deleted'))
  };
  const editJob = () => {
    console.log('editing card', activeCard);
    var jobEditing = currentJobs.find(job => {
      return job.id === activeCard;
    })

    console.log('object being edited', jobEditing);

    let jobToEdit = {
      // id: activeCard,
      company_name : companyName,
      job_title : jobTitle,
      salary : salary,
      location : location,
    }
    console.log(jobToEdit)
    axios.put(`jobs/${activeCard}`, jobToEdit)
    .then(response => {
      if (response.data.msg === "Job updated"){
        getJobs();
        console.log(response.data.msg)}
        else {
          console.log(response.data.msg)
        }
      }
      )
    


  };


  return (
    <div>
      <>
        <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-sm">
              Small Modal
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>...</Modal.Body>
        </Modal>
        <Modal
          size="lg"
          show={lgShow}
          onHide={() => setLgShow(false)}
          aria-labelledby="example-modal-sizes-title-lg"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
              Additional Information
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <MDBModalBody>
              <form className="mx-3 grey-text" onSubmit={(e)=>{
                e.preventDefault(); 
                toggleCardModal()
                editJob()
              } }>
                <MDBInput type="text" label="Company" onChange={(e) => setCompanyName(e.target.value)} />
                <MDBInput type="text" label="Title" onChange={(e) => setTitle(e.target.value)} />
                <MDBInput type="text" label="Salary" onChange={(e) => setSalary(e.target.value)} />
                <MDBInput type="text" label="Location" onChange={(e) => setLocation(e.target.value)} />
                <MDBInput type="text" label="Date Applied" onChange={(e) => setDate(e.target.value)} />
                <MDBBtn
                  color="info"
                  type="submit"
                >
                  Save
                </MDBBtn>
              </form>

            </MDBModalBody>
          </Modal.Body>
        </Modal>
      </>
      <React.Fragment>
        <NavBar />
        <AddButton toggleModal={toggleModal} />
        <AddJobModal modal={modal} toggleModal={toggleModal} companyName={companyName}
          jobTitle={jobTitle} description={description} companyLink={companyLink}
          setCompanyLink={setCompanyLink} setCompanyName={setCompanyName} setDescription={setDescription}
          setTitle={setTitle} setAddedJob={setAddedJob} addedJob={addedJob} />
        <Board components={components}
          data={data}
          style={{ backgroundColor: 'white' }}
          editable
          id="EditableBoard1"
          onCardClick={onCardClick}
          onCardDelete={deleteJob}
        >
        </Board>
      </React.Fragment>
    </div>
  )
}

export default Dashboard
