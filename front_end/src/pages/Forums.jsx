import React, { useState, useEffect } from 'react';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import axios from 'axios';
import '../Forums.css';
import NavBar from '../components/NavBar';

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

function leftNavSidebar() {

}

function ProfileSidebar({user}) {
  return (
    <div class="hidden web:col-span-12 lg:block lg:order-2 web:lg:col-span-4">
      <ul class="aside_ul flex flex-col -my-2.5">
        <div class="bg-surface-50 text-basicSurface-500 shadow flex flex-col justify-between sm:rounded-lg overflow-hidden block-welcome-member">
          
        </div>
        <div class="aside_div flex-1 px-4 py-5 sm:p-6 overflow-hidden text-center">
          <div class="text-sm mb-5 text-basicSurface-400" style={{fontSize: '20pt'}}>Good morning,</div>
          <div class="text-xl mb-1 text-basicSurface-900 font-medium truncate" style={{fontSize: '20pt'}}><a href="/member/DcCEolocve">{user && user.first_name}</a></div>
        </div>
      </ul>
    </div>
  )
}

export default function Forums({user}) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [editText, setEditText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activePost, setActivePost] = useState(null);
  const [postsList, setPostsList] = useState([]);
  const [lgShow, setLgShow] = useState(false); 
  const [loading, setLoading] = useState(true);

  const toggleCommentModal = () => {
    setLgShow(!lgShow);
  };

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
    renderPosts();
  }, [postsList] );

  useEffect(() => {
    const fetchData = async () =>{
      setLoading(true);
      try {
        const {data: response} = await axios.get('posts');
        setPostsList(response);
      } catch (error) {
        console.error(error.message);
      }
      setLoading(false);
    }

    fetchData();
  }, []);


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

  function renderPosts() {
     return  [...postsList].reverse().map((post) => {
        return <Comment isEditing={isEditing} setIsEditing={setIsEditing} 
        isDeleting={isDeleting} setIsDeleting={setIsDeleting}
        onChange={handleTextEntry} text={text} setText={setText} 
        post={post} setActivePost={setActivePost}
        postsList={postsList} setPostsList={setPostsList}
        activePost={activePost} 
        user={user} id={post.id} key={post.id} 
        editText={editText} setEditText={setEditText}
        />
        })
      
   }

  return( 
  <div class="overall-container min-h-screen flex flex-col layout layout-default ml-[calc(env(safe-area-inset-left))] mr-[calc(env(safe-area-inset-right))]">
    <body class="HolyGrail">
      <NavBar />
      <header>…</header>
      <div class="HolyGrail-body">
        <main class="HolyGrail-content">
         <div className="comments">
            <h3 className="comments-title">Careers Forum</h3>
            <div className="comment-form-title">Write a comment</div>
            <CommentForm className="comment-form-body d-flex flex-column-reverse" submitLabel="Write" 
              title={title} setTitle={setTitle} handleTitleEntry={handleTitleEntry} 
              handleSubmit={addComment} text={text} setText={setText} onChange={handleTextEntry} />
            <div className="comments-container d-flex flex-column-reverse">
              { renderPosts() }
            </div>
          </div>
        </main>
        <nav class="HolyGrail-nav">
          <div class="nav-text-box sticky top-[var(--c-top-bar-height)] max-h-[calc(100vh-var(--c-top-bar-height)-var(--frame-top-offset))] scrollbar-hide overscroll-contain w-[var(--frame-navigation-width)] shrink-0 mr-4 pr-1 hidden lg:block">
            <div class="flex flex-col space-y-8 isolate w-full block-main-menu">
              <div class="space-y-1" role="group">
                <a class="cursor-pointer transition duration-100 ease-in-out group flex items-center leading-5 rounded-md w-full bg-main-200 text-basicMain-900 px-3 py-2">
                  <span className="nav-text flex-grow truncate">
                    Home
                  </span>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <aside class="HolyGrail-ads">
          <ProfileSidebar user={user} />
        </aside>
      </div>
      <footer>…</footer>
    </body>
    <div style={{height: '1000px'}}></div>
  </div>

  )
}

