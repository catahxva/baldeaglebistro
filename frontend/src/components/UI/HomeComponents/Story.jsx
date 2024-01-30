import classes from "./Story.module.css";

function Story() {
  return (
    <section>
      <h2>The Story of the Bald Eagle</h2>
      <div className={classes.story__grid}>
        <div className={classes.story__container}>
          <img src="/img/story.jpg" className={classes.story__img} />
        </div>
        <div className={classes.story__container}>
          <p>
            Bald Eagle is not just a restaurant; it's a realization of our
            collective dream and love for the diverse flavors of American
            cuisine. A group of friends, driven by a passion for our country's
            rich heritage, came together to create a place that celebrates the
            essence of the United States.
            <br></br>
            <br></br>
            Inspired by the majestic symbolism of the bald eagle—a symbol of
            strength and freedom—we embarked on a culinary journey to showcase
            the best of America on a plate. Our journey began with a shared
            vision and a commitment to honoring the traditions that make
            American cuisine so unique.
          </p>
        </div>
        <div className={classes.story__container}>
          <p>
            We poured over research to curate a menu that captures the essence
            of various regions, from the comforting tastes of the South to the
            seafood delights of New England. Every dish reflects the vibrant
            tapestry of American culture.
            <br></br>
            <br></br>
            The restaurant's ambiance was carefully crafted to embody the warmth
            and pride we feel for our country, with rustic decor that transports
            patrons to a cozy American lodge. We sourced local, high-quality
            ingredients to ensure an authentic dining experience.
          </p>
        </div>
        <div
          className={`${classes.story__container__mobile} ${classes.story__container}`}
        >
          <img src="/img/story-2.jpg" className={classes.story__img} />
        </div>
      </div>
    </section>
  );
}

export default Story;
