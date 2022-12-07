//import {getSession, signIn, signOut} from 'next-auth/react'; 

import { signIn, signOut } from "next-auth/react";
import { getSession } from 'next-auth/react';

export default function Home(props) {
  const curUser = props.currentUser;
  return (
    <>
      <h1>La Mia Torta Home Page</h1>
      {curUser ?
        <button onClick={() => signOut()}>Sign out</button> :
        <button onClick={() => signIn()}>Sign in</button>
      }
      <h1>From now on You can buy your cake easily here</h1>
      
    </>
  )
}

export async function getServerSideProps(req, res) {
  const session = await getSession(req) //await getSession(req)
  console.log('session is', session)
/*      if (!session) {
   return {
     redirect: {
       permanent: false,
       destination: `profile`
     }
   }
 }  */

  return {
    props: { currentUser: session?.user || null},
}
}

