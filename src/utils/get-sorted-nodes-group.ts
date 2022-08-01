import { Import, ImportDeclaration } from '@babel/types';

import { PrettierOptions } from '../types';
import { naturalSort } from '../natural-sort';

export const getSortedNodesGroup = (
  imports: ImportDeclaration[],
  options: Pick<PrettierOptions, 'importOrderGroupNamespaceSpecifiers'>,
) => {
  return imports.sort((a, b) => {
    const namespaceDiff = getSortBySpecifier('ImportNamespaceSpecifier', a, b);
    if (namespaceDiff !== 0) {
      return namespaceDiff;
    } else {
      const diff = getSortBySpecifier('ImportDefaultSpecifier', a, b);
      if (diff !== 0) {
        return diff;
      } else if (!a.specifiers.length && b.specifiers.length) {
        return -1;
      } else if (!b.specifiers.length && a.specifiers.length) {
        return 1;
      } else if (!b.specifiers.length && !a.specifiers.length) {
        return naturalSort(a.source.value, b.source.value);
      } else {
        const aSpecifiers = a.specifiers.sort((a, b) =>
          naturalSort(a.local.name, b.local.name),
        );
        const bSpecifiers = b.specifiers.sort((a, b) =>
          naturalSort(a.local.name, b.local.name),
        );

        return naturalSort(
          aSpecifiers[0].local.name,
          bSpecifiers[0].local.name,
        );
      }
    }
  });
};

function getSortBySpecifier(
  type: string,
  a: ImportDeclaration,
  b: ImportDeclaration,
) {
  const aFirstSpecifier = a.specifiers.find((s) => s.type === type);

  const bFirstSpecifier = b.specifiers.find((s) => s.type === type);

  if (!aFirstSpecifier && !bFirstSpecifier) {
    return 0;
  } else if (aFirstSpecifier && bFirstSpecifier) {
    return naturalSort(aFirstSpecifier.local.name, bFirstSpecifier.local.name);
  } else if (!aFirstSpecifier && bFirstSpecifier) {
    return 1;
  } else {
    return -1;
  }
}
