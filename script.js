'use-strict';
/*
  Regras Codificador:
  
  "e" é convertido para "enter"
  "i" é convertido para "imes"
  "a" é convertido para "ai"
  "o" é convertido para "ober"
  "u" é convertido para "ufat"

  • Apenas letras minúsculas
  • Não permite acentuação
*/

/* 
  Regras Decodificador:

  "enter" é convertido para "e"
  "imes" é convertido para "i"
  "ai" é convertido para "a"
  "ober" é convertido para "o"
  "ufat" é convertido para "u"

  • Apenas letras minúsculas
  • Não permite acentuação
*/

import { notificationType, sendPopUpNotify } from './popup-notify.js';

(_ => {
  const input = document.querySelector('#input-textarea');
  const output = document.querySelector('#output-textarea');
  const clearWhenCopy = document.querySelector('#clear-when-copy');
  const validInputRegExp = /^[\w\s]*$/;

  // código do codificador
  function encode() {
    const text = input.value.toLowerCase();

    //https://www.samanthaming.com/tidbits/83-4-ways-to-convert-string-to-character-array/
    let result = '';
    Array.from(text).forEach(letter => {
      switch (letter) {
        case 'e':
          result += 'enter';
          break;
        case 'i':
          result += 'imes';
          break;
        case 'a':
          result += 'ai';
          break;
        case 'o':
          result += 'ober';
          break;
        case 'u':
          result += 'ufat';
          break;
        default:
          result += letter;
      }
    });

    output.value = result;
    sendPopUpNotify('Texto criptografado!', notificationType.success, 1000);
  }

  // código do decodificador
  function decode() {
    const text = input.value.toLowerCase();
    const result = text
      .replace(/enter/g, 'e')
      .replace(/imes/g, 'i')
      .replace(/ai/g, 'a')
      .replace(/ober/g, 'o')
      .replace(/ufat/g, 'u');

    output.value = result;
    sendPopUpNotify('Texto descriptografado!', notificationType.success, 1000);
  }

  function validateInput(string) {
    string ??= '';
    const isValid = validInputRegExp.test(string);
    if (!isValid) {
      /**
       * [ ] Refatorar trecho, diferenciar texto inserido da área de transferência
       * ou não
       * */
      sendPopUpNotify(
        'Seu texto contém acentos! Por favor digite ou cole textos sem acento.',
        notificationType.warning
      );
    }
    return isValid;
  }

  // código do botão copiar
  async function copy(fromElement) {
    await navigator.clipboard.writeText(fromElement.value.toLowerCase());
    if (fromElement.value !== '') {
      sendPopUpNotify('Texto  copiado!', notificationType.info, 1000);
      if (clearWhenCopy.checked) {
        fromElement.value = '';
      }
    }
  }

  // código do botão colar
  async function paste(toElement) {
    const copiedValue = await navigator.clipboard.readText();
    if (validateInput(copiedValue)) {
      if (copiedValue !== '') {
        toElement.value = copiedValue;
        sendPopUpNotify('Texto  colado!', notificationType.info, 1000);
      }
    }
  }

  function clear(fromElement) {
    if (fromElement.value !== '') {
      fromElement.value = '';
      sendPopUpNotify('Texto  removido!', notificationType.info, 1000);
    }
  }

  input.addEventListener('beforeinput', e => {
    if (!validateInput(e.data)) {
      e.preventDefault();
    }
  });

  // botões de criptografia e descriptografia
  document.querySelector('#encrypt-btn').addEventListener('click', encode);
  document.querySelector('#decrypt-btn').addEventListener('click', decode);

  // botões de opções do textarea de entrada
  document
    .querySelector('.input-textarea-frame .to-clear')
    .addEventListener('click', _ => clear(input));

  document
    .querySelector('.input-textarea-frame .to-paste')
    .addEventListener('click', _ => paste(input));

  document
    .querySelector('.input-textarea-frame .to-copy')
    .addEventListener('click', _ => copy(input));

  // botões de opções do textarea de saída
  document
    .querySelector('.output-textarea-frame .to-clear')
    .addEventListener('click', _ => clear(output));
  document
    .querySelector('.output-textarea-frame .to-copy')
    .addEventListener('click', _ => copy(output));
})();

