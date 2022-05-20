import styles from "./Footer.module.scss";

const Footer = ({ ...rest }) => {
  return (
    <footer className={styles.footer} {...rest}>
      &copy; Fran_The_Dev, {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
