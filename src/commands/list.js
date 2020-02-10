const cliui = require('cliui');
const service = require('../service');

module.exports = {
    command: 'list',
    options: [],
    description: 'Lists active ports',
    action: list,
}

function list() {
    service.getActivePorts()
        .then((ports) => {
            console.log(`\nFound ${ ports.length } active ports\n`);
            console.log(portsTable(ports));
        })
}

/*
 * Private API
 */

function portsTable(lines) {
    const tableWidthPx = 120;
    const commandWidthPx = 64;
    var table = cliui({ width: tableWidthInPixels });

    table.div(
        col({ text: 'port' }),
        col({ text: 'command', width: commandWidthPx }),
        col({ text: 'pid' }),
        col({ text: 'type' }),
        col({ text: 'fd' }),
    );

    table.div(
        col({ text: '--------------------------------------------------------------------------', width: tableWidthInPixels })
    );

    lines.forEach((line) => {
        table.div(
            col({ text: line.port }),
            col({ text: line.command, width: commandWidthPx }),
            col({ text: line.pid }),
            col({ text: line.type }),
            col({ text: line.fileDescriptor }),
        );
    })

    table.div(
        col({ width: tableWidthInPixels })
    );

    return table.toString();
}

function col({text, width, padding}) {
    return {
        text: text || '',
        width: width || 14,
        padding: padding || [0, 3, 0, 3]
    };
}