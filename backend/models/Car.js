import mongoose from "mongoose";

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  price:{
    type: String,
    required: true,
  },
  posterUrl: {
    type: String,
    required: true,
  },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Booking" }],
  admin: {
    type: mongoose.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

export default mongoose.model("Car", carSchema);
