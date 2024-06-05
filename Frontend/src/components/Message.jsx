/* eslint-disable react/prop-types */
import styles from './Message.module.css'

function Message({message}) {
    return (
        <div className={styles.message}>
            {message} 👋
        </div>
    )
}

export default Message
