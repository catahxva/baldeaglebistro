import classes from "./AccountContent.module.css";

import { useState } from "react";
import { useSelector } from "react-redux";

import AccountNavigation from "./AccountNavigation";
import AccountData from "./AccountData";
import AccountOrders from "./AccountOrders";
import AccountResetPass from "./AccountResetPass";
import AccountAllOrders from "./AccountAllOrders";
import AccountAllProducts from "./AccountAllProducts";
import AccountNewProduct from "./AccountNewProduct";

import MobileMenu from "../Others/MobileMenu";

function AccountContent() {
  const username = useSelector((state) => state.auth.username);

  const [mobileMenu, setMobileMenu] = useState();

  const [activeTab, setActiveTab] = useState(1);

  const tabClickHandler = function (tabNumber) {
    setActiveTab(tabNumber);
  };

  let activeTabContent;

  switch (activeTab) {
    case 1:
      activeTabContent = <AccountData />;
      break;
    case 2:
      activeTabContent = <AccountOrders />;
      break;
    case 3:
      activeTabContent = <AccountResetPass />;
      break;
    case 4:
      activeTabContent = <AccountAllOrders />;
      break;
    case 5:
      activeTabContent = <AccountAllProducts />;
      break;
    case 6:
      activeTabContent = <AccountNewProduct />;
      break;
  }

  return (
    <section className="first__section section__min__height">
      <h2>Welcome {username}</h2>
      <button
        onClick={() => setMobileMenu(true)}
        className={classes.account__mobile__btn}
      >
        Menu
      </button>
      <div className={classes.account__grid}>
        <MobileMenu openMobileMenu={mobileMenu} closeMobileMenu={setMobileMenu}>
          <AccountNavigation
            mobile={true}
            activeTab={activeTab}
            onClick={tabClickHandler}
            closeMobileNav={setMobileMenu}
          />
        </MobileMenu>
        <div className={classes.account__special__wrapper}>
          <AccountNavigation activeTab={activeTab} onClick={tabClickHandler} />
        </div>
        {activeTabContent}
      </div>
    </section>
  );
}

export default AccountContent;
