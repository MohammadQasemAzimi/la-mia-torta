import styles from '../../styles/Baker.module.css';
import Navbar from '../../components/Navbar';
import db from '../../database';
import Card from '../../components/OrdersCard';
import { getSession } from 'next-auth/react';

export default function customerOrder(props) {
    const curUser = props.currentUser;
    //send the props current user to navbar componont 
    const orders = props.orders
    const user = props.profile
    return (
        <>
            <Navbar curuser={curUser} profile={user}></Navbar>
            <h2 className={styles.cardTitle}>My <span>Requests</span></h2>
            <div className={styles.containerImg}>
                <div className={styles.container}>
                    <div className={styles.cards}>
                        {orders.map(order => (<Card cake={order} key={order.id} />))}
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
        where: { UserId: user.id },
        include: [{ model: db.Cake, include: db.User }]
    })
    const stringfyOrders = JSON.parse(JSON.stringify(orders))
    return {
        props: {profile: profile, orders: stringfyOrders, currentUser: session?.user || null },
    }
}