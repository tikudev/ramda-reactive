import { isNullOrEmpty } from '../_private/utils.js'
/**
 * Convert an object to a jsdoc comment string
 *
 * @since v1.0.0
 * @param {{[tag: string]: ITag | Array<ITag | ITag[]>}} tags - Object containing keys of tags
 * @param {ToCommentStringConfig} [config={ indentChars = 0 }] - The configuration for output formatting
 * @returns {string} The jsdoc string
 * @docgen_types
 * // The configuration type for the util:
 * //   indentChars?: number = 0 - The number of characters that the output string should be indented
 *
 * export type ToCommentStringConfig = { indentChars?: number };
 * @docgen_import { toCommentString, ToCommentStringConfig }
 */
export var toCommentString = function (tags, _a) {
  var _b = _a === void 0 ? {} : _a,
    _c = _b.indentChars,
    indentChars = _c === void 0 ? 0 : _c
  if (isNullOrEmpty(tags)) return ''
  var output = ' '.repeat(indentChars) + '/**'
  var indent = ' '.repeat(indentChars + 1)
  for (var key in tags) {
    var tag = tags[key]
    if (Array.isArray(tag)) {
      output =
        output +
        tag
          .map(function (t) {
            return (
              '\n' +
              indent +
              '* ' +
              t.raw.replace(/(\r\n|\r|\n)/g, '\n' + indent + '* ')
            )
          })
          .join('')
    } else {
      output =
        output +
        '\n' +
        indent +
        '* ' +
        tags[key].raw.replace(/(\r\n|\r|\n)/g, '\n' + indent + '* ')
    }
  }
  return output + ('\n' + indent + '*/')
}
