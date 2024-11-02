export default function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  let shouldAddServerDIImport = true;
  let replacementCount = 0; // 대체된 횟수를 기록합니다.

  // Step 1: Find and remove import declaration for AuthServerRepository
  root.find(j.ImportDeclaration).forEach((path) => {
    const importPath = path.node.source.value;
    const specifiers = path.node.specifiers;

    // Check if it is importing SERVER_DI_REPOSITORY already
    if (importPath === '@/DI/index.server' && specifiers.some((s) => s.imported.name === 'SERVER_DI_REPOSITORY')) {
      shouldAddServerDIImport = false;
    }

    // Find and remove AuthServerRepository import
    const authSpecifier = specifiers.find(
      (specifier) =>
        specifier.type === 'ImportSpecifier' &&
        specifier.imported.name === 'AuthServerRepository'
    );

    if (authSpecifier) {
      // Remove AuthServerRepository from import
      path.node.specifiers = specifiers.filter((s) => s !== authSpecifier);

      // If no other specifiers are left, remove the entire import statement
      if (path.node.specifiers.length === 0) {
        j(path).remove();
      }
    }
  });

  // Step 2: Replace all instances of "AuthServerRepository" with "SERVER_DI_REPOSITORY.Auth"
  root.find(j.Identifier, { name: 'AuthServerRepository' }).forEach((identifierPath) => {
    j(identifierPath).replaceWith(
      j.memberExpression(
        j.identifier('SERVER_DI_REPOSITORY'),
        j.identifier('Auth')
      )
    );
    replacementCount++; // 대체가 발생할 때마다 카운트 증가
  });

  // Step 3: Add import { SERVER_DI_REPOSITORY } from "@/DI/index.server"; if necessary
  if (shouldAddServerDIImport && replacementCount > 0) { // 대체가 이루어진 경우에만 추가
    root.get().node.program.body.unshift(
      j.importDeclaration(
        [j.importSpecifier(j.identifier('SERVER_DI_REPOSITORY'))],
        j.literal('@/DI/index.server')
      )
    );
  }

  return root.toSource();
}
