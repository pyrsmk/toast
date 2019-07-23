const { CLIEngine } = require('eslint')
const { logger } = require('just-task')

module.exports = options => {
    const eslint = new CLIEngine()
    const formatter = eslint.getFormatter()
    const { results } = eslint.executeOnFiles([options.glob])
    if (results.reduce((value, item) => value + item.errorCount, 0)) {
        logger.info(formatter(results))
        throw new Error('Linter has found errors')
    } else if (results.reduce((value, item) => value + item.warningCount, 0)) {
        logger.info(formatter(results))
    }
}
