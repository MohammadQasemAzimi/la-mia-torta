import styles from '../../../styles/Select.module.css'
import Navbar from "../../../components/Navbar"
import cakeController from '../../../controllers/cakeController'

export default function oneCake(props) {
  const cakes = props.cake
  console.log('Hello url', cakes)
  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <div className={styles.slidShow}>
          <div className={styles.rowImg}>
            <div className={styles.columnImg1}>
              <img src={cakes.imageUrl} className={styles.cardimg1} />
              <img src={cakes.imageUrl} className={styles.cardimg2} />
              <img src={cakes.imageUrl} className={styles.cardimg3} />
            </div>
            <div className={styles.columnImg2}>
              <img src={cakes.imageUrl} className={styles.cardimg4} />
            </div>
          </div>
          <div className={styles.detailsRow}>
            <div className={styles.detailsCul1}>
              <h1>**{cakes.name}**</h1>
              <h4>{cakes.description}</h4>
              <h4>Address: {cakes.location}</h4>
            </div>
            <div className={styles.detailsCul2}>
              <h4>Price: {cakes.price}$</h4>
              <form method='GET' action='/bakers/orders'>
                <input type="submit" className={styles.button} value="Order"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(req, res) {
  const { id } = req.query
  const cake = await cakeController.find(id)
  return {
    props: { cake },
  }
}
