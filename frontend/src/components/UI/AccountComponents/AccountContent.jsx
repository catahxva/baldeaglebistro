import classes from "./AccountContent.module.css";

import { useState } from "react";
import { useSelector } from "react-redux";

import AccountNavigation from "./AccountNavigation";
import AccountData from "./AccountData";
import AccountOrders from "./AccountOrders";
import AccountResetPass from "./AccountResetPass";
import AccountAllOrders from "./AccountAllOrders";
import AccountAllProducts from "./AccountAllProducts";

function AccountContent() {
  const username = useSelector((state) => state.auth.username);

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
  }

  return (
    <section className="first__section section__min__height">
      <h2>Welcome {username}</h2>
      <div className={classes.account__grid}>
        <AccountNavigation activeTab={activeTab} onClick={tabClickHandler} />
        {activeTabContent}
      </div>
    </section>
  );
}

export default AccountContent;
