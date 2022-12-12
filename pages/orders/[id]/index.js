import Navbar from '../../../components/Navbar'
import styles from '../../../styles/Payment.module.css'
import ordersController from '../../../controllers/orderController'
export default function Order (props) {
    const order = props.order
    
    return (
        <>
        <Navbar></Navbar>
        <h2 className= {styles.payment}>Confirm and Pay for your Chosen Cake... </h2>
            <h3 className={styles.summary}>Order Summary</h3>

        <form method='POST' action={`/api/orders/${order.id}/confirm`}>
        <div className= {styles.details}>
            <h4>orderID#{order.id}</h4>
            {/* <h4>cake is:{order.Cake.name}</h4> */}
            <h4>status: {order.status}</h4>
            <input type="submit" className={styles.button} value="Confirm"/>
        </div>
        </form>    
        </>
    )
}

export  async function getServerSideProps(req, res) {
   
    const { id } = req.query
    const order = await ordersController.find(id);
    const stringifyorder = JSON.parse(JSON.stringify(order))
    return {
        props: { order:stringifyorder },
    }

  } 
 