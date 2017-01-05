'use strict';

module.exports = {
    app: 'public/',
    dist: 'target/public/',
    swaggerDist: 'target/public/swagger-ui/',
    test: 'test/',
    bower: 'public/bower_components/',
    tmp: 'target/tmp',
    revManifest: 'target/tmp/rev-manifest.json',
    port: 9000,
    apiPort: 8080,
    liveReloadPort: 35729,
    uri: 'http://localhost:',
    constantTemplate:
        '(function () {\n' +
        '    \'use strict\';\n' +
        '    // 不要修改这个文件, 请修改对应的json文件后, 使用gulp ngconstant:[dev|prod]更新\n' +
        '    angular\n' +
        '        .module(\'<%- moduleName %>\')\n' +
        '<% constants.forEach(function(constant) { %>        .constant(\'<%- constant.name %>\', <%= constant.value %>)\n<% }) %>;\n' +
        '})();\n'
};
