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
          url="/videos/scroll-shadow.mp4"
          width="100vw"
          height="100vh"
          playing
          loop="true"
          muted
        />

        <div className={styles.page}>

          <ul>
            {/* WE ARE OVERWAVE */}
            <li> 
              <iframe width="560" height="315" src="https://www.youtube.com/embed/tjZbYRnI6Qs" title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
              </iframe>
            </li>

            <li>
              {/* "WHAT DO YOU KNOW SO FAR?" */}
              <iframe width="560" height="315" src="https://www.youtube.com/embed/e8H_8as12Os" title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
              </iframe>
            </li>

            <li>
              {/* DYNASTY */}
              <iframe width="560" height="315" src="https://www.youtube.com/embed/gFXGHhC0Uio" title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
              </iframe>
            </li>

            <li>
              {/* FAVORITE MISTAKES */}
              <iframe width="560" height="315" src="https://www.youtube.com/embed/vr1hnqVOG_I" title="YouTube video player" frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen>
              </iframe>
            </li>

          </ul>

          



        </div>

        <div className={styles.everythingElse}>

          <nav>
            {/* <h1>overwave industries</h1> */}
            <ul>
              <li><a target="_blank" rel="noreferrer" href="//soundcloud.com/mannyalone">soundcloud</a></li>
              <li><a target="_blank" rel="noreferrer" href="//www.youtube.com/channel/UCFOsmRxAZ9P94fIm9-Ke9lg">youtube</a></li>
            </ul>
            <ul>
              <li><a target="_blank" rel="noreferrer" href="//www.twitch.tv/mannyhyuga_">twitch</a></li>
              <li><Link href="/about">about us</Link></li>
            </ul>
            <ul>
              <li><Link href="/about">manny hyuga</Link></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  )
}
