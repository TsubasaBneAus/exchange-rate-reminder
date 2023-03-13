import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import styles from "../styles/Layout.module.css";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={styles.container} data-testid="layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
