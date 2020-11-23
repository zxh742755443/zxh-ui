import {throttle} from 'throttle-debounce';

/**
 * 判断 el 是否能滚动
 * @param el
 * @returns {boolean}
 */
function isScroll(el) {
  let overflowY = window.getComputedStyle(el)['overflowY'];
  return overflowY.match(/(scroll|auto)/);
}

/**
 * 获取滚动容器
 * @param el
 * @returns {Window|Node}
 */
function getScrollContainer(el) {
  while (el) {
    if ([window, document, document.documentElement].includes(el)) {
      return window;
    } else if (isScroll(el)) {
      return el;
    }
    el = el.parentNode;
  }
}

function isImgTag(el) {
  return el instanceof HTMLImageElement;
}

function setImg(el, data) {
  if (data.background) {
    el.style.background = data.background;
  }
  if (data.src) {
    el.setAttribute('src', data.src);
  }
}

function handleByLoading(el, value) {
  el.setAttribute('loading', 'lazy');
  setImg(el, value);
}

function handleByObserver(el, value) {
  let intersectionObserver = new IntersectionObserver(function(entries) {
    if (entries[0].intersectionRatio <= 0) return;
    setImg(el, value);
    intersectionObserver.unobserve(el);
  });
  intersectionObserver.observe(el);
}

function handleByScroll(value) {
  const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
  const rect = this.getBoundingClientRect();
  if (rect.top <= viewPortHeight && !this.src) {
    setImg(this, value);
  }
}

export default {
  name: 'LazyLoading',
  inserted(el, binding) {
    let value = binding.value;
    if (!isImgTag(el) || !value) return;
    if (typeof value === 'string') {
      value = {src: value};
    }
    if ('loading' in el) {
      handleByLoading(el, value);
    } else if ('IntersectionObserver' in window) {
      handleByObserver(el, value);
    } else {
      let container = getScrollContainer(el);
      let onScroll = throttle(100, handleByScroll.bind(el, value));
      el.scope = {container, el, onScroll};
      if (container) {
        container.addEventListener('scroll', onScroll);
      }
      onScroll();
    }
  },
  unbind(el) {
    let {container, onScroll} = el.scope;
    container && container.removeEventListener('scroll', onScroll);
  }
};
