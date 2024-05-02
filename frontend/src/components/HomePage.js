import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCars} from "../api-helpers/api-helpers";
import CarItem from "./Cars/CarItem";

const HomePage = () => {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    getAllCars()
      .then((data) => setCars(data.cars))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box width={"100%"} height="100%" margin="auto" marginTop={2}>
      <Box margin={"auto"} width="80%" height='50%' padding={2}>
        <img
          src="https://c4.wallpaperflare.com/wallpaper/706/479/823/vehicles-lykan-hypersport-lykan-hypersport-wallpaper-preview.jpg"
          alt="Lykan-Hypersport"
          width={"100%"}
          height={"100%"}
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Available Cars
        </Typography>
      </Box>
      <Box
        margin={"auto"}
        display="flex"
        width="80%"
        justifyContent={"center"}
        alignItems="center"
        flexWrap="wrap"
      >
        {cars &&
          cars
            .slice(0, 4)
            .map((car, index) => (
              <CarItem
                id={car._id}
                brand={car.brand}
                posterUrl={car.posterUrl}
                price={car.price}
                key={index}
              />
            ))}
      </Box>
      <Box display="flex" padding={5} margin="auto">
        <Button
          LinkComponent={Link}
          to="/car"
          variant="outlined"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Cars
        </Button>
      </Box>
    </Box>
  );
};

export default HomePage;
