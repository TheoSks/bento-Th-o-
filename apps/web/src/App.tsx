import { Routes, Route } from 'react-router-dom';
import { Layout } from '@components/layout/Layout';
import Landing from '@pages/Landing';
import Login from '@pages/Login';
import Register from '@pages/Register';
import Dashboard from '@pages/Dashboard';
import Room from '@pages/Room';
import Game from '@pages/Game';
import Profile from '@pages/Profile';
import Leaderboard from '@pages/Leaderboard';
import GuestLobby from '@pages/GuestLobby';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/play" element={<GuestLobby />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/room/:code" element={<Room />} />
        <Route path="/game/:code" element={<Game />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>
    </Routes>
  );
}

export default App;
