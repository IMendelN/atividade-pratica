// ====== IMPORTAÇÃO DAS FUNÇÕES ======
const {
  isEmailValid,
  isCPFCNPJValid,
  isNomeValid,
  isNotEmpty,
  isFieldValid,
  somar,
  subtrair,
  multiplicar,
  dividir,
  formatarResultado,
} = require("../js/app.js");

// ====== TESTES DE VALIDAÇÃO DE EMAIL ======

describe("isEmailValid - Validação de Email", () => {
  test("deve retornar true para email válido simples", () => {
    expect(isEmailValid("usuario@exemplo.com")).toBe(true);
  });

  test("deve retornar true para email com números", () => {
    expect(isEmailValid("usuario123@exemplo.com")).toBe(true);
  });

  test("deve retornar true para email com domínio subdividido", () => {
    expect(isEmailValid("usuario@mail.exemplo.com")).toBe(true);
  });

  test("deve retornar false para email sem @", () => {
    expect(isEmailValid("usuarioexemplo.com")).toBe(false);
  });

  test("deve retornar false para email sem domínio", () => {
    expect(isEmailValid("usuario@")).toBe(false);
  });

  test("deve retornar false para email sem ponto no domínio", () => {
    expect(isEmailValid("usuario@exemplo")).toBe(false);
  });

  test("deve retornar false para email com espaço", () => {
    expect(isEmailValid("usuario exemplo@mail.com")).toBe(false);
  });

  test("deve retornar false para email vazio", () => {
    expect(isEmailValid("")).toBe(false);
  });

  test("deve retornar false para email com múltiplos @", () => {
    expect(isEmailValid("usuario@@exemplo.com")).toBe(false);
  });

  test("deve retornar false para email com caracteres especiais inválidos", () => {
    expect(isEmailValid("usuario#@exemplo.com")).toBe(false);
  });
});

// ====== TESTES DE VALIDAÇÃO DE CPF/CNPJ ======

describe("isCPFCNPJValid - Validação de CPF/CNPJ", () => {
  // ---- Testes CPF ----
  describe("Validação de CPF", () => {
    test("deve retornar true para CPF válido formatado", () => {
      expect(isCPFCNPJValid("123.456.789-10")).toBe(true);
    });

    test("deve retornar true para CPF com números diferentes", () => {
      expect(isCPFCNPJValid("987.654.321-00")).toBe(true);
    });

    test("deve retornar false para CPF sem formatação", () => {
      expect(isCPFCNPJValid("12345678910")).toBe(false);
    });

    test("deve retornar false para CPF com formatação incorreta (sem hífen)", () => {
      expect(isCPFCNPJValid("123.456.789.10")).toBe(false);
    });

    test("deve retornar false para CPF com pontos faltantes", () => {
      expect(isCPFCNPJValid("123456789-10")).toBe(false);
    });

    test("deve retornar false para CPF vazio", () => {
      expect(isCPFCNPJValid("")).toBe(false);
    });

    test("deve retornar false para CPF com letras", () => {
      expect(isCPFCNPJValid("abc.def.ghi-jk")).toBe(false);
    });
  });

  // ---- Testes CNPJ ----
  describe("Validação de CNPJ", () => {
    test("deve retornar true para CNPJ válido formatado", () => {
      expect(isCPFCNPJValid("12.345.678/0001-95")).toBe(true);
    });

    test("deve retornar true para CNPJ com números diferentes", () => {
      expect(isCPFCNPJValid("98.765.432/0001-10")).toBe(true);
    });

    test("deve retornar false para CNPJ sem formatação", () => {
      expect(isCPFCNPJValid("12345678000195")).toBe(false);
    });

    test("deve retornar false para CNPJ com formatação incorreta", () => {
      expect(isCPFCNPJValid("12.345.678-0001/95")).toBe(false);
    });

    test("deve retornar false para CNPJ com caracteres faltantes", () => {
      expect(isCPFCNPJValid("12.345.678/000195")).toBe(false);
    });

    test("deve retornar false para CNPJ com letras", () => {
      expect(isCPFCNPJValid("ab.cde.fgh/ijkl-mn")).toBe(false);
    });
  });

  // ---- Testes Gerais ----
  test("deve retornar false para valor null", () => {
    expect(isCPFCNPJValid(null)).toBe(false);
  });

  test("deve retornar false para valor undefined", () => {
    expect(isCPFCNPJValid(undefined)).toBe(false);
  });
});

