import Navbar from '../../../components/Navbar'
import styles from '../../../styles/Payment.module.css'
import { Input } from 'reactstrap'
import ordersController from '../../../controllers/orderController'
import { getSession } from 'next-auth/react'
import db from '../../../database'


export default function payment(props) {
  const order = props.order
  const curUser = props.currentUser
  const user = props.profile
  console.log(props.currentUser)

  return (
    <>
      <Navbar curuser={curUser} profile={user}></Navbar>
      <h2 className={styles.payment}>Insert Your Card
        <span> Details </span></h2>

      <div className={styles.containerwrap}>
        <div className={styles.formLayer}>
          <form action={`/api/orders/${order.id}/payment`}>
            <div className={styles.box1}>
              <label className={styles.names}>Your email:</label><br />
              <Input type="text" placeholder="Your Username Please..." className={styles.name} id="fullname" />
              <label className={styles.names}>Your Password:</label><br />
              <Input type="password" placeholder="Your Password Please.." className={styles.name} id="fullname" />
            </div>

            <div className={styles.box2}>
              <label className={styles.names}>Card Name:</label><br />
              <Input type="text" placeholder="Name on Card..." className={styles.name} id="fullname" />
              <label className={styles.names}>Card number:</label>
              <Input type="number" placeholder='insert card no..' className={styles.name} id="card no" />
            </div>

            <div className={styles.box3}>
              <div className={styles.Month}>
                <label className={styles.names}>Expiry Date:</label>
                <Input type="number" placeholder='MM' className={styles.date1} id="Month" />
              </div>
              <div className={styles.Year}>
              <label className={styles.names}></label>
                <Input type="number" placeholder='YYYY' className={styles.date1} id="Year" />
              </div>
            </div>

            <div className={styles.box4}>
                <label className={styles.names}>Security number:</label>
                <Input type="number" placeholder="CVV" className={styles.security} id='security' />
            </div>
            
            <div>
              <input type="submit" className={styles.btn} value="Submit" />
            </div>
          </form>
        </div>

        <div className={styles.Cardlogos}>
          <img className={styles.visacard} src="https://www.braintreepayments.com/images/features/payment-methods/payment-methods.png"></img>
        </div>
      </div>



    </>
  )
}

//get servier side to have the order
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

  const { id } = req.query
  const order = await ordersController.find(id)
  const stringfyOrders = JSON.parse(JSON.stringify(order))
  const user = await db.User.findOne({ where: { email: session.user.email } })
  const profile = JSON.parse(JSON.stringify(user))
  return {
    props: { profile: profile, order: stringfyOrders, currentUser: session?.user || null },
  }
}