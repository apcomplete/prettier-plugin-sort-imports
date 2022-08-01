run_spec(__dirname, ["typescript"], {
    importOrder: ['^@core/(.*)$', '^@server/(.*)', '^@ui/(.*)$', '^[./]'],
    importOrderSeparation: true,
    importOrderSortSpecifiers: true,
    importOrderParserPlugins : ['typescript', 'decorators-legacy', 'classProperties']
});
