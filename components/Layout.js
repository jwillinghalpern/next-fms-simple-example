import Head from 'next/head';
import Image from 'next/image';
import styles from './Layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';
import React, { useRef } from 'react';

const name = 'Josh';
export const siteTitle = 'NextJS + fms-api-client';

export default function Layout({ children, home }) {
  const headerRef = useRef(null);

  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="description"
          content="Learn how to build a personal website using Next.js"
        />
        <meta
          property="og:image"
          content={`https://og-image.now.sh/${encodeURI(
            siteTitle
          )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
        />
        <meta name="og:title" content={siteTitle} />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <header ref={headerRef} className={styles.header}>
        <nav className={styles.nav}>
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/contacts?page=1">
            <a>Contacts</a>
          </Link>
        </nav>
        {home && (
          <>
            <Image
              priority
              src="/images/profile.jpg"
              className={utilStyles.borderCircle}
              height={144}
              width={144}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        )}
      </header>
      <main>{children}</main>
    </div>
  );
}
