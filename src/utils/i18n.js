export function generateTitle(title) {
  const hasKey = this.$t('route.' + title)

  if (hasKey) {
    const translatedTitle = this.$t('route.' + title)

    return translatedTitle
  }
  return title
}
