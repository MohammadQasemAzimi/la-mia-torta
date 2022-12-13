import Link from "next/link"
import styles from "../styles/Card.module.css";

export default function Component({ cake }) {
  return (
    <>
      <div className={styles.card} >
        <div className={styles.cardimg}>
          <img src={cake.imageUrl} className={styles.cardimg1} alt="cardImage"/>
        </div>
        <div className={styles.cardDetails}>
          <div className={styles.topDetails}>
            <h5>{cake.name}</h5>
            <p className={styles.description}>{cake.description}</p>
            <h6>{cake.location}</h6>
            <h6>{cake.price}$</h6>
          </div>
          <div className={styles.downDetails}>
            <a href={`/cakes/${cake.id}`} className={styles.selectOne} >
              <div className={styles.button}>Select</div>
            </a>
          </div>
        </div>
      </div>
    </>
  )
}