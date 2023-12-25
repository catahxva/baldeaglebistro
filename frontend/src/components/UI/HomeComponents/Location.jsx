import classes from "./Location.module.css";

function Location() {
  return (
    <section>
      <h2>Visit our location</h2>
      <div className={classes.location__grid}>
        <div>
          <p>
            Nestled in the heart of New Orleans, Bald Eagle Bistro is a culinary
            haven where flavors come to life and memories are made. Our charming
            location sets the perfect backdrop for a delightful dining
            experience. Whether you're seeking an intimate evening out or a
            lively gathering with friends and family, our inviting atmosphere
            and warm hospitality create the ideal setting.
          </p>
          <p>
            Join us at Bald Eagle Bistro to savor delectable dishes crafted with
            passion and precision, all while enjoying the unique ambiance that
            makes our restaurant a cherished destination. Come and discover the
            culinary delights that await you – we look forward to welcoming you
            to our table for an unforgettable dining adventure.
          </p>
          <div className={classes.location__container__address}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6 ${classes.location__svg}`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className={classes.location__address}>
              123 French Quarter Street, New Orleans, LA 70116
            </span>
          </div>
        </div>
        <div>
          <img src="/img/location.jpg" className={classes.location__img} />
        </div>
      </div>
    </section>
  );
}

export default Location;
