This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### Desenvolvimento

Para rodar o projeto em modo desenvolvimento:

```bash
# Inicie o servidor Mock (em um terminal)
pnpm mock

# Inicie o Next.js (em outro terminal)
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Build

Para fazer build do projeto localmente:

```bash
# Inicie o Mockoon primeiro
pnpm exec mockoon-cli start --data mockoon-data.json --port 3001 &

# Aguarde 2-3 segundos e execute o build
pnpm build

# Ou use o script integrado
pnpm build:mock
```

> ℹ️ **Por que usar Mockoon?** Durante o build, o Next.js faz chamadas de API para gerar páginas estáticas (SSG/ISR). O Mockoon fornece um servidor de API local evitando dependências de APIs externas que podem ter rate limiting ou problemas de conectividade. Veja [MOCKOON.md](./MOCKOON.md) para mais detalhes.

## Estrutura do Projeto

Este workshop demonstra diferentes estratégias de renderização e data fetching no Next.js:

- **Server Components** - Componentes renderizados no servidor
- **Client Components** - Componentes interativos no cliente
- **SSG** (Static Site Generation) - Geração estática no build
- **SSR** (Server-Side Rendering) - Renderização a cada requisição
- **ISR** (Incremental Static Regeneration) - Revalidação incremental
- **Data Fetching** - Diferentes estratégias de cache (force-cache, no-store, revalidate)

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
