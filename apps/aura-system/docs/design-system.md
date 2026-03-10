# Aura System do Zeus Project

Fonte auditada originalmente:
- `https://ai-developer.aura.build/`
- HTML baixado: `aura-site-inline.html`
- CSS baixado: `aura-site.css`
- JS baixado: `aura-site.js`

Estado atual:
- o sistema foi absorvido pelo `Zeus Project`
- a pagina do Aura nao e mais isolada
- a navbar agora preserva a navegacao para `Home`, `Olympus`, `Soul` e `Aura System`
- o design system possui versao `light` e `dark`
- a pagina principal virou uma vitrine viva de atoms, molecules, organisms, templates, motion e skeletons

## Objetivo do sistema

O Aura System existe para evitar paginas improvisadas dentro do Zeus Project.
Ele define:

- como o sistema parece
- como o sistema se move
- como o sistema explica complexidade para leigos
- como novas paginas devem nascer sem quebrar a coerencia visual

## Principios do Aura no Zeus

1. Claridade antes de ornamentacao
2. Azul para intencao, neutros para estrutura
3. Respiro amplo como sinal de qualidade
4. Motion como feedback, nao como barulho
5. Atomic design como metodo de construcao obrigatorio
6. Todo fluxo importante deve ser entendivel por uma pessoa nao tecnica

## Arquitetura de arquivos

### CSS

- `styles/tokens.css`
- `styles/atoms.css`
- `styles/molecules.css`
- `styles/organisms.css`
- `styles/template.css`

### UI

- `index.html`
- `app.js`

### Assets de referencia

- `components/`
- `templates/`
- `react/`
- `tokens.json`
- `tailwind.tokens.js`

## Atomic Design

### Atoms

Atoms sao os elementos minimos do sistema.

Incluem:
- cores semanticas
- tipografia
- espacamentos
- raios
- sombras
- duracoes
- curvas de easing
- tags
- botoes
- badges
- alerts
- campos
- skeleton primitives
- blocos de codigo inline

Regra:
- nenhum template deve introduzir estilo novo sem primeiro definir ou reutilizar um atom

### Molecules

Molecules sao combinacoes pequenas e reutilizaveis.

Incluem:
- navbar links
- card de token
- card de showcase
- grupos de botoes
- formularios curtos
- combinacoes de badges e alertas
- bloco de skeleton de item
- blocos de motion demo

Regra:
- toda molecule deve ter uma responsabilidade clara e nome sem ambiguidade

### Organisms

Organisms sao blocos compostos para paginas reais.

Incluem:
- hero do sistema
- grades de metricas
- grade de features
- templates cards
- bloco de guidelines
- blocos de motion
- previews de dashboard

Regra:
- organisms devem resolver uma secao inteira, nao uma parte aleatoria dela

### Templates

Templates definem como organisms sao organizados em uma pagina de produto, dashboard ou documentacao.

No Zeus Project, um template precisa:
- preservar navbar compartilhada
- herdar light e dark mode
- usar hierarquia textual clara
- ter pelo menos uma proxima acao clara
- funcionar em desktop e mobile

## Tokens

## Cor

### Light

- `--aura-color-bg`: fundo principal claro
- `--aura-color-fg`: texto principal
- `--aura-color-surface`: superficie secundaria
- `--aura-color-card`: cards e paineis
- `--aura-color-border`: contorno padrao
- `--aura-color-primary`: acao principal
- `--aura-color-primary-soft`: destaque secundario
- `--aura-color-success`: feedback positivo
- `--aura-color-warning`: atencao
- `--aura-color-danger`: falha ou bloqueio
- `--aura-color-info`: mensagens orientativas

### Dark

No dark mode, a relacao semantica e mantida.
O que muda:
- superfices ficam profundas, nunca preto chapado absoluto
- bordas ficam translúcidas
- o azul clareia para preservar contraste
- texto neutro sobe bastante para leitura noturna

Regra de uso:
- `primary` aparece em CTA, foco, progresso, itens ativos e graficos
- `success`, `warning`, `danger` e `info` sao reservados para feedback semantico
- o fundo nunca deve competir com o conteudo

## Tipografia

- `--aura-font-display`: titulos e grandes mensagens
- `--aura-font-sans`: interface, corpo e formularios
- `--aura-font-serif`: editorial raro, uso especial
- `--aura-font-mono`: codigo, tokens e paths

Diretrizes:
- prefira titulos curtos
- corpo deve explicar, nao performar
- mono deve aparecer apenas em contextos tecnicos

## Espacamento

Escala principal:
- `4`
- `8`
- `12`
- `16`
- `20`
- `24`

