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
export var first = function (array, defaultValue) {
  return (array && array[0]) || defaultValue
}
export var isNotNullOrEmpty = function (value) {
  if (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value === '') ||
    (typeof value === 'object' && Object.keys(value).length <= 0)
  )
    return false
  if (Array.isArray(value)) {
    return value.length > 0
  }
  return true
}
export var isNullOrEmpty = function (value) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === 'string' && value === '') ||
    (Array.isArray(value) && value.length <= 0) ||
    (typeof value === 'object' && Object.keys(value).length <= 0)
  )
}
export var getTagRegExp = function (tag) {
  return new RegExp(
    ' ' +
      tag +
      '(?: |\\r\\n|\\r|\\n)(.*?)(\\r\\n|\\r|\\n)*((?:(?:(?! @).)(?:\\{@link|\\{@tutorial))*(?:(?!( @|\\*\\/)).)*(\\r\\n|\\r|\\n)?)*',
    'gm'
  )
}
var removeJsDocCommentStars = function (jsdoc) {
  return jsdoc
    .replace(/(?: *?\*\/|^ *?\* ?|\/\*\* ?)/gm, '')
    .replace(/ ?\*$/, '')
    .trim()
}
/**
 * Gets the 'description' tag
 *
 * @param {string} jsdoc The entire jsdoc string
 * @returns {ITag}
 */
