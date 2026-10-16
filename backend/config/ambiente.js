const nomesObrigatorios = ['PORT', 'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_NAME'];

export function carregarAmbiente(arquivoDeConfiguracao) {
  if (arquivoDeConfiguracao) {
    try {
      process.loadEnvFile(arquivoDeConfiguracao);
    } catch {
      throw new Error(`Arquivo de configuração não encontrado: ${arquivoDeConfiguracao}`);
    }
  }

  const ausentes = nomesObrigatorios.filter((nome) => {
    const valor = process.env[nome];
    return typeof valor !== 'string' || valor.trim() === '';
  });

  if (ausentes.length > 0) {
    throw new Error(`Configure no .env: ${ausentes.join(', ')}`);
  }

  const porta = Number(process.env.PORT);
  if (!Number.isInteger(porta) || porta < 1 || porta > 65535) {
    throw new Error('PORT deve ser um inteiro entre 1 e 65535.');
  }
  const portaBanco = Number(process.env.DB_PORT);
  if (!Number.isInteger(portaBanco) || portaBanco < 1 || portaBanco > 65535) {
    throw new Error('DB_PORT deve ser um inteiro entre 1 e 65535.');
  }

  return {
    nomeAluno: process.env.NOME_ALUNO,
    turma: process.env.TURMA,
    porta,
    portaBanco,
    ambiente: process.env.NODE_ENV || 'development'
  };
}

export function exibirDiagnostico(configuracao) {
  console.table({
    estudante: configuracao.nomeAluno,
    turma: configuracao.turma,
    projeto: 'Urban Booking',
    ambiente: configuracao.ambiente,
    node: process.version,
    sistema: `${process.platform} ${process.arch}`,
    diretorio: process.cwd(),
    portaConfigurada: configuracao.porta
  });
}
