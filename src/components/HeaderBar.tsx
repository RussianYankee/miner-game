import settingsIcon from '../assets/settings.png';

const HeaderBar = () => {
  return (
    <div className="page__header">
        <h1 className="title">Minesweeper</h1>
        <img src={settingsIcon} alt="" className="header__settings-btn" />
    </div>
  )
}

export default HeaderBar