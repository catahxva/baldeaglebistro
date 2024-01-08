import classes from "./AccountPromo.module.css";

import ButtonLink from "../Others/ButtonLink";

function AccountPromo() {
  return (
    <section>
      <div className={classes.account__container}>
        <h2>Create an account now</h2>
      </div>
      <div className={classes.account__grid}>
        <div className={classes.account__card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${classes.account__card__svg}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
          <h3 className={classes.account__card__title}>Faster Checkout</h3>
          <p className={classes.account__card__text}>
            Creating an account at Bald Eagle Bistro unlocks the key to swifter
            and more efficient checkouts. By storing your preferred delivery
            address, you eliminate the hassle of entering it every time you
            order. This streamlined process ensures that your culinary delights
            are on their way to your doorstep without unnecessary delays,
            leaving you more time to savor the exquisite flavors.
          </p>
        </div>
        <div className={classes.account__card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${classes.account__card__svg}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>

          <h3 className={classes.account__card__title}>Order Re-do</h3>
          <p className={classes.account__card__text}>
            Elevate your dining experience with the convenience of redoing your
            favorite orders effortlessly. With a Bald Eagle Bistro account,
            relishing the flavors you love becomes a breeze. Whether it's that
            perfectly seasoned dish or a delightful dessert, recreate the magic
            of your go-to meals with just a few clicks. Enjoy the freedom to
            indulge in your culinary favorites whenever the craving strikes,
            making every dining moment a memorable one.
          </p>
        </div>
        <div className={classes.account__card}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={`w-6 h-6 ${classes.account__card__svg}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
            />
          </svg>
          <h3 className={classes.account__card__title}>Order History</h3>
          <p className={classes.account__card__text}>
            Dive into your personalized culinary journey with the Order History
            feature. Your Bald Eagle Bistro account keeps a detailed record of
            your past orders, allowing you to track and revisit your favorite
            meals. Explore your order history to reminisce about memorable
            dining experiences and discover new dishes to tantalize your taste
            buds.
          </p>
        </div>
      </div>
      <div className={classes.account__container}>
        <ButtonLink path="/auth/signup" className="big__button">
          Register
        </ButtonLink>
      </div>
    </section>
  );
}

export default AccountPromo;
