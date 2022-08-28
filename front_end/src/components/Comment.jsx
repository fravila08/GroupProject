import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardGroup
} from 'mdb-react-ui-kit';
import 'react-bootstrap-icons';
import axios from 'axios';
import CommentForm from './CommentForm';
<<<<<<< HEAD
import {HiOutlinePhotograph, HiPlusSm, HiDotsHorizontal, HiOutlineTrash, HiOutlinePencilAlt, HiX} from 'react-icons/hi';
=======
import {HiOutlinePhotograph, HiPlusSm} from 'react-icons/hi';
>>>>>>> baf13bf (merging master into own branch)
import {RiAttachment2} from 'react-icons/ri';
import {TbMoodSmile} from 'react-icons/tb';
import {BiSend} from 'react-icons/bi';
import { useState, useEffect }  from 'react';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.addDefaultLocale(en)
import ReactTimeAgo from 'react-time-ago'

function EditForm({ isEditing, setIsEditing, activePost, post } ) {
  const [message, setMessage]= useState(post.description);

    const onSubmit = e => {
      e.preventDefault();
    }

  const handleEditChange = (e) => {
    setMessage(e.target.value);
  }

  const editPost = async() => {
    let editedPost = await axios.put(`posts/${activePost}`, { postId: activePost, description: message } );
    post.description = editedPost.data.description;
    setIsEditing(!isEditing);
  }

    return (
      <form onSubmit={onSubmit}>
        <textarea class="resize-none form-control" id="comment-form-textarea" defaultValue={message} onChange={handleEditChange} ></textarea>
        <div className="bottom-bar d-flex flex-row justify-content-between">
          <div class="edit-icons d-flex d-inline-flex flex-row space-x-1 align-self-center">
            <button class="btn bg-light"><TbMoodSmile/></button>
            <button class="btn bg-light"><HiOutlinePhotograph/> </button>
            <button class="btn bg-light"><RiAttachment2/>  </button>
            <button class="btn bg-light"> <HiPlusSm/> </button>
             
          </div>
          <div className="control-buttons">
            <button onClick={() => setIsEditing(false)} class="btn bg-light">Cancel</button>
            <button type="submit" class="btn btn-primary comment-form-button" onClick={editPost}><BiSend /></button>
          </div>
        </div>
      </form>
    )
}


export default function Comment({
  user, id, post, 
  activePost, setActivePost,
  postsList, setPostsList,
  isEditing, setIsEditing,
  isDeleting, setIsDeleting,
  editText, setEditText,
  handleEditChange,
  replies}) {

 
  const handleEditClick = async(e) => {
    setIsEditing(!isEditing);
    setActivePost(post.id);
  }

  const handleDeleteClick = async(e) => {
    setActivePost(post.id);
    setIsDeleting(true);
  }

  useEffect(() => {
    console.log(isDeleting, activePost === id);
    if(isDeleting && activePost === id) {
      const deleteAtId = async() => {
          console.log('delete state var changed, hook calling deletePost');
          let postId = activePost;
          let { data: remaining } = await axios.delete(`posts/${postId}`, { data: {postId: postId}});
          console.log('remaining:', remaining);
<<<<<<< HEAD
          setPostsList(remaining).reverse();
=======
          setPostsList(remaining.reverse());
>>>>>>> baf13bf (merging master into own branch)
        }
        deleteAtId();
        setIsDeleting(false);
    }
  }, [isDeleting])


  return( 
    <div className="comment">
      <MDBCard className="card">
        <MDBCardBody>
          <MDBCardGroup className="top d-flex-column align-items-center">
<<<<<<< HEAD
              <div>
                <img
                  src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                  class="rounded-circle z-depth-0"
                  alt="avatar image"
                  height="60"
                  width="60"
                />
              </div>
              <div className="align-self-center align-self-end mx-3 d-inline-flex flex-column text-meta">
                <h5>First Last</h5>
                <div>
                  {user && user.job_title}
                </div>
              </div>
                <div class="ml-auto dropdown align-self-center">
                  <button
                    class="btn bg-white align-self-center"
                    type="button"
                    id="dropdownMenuButton"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <HiDotsHorizontal />
                  </button>
                  <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton">
                    <li><div class="dropdown-item" onClick={handleEditClick} ><HiOutlinePencilAlt />Edit</div></li>
                    <li><div class="dropdown-item" onClick={handleDeleteClick}><HiOutlineTrash />Delete</div></li>
                    <li><div class="dropdown-item" >Something else here</div></li>
                  </ul>
                </div>
=======
            <MDBCardGroup className="meta">
              <img
                src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                class="rounded-circle z-depth-0"
                alt="avatar image"
                height="35"
                width="35"
              />
              <MDBCardGroup className="d-inline-flex flex-column text-meta">
                <div></div>
                <div>
                  <small>Published: <ReactTimeAgo date={post.date_created} locale="en-US"/></small>
                </div>
              </MDBCardGroup>

            </MDBCardGroup>
>>>>>>> baf13bf (merging master into own branch)

          </MDBCardGroup>
          <MDBCardTitle className="pt-1 mb-0 comments-title">{post.title}</MDBCardTitle>
          <small><ReactTimeAgo date={post.date_created} locale="en-US"/></small>
          <MDBCardText className="pt-3 comment-text">
            { activePost===id && isEditing &&
            <div>
              <EditForm isEditing={isEditing} setIsEditing={setIsEditing} activePost={activePost} post={post} />
            </div>
            }
            {
              !isEditing && <div>{post.description}</div>
            }
          </MDBCardText>
          <MDBCardGroup>
          
            <i class="bi bi-heart" style={{ fontSize: 18 }}></i>
            <i class="bi bi-chat" style={{ fontSize: 18 }}></i>
            <i class="bi bi-bookmark" style={{ fontSize: 18 }}></i>
          </MDBCardGroup>
          <div>
            {/*   { replies.length > 0 && 
              replies.map((reply) => {
                return <Comment comment={reply} key={reply.id} replies={[]} />     
              })
            }
            */}
          </div>
        </MDBCardBody>
      </MDBCard>
    </div>
  )
}
