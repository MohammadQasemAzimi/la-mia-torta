import styles from '../../styles/Baker.module.css';
//import Navbaker from '../../components/navbaker';
import db from '../../database';
import UpdateCard from '../../components/UpdateCard';
import Navbar from '../../components/Navbar';
//import {getSession, signIn, signOut} from 'next-auth/react'; 

import { getSession } from 'next-auth/react';

export default function Home(props) {
  const curUser = props.currentUser;
  const user = props.profile
  //send the props current user to navbar componont 
  const cakes = props.cakes;
  return (
    <>
      <Navbar curuser={curUser} profile={user}></Navbar>
      <h2 className={styles.cardTitle}>My <span>Cakes</span></h2>
      <div className={styles.container1}>
        <div className={styles.containerImg}>
          <div className={styles.container}>
            <div className={styles.cards}>
              {cakes.map((cake, index) => (<UpdateCard cake={cake} key={cake.id} />))}
            </div>
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
        destination: `/api/auth/signin?callbackUrl=${process.env.NEXTAUTH_URL}`
        //change the destination default login in to cusotm login
      }
    }
  }
  /*const email = "s@g.com"
  session.user.email = email */
  const owner = await db.User.findOne({ where: { email: session.user.email } })
  const profile = JSON.parse(JSON.stringify(owner))
  let cake = await db.Cake.findAll({ where: { UserId: owner.id } })
  const stringfycakes = JSON.parse(JSON.stringify(cake))
  return {
    props: {profile: profile, cakes: stringfycakes, currentUser: session?.user || null },
  }
}
