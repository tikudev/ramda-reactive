import path from 'path'
import url from 'url'
import fs from 'fs'

export const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
export const ramdaPath = path.resolve(__dirname, '../node_modules/ramda/es/')
export const ramdaTypeDefFilePath = path.resolve(
  __dirname,
  '../node_modules/types-ramda/es/index.d.ts'
)
export const genOutputDir = path.resolve(__dirname, '../source/')

const getIndexCode = () => {
  const files = fs.readdirSync(genOutputDir)
  return files
    .map(f => {
      const fnName = f.replace('.js', '')
      return `export { default as ${fnName} } from './${f}'`
    })
    .join('\n')
}

export const getRamdaFilesInfo = async () => {
  const files = await Promise.all(
    (
      await fs.promises.readdir(ramdaPath)
    ).map(async file => {
      const out = {
        file,
        path: path.join(ramdaPath, file),
      }
      out.stat = await fs.promises.stat(out.path)
      return out
    })
  )
  const onlyFiles = files.filter(f => f.stat.isFile())

  return onlyFiles.map(f => ({
    ...f,
    content: fs.readFileSync(f.path).toString(),
  }))
}

export const writeNewFiles = (ramdaFnsInfo, ramdaReactiveTypesCode) => {
  if (!fs.existsSync(genOutputDir)) {
    fs.mkdirSync(genOutputDir)
  } else {
    fs.readdirSync(genOutputDir).forEach(f => fs.rmSync(`${genOutputDir}/${f}`))
  }

  ramdaFnsInfo.forEach(r => {
    const toPath = path.join(genOutputDir, `${r.desc.reactive.name}.js`)
    fs.writeFileSync(toPath, r.newContent.reactifiedCode)
  })

  const ramdaReactiveCode = ramdaFnsInfo
    .map(r => r.newContent.jsDoc + 'export ' + r.newContent.fn)
    .join('\n')

  const ramdaReactiveImports = `import { computed, unref } from 'vue'
import { ${ramdaFnsInfo
    .map(r => r.desc.original.name)
    .join(', ')}} from 'ramda'`

  const sourceDist = path.resolve(__dirname, '../sourceDist/')
  if (!fs.existsSync(sourceDist)) {
    fs.mkdirSync(sourceDist)
  }

  fs.writeFileSync(
    path.join(sourceDist, 'ramda-reactive.js'),
    ramdaReactiveImports + '\n\n' + ramdaReactiveCode
  )

  fs.writeFileSync(path.join(genOutputDir, 'index.js'), getIndexCode())

  fs.writeFileSync(
    path.join(genOutputDir, 'types.d.ts'),
    ramdaReactiveTypesCode
  )
}
