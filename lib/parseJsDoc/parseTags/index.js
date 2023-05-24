import { getTag } from '../getTag/index.js'
/**
 * Parse a jsdoc comment string against specified tags only; custom tags may be included
 *
 * @since v1.0.0
 * @param {string} jsdoc - The entire jsdoc comment string
 * @param {string[]} tags - The tags to parse
 * @param {(link: InlineLink) => string} [linkRenderer] - Optional function to override default rendering of inline link and tutorial tags
 * @returns {object} Object with keys of each parsed tag
 * @docgen_note
 * For more information on <code>linkRenderer</code>, please see {@link #using-linkRenderer|Using a custom linkRenderer}.
 */
export var parseTags = function (jsdoc, tags, linkRenderer) {
  var tag = getTag(jsdoc, linkRenderer)
  return tags.reduce(function (accumulator, x) {
    var _a
    return Object.assign(
      accumulator,
      ((_a = {}), (_a[x.replace('@', '')] = tag(x)), _a)
    )
  }, {})
}
