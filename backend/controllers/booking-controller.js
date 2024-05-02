import mongoose from "mongoose";
import Bookings from "../models/Bookings";
import Car from "../models/Car";
import User from "../models/User";

export const newBooking = async (req, res, next) => {
  const { car, date,user } = req.body;

  let existingCar;
  let existingUser;
  try {
    existingCar = await Car.findById(car);
    existingUser = await User.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingCar) {
    return res.status(404).json({ message: "Car Not Found With Given ID" });
  }
  if (!user) {
    return res.status(404).json({ message: "User not found with given ID " });
  }
  let booking;

  try {
    booking = new Bookings({
      car,
      date: new Date(`${date}`),
      user,
    });
    const session = await mongoose.startSession();
    session.startTransaction();
    existingUser.bookings.push(booking);
    existingCar.bookings.push(booking);
    await existingUser.save({ session });
    await existingCar.save({ session });
    await booking.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }

  if (!booking) {
    return res.status(500).json({ message: "Unable to create a booking" });
  }

  return res.status(201).json({ booking });
};

export const getBookingById = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unexpected Error" });
  }
  return res.status(200).json({ booking });
};

export const deleteBooking = async (req, res, next) => {
  const id = req.params.id;
  let booking;
  try {
    booking = await Bookings.findByIdAndRemove(id).populate("user car");
    console.log(booking);
    const session = await mongoose.startSession();
    session.startTransaction();
    await booking.user.bookings.pull(booking);
    await booking.car.bookings.pull(booking);
    await booking.car.save({ session });
    await booking.user.save({ session });
    session.commitTransaction();
  } catch (err) {
    return console.log(err);
  }
  if (!booking) {
    return res.status(500).json({ message: "Unable to Delete" });
  }
  return res.status(200).json({ message: "Successfully Deleted" });
};
