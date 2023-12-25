import { useEffect } from "react";

import Header from "../UI/HomeComponents/Header";
import OfferingsSection from "../UI/HomeComponents/OfferingsSection";
import Story from "../UI/HomeComponents/Story";
import Latest from "../UI/HomeComponents/Latest";
import Staff from "../UI/HomeComponents/Staff";
import Location from "../UI/HomeComponents/Location";
import AccountPromo from "../UI/HomeComponents/AccountPromo";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <OfferingsSection />
      <Story />
      <Latest />
      <Staff />
      <Location />
      <AccountPromo />
    </>
  );
}

export default Home;
