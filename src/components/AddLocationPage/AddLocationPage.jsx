import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFindMutation } from 'redux/fetch-country';
import { useState } from 'react';
import { addCountry } from 'redux/country-slice';
import { useDispatch } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import s from './AddLocationPage.module.css';

export default function AddLocationPage() {
  const [city, setCity] = useState('');
  const dispatch = useDispatch();
  const [find] = useFindMutation();

  const countriesList = useSelector(state => state?.country?.countries);

  const onSearchWord = e => {
    const { name, value } = e.currentTarget;
    if (name === 'city') {
      setCity(value);
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    // Ищем место по названию
    const { data } = await find(city);

    //Создаём функцию для проверки добавленных мест в наш список
    const chekedCity = () => {
      return countriesList.filter(el => el.place_id === data[0].place_id);
    };

    // проверяем есть ли в списке место которое хотим добавить,
    // если да то возвращаем уведомление об этом
    if (chekedCity().length > 0) {
      return toast.error('You have already added this place!');
    }
    // если место найдено то записываем данные в глобальный стейт
    if (data.length > 0) {
      dispatch(addCountry(data[0]));
      toast.success('Place added!');
    }

    setCity('');
  };

  return (
    <>
      <ToastContainer />

      <form className={s.form} onSubmit={onSubmit}>
        <TextField
          sx={{ width: '100%', background: '#aaaaaa', marginBottom: '20px' }}
          id="filled-search"
          label="Search field"
          type="search"
          variant="filled"
          name="city"
          onChange={onSearchWord}
          value={city}
        />
        {
          <Button
            type="submit"
            variant="contained"
            disabled={city.length > 0 ? false : true}
          >
            Add City
          </Button>
        }
      </form>
    </>
  );
}
