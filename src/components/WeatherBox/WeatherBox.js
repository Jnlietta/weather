import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useCallback, useState } from 'react';

const WeatherBox = props => {
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);

  const handleCityChange = useCallback(city => {
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
        alert('ERROR!')
      }
    });
  }, []);

  console.log(weatherData);

  return (
    <section>
      <PickCity action={handleCityChange}/>
      { (weatherData && pending===false) && <WeatherSummary {...weatherData} /> }
      <Loader />
    </section>
  )
};

export default WeatherBox;