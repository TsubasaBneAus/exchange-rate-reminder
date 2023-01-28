import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import LanguageIcon from "@mui/icons-material/Language";
import React, { useState } from "react";
import styles from "../styles/LanguageMenu.module.css";
import { GetServerSideProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import languages from "../lib/languages";
import { useRouter } from "next/router";

const LanguageMenu = () => {
  const router = useRouter();
  const { pathname, asPath, query } = router;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // Handle the click event for the button
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Handle the close event for the menu
  const handleClose = (index: number) => {
    setAnchorEl(null);
    languages.map((each) => {
      if (index === each.id) {
        router.push({ pathname, query }, asPath, { locale: each.language });
      }
    });
  };

  return (
    <>
      <Button
        className={styles.button}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        disableRipple
        sx={{minWidth: 24, maxWidth:24, padding: 0}}
        onClick={handleClick}
      >
        <LanguageIcon className={styles.icon} />
      </Button>
      <Menu
        className={styles.menu}
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={() => handleClose(1)} disableRipple>
          English
        </MenuItem>
        <MenuItem onClick={() => handleClose(2)} disableRipple>
          日本語
        </MenuItem>
      </Menu>
    </>
  );
};

export default LanguageMenu;

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ["common"])),
    },
  };
};
