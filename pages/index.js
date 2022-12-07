import styles from '../styles/Home.module.css'
import Navbar from '../components/navbar1'
//import {getSession, signIn, signOut} from 'next-auth/react'; 

import { signIn, signOut } from "next-auth/react";
import { getSession } from 'next-auth/react';

export default function Home(props) {
  const curUser = props.currentUser;
  console.log(props)

  //send the props current user to navbar componont 
  return (
    <>
      <Navbar curuser={curUser}>
      </Navbar>
        <h1 className={styles.heading}>La Mia Torta Home Page</h1>        
    </>
  )
}

export async function getServerSideProps(req, res) {
  const session = await getSession(req) //await getSession(req)
  console.log('session is', session)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`
        //change the destination default login in to cusotm login
      }
    }
  }
  
  return {
    props: { currentUser: session?.user || null },
  }
}

