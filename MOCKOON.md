# 🚀 Usando Mockoon para Mock de APIs

Este projeto usa o [Mockoon](https://mockoon.com/) para fornecer um servidor de API local durante o desenvolvimento e build, evitando dependências de APIs externas.

## 📋 Por que usar Mockoon?

Durante o build do Next.js, algumas páginas fazem chamadas de API para gerar conteúdo estático (SSG/ISR). Usar APIs externas pode causar problemas:

- ⚠️ **Rate limiting**: APIs públicas podem bloquear requisições excessivas
- 🌐 **Problemas de rede**: Builds falham se não houver conexão com a internet
- ⚡ **Performance**: API local é muito mais rápida
- 🔒 **Confiabilidade**: Controle total sobre os dados mockados

## 🛠️ Configuração

### 1. Dependências

O Mockoon CLI já está instalado como devDependency:

```json
{
  "devDependencies": {
    "@mockoon/cli": "^9.5.0"
  }
}
```

### 2. Arquivo de Configuração

O arquivo [`mockoon-data.json`](./mockoon-data.json) contém todas as rotas mockadas:

- **Posts** (JSONPlaceholder compatible): `/posts`, `/posts/:id`
- **Users** (JSONPlaceholder compatible): `/users`, `/users/:id`
- **Products** (DummyJSON compatible): `/products`, `/products/:id`
- **Quotes** (DummyJSON compatible): `/quotes/random`, `/quotes/:id`

### 3. Variáveis de Ambiente

O projeto usa a variável `API_URL` para determinar qual API usar:

**`.env.local`** (desenvolvimento/build local):
```env
API_URL=http://localhost:3001
```

**`.env.production`** (produção):
```env
API_URL=https://jsonplaceholder.typicode.com
```

## 🚀 Como Usar

### Desenvolvimento

1. **Inicie o Mockoon** em um terminal:
```bash
pnpm mock
```

2. **Inicie o Next.js** em outro terminal:
```bash
pnpm dev
```

### Build Local

Para fazer build usando o Mockoon:

```bash
# Terminal 1: Inicie o Mockoon
pnpm exec mockoon-cli start --data mockoon-data.json --port 3001 &

# Aguarde 2-3 segundos para o Mockoon iniciar

# Terminal 2: Execute o build
pnpm build
```

Ou use o script integrado:

```bash
pnpm build:mock
```

### Verificar se o Mockoon está funcionando

```bash
# Testar rota de posts
curl 'http://localhost:3001/posts?_limit=2'

# Testar rota de produtos
curl 'http://localhost:3001/products/1'

# Testar rota de quotes
curl 'http://localhost:3001/quotes/random'
```

## 📝 Adicionando Novas Rotas

Para adicionar novas rotas mockadas, edite o arquivo `mockoon-data.json`:

```json
{
  "uuid": "nova-rota",
  "documentation": "Descrição da rota",
  "method": "get",
  "endpoint": "sua-rota/:parametro",
  "responses": [
    {
      "uuid": "resposta",
      "statusCode": 200,
      "label": "Success",
      "headers": [
        {
          "key": "Content-Type",
          "value": "application/json"
        }
      ],
      "body": "{\"seu\": \"json\"}"
    }
  ]
}
```

**Dica**: Use parâmetros dinâmicos com helpers do Mockoon:
```json
"body": "{\"id\": {{urlParam 'id' '1'}}}"
```

## 🎯 Rotas Mockadas Atualmente

### JSONPlaceholder (Posts e Users)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/posts` | Lista de 10 posts |
| GET | `/posts/:id` | Post específico por ID |
| GET | `/users` | Lista de users |
| GET | `/users/:id` | User específico por ID |

### DummyJSON (Products e Quotes)

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/products` | Lista de produtos |
| GET | `/products/:id` | Produto específico por ID |
| GET | `/quotes/random` | Quote aleatória |
| GET | `/quotes/:id` | Quote específica por ID |

## 🔧 Solução de Problemas

### Porta 3001 já em uso

```bash
# Encontre o processo usando a porta
lsof -i :3001

# Mate o processo
kill -9 <PID>
```

### Build falha com "fetch failed"

1. Verifique se o Mockoon está rodando: `pnpm mock`
2. Teste as rotas com curl
3. Verifique a variável `API_URL` no `.env.local`

### Mockoon não inicia

```bash
# Reinstale a dependência
pnpm add -D @mockoon/cli

# Ou usando npx
npx mockoon-cli start --data mockoon-data.json --port 3001
```

## 📚 Recursos

- [Documentação oficial do Mockoon](https://mockoon.com/docs/latest/about/)
- [Mockoon CLI](https://mockoon.com/cli/)
- [Templating com Mockoon](https://mockoon.com/docs/latest/templating/overview/)