// ====== TESTES DE OPERAÇÕES MATEMÁTICAS ======

describe("Operações Matemáticas", () => {
  describe("somar", () => {
    test("deve somar dois números positivos", () => {
      expect(somar(5, 3)).toBe(8);
    });

    test("deve somar números negativos", () => {
      expect(somar(-5, -3)).toBe(-8);
    });

    test("deve somar número positivo com negativo", () => {
      expect(somar(10, -5)).toBe(5);
    });

    test("deve somar zero", () => {
      expect(somar(5, 0)).toBe(5);
    });

    test("deve somar números decimais", () => {
      expect(somar(1.5, 2.5)).toBe(4);
    });
  });

  describe("subtrair", () => {
    test("deve subtrair dois números positivos", () => {
      expect(subtrair(10, 3)).toBe(7);
    });

    test("deve subtrair resultando em negativo", () => {
      expect(subtrair(3, 10)).toBe(-7);
    });

    test("deve subtrair números negativos", () => {
      expect(subtrair(-5, -3)).toBe(-2);
    });

    test("deve subtrair zero", () => {
      expect(subtrair(5, 0)).toBe(5);
    });

    test("deve subtrair números decimais", () => {
      expect(subtrair(5.5, 2.5)).toBe(3);
    });
  });

  describe("multiplicar", () => {
    test("deve multiplicar dois números positivos", () => {
      expect(multiplicar(5, 3)).toBe(15);
    });

    test("deve multiplicar por zero", () => {
      expect(multiplicar(5, 0)).toBe(0);
    });

    test("deve multiplicar números negativos", () => {
      expect(multiplicar(-5, -3)).toBe(15);
    });

    test("deve multiplicar número positivo por negativo", () => {
      expect(multiplicar(5, -3)).toBe(-15);
    });

    test("deve multiplicar números decimais", () => {
      expect(multiplicar(2.5, 4)).toBe(10);
    });

    test("deve multiplicar por um", () => {
      expect(multiplicar(5, 1)).toBe(5);
    });
  });

  describe("dividir", () => {
    test("deve dividir dois números positivos", () => {
      expect(dividir(10, 2)).toBe(5);
    });

    test("deve dividir resultando em decimal", () => {
      expect(dividir(10, 3)).toBeCloseTo(3.333, 2);
    });

    test("deve retornar null para divisão por zero", () => {
      expect(dividir(10, 0)).toBeNull();
    });

    test("deve dividir números negativos", () => {
      expect(dividir(-10, -2)).toBe(5);
    });

    test("deve dividir número negativo por positivo", () => {
      expect(dividir(-10, 2)).toBe(-5);
    });

    test("deve dividir zero por um número", () => {
      expect(dividir(0, 5)).toBe(0);
    });

    test("deve dividir números decimais", () => {
      expect(dividir(10.5, 2.5)).toBeCloseTo(4.2, 1);
    });
  });
});

// ====== TESTES DE FORMATAÇÃO DE RESULTADO ======

describe("formatarResultado", () => {
  test('deve formatar resultado com texto "Resultado:"', () => {
    expect(formatarResultado(10)).toBe("Resultado: 10");
  });

  test("deve formatar resultado com decimal", () => {
    expect(formatarResultado(3.14)).toBe("Resultado: 3.14");
  });

  test("deve formatar resultado zero", () => {
    expect(formatarResultado(0)).toBe("Resultado: 0");
  });

  test("deve formatar resultado negativo", () => {
    expect(formatarResultado(-5)).toBe("Resultado: -5");
  });

  test("deve retornar mensagem de erro para null", () => {
    expect(formatarResultado(null)).toBe("Erro: divisão por zero");
  });

  test("deve formatar número muito grande", () => {
    expect(formatarResultado(1000000)).toBe("Resultado: 1000000");
  });
});

