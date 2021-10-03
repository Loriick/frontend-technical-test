import { useEffect } from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import Center from '../../Center';
import styles from './form.module.css';

type FormProps = {
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

export default function Form({
  message,
  handleChange,
  handleSubmit,
}: FormProps) {
  
  return (
    <form data-testid="form" className={styles.form} onSubmit={handleSubmit}>
      <Center>
        <input
          className={styles.input}
          type="text"
          onChange={handleChange}
          value={message}
          aria-label="Taper message"
          placeholder="Envoyer un message"
        />
        <button
          className={styles.button}
          type="submit"
          aria-label="Envoyer le message"
          disabled={message === ''}
        >
          <Center>
            <AiOutlineSend size={15} color="#fff" />
          </Center>
        </button>
      </Center>
    </form>
  );
}
