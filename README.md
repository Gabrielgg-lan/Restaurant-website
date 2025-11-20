# Português 
# Burger Joint Menu

Um aplicativo de menu responsivo para uma hamburgueria, construído com React, TypeScript e Vite.

Features / Recursos

📱 Design responsivo — funciona em dispositivos móveis e desktop

🖨️ Formato A4 pronto para impressão

🛒 Carrinho interativo

📸 Carregamento otimizado de imagens com fallbacks

💅 Estilo moderno e limpo

🔍 Desenvolvimento com segurança de tipos usando TypeScript

Desenvolvimento

Instale as dependências:

npm install


Inicie o servidor de desenvolvimento:

npm run dev


O site estará disponível em: http://localhost:5173

Build para Produção

Gerar build de produção:

npm run build


Visualizar o build de produção:

npm run preview

Estrutura do Projeto

/src — Código-fonte

/assets — Arquivos estáticos

/images — Imagens do menu e definições de tipos

/bebidas — Imagens de bebidas

/comidas — Imagens de comidas

/sobremesas — Imagens de sobremesas

/styles — Estilos CSS

/types — Definições de tipos TypeScript

App.tsx — Componente principal da aplicação

main.tsx — Ponto de entrada da aplicação

Suporte a TypeScript

O projeto utiliza TypeScript para uma experiência de desenvolvimento aprimorada:

Verificação completa de tipos para componentes React

Interfaces para estruturas de dados do menu

Imports de imagem seguros com fallbacks

Tipos documentados para melhor manutenção

Principais Definições de Tipos

MenuData — Estrutura completa do menu

MenuItem — Propriedades de cada item do menu

MenuImages — Mapeamento de caminhos de imagens por categoria

Interfaces de props para desenvolvimento com segurança de tipos

Manipulação de Imagens

As imagens passam por várias etapas:

Desenvolvimento: Servidas diretamente de /src/assets/images

Build: Otimizadas, renomeadas (hash) e movidas para /dist/assets

Execução: Cadeia de fallbacks caso o carregamento falhe:

Tenta a imagem específica da categoria

Usa imagem raiz como fallback

Finalmente, aplica o placeholder

Comandos de Build

npm run dev — Inicia o servidor de desenvolvimento

npm run build — Cria o build para produção

npm run preview — Visualiza o build de produção

npm run convert-images — Converte imagens SVG para JPEG (se necessário)

Suporte a Navegadores

Chrome/Edge (última versão)

Firefox (última versão)

Safari (última versão)

Navegadores mobile

Compatível com impressão para exportar em PDF
´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´´
# English
# Burger Joint Menu

A responsive React menu application for a burger restaurant, built with TypeScript, Vite, and React.

## Features

- 📱 Responsive design - works on mobile and desktop
- 🖨️ Print-ready A4 format
- 🛒 Interactive cart functionality
- 📸 Optimized image loading with fallbacks
- 💅 Clean, modern styling
- 🔍 Type-safe development with TypeScript

## Development Setup

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

The site will be available at http://localhost:5173

## Build for Production

1. Create production build:
```bash
npm run build
```

2. Preview production build:
```bash
npm run preview
```

## Project Structure

- `/src` - Source code
  - `/assets` - Static assets
    - `/images` - Menu item images and image type definitions
      - `/bebidas` - Drink images
      - `/comidas` - Food images
      - `/sobremesas` - Dessert images
  - `/styles` - CSS styles
  - `/types` - TypeScript type definitions
  - `App.tsx` - Main application component
  - `main.tsx` - Application entry point

## TypeScript Support

The project uses TypeScript for enhanced development experience:

- Full type checking for React components
- Interface definitions for menu data structures
- Type-safe image imports with fallbacks
- Documented type definitions for maintainability

### Key Type Definitions

- `MenuData` - Structure of the complete menu
- `MenuItem` - Individual menu item properties
- `MenuImages` - Image path mappings by category
- Component prop interfaces for type-safe development

## Image Handling

Images are processed through several stages:

1. Development: Served directly from `/src/assets/images`
2. Build: Optimized, hashed, and moved to `/dist/assets`
3. Runtime: Fallback chain if image loading fails:
   - Try category-specific image
   - Fall back to root image
   - Finally use placeholder

## Build Commands

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build
- `npm run convert-images` - Convert SVG images to JPEG (if needed)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers
- Print-friendly for PDF export
python -m http.server 8000
# então abra http://localhost:8000
```

