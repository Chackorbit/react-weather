import propTypes from 'prop-types';
import s from './SevenDaysWeather.module.css';

export default function SevenDaysWeather({ detailsInfoWeather }) {
  return (
    <div className={s.containerList}>
      {detailsInfoWeather.daily.slice(1).map(day => {
        // здесь задаю параметры для отображения даты
        let date = new Date(day.dt * 1000);
        let options = {
          weekday: 'long',
          day: 'numeric',
          month: 'numeric',
          year: 'numeric',
        };
        return (
          <ul key={date} className={s.dailyList}>
            <img
              src={`http://openweathermap.org/img/wn/${day?.weather[0].icon}@2x.png`}
              alt=""
            />
            <li>{date.toLocaleDateString('en-GB', options)}</li>
            <li>
              {day.weather[0].main}, {day.weather[0].description}
            </li>
            <li>max t: {day.temp.max}C</li>
            <li>min t: {day.temp.min}C</li>
          </ul>
        );
      })}
    </div>
  );
}

SevenDaysWeather.propTypes = {
  detailsInfoWeather: propTypes.object,
};
