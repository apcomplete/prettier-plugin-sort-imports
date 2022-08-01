import { ImportDeclaration } from '@babel/types';

import { THIRD_PARTY_MODULES_SPECIAL_WORD } from '../constants';

/**
 * Get the regexp group to keep the import nodes.
 * @param node
 * @param importOrder
 */
export const getImportNodesMatchedGroup = (
  node: ImportDeclaration,
  importOrder: string[],
) => {
  const groupWithRegExp = importOrder.reverse().map((group) => ({
    group,
    regExp: new RegExp(group),
  }));

  if (node.importKind === 'type') {
    return '<TYPE>';
  } else {
    for (const { group, regExp } of groupWithRegExp) {
      const matched = node.source.value.match(regExp) !== null;
      if (matched) return group;
    }

    return THIRD_PARTY_MODULES_SPECIAL_WORD;
  }
};
