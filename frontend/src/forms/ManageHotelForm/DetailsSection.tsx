import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800">Add Hotel</h1>

      <label className="text-gray-700 text-base font-semibold flex flex-col gap-1">
        HOTEL NAME
        <input
          type="text"
          className="border rounded w-full py-2 px-3 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-xs mt-1">{errors.name.message}</span>
        )}
      </label>
      <div className="flex gap-6">
      <label className="text-gray-700 text-base font-semibold flex flex-col gap-1 flex-1">
        CITY
        <input
          type="text"
          className="border rounded w-full py-2 px-3 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          {...register("city", { required: "This field is required" })}
        />
        {errors.city && (
          <span className="text-red-500 text-xs mt-1">{errors.city.message}</span>
        )}
      </label>

      <label className="text-gray-700 text-base font-semibold flex flex-col gap-1 flex-1">
        STAR RATING
        <select
          {...register("starRating", { required: "This field is required" })}
          className="border rounded w-full py-2 px-3 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
        >
          <option value="" disabled>
            Select a Rating
          </option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num} Star{num > 1 && "s"}
            </option>
          ))}
        </select>
        {errors.starRating && (
          <span className="text-red-500 text-xs mt-1">{errors.starRating.message}</span>
        )}
      </label>
    </div>


      <div className="flex flex-col sm:flex-row gap-6">
        <label className="text-gray-700 text-base font-semibold flex flex-col gap-1 flex-1">
          AVAILABLE ROOMS
          <input
            type="number"
            min={1}
            className="border rounded w-full py-2 px-3 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            {...register("rooms_available", { required: "This field is required" })}
          />
          {errors.rooms_available && (
            <span className="text-red-500 text-xs mt-1">{errors.rooms_available.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-base font-semibold flex flex-col gap-1 flex-1">
          PRICE
          <input
            type="number"
            min={1}
            className="border rounded w-full py-2 px-3 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            {...register("pricePerNight", { required: "This field is required" })}
          />
          {errors.pricePerNight && (
            <span className="text-red-500 text-xs mt-1">{errors.pricePerNight.message}</span>
          )}
        </label>
      </div>

      <label className="text-gray-700 text-base font-semibold flex flex-col gap-1">
        DESCRIPTION
        <textarea
          rows={4}
          className="border rounded w-full py-2 px-3 font-normal focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-xs mt-1">{errors.description.message}</span>
        )}
      </label>

    </div>
  );
};

export default DetailsSection;
