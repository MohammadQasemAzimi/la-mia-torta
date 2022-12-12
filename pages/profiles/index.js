import styles from '../../styles/Home.module.css';
import db from '../../database';
import Navbar from '../../components/Navbar';
//import {getSession, signIn, signOut} from 'next-auth/react'; 
import { getSession } from 'next-auth/react';
import { Input } from 'reactstrap';

export default function getProfile(props) {
  const curUser = props.currentUser;
  //send the props current user to navbar componont 
  const user = props.profile;
  /* console.log('the user is :',user) */
  return (
    <>
      <Navbar curuser={curUser}></Navbar>
      <div className={styles.row}>
        <div className={styles.card}>
          <div className={styles.cardBody}>
            <form method="POST" action={`/api/profiles/${user.id}`}>
              <div className={styles.formGroup}>
                <label htmlFor="firstname">First Name</label><br />
                <Input type="text" name='firstname' id="firstname" placeholder={user.name} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastname">Last Name</label><br />
                <Input name='lastname' id="lastname" type="text" placeholder={user.LastName} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label><br />
                <Input name='email' id="email" type="email" placeholder={user.email} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label><br />
                <Input name='password' id="password" type="password" placeholder={user.password} />
              </div>
              <div className={styles.formGroup}>
                <button type="submit" value="Edit" /><br />
              </div>
            </form>
          </div>
        </div>
      </div >
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
  const user = await db.User.findOne({ where: { email: session.user.email } })
  const stringfyuser = JSON.parse(JSON.stringify(user))
  return {
    props: { profile: stringfyuser, currentUser: session?.user || null },
  }
}
