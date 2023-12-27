import { useState } from "react";

import Navigation from "../UI/RootComponents/Navigation";
import MobileNav from "../UI/RootComponents/MobileNav";
import Notification from "../UI/RootComponents/Notification";
import Footer from "../UI/RootComponents/Footer";

import { Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

function Root() {
  const notification = useSelector((state) => state.ui.notification);

  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <>
      <Navigation openMobileNav={setMobileNavActive} />
      <MobileNav
        mobileNavActive={mobileNavActive}
        closeMobileNav={setMobileNavActive}
      />
      {notification && <Notification />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Root;
