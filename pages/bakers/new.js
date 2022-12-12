import styles from '../../styles/NewCake.module.css'
import { Input} from 'reactstrap'
import { useState } from 'react'
import Navbar from '../../components/Navbar'
import { getSession } from 'next-auth/react';
import userController from '../../controllers/userController'

export default function NewCake(props) {
  const curUser = props.currentUser
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
    <Navbar curuser={curUser}></Navbar>
      <div className={styles.container}>
        <div className={styles.row}>
          <div className={styles.card}>
            <div className={styles.cardBody}>
              <form method="POST" action="/api/cakes">
              <div className={styles.formGroup}>
                  <label htmlFor="imgUploud" className={styles.label}>Upload Your Cake image </label><br />
                  <input type="file" name="imgUploud" className={styles.formControl} id="imgUploud" onChange={handlimgUpload}/>
                  <input type="hidden" name='imageUrl' value={url} />
                </div>
                <div className={styles.formGroup}>
                  <input type="hidden" name='usersession' value={curUser.email} />
                  <label htmlFor="name" className={styles.label}></label><br />
                  <Input type="text" required name='name' className={styles.formControl} id="name" placeholder="Name of the cake" />
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
  const session = await getSession(req) //await getSession(req)
 
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: `/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`
        //change the destination default login in to cusotm login
      }
    }
  }
  return {
    props: { currentUser: user || null },
  }
}