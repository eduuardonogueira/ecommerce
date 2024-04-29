import SvgTrophy from "@assets/icons/Trophy";
import style from "./banner.module.scss";
import SvgGuarantee from "@assets/icons/Guarantee";
import SvgShipping from "@assets/icons/Shipping";
import SvgCustomerSupport from "@assets/icons/CustomerSupport";

export const Banner = () => {
  return (
    <div className={style.container}>
      <section className={style.bannerWrapper}>
        <ul className={style.certificatesWrapper}>
          <li className={style.certificate}>
            <div className={style.content}>
              <SvgTrophy className={style.svg} />
              <div className={style.textWrapper}>
                <h4 className={style.title}>high quality</h4>
                <p className={style.text}>Crafted from top materials</p>
              </div>
            </div>
          </li>
          <li className={style.certificate}>
            <div className={style.content}>
              <SvgGuarantee className={style.svg} />
              <div className={style.textWrapper}>
                <h4 className={style.title}>Warranty Protection</h4>
                <p className={style.text}>Over 2 years</p>
              </div>
            </div>
          </li>
          <li className={style.certificate}>
            <div className={style.content}>
              <SvgShipping className={style.svg} />
              <div className={style.textWrapper}>
                <h4 className={style.title}>Free Shipping</h4>
                <p className={style.text}>Order over 150 $</p>
              </div>
            </div>
          </li>
          <li className={style.certificate}>
            <div className={style.content}>
              <SvgCustomerSupport className={style.svg} />
              <div className={style.textWrapper}>
                <h4 className={style.title}>24 / 7 Support</h4>
                <p className={style.text}>Dedicated support</p>
              </div>
            </div>
          </li>
        </ul>
      </section>
    </div>
  );
};
