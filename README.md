# Ramda Reactive

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)

### ✅ Like vue-chemistry but with ramda functions instead

### ✅ Everything is still auto-curried

### ✅ All functions accept refs

### ✅ Completely typed

## Why

| computed                                    | ramda-reactive          |
| ------------------------------------------- | ----------------------- |
| `computed(() => map(inc, xs.value)`         | `useMap(inc, xs)`       |
| `computed(() => filter(lte(5), xs.value)`   | `useFilter(lte(5), xs)` |
| `computed(() => foo.value \|\| bar.value) ` | `useOr(foo, bar)`       |

- no `.value` everywhere
- no `computed(() =>`
- less visual clutter

## Examples

Simple reactive filtering

```js
import { ref } from 'vue'
import { useFilter } from 'ramda-reactive'
import { lt, __ } from 'ramda'

const xs = ref([1, 2, 3, 4])
const below3 = useFilter(lt(__, 3), xs)
// below3.value = [1, 2]

xs.value = [1, 1, 5]
// below3.value = [1, 1]

xs.value.push(1)
// below3.value = [1, 1, 1]
```

Advanced reactive filtering

```js
import { ref } from 'vue'
import { useFilter, useLt } from 'ramda-reactive'
import { __ } from 'ramda'

const xs = ref([1, 2, 3, 4])
const threshold = ref(4)
const lessThanThreshold = useLt(__, threshold)
const belowSomething = useFilter(lessThanThreshold, xs)
// belowSomething.value = [ 1, 2, 3 ]

threshold.value = 3
// belowSomething.value = [ 1, 2 ]

xs.value = [0, 1, 2, 3, 4]
// belowSomething.value = [ 0, 1, 2]
```

useCall to reactively call non reactive function

```js
import { ref } from 'vue'
import { useCall } from 'ramda-reactive'

const add = (a, b) => a + b

const foo = ref(1)
const bar = ref(2)

const result = useCall(add, foo, bar)
// result.value = 3

foo.value = 3
// result.value = 5
```

Properties on reactive objects can also be used (similar to vues watch)

```js
import { ref, reactive } from 'vue'
import { useAdd } from 'ramda-reactive'

const foo = ref(1)
const bar = reactive({ count: 2 })

const result = useAdd(foo, () => bar.count)
// result.value = 3

foo.value = 3
// result.value = 5

bar.count = 5
// result.value = 8
```

## Author

👤 **Tim Kutscha**

- Github: [@tikudev](https://github.com/tikudev)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Tim Kutscha](https://github.com/tikudev).

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
