# Parallel Routes - Exemplos

## O que são Parallel Routes?

Parallel Routes é um recurso do Next.js que permite renderizar múltiplas páginas simultaneamente no mesmo layout usando **slots nomeados**. Isso é útil para criar interfaces complexas como dashboards, modais condicionais, e layouts com múltiplas seções independentes.

## Conceitos Principais

### 1. Slots Nomeados

Slots são definidos usando pastas com o prefixo `@`:

```
app/
  parallel-routes/
    layout.tsx          # Layout que recebe os slots
    page.tsx            # Página principal
    @analytics/         # Slot "analytics"
      page.tsx
    @team/              # Slot "team"
      page.tsx
    @notifications/     # Slot "notifications"
      page.tsx
```

### 2. Layout com Props de Slots

O layout recebe cada slot como uma prop:

```tsx
export default function Layout({
  children,
  analytics,
  team,
  notifications,
}: {
  children: React.ReactNode;
  analytics: React.ReactNode;
  team: React.ReactNode;
  notifications: React.ReactNode;
}) {
  return (
    <div>
      {children}
      {analytics}
      {team}
      {notifications}
    </div>
  );
}
```

### 3. Páginas Default

Cada slot deve ter um arquivo `default.tsx` que é renderizado quando não há uma página específica para a rota atual:

```tsx
// @analytics/default.tsx
export default function AnalyticsDefault() {
  return <div>Analytics padrão</div>;
}
```

## Exemplos no Projeto

### 1. Dashboard com Slots (`/parallel-routes`)

Demonstra um dashboard com três seções independentes:
- **@analytics**: Estatísticas e métricas
- **@team**: Lista de membros da equipe
- **@notifications**: Feed de notificações

**Recursos demonstrados:**
- Slots nomeados
- Loading states independentes
- Navegação entre rotas mantendo os slots
- Páginas default

### 2. Modal com Intercepting Routes (`/parallel-modal`)

Implementa uma galeria de fotos com modal usando a combinação de Parallel Routes + Intercepting Routes:

**Estrutura:**
```
parallel-modal/
  layout.tsx
  page.tsx
  @modal/
    default.tsx
    (.)photo/[id]/    # Intercepting route
      page.tsx
  photo/[id]/         # Rota real
    page.tsx
```

**Comportamento:**
- Ao clicar em uma foto: abre em um modal (intercepting route)
- Ao recarregar a página: mostra a página completa da foto
- Navegação suave sem perder o contexto da galeria

## Casos de Uso Comuns

1. **Dashboards**: Renderizar múltiplas seções (analytics, notificações, etc.) em paralelo
2. **Modais**: Combinar com Intercepting Routes para modais que funcionam como páginas
3. **Layouts Condicionais**: Mostrar/ocultar seções baseado na rota
4. **A/B Testing**: Renderizar versões diferentes de uma seção
5. **Multi-tenancy**: Renderizar diferentes interfaces baseado no tenant

## Vantagens

✅ **Organização**: Cada slot tem sua própria estrutura de pastas
✅ **Loading States**: Cada slot pode ter seu próprio loading.tsx
✅ **Error Boundaries**: Cada slot pode ter seu próprio error.tsx
✅ **Independência**: Slots podem navegar independentemente
✅ **SEO**: Tudo renderizado no servidor

## Recursos Relacionados

- [Next.js Docs - Parallel Routes](https://nextjs.org/docs/app/building-your-application/routing/parallel-routes)
- [Next.js Docs - Intercepting Routes](https://nextjs.org/docs/app/building-your-application/routing/intercepting-routes)

## Executar os Exemplos

```bash
npm run dev
```

Depois acesse:
- http://localhost:3000/parallel-routes - Dashboard com slots
- http://localhost:3000/parallel-modal - Galeria com modal
