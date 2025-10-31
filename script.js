/* Código JavaScript compartilhado por todas as páginas
   Funções:
    - Alternar tema (salvar em localStorage)
    - Menu mobile toggle!!
    - Validação do formulário de contato (somente na página do contato.html)
    - Inserir ano atual no rodapé
*/

(function(){
  // Helpers
  function qs(sel){return document.querySelector(sel)}
  function qsa(sel){return Array.from(document.querySelectorAll(sel))}

  // Ano aatual nos rodapés
  var yearEls = qsa('#year, #year2, #year3, #year4');
  yearEls.forEach(function(el){ if(el) el.textContent = new Date().getFullYear(); });

  // Theme toggle
  var root = document.body;
  var themeKey = 'portfolio-theme';
  function applyTheme(theme){
    if(theme === 'light'){
      root.classList.add('light-theme');
    } else {
      root.classList.remove('light-theme');
    }
  }
  var stored = localStorage.getItem(themeKey) || 'dark';
  applyTheme(stored);

  qsa('#themeToggle, #themeToggleHeader, #themeTogglePortfolio, #themeToggleContato').forEach(function(btn){
    if(!btn) return;
    btn.addEventListener('click', function(){
      var current = document.body.classList.contains('light-theme') ? 'light' : 'dark';
      var next = current === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem(themeKey, next);
    });
  });

  // Mobile menu toggle: clona a nav como painel simples
  qsa('.menu-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      var nav = document.querySelector('.main-nav');
      if(!nav) return;
      // toggle class to show/hide (simple approach)
      nav.classList.toggle('open');
      if(nav.classList.contains('open')){
        nav.style.display = 'flex';
        nav.style.flexDirection = 'column';
        nav.style.position = 'absolute';
        nav.style.right = '20px';
        nav.style.top = '64px';
        nav.style.background = 'var(--card)';
        nav.style.padding = '12px';
        nav.style.borderRadius = '10px';
      } else {
        nav.style.display = '';
        nav.style.position = '';
      }
    });
  });

  // Contato
  var contactForm = qs('#contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', function(ev){
      ev.preventDefault();
      var name = qs('#name').value.trim();
      var email = qs('#email').value.trim();
      var message = qs('#message').value.trim();
      var feedback = qs('#formFeedback');

      // Verificar email simples
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      var errors = [];
      if(name.length < 2) errors.push('Preencha o nome (mínimo 2 caracteres).');
      if(!emailRegex.test(email)) errors.push('E-mail inválido.');
      if(message.length < 6) errors.push('A mensagem deve ter pelo menos 6 caracteres.');

      if(errors.length){
        feedback.hidden = false;
        feedback.className = 'feedback error';
        feedback.textContent = errors.join(' ');
        return;
      }

      // Simulação de envio: limpar campos, mostrar confirmação certinho.
      contactForm.reset();
      feedback.hidden = false;
      feedback.className = 'feedback success';
      feedback.textContent = 'Mensagem enviada com sucesso! Obrigado pelo contato.';

      // Remover a mensagem após alguns segundinhos
      setTimeout(function(){ feedback.hidden = true; }, 6000);
    });
  }

  // Acessibilidade
  document.addEventListener('keydown', function(e){
    if(e.key === 'Tab') document.body.classList.add('show-focus');
  });

})();
