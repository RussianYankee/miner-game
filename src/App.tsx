import GamePage from './pages/GamePage';
import './css/app.css'
import settingsIcon from './assets/settings.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div className="minesweeper">
      <div className="page__header">
        <h1 className="title">Minesweeper</h1>
        <img src={settingsIcon} alt="" className="header__settings-btn" />
      </div>

      <Router>
        <Routes>
          <Route path="/" element={<GamePage />} />
        </Routes>
      </Router>      
    </div>
  )
}

export default App
