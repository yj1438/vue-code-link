const path = require("path");
const child_process = require("child_process");
const pathUtil = require("../utils/pathUtil.js");
const serverConfig = require("./config.js");

function openCodeFileInWebStorm(codePath) {
  let filePath = codePath.split(":")[0];
  let linePath = codePath.split(":")[1];
  filePath = path.join(pathUtil.projectBasePath, filePath);

  if (os() === "win32") {
    child_process.exec(`webstorm64.exe  --line ${linePath} ${filePath}`, {
      env: process.env,
    });
  } else {
    child_process.exec(`webstorm64  --line ${linePath} ${filePath}`, {
      env: process.env,
    });
  }
}
function openCodeFileInVscode(codePath) {
  let filePath = path.join(pathUtil.projectBasePath, codePath);
  child_process.exec(`code -r -g ${filePath}`, {
    env: process.env,
  });
}
function os() {
  "use strict";
  const os = require("os");
  const platform = os.platform();
  switch (platform) {
    case "darwin":
      return "MacOSX";
    case "linux":
      return "Linux";
    case "win32":
      return "Windows";
    default:
      return "无法确定操作系统!";
  }
}

module.exports = function (codePath) {
  if (serverConfig.getEditor() === "vscode") {
    openCodeFileInVscode(codePath);
  } else if (serverConfig.getEditor() === "webstorm") {
    openCodeFileInWebStorm(codePath);
  } else {
    openCodeFileInVscode(codePath);
  }
};
