// ====== CONSTANTES ======

const ELEMENTOS = {
  nome: "uNome",
  email: "uEmail",
  cpfCnpj: "uCPFCNPJ",
  num1: "num1",
  num2: "num2",
  resultado: "resultado",
  avisoErroEmail: "aviso-erro",
  avisoErroCpfCnpj: "aviso-erro-cpfcnpj",
};

// ====== FUNÇÕES PURAS (Lógica) ======

// Validadores puros - sem efeitos colaterais
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const cpfCnpjRegex =
  /(^\d{3}\.\d{3}\.\d{3}\-\d{2}$)|(^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$)/;
const nomeRegex = /^[a-záéíóúâêôãõç\s]{3,}$/i;

const isEmailValid = (email) => emailRegex.test(email);
const isCPFCNPJValid = (cpfCnpj) => cpfCnpjRegex.test(cpfCnpj);
const isNomeValid = (nome) => nomeRegex.test(nome);
const isNotEmpty = (value) => value.trim().length > 0;

// Validador genérico
const isFieldValid = (value, validator) =>
  isNotEmpty(value) && validator(value);

// Operações matemáticas puras
const somar = (n1, n2) => n1 + n2;
const subtrair = (n1, n2) => n1 - n2;
const multiplicar = (n1, n2) => n1 * n2;
const dividir = (n1, n2) => (n2 === 0 ? null : n1 / n2);

// Formatador puro para resultado
const formatarResultado = (resultado) =>
  resultado === null ? "Erro: divisão por zero" : `Resultado: ${resultado}`;

// ====== FUNÇÕES IMPURAS (Efeitos Colaterais com DOM) ======

// Helper unificado para atualizar estilo e mensagem
const atualizarCampoValidacao = (elementId, avisoElementId, isValido) => {
  const elemento = document.getElementById(elementId);
  if (!elemento) return;

  elemento.style.backgroundColor = isValido ? "white" : "red";
  elemento.style.color = isValido ? "black" : "white";

  if (avisoElementId) {
    document.getElementById(avisoElementId).style.display = isValido
      ? "none"
      : "block";
  }
};

// Função genérica de validação com atualização de UI
const validarCampo = (elementId, avisoElementId, validator, logMessage) => {
  const valor = document.getElementById(elementId).value;
  const isValido = isFieldValid(valor, validator);
  atualizarCampoValidacao(elementId, avisoElementId, isValido);
  console.log(isValido ? `${logMessage} válido!` : `${logMessage} inválido!`);
  return isValido;
};

// Funções específicas de validação
const validarNome = () =>
  validarCampo(ELEMENTOS.nome, null, isNomeValid, "Nome");
const validarEmail = () =>
  validarCampo(
    ELEMENTOS.email,
    ELEMENTOS.avisoErroEmail,
    isEmailValid,
    "Email",
  );
const validarCPFCNPJ = () =>
  validarCampo(
    ELEMENTOS.cpfCnpj,
    ELEMENTOS.avisoErroCpfCnpj,
    isCPFCNPJValid,
    "CPF/CNPJ",
  );

// Valida o formulário completo
const validarFormulario = () => {
  const isNomeValido = validarNome();
  const isEmailValido = validarEmail();
  const isCpfCnpjValido = validarCPFCNPJ();
  return isNomeValido && isEmailValido && isCpfCnpjValido;
};

// Obtém valores do formulário
const obterValoresCalculadora = () => {
  const n1 = Number(document.getElementById(ELEMENTOS.num1).value);
  const n2 = Number(document.getElementById(ELEMENTOS.num2).value);
  return { n1, n2 };
};

// Atualiza resultado na tela
const atualizarResultado = (resultado) => {
  document.getElementById(ELEMENTOS.resultado).innerText = resultado;
};

// ====== OPERAÇÕES DA CALCULADORA ======

const executarOperacao = (operacao) => {
  const { n1, n2 } = obterValoresCalculadora();
  const resultado = operacao(n1, n2);
  const resultadoFormatado = formatarResultado(resultado);
  atualizarResultado(resultadoFormatado);
};

// Mapa de operações da calculadora
const operacoes = {
  somar: somar,
  subtrair: subtrair,
  multiplicar: multiplicar,
  dividir: dividir,
};

// Funções da calculadora
const somarNumeros = () => executarOperacao(operacoes.somar);
const subtrairNumeros = () => executarOperacao(operacoes.subtrair);
const multiplicarNumeros = () => executarOperacao(operacoes.multiplicar);
const dividirNumeros = () => executarOperacao(operacoes.dividir);

// ====== EXPORTAÇÃO PARA TESTES ======
if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    // Validadores
    isEmailValid,
    isCPFCNPJValid,
    isNomeValid,
    isNotEmpty,
    isFieldValid,
    // Operações matemáticas
    somar,
    subtrair,
    multiplicar,
    dividir,
    // Formatadores
    formatarResultado,
    // Funções impuras
    validarNome,
    validarEmail,
    validarCPFCNPJ,
    validarFormulario,
    atualizarCampoValidacao,
    validarCampo,
    obterValoresCalculadora,
    atualizarResultado,
    executarOperacao,
    somarNumeros,
    subtrairNumeros,
    multiplicarNumeros,
    dividirNumeros,
    operacoes,
    ELEMENTOS,
  };
}
