import { danger, fail, warn } from 'danger';

const paths = {
  folders: {
    controller: {
      development: 'src/application/controllers',
      documentation: 'src/domain/controllers'
    },
    useCase: {
      development: 'src/application/use-cases'
    }
  },
  controllers: [
    {
      moduleName: 'health',
      fileNames: ['health']
    }
  ],
  useCases: [
    {
      moduleName: 'health',
      fileNames: ['health']
    }
  ]
};

for (const module of paths.controllers) {
  for (const fileName of module.fileNames) {
    const controllerFile = danger.git.fileMatch(
      `${paths.folders.controller.development}/${module.moduleName}/${fileName}.controller.ts`
    );
    const documentationFile = danger.git.fileMatch(
      `${paths.folders.controller.documentation}/${module.moduleName}/__docs__/${fileName}.oas.yml`
    );

    if (
      (controllerFile.edited || controllerFile.created) &&
      (!documentationFile.edited || !documentationFile.created)
    ) {
      fail(
        `:exclamation: Houveram mudanças no arquivo ${fileName}.controller.ts, mas a documentação do arquivo ${fileName}.oas.yml não foi alterada!`
      );
    }
  }
}

for (const module of paths.controllers) {
  for (const fileName of module.fileNames) {
    const controllerFile = danger.git.fileMatch(
      `${paths.folders.controller.development}/${module.moduleName}/${fileName}.controller.ts`
    );
    const controllerTestFile = danger.git.fileMatch(
      `${paths.folders.controller.development}/${module.moduleName}/__tests__/${fileName}.controller.spec.ts`
    );

    if (
      (controllerFile.edited || controllerFile.created) &&
      (!controllerTestFile.edited || !controllerTestFile.created)
    ) {
      warn(
        `Existem modificações no arquivo ${fileName}.controller.ts, mas não existem modificações no arquivo ${fileName}.controller.spec.ts de teste. Isto é OK desde que o código esteja sendo refatorado.`
      );
    }
  }
}

for (const module of paths.controllers) {
  for (const fileName of module.fileNames) {
    const useCaseFile = danger.git.fileMatch(
      `${paths.folders.useCase.development}/${module.moduleName}/${fileName}.use-case.ts`
    );
    const useCaseTestFile = danger.git.fileMatch(
      `${paths.folders.useCase.development}/${module.moduleName}/__tests__/${fileName}.use-case.spec.ts`
    );

    if ((useCaseFile.edited || useCaseFile.created) && (!useCaseTestFile.edited || !useCaseTestFile.created)) {
      warn(
        `Existem modificações no arquivo ${fileName}.use-case.ts, mas não existem modificações no arquivo ${fileName}.use-case.spec.ts de teste. Isto é OK desde que o código esteja sendo refatorado.`
      );
    }
  }
}

console.log(danger.github.pr);

if (danger.github.pr.body.length <= 10) {
  fail('Por favor descreva melhor a sua PR!');
}

if (danger.github.pr.additions + danger.github.pr.deletions > 400) {
  warn(
    ':exclamation: Wow, essa PR parece grande! _Se ela contém mais de uma modificação, tenta separá-las em PRs menores para facilitar o review_'
  );
}

//* Este objeto pr tem essa propriedade mas o dange não tipou ela
if (danger.github.requested_reviewers.users.length === 0) {
  warn(':exclamation: Não se esqueça de marcar alguém para revisar esta PR!');
}
