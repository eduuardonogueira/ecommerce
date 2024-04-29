import style from "./footer.module.scss";
import { useLinks } from "../../hooks/useLinks";
import { Link } from "react-router-dom";
import { Input } from "@mui/material";
import { FormEvent, useState } from "react";

export const Footer = () => {
  const { headerLinks, footerLinks } = useLinks();
  const [email, setEmail] = useState<string>();

  async function handleSubscribe(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <div className={style.container}>
      <footer className={style.footerWrapper}>
        <h2 className={style.logo}>Funiro.</h2>
        <address className={style.address}>
          400 University Drive Suite 200 Coral Gables, FL 33134 USA
        </address>

        <ul className={style.links}>
          <li>
            <h4 className={style.subtitle}>Links</h4>
          </li>
          {headerLinks.map((link, index) => (
            <Link to={link.route} key={index} className={style.link}>
              {link.label}
            </Link>
          ))}
        </ul>

        <ul className={style.help}>
          <li>
            <h4 className={style.subtitle}>Help</h4>
          </li>
          {footerLinks.map((link, index) => (
            <Link to={link.route} key={index} className={style.link}>
              {link.label}
            </Link>
          ))}
        </ul>

        <ul className={style.newsletter}>
          <li>
            <h4 className={style.subtitle}>Newsletter</h4>
          </li>
          <li>
            <form
              action="post"
              onSubmit={handleSubscribe}
              className={style.form}
            >
              <Input
                className={style.input}
                placeholder="Placeholder"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
              />
              <button type="submit" className={style.button}>
                Subscribe
              </button>
            </form>
          </li>
        </ul>

        <hr className={style.divisor} />

        <address className={style.copyright}>
          ©2023 furino. All rights reserved
        </address>
      </footer>
    </div>
  );
};
