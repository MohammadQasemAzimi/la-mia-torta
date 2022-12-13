import Link from "next/link"
import Image from "next/image"
import styles from "../styles/UpdateCard.module.css";

export default function Component({ cake }) {
  return (

    <div className={styles.card} >
      <div className={styles.cardimg}>
        <img src={cake.imageUrl} className={styles.cardimg1} />
      </div>
      <div className={styles.cardDetails}>
        <div className={styles.topDetails}>
          <h5>{cake.name}</h5>
          <p>{cake.description}</p>
          <p>{cake.location}</p>
          <p>{cake.price}</p>
        </div>
        <div className={styles.downDetails}>
          <div className={styles.selectOne} >
            <Link className={styles.Edit} href={`/cakes/${cake.id}/edit`}>Edit</Link>
          </div>
          <div className={styles.selectOne} >
            <Link className={styles.Delete} href={`/api/cakes/${cake.id}/delete`}>Delete</Link>
          </div>
        </div>
      </div>
    </div>
  )
}