import { useState } from "react";

import Navigation from "../UI/RootComponents/Navigation";
import MobileNav from "../UI/RootComponents/MobileNav";
import Footer from "../UI/RootComponents/Footer";

import { Outlet } from "react-router-dom";

function Root() {
  const [mobileNavActive, setMobileNavActive] = useState(false);

  return (
    <>
      <Navigation openMobileNav={setMobileNavActive} />
      <MobileNav
        mobileNavActive={mobileNavActive}
        closeMobileNav={setMobileNavActive}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default Root;
