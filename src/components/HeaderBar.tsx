import settingsIcon from '../assets/settings.png';
import backIcon from '../assets/arrow-ios-back-svgrepo-com.svg';
import { Link, useLocation } from 'react-router-dom';

const HeaderBar = () => {
  const location = useLocation();
  return (
    <div className="page__header">
        { location.pathname !== '/' &&
          <Link to="/" className='header__router-link'>
            <div className="header__back-btn">
              <img src={backIcon} alt="" />
              <span>Back</span>
            </div>
          </Link>
        }
        <h1 className="title">Minesweeper</h1>
        <Link to="/settings" className='header__router-link'>
          <img src={settingsIcon} alt="" className="header__settings-btn" />
        </Link>
      
    </div>
  )
}

export default HeaderBar