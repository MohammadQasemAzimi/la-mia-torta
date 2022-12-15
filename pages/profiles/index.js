import styles from '../../styles/profile.module.css';
import db from '../../database';
import Navbar from '../../components/Navbar';
//import {getSession, signIn, signOut} from 'next-auth/react'; 
import { getSession } from 'next-auth/react';
import { Input } from 'reactstrap';

export default function getProfile(props) {
  const curUser = props.currentUser
 /*  const [url, setUrl] = useState('')
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
  } */
  //How to add an Avatar END


  const user = props.profile;
  /* console.log('the user is :',user) */
  return (
    <>
      <Navbar curuser={curUser} profile={user}></Navbar>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Change your <span>Profile</span></h2>
          <div className={styles.cardBody}>
            <form method="POST" action={`/api/profiles/${user.id}`}>
           {/*  <div className={styles.formGroup}>
                <label htmlFor="imgUploud" className={styles.label}>First Upload Your <span>Avatar</span> Please </label><br />
                <input type="file" name="imgUploud" className={styles.formControl} id="imgUploud" onChange={handlimgUpload} />
                <input type="hidden" name='imageAvatar' value={url} defaultValue={curUser.imageAvatar}/>
              </div> */}
              <div className={styles.formGroup}>
                <label htmlFor="firstname">First Name</label><br />
                <Input className={styles.formControl} type="text" name='name' id="firstname" defaultValue={user.name} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="lastname">Last Name</label><br />
                <Input className={styles.formControl} name='lastName' id="lastname" type="text" defaultValue={user.lastName} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label><br />
                <Input className={styles.formControl} name='email' id="email" type="email" defaultValue={user.email} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phoneNumber">phoneNumber</label><br />
                <Input className={styles.formControl} name='phoneNumber' id="phoneNumber" type="phoneNumber" defaultValue={user.phoneNumber} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="address">address</label><br />
                <Input className={styles.formControl} name='address' id="address" type="address" defaultValue={user.address} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label><br />
                <Input className={styles.formControl} name='password' id="password" type="password" defaultValue={user.password} />
              </div>
              <div className={styles.formGroup1}>
                <Input className={styles.btn} type="submit" value="Apply" />
                <br />
              </div>
            </form>
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
        destination: `/api/auth/signin?callbackUrl=${process.env.NEXTAUTH_URL}`
        //change the destination default login in to cusotm login
      }
    }
  }
  const user = await db.User.findOne({ where: { email: session.user.email } })
  const stringfyuser = JSON.parse(JSON.stringify(user))
  return {
    props: { profile: stringfyuser, currentUser: session?.user || null },
  }
}
