import classes from "./Staff.module.css";

function Staff() {
  return (
    <section>
      <h2>Some of the staff</h2>
      <div className={classes.staff__grid}>
        <div className={classes.staff__container__members}>
          <div className={classes.staff__member}>
            <div className={classes.staff__member__container__img}>
              <img
                src="/img/chef-1.jpg"
                className={classes.staff__member__img}
              />
            </div>
            <div className={classes.staff__member__container__text}>
              <p className={classes.staff__member__text}>
                "As a chef at Bald Eagle Bistro, my culinary journey has been
                nothing short of exhilarating. The kitchen is a canvas where
                creativity knows no bounds, and each dish is a testament to our
                commitment to excellence."
              </p>
              <span className={classes.staff__member__name}>
                &ndash; Juvenal Jeremias
              </span>
            </div>
          </div>
          <div className={classes.staff__member}>
            <div className={classes.staff__member__container__img}>
              <img
                src="/img/chef-2.jpg"
                className={classes.staff__member__img}
              />
            </div>
            <div className={classes.staff__member__container__text}>
              <p className={classes.staff__member__text}>
                "Working as a chef at Bald Eagle Bistro has been an empowering
                and enriching experience. As a woman in the culinary world, I've
                found a supportive and inclusive environment that celebrates
                diversity and creativity."
              </p>
              <span className={classes.staff__member__name}>
                &ndash; Chausiku Mwanajuma
              </span>
            </div>
          </div>
          <div className={classes.staff__member}>
            <div className={classes.staff__member__container__img}>
              <img
                src="/img/chef-3.jpg"
                className={classes.staff__member__img}
              />
            </div>
            <div className={classes.staff__member__container__text}>
              <p className={classes.staff__member__text}>
                "The passion for quality ingredients and the pursuit of culinary
                artistry define our approach. The energy of the bustling
                kitchen, coupled with the joy of seeing satisfied diners, makes
                being part of Bald Eagle Bistro an immensely fulfilling
                experience."
              </p>
              <span className={classes.staff__member__name}>
                &ndash; Vilfred Rómulo
              </span>
            </div>
          </div>
        </div>
        <div>
          <p>
            At Bald Eagle Bistro, our dedicated team of culinary experts brings
            passion and creativity to every plate. Our chefs, with a wealth of
            experience and a flair for innovation, craft delectable dishes that
            showcase the finest ingredients.
          </p>
          <p>
            Whether it's the meticulous preparation of savory main courses or
            the artful creation of irresistible desserts, our kitchen staff's
            commitment to culinary excellence is unwavering. Behind the scenes,
            our kitchen brigade works seamlessly to deliver a dining experience
            that transcends expectations.
          </p>
          <p>
            In addition to our skilled chefs, the entire staff at Bald Eagle
            Bistro contributes to creating an inviting and enjoyable dining
            atmosphere. From the friendly front-of-house team who warmly
            welcomes guests to the attentive servers ensuring a seamless dining
            experience, each member plays a crucial role in making every visit
            special.
          </p>
          <p>
            Our kitchen staff collaborates closely with the service team,
            fostering a spirit of teamwork that extends throughout the entire
            establishment. The dedication and passion of our staff shine through
            in every aspect of Bald Eagle Bistro, making it not just a place to
            dine but an experience to savor.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Staff;
