import styles from "../styles/Navbar.module.css";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function navBar(props) {
    const curUser = props.currentUser
    const userProfile = props.profile
    console.log("userProfileeeeeeeeeeeee", userProfile, props)
    return (
        <>
            <div className={styles.container}>
                <nav className={styles.nav}>
                    <div >
                        <Link href="/" ><Image src="https://res.cloudinary.com/dlmrmq1tl/image/upload/v1670770166/LaMiaTorta/logo-withoutBG_sbnqri.png" height="200" width="200" alt="logo" className={styles.navBranding} /></Link>
                    </div>
                    <ul className={styles.navMenu}>
                        <li className={styles.navItem}>
                            <Link href="/" className={styles.navLink}>Home</Link>
                        </li>
                        <li className={styles.navItem}>
                            <div className={styles.dropdown}>
                                <button className={styles.dropbtn}>My Account
                                    <i className="fa fa-caret-down">   ▼</i>
                                </button>
                                <div className={styles.dropdownContent}>
                                    <Link href="/bakers">My Cakes</Link>
                                    <Link href="/bakers/new">Add New Cake</Link>
                                    <Link href="/bakers/orders">My Orders</Link>
                                    <Link href="/profiles/orders">My Requests</Link>
                                    <Link href="/profiles">Edit Profile</Link>
                                    <Link href="/" onClick={() => signOut()} value="action">Log out</Link>
                                </div>
                            </div>
                        </li>
                        <li className={styles.navItem}>
                            <Link href="/profiles" className={styles.navLink}>{userProfile.name}</Link>
                        </li>
                        <li className={styles.navItem}>
                            <div className={styles.avatar}>
                                <Link href="/profiles" >
                                    {userProfile.imageAvatar ?
                                        <Image className={styles.imageAvatar} src={userProfile.imageAvatar}
                                            height={200} width={200} alt="imageAvatar" /> :
                                        <Image className={styles.imageAvatar}
                                            src="https://res.cloudinary.com/dlmrmq1tl/image/upload/v1671093352/LaMiaTorta/yvg4zaxrmu7mexgufpgo.png"
                                            height={200} width={200} alt="imageAvatar" />
                                    }
                                </Link>
                            </div>
                        </li>
                    </ul>
                    <div className={styles.hamburger}>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                        <span className={styles.bar}></span>
                    </div>
                </nav>
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
