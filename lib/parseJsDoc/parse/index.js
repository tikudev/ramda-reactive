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
import { getTagMap } from '../_private/utils.js'
import { getTag } from '../getTag/index.js'
/**
 * Parse a jsdoc comment string against all potential jsdoc tags and optional custom tags
 *
 * @since v1.0.0
 * @param {string} jsdoc - The entire jsdoc comment string
 * @param {string[]} [customTags=[]] - Optional array of custom tags parse
 * @param {(link: InlineLink) => string} [linkRenderer] - Optional function to override default rendering of inline link and tutorial tags
 * @returns {object} Object with keys of each parsed tag
 * @docgen_note
 * For more information on <code>linkRenderer</code>, please see {@link #using-linkRenderer|Using a custom linkRenderer}.
 */
export var parse = function (jsdoc, customTags, linkRenderer) {
  if (customTags === void 0) {
    customTags = []
  }
  var tag = getTag(jsdoc, linkRenderer)
  var allTags = __spreadArrays(Array.from(getTagMap().keys()), customTags)
  var output = allTags.reduce(function (accumulator, item) {
    var _a
    var data = tag(item)
    if (data && (!Array.isArray(data) || data.length > 0)) {
      return Object.assign(
        accumulator,
        ((_a = {}), (_a[item.replace('@', '')] = data), _a)
      )
    }
    return accumulator
  }, {})
  return output
}
