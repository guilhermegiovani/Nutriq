# Nutriq

Nutriq é um aplicativo mobile construído com React Native e Expo para controle de alimentação e acompanhamento calórico diário. O projeto foi desenvolvido em TypeScript com foco em experiência simples, registro de refeições e persistência local, tornando-o ideal para portfólio e demonstração de habilidades em desenvolvimento mobile.

## Visão Geral

Nutriq tem como objetivo ajudar o usuário a gerenciar refeições, adicionar múltiplos alimentos por refeição, acompanhar o consumo calórico diário e manter um histórico de alimentação. A aplicação utiliza persistência local para que os dados fiquem disponíveis mesmo após o fechamento do app.

## Funcionalidades Principais

- Cadastro de refeições
- Adição de múltiplos alimentos por refeição
- Edição de refeições existentes
- Exclusão de refeições
- Histórico agrupado por data
- Meta calórica diária
- Barra de progresso para acompanhar a meta
- Persistência local com AsyncStorage

## Tecnologias Utilizadas

- React Native
- Expo
- TypeScript
- NativeWind / Tailwind CSS
- AsyncStorage
- React Navigation
- React Query
- Axios

## Como Executar Localmente

1. Instale as dependências:

```bash
npm install
```

2. Inicie o servidor do Expo:

```bash
npm start
```

3. Abra o aplicativo no Expo Go ou emulador Android/iOS.

> Se desejar usar uma API externa, defina a variável de ambiente `EXPO_PUBLIC_API_URL` no ambiente do Expo.

## Estrutura de Pastas

- `App.tsx` - Componente raiz do aplicativo.
- `src/app` - Configuração de providers globais.
- `src/context` - Contextos de estado compartilhado.
- `src/navigation` - Navegação entre telas.
- `src/screens` - Telas principais do aplicativo.
- `src/components` - Componentes de interface reutilizáveis.
- `src/services` - Serviços de API e armazenamento.
- `src/utils` - Funções utilitárias de domínio.
- `src/data` - Dados estáticos ou mock.
- `src/constants` - Constantes e rotas.
- `src/types` - Tipagens do TypeScript.

## Possíveis Melhorias Futuras

- Suporte a login e autenticação de usuários.
- Integração com backend real para sincronização em nuvem.
- Relatórios avançados de consumo nutricional.
- Design responsivo para mais tamanhos de dispositivo.
- Validação de formulários mais robusta.
- Suporte a múltiplas metas e preferências alimentares.
- Análises de progressão em gráficos.

## Observações

Este projeto prioriza clareza de código e uma base sólida para evolução futura. A documentação e os comentários adicionados visam facilitar a manutenção e a compreensão da arquitetura do aplicativo.
