import styles from '../../styles/Baker.module.css';
import Navbar from '../../components/Navbar';
import db from '../../database';
import OrdersCard from '../../components/OrdersCard';
import { getSession } from 'next-auth/react';


export default function bakerOrder(props) {
  const curUser = props.currentUser;
  const user = props.profile
  //send the props current user to navbar componont 
  const orders = props.orders;
  /* {console.log(orders)} */
  return (
    <>
      <Navbar curuser={curUser} profile={user}></Navbar>
      <h2 className={styles.cardTitle}>My <span>Orders</span></h2>
      <div className={styles.container1}>
        <div className={styles.containerImg}>
          <div className={styles.cards}>
            {orders.map(order => (<OrdersCard cake={order} key={order.id} />))}
          </div>
        </div>
      </div>
    </>
  );
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
  /*   const email = "z@a.com"
    session.user.email = email */
  const user = await db.User.findOne({ where: { email: session.user.email } })
  const profile = JSON.parse(JSON.stringify(user))
  const orders = await db.Order.findAll({
    include: [{ 
      model: db.Cake,
      where:{UserId:user.id}, include: db.User }]
  })

  const stringfyOrders = JSON.parse(JSON.stringify(orders))
  return {
    props: {profile: profile, orders: stringfyOrders, currentUser: session?.user || null },
  }
}
