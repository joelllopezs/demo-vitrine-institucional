# VIA MINEIRA — Site + Painel (demonstração)

React + TypeScript + Vite + Tailwind CSS + React Router + Zustand + Lucide.
**Somente frontend**: sem backend, API ou banco de dados. Dados em `localStorage`.

## Rodar
```bash
npm install
npm run dev      # desenvolvimento
npm run build    # produção (pasta dist)
```

## Deploy na Vercel
Importe o repositório; framework **Vite**. O `vercel.json` já faz o rewrite de SPA (necessário para `/admin`).

## Acesso ao painel
`/admin` (ou link "Área administrativa" no rodapé). Usuário `admin` · Senha `123456`.
Login simulado no navegador: **não é seguro** e os dados ficam só no navegador de quem usa.

## Estrutura
- `src/store.ts` — estado global (Zustand + persist em localStorage, sincroniza entre abas)
- `src/data/seed.ts` — dados iniciais · `src/data/images.ts` — **todas as URLs de imagens (troque aqui)**
- `src/components/site/*` — seções da vitrine · `src/pages/admin/*` — painel

## Imagens
As fotos vêm do Unsplash por URL e cada uma tem fallback automático. Se alguma não combinar com o prato,
troque a URL em `src/data/images.ts` ou pelo próprio painel (URL ou upload local).
Uploads são redimensionados e ficam no localStorage (limite do navegador ~5 MB).
