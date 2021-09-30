import { AiOutlineSend } from 'react-icons/ai';
import Center from '../../Center';
import styles from './form.module.css';

export default function Form() {
  return (
    <form className={styles.form}>
      <Center>
        <input className={styles.input} type="text" />
        <button className={styles.button} type="submit" aria-label="Envoyer le message">
          <Center>
            <AiOutlineSend size={15} color="#fff" />
          </Center>
        </button>
      </Center>
    </form>
  );
}
