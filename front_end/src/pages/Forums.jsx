import React, { useState, useEffect } from 'react';
import Comment from '../components/Comment';
import CommentForm from '../components/CommentForm';
import axios from 'axios';
import '../Forums.css';
import NavBar from '../components/NavBar';
import {HiHome, HiOutlineUserGroup, HiOutlineViewGrid, HiChevronDown} from 'react-icons/hi';

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

function LeftNavSidebar() {
  return (
    <nav class="HolyGrail-nav my-5 mx-4">
      <div class="sticky top-[var(--c-top-bar-height)] max-h-[calc(100vh-var(--c-top-bar-height)-var(--frame-top-offset))] scrollbar-hide overscroll-contain w-[var(--frame-navigation-width)] shrink-0 mr-4 pr-1 hidden lg:block">
        <div class="flex flex-col space-y-8 isolate w-full block-main-menu">
          <div class="space-y-1" role="group">
            <a class="cursor-pointer transition duration-100 ease-in-out group flex items-center leading-5 rounded-md w-full bg-main-200 text-basicMain-900 px-3 py-2">
              <HiHome />
              <span className="flex-grow truncate">
                Home
              </span>
                  <HiChevronDown /> 
            </a>
            <a class="cursor-pointer transition duration-100 ease-in-out group flex items-center leading-5 rounded-md w-full bg-main-200 text-basicMain-900 px-3 py-2">
              <HiOutlineUserGroup />
              <span className="flex-grow truncate">
                Members
              </span>
            </a>
            <a class="cursor-pointer transition duration-100 ease-in-out group flex items-center leading-5 rounded-md w-full bg-main-200 text-basicMain-900 px-3 py-2">
              <HiOutlineViewGrid />
              <span className="flex-grow truncate">
                Spaces
              </span>

            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}

function ProfileSidebar({user}) {
  return (
    <ul class="flex flex-col">
      <li>
        <div class="ml-auto my-5 mx-4 bg-white text-basicSurface-500 shadow flex flex-col justify-between sm:rounded-lg overflow-hidden block-welcome-member"><div class="h-20 w-full object-cover lg:h-28 group relative overflow-hidden">
            <div class="h-32 w-full lg:h-48 bg-main-200">
              <img src="/images/banners/banner-2.jpg"/>
            </div>
        </div>
        <div class="-mt-16 flex justify-center"><div><div class="hover:bg-surface-200 rounded-full relative">
              <span class="inline-flex relative items-center justify-center flex-shrink-0 bg-surface-200 rounded-full h-24 w-24 ring-2 bg-surface-50 ring-surface-50">
                <span class="text-2xl font-medium leading-none text-basicSurface-500">
                  G
                </span>
              </span>
          <input type="file" class="hidden" />
          <div class="flex items-center justify-center rounded-full text-white bg-black bg-opacity-50 opacity-0 hover:opacity-90 absolute top-0 bottom-0 left-0 right-0 cursor-pointer">
            Change
          </div>
        </div>
            </div></div><div class="flex-1 px-4 py-5 sm:p-6 overflow-hidden text-center"><div class="text-sm mb-5 text-basicSurface-400">Good afternoon,</div><div class="text-xl mb-1 text-basicSurface-900 font-medium truncate"><a href="#">{user && `${user.first_name} ${user.last_name}`}</a></div><div class="text-base mb-5 text-basicSurface-400 truncate"><a class="cursor-pointer transition duration-100 ease-in-out text-actionAccent-600 hover:text-actionAccentHover-500">Add tagline</a></div>

                <a class="items-center relative focus:outline-none focus-visible:ring text-basicSurface-500 bg-surface-50 hover:bg-surface-100 font-medium shadow-sm px-4 py-2 text-base rounded-md border border-basicSurface-300/25 w-full flex justify-center mt-8" href="/#/profile">
                  <span class="flex"><span class="inline-flex items-center">View profile</span></span>
                </a>
          </div>
        </div>

      </li>
    </ul>
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
        setPostsList(response).reverse();
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
    let date = new Date();
    let newPost = {
      'description': text,
      'title': title,
      'job_title': user.job_title,
      //parent id might be used for later iterations for nesting
      //'parentId': parentId,
      'company_name': "Google",
      'date_created': date
    };
    try {
      let serializedPost = await axios.post('forums', newPost);
      let post = JSON.parse(serializedPost.data);
      let fields = post[0].fields;
      let company_name = fields['company_name'];
      let date_created = fields['date_created'];
      let description = fields['description'];
      let job_title = fields['job_title'];
      let title = fields['title'];
      let userId = String(fields['user']);
      let parentId = null;
      let id = post[0]['pk'];
      console.log(id);
      post =  {id, company_name, description, date_created, job_title, title, userId, parentId}
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
       return <Comment className="shadow-sm" 
         isEditing={isEditing} setIsEditing={setIsEditing} 
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
      <div class="HolyGrail-body bg-light">
        <main class="HolyGrail-content my-5">
         <div className="comments">
            <CommentForm className="d-flex flex-column-reverse" submitLabel="Write" 
              title={title} setTitle={setTitle} handleTitleEntry={handleTitleEntry} 
              handleSubmit={addComment} text={text} setText={setText} onChange={handleTextEntry} />
            <div className="comments-container d-flex flex-column-reverse">
              { renderPosts() }
            </div>
          </div>
        </main>
        <LeftNavSidebar />
        <ProfileSidebar user={user} />
      </div>
    </body>
  </div>

  )
}

