import classes from "./AccountContent.module.css";

import { useSelector } from "react-redux";

import AccountNavigation from "./AccountNavigation";

function AccountContent() {
  return (
    <section className="first__section section__min__height">
      <div className={classes.account__grid}>
        <AccountNavigation />
      </div>
    </section>
  );
}

export default AccountContent;
