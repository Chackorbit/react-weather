import CardList from 'components/CardList/CardList';
import s from '../App.module.css';

export default function HomePage() {
  return (
    <>
      <div className={s.list}>
        <CardList />
      </div>
    </>
  );
}
