import styles from '../../styles.module.scss'

export const TextInput = ({ name, placeholder, label }) => {

  return (
    <div className={styles.inputContainer}>
      <label className={styles.inputLabel}>{label}</label>
      <input className={styles.textInput} type="text" name={name} placeholder={placeholder} />
    </div>
  )
}