// import logo from './logo.svg';
import {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home';
import Message from './pages/Message';
import Messenger from './pages/Messenger';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ErrorPage from './pages/ErrorPage';
import useLocalStorage from './hooks/useLocalStorage';
import {ContactsProvider} from './contexts/ContactsProvider';
import {ConversationsProvider} from './contexts/ConversationsProvider'
import {SocketProvider} from './contexts/SocketProvider'

function App() {
  // const [userId, setUserId] = useLocalStorage('userId');
  const [userId, setUserId] = useState();
  const [user, setUser] = useState({});
  //wrapping Messenger component inside a context provider 
  // const messenger = (
  //     <SocketProvider id={userId}>
  //       <ContactsProvider>
  //         <ConversationsProvider id={userId}>
  //           <Messenger id={userId} />
  //         </ConversationsProvider>
  //       </ContactsProvider>
  //     </SocketProvider>
  // )

  return (
    
    <>
    {userId}
    <Router>
        <Routes>
          <Route path="/" element={<Home user={user} userId={userId} />}/>
          <Route path="/message" element={<Message user={user} userId={userId}/>} />
          {/* <Route path="/messenger" element={messenger} /> */}
          <Route path="/signin" element={<SignIn onSignIn={setUserId} homeUser={user} setUser={setUser} />}/>
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/*" element={<ErrorPage />}/>
        </Routes>
    </Router>
    </>
  )
}

export default App;
