import Link from "next/link"
import styles from "../styles/Navbar.module.css"
//import { Menu } from '@headlessui/react'
import React from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";

export default function Component({ curuser }) {

    return (<div>
        {/* {console.log('the user in navbar is', curuser.props.children)} */}

        <nav className={styles.navbar}>
            <div className={styles.logo}>
                <Image src='https://tse1.mm.bing.net/th?id=OIP.qOt_5rWJneT6ZgdY57duVwHaFj&pid=Api&rs=1&c=1&qlt=95&w=143&h=107'
                 alt="Picture of the logo" width={50} height={50} 
                className={styles.navlogo}/>
            </div>
            <div className={styles.navlink}>
                <Link href={`/`}>
                    <h4 className={styles.Home}>Home</h4>
                </Link>
            </div>
          
            <div lassName={styles.navlink}>
                <Link href={`/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F`}>
                    {curuser ?
                    <h4 className={styles.profile}>Sign In</h4>:signIn                       
                    }
                </Link>
            </div>
        </nav>
    </div>
    )
}