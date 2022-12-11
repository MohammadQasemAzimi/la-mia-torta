import styles from '../../styles/Baker.module.css';
//import Navbaker from '../../components/navbaker';
import db from '../../database';
import UpdateCard from '../../components/UpdateCard';
import Navbar from '../../components/Navbar';
//import {getSession, signIn, signOut} from 'next-auth/react'; 

import { getSession } from 'next-auth/react';

export default function Home(props) {
  const curUser = props.currentUser;

  //send the props current user to navbar componont 
  const cakes = props.cakes;
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.containerImg}>
        <div className={styles.container}>

          <div className={styles.cards}>
            {cakes.map((cake, index) => (<UpdateCard cake={cake} key={cake.id} />))}
          </div>
        </div>
      </div>
    </>
  )
}
export async function getServerSideProps(req, res) {
  const session = await getSession(req) //await getSession(req)
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`
        //change the destination default login in to cusotm login
      }
    }
  }
  /*const email = "s@g.com"
  session.user.email = email */
  const owner = await db.User.findOne({ where: { email: session.user.email } })
  let cake = []
  if (owner) {
    cake = await db.Cake.findAll({ where: { UserId: owner.id } })
  }
  else {
    throw `There is no created cakes with user ${session.user.email}`
  }
  const stringfycakes = JSON.parse(JSON.stringify(cake))

  return {
    props: { cakes: stringfycakes, currentUser: session?.user || null },
  }
}
