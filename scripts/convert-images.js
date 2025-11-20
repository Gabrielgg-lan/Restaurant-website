import fs from 'fs/promises'
import path from 'path'
import sharp from 'sharp'

const IMG_DIR = path.resolve('src/assets/images')

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true })
  const files = []
  for (const e of entries) {
    const res = path.join(dir, e.name)
    if (e.isDirectory()) {
      files.push(...await walk(res))
    } else {
      files.push(res)
    }
  }
  return files
}

function looksLikeSvgBuffer(buffer) {
  try {
    const str = buffer.toString('utf8', 0, Math.min(buffer.length, 4096)).toLowerCase()
    return str.includes('<svg') || str.includes('<?xml')
  } catch (err) {
    return false
  }
}

async function run() {
  console.log('Scanning', IMG_DIR)
  const all = await walk(IMG_DIR)

  // Detect candidates: explicit .svg files OR files that contain SVG content even if extension differs
  const candidates = []
  for (const file of all) {
    const lower = file.toLowerCase()
    if (lower.endsWith('.svg') || lower.endsWith('.svg.jpg') || lower.endsWith('.svg.jpeg')) {
      candidates.push(file)
      continue
    }
    // read a slice to check for SVG content
    try {
      const fd = await fs.open(file, 'r')
      const { buffer } = await fd.read(Buffer.alloc(4096), 0, 4096, 0)
      await fd.close()
      if (looksLikeSvgBuffer(buffer)) {
        candidates.push(file)
      }
    } catch (err) {
      // ignore read errors for now
    }
  }

  if (candidates.length === 0) {
    console.log('No SVG-like files found under', IMG_DIR)
    return
  }

  for (const svgPath of candidates) {
    try {
      const rel = path.relative(IMG_DIR, svgPath)
      const parsed = path.parse(rel)

      // determine output path: we'll write a .jpg in the same folder
      const outName = path.join(parsed.dir, `${parsed.name}.jpg`)
      const outPath = path.join(IMG_DIR, outName)
      const outDir = path.dirname(outPath)
      await fs.mkdir(outDir, { recursive: true })

      console.log('Convert:', rel, '->', path.relative(process.cwd(), outPath))

      // read full content
      const buffer = await fs.readFile(svgPath)

      // if outPath would overwrite an existing file that is not the same as svgPath, create a backup
      if (svgPath !== outPath) {
        try {
          // if original outPath exists, back it up
          await fs.access(outPath)
          const backup = outPath + '.bak'
          await fs.copyFile(outPath, backup)
          console.log('Backed up existing', path.relative(process.cwd(), outPath), '->', path.relative(process.cwd(), backup))
        } catch (e) {
          // outPath doesn't exist, nothing to back up
        }
      } else {
        // svgPath === outPath (same filename), back up the source before overwriting
        const backup = svgPath + '.bak'
        try {
          await fs.copyFile(svgPath, backup)
          console.log('Backed up original', path.relative(process.cwd(), svgPath), '->', path.relative(process.cwd(), backup))
        } catch (e) {
          // ignore
        }
      }

      await sharp(buffer)
        .flatten({ background: '#ffffff' })
        .jpeg({ quality: 90 })
        .toFile(outPath)
    } catch (err) {
      console.error('Failed convert', svgPath, err)
    }
  }
  console.log('Done')
}

run().catch(err => {
  console.error(err)
  process.exit(1)
})