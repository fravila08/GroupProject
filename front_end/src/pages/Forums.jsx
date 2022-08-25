import React, { useState, useEffect } from 'react';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import axios from 'axios';

let commentsMocks = [
  {
    id: "1",
    description: "First comment",
    username: "Jack",
    userId: "1",
    parentId: null,
    createdAt: "2022-08-16T23:00:33.010+02:00",
  },
  {
    id: "2",
    description: "Second comment",
    username: "Alice",
    userId: "2",
    parentId: null,
    createdAt: "2022-08-20T23:00:33.010+02:00",
  },
  {
    id: "3",
    description: "First comment first child",
    username: "Bob",
    userId: "2",
    parentId: "1",
    createdAt: "2022-08-21T23:00:33.010+02:00",
  },
  {
    id: "4",
    description: "Second comment second child",
    username: "Sally",
    userId: "2",
    parentId: "2",
    createdAt: "2022-08-22T23:00:33.010+02:00",
  },
];

export default function Forums({user}) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [postsList, setPostsList] = useState([]);

  //only used for mocking data
  //  const getReplies = commentId => {
  //    return commentsMocks.filter((comment) => {
  //      return comment.parentId === commentId;
  //    }).sort((a, b) => {
  //      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  //    });
  //  }

  useEffect(() => {
    console.log('postsList updated', postsList);
  }, [postsList] );

  useEffect(() => {
    //setPostsList(commentsMocks);
    async() => {
      let response = await axios.get('forums')
      setPostsList(response);
      console.log('posts in db');
    }
    console.log('Forum.jsx called useeffect w/ empty dependency array'); 
  }, [])


  //used for mocking data
  //  const rootComments = commentsMocks.filter((comment) => {
  //    return comment.parentId === null;
  //  });


  const addComment = async(text) => {
    let newPost = {
      'description': text,
      'title': title,
      'job_title': user.job_title,
      //parent id might be used for later iterations for nesting
      //'parentId': parentId,
      'company_name': "Google",
    };
    try {
      let serializedPost = await axios.post('forums', newPost);
      let post = JSON.parse(serializedPost.data);
      console.log(post);
      let fields = post[0].fields;
      let companyName = fields['company_name'];
      let createdAt = fields['date_created'];
      let description = fields['description'];
      let jobTitle = fields['job_title'];
      let title = fields['title'];
      let userId = String(fields['user']);
      let parentId = null;
      let id = post[0]['pk'];
      console.log(id);
      post =  {id, companyName, description, jobTitle, title, userId, parentId}
      setPostsList([post, ...postsList]);
      //need response object to include this data + timeCreated, photo and user 
      //(or first and last name)
    }
    catch(error) {
        console.error(error);
    }
  }


  const handleTitleEntry = (e) => {
    setTitle(e.target.value);
  }

  const handleTextEntry = (e) => {
    console.log('click clack');
    setText(e.target.value);
  }

  // function renderPosts() {
  //   postsList.map((post) => {
  //     return <Comment text={text} comment={post} handleTextEntry={handleTextEntry} />
  //   })
  // }

  return(

   <div className="comments">
      <h3 className="comments-title">Raytheon Forums</h3>
      <div className="comment-form-title">Write a comment</div>
      <input id="comment-title" value={title} onChange={handleTitleEntry} ></input>
      <CommentForm className="d-flex flex-column-reverse" submitLabel="Write" handleSubmit={addComment} text={text} setText={setText} onChange={handleTextEntry} />
      <div className="comments-container d-flex flex-column-reverse">
        { [...postsList].reverse().map((post) => {
          return <Comment isEditing={isEditing} setIsEditing={setIsEditing} 
          onChange={handleTextEntry} text={text} setText={setText} 
          post={post} setActivePost={setActivePost}
          activePost={activePost} 
          user={user} id={post.id} key={post.id} 
          editText={editText} setEditText={setEditText}
          />
          })
        }

        {/*  

        {rootComments.map((rootComment) => { 
          return <Comment key={rootComment.key} comment={rootComment} replies={getReplies(rootComment.id)} />
        } ) } 

        */}
      </div>
    </div>
  )
}