/**
 * Referências:
 *
 * Sobre valores Falsy (ou Falsey) https://developer.mozilla.org/en-US/docs/Glossary/Falsy
 * Sobre valores Truthy            https://developer.mozilla.org/en-US/docs/Glossary/Truthy
 * Sobre valores Nullish           https://developer.mozilla.org/en-US/docs/Glossary/Nullish
 *
 *
 * Sobre o evento input e seus tipos de input
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/input_event
 * https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/beforeinput_event
 * https://rawgit.com/w3c/input-events/v1/index.html#interface-InputEvent-Attributes
 *
 * Sobre o método test() RegExp    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test
 *
 * Mais sobre Expressões Regularas aqui
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
 *
 * Expressões regulares é um assunto bem extenso e delicado, e tem que ser usado com cuídado
 * RegExp pode gerar erros difíceis de rastrear bem como pode gerar problemas de desempenho.
 *
 * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 *
 *
 * Sobre o Nullish Coalescing (Operador de coalescência nula) (??)  e o Logical OR (||) - Stackoverflow
 * https://stackoverflow.com/questions/61480993/when-should-i-use-nullish-coalescing-vs-logical-or
 *
 *
 * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 *
 *
 * Sobre o: Nullsih Coalescing (??)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing
 *
 * Sobre o: Logical OR (||)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR
 *
 * Sobre o: Logical AND (&&)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND
 *
 *
 *
 * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 *
 *
 * Os mesmos operadores só que agora com atribuição
 *
 * Sobre o: Nullish Coalescing Assignment (??=)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_assignment
 *
 * Sobre o: Logical OR assignment (||=)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment
 *
 * Sobre o: Logical AND assignment (&&=)
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_AND_assignment
 *
 *
 * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 *
 *
 * Nota-se que existe operadores avançados de comparação que podem ser utilizados
 * ou não em atribuições, e operadores naturalmente de atribuição cada qual
 * dessas duas categorias de operadores com suas peculiaridades. Existe também
 * valores "Falsy", "Truthy" e valores "Nullish", e cada um desses operadores dentro
 * dessas duas categorias de operadores, utiliza um desses tipos de valores em seus
 * critérios de comparação. Então é bom conhecer e prestar muita atenção sobre
 * como funciona cada um desses operadores e, o que de é fato considerado "false"
 * ou "true" para o javascript que tem diversos tipos de valores, primitivos
 * ou não primitivos.
 *
 *
 * ::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
 *
 *
 * Você pode ver quase tudo sobre operadores do Javascript aqui
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators
 */

/**
 * PARA NÃO PERMITIR ACENTOS.
 *
 * Quando o usuário inserir um texto que contenha acento, terá duas
 * tratativas dependendo do modo de inserção:
 *
 * 1) Se o texto for colado da da área de transferência, tanto usando o
 * CTRL + V quanto usando o botão disponibilizado, bloquear a ação com
 * uma notificação dizendo "Seu texto contém acentos, por favor digite
 * ou cole textos sem acento." Note que, quando colado utilizando a tecla
 * de atalho CTRL + V, o evento 'beforeinput' é disparado.
 *
 * 2) Se o caractere for digitado, o evento 'beforeinput' também será
 * disparado, neste caso  teria mais duas possíveis tratativas, só que
 * somente uma delas teria de ser escolhida:
 *
 *    2.1) Transformar o caractere com acento inserido em seu equivalente
 *         sem acento (Mais difícil e verboso).
 *
 *    2.2) Simplesmente notificar o usuário e nem permitir que o caractere
 *         seja inserido (Estrátegia escolhida).
 */

/**
 * *** DISCLAIMER: busque você mesmo essas informações, caso veja alguma
 * informação inválida aqui, não exite em comentar na aba issue ou na aba
 * discussion, essas informações são tiradas das fontes que deixei o link
 * porém pode não estar 100% corretas, e eu mesmo posso ter errado em algo
 * então, SEMPRE VALIDE !!! ***
 *
 * EXPLICANDO ESSA EXPRESSÃO REGULAR: const validInputRegExp = /^[\w\s]*$/;
 *
 * A expressão diz que só pode existir caracteres da tabela ASCII:
 *
 * https://www.asciitable.com/
 * https://www.regular-expressions.info/shorthand.html
 *
 * Por consequência, qualquer caractere além da tabela ASCII como por
 * exemplo o "Extended ASCII Codes" e os UNICODES, serão inválidados!
 * Mas para o que o desafio exige é pensei ser o suficiente. Caracteres
 * como "Àúû" serão invalidados no método test(), pois se trata de
 * caracteres extendidos (Não padrão ASCII)
 *
 * A flag "g" que não tem neste caso, diria à RegExp para
 * procurar todas  as ocorrências e não só na primeira ocorrência, o que
 * para esse caso não é útil, nós precisamos encontrar apenas a primeira
 * ocorrência de um caractere não ASCII.
 *
 * "^" e "$"" são delimitadores de início e fim, "^" é necessáriamente no
 * começo e "$" é necessáriamente no fim.
 *
 * "[]" define range de classes
 *
 * "\w" permita qualquer tipo caractere desde que seja ASCII
 *
 * "\s" permita qualquer tipo de espaço seja tabulação, quebra de linha
 * entre outros
 *
 * "*" Diz que pode exisitir nenhuma ou muitas ocorrências do que foi
 * definido nos colchetes. Por isso que se passado uma string vazia para
 * o test(), o resultado será true.
 */

/*
  // Função antiga para tratar caracteres inválidos
  // Nesta função eu estária usando o evento 'input' ao invéz do evento
  // 'beforeinput', com o evento 'input', não seria possível bloquear uma
  // ação de paste (CTRL + V) realizada através do teclado.

  input.addEventListener('input', e => {
    // Qualquer tipo de evento que é de inserção
    if (e.inputType.includes('insert')) {
      if (!validInputRegExp.test(input.value)) {
        // aqui, eu iria desfazer oque foi inserido, após já ser inserido.
      }
      return;
    }

    // Aqui eu estaria interessado em remover o último caractere inserido.
    if (e.inputType === 'insertText') {
      e.data ??= '';
      if (!validInputRegExp.test(e.data)) {
        input.value = input.value.slice(0, -1);
        console.log('Invalid');
      }
    }
  });
*/
