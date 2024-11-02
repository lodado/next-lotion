export default function transformer(fileInfo, api) {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  let shouldAddServerDIImport = true;
  let replacementCount = 0; // 대체 횟수를 기록합니다.

  // Step 1: Find and remove import declarations for each repository
  root.find(j.ImportDeclaration).forEach((path) => {
    const importPath = path.node.source.value;
    const specifiers = path.node.specifiers;

    // Check if it is already importing SERVER_DI_REPOSITORY
    if (importPath === "@/DI/index.server" && specifiers.some((s) => s.imported.name === "SERVER_DI_REPOSITORY")) {
      shouldAddServerDIImport = false;
    }

    // Define repositories to replace and their replacements
    const repositories = [
      { name: "AuthServerRepository", replacement: "Auth" },
      { name: "DomainServerRepository", replacement: "Domain" },
      { name: "EditorServerRepository", replacement: "Editor" },
    ];

    // Remove each repository's import specifier if it exists
    repositories.forEach((repo) => {
      const specifier = specifiers.find((s) => s.type === "ImportSpecifier" && s.imported.name === repo.name);

      if (specifier) {
        // Remove the specific import specifier
        path.node.specifiers = specifiers.filter((s) => s !== specifier);

        // Replace all instances of the repository in the code
        root.find(j.Identifier, { name: repo.name }).forEach((identifierPath) => {
          j(identifierPath).replaceWith(
            j.memberExpression(j.identifier("SERVER_DI_REPOSITORY"), j.identifier(repo.replacement))
          );
          replacementCount++; // 대체가 발생할 때마다 카운트 증가
        });

        // If no other specifiers are left, remove the entire import statement
        if (path.node.specifiers.length === 0) {
          j(path).remove();
        }
      }
    });
  });

  // Step 3: Add import { SERVER_DI_REPOSITORY } from "@/DI/index.server"; if replacements were made
  if (shouldAddServerDIImport && replacementCount > 0) {
    root
      .get()
      .node.program.body.unshift(
        j.importDeclaration([j.importSpecifier(j.identifier("SERVER_DI_REPOSITORY"))], j.literal("@/DI/index.server"))
      );
  }

  return root.toSource();
}
