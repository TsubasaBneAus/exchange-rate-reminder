import Header from "./Header";
import Footer from "./Footer";
import { ReactNode } from "react";
import styles from "../styles/Layout.module.css";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <div className={styles.image_filter}>
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
