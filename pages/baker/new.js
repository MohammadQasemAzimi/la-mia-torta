import styles from '../../styles/NewCake.module.css'
import { Input } from 'reactstrap'
import { useState } from 'react'

export default function NewCake(props) {
  const flats = props.flat
  const [url, setUrl] = useState('')
  const handlimgUpload = async (event) => {
    const file = event.target.files[0]
    const imageForm = new FormData()
    imageForm.append("file", file)
    imageForm.append("upload_preset", "rlqse9el")
    const imgFetch = await fetch("https://api.cloudinary.com/v1_1/dlmrmq1tl/image/upload", 
    {method: "POST", body: imageForm}
    )
    const res = await imgFetch.json()
    setUrl(res.secure_url)
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}> <a href="../new">New Cake</a></h2>
            <div className={styles.cardBody}>
              <form method="POST" action="/api/new">
                <div className={styles.formGroup}>
                  <label htmlFor="title" className={styles.label}>Name:</label><br />
                  <Input type="text" name='Name' className={styles.formControl} id="Name" placeholder="Name of the cake" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="description" className={styles.label}>description:</label><br />
                  <Input type="text" name='description' className={styles.formControl} id="description" placeholder="Description of the cake" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="price" className={styles.label}>Price:</label><br />
                  <Input type="number" name="price" className={styles.formControl} id="price" placeholder="Price" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="location" className={styles.label}>Location:</label><br />
                  <Input type="text" name="location" className={styles.formControl} id="location" placeholder="please write the address" />
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="user id" className={styles.label}>User ID:</label><br />
                  <Input type="number" name="user id" className={styles.formControl} id="user id" placeholder="write the user id" />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="imgUploud" className={styles.label}>Insert photo:</label><br />
                  <input type="file" name="imgUploud" className={styles.formControl} id="imgUploud" onChange={handlimgUpload}/>
                  <input type="hidden" name='imageurl' value={url}/>
                </div>
                <br />
                <div lassName={styles.formGroup}>
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