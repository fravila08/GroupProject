import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import NavBar from "../components/NavBar";
import {
  MDBBtn,
  MDBInput,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
  MDBIcon,
  MDBBadge,
  MDBContainer,
  MDBRow,
  MDBCol,
} from "mdbreact";
import Board from "react-trello";
import AddButton from "../components/AddButton";
import AddJobModal from "../components/AddJobModal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { viewport } from "@popperjs/core";

function Dashboard(props) {
  const [activeCard, setActiveCard] = useState(null);
  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);

  // sets state of current jobs to empty list
  const [interestedJobs, setInterestedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [interviewedJobs, setInterviewedJobs] = useState([]);
  const [offerJobs, setOfferJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({})

  const [lgShow, setLgShow] = useState(false);
  const [smShow, setSmShow] = useState(false);

  const [modal, setModal] = useState(false);
  const [addedJob, setAddedJob] = useState(false);
  const laneStyle = {
    width: 400,
    maxWidth: 400,
    margin: "auto",
    marginBottom: 5,
  };

  let data = {
    lanes: [
      {
        id: "lane1",
        title: "Interested",
        label: interestedJobs.length,
        cards: interestedJobs,
        disallowAddingCard: true,
        laneStyle:{
          ...laneStyle
        }
      },
      {
        id: "lane2",
        title: "Applied",
        label: appliedJobs.length,
        cards: appliedJobs,
        disallowAddingCard: true,
        style: {
          width: 300,
        },
      },
      {
        id: "lane3",
        title: "Interview Scheduled",
        label: interviewedJobs.length,
        cards: interviewedJobs,
        disallowAddingCard: true,
        style: {
          width: 300,
        },
      },
      {
        id: "lane4",
        title: "Received Offer",
        label: offerJobs.length,
        cards: offerJobs,
        disallowAddingCard: true,
        style: {
          width: 300,
        },
      },
    ],
  };

  //sets state of current jobs to current list based on back end request
  const getJobs = () => {
    axios.get("jobsInterested").then((response) => {
      setInterestedJobs(
        response.data.map((job) => {
          return {
            id: job.id,
            title: job.company_name,
            description: job.job_title,
            salary: job.salary,
            location: job.location,
            label: (
              <a href={job.company_link} target="blank">
                <button type="button" class="btn-sm btn-primary btn-rounded"
                  onClick={() => axios.put(`job/applyClicked/${job.id}`, {
                    interview_scheduled: false,
                    job_offer: false,
                    completed: true
                  }).then(res => {
                    reset()
                    setTimeout(
                      () => (setLgShow(false)),
                      1000
                    );
                  })}>
                  apply
                </button>
              </a>
            ),
            draggable: true,
          }
        })
      )
    }
    );
  }

  const getAppliedJobs = () => {
    axios.get("jobsApplied").then((response) => {
      setAppliedJobs(
        response.data.map(aj => {
          return {
            id: aj.id,
            title: aj.company_name,
            description: aj.job_title,
            salary: aj.salary,
            location: aj.location,
            draggable: true,
          }
        })
      )
    })
  }

  const getInterviewedJobs = () => {
    axios.get("jobsInterviewed").then((response) => {
      setInterviewedJobs(
        response.data.map(ij => {
          return {
            id: ij.id,
            title: ij.company_name,
            description: ij.job_title,
            salary: ij.salary,
            location: ij.location,
            draggable: true,
          }
        }
        )
      )
    })
  }

  const getOfferJobs = () => {
    axios.get("jobsOffered").then((response) => {
      setOfferJobs(
        response.data.map(oj => {
          return {
            id: oj.id,
            title: oj.company_name,
            description: oj.job_title,
            salary: oj.salary,
            location: oj.location,
            draggable: true,
          }
        }
        )
      )
    })
  }

  const reset = () => {
    getJobs();
    getAppliedJobs()
    getInterviewedJobs()
    getOfferJobs()
  }

  useEffect(() => {
    reset()
  }, []);

  const updateData = () => {
    data = {
      lanes: [
        {
          id: "lane1",
          title: "Interested",
          label: interestedJobs.length,
          cards: interestedJobs,
          disallowAddingCard: true,
        },
        {
          id: "lane2",
          title: "Applied",
          label: appliedJobs.length,
          cards: appliedJobs,
          disallowAddingCard: true,
        },
        {
          id: "lane3",
          title: "Interview Scheduled",
          label: interviewedJobs.length,
          cards: interviewedJobs,
          disallowAddingCard: true,
        },
        {
          id: "lane4",
          title: "Received Offer",
          label: offerJobs.length,
          cards: offerJobs,
          disallowAddingCard: true,
        },
      ],
    }
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
    setActiveCard(cardId);
    let curr
    axios.get('jobs').then(res => {
      curr = res.data.filter(item => item.id == cardId)
      setSelectedJob(curr[0])
      setCardModalIsOpen(!cardModalIsOpen);
      toggleCardModal();
    })
  };

  const deleteJob = (jobId) => {
    axios
      .delete(`jobs/${jobId}`)
      .then(res => reset())
  };

  const editJob = () => {
    let jobToEdit = {
      company_name: document.querySelector('#eCompany').value,
      job_title: document.querySelector('#eTitle').value,
      salary: document.querySelector('#eSalary').value,
      location: document.querySelector('#eLocation').value,
      date: document.querySelector('#eDate').value,
    };

    axios.put(`jobs/${activeCard}`, jobToEdit).then((response) => {
      reset();
    });
  };

  const onCardMoveAcrossLanes = (fromLaneId, toLaneId, cardId, index) => {
    let cardToChange
    axios.get('jobs').then(res => {
      cardToChange = res.data.filter((job) => job.id == cardId)
      if (toLaneId === "lane1") {
        let interestedJob = {
          company_name: cardToChange[0]["company_name"],
          job_title: cardToChange[0]["job_title"],
          salary: cardToChange[0]["salary"],
          location: cardToChange[0]["location"],
          interview_scheduled: false,
          job_offer: false,
          completed: false,
        };
        axios.put(`cardjobs/${cardId}`, interestedJob)
          .then((response) => {
            console.log(response.data["msg"])
            reset()
            updateData()
          });
      }
      else if (toLaneId === "lane2") {
        let appliedJob = {
          company_name: cardToChange[0]["company_name"],
          job_title: cardToChange[0]["job_title"],
          salary: cardToChange[0]["salary"],
          location: cardToChange[0]["location"],
          interview_scheduled: false,
          job_offer: false,
          completed: true,
        };
        axios.put(`cardjobs/${cardId}`, appliedJob)
          .then((response) => {
            console.log(response.data["msg"])
            reset()
            updateData()
          });
      } else if (toLaneId === "lane3") {
        let interviewJob = {
          company_name: cardToChange[0]["company_name"],
          job_title: cardToChange[0]["job_title"],
          salary: cardToChange[0]["salary"],
          location: cardToChange[0]["location"],
          interview_scheduled: true,
          job_offer: false,
          completed: true,
        };
        axios.put(`cardjobs/${cardId}`, interviewJob)
          .then((response) => {
            console.log(response.data["msg"])
            reset()
            updateData()
          });
      } else if (toLaneId === "lane4") {
        let jobOffer = {
          company_name: cardToChange[0]["company_name"],
          job_title: cardToChange[0]["job_title"],
          salary: cardToChange[0]["salary"],
          location: cardToChange[0]["location"],
          interview_scheduled: true,
          job_offer: true,
          completed: true,
        };
        axios.put(`cardjobs/${cardId}`, jobOffer)
          .then((response) => {
            console.log(response.data["msg"])
            reset()
            updateData()
          });
      }
    })
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
              <form
                className="mx-3 grey-text"
                onSubmit={(e) => {
                  e.preventDefault();
                  toggleCardModal();
                  editJob();
                }}
              >
                <div class="form-outline">
                  <label class="form-label" for="eCompany">Company</label>
                  <input
                    type="text"
                    id="eCompany"
                    class="form-control"
                    defaultValue={selectedJob.company_name || ""}
                  />
                </div>
                <br></br>
                <div class="form-outline">
                  <label class="form-label" for="eTitle">Title</label>
                  <input
                    type="text"
                    id="eTitle"
                    class="form-control"
                    defaultValue={selectedJob.job_title || ""}
                  />
                </div>
                <br></br>
                <div class="form-outline">
                  <label class="form-label" for="eSalary">Salary</label>
                  <input
                    type="text"
                    id="eSalary"
                    class="form-control"
                    defaultValue={selectedJob.salary || ""}
                  />
                </div>
                <br></br>
                <div class="form-outline">
                  <label class="form-label" for="eLocation">Location</label>
                  <input
                    type="text"
                    id="eLocation"
                    class="form-control"
                    defaultValue={selectedJob.location || ""}
                  />
                </div>
                <br></br>
                <div class="form-outline">
                  <label class="form-label" for="eDate">Date Applied</label>
                  <input
                    type="text"
                    id="eDate"
                    class="form-control"
                    defaultValue={selectedJob.date_completed || ""}
                  />
                </div>
                <br></br>
                <MDBBtn color="info" type="submit">
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
        <AddJobModal
          getJobs={getJobs}
          modal={modal}
          toggleModal={toggleModal}
        />
        <Board
          components={components}
          data={data}
          style={{ backgroundColor: "white" }}
          editable
          id="EditableBoard1"
          onCardClick={onCardClick}
          onCardDelete={deleteJob}
          onCardMoveAcrossLanes={onCardMoveAcrossLanes}
        ></Board>
      </React.Fragment>
    </div>
  );
}

export default Dashboard;
