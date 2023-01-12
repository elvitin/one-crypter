/* Regras Codificador: 
"e" é convertido para "enter" 
"i" é convertido para "imes"
"a" é convertido para "ai"
"o" é convertido para "ober"
"u" é convertido para "ufat"
Apenas letras minúsculas
Não permite acentuação   
*/

/* Regras Decodificador: 
"enter" é convertido para "e" 
"imes" é convertido para "i"
"ai" é convertido para "a"
"ober" é convertido para "o"
"ufat" é convertido para "u"
Apenas letras minúsculas
Não permite acentuação     
*/

(_ => {
  const input = document.querySelector('#input-textarea');
  const output = document.querySelector('#output-textarea');

  // Código do Codificador
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
  }

  // Código do Decodificador
  function decode() {
    //e.preventDefault();
    const text = input.value.toLowerCase();
    const result = text
      .replace(/enter/g, 'e')
      .replace(/imes/g, 'i')
      .replace(/ai/g, 'a')
      .replace(/ober/g, 'o')
      .replace(/ufat/g, 'u');

    output.value = result;
  }

  /*
  // Código do Botão Limpar, para o futuro
  function clear(inputElement) {
    if (inputElement) {
      if (inputElement instanceof Event) {
        inputElement =
          inputElement.target.parentElement.querySelector('[to-copy-paste]');
      }

      inputElement.value = '';
      return;
    }

    //clear all
    document.querySelectorAll('[to-copy-paste]').forEach(input => {
      input.value = '';
    });
  }
  */

  // Código do Botão Copiar
  async function copy(fromElement) {
    await navigator.clipboard.writeText(fromElement.value);

    // Esse era um metódo para limpar o campo após copiar, vou adicionar depois
    // const clearCheck = parentElement.querySelector('[to-clear]');
    // if (clearCheck.checked) {
    //   clear(copyElement);
    // }
  }

  // Código do Botão Colar
  async function paste(toElement) {
    const copiedValue = await navigator.clipboard.readText();
    toElement.value = copiedValue;
  }

  // Botões de cripografia
  document.querySelector('#encrypt-btn').addEventListener('click', encode);
  document.querySelector('#decrypt-btn').addEventListener('click', decode);

  // Botões de copiar
  document
    .querySelector('.input-textarea-frame .to-copy')
    .addEventListener('click', _ => copy(input));
  document
    .querySelector('.output-textarea-frame .to-copy')
    .addEventListener('click', _ => copy(output));

  // Botões de colar
  document
    .querySelector('.input-textarea-frame .to-paste')
    .addEventListener('click', _ => paste(input));
  document
    .querySelector('.output-textarea-frame .to-paste')
    .addEventListener('click', _ => paste(output));
})();
