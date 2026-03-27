import styles from './QueueActions.module.css'

/**
 * QueueActions
 * Controles de atendimento: próximo cliente e limpar fila.
 */
export default function QueueActions({ filaVazia, onAtender, onLimpar }) {
  return (
    <div className={styles.wrapper}>
      <p className={styles.sectionTitle}>▶ ATENDIMENTO</p>

      <button
        className={`${styles.btn} ${styles.btnGold}`}
        onClick={onAtender}
        disabled={filaVazia}
      >
        ▶ ATENDER PRÓXIMO
      </button>

      <button
        className={`${styles.btn} ${styles.btnRed}`}
        onClick={onLimpar}
        disabled={filaVazia}
      >
        ✕ LIMPAR FILA
      </button>
    </div>
  )
}
