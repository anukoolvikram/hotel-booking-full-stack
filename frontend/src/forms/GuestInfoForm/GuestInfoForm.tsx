import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useSearchContext } from "../../contexts/SearchContext";
import { useAppContext } from "../../contexts/AppContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import * as apiClient from "../../api-client";

type Props = {
  hotelId: string;
  pricePerNight: number;
};

type GuestInfoFormData = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  rooms_to_book:number;
};

const GuestInfoForm = ({ hotelId, pricePerNight }: Props) => {
  const search = useSearchContext();
  const { isLoggedIn } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  const {
    watch,
    register,
    handleSubmit,
    setValue,
  } = useForm<GuestInfoFormData>({
    defaultValues: {
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      rooms_to_book: 1,
    },
  });

  const checkIn = watch("checkIn");
  const checkOut = watch("checkOut");

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Reset time to ensure accurate date comparison

  const minCheckInDate = new Date(today);
  const minCheckOutDate = checkIn ? new Date(checkIn) : new Date(today);
  minCheckOutDate.setDate(minCheckOutDate.getDate() + 1); // Set checkout date to be at least one day after check-in or today

  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const onSignInClick = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.rooms_to_book
    );
    navigate("/sign-in", { state: { from: location } });
  };

  const onSubmit = (data: GuestInfoFormData) => {
    search.saveSearchValues(
      "",
      data.checkIn,
      data.checkOut,
      data.rooms_to_book
    );
    // navigate(`/hotel/${hotelId}/booking`);
    navigate(`/paynow`);
  };

  return (
    <div className="flex flex-col p-6 bg-blue-100 rounded-lg shadow-lg gap-6">
      <h3 className="text-lg font-bold text-blue-900">Price Per Day: ₹ {pricePerNight}</h3>
      <form
        onSubmit={isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(onSignInClick)}
        className="space-y-6"
      >
        <div className="flex flex-col sm:flex-row sm:space-x-4">
          <div className="flex-1">
            <label className="block text-blue-800 font-semibold mb-2">Check-in Date</label>
            <DatePicker
              required
              selected={checkIn}
              onChange={(date) => setValue("checkIn", date as Date)}
              selectsStart
              startDate={checkIn}
              endDate={checkOut}
              minDate={minCheckInDate} // Check-in date must be greater than today
              maxDate={maxDate}
              dateFormat="dd-MM-yy"
              placeholderText="Select your check-in date"
              className="w-full bg-white p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 mt-4 sm:mt-0">
            <label className="block text-blue-800 font-semibold mb-2">Check-out Date</label>
            <DatePicker
              required
              selected={checkOut}
              onChange={(date) => setValue("checkOut", date as Date)}
              selectsEnd
              startDate={checkIn}
              endDate={checkOut}
              minDate={minCheckOutDate} // Check-out date must be at least one day after today
              maxDate={maxDate}
              dateFormat="dd-MM-yy"
              placeholderText="Select your check-out date"
              className="w-full bg-white p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex-1 mt-4 sm:mt-0">
            <label className="block text-blue-800 font-semibold mb-2">Rooms to Book</label>
            <input
              type="number"
              min={1}
              max={hotel?.rooms_available}
              className="w-full bg-white p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 font-bold"
              {...register("rooms_to_book", {
                valueAsNumber: true,
              })}
            />
          </div>
        </div>
        <div>
          {isLoggedIn ? (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-xl hover:bg-blue-500 transition-colors"
            >
              Book Now
            </button>
          ) : (
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold text-xl hover:bg-blue-500 transition-colors"
            >
              Sign in to Book
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default GuestInfoForm;
