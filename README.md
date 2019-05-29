# React Native FlashCards

O projeto FlashCards foi construído para o trabalho de finalização do curso de 'React Native' realizado na Udacity. Este aplicativo permite criar baralhos com questões para serem respondidas em um Quiz. 

No desenvolvimento foram utilizadas as tecnologias React Native, Native Base, Expo, Redux, Redux-thunk.

Mesmo sabendo que as API(s) são compatíveis com IOS e Android, a aplicação foi testada apenas na plataforma Android.

# Instalação

```bash
git clone https://github.com/juniorgianisini/reactnative-flashcards.git
```

## Terminal:
```bash
cd reactnative-flashcards
yarn install
yarn start
```

## Terminal - Geração do APK (Opcional):
```bash
cd reactnative-flashcards
expo build:android
```

# Resources

```bash
├── actions
│   ├── index.js - Ações para manter o estado deck e cards no Redux.
├── components
│   ├── CustomHeader.js - Cabeçalho com título da tela e ações comuns.
│   ├── Deck.js - Componente que apresenta um baralho de forma individual.
│   ├── DeckDetails.js - Componente que apresenta os detalhes de um baralho.
│   ├── ListDeck.js - Componente que apresenta a lista de todos os baralhos.
│   ├── NewCard.js - Componente com formalário para criar uma questão.
│   ├── NewDeck.js - Componente com formalário para criar um baralho.
│   ├── Quiz.js - Componente para exibição de um Quiz baseado nos baralhos e questões.
│   └── QuizCard.js - Componente para exibição de um ítem do Quiz.
├── middleware
│   ├── index.js - Centraliza o import de todos os middlwares.
│   └── logger.js - Middlware que escreve no console do Browser as ações e alterações no estado do Redux.
├── reducers
│   ├── index.js - Aplica alterações do estado 'deck' e 'cards' na store do Redux.
├── selectors
│   ├── index.js - Centraliza o acesso ao estado deck e cards do Redux.
├── utils
│   ├── api.js - Funções para acesso ao estado do baralho e questões no AsyncStorage
│   └── helper.js - Funções utilitárias.
├── App.js - Componente principal do Sistema onde tudo é iniciado.
├── app.json - Configurações de empacotamento para geração do APK Android.
```

# Screenshots

Home |New Card |Show Card |Deck Detail|Show Response|Result Quiz|
-----|---------|----------|-----------|-------------|----------|
<img src="https://raw.githubusercontent.com/juniorgianisini/reactnative-flashcards/master/images/image1.png" width="250px">|<img src="https://raw.githubusercontent.com/juniorgianisini/reactnative-flashcards/master/images/image2.png" width="250px">|<img src="https://raw.githubusercontent.com/juniorgianisini/reactnative-flashcards/master/images/image3.png" width="250px">|<img src="https://raw.githubusercontent.com/juniorgianisini/reactnative-flashcards/master/images/image4.png" width="250px">|<img src="https://raw.githubusercontent.com/juniorgianisini/reactnative-flashcards/master/images/image5.png" width="250px">|<img src="https://raw.githubusercontent.com/juniorgianisini/reactnative-flashcards/master/images/imaga6.png" width="250px">
