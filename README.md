# Ramda Reactive

![Version](https://img.shields.io/badge/version-1.0.1-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://choosealicense.com/licenses/mit/)

### ✅ Like vue-chemistry but with ramda functions instead

### ✅ Everything is still auto-curried

### ✅ All parameters can be refs, even functions

## Why

| computed                                    | ramda-reactive          |
| ------------------------------------------- | ----------------------- |
| `computed(() => map(inc, xs.value)`         | `useMap(inc, xs)`       |
| `computed(() => filter(lte(5), xs.value)`   | `useFilter(lte(5), xs)` |
| `computed(() => foo.value \|\| bar.value) ` | `useOr(foo, bar)`       |

- no `.value` everywhere
- no `computed(() =>`
- less visual clutter

## Author

👤 **Tim Kutscha**

- Github: [@tikudev](https://github.com/tikudev)

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2023 [Tim Kutscha](https://github.com/tikudev).

This project is [MIT](https://choosealicense.com/licenses/mit/) licensed.
