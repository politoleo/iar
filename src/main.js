const vscode = require('vscode');
const fs = require('fs');
const Iar = require('./iar');

var iar = undefined;

function activate(context) {

    if (!vscode.workspace.rootPath)
        return;

    var folder = vscode.workspace.rootPath;
    config_file = folder + "/.vscode/iar.json";

    let disposable = vscode.commands.registerCommand('iar.build', function () {
        if (fs.existsSync(config_file)) {
            var obj = JSON.parse(fs.readFileSync(config_file));
            if (obj["config"] && obj["path"] && obj["project"]) {
                iar = new Iar(obj.path, obj.project, obj.config, folder);
                iar.build();
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