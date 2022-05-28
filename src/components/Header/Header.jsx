import s from './Header.module.css';
import { ReactComponent as LogoWeather } from '../../img/logo-weather.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={s.container}>
      <p className={s.logo}>
        <Link exact="true" to="/">
          <LogoWeather />
        </Link>
        Weather by Chackorbit
      </p>
      <a
        href="https://github.com/Chackorbit"
        target="_blank"
        rel="noopener noreferrer"
      >
        Github
      </a>
    </div>
  );
};

export default Header;
