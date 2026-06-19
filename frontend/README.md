# Projeto-app - Frontend

Aplicativo mobile do projeto Lista Inteligente de Compras.
App mobile em React Native para conferencia de compras por imagem.

## Tecnologias

- Expo / React Native
- Firebase (Authentication e Cloud Firestore)
- Expo Camera / Expo Image Manipulator
- Expo File System (com imagens salvas localmente no celular)

## Estrutura

- `frontend`: aplicativo mobile com Expo/React Native.
- `backend`: reservado para anotacoes.

## Instalar e Rodar o Projeto

Entre na pasta do app:

```bash
cd frontend
```

Instale as dependencias:

```bash
npm install
```

No PowerShell do Windows, se aparecer erro de script bloqueado com `npm.ps1`, use:

```bash
npm.cmd install
```

Rode o projeto:

```bash
npm start
```

Ou, no mesmo caso do PowerShell:

```bash
npm.cmd start
```

Depois leia o QR Code com o app Expo Go no celular ou use o emulador / web.
