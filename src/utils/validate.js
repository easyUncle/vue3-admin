export function isExternal(url) {
  return /^(https?:|mailto:|tel:)/.test(url)
}
