import React from 'react'

import styles from './AdminPage.module.scss'

export default function Admin() {
  return (
    <div className={styles['admin-screen']}>
      <div className={styles['admin-container']}>
        <p className={styles['admin-header']}>
          Chào mừng admin HoengHoeng
        </p>

      </div>
    </div>
  )
}
