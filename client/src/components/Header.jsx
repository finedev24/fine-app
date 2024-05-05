import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from "../styles/Header.module.css";
import icAngleLeft from "../assets/icons/ic-angle-left.svg";
import icClose from "../assets/icons/ic-close.svg";

function Header() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };
  return (
    <nav className={styles.Nav}>
      <div onClick={goBack} style={{ cursor: 'pointer' }}>
        <img src={icAngleLeft} />
      </div>
      <div>
        <span>BOOK YOUR FINE</span>
      </div>
      <div>
        <a href="https://finemyauto.com/">
          <img src={icClose} />
        </a>
      </div>
    </nav>
  );
}

export default Header;
