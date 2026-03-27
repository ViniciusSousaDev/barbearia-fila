import styles from './StatsBar.module.css'

/**
 * StatsBar
 * Exibe os três contadores principais no topo do painel.
 */
export default function StatsBar({ total, atendidos, proximo }) {
  return (
    <div className={styles.grid}>
      <Stat numero={total}     label="NA FILA"    destaque={total > 0} />
      <Stat numero={atendidos} label="ATENDIDOS"  />
      <Stat texto={proximo}    label="PRÓXIMO"    destaque={!!proximo} />
    </div>
  )
}

function Stat({ numero, texto, label, destaque }) {
  return (
    <div className={`${styles.stat} ${destaque ? styles.destaque : ''}`}>
      <span className={styles.valor}>
        {texto ?? numero}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  )
}
