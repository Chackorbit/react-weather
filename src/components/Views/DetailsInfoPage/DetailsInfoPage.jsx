import SevenDaysWeather from 'components/SevenDaysWeather/SevenDaysWeather';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router';
import { useGetWeatherMutation } from 'redux/fetch-weather';
import s from './DetailsInfoPage.module.css';

export default function DetailsInfoPage() {
  const currentCity = useSelector(state => state.country?.countries);
  const location = useLocation();
  const [detailsInfoWeather, setDetailsInfoWeather] = useState(null);

  const [currentWeather] = useGetWeatherMutation();

  // Сдесь работаю с урл строкой, получаем от туда id места
  // детальную информацию которого хотим получить
  // делаеться это для того чтобы пользователь мог поделиться
  // например ссылкой и там всё отображалось корректно
  const id = location.pathname.slice(1);

  const weatherCity = () => {
    return currentCity.filter(el => el.place_id === Number(id));
  };

  const city = weatherCity()[0];

  useEffect(() => {
    currentWeather(city).then(({ data }) => setDetailsInfoWeather(data));
  }, [city, currentWeather]);

  return (
    detailsInfoWeather && (
      <div className={s.container}>
        <h1>{city.display_name.split(',')[0]}</h1>
        <ul className={s.infoList}>
          <li>{Date(detailsInfoWeather.current.dt * 1000).split('GMT')[0]}</li>

          <li className={s.currentTemp}>
            <img
              src={`http://openweathermap.org/img/wn/${detailsInfoWeather.current.weather[0].icon}@2x.png`}
              alt=""
            />
            <span className={s.span}>
              {Math.round(detailsInfoWeather.current.temp)}C
            </span>
          </li>
          <li>
            Feels like {Math.round(detailsInfoWeather.current.feels_like)}C
          </li>
        </ul>

        <h2>7 day weather</h2>
        <SevenDaysWeather detailsInfoWeather={detailsInfoWeather} />
      </div>
    )
  );
}
