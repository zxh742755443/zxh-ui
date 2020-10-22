import {throttle} from 'throttle-debounce'

/**
 * 默认配置
 * @type {{delay: {default: number, type: NumberConstructor}, distance: {default: number, type: NumberConstructor}, disabled: {default: boolean, type: BooleanConstructor}}}
 */
const options = {
  disabled: {
    type: Boolean,
    default: false
  },
  delay: {
    type: Number,
    default: 200
  },
  distance: {
    type: Number,
    default: 0
  }
}

/**
 * 判断 el 是否能滚动
 * @param el
 * @returns {boolean}
 */
function isScroll (el) {
  let overflowY = window.getComputedStyle(el)['overflowY']
  return overflowY.match(/(scroll|auto)/)
}

/**
 * 获取滚动容器
 * @param el
 * @returns {Window|Node}
 */
function getScrollContainer (el) {
  while (el) {
    if ([window, document, document.documentElement].includes(el)) {
      return window
    } else if (isScroll(el)) {
      return el
    }
    el = el.parentNode
  }
}

/**
 * 获取配置
 * @param el
 * @returns {{}}
 */
function getOptions (el) {
  let map = {}
  Object.keys(options).forEach((key) => {
    const {type, default: defaultValue} = options[key]
    map[key] = defaultValue
    let value = el.getAttribute('infinite-scroll-' + key)
    if (type === Number && +value) {
      map[key] = +value
    } else if (type === Boolean && (value === 'false' || value === 'true')) {
      map[key] = value === 'false' ? false : Boolean(value)
    }
  })
  return map
}

function getAttribute (el, type) {
  el = [window, document].includes(el) ? document.documentElement : el
  return typeof el[type] === 'function' ? el[type]() : el[type]
}

function handleScroll (cb) {
  let {options, container, vm} = this.scope
  if (options.disabled) return

  let scrollHeight = getAttribute(container, 'scrollHeight')
  let clientHeight = getAttribute(container, 'clientHeight')
  let scrollTop = getAttribute(container, 'scrollTop')

  let shouldTrigger = scrollHeight - clientHeight - scrollTop <= options.distance
  if (shouldTrigger) {
    cb && cb.call(vm)
  }
}

export default {
  name: 'InfiniteScroll',
  inserted (el, binding, vnode) {
    let cb = binding.value
    // 获取父节点上下文
    let vm = vnode.context
    // 获取滚动容器
    let container = getScrollContainer(el)
    let options = getOptions(el)
    let onScroll = throttle(options.delay, handleScroll.bind(el, cb))
    el.scope = {container, el, vm, options, onScroll}
    // 监听 scroll
    if (container) {
      container.addEventListener('scroll', onScroll)
    }
  },
  unbind (el) {
    let {container, onScroll} = el.scope
    container.removeEventListener('scroll', onScroll)
  }
}
