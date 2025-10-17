export function sortByNumericFilename<T extends { path: string; src: string }>(entries: T[]): T[] {
  return entries
    .map((e) => {
      const name = e.path.split('/').pop() || ''
      const num = Number(name.replace(/\..+$/, ''))
      return { ...e, order: Number.isNaN(num) ? 0 : num } as T & { order: number }
    })
    .sort((a, b) => (a as any).order - (b as any).order) as T[]
}

export function parseOrderAndTitle(filename: string) {
  const [orderText, rest] = filename.split('-', 2)
  const title = (rest || '').replace(/\..+$/, '')
  const order = Number(orderText)
  return { order: Number.isNaN(order) ? 0 : order, title }
}


