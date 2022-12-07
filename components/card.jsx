import Link from "next/link"
import Image from "next/image"
import styles from '../styles/Home.module.css'

export default function Component({flat}) {
 console.log('image url is ',flat.imageurl)
  return (
    <Link href={`/flats/${flat.id}`}>
      <div className={styles.card} >
        <h1>image</h1>
        <h5>{flat.title}</h5>
        <p>{flat.description}</p>
        <p>{flat.locaiton}</p>
        <p>{`Falt No. ${flat.codeNo}`} {` Price ${flat.price}$ For Night`}</p>
      </div>
    </Link>
  )
}