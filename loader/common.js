'use strict';

/**
 * 向源码中插入字符
 * @param {string} code 源码
 * @param {string} insertString 插入代码
 * @param {number} insertPos 插入位置
 * @return {string}
 */
exports.insertString = function insertString(code, insertString, insertPos) {
  return code.substring(0, insertPos) + insertString + code.substring(insertPos);
}

exports.getLineCount = function getLineCount(source, pos = 0) {
  return source.substring(0, pos).split('\n').length;
}