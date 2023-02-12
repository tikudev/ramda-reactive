import test from 'node:test'
import assert from 'node:assert'
import * as sut from './index.js'
import { ref, unref } from 'vue'
import { always, toUpper, multiply, add } from 'ramda'

const testReactive = (
  composableFn,
  [inputs, expectedOutput],
  ...nextAssertions
) => {
  const actual = composableFn(...inputs)
  assert.deepStrictEqual(actual.value, expectedOutput)

  nextAssertions.forEach(([transformFns, expectedOutput]) => {
    transformFns.forEach((transformFn, index) => {
      const currentInput = inputs[index]
      currentInput.value = transformFn(currentInput)
    })
    assert.deepStrictEqual(actual.value, expectedOutput)
  })
}

const allTests = {
  useAdd: [
    [
      [[ref(1), ref(2)], 3],
      [[always(2)], 4],
    ],
    [
      [[ref(1), 2], 3],
      [[always(2)], 4],
    ],
  ],
  useAnd: [
    [
      [[ref(false), ref(true)], false],
      [[always(true)], true],
    ],
    [[[true, true], true]],
  ],
  useAdjust: [
    [
      [
        [ref(1), toUpper, ['a', 'b', 'c', 'd']],
        ['a', 'B', 'c', 'd'],
      ],
      [[always(0)], ['A', 'b', 'c', 'd']],
    ],
  ],
  useAp: [
    [
      [
        [ref([multiply(2), add(3)]), [1, 2, 3]],
        [2, 4, 6, 4, 5, 6],
      ],
      [[() => [add(2), add(3)]], [3, 4, 5, 4, 5, 6]],
    ],
    [
      [
        [[multiply(2), add(3)], ref([1, 2, 3])],
        [2, 4, 6, 4, 5, 6],
      ],
      [
        [unref, always([2, 4])],
        [4, 8, 5, 7],
      ],
    ],
  ],
  useAperture: [
    [
      [
        [ref(2), ['a', 'b', 'c', 'd']],
        [
          ['a', 'b'],
          ['b', 'c'],
          ['c', 'd'],
        ],
      ],
      [
        [always(3)],
        [
          ['a', 'b', 'c'],
          ['b', 'c', 'd'],
        ],
      ],
    ],
  ],
  useAppend: [
    [
      [
        [ref(3), [1, 2]],
        [1, 2, 3],
      ],
      [[always(5)], [1, 2, 5]],
    ],
  ],
  useApply: [
    [[[Math.max, [1, 2, 3]], 3]],
    [
      [[Math.max, ref([1, 2, 3])], 3],
      [[unref, always([0, 1])], 1],
    ],
  ],
  useApplyTo: [
    [[[3, add(1)], 4]],
    [
      [[ref(3), add(1)], 4],
      [[always([0])], 1],
    ],
    [
      [[ref(3), ref(add(1))], 4],
      [[always([0]), always(add(2))], 2],
    ],
  ],
  useAssoc: [
    [[['foo', 2, { bar: 3 }], { foo: 2, bar: 3 }]],
    [
      [[ref('foo'), ref(2), ref({ bar: 3 })], { foo: 2, bar: 3 }],
      [[unref, always(3), always({ buzz: 4 })], { foo: 3, buzz: 4 }],
    ],
  ],
  useAssocPath: [
    [[[['foo', 'boo'], 2, { bar: 3 }], { foo: { boo: 2 }, bar: 3 }]],
    [
      [
        [ref(['foo', 'boo']), ref(2), ref({ bar: 3 })],
        { foo: { boo: 2 }, bar: 3 },
      ],
      [[unref, always(3), always({ buzz: 4 })], { foo: { boo: 3 }, buzz: 4 }],
    ],
  ],
  useCall: [
    [[[ref(Math.max), 1, 2, 3], 3]],
    [
      [[ref(Math.max), ref(1), 2, 3], 3],
      [[always(Math.min), always(0)], 0],
    ],
  ],
}

Object.entries(allTests).forEach(([fnName, testCases]) =>
  testCases.forEach((assertions, testCaseIndex) =>
    test(`${testCaseIndex + 1}. ${fnName} `, () => {
      testReactive(sut[fnName], ...assertions)
    })
  )
)

test('useApplySpec', () => {
  const specObj = ref({
    sum: add,
    nested: { mul: multiply },
  })

  const metricInputs = ref([2, 4])
  const result = sut.useApply(sut.useApplySpec(specObj), metricInputs) // => result.value === { sum: 6, nested: { mul: 8 } }
  assert.deepStrictEqual(result.value, { sum: 6, nested: { mul: 8 } })
  specObj.value = { multi: multiply }
  assert.deepStrictEqual(result.value, { multi: 8 })
})

test('useAscend', () => {
  const sortProp = ref('age')
  const ascendSortingFn = sut.useAscend(sut.useProp(sortProp))
  const people = [
    { name: 'Emma', age: 70, height: 170 },
    { name: 'Peter', age: 78, height: 180 },
    { name: 'Mikhail', age: 62, height: 190 },
  ]
  const sortedPeople = sut.useSort(ascendSortingFn, people)
  assert.deepStrictEqual(sortedPeople.value, [
    { name: 'Mikhail', age: 62, height: 190 },
    { name: 'Emma', age: 70, height: 170 },
    { name: 'Peter', age: 78, height: 180 },
  ])

  sortProp.value = 'height'
  assert.deepStrictEqual(sortedPeople.value, [
    { name: 'Emma', age: 70, height: 170 },
    { name: 'Peter', age: 78, height: 180 },
    { name: 'Mikhail', age: 62, height: 190 },
  ])
})

test('useChain', () => {
  const duplicate = n => [n, n]
  const inputList = ref([1, 2, 3])
  const actual = sut.useChain(duplicate, inputList)
  assert.deepStrictEqual(actual.value, [1, 1, 2, 2, 3, 3])
  inputList.value = [4, 7]
  assert.deepStrictEqual(actual.value, [4, 4, 7, 7])
})
