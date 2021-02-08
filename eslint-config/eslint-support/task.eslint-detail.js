/* eslint-disable no-console */
const fs = require('fs');

const { spawn } = require('cross-spawn');

const OUTPUT_FILE = './eslint-config/.eslint-detail.output';
const TASK_NAME = 'lint:detail';
const TASK_ERROR_MESSAGE = `*** ERR! ${TASK_NAME} failed to run! ***`;
const EXIT_ERROR_MESSAGE = `*** ERR! ${TASK_NAME} throws errors! ***`;
const EXIT_OTHER_MESSAGE = `${TASK_NAME} success - but lint issues found\noutput file to: ${OUTPUT_FILE}`;
const EXIT_SUCCESS_MESSAGE = `${TASK_NAME} success\noutput file to: ${OUTPUT_FILE}`;

(() => {

    try {
        
        let dataAvailableForReport;
        
        const eslint = spawn('./node_modules/eslint/bin/eslint.js', 
            [
                '--ext', '.js',
                '--ext', '.jsx',
                '--format', './eslint-config/eslint-support/eslint.detail.js',
                'src/',
            ]);
        
        const logStream = fs.createWriteStream(OUTPUT_FILE);

        eslint.stdout.on('data', (_data) => {
            dataAvailableForReport = true;
        });

        eslint.stdout.pipe(logStream);

        eslint.stderr.on('data', (data) => {
            console.log(`stderr: ${data.toString()}`);
        });
          
        eslint.on('exit', (code) => {
            if (code === 0) {
                console.log(EXIT_SUCCESS_MESSAGE);
            } else if(code === 1 && dataAvailableForReport) {
                console.log(EXIT_OTHER_MESSAGE);
            } else {
                console.log(EXIT_ERROR_MESSAGE);
            }
        });

    } catch (_err) {
        console.log(TASK_ERROR_MESSAGE);
    }
})();

/* eslint-enable no-console */
