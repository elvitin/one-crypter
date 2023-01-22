'use-strict';
(_ => {
  const body = document.querySelector('body');
  const configDropdown = document.querySelector('.config-dropdown');
  const configBtn = document.querySelector('.config-btn');

  /**
   * Quando fechar o menu dropdown ?
   *
   * Quando clicar fora do dropdown | OK
   * Quando selecionar outra opção de tema que não seja a mesma | OK
   * Quando clicar na engrenagem novamente | OK
   */
  body.addEventListener('click', _ => {
    configDropdown.classList.add('config-dropdown-hidden-state');
    /**
     * Este método serve pra quando houver um clique fora do range
     * do menu dropdown, o menu dropdown seja fechado.
     *
     * Este método só será executado quando o Listener do botão de
     * configuração não cancela-lo. Isso só funciona pois o listener
     * abaixo executa primeiro por algum motívo que eu ainda não sei
     * explicar, a ordem deveria ser: este método primeiro porque foi
     * registrado primeiro, e depois o listener abaixo atribuido ao
     * configBtn. Mas o que acontece de fato é ao contrário. Então,
     * quando o evento do botão de configuração é executado, e esse
     * identifica que o currentTarget é o próprio botão, o bloco if cancela
     * todos os elementos posteriores na linha com:
     * e.stopImmediatePropagation();
     *
     * O segundo if só está interessado em saber se houve um clique dentro
     * da área do dropdown, por isso esse segundo if tem somente o
     * e.stopImmediatePropagation();
     */
  });

  configBtn.addEventListener('click', e => {
    //
    if (e.target.classList.contains('btn-range')) {
      configDropdown.classList.toggle('config-dropdown-hidden-state');
      e.stopImmediatePropagation();
      return;
    }

    if (e.currentTarget === configBtn) {
      e.stopImmediatePropagation();
    }
  });

  document.querySelectorAll('input[type="radio"]').forEach(option =>
    //
    option.addEventListener('change', e => {
      body.classList.replace(body.classList[0], e.target.value);

      /**
       * Aqui sempre que alterado o tema, vou querer que o dropdown seja
       * fechado.
       */
      configDropdown.classList.add('config-dropdown-hidden-state');
    })
  );
})();
