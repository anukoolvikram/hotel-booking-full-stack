import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "./../api-client";
import { AiFillStar } from "react-icons/ai";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery(
    "fetchHotelById",
    () => apiClient.fetchHotelById(hotelId || ""),
    {
      enabled: !!hotelId,
    }
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col lg:flex-row lg:items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 lg:mb-0">
          {hotel.name}
        </h1>
        <div className="flex ml-0 lg:ml-4">
          {Array.from({ length: hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="fill-yellow-400 text-2xl" />
          ))}
          {Array.from({ length: 5 - hotel.starRating }).map((_, index) => (
            <AiFillStar key={index} className="fill-gray-300 text-2xl" />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {hotel.imageUrls.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img
              src={image}
              alt={hotel.name}
              className="w-full h-64 object-cover transform hover:scale-105 transition-transform duration-300"
            />
          </div>
        ))}
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">Facilities</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {hotel.facilities.map((facility, index) => (
            <div
              key={index}
              className="border border-gray-300 rounded-lg p-2 text-center bg-gray-100 text-gray-600 font-medium"
            >
              {facility}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold text-gray-700 mb-3">
          More about the hotel
        </h2>
        <p className="whitespace-pre-line mb-6 p-4 bg-gray-50 border border-gray-300 rounded-lg text-gray-700">
          {hotel.description}
        </p>
        <div className=" p-6">
          <GuestInfoForm
            pricePerNight={hotel.pricePerNight}
            hotelId={hotel._id}
          />
        </div>
      </div>
    </div>
  );
};

export default Detail;
