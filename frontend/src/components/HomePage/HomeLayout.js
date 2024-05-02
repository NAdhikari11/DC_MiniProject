import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllCars } from "../../helpers/api-helpers";
import CradLayout from "./CradLayout";

const HomeLayout = () => {
  const [cars, setCars] = useState();
  useEffect(() => {
    getAllCars()
      .then((data) => setCars(data))
      .catch((err) => console.log(err));
  }, []);
  console.log(cars);
  return (
    <Box width="100%" height="100vh" marginTop={2} margin="auto">
      <Box margin={"auto"} width="100%" height="100%" padding={2} display="flex">
        <img
          src="https://c4.wallpaperflare.com/wallpaper/706/479/823/vehicles-lykan-hypersport-lykan-hypersport-wallpaper-preview.jpg"
          alt="Lykan-Hypersport"
          width="100%"
          height="100%"
        />
      </Box>
      <Box padding={5} margin="auto">
        <Typography variant="h4" textAlign={"center"}>
          Latest Available Cars
        </Typography>
      </Box>
      <Box
        gap={5}
        margin="auto"
        width="80%"
        flexWrap={"wrap"}
        display="flex"
        justifyContent={"center"}
      >
        {cars &&
          cars
            .slice(0, 4)
            .map((car, index) => (
              <CradLayout
                id={car._id}
                brand={car.title}
                model={car.releaseDate}
                posterUrl={car.posterUrl}
                price={car.description}
                key={index}
              />
            ))}
      </Box>
      <Box display={"flex"} padding={5} margin="auto">
        <Button
          variant="outlined"
          LinkComponent={Link}
          to="/car"
          sx={{ margin: "auto", color: "#2b2d42" }}
        >
          View All Cars
        </Button>
      </Box>
    </Box>
  );
};

export default HomeLayout;
