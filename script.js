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
  // Código do Codificador
  function encode() {
    const text = document.querySelector('#input-txt').value.toLowerCase();

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

    document.querySelector('#result-txt').value = result;
  }

  // Código do Decodificador
  function decode() {
    //e.preventDefault();
    const text = document.querySelector('#input-txt').value.toLowerCase();
    const result = text
      .replace(/enter/g, 'e')
      .replace(/imes/g, 'i')
      .replace(/ai/g, 'a')
      .replace(/ober/g, 'o')
      .replace(/ufat/g, 'u');

    document.querySelector('#result-txt').value = result;
  }

  // Código do Botão Limpar
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

  // Código do Botão Copiar
  async function copy(e) {
    const parentElement = e.target.parentElement;
    const copyElement = parentElement.querySelector('[to-copy-paste]');
    await navigator.clipboard.writeText(copyElement.value);
    const clearCheck = parentElement.querySelector('[to-clear]');
    if (clearCheck.checked) {
      clear(copyElement);
    }
  }

  // Código do Botão Colar
  async function paste(e) {
    const parentElement = e.target.parentElement;
    const pasteElement = parentElement.querySelector('[to-copy-paste]');
    const copiedValue = await navigator.clipboard.readText();
    pasteElement.value = copiedValue;
  }

  // Código do Botão Codificar
  document.querySelector('#btn-cripto').addEventListener('click', encode);
  document.querySelector('#btn-descripto').addEventListener('click', decode);

  document.querySelectorAll('[btn-clear]').forEach(btn => {
    btn.addEventListener('click', clear);
  });

  document.querySelectorAll('[btn-copy]').forEach(btn => {
    btn.addEventListener('click', copy);
  });

  document.querySelectorAll('[btn-paste]').forEach(btn => {
    btn.addEventListener('click', paste);
  });
})();
