document.getElementById("converter").addEventListener("submit", function(event) {
  event.preventDefault(); // Evita o comportamento padrão do formulário

  const expressaoPosfixa = document.getElementById("postfix").value;
  const pilha = [];
  const operadores = {
      '+': (a, b) => a + b,
      '-': (a, b) => a - b,
      '*': (a, b) => a * b,
      '/': (a, b) => a / b,
  };

  const expressaoInfixa = expressaoPosfixa.split(" ").reduce((acc, token) => {
      if (isNaN(token)) {
          const operador = operadores[token];
          const segundoOperando = pilha.pop();
          const primeiroOperando = pilha.pop();
          pilha.push(`(${primeiroOperando} ${token} ${segundoOperando})`);
      } else {
          pilha.push(token);
      }
      return acc;
  }, []).pop();

  let resultado = 0;

  expressaoPosfixa.split(" ").forEach((token) => {
      if (isNaN(token)) {
          const operador = operadores[token];
          const segundoOperando = parseFloat(pilha.pop());
          const primeiroOperando = parseFloat(pilha.pop());
          resultado = operador(primeiroOperando, segundoOperando);
          pilha.push(resultado);
      } else {
          pilha.push(token);
      }
  });

  if (pilha.length > 1) {
      console.error("Expressão inválida: ocorreu um erro durante a conversão");
  } else if (pilha.length === 1) {
      resultado = pilha[0];
  }

  document.getElementById("resultado").innerHTML = `
      <p>Resultado: <code>${resultado}</code></p>
  `;
});
