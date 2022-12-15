import Navbar from '../../../components/Navbar'
import styles from '../../../styles/oneStepAway.module.css'
import { getSession } from 'next-auth/react';
import db from '../../../database';


export default function Order(props) {
    const order = props.order
    const user = props.profile
    const curUser = props.currentUser
    return (
        <>
            <Navbar curuser={curUser} profile={user}></Navbar>
            <div className={styles.container}>
                <h2 className={styles.title}>One Step Away from <span>Your Cake</span></h2>
            
            <form className={styles.firstBox} method='POST' action={`/api/orders/${order[0].id}/confirm`}>
                <div className={styles.box}>
                <h2 className={styles.summary}>Order Summary</h2>
                    <table className={styles.newTable}>
                        <thead>
                            <tr className={styles.tableRow}>
                                <th className={styles.tableTitle}>No</th>
                                <th className={styles.tableTitle}>Description</th>
                                <th className={styles.tableTitle}>Your Order</th>
                            </tr>
                        </thead>
                        <tr>
                            <th><h4>1</h4></th>
                            <td><h4 className={styles.orderid}>Your Product orderID: </h4></td>
                            <td><h4>{order[0].id}</h4> </td>
                        </tr>
                        <tr>
                            <th><h4>2</h4></th>
                            <td><h4 className={styles.cake}>Name of the cake: </h4></td>
                            <td><h4>{order[0].Cake.name}</h4></td>
                        </tr>
                        <tr>
                            <th><h4>3</h4></th>
                            <td><h4 className={styles.price}>Total amount: </h4></td>
                            <td><h4>{order[0].Cake.price}</h4></td>
                        </tr>
                        <tr>
                            <th><h4>4</h4></th>
                            <td><h4 className={styles.status}>status:</h4></td>
                            <td><h4>{order[0].status}</h4></td>
                            <td>35</td>
                        </tr>
                    </table>
                    {order[0].status == "confirmed" ?
                        <input type="submit" className={styles.button} value="Go To Payment" /> :
                        order[0].status == "paid" ?
                            <input type="hidden" value="Confirm" /> :
                            <input type="submit" className={styles.button} value="Confirm" />
                    }
                </div>
            </form>
            </div>
        </>
    )
}

export async function getServerSideProps(req, res) {

    const { id } = req.query
    //const order = await ordersController.find(id);
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
    const user = await db.User.findOne({ where: { email: session.user.email } })
    const profile = JSON.parse(JSON.stringify(user))
    const order = await db.Order.findAll({
        where: { id: id },
        include: [{ model: db.Cake }]
    })

    const stringifyorder = JSON.parse(JSON.stringify(order))
    return {
        props: { profile: profile, order: stringifyorder, currentUser: session?.user || null },
    }

}
