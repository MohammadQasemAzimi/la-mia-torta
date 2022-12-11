import Navbar from '../../components/navcustomer'
import styles from '../../styles/Payment.module.css'
import ordercontroller from '../../controllers/orderController'

export default function payment (props) {
    const order = props.orders
    console.log(order)
    return (
        <>
        <Navbar></Navbar>
        <h2 className= {styles.payment}>Thankyou for your Orders</h2>
        <div>
            <img className={styles.giftbox} src='https://www.creativefabrica.com/wp-content/uploads/2020/11/17/Christmas-Present-Gift-Box-Asset-Vector-Graphics-6658356-2-580x387.jpg'/>
        </div>
        <div className= {styles.details}>
            <h3 className={styles.summary}>Order Summary</h3>
            <h1>{order.UserId}</h1>
            <h4>{order.CakeId}</h4>
            <h4>{order.status}</h4>
            
        </div>
        </>
    )
}

export  async function getServerSideProps(req, res) {
    // select the order by id 
    //select the cake
    //pass as props 
    const orders = await ordercontroller.all();
    return {
      props: { orders },
    }
  }
