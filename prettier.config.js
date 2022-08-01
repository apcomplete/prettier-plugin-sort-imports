module.exports = {
    printWidth: 80,
    tabWidth: 2,
    trailingComma: 'all',
    singleQuote: true,
    jsxBracketSameLine: true,
    semi: true,
    plugins: [require('./lib/src/index.js')],
    importOrder: ['^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
};
