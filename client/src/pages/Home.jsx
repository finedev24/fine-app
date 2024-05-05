import React from 'react'

import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SelectAddress from '../components/SelectAddress'
import styles from '../styles/Home.module.css'

export default function Home() {

  const navigate = useNavigate()

  // useEffect(()=> {
  //   if(!supabase.auth.getUser()) {
  //     navigate("/login")
  //   }
  // }, [navigate])

  return (
    <div className={styles.container}>
      {/* <button className={styles.logout} onClick={()=> supabase.auth.signOut()}>
        Other phone number
      </button> */}
      <SelectAddress />
    </div>
  )
}
