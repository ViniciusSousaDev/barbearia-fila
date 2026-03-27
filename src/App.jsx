import { useQueue } from './hooks/useQueue'
import { useToast } from './hooks/useToast'
import StatsBar     from './components/StatsBar'
import ClientForm   from './components/ClientForm'
import QueueActions from './components/QueueActions'
import QueueList    from './components/QueueList'
import Toast        from './components/Toast'
import styles       from './App.module.css'

/**
 * App
 * Componente raiz — orquestra o estado global e conecta os filhos.
 */
export default function App() {
  const {
    fila, atendidos, adicionarCliente,
    atenderProximo, removerCliente, limparFila,
  } = useQueue()

  const { toast, showToast } = useToast()

  function handleAdicionar(nome, servico) {
    adicionarCliente(nome, servico)
    showToast(`${nome.split(' ')[0].toUpperCase()} ADICIONADO!`, 'success')
  }

  function handleAtender() {
    if (fila.length === 0) return
    const nome = fila[0].nome
    atenderProximo()
    showToast(`ATENDENDO: ${nome.toUpperCase()}`)
  }

  function handleLimpar() {
    if (fila.length === 0) return
    limparFila()
    showToast('FILA LIMPA!', 'error')
  }

  const nomeProximo = fila.length > 0
    ? fila[0].nome.split(' ')[0].toUpperCase()
    : '—'

  return (
    <div className={styles.screen}>

      {/* ── Cabeçalho ── */}
      <header className={styles.header}>
        <h1 className={styles.title}>✂ SISTEMA DE FILA</h1>
        <p className={styles.subtitle}>BARBEARIA</p>
      </header>

      {/* ── Stats ── */}
      <StatsBar
        total={fila.length}
        atendidos={atendidos}
        proximo={nomeProximo}
      />

      {/* ── Conteúdo principal ── */}
      <div className={styles.grid}>

        {/* Coluna esquerda: formulário + ações */}
        <div>
          <ClientForm onAdicionar={handleAdicionar} />
          <QueueActions
            filaVazia={fila.length === 0}
            onAtender={handleAtender}
            onLimpar={handleLimpar}
          />
        </div>

        {/* Coluna direita: fila de espera */}
        <QueueList fila={fila} onRemover={removerCliente} />

      </div>

      {/* ── Notificação ── */}
      <Toast toast={toast} />

    </div>
  )
}
