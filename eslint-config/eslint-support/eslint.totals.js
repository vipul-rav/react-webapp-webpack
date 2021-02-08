const eslintReader = require('./eslint.reader');

const CHARS = 4;
const countToFixedWidth = count => (`....${count}`).slice(-CHARS);

const ruleLineFormatter = ([ ruleId, type, count ]) =>
    `${countToFixedWidth(count)} ${ruleId} (${type})`;

const toggleFormatter = status => ([ ruleId ]) =>
    `${ruleId}: ${status}`;
   
module.exports = function(results) {

    const { errorCount, warningCount, resultList } = eslintReader(results || []);
    
    if(resultList === null) 
    {
        return 'All Clear!';
    }

    const ruleList = resultList.map(ruleLineFormatter).join('\n');
    const disableList = resultList.map(toggleFormatter('off')).join('\n');
    const downgradeList = resultList.map(toggleFormatter('warn')).join('\n');

    return `
${countToFixedWidth(errorCount)} | Total Errors
${countToFixedWidth(warningCount)} | Total Warnings
${countToFixedWidth(errorCount + warningCount)} | Total All

=====Rules=====
${ruleList}

=====Disable=====
${disableList}

=====Downgrade=====
${downgradeList}`;

};
