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
import { useState, useEffect }  from 'react';


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
        <textarea class="form-control" id="comment-form-textarea" defaultValue={message} onChange={handleEditChange} ></textarea>
        <button type="submit" class="btn btn-primary btn-block mb-4 comment-form-button" onClick={editPost}>MAKE EDIT</button>
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
          setPostsList(remaining);
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
            <MDBCardGroup className="meta">
              <img
                src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"
                class="rounded-circle z-depth-0"
                alt="avatar image"
                height="35"
                width="35"
              />
              <MDBCardGroup className="d-inline-flex flex-column text-meta">
                <div>{post.createdAt}</div>
              </MDBCardGroup>

            </MDBCardGroup>

          </MDBCardGroup>
          <MDBCardTitle className="comments-title">{post.title}</MDBCardTitle>
          <MDBCardText className="comment-text">
            { activePost===id && isEditing &&
            <div>
              <EditForm isEditing={isEditing} setIsEditing={setIsEditing} activePost={activePost} post={post} />
            </div>
            }
            {
              !isEditing && <div>{post.description}</div>
            }
          </MDBCardText>
          <span class="post-reply">Reply</span>
            <span class="post-edit" onClick={handleEditClick}>Edit</span>
            <span id="post-delete" onClick={handleDeleteClick}>Delete</span>
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
