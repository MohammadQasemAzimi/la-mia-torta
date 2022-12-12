import cakesController from '../../../controllers/cakeController'
import styles from '../../../styles/NewCake.module.css'
import { Input } from 'reactstrap'
import { useState } from 'react'
import Navbar from '../../../components/Navbar';

export default function NewCake({ cake }) {
  const [url, setUrl] = useState(cake.imageUrl)

  const handlimgUpload = async (event) => {
    const file = event.target.files[0]
    const imageForm = new FormData()
    imageForm.append("file", file)
    imageForm.append("upload_preset", "lamiatorta")
    const imgFetch = await fetch("https://api.cloudinary.com/v1_1/dlmrmq1tl/image/upload",
      { method: "POST", body: imageForm }
    )
    const res = await imgFetch.json()
    setUrl(res.secure_url)
  }

  return (
    <>
      <Navbar></Navbar>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}> Edite your cake here</h2>
            <div className={styles.cardBody}>
              <form method="POST" action={`/api/cakes/${cake.id}`}>
                <div className={styles.formGroup}>
                  <label htmlFor="name" className={styles.label}>:</label><br />
                  <Input defaultValue={cake.name} type="text" name='name' className={styles.formControl} id="name" placeholder="Name of the cake" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}></label><br />
                  <Input defaultValue={cake.description} type="text" name='description' className={styles.formControl} id="description" placeholder="Description of the cake" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="price" className={styles.label}></label><br />
                  <Input defaultValue={cake.price} type="text" name="price" className={styles.formControl} id="price" placeholder="Price" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="location" className={styles.label}></label><br />
                  <Input defaultValue={cake.location} type="text" name="location" className={styles.formControl} id="location" placeholder="write your address" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="imageUrl" className={styles.label}>Insert photo:</label><br />
                  <input type="file" name="imageUrllable" className={styles.formControl} id="imageUrl" onChange={handlimgUpload} />
                  <input type="hidden" name='imageUrl' value={url} />
                </div>
                <br />
                <div className={styles.formGroup}>
                  <input type="submit" className={styles.btn} value="Submit" /><br />
                </div>
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
  const cake = await cakesController.find(id)
  return {
    props: { cake },
  }
}
