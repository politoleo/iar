const vscode = require('vscode');
const fs = require('fs');
const Iar = require('./iar');

iar = undefined;
folder = undefined;

function resolve(string) {
    var out = string.split("${workspaceRoot}").join(folder);
    out = out.split("${workspaceFolder}").join(folder);
    return out;
}

function activate(context) {

    if (!vscode.workspace.rootPath)
        return;

    folder = vscode.workspace.rootPath;
    config_file = folder + "\\.vscode\\iar.json";

    vscode.workspace.onDidSaveTextDocument((e) => {
        if (config_file === e.fileName) {
            if (!(typeof iar === 'undefined' || iar === null))
                delete iar
        }
    })

    let disposable = vscode.commands.registerCommand('iar.picker', function () {
        if (fs.existsSync(config_file)) {
            var obj = JSON.parse(fs.readFileSync(config_file));
            if (obj["config"] && obj["path"] && obj["project"]) {
                if (typeof iar === 'undefined' || iar === null)
                    iar = new Iar(resolve(obj.path), resolve(obj.project), obj.config, folder);
                if (iar.in_progress() == false)
                    iar.picker(obj);
            }
        }
        else {
            vscode.window.showInformationMessage("No IAR configuration file found");
        }
    });

    context.subscriptions.push(disposable);
}

function deactivate() {
    if (iar) {

    }
}

exports.activate = activate;
exports.deactivate = deactivate;