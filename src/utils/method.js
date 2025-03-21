/**
 * 给数字添加千位分割符
 * @param {string} num - 原数字
 */
export const addCommas = (num) => {
  if (!num && num !== 0) {
    return ''
  }
  num = num.toString()
  // 使用正则表达式添加逗号
  return num.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

/**
 * 替换字符串开头的固定字符
 * @param {string} originalString - 原字符串
 * @param {string} fixedPrefix - 被替换的部分
 * @param {string} newPrefix - 替换的部分
 */
export const replaceString = (originalString, fixedPrefix, newPrefix) => {
  return originalString.replace(new RegExp(`^${fixedPrefix}`), newPrefix)
}
