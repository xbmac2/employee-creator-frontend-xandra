import { Link } from "react-router-dom";
import styles from "./Footer.module.scss";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link to="/">Home</Link>
      <small>My Employee Creator App</small>
    </footer>
  );
};

export default Footer;
