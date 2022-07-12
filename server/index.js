const openCodeFile = require("./openCodeFile");
const { getEditor, setEditor } = require("./config");

function codeLinkServer (app) {
  console.log('[tinyjs-code-line] running')
  app.get("/code", function (req, res) {
    if (req.query.filePath) {
      openCodeFile(req.query.filePath);
    }
    res.send("successfully receive request");
  });
}

module.exports = {
  before: function (app) {
    codeLinkServer(app);
  },
  onBeforeSetupMiddleware: function(server) {
    codeLinkServer(server.app);
  },
  getEditor,
  setEditor,
};
