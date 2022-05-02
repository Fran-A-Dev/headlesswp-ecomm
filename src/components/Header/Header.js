import { FaShoppingCart } from "react-icons/fa";
import Container from "../Container/Container";
import styles from "./Header.module.scss";

const Header = () => {
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>Fran_The_Dev&apos;s Store</p>

        <p className={styles.headerCart}>
          <FaShoppingCart />
          $0.00
        </p>
      </Container>
    </header>
  );
};

export default Header;
