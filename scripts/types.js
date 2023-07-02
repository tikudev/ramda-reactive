import ts from 'typescript'
import fs from 'fs'
import { canBeFunction } from './str.js'

const wrapNewType = (type, str) =>
  `${canBeFunction(type) ? ' MaybeRef' : ' MaybeWatchSource'}<${str}>`

const nodeToStr = code => node => code.substring(node.pos, node.end)

const getReplacementData = (code, fnNodes, ramdaFnsInfo) => {
  const ignoredNodes = []
  const failedNodes = []
  const nodeToCode = nodeToStr(code)

  const replacementData = fnNodes.flatMap(fnNode => {
    const ramdaFnInfoObj = ramdaFnsInfo.find(
      fnInfo => fnInfo.fnName === fnNode.name.escapedText
    )
    if (!ramdaFnInfoObj) {
      ignoredNodes.push(fnNode.name.escapedText)
      return []
    }
    const ramdaInfo = ramdaFnInfoObj.desc

    const paramTypes = ramdaInfo.original.params.map(p => p.type)

    let replacementNodes
    try {
      replacementNodes = getReplacementNodes(paramTypes, 0, fnNode, 0)
    } catch (e) {
      failedNodes.push(fnNode.name.escapedText)
      return []
    }

    const fnCode = nodeToCode(fnNode)

    const replacements = replacementNodes.map(({ type, node }) => {
      const replacementLocation = {
        from: node.pos - fnNode.pos,
        to: node.end - fnNode.pos,
      }

      if (type === 'returnType') {
        return {
          ...replacementLocation,
          with: ` ComputedRef<${nodeToCode(node).trim()}>`,
        }
      }

      const nameAndTypeToChange = nodeToCode(node)
      const typeToChange = nodeToCode(node.type)
      const newType = wrapNewType(type, typeToChange.trim())
      const newNameAndType = nameAndTypeToChange.replace(typeToChange, newType)

      const replacement = {
        ...replacementLocation,
        with: newNameAndType,
      }
      return replacement
    })

    // add fn name to replacements
    const fnNameReplacement = {
      from: fnNode.name.pos - fnNode.pos,
      to: fnNode.name.end - fnNode.pos,
      with: ' ' + ramdaInfo.reactive.name,
    }

    return [{ str: fnCode, replacements: [fnNameReplacement, ...replacements] }]
  })

  return { replacementData, ignoredNodes, failedNodes }
}

export const genTypes = (filename, ramdaFnsInfo) => {
  const code = fs.readFileSync(filename).toString()
  const sourceFile = ts.createSourceFile(filename, code, ts.ScriptTarget.Latest)

  const fnNodes = sourceFile.statements.filter(
    s => s.kind === ts.SyntaxKind.FunctionDeclaration
  )

  const replacementData = getReplacementData(code, fnNodes, ramdaFnsInfo)
  console.info('ignored:', replacementData.ignoredNodes)
  console.info('failed:', replacementData.failedNodes)

  const transformedFns = replacementData.replacementData.map(replaceMulti)
  return startOfTypeDefinitions + transformedFns.join('')
}

const replaceMulti = ({ str, replacements }) => {
  const originalStr = str

  return replacements.reduce(
    (acc, replacement, index) => {
      const str =
        acc.str +
        originalStr.substring(acc.start, replacement.from) +
        replacement.with

      if (index === replacements.length - 1) {
        return str + originalStr.substring(replacement.to)
      }
      return { str, start: replacement.to }
    },
    { str: '', start: 0 }
  )
  //
}

/**
 * Calculates all param types
 * @param {string[]} paramTypes List of expected paramType
 * @param {import('typescript').FunctionDeclaration} fnNode
 *
 * returns a list [[paramType, node], ..., [returnType, node]]
 */
