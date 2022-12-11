import styles from '../../styles/NewCake.module.css'
import { Input } from 'reactstrap'
import { useState } from 'react'
import Navbaker from '../../components/Navbaker'

export default function NewCake(props) {
  const [url, setUrl] = useState('')
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
      <Navbaker></Navbaker>
      <div className={styles.background}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.card}>
              <h2 className={styles.cardTitle}> <a href="../new">New Cake</a></h2>
              <div className={styles.cardBody}>
                <form method="POST" action="/api/cakes">
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}></label><br />
                    <Input type="text" name='name' className={styles.formControl} id="name" placeholder="Name of the cake" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="description" className={styles.label}></label><br />
                    <Input type="text" name='description' className={styles.formControl} id="description" placeholder="Description of the cake" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="price" className={styles.label}></label><br />
                    <Input type="text" name="price" className={styles.formControl} id="price" placeholder="Price" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="location" className={styles.label}></label><br />
                    <Input type="text" name="location" className={styles.formControl} id="location" placeholder="address" />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="imgUploud" className={styles.label}>Upload Your Cake image </label><br />
                    <input type="file" name="imgUploud" className={styles.formControl} id="imgUploud" onChange={handlimgUpload} />
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
      </div>
    </>
  )
}