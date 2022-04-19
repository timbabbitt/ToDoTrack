import styles from '../styles.module.scss'
import { userAtom } from '../Atoms'
import { useAtom } from 'jotai'
import { useNavigate } from 'react-router'
import { Flex, Text } from '../Components/Styles/Base'
import { AppTitle,  } from '../Components/Styles/Specific'


export const Nav = () => {

  const user = useAtom(userAtom)
  const navigate = useNavigate()

  return (
    <Flex justify="space-between">
        <Flex gap='80px'>
        
        <AppTitle>DevBoard</AppTitle>
        <Text size="small" >Test</Text>
        
        <div className={styles.menuContainer}>
          <div className={styles.menuItem} onClick={() => navigate('/taskboard')}>Task Board</div>
          <div className={styles.menuItem} onClick={() => navigate('/status')}>Status</div>
          <div className={styles.menuItem} onClick={() => navigate('/report')}>Report</div>
        </div>
      
      </Flex>
      
      <div>{`${user[0].FirstName} ${user[0].LastName}`}</div>

    </Flex>
  )
}