const getReplacementNodes = (
  paramDefTypes,
  paramDefTypeIndex,
  currentParentNode,
  currentParamNodeIndex,
  result = []
) => {
  const currentParamDefType = paramDefTypes[paramDefTypeIndex]

  if (!currentParamDefType) {
    const returnTypeNode = currentParentNode.type
    const returnNode =
      returnTypeNode.kind === ts.SyntaxKind.TypePredicate
        ? returnTypeNode.type
        : returnTypeNode

    return [...result, { type: 'returnType', node: returnNode }]
  }

  if (!currentParentNode.parameters && currentParentNode.members) {
    return [
      ...result,
      ...currentParentNode.members.flatMap(memberNode => {
        return getReplacementNodes(
          paramDefTypes,
          paramDefTypeIndex,
          memberNode,
          0,
          []
        )
      }),
    ]
  }

  if (
    !currentParentNode.parameters &&
    currentParentNode?.typeName?.right?.escapedText === 'Curry'
  ) {
    return getReplacementNodes(
      paramDefTypes,
      paramDefTypeIndex,
      currentParentNode.typeArguments[0],
      0,
      result
    )
  }

  if (
    !currentParentNode.parameters &&
    currentParentNode.kind === ts.SyntaxKind.IntersectionType
  ) {
    return [
      ...result,
      ...currentParentNode.types.flatMap(childNode => {
        return getReplacementNodes(
          paramDefTypes,
          paramDefTypeIndex,
          childNode,
          0,
          []
        )
      }),
    ]
  }

  if (
    !currentParentNode.parameters &&
    currentParentNode.kind === ts.SyntaxKind.ParenthesizedType
  ) {
    return getReplacementNodes(
      paramDefTypes,
      paramDefTypeIndex,
      currentParentNode.type,
      currentParamNodeIndex,
      result
    )
  }

  if (!currentParentNode.parameters) {
    // console.error(paramDefTypes)
    // console.error('throwing with current result:', result)
    throw currentParentNode
  }

  const currentParamNode = currentParentNode.parameters[currentParamNodeIndex]

  if (!currentParamNode) {
    // fn is probably curried
    return getReplacementNodes(
      paramDefTypes,
      paramDefTypeIndex,
      currentParentNode.type,
      0,
      result
    )
  }

  if (currentParamNode.type?.typeName?.escapedText === 'Placeholder') {
    return getReplacementNodes(
      paramDefTypes,
      paramDefTypeIndex,
      currentParentNode,
      currentParamNodeIndex + 1,
      result
    )
  }

  return getReplacementNodes(
    paramDefTypes,
    paramDefTypeIndex + 1,
    currentParentNode,
    currentParamNodeIndex + 1,
    [...result, { type: currentParamDefType, node: currentParamNode }]
  )
}

const startOfTypeDefinitions = `import { Ref, WatchSource, ComputedRef } from 'vue'
import * as _ from 'ts-toolbelt'
import {
  AtLeastOneFunctionsFlow,
  AtLeastOneFunctionsFlowFromRightToLeft,
  CondPair,
  CondPairTypeguard,
  Evolvable,
  Evolve,
  Evolver,
  Falsy,
  Functor,
  InferAnyAType,
  KeyValuePair,
  Lens,
  InferAllAType,
  mergeArrWithLeft,
  LargestArgumentsList,
  IfFunctionsArgumentsDoNotOverlap,
  ObjPred,
  Ord,
  LT,
  EQ,
  GT,
  Ordering,
  ObjectHavingSome,
  PartialRecord,
  Path,
  Placeholder,
  Pred,
  PredTypeguard,
  Reduced,
  Fn,
  ReturnTypesOfFns,
  InputTypesOfFns,
  ValueOfUnion,
  Take,
  Tuple,
  ToTupleOfArray,
  ToTupleOfFunction,
  Prop,
  DeepModify,
} from 'ramda'

/**
 * Either a Ref containing a type or the type itself
 */
type MaybeRef<T> = Ref<T> | T

/**
 * Either a Watchsource with the type or the type itself
 */
type MaybeWatchSource<T> = WatchSource<T> | T

`
