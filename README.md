# ✂ Sistema de Fila para Barbearia

<div align="center">

**Sistema de gerenciamento de fila de espera para barbearias com interface pixel art.**

[![Deploy](https://img.shields.io/badge/deploy-vercel-black?style=flat&logo=vercel)](https://barbearia-fila.vercel.app)
[![React](https://img.shields.io/badge/React-18-61dafb?style=flat&logo=react)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?style=flat&logo=vite)](https://vitejs.dev)

🔗 **Demo ao vivo:** [https://barbearia-fila.vercel.app/](https://barbearia-fila.vercel.app/)
&nbsp;|&nbsp;
💻 **Repositório:** [https://github.com/ViniciusSousaDev/barbearia-fila](https://github.com/ViniciusSousaDev/barbearia-fila)

</div>

---

## Sobre o projeto

Este projeto nasceu da evolução de um trabalho acadêmico escrito em **C** — um sistema de fila de espera com estruturas de dados, fila circular e alocação manual de memória, rodando inteiramente no terminal.

O desafio foi reescrever a mesma lógica em **React**, criar uma interface gráfica fiel à identidade visual pixel art do projeto e publicar na web para que qualquer pessoa possa acessar.

O resultado: um sistema funcional, com visual memorável e deploy contínuo no Vercel.

---

## Funcionalidades

- ✂ Inserir clientes na fila com **nome** e **tipo de serviço**
- ▶ Atender o próximo cliente na **ordem de chegada** (FIFO)
- ✕ Remover um cliente específico da fila
- 🗑 Limpar toda a fila de uma vez
- 📊 Contadores em tempo real: clientes na fila, atendidos e próximo
- 🕐 Horário de entrada registrado para cada cliente
- Interface **pixel art** responsiva com notificações animadas

---

## Serviços disponíveis

| # | Serviço                 |
|---|-------------------------|
| 1 | Corte de Cabelo         |
| 2 | Corte de Barba e Cabelo |
| 3 | Barba                   |
| 4 | Sobrancelha             |
| 5 | Luzes                   |
| 6 | Pézinho                 |

---

## Tecnologias

| Camada      | Stack                                |
|-------------|--------------------------------------|
| Framework   | React 18                             |
| Build tool  | Vite 5                               |
| Estilização | CSS Modules + variáveis CSS          |
| Tipografia  | Press Start 2P (Google Fonts)        |
| Deploy      | Vercel (CI/CD automático via GitHub) |

---

## Estrutura do projeto

```
barbearia-fila/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx                  # Ponto de entrada da aplicação
    ├── App.jsx                   # Componente raiz — orquestra o estado
    ├── App.module.css
    ├── index.css                 # Reset, tokens CSS e animações globais
    │
    ├── hooks/
    │   ├── useQueue.js           # Toda a lógica da fila (FIFO)
    │   └── useToast.js           # Notificações temporárias
    │
    └── components/
        ├── StatsBar.jsx          # Contadores: na fila / atendidos / próximo
        ├── StatsBar.module.css
        ├── ClientForm.jsx        # Formulário de inserção de cliente
        ├── ClientForm.module.css
        ├── QueueActions.jsx      # Botões: atender próximo / limpar fila
        ├── QueueActions.module.css
        ├── QueueList.jsx         # Lista visual da fila de espera
        ├── QueueList.module.css
        ├── Toast.jsx             # Notificação pixel art animada
        └── Toast.module.css
```

---

## Decisões de arquitetura

### Custom hooks para separar responsabilidades

Toda a lógica de negócio foi isolada em hooks, deixando os componentes responsáveis apenas pela apresentação:

```js
// hooks/useQueue.js
export function useQueue() {
  const [fila, setFila] = useState([])
  const [atendidos, setAtendidos] = useState(0)

  const adicionarCliente = useCallback((nome, servico) => {
    setFila(prev => [...prev, {
      id: _nextId++,
      nome,
      servico,
      horario: new Date().toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }])
  }, [])

  const atenderProximo = useCallback(() => {
    setFila(prev => {
      if (prev.length === 0) return prev
      const [, ...resto] = prev
      setAtendidos(n => n + 1)
      return resto
    })
  }, [])

  return { fila, atendidos, adicionarCliente, atenderProximo, removerCliente, limparFila }
}
```

### Da struct em C para o hook em React

O projeto original usava uma `struct FilaEspera` com ponteiros e alocação manual:

```c
// versão original em C
typedef struct FilaEspera {
  Cliente **elementos;
  int inicio, fim, tamanho;
} FilaEspera;

void adicionarCliente(FilaEspera *fila, char *nome, char *tipo_corte) {
  Cliente *novo = (Cliente *)malloc(sizeof(Cliente));
  novo->nome_cliente = strdup(nome);
  fila->fim = (fila->fim + 1) % 100;
  fila->elementos[fila->fim] = novo;
  fila->tamanho++;
}
```

A lógica é exatamente a mesma — só muda a linguagem e a camada de gerenciamento de memória.

### CSS Modules + variáveis CSS

Cada componente tem seu próprio arquivo `.module.css`, sem conflito de classes. Os tokens visuais ficam centralizados em `index.css`:

```css
:root {
  --color-gold:      #f5a623;
  --color-gold-dark: #c17d0a;
  --color-surface:   #1a1a1a;
  --font-pixel:      'Press Start 2P', monospace;
}
```

---

## Como rodar localmente

**Pré-requisito:** Node.js 18+

```bash
# 1. Clonar o repositório
git clone https://github.com/ViniciusSousaDev/barbearia-fila.git
cd barbearia-fila

# 2. Instalar dependências
npm install

# 3. Rodar em desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`

---

## Build e deploy

```bash
# Gerar build de produção
npm run build

# Pré-visualizar o build localmente
npm run preview
```

O deploy é feito automaticamente no **Vercel** a cada `git push` na branch `main`.
O Vercel detecta o Vite automaticamente — nenhuma configuração extra é necessária.

```bash
# Deploy manual via CLI (opcional)
npm install -g vercel
vercel
```

---

## Origem do projeto

O código original em C está disponível em [`main.c`](./main.c) na raiz do repositório.
Para compilar e rodar a versão de terminal:

```bash
gcc -std=c99 -Wall -Wextra main.c -o fila_barbearia
./fila_barbearia
```

---

## Próximas etapas

- [x] Lógica de fila em C (terminal)
- [x] Interface web com React + Vite
- [x] Deploy na Vercel com CI/CD
- [ ] Autenticação com Node.js + JWT
- [ ] Painel exclusivo para o barbeiro
- [ ] View do cliente com posição em tempo real via Socket.io
- [ ] Deploy do backend no Railway

---

## Autor

Feito por **[Vinícius Soares de Sousa](https://github.com/viniciussousadev)** — sinta-se à vontade para abrir issues ou contribuir.
