import React, { useEffect, useState } from 'react';

import Title from '../../components/owner/Title';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageBookings = () => {
  const {currency, axios} = useAppContext()
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
  try {
    const { data } = await axios.get('/api/bookings/owner')
    data.success ? setBookings(data.bookings) : toast.error(data.message)
  } catch (error) {
    toast.error(error.message)
  }
}


const changeBookingStatus = async (bookingId, status) => {
  try {
    const { data } = await axios.post('/api/bookings/change-status', { bookingId, status })
    if (data.success) {
      toast.success(data.message)
      fetchOwnerBookings()
    } else {
      toast.error(data.message)
    }
  } catch (error) {
    toast.error(error.message)
  }
}



  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="w-full px-4 pt-10 md:px-10">
      <Title
        title="Manage Bookings"
        subTitle="Track all customer bookings, approve or cancel requests, and manage booking statuses."
      />

      <div className="w-full max-w-3xl mt-6 overflow-hidden border rounded-md border-borderColor">
        <table className="w-full text-sm text-left text-gray-600 border-collapse">
          <thead className="text-gray-500">
            <tr>
              <th className="p-3 font-medium">Car</th>
              <th className="p-3 font-medium max-md:hidden">Date Range</th>
              <th className="p-3 font-medium">Total</th>
              <th className="p-3 font-medium max-md:hidden">Payment</th>
              <th className="p-3 font-medium">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="text-gray-500 border-t border-borderColor"
              >
                {/* Car */}
                <td className="flex items-center gap-3 p-3">
                  <img
                    src={booking.car.image}
                    alt={`${booking.car.brand} ${booking.car.model}`}
                    className="object-cover w-12 h-12 rounded-md"
                  />

                  <p className="font-medium max-md:hidden">
                    {booking.car.brand} {booking.car.model}
                  </p>
                </td>

                {/* Date Range */}
                <td className="p-3 max-md:hidden">
                  {booking.pickupDate.split('T')[0]} to{' '}
                  {booking.returnDate.split('T')[0]}
                </td>

                {/* Total Price */}
                <td className="p-3">
                  {currency} {booking.price}
                </td>

                {/* Payment */}
                <td className="p-3 max-md:hidden">
                  <span className="px-3 py-1 text-xs bg-gray-100 rounded-full">
                    Offline
                  </span>
                </td>

                {/* Status / Actions */}
                <td className="p-3">
                  {booking.status === 'pending' ? (
                    <select onChange={e=> changeBookingStatus(booking._id , e.target.value)}
                      value={booking.status}
                      className="px-2 py-1.5 mt-1 text-gray-500 border rounded-md outline-none border-borderColor"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span
                      className={`px-3 py-1 text-xs font-semibold rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-500'
                          : 'bg-red-100 text-red-500'
                      }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBookings;