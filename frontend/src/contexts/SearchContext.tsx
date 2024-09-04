import React, { useContext, useState } from "react";

type SearchContextType = {
  destination: string;
  checkIn: Date;
  checkOut: Date;
  hotelId: string;
  rooms_to_book:number;
  saveSearchValues: (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    rooms_to_book:number,
    hotelId?: string
  ) => void;
};

const SearchContext = React.createContext<SearchContextType | undefined>(undefined);

type SearchContextProviderProps = {
  children: React.ReactNode;
};

export const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
  const [destination, setDestination] = useState<string>(() => sessionStorage.getItem("destination") || "");
  const [checkIn, setCheckIn] = useState<Date>(() => new Date(sessionStorage.getItem("checkIn") || new Date().toISOString()));
  const [checkOut, setCheckOut] = useState<Date>(() => new Date(sessionStorage.getItem("checkOut") || new Date().toISOString()));
  // const [adultCount, setAdultCount] = useState<number>(() => parseInt(sessionStorage.getItem("adultCount") || "1"));
  // const [childCount, setChildCount] = useState<number>(() => parseInt(sessionStorage.getItem("childCount") || "1"));
  const [rooms_to_book, setRoomsToBook] = useState<number>(() => parseInt(sessionStorage.getItem("rooms_to_book") || "1"));
  const [hotelId, setHotelId] = useState<string>(() => sessionStorage.getItem("hotelId") || "");

  const saveSearchValues = (
    destination: string,
    checkIn: Date,
    checkOut: Date,
    rooms_to_book: number,
    hotelId?: string
  ) => {
    setDestination(destination);
    setCheckIn(checkIn);
    setCheckOut(checkOut);
    // setAdultCount(adultCount);
    // setChildCount(childCount);
    setRoomsToBook(rooms_to_book);
    if (hotelId) {
      setHotelId(hotelId);
    }

    sessionStorage.setItem("destination", destination);
    sessionStorage.setItem("checkIn", checkIn.toISOString());
    sessionStorage.setItem("checkOut", checkOut.toISOString());
    // sessionStorage.setItem("adultCount", adultCount.toString());
    // sessionStorage.setItem("childCount", childCount.toString());
    sessionStorage.setItem("rooms_to_book", rooms_to_book.toString());

    if (hotelId) {
      sessionStorage.setItem("hotelId", hotelId);
    }
  };

  return (
    <SearchContext.Provider
      value={{
        destination,
        checkIn,
        checkOut,
        hotelId,
        rooms_to_book,
        saveSearchValues,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchContext must be used within a SearchContextProvider");
  }
  return context;
};