export var getDescription = function (jsdoc, linkRenderer) {
  // from tag
  var description = getTag('@description')(jsdoc, linkRenderer)
  if (isNotNullOrEmpty(description)) return description
  // no tag - single line
  var text = first(jsdoc.match(/\/\*\*((?:(?! @).)*)(?: *)\*\//), '')
  if (isNotNullOrEmpty(text)) {
    var raw_1 = removeJsDocCommentStars(text)
    return {
      tag: '@description',
      value: processInlineLinks(raw_1, linkRenderer),
      raw: raw_1,
    }
  }
  // no tag - multiline
  var raw = first(
    jsdoc.match(
      /\/\*\*((?:(?! @).)*)(\r\n|\r|\n)*((?:(?:(?! @).)(?:\{@link|\{@tutorial))*(?:(?!( @)).)*(\r\n|\r|\n)?)*/
    ),
    ''
  )
    .replace(/^(?:\/\*\*| *\*\/? *)/gm, '')
    .trim()
  if (isNotNullOrEmpty(raw)) {
    return {
      tag: '@description',
      value: processInlineLinks(raw, linkRenderer),
      raw: raw,
    }
  }
}
/**
 * Gets 'param' tags
 *
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {IParam[]}
 */
export var getTemplate = function () {
  return function (jsdoc, linkRenderer) {
    var rawParams = getTags('@template')(jsdoc, linkRenderer)
    if (isNullOrEmpty(rawParams)) return []
    return rawParams.reduce(function (accumulator, param) {
      var match = param.raw.match(/@template *(?:{(.*?)} *)?(?:- )?(.*)/)
      if (isNotNullOrEmpty(match[1])) {
        return __spreadArrays(accumulator, [
          {
            tag: '@template',
            value: match[1].trim(),
            description: processInlineLinks(match[2].trim(), linkRenderer),
            raw: match[0].trim(),
          },
        ])
      }
      if (isNullOrEmpty(match[2])) {
        return __spreadArrays(accumulator, [
          {
            tag: '@template',
            raw: match[0].trim(),
          },
        ])
      }
      return __spreadArrays(accumulator, [
        {
          tag: '@template',
          value: processInlineLinks(match[2].trim(), linkRenderer),
          description: undefined,
          raw: match[0].trim(),
        },
      ])
    }, [])
  }
}
/**
 * Gets 'param' tags
 *
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {IParam[]}
 */
export var getParam = function (tag) {
  return function (jsdoc, linkRenderer) {
    var rawParams = getTags(tag)(jsdoc, linkRenderer)
    if (isNullOrEmpty(rawParams)) return []
    return rawParams.reduce(function (accumulator, param) {
      var match = param.raw.match(/{(.*?)} (\[.*\]|.*?)(?: |$)(?:- )?(.*)/)
      if (isNullOrEmpty(match)) return accumulator
      var type = match[1]
      var optional = match[2].startsWith('[') && match[2].endsWith(']')
      var name = optional
        ? match[2].substring(1, match[2].length - 1)
        : match[2]
      var description = processInlineLinks(match[3].trim(), linkRenderer)
      var defaultValue
      if (optional && !name.startsWith('{') && name.indexOf('=') >= 0) {
        defaultValue = name.replace(first(name.split('=', 1), '') + '=', '')
        name = name.replace('=' + defaultValue, '')
      }
      return __spreadArrays(accumulator, [
        {
          tag: tag,
          type: type,
          name: name,
          description: description,
          optional: optional,
          defaultValue: defaultValue,
          raw: tag + ' ' + match[0].trim(),
        },
      ])
    }, [])
  }
}
/**
 * Gets tag shaped like TType
 *
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {IType}
 */
export var getTyped = function (tag) {
  return function (jsdoc) {
    var _a
    var regex = new RegExp(
      tag + ' *(?:(?![A-Za-z]))(?:{(.*?)} *)?(?:- )?(.*)',
      'g'
    )
    var match = first(Array.from(jsdoc.matchAll(regex)))
    if (isNullOrEmpty(match)) return
    return {
      tag: tag,
      type: (_a = match[1]) === null || _a === void 0 ? void 0 : _a.trim(),
      description: isNotNullOrEmpty(match[2]) ? match[2].trim() : undefined,
      raw: match[0].trim(),
    }
  }
}
/**
 * Gets the requested tag data
 *
 * @param {string} tag - The tag to find
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {(ITag | ITag[])}
 */
export var getTag = function (tag) {
  return function (jsdoc, linkRenderer) {
    var matches = jsdoc.match(getTagRegExp(tag))
    if (isNullOrEmpty(matches)) {
      return
    }
    var match = first(matches).match(/\*/g)
    if (isNotNullOrEmpty(match) && match.length <= 1) {
      var raw_2 = removeJsDocCommentStars(first(matches, ''))
      return {
        tag: tag,
        value: processInlineLinks(raw_2.replace(tag, '').trim(), linkRenderer),
        raw: raw_2,
      }
    }
    var raw = removeJsDocCommentStars(first(matches, ''))
    return {
      tag: tag,
      value: processInlineLinks(raw.replace(tag, '').trim(), linkRenderer),
      raw: raw,
    }
  }
}
/**
 * Gets all matching jsdoc tags
 *
 * @param {string} tag - The name of the tag to get
 * @param {string} jsdoc - The entire jsdoc string
 * @returns {string[]} Array of string values for each matching tag
 */
export var getTags = function (tag) {
  return function (jsdoc, linkRenderer) {
    var regex = getTagRegExp(tag)
    var matches = __spreadArrays(Array.from(jsdoc.matchAll(regex)))
    if (isNullOrEmpty(matches)) {
      return []
    }
    if (matches.length > 1) {
      return matches.map(function (x) {
        var raw = removeJsDocCommentStars(first(x, ''))
        return {
          tag: tag,
          value: processInlineLinks(raw.replace(tag, '').trim(), linkRenderer),
          raw: raw,
        }
      })
    }
    return [getTag(tag)(jsdoc, linkRenderer)]
  }
}
/**
 * Converts links and tutorial links to anchor tags
 * @param jsdoc - Any jsdoc string
 * @returns {string} The updated string with anchor tags
 */
var processInlineLinks = function (jsdoc, linkRenderer) {
  if (isNullOrEmpty(jsdoc)) return jsdoc
  var renderLink =
    linkRenderer ||
    function (link) {
      return '<a href="' + link.url + '">' + link.text + '</a>'
    }
  var matches = Array.from(
    jsdoc.matchAll(
      /(?:\[(.*?)\])?{@(link|tutorial) (.*?)(?:(?:\|| +)(.*?))?}/gm
    )
  )
  if (isNullOrEmpty(matches)) return jsdoc
  for (var _i = 0, matches_1 = matches; _i < matches_1.length; _i++) {
    var match = matches_1[_i]
    var tag = match[2].trim()
    var url = match[3].trim()
    var text = url
    if (isNotNullOrEmpty(match[4])) {
      text = match[4].trim()
    } else if (isNotNullOrEmpty(match[1])) {
      text = match[1].trim()
    }
    jsdoc = jsdoc.replace(
      match[0],
      renderLink({ tag: tag, url: url, text: text, raw: match[0] })
    )
  }
  return jsdoc
}
/** Gets a Map object with all possible jsdoc tags and their parsing function */
export var getTagMap = function () {
  return new Map([
    ['@abstract', getTag('@abstract')],
    ['@access', getTag('@access')],
    ['@alias', getTag('@alias')],
    ['@arg', getParam('@arg')],
    ['@argument', getParam('@argument')],
    ['@async', getTag('@async')],
    ['@augments', getTag('@augments')],
    ['@author', getTag('@author')],
    ['@borrows', getTag('@borrows')],
    ['@category', getTag('@category')],
    ['@callback', getTag('@callback')],
    ['@class', getTag('@class')],
    ['@classdesc', getTag('@classdesc')],
    ['@const', getTag('@const')],
    ['@constant', getTag('@constant')],
    ['@constructor', getTag('@constructor')],
    ['@constructs', getTag('@constructs')],
    ['@copyright', getTag('@copyright')],
    ['@default', getTag('@default')],
    ['@defaultvalue', getTag('@defaultvalue')],
    ['@deprecated', getTag('@deprecated')],
    ['@desc', getTag('@desc')],
    ['@description', getDescription],
    ['@emits', getTag('@emits')],
    ['@enum', getTyped('@enum')],
    ['@event', getTag('@event')],
    ['@example', getTags('@example')],
    ['@exception', getTags('@exception')],
    ['@exports', getTag('@exports')],
    ['@extends', getTag('@extends')],
    ['@external', getTag('@external')],
    ['@file', getTag('@file')],
    ['@fileoverview', getTag('@fileoverview')],
    ['@fires', getTag('@fires')],
    ['@func', getTag('@func')],
    ['@function', getTag('@function')],
    ['@generator', getTag('@generator')],
    ['@global', getTag('@global')],
    ['@hideconstructor', getTag('@hideconstructor')],
    ['@host', getTag('@host')],
    ['@ignore', getTag('@ignore')],
    ['@implements', getTyped('@implements')],
    ['@inheritdoc', getTag('@inheritdoc')],
    ['@inner', getTag('@inner')],
    ['@instance', getTag('@instance')],
    ['@interface', getTag('@interface')],
    ['@kind', getTag('@kind')],
    ['@lends', getTag('@lends')],
    ['@license', getTag('@license')],
    ['@listens', getTag('@listens')],
    ['@member', getTyped('@member')],
    ['@memberof', getTag('@memberof')],
    ['@method', getTag('@method')],
    ['@mixes', getTag('@mixes')],
    ['@mixin', getTag('@mixin')],
    ['@module', getTag('@module')],
    ['@name', getTag('@name')],
    ['@namespace', getTag('@namespace')],
    ['@override', getTag('@override')],
    ['@overview', getTag('@overview')],
    ['@package', getTag('@package')],
    ['@param', getParam('@param')],
    ['@private', getTag('@private')],
    ['@prop', getParam('@prop')],
    ['@property', getParam('@property')],
    ['@protected', getTag('@protected')],
    ['@public', getTag('@public')],
    ['@readonly', getTag('@readonly')],
    ['@requires', getTags('@requires')],
    ['@return', getTyped('@return')],
    ['@returns', getTyped('@returns')],
    ['@see', getTags('@see')],
    ['@since', getTag('@since')],
    ['@static', getTag('@static')],
    ['@summary', getTag('@summary')],
    ['@template', getTemplate()],
    ['@this', getTag('@this')],
    ['@throws', getTags('@throws')],
    ['@todo', getTags('@todo')],
    ['@tutorial', getTags('@tutorial')],
    ['@type', getTyped('@type')],
    ['@typedef', getTyped('@typedef')],
    ['@var', getTyped('@var')],
    ['@variation', getTag('@variation')],
    ['@version', getTag('@version')],
    ['@virtual', getTag('@virtual')],
    ['@yield', getTyped('@yield')],
    ['@yields', getTyped('@yields')],
  ])
}
