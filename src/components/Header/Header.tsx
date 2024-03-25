import { Link } from "react-router-dom";
import styles from "./Header.module.scss";

export interface HeaderProps {
  title: string;
  hasBackBtn: boolean;
}

const Header = ({ title, hasBackBtn }: HeaderProps) => {
  return (
    <header className={styles.header}>
      {hasBackBtn && <Link to="/">Back</Link>}
      <h1>{title}</h1>
    </header>
  );
};

export default Header;
