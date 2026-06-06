import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("/api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyBookings();
    }
  }, [user]);

  const getStatusStyles = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-700";
      case "cancelled":
        return "bg-red-100 text-red-700";
      case "completed":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-yellow-100 text-yellow-700";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl"
    >
      <Title
        title="My Bookings"
        subTitle="View and manage all your car bookings"
        align="left"
      />

      <div>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <motion.div
              key={booking._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-lg mt-5 first:mt-12"
            >
              {/* Car Image */}
              <div className="md:col-span-1 flex items-center justify-center">
                <img
                  src={booking.car?.image || assets.car_placeholder}
                  alt={booking.car?.name || "Car"}
                  className="w-full h-40 object-cover rounded-lg"
                />
              </div>

              {/* Booking Details */}
              <div className="md:col-span-2 flex flex-col justify-center gap-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {booking.car?.brand} {booking.car?.name}
                </h2>

                <p className="text-gray-500">
                  <span className="font-medium text-gray-700">Pickup:</span>{" "}
                  {new Date(booking.pickupDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-gray-500">
                  <span className="font-medium text-gray-700">Return:</span>{" "}
                  {new Date(booking.returnDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>

                <p className="text-gray-500">
                  <span className="font-medium text-gray-700">Location:</span>{" "}
                  {booking.pickupLocation || "N/A"}
                </p>

                <p className="text-gray-500">
                  <span className="font-medium text-gray-700">Booking ID:</span>{" "}
                  <span className="text-xs text-gray-400">{booking._id}</span>
                </p>
              </div>

              {/* Price & Status */}
              <div className="md:col-span-1 flex flex-col justify-center items-start md:items-end gap-3">
                <p className="text-xl font-bold text-gray-800">
                  {currency}
                  {booking.totalPrice?.toLocaleString()}
                </p>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusStyles(
                    booking.status
                  )}`}
                >
                  {booking.status || "pending"}
                </span>

                <p className="text-xs text-gray-400">
                  Booked on:{" "}
                  {new Date(booking.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="mt-12 text-center text-gray-500">
            No bookings found.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MyBookings;