import GamePage from './pages/GamePage';
import './css/app.css'
import settingsIcon from './assets/settings.png';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import SettingsPage from './pages/SettingsPage';
import { GameConfig } from './components/GameControls';

function App() {

  const [gameConfig, setGameConfig] = useState<GameConfig>({
    width: 8,
    height: 8,
    mines: 10
  });

  const handleConfigSubmit = (e: React.FormEvent<HTMLFormElement>) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const width = Number(formData.get('width'));
          const height = Number(formData.get('height'));
          const mines = Number(formData.get('mines'));
      
          if (mines >= width * height) {
            alert('Too many mines for the given field size!');
            return;
          }
      
          setGameConfig({ width, height, mines });
        };

  return (
    <div className="minesweeper">
      <div className="page__header">
        <h1 className="title">Minesweeper</h1>
        <img src={settingsIcon} alt="" className="header__settings-btn" />
      </div>

      <Router>
        <Routes>
          <Route path="/" 
                 element={<GamePage gameConfig={gameConfig} setGameConfig={setGameConfig}/>} />
          <Route path="/settings"
                 element={<SettingsPage gameConfig={gameConfig} handleConfigSubmit={handleConfigSubmit}/>} />    
        </Routes>
      </Router>      
    </div>
  )
}

export default App
