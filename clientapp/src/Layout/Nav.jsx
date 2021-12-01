import styles from '../styles.module.scss'
import { userAtom } from '../Atoms'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router'


export const Nav = () => {

  const user = useAtom(userAtom)
  const navigate = useNavigate()

  return (
    <div className={styles.navBar}>
      <div style={{ display: 'flex', gap: '80px' }}>
        <div className={styles.appTitle}>DevBoard</div>
        <div className={styles.menuContainer}>
          <div className={styles.menuItem} onClick={() => navigate('/taskboard')}>Task Board</div>
          <div className={styles.menuItem} onClick={() => navigate('/status')}>Status</div>
          <div className={styles.menuItem} onClick={() => navigate('/report')}>Report</div>
        </div>
      </div>
      <div>{`${user[0].FirstName} ${user[0].LastName}`}</div>
    </div>
  )
}