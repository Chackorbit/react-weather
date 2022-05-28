import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {
  Button,
  CardActionArea,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useGetWeatherMutation } from 'redux/fetch-weather';
import { useEffect, useState } from 'react';
import { removeCountry } from 'redux/country-slice';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { TiDeleteOutline } from 'react-icons/ti';

export default function CardItem({ id, city }) {
  const dispatch = useDispatch();
  const [currentCitiesWeather, setCurrentCitiesWeather] = useState(null);

  const [currentWeather] = useGetWeatherMutation(); // с помощью хука получаем функцию для запроса данных о погоде

  // Создали юз ефекет для работы с жизненым циклом компонента
  // При загрузке странице если в нашем списке есть добавленые города
  //делаем запрос для получения данных о текущей погоде

  useEffect(() => {
    currentWeather(city).then(({ data }) => setCurrentCitiesWeather(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    currentCitiesWeather !== null && (
      <Card
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          width: 345,
          height: 400,
          opacity: '0.7',
          color: 'black',
          backdropFilter: 'blur(32px)',
          borderRadius: '48px',
        }}
      >
        <Button
          onClick={() => dispatch(removeCountry(id))}
          sx={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            borderRadius: '50%',
          }}
        >
          <TiDeleteOutline size={30} />
        </Button>
        <Button
          onClick={() =>
            currentWeather(city).then(({ data }) =>
              setCurrentCitiesWeather(data)
            )
          }
          sx={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            borderRadius: '50%',
          }}
        >
          Update
        </Button>
        <Link exact="true" to={`/${id}`}>
          <CardActionArea id={id}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {city.display_name.split(',')[0]}
              </Typography>

              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                variant="h3"
              >
                <CardMedia
                  sx={{
                    display: 'inline-block',
                    width: 50,
                    alignItems: 'center',
                  }}
                  component="img"
                  image={`http://openweathermap.org/img/wn/${currentCitiesWeather?.current?.weather[0].icon}@2x.png`}
                  alt="weather"
                />
                {currentCitiesWeather?.current &&
                  Math.round(currentCitiesWeather?.current?.temp)}{' '}
                C
              </Typography>

              <Typography variant="h5" align="center">
                {currentCitiesWeather?.current?.weather[0].main},{' '}
                {currentCitiesWeather?.current?.weather[0].description}
              </Typography>

              <List>
                <ListItem>
                  <ListItemText
                    primary={`Feels like: ${Math.round(
                      currentCitiesWeather?.current?.feels_like
                    )} C`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary={`Humidity: ${currentCitiesWeather?.current?.humidity}%`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={`Wind speed: ${currentCitiesWeather?.current?.wind_speed} m/sec`}
                  />
                </ListItem>
              </List>
            </CardContent>
          </CardActionArea>
        </Link>
      </Card>
    )
  );
}
