let userOriginal = JSON.parse(process.env.npm_config_argv).original;
process.env.userOriginal = userOriginal;
console.log(userOriginal);

/**
 * 获取配置文件
 */
exports.getConfigs = function() {
    let run = userOriginal[0];
    let env = 'prd';
    if (run.indexOf('start') == 0 || run.indexOf('dev') == 0) {
        env = 'dev';
    } else if (run.indexOf('stg') == 0) {
        env = 'stg';
    }

    return {
        env: env
    };
};