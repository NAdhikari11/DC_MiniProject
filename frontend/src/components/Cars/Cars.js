import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllCars } from "../../api-helpers/api-helpers";
import CarItem from "./CarItem";

const Cars = () => {
  const [cars, setCars] = useState();
  useEffect(() => {
    getAllCars()
      .then((data) => setCars(data.cars))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box margin={"auto"} marginTop={4}>
      <Typography
        margin={"auto"}
        variant="h4"
        padding={2}
        width="40%"
        bgcolor={"#900C3F"}
        color="white"
        textAlign={"center"}
      >
        All Cars
      </Typography>
      <Box
        width={"100%"}
        margin="auto"
        marginTop={5}
        display={"flex"}
        justifyContent="flex-start"
        flexWrap={"wrap"}
      >
        {cars &&
          cars.map((car, index) => (
            <CarItem
              key={index}
              id={car._id}
              posterUrl={car.posterUrl}
              price={car.price}
              brand={car.brand}
            />
          ))}
      </Box>
    </Box>
  );
};

export default Cars;
