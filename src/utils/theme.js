import color from 'css-color-function'
import rgbHex from 'rgb-hex'
import formula from '@/constant/formula.json'
import axios from 'axios'

/**
 * 根据主色，生成新的样式表
 */

export const generateNewStyle = async primaryColor => {
  // 根据主色，生成色系表
  const colorMap = generateColor(primaryColor) || {}

  // 获取原始样式
  let regionStyle = await getRegionStyle()
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    regionStyle = regionStyle.replace(
      new RegExp('(:|\\s+)' + key, 'g'),
      '$1' + value
    )
  })
  return regionStyle
}
/**
 * 根据主色值，生成新的色系表
 */
export const generateColor = primary => {
  if (!primary) return
  const colorMap = {
    primary
  }
  Object.keys(formula).forEach(key => {
    const value = formula[key].replace(/primary/gi, primary)
    colorMap[key] = '#' + rgbHex(color.convert(value))
  })
  return colorMap
}

/**
 * 获取当前版本下element-plus的index.scss
 */

export const getRegionStyle = async () => {
  const version = require('element-plus/package.json').version
  const url = `https://unpkg.com/element-plus@${version}/dist/index.css`
  const { data } = await axios(url)
  // 给原来的样式添加标记
  return getStyleTemplate(data)
}
/**
 * 给原来的样式添加标记
 */

export const getStyleTemplate = cssText => {
  const colorMap = {
    '#337ecc': 'dark-2',
    '#409eff': 'primary',
    '#53a8ff': 'light-1',
    '#66b1ff': 'light-2',
    '#79bbff': 'light-3',
    '#8cc5ff': 'light-4',
    '#a0cfff': 'light-5',
    '#b3d8ff': 'light-6',
    '#c6e2ff': 'light-7',
    '#d9ecff': 'light-8',
    '#ecf5ff': 'light-9'
  }
  // 根据默认色值为要替换的色值打上标记
  Object.keys(colorMap).forEach(key => {
    const value = colorMap[key]
    cssText = cssText.replace(new RegExp(key, 'ig'), value)
  })

  return cssText
}

/**
 * 写入样式表
 */

export const writeNewStyle = newStyleText => {
  const style = document.createElement('style')
  style.innerText = newStyleText
  document.head.appendChild(style)
}