// ====== TESTES DE INTEGRAÇÃO ======

describe("Integração - Fluxo Completo", () => {
  describe("Email", () => {
    test("deve validar email válido e retornar true", () => {
      const resultado = isEmailValid("teste@email.com");
      expect(resultado).toBe(true);
    });

    test("deve validar email inválido e retornar false", () => {
      const resultado = isEmailValid("testesemail.com");
      expect(resultado).toBe(false);
    });
  });

  describe("CPF/CNPJ", () => {
    test("deve validar CPF válido e retornar true", () => {
      const resultado = isCPFCNPJValid("123.456.789-10");
      expect(resultado).toBe(true);
    });

    test("deve validar CNPJ válido e retornar true", () => {
      const resultado = isCPFCNPJValid("12.345.678/0001-95");
      expect(resultado).toBe(true);
    });

    test("deve rejeitar formato misto", () => {
      const resultado = isCPFCNPJValid("123.456.789/0001-10");
      expect(resultado).toBe(false);
    });
  });

  describe("Calculadora", () => {
    test("deve executar operação de soma corretamente", () => {
      const resultado = somar(10, 5);
      expect(resultado).toBe(15);
    });

    test("deve formatar resultado de operação com sucesso", () => {
      const resultado = somar(10, 5);
      expect(formatarResultado(resultado)).toBe("Resultado: 15");
    });

    test("deve tratar divisão por zero e formatar erro", () => {
      const resultado = dividir(10, 0);
      expect(formatarResultado(resultado)).toBe("Erro: divisão por zero");
    });
  });
});

// ====== TESTES DE VALIDAÇÃO DE NOME ======

describe("isNomeValid - Validação de Nome", () => {
  test("deve retornar true para nome válido com 3 caracteres", () => {
    expect(isNomeValid("Ana")).toBe(true);
  });

  test("deve retornar true para nome com sobrenome", () => {
    expect(isNomeValid("João Silva")).toBe(true);
  });

  test("deve retornar true para nome com acentuação", () => {
    expect(isNomeValid("José da Silva")).toBe(true);
  });

  test("deve retornar false para nome vazio", () => {
    expect(isNomeValid("")).toBe(false);
  });

  test("deve retornar false para nome com menos de 3 caracteres", () => {
    expect(isNomeValid("Jo")).toBe(false);
  });

  test("deve retornar false para nome com números", () => {
    expect(isNomeValid("João123")).toBe(false);
  });

  test("deve retornar false para nome com caracteres especiais", () => {
    expect(isNomeValid("João@Silva")).toBe(false);
  });
});

// ====== TESTES DE VALIDAÇÃO GENÉRICA ======

describe("isNotEmpty - Validação de Campo Vazio", () => {
  test("deve retornar true para string com conteúdo", () => {
    expect(isNotEmpty("João")).toBe(true);
  });

  test("deve retornar false para string vazia", () => {
    expect(isNotEmpty("")).toBe(false);
  });

  test("deve retornar false para string com apenas espaços", () => {
    expect(isNotEmpty("   ")).toBe(false);
  });

  test("deve retornar true para string com espaços e conteúdo", () => {
    expect(isNotEmpty("  João  ")).toBe(true);
  });
});

describe("isFieldValid - Validação Genérica de Campo", () => {
  test("deve retornar true quando campo não está vazio e validator retorna true", () => {
    expect(isFieldValid("usuario@exemplo.com", isEmailValid)).toBe(true);
  });

  test("deve retornar false quando campo está vazio", () => {
    expect(isFieldValid("", isEmailValid)).toBe(false);
  });

  test("deve retornar false quando validator retorna false", () => {
    expect(isFieldValid("emailinvalido", isEmailValid)).toBe(false);
  });

  test("deve retornar true para nome válido", () => {
    expect(isFieldValid("João Silva", isNomeValid)).toBe(true);
  });

  test("deve retornar false para CPF/CNPJ inválido", () => {
    expect(isFieldValid("123456789", isCPFCNPJValid)).toBe(false);
  });
});
