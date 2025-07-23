import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { motion } from "framer-motion";
import moment from "moment";

import axios from "axios";

export default function WeatherCard() {
  const [inputValue, setInputValue] = useState("");
  const [searchCity, setSearchCity] = useState<string>("cairo"); // The actual value to search for

  type Coordinates = {
    lat: number;
    lon: number;
  };
  const [searchValue, setSearchValue] = useState<Coordinates>({
    lat: 31.037933,
    lon: 31.381523,
  });
  const apiKey = "047dd440fb514b6d45d6ee5b0bb9a457";
  // const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     const value = e.currentTarget.value;
  //     setInputValue(value);
  //     console.log("Searched for:", value);
  //   }
  // };

  type WeatherData = {
    temp: number | null;
    minTemp: number | null;
    maxTemp: number | null;
    description: string | null;
    icon: string | null;
    name: string | null;
  };

  const [weatherData, setWeatherData] = useState<WeatherData>({
    temp: null,
    minTemp: null,
    maxTemp: null,
    description: null,
    icon: null,
    name: null,
  });
  const currentDate = moment().format("MMMM Do YYYY");

  useEffect(() => {
    if (!searchCity) return; // Do nothing if there is no value

    axios
      .get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${searchCity}&limit=1&appid=${apiKey}`
      )
      .then((response) => {
        if (response.data.length > 0) {
          const lat = response.data[0].lat;
          const lon = response.data[0].lon;
          setSearchValue({ lat, lon });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchCity]);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${searchValue.lat}&lon=${searchValue.lon}&appid=${apiKey}&units=metric&lang=eng`
      )
      .then(function (response) {
        // handle success
        const curruntTemp: number = Math.round(response.data.main.temp);
        const curruntMin: number = Math.round(response.data.main.temp_min);
        const curruntMax: number = Math.round(response.data.main.temp_max);
        const curruntDescription: string = response.data.weather[0].main;
        const curruntIcon: string = response.data.weather[0].icon;
        const curruntName: string = response.data.name;
        setWeatherData({
          temp: curruntTemp,
          minTemp: curruntMin,
          maxTemp: curruntMax,
          description: curruntDescription,
          icon: curruntIcon,
          name: curruntName,
        });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  }, [searchValue]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="sm">
        <Card
          sx={{
            width: {
              xs: "100%",
              sm: 225,
              md: 300,
              lg: 400,
              xl: 500,
            },
            maxWidth: { xs: 360, sm: 400, md: 500, lg: 600, xl: 700 },
            mx: "auto",
            height: {
              xs: 350,
              sm: 400,
              md: "37vh",
              lg: "37vh",
              xl: "37vh",
            },
            borderRadius: { xs: 2, sm: "0.75rem" },
            bgcolor: "#5EAFF6",
            p: { xs: 1, sm: 3 },
          }}
        >
          <CardContent className="flex flex-col gap-2 h-full">
            <TextField
              id="search-input"
              label="City Name"
              variant="standard"
              fullWidth
              sx={{
                mb: 2,
                input: { color: "#fff" },
                label: { color: "#fff" },
                "& .MuiInput-underline:before": { borderBottomColor: "#fff" },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#fff",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#fff",
                },
              }}
              color="success"
              value={inputValue} // Current input value
              onChange={(e) => setInputValue(e.target.value)} // Update temporary value
              onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "Enter") {
                  setSearchCity(inputValue); // Start search
                }
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search"
                      onClick={() => setSearchCity(inputValue)} // Start search by button
                    >
                      <SearchIcon sx={{ color: "white" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            {/* Header Row */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between text-white gap-1">
              <motion.div
                key={weatherData.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Typography
                  variant="h4"
                  className="text-[1.5rem] sm:text-[2rem] md:text-[2.5rem]"
                >
                  {weatherData.name !== null ? weatherData.name : "Loading..."}
                </Typography>
              </motion.div>
              <Typography
                variant="body1"
                className="text-sm sm:text-base md:text-lg"
              >
                {currentDate}
              </Typography>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-2 gap-4 items-center">
              {/* Temperature Info */}
              <motion.div
                key={weatherData.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-white flex flex-col gap-2"
              >
                <Typography
                  variant="h3"
                  className="text-[1.8rem] sm:text-[2.2rem] md:text-[2.5rem]"
                >
                  {weatherData.temp !== null
                    ? `${weatherData.temp}°C`
                    : "Loading..."}
                </Typography>
                <Typography
                  variant="h5"
                  className="text-base sm:text-lg md:text-xl"
                >
                  {weatherData.description !== null
                    ? weatherData.description
                    : "Loading..."}
                </Typography>
                <Typography
                  variant="body2"
                  className="text-xs sm:text-sm md:text-base"
                >
                  Max:{" "}
                  {weatherData.maxTemp !== null
                    ? `${weatherData.maxTemp}°C`
                    : "Loading..."}{" "}
                  | Min:
                  {weatherData.minTemp !== null
                    ? `${weatherData.minTemp}°C`
                    : "Loading..."}
                </Typography>
              </motion.div>

              {/* Icon */}
              <div className="flex justify-center items-center">
                <div>
                  {weatherData.icon ? (
                    <img
                      src={`http://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                      alt={weatherData.description || "Weather Icon"}
                      className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px] lg:w-[120px] lg:h-[120px] xl:w-[140px] xl:h-[140px]"
                    />
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
