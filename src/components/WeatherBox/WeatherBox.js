import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback(city => {
    setError(false);
    setPending(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b90a673343f695c945721acd1ffcf17f&units=metric`) //dzieki units=metric dane beda w st celsjusza a nie kelvina
    .then(res => {
      if(res.status === 200) {
        return res.json()
        .then(data => {
          setPending(false);
          setWeatherData({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main
          });
        });
      } else {
        setError(true);
      }
    });
  }, []);

  console.log(weatherData);

  return (
    <section>
      <PickCity action={handleCityChange}/>
      { (weatherData && !pending) && <WeatherSummary {...weatherData} /> }
      { (pending && !error) && <Loader /> }
      { error && <ErrorBox /> }
    </section>
  )
};

export default WeatherBox;