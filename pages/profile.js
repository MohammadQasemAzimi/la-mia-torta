//disply orders by customer
import styles from '../styles/profile.module.css';
import Navbar from '../components/Navbar';
import db from '../database';
import Card from '../components/Card';

import { getSession } from 'next-auth/react';

export default function bakerOrder(props) {
  const curUser = props.currentUser;
  console.log(props)

  //send the props current user to navbar componont 
  const orders = props.orders;
  return (
    <>
      <Navbar curuser={curUser}></Navbar>
      <div className={styles.containerImg}>
      <div className={styles.container}>    
        <div className={styles.cards}>
          {orders.map(order => (<Card cake={order} key={order.id} />))}
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
   const email = "s@g.com"
  session.user.email = email
  const customer = await db.User.findOne({where:{email:session.user.email}})

  const orders = await db.Order.findAll({ where:{UserId: customer.id}})
   
  const stringfyOrders = JSON.parse(JSON.stringify(orders))

  return {
    props: { orders: stringfyOrders, currentUser: session?.user || null },
  }
}
