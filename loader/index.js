const path = require("path");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse");
const bt = require("@babel/types");
const pathUtil = require("../utils/pathUtil.js");
const common = require('./common');

const PROPERTY_NAME = '__code_line';

const CLASS_KEY_WORDS = [
  'Container',
  'Sprite',
  'CustomContainer',
  'CustomSprite',
  'Text',
  'CustomText',
  'AnimatedSprite',
  'CustomAnimatedSprite',
];

function matchKeyWords(name) {
  return CLASS_KEY_WORDS.includes(name) || CLASS_KEY_WORDS.includes(`Tiny.${CLASS_KEY_WORDS}`);
}

/**
 * 增加代码行列
 * @param {string} source 源代码
 * @param {string} relativePath 源代码文件相对路径
 */
function codeLineTrack(source, relativePath) {
  const ast = parser.parse(source, { sourceType: 'module', plugins: [ 'typescript', 'exportDefaultFrom' ] });
  const appendCodeLineTracks = [];
  traverse.default(
    ast, 
    {
      enter(path) {
        // class extends
        if (path.isClassDeclaration && path.node.superClass && matchKeyWords(path.node.superClass.name)) {
          const classStart = path.node.body.start + 1;
          appendCodeLineTracks.push({
            code: `\n${PROPERTY_NAME} = '${relativePath}:${common.getLineCount(source, classStart)}';`,
            pos: classStart,
          });
        }
        // new
        else if (path.isVariableDeclaration()) {
          (path.node.declarations || []).forEach(declarator => {
            if (bt.isNewExpression(declarator.init) && matchKeyWords(declarator.init.callee.name)) {
              const varStart = path.node.start;
              appendCodeLineTracks.push({
                code: `\n${declarator.id.name}.${PROPERTY_NAME} = '${relativePath}:${common.getLineCount(source, varStart)}';`,
                pos: path.node.end,
              });
            }
          });
        }
      },
    },
  );
  // 从下往上拼接
  let _source = source;
  for (let i = appendCodeLineTracks.length - 1; i >= 0; i--) {
    const item = appendCodeLineTracks[i];
    _source = common.insertString(_source, item.code, item.pos);
  }
  console.log(_source);
  return _source;
}

module.exports = function(source) {
  const {
    mode,
    context,
    rootContext,
    resourcePath
  } = this;
  const relativePath = path.relative(pathUtil.projectBasePath, resourcePath);
  return codeLineTrack(source.toString(), relativePath);
};
