import Link from "next/link"
import Image from "next/image"
import styles from "../styles/UpdateCard.module.css";

export default function Component({ cake }) {
  console.log('image url is ', cake.imageurl)
  return (
    <Link href={`/cakes/${cake.id}`}>
      <div className={styles.card} >
        <div className={styles.cardimg}>
          <Image alt="cake image" height={100} width={100} src={cake.imageUrl}/>
        </div>
        <div className={styles.cardDetails}>
          <h5>{cake.name}</h5>
          <p>{cake.description}</p>
          <p>{cake.location}</p>
          <p>{cake.price}</p>
          <Link className={styles.button} href={`/cakes/${cake.id}/edit`}>Edit</Link>
          <Link className={styles.Delete} href="#">Delete</Link>

        </div>

      </div>
    </Link>
  )
}