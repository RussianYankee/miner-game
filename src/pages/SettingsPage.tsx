import GameControls, { GameConfig } from "../components/GameControls"

interface SettingsPageProps {
  gameConfig: GameConfig;
  handleConfigSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}
const SettingsPage = ({gameConfig, handleConfigSubmit}:SettingsPageProps) => {
  return (
    <GameControls gameConfig={gameConfig} handleFormSubmit={handleConfigSubmit} />
  )
}

export default SettingsPage