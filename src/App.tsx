import GamePage from './pages/GamePage';
import './css/app.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import SettingsPage from './pages/SettingsPage';
import { GameConfig } from './components/GameControls';
import HeaderBar from './components/HeaderBar';

function App() {

  const [gameConfig, setGameConfig] = useState<GameConfig>({
    width: 8,
    height: 8,
    mines: 10
  });

  return (
    <div className="minesweeper">      
      <HeaderBar />
      <Router>
        <Routes>
          <Route path="/" 
                 element={<GamePage gameConfig={gameConfig} setGameConfig={setGameConfig}/>} />
          <Route path="/settings"
                 element={<SettingsPage gameConfig={gameConfig} setGameConfig={setGameConfig}/>} />    
        </Routes>
      </Router>      
    </div>
  )
}

export default App
