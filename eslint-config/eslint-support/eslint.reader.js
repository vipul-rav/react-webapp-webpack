const getSummary = (results) => {
    return results.reduce(
        (seq, current) => {
            current.messages.forEach(({ column, line, message, ruleId, severity }) => {

                const logMessage = {
                    filePath: current.filePath,
                    ruleId,
                    message,
                    line,
                    column,
                };

                if (severity === 1) {
                    logMessage.type = 'WARNING';
                    seq.warnings.push(logMessage);
                } else if (severity === 2) {
                    logMessage.type = 'ERROR';
                    seq.errors.push(logMessage);
                }
            });

            return seq;
        },
        {
            errors: [],
            warnings: [],
        }
    );
};

const getFileContext = (filePath, line, column) => {
    const filePathTokens = [ ...filePath.split('/')];
    const relativeFilePath = filePathTokens.slice(filePathTokens.indexOf('src')+1).join('/');
    return `${relativeFilePath} > Ln ${line}, Col ${column}`;
};

const createResultDict = summary => 
    [...summary.errors, ...summary.warnings]
        .map(({ type, ruleId, filePath, line, column }) => ({
            type,
            ruleId,
            context: getFileContext(filePath, line, column),
        }))
        .reduce(
            (results, { ruleId, type, context }) => {

                results[ruleId] = (() => {

                    if(!results[ruleId]) {
                        return [ type, 1, [ context ] ];
                    }
                
                    const [ _type, count, contexts ] = results[ruleId];
                    return [ type, count + 1, [...contexts, context] ];
                })();

                return results;
            }, { });

const dictToList = (dict) => {

    const list = [];
            
    for (const key of Object.keys(dict).sort()) {
        const stuff = dict[key];
        list.push([key, ...stuff ]);
    }
            
    return list;
};

module.exports = function(results) {

    const summary = getSummary(results || []);
    const { errors, warnings } = summary;

    const errorCount = errors.length;
    const warningCount = warnings.length;
    const resultList = (errorCount > 0 || warningCount > 0) ? dictToList(createResultDict(summary)) : null;

    return {
        errorCount,
        warningCount,
        resultList,
    };
};
