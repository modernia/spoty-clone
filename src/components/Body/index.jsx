import React, { useEffect, useState } from 'react'
import { useRecoilValue } from 'recoil'
import SpotifyWebApi from 'spotify-web-api-js'

import { tokenState } from '../../recoil/atoms'
import Item from './Item'
import styles from './styles.module.css'

const s = new SpotifyWebApi()

export default function Body () {
  const [playlist, setPlaylist] = useState(null)
  const token = useRecoilValue(tokenState)

  useEffect(() => {
    if (token) {
      s.setAccessToken(token)
      s.getPlaylist('5otnenTFjTS5PtJKAoRjYP').then(data => {
        setPlaylist(data)
      })
    }
  }, [])

  return (
    <div className={styles.body__header}>
      {playlist && (
        <Item
          title={playlist.name}
          image={playlist.images[0].url}
          description={playlist.description}
        />
      )}
    </div>
  )
}
