# IAR Embedded Workbench extension

This extension provides IAR Embedded Workbench project integration to automatize build and Intellisense support.
As IAR works on Windows environment only, the extension is not been tested on different systems.

This is NOT an official IAR Systems extension.

## THIS IS A FORK
The original project can be found here:
https://github.com/politoleo/iar

## Getting Started:

### 1) Create `iar.json` file inside `.vscode` folder:
Example `iar.json` configuration, customize it according to your setup:
```javascript
{
    "version": 1,
    "path": "C:\\Program Files\\IAR Systems\\Embedded Workbench 9.0\\",
    "project": "C:\\Projects\\TEST\\TEST.ewp",
    "config": "Debug"
}
```

### 2) Enable the extension on your workspace settings, `settings.json` file inside `.vscode` folder:
```javascript
{
    "iar.enabled":true
}
```

### 3) Run `ctrl+shift+b` to start build.

The extension automatically replaces your `c_cpp_properties.json` [Microsoft C++ Tools][cpptools] configuration to matches the IAR Project ones.
It supports browsing to external files, includepath, common defines and user included one.

### 4) Run `ctrl+shift+b` to pick action.

There are 3 different actions to choose between.
IAR: Build
IAR: Clean
IAR: Rebuild

Add the following in `iar.json` inside the `.vscode` folder to enable action picker:
```javascript
{
    "iarPicker.enabled": true
}
```


## Debug

Example `launch.json` configuration for debug with J-Link:

```javascript
{
    "version": "0.2.1",
    "configurations": [
      {
        "name": "Debug J-Link",
        "type": "cppdbg",
        "request": "launch",
        "program": "C:/Projects/TEST.out",
        "stopAtEntry": true,
        "cwd": "${workspaceRoot}",
        "externalConsole": false,
        "MIMode": "gdb",
        "miDebuggerPath": "arm-none-eabi-gdb.exe",
        "debugServerPath": "JLinkGDBServerCL.exe",
        "debugServerArgs": "-if swd -singlerun -strict -endian little -speed auto -port 3333 -device STM32FXXXXX -vd -strict -halt",
        "serverStarted": "Connected\\ to\\ target",
        "serverLaunchTimeout": 5000,
        "filterStderr": false,
        "filterStdout": true,
        "setupCommands": [
          {"text": "target remote localhost:3333"},
          {"text": "monitor flash breakpoints = 1"},
          {"text": "monitor flash download = 1"},
          {"text": "monitor reset"},
          {"text": "load C:/Projects/TEST.out"},
          {"text": "monitor reset"}
        ]
      }
    ]
  }
```

Example `launch.json` configuration for debug with st-util:
Get st-util here: https://github.com/stlink-org/stlink

```javascript
{
    "version": "0.2.0",
    "configurations": [
        {
            "type": "cortex-debug",
            "request": "launch",
            "servertype": "stutil",
            "cwd": "${workspaceRoot}",
            "executable": "C:/Projects/TEST.out",
            "svdFile": "C:/ST/STM32H743.svd",
            "name": "Debug (ST-Util)",
            "device": "${config:project.mcu}",
            "runToMain": true,
            "v1": false,
            "serverpath": "C:/stlink/bin/st-util.exe",
            "serverArgs": [
                "--freq=4000k"
            ]
        }
    ]
}
```
[cpptools]: https://marketplace.visualstudio.com/items?itemName=ms-vscode.cpptools
