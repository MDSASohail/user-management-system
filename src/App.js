import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './components/UserList';
import UserDetail from './components/UserDetail';
import Header from './components/Header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import UsersProvider from './contexts/UsersContext';

const App = () => {
  return (
    <UsersProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetail />} />
          </Routes>
        </div>
        <ToastContainer />
      </Router>
    </UsersProvider>
  );
};

export default App;
