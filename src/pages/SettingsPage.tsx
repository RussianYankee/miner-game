import GameControls, { GameConfig } from "../components/GameControls"

interface SettingsPageProps {
  gameConfig: GameConfig;
  setGameConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
}
const SettingsPage = ({gameConfig, setGameConfig}:SettingsPageProps) => {

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
    <GameControls gameConfig={gameConfig} handleFormSubmit={handleConfigSubmit} />
  )
}

export default SettingsPage