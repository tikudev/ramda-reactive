var __spreadArrays =
  (this && this.__spreadArrays) ||
  function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++)
      s += arguments[i].length
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
      for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
        r[k] = a[j]
    return r
  }
import { isNullOrEmpty } from '../_private/utils.js'
/**
 * Extract all jsdoc comment strings from a file
 *
 * @since v1.0.0
 * @param {string} file - String contents of a file
 * @param {GetCommentsFromFileConfig} [config={ keepIndent = false }] - The configuration for output formatting
 * @returns {string[]} Array of jsdoc strings
 * @docgen_types
 * // The configuration type for the util:
 * //   keepIndent?: boolean = false - Whether or not to keep the indentation of the entire jsdoc comment block
 *
 * export type GetCommentsFromFileConfig = { keepIndent?: boolean };
 * @docgen_import { getCommentsFromFile, GetCommentsFromFileConfig }
 */
export var getCommentsFromFile = function (file, _a) {
  var _b = _a === void 0 ? {} : _a,
    _c = _b.keepIndent,
    keepIndent = _c === void 0 ? false : _c
  if (isNullOrEmpty(file)) return []
  var regex = /^( *\/\*\*.*| *\*\/| *\* * *.*)/gm
  var matches = Array.from(file.matchAll(regex))
  var output = []
  var current = ''
  for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
    var match = matches_1[_i]
    if (match[0].indexOf('/**') >= 0 && match[0].indexOf('*/') >= 0) {
      output = __spreadArrays(output, [
        current + (keepIndent ? match[0] : match[0].trimStart()),
      ])
      current = ''
    } else if (match[0].indexOf('*/') >= 0) {
      output = __spreadArrays(output, [
        current + '\n' + (keepIndent ? match[0] : ' ' + match[0].trimStart()),
      ])
      current = ''
    } else if (match[0].indexOf('/**') >= 0) {
      current = keepIndent ? match[0] : match[0].trimStart()
    } else {
      current =
        current + '\n' + (keepIndent ? match[0] : ' ' + match[0].trimStart())
    }
  }
  return output
}
