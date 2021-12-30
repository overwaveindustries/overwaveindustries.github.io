import React, { useState } from 'react';

import Link from 'next/link'

import styles from '../styles/Home.module.css'

import ReactPlayer from 'react-player'

export default function Home() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <div className={styles.homeContainer}>
      <div className={styles.introContainer} style={{
        display: showIntro ? "flex" : "none",
      }}>
        <ReactPlayer
          url="/videos/falling-v2b-21-intro.mp4"
          width="100vw"
          height="100vh"
          onEnded={_ => setShowIntro(false)}
          playing
          muted
        />
      </div>
      <div className={styles.videoBackground} style={{
        display: showIntro ? "none" : "flex",
      }}>
        <ReactPlayer
          url="/videos/logo-scrolling-basic.mp4"
          width="100vw"
          height="100vh"
          playing
          loop
          muted
        />
        <div className={styles.everythingElse}>
          <nav>
            <h1>overwave industries</h1>
            <ul>
              <li><a href="//twitter.com">twitter</a></li>
              <li><a href="//soundcloud.com">soundcloud</a></li>
              <li><a href="//youtube.com">youtube</a></li>
            </ul>
            <ul>
              <li><Link href="/about">about us</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
