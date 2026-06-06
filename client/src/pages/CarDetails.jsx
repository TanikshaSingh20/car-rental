import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

import { assets } from "../assets/assets";
import Loader from "../components/Loader";
import { useAppContext } from "../context/AppContext";

const CarDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    cars,
    axios,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  } = useAppContext();

  const [car, setCar] = useState(null);

  const currency = import.meta.env.VITE_CURRENCY;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupDate || !returnDate) {
      return toast.error("Please select pickup and return dates");
    }

    if (new Date(returnDate) <= new Date(pickupDate)) {
      return toast.error("Return date must be after pickup date");
    }

    try {
      const { data } = await axios.post("/api/bookings/create", {
        car: id,
        pickupDate,
        returnDate,
      });

      if (data.success) {
        toast.success(data.message);
        navigate("/my-bookings");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (cars.length > 0) {
      const selectedCar = cars.find((item) => item._id === id);
      setCar(selectedCar);
    }
  }, [cars, id]);

  if (!car) return <Loader />;

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 mb-6 text-gray-500 cursor-pointer"
      >
        <img
          src={assets.arrow_icon}
          alt="Back"
          className="rotate-180 opacity-65"
        />
        Back to all cars
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Left Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="lg:col-span-2"
        >
          <motion.img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            className="w-full rounded-xl shadow-md mb-6"
            initial={{ scale: 0.98, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div>
              <h1 className="text-3xl font-bold">
                {car.brand} {car.model}
              </h1>

              <p className="text-lg text-gray-500">
                {car.category} • {car.year}
              </p>
            </div>

            <hr className="border-borderColor" />

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {
                  icon: assets.users_icon,
                  text: `${car.seating_capacity} Seats`,
                },
                {
                  icon: assets.fuel_icon,
                  text: car.fuel_type,
                },
                {
                  icon: assets.car_icon,
                  text: car.transmission,
                },
                {
                  icon: assets.location_icon,
                  text: car.location,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="bg-light p-4 rounded-lg flex flex-col items-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <img
                    src={item.icon}
                    alt=""
                    className="h-5 mb-2"
                  />
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Description
              </h2>

              <p className="text-gray-500">
                {car.description}
              </p>
            </div>

            <div>
              <h2 className="text-xl font-medium mb-3">
                Features
              </h2>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  "360 Camera",
                  "Bluetooth",
                  "GPS",
                  "Heated Seats",
                  "Rear View Mirror",
                ].map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center text-gray-500"
                  >
                    <img
                      src={assets.check_icon}
                      alt=""
                      className="h-4 mr-2"
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.form
            onSubmit={handleSubmit}
            className="shadow-lg rounded-xl p-6 sticky top-20 h-max space-y-6 text-gray-500"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="flex items-center justify-between text-2xl font-semibold text-gray-800">
              {currency}
              {car.pricePerDay}
              <span className="text-base font-normal text-gray-400">
                / day
              </span>
            </p>

            <hr className="border-borderColor" />

            <div className="flex flex-col gap-2">
              <label htmlFor="pickup-date">
                Pickup Date
              </label>

              <input
                type="date"
                id="pickup-date"
                required
                value={pickupDate}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) =>
                  setPickupDate(e.target.value)
                }
                className="border border-borderColor px-3 py-2 rounded-lg"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="return-date">
                Return Date
              </label>

              <input
                type="date"
                id="return-date"
                required
                value={returnDate}
                min={
                  pickupDate ||
                  new Date().toISOString().split("T")[0]
                }
                onChange={(e) =>
                  setReturnDate(e.target.value)
                }
                className="border border-borderColor px-3 py-2 rounded-lg"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary hover:bg-primary-dull transition-all py-3 rounded-xl text-white font-medium cursor-pointer"
            >
              Book Now
            </button>

            <p className="text-center text-sm">
              No credit card required to reserve
            </p>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
};

export default CarDetails;