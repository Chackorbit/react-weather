import AddLocation from 'components/CardItem/AddLocationCard';
import CardItem from 'components/CardItem/CardItem';
import { useSelector } from 'react-redux';

const CardList = () => {
  // Получаем список всех городов
  const countriesList = useSelector(state => state?.country?.countries);

  return (
    <>
      {countriesList?.map(city => (
        <CardItem id={city.place_id} key={city.place_id} city={city} />
      ))}

      <AddLocation />
    </>
  );
};

export default CardList;
