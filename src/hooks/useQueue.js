import { useState, useCallback } from 'react'

let _nextId = 1

/**
 * useQueue
 * Encapsula toda a lógica da fila circular de clientes.
 * Retorna o estado e as ações disponíveis.
 */
export function useQueue() {
  const [fila, setFila] = useState([])
  const [atendidos, setAtendidos] = useState(0)
  const [historico, setHistorico] = useState([])

  const adicionarCliente = useCallback((nome, servico) => {
    const novoCliente = {
      id: _nextId++,
      nome: nome.trim(),
      servico,
      horario: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
    }
    setFila(prev => [...prev, novoCliente])
  }, [])

  const atenderProximo = useCallback(() => {
    setFila(prev => {
      if (prev.length === 0) return prev
      const [atendido, ...resto] = prev
      setAtendidos(n => n + 1)
      setHistorico(h => [
        { ...atendido, atendidoEm: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) },
        ...h,
      ])
      return resto
    })
  }, [])

  const removerCliente = useCallback((id) => {
    setFila(prev => prev.filter(c => c.id !== id))
  }, [])

  const limparFila = useCallback(() => {
    setFila([])
  }, [])

  return {
    fila,
    atendidos,
    historico,
    adicionarCliente,
    atenderProximo,
    removerCliente,
    limparFila,
  }
}
