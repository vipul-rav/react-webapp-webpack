const eslintReader = require('./eslint.reader');

const fileDataFormatter = ([ ruleId, type, count, contexts ]) =>
    `${type}: ${ruleId} x ${count} \n--------\n${contexts.join('\n')}\n`;
            
module.exports = function(results) {

    const { resultList } = eslintReader(results || []);
    
    if(resultList === null) 
    {
        return;
    }

    const fileList = resultList.map(fileDataFormatter).join('\n');

    return `=====Files=====\n${fileList}`;
};
