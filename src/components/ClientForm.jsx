import { useState } from 'react'
import styles from './ClientForm.module.css'

const SERVICOS = [
  'Corte de Cabelo',
  'Corte de Barba e Cabelo',
  'Barba',
  'Sobrancelha',
  'Luzes',
  'Pézinho',
]

/**
 * ClientForm
 * Formulário de inserção de novo cliente na fila.
 */
export default function ClientForm({ onAdicionar }) {
  const [nome, setNome] = useState('')
  const [servico, setServico] = useState('')
  const [erro, setErro] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!nome.trim()) { setErro('Informe o nome!'); return }
    if (!servico)      { setErro('Escolha um serviço!'); return }
    setErro('')
    onAdicionar(nome, servico)
    setNome('')
    setServico('')
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <p className={styles.sectionTitle}>▶ NOVO CLIENTE</p>

      <input
        className={styles.input}
        type="text"
        placeholder="Nome do cliente"
        value={nome}
        maxLength={24}
        onChange={e => { setNome(e.target.value); setErro('') }}
      />

      <select
        className={styles.select}
        value={servico}
        onChange={e => { setServico(e.target.value); setErro('') }}
      >
        <option value="">-- SERVIÇO --</option>
        {SERVICOS.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      {erro && <p className={styles.erro}>⚠ {erro}</p>}

      <button className={`${styles.btn} ${styles.btnGreen}`} type="submit">
        + INSERIR NA FILA
      </button>
    </form>
  )
}
