import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import LatestDestinationCard from "../components/LastestDestinationCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  const { data: hotels } = useQuery("fetchQuery", () =>
    apiClient.fetchHotels()
  );

  // const topRowHotels = hotels?.slice(0, 2) || [];
  // const bottomRowHotels = hotels?.slice(2) || [];
  const hotelList= hotels || [];

  return (
    <>
      <div className="relative h-full w-full flex-col h-min-screen">
      <Navbar />
      <Header />
    </div>
    <div>
      <div className="space-y-3 ml-5 mr-5">
        <div className=" p-2 rounded-lg mt-4"><h2 className="text-3xl font-bold ml-2">Latest Destinations</h2></div>
        {/* <p>Most recent desinations added by our hosts</p> */}
        <div className="grid gap-4">
          <div className="grid md:grid-cols-3 p-4 mb-6 grid-cols-2 gap-6">
            {hotelList.map((hotel) => (
              <LatestDestinationCard hotel={hotel} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default Home;
