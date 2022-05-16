import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";

import { useSnipcart } from "../../hooks/use-snipcart";

import Container from "../Container/Container";

import styles from "./Header.module.scss";

const Header = () => {
  const { cart = {} } = useSnipcart();
  const { subtotal = "0.00" } = cart;
  return (
    <header className={styles.header}>
      <Container className={styles.headerContainer}>
        <p className={styles.headerTitle}>
          <Link href="/">
            <a>Fran_The_Dev Climb and Code Swag</a>
          </Link>
        </p>
        <p className={styles.headerCart}>
          <button className="snipcart-checkout">
            <FaShoppingCart />
            <span>${subtotal}</span>
          </button>
        </p>
      </Container>
    </header>
  );
};

export default Header;
