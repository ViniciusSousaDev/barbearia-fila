import styles from './QueueList.module.css'

/**
 * QueueList
 * Renderiza a fila de espera com destaque para o próximo cliente.
 * Cada card exibe posição, nome, serviço, horário e botão de remoção.
 */
export default function QueueList({ fila, onRemover }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.sectionTitle}>▶ FILA DE ESPERA</p>
        <span className={styles.badge}>{fila.length}</span>
      </div>

      <div className={styles.list}>
        {fila.length === 0 ? (
          <div className={styles.empty}>
            <span>FILA VAZIA</span>
            <span className={styles.emptyHint}>adicione clientes ao lado</span>
          </div>
        ) : (
          fila.map((cliente, index) => (
            <ClientCard
              key={cliente.id}
              cliente={cliente}
              posicao={index + 1}
              isFirst={index === 0}
              onRemover={onRemover}
            />
          ))
        )}
      </div>
    </div>
  )
}

function ClientCard({ cliente, posicao, isFirst, onRemover }) {
  return (
    <div
      className={`${styles.card} ${isFirst ? styles.cardFirst : ''}`}
      style={{ animation: 'slideIn 0.2s ease' }}
    >
      <span className={styles.posicao}>#{posicao}</span>

      <div className={styles.info}>
        <span className={styles.nome}>{cliente.nome.toUpperCase()}</span>
        <span className={styles.servico}>{cliente.servico}</span>
      </div>

      <div className={styles.right}>
        {isFirst && <span className={styles.arrow}>◄</span>}
        <span className={styles.horario}>{cliente.horario}</span>
        <button
          className={styles.removeBtn}
          onClick={() => onRemover(cliente.id)}
          title="Remover da fila"
        >
          ✕
        </button>
      </div>
    </div>
  )
}
