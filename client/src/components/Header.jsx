import React from 'react'
import { Link } from "react-router-dom";
import AppContext from "../context/AppContext";

import styles from "../styles/Header.module.css"

import icAngleLeft from "../assets/icons/ic-angle-left.svg"
import icClose from "../assets/icons/ic-close.svg"


function Header() {
  return (
    <nav className={styles.Nav}>
      <div>
        <img src={icAngleLeft}/>
      </div>
      <div>
        <span>BOOK YOUR FINE</span>
      </div>
      <div>
        <img src={icClose}/>
      </div>
    </nav>
  )
}

export default Header