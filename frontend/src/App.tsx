import GroupItemWrapper from './pages/Dashboard/components/GroupItemWrapper/GroupItemWrapper';
import LobbyItemWrapper from './pages/Dashboard/components/LobbyItemWrapper/LobbyItemWrapper';
import Dashboard from './pages/Dashboard/Dashboard';
import LoginRegisterPage from './pages/LoginRegister/LoginRegisterPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LoginRegisterPage />} />
          <Route path='/dashboard' element={<Dashboard />}>
            <Route path='group/:groupId' element={<GroupItemWrapper />} />
            <Route path='group/:groupId/lobby/:lobbyId' element={<LobbyItemWrapper />} />
          </Route>
        </Routes>
      </Router >
    </>
  );
}

export default App;
