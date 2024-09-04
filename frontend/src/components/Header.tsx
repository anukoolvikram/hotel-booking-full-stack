import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { MdOutlineDateRange } from "react-icons/md";
import header_image from '/trip.png';




const Header = () => {
  const navigate = useNavigate();
  const search = useSearchContext();
  

  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [rooms_to_book, setRoomsToBook] = useState<number>(search.rooms_to_book);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      rooms_to_book,
    );
    navigate("/search");
  };

  const minDate = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleClear = () => {
    setDestination('');
    setRoomsToBook(1);
    setCheckIn(new Date());
    setCheckOut(new Date());
  };
    return (
      <div className="relative h-full w-full flex-col h-min-screen">
        <div className="flex flex-col lg:flex-row bg-slate-950 sm:pb-6 px-6 pt-6">
          {/* left section */}
          <section className="w-full lg:w-[60%] flex flex-col lg:translate-x-10 md:px-2 lg:px-0 lg:pt-16">
            <h1 className="text-3xl lg:text-5xl text-white font-extrabold py-1.5">LET'S GO!</h1>
            <h1 className="text-3xl lg:text-5xl text-white font-extrabold py-1.5">THE <span className="text-neutral-500">HOTEL</span> IS</h1>
            <h1 className="text-3xl lg:text-5xl text-white font-extrabold py-1.5">WAITING FOR YOU</h1>
            <div className="w-full h-35 mt-6 rounded-3xl">
              {/* form */}
              <form onSubmit={handleSubmit} className="h-25 bg-white rounded-3xl shadow-md px-3 mb-6 lg:px-3 grid grid-cols-1 md:grid-cols-3 gap-5 py-2 pb-4">
                <div className="h-full w-full flex flex-col ">
                  <div className="flex items-center pt-2 bg-white rounded-3xl">
                    <MdTravelExplore size={20} className="mr-2" />
                    <label htmlFor="destination" className="text-md text-gray-600 mb-1">Destination</label>
                  </div>
                  <div className="text-md focus:outline-none">
                    <input
                      id="destination"
                      placeholder="Where to go?"
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-2xl"
                    />
                  </div>
                </div>
  
                <div className="h-full flex flex-col justify-start">
                  <div className="flex items-center pt-2 bg-white">
                    <MdOutlineDateRange size={20} className="mr-2" />
                    <label htmlFor="input-date-2" className="text-md text-gray-600 mb-1">Date</label>
                  </div>
                  <div className="focus:outline-none text-md">
                    <DatePicker
                      selected={checkIn}
                      onChange={(date) => setCheckIn(date as Date)}
                      selectsStart
                      startDate={checkIn}
                      endDate={checkOut}
                      minDate={minDate}
                      maxDate={maxDate}
                      placeholderText="Check-in Date"
                      className="w-full p-2 border border-gray-300 rounded-2xl"
                      wrapperClassName="w-full"
                    />
                  </div>
                </div>
                
                <div className="flex flex-row items-end">
                  <button type="submit" className="text-white bg-orange-400 hover:bg-orange-300 rounded-md  p-2 px-4 lg:px-5 py-1 h-10">Search</button>
                  <button type="button" onClick={handleClear} className="text-white bg-neutral-500 hover:bg-neutral-400 rounded-md p-2 px-4 lg:px-5 py-1 h-10 ml-2">Clear</button>
                </div>
              </form>
              {/* form ends */}
            </div>
          </section>
          
          {/* right section */}
          <section className="relative w-full lg:w-[70%] flex items-center">
            <img src={header_image} alt="Hero Image" className="h-full w-11/12 object-contain"/>
          </section>
        </div>
      </div>
    );
  };
  
  export default Header;