Uso:
- entre label e input: `2`
- padding interno de card pequeno: `5`
- padding interno de card maior: `6`
- separacao entre secoes: `20` ou `24`

Regra:
- se a tela parecer comprimida, quase sempre o problema e espacamento, nao falta de cor

## Radius

- `sm`: detalhes pequenos
- `md`: campos e blocos compactos
- `lg`: cards e previews
- `xl`: paineis principais
- `2xl`: superficies heroicas
- `pill`: badges, toggles e botoes

## Sombra

- `xs`: detalhes minimos
- `sm`: campos e botoes suaves
- `md`: card padrao
- `lg`: destaque heroico, modais, paines prioritarios

Regra:
- use sombra para profundidade, nao para dramatizacao

## Motion Tokens

- `--aura-duration-fast`
- `--aura-duration-base`
- `--aura-duration-slow`
- `--aura-ease-out`
- `--aura-ease-inout`

Uso recomendado:
- hover simples: `fast`
- transicoes de estado: `base`
- efeitos hero ou spotlight: `slow`

## Guidelines por categoria

## Navbar

A navbar do Aura agora e navbar do Zeus dentro desta pagina.

Ela deve:
- sempre manter o usuario dentro do projeto
- oferecer retorno imediato para `Home`, `Olympus` e `Soul`
- mostrar claramente a pagina atual
- suportar toggle de tema

## Hero

O hero do Aura nao deve vender apenas beleza.
Ele precisa:
- explicar o papel do sistema
- dizer que o Aura pertence ao Zeus
- apresentar a proxima acao
- orientar o usuario sobre o que vai encontrar abaixo

## Cards

Cards devem:
- ter padding generoso
- separar conteudo em grupos legiveis
- nunca depender apenas de cor para comunicar relevancia
- manter bordas suaves e consistentes

## Formularios

Campos devem:
- ter labels sempre visiveis
- mostrar foco com borda e halo, nao apenas mudanca de fundo
- evitar placeholders como unica instrucao
- respeitar contraste em light e dark

## Skeletons

Skeletons existem para:
- reduzir sensacao de travamento
- antecipar a estrutura da interface
- preservar o layout enquanto dados carregam

Regra:
- use shimmer suave e largura variavel
- nao use skeleton em excesso quando um estado vazio explicativo for melhor

## Motion

Animacoes oficiais do sistema:
- `lift`
- `pulse slide`
- `spotlight`
- `shimmer`

Regras:
- o hover de lift e o padrao mais seguro
- spotlight e exclusivo de heros e destaques raros
- pulse e shimmer sao principalmente para loading
- nunca empilhe multiplas animacoes fortes no mesmo bloco

## Dark Mode

Objetivo:
- oferecer conforto visual sem criar um segundo produto

Regras:
- dark mode herda a mesma hierarquia
- componentes nao mudam de estrutura
- contrastes devem continuar legiveis
- o azul fica mais luminoso porque o fundo e mais fechado

## Templates oficiais

Os templates do Zeus que devem nascer a partir do Aura:
- home de modulo
- dashboard orientativo
- wizard de configuracao
- pagina de guidelines
- pagina de catalogo
- pagina de status ou operacao

## Checklist para novas paginas

Antes de considerar uma pagina pronta, valide:

1. A navbar manteve o usuario dentro do Zeus Project?
2. O tema light e dark funcionam?
3. A pagina explica o que faz para um leigo?
4. Existe uma CTA principal clara?
5. O layout usa atoms e molecules existentes?
6. Os estados de vazio, carregamento e feedback existem?
7. Mobile continua legivel?

## Entregaveis atuais

### Base estatica

- `styles/tokens.css`
- `styles/atoms.css`
- `styles/molecules.css`
- `styles/organisms.css`
- `index.html`
- `app.js`

### Componentes de referencia

- `components/nav.html`
- `components/hero.html`
- `components/button.html`
- `components/card-feature.html`
- `components/card-pricing.html`
- `components/card-testimonial.html`

### Export de tokens

- `tokens.json`
- `tailwind.tokens.js`

### React kit

- `react/components/AuraButton.tsx`
- `react/components/AuraFeatureCard.tsx`
- `react/components/AuraPricingCard.tsx`
- `react/components/AuraHero.tsx`
- `react/app.page.tsx`
- `react/templates/PageStarter.tsx`

## Resumo final

O Aura System agora nao e apenas uma extracao de estilo.
Ele virou o contrato visual do Zeus Project:

- integrado a navegacao do ecossistema
- com dark mode real
- com showcase completo de sistema
- com metodologia atomica aplicada
- com guidelines para manter o projeto coerente no longo prazo
