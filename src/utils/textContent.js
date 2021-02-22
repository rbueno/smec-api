const language = 'pt';

const textContet = {
  pt: {
    error:
    {
      createNewUser: 'houve um problema em criar novo usuário',
      createNewPost: 'houve um problema em publicar novo conteúdo',
      findOneUser: 'Houve um problema em localizar o usuário solicitado',
      userNotFound: 'Não foi possível encontrar o usuário solicitado',
      postNotFound: 'Não foi possível encontrar o conteúdo solicitado',
      listUsers: 'Houve um problema em carregar os usuários',
      userEmailAlreadyExist: 'Já existe um usuário com este email. Faça login ou utilize um email diferente',
      allFieldAreMandatory: 'Todos os campos são obrigatórios',
      unexpected: 'Algo saiu errado mas não sabemos o que. Tente novamente ou nos contate para tentarnos solucionar o problema',
      missingToken: 'Usuário não autenticado',
      expiredOrInvalidToken: 'Token expirado ou inválido',
      missingEmail: 'Informe um email válido',
      authNotMath: 'Usuário ou senha incorretos',
      csrf: 'Por motivo de segurança, cancelamos sua solicitação. Por favor, tente novamente mais tarde.',
      userNotUpdated: 'Não foi possível concluir a atualização. Por favor, tente novamente',
      missingId: 'Proriedade ID inexistente',
      Forbidden: 'Ação não permitida',
      missingField: 'Um ou mais campos obrigatórios estão ausentes',
      stampNotAdded: 'Não foi possível carambiar este conteúdo',
      noOwnStamp: 'Você não tem carimbo neste conteúdo para poder removê-lo',
      justOwnStamp: 'Este conteúdo possui apenas o seu carimbo de aprovação. Delete o conteúdo ao invés de tentar remover o carimbo',
      stampedByOrders: 'Você não pode deletar um conteúdo carimbado por outros especialistas. Você pode deletar o seu carimbo ao invés de tentar remover o conteúdo',
      stampNotRemoved: 'Ocorreu um erro e não conseguimos remover seu carimbo. Tente novamente ou entre em contato conosco.',
    },
    success: {
      userCreated: 'Sua conta foi criada com sucesso.'
    },
    process: {
      postPreviouslyPublished: 'Este conteúdo já foi publicado. Você pode carimbá-lo com a sua aprovação',
      alreadyApprovedThis: 'Você já carimbou este conteúdo com a sua aprovação.'
    },
    warning: { 
      notApplicable: 'Não aplicável',
      alreadySME: 'Você já é um SME',
    }
  }
}

module.exports = textContet[language];