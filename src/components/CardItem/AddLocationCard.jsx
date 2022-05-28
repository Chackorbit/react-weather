import { NavLink } from 'react-router-dom';
import { ReactComponent as Vector } from '../../img/Vector.svg';
import s from './CardItem.module.css';

export default function AddLocation() {
  return (
    <div className={s.container}>
      <NavLink to="/add" exact="true" className={s.link}>
        <Vector />
      </NavLink>
    </div>
  );
}
