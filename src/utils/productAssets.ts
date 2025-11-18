const assetModules = import.meta.glob('../assets/content/product/list/**/*.{png,jpg,jpeg,webp}', {
  eager: true,
  import: 'default',
}) as Record<string, string>

export function resolveProductAsset(relativePath?: string) {
  if (!relativePath) return ''
  const cleaned = relativePath.replace(/^[./]+/, '')
  const entry = Object.entries(assetModules).find(([path]) => path.endsWith(cleaned))
  return entry ? entry[1] : ''
}


