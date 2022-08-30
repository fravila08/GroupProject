import { useEffect, useState } from 'react'
import axios from 'axios';
import '../src/App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard';
import TestPage from './pages/TestPage'
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Forums from './pages/Forums';
import SearchResult from './pages/searchResult'
import ProfilePage from './pages/ProfilePage'

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}
const csrftoken = getCookie('csrftoken');
axios.defaults.headers.common['X-CSRFToken'] = csrftoken

function App() {
  const [user, setUser] = useState(null)
  const [proceed, setProceed] = useState(false)
  const [showForm, setShowForm] = useState(false)

  function signOut(event) {
    event.preventDefault()
    axios.post('/sign_out').then((respone) => {
      window.location.href = ""
    })
  }


  async function curr_user() {
    const response = await axios.get('profile_page')
    console.log(response.data, "hello")
    setUser(response.data)
  }

  const checkLoginRedirect = () => {
    axios.get('userAuthenticated')
      .then((res) => {
        if (res.data.message === 'no') {
          window.location.href = '#/signin'
        }
        else {
          setProceed(true)
        }
      })
  }

  const checkHomeRedirect = () => {
    axios.get('userAuthenticated')
      .then((res) => {
        if (res.data.message === 'yes') {
          window.location.href = '/'
        }
        else {
          setShowForm(true)
        }
      })
  }

  useEffect(() => {
    curr_user()
  }, [])


  console.log('hi');
  // let user_ = (() => {
  //   curr_user()
  // }, [])

  return (
    <div>
      <HashRouter>
        <Routes>
          <Route path='/'
            element={<Home
              user={user}
              proceed={proceed}
              checkLoginRedirect={checkLoginRedirect}
            />
            }
          />
          <Route path='/signup'
            element={<SignUp
              showForm={showForm}
              checkHomeRedirect={checkHomeRedirect}
            />
            }
          />
          <Route path='/signin'
            element={<SignIn
              showForm={showForm}
              checkHomeRedirect={checkHomeRedirect}
            />
            }
          />
          <Route path='/searchResult/:jobName'
            element={<SearchResult />}
          />
          <Route path='/dashboard'
            element={<Dashboard user={user} />} />
          <Route path='/forums'
            element={<Forums user={user} />} />
          <Route path='*' element={<NotFound />} />
          <Route path='/test' element={<TestPage />} />
          <Route path='/profile' element={<ProfilePage user={user} />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
