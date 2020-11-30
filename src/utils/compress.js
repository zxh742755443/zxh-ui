import EXIF from 'exif-js';

let _config = null;

/**
 * 通过 url 加载所需要的图片对象
 * @param url
 * @param cb
 */
export function urltoImage(url, cb) {
  let img = new Image();
  img.src = url;
  img.crossOrigin = '';
  img.onload = function() {
    cb && cb(img);
  };
}

/**
 * 将 Image 对象转变为 Canvas 类型对象
 * @param image
 * @returns {HTMLCanvasElement}
 */
export function imagetoCanvas(image) {
  let canvas = document.createElement('canvas');
  let context = canvas.getContext('2d');
  let w = image.width;
  let h = image.height;
  switch (_config.orientation) {
    case 6: // 需要顺时针90度旋转
      canvas.width = h;
      canvas.height = w;
      context.rotate((90 * Math.PI) / 180);
      context.drawImage(image, 0, -h, w, h);
      break;
    case 8: // 需要逆时针90度旋转
      canvas.width = h;
      canvas.height = w;
      context.rotate((-90 * Math.PI) / 180);
      context.drawImage(image, -w, 0, w, h);
      break;
    case 3: // 需要180度旋转
      context.rotate((180 * Math.PI) / 180);
      context.drawImage(image, -w, -h, w, h);
      break;
    default:
      canvas.width = w;
      canvas.height = h;
      context.drawImage(image, 0, 0, w, h);
  }
  return canvas ;
}

/**
 * 将 canvas 对象压缩转变为 Blob 类型对象
 * @param canvas
 * @param quality
 * @param cb
 */
export function canvasResizetoFile(canvas, quality, cb) {
  canvas.toBlob(function(blob) {
    blob.name = _config.name;
    cb && cb(blob);
  }, _config.type, quality);
}

/**
 * 将 canvas 对象压缩转变为 dataURL 字符串
 * @param canvas
 * @param quality
 * @returns {string}
 */
export function canvasResizetoDataURL(canvas, quality) {
  return canvas.toDataURL(_config.type, quality);
}

/**
 * 将 File （ Blob ）类型文件转变为 dataURL 字符串
 * @param file
 * @param cb
 */
export function filetoDataURL(file, cb) {
  let reader = new FileReader();
  reader.onloadend = function(e) {
    cb && cb(e.target.result);
  };
  reader.readAsDataURL(file);
}

/**
 * 将 dataURL 字符串转变为 Image 类型文件
 * @param dataurl
 * @param cb
 */
export function dataURLtoImage(dataurl, cb) {
  let img = new Image();
  img.onload = function() {
    cb && cb(img);
  };
  img.src = dataurl;
}

/**
 * 将 dataURL 字符串转变为 Blob 类型对象
 * @param dataurl
 * @returns {Blob}
 */
export function dataURLtoFile(dataurl) {
  let arr = dataurl.split(',');
  let mime = arr[0].match(/:(.*?);/)[1];
  let bstr = atob(arr[1]);
  let n = bstr.length;
  // eslint-disable-next-line no-undef
  let u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

/**
 * 设置图片宽高
 * @param image
 */
function computeImgae(image) {
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  if (width > _config.base && height > _config.base) {
    if (width > height) {
      const scale = height / width;
      width = _config.base;
      height = width * scale;
    } else {
      const scale = width / height;
      height = _config.base;
      width = height * scale;
    }
  } else if (width > _config.base && height < _config.base) {
    const scale = height / width;
    width = _config.base;
    height = width * scale;
  } else if (width < _config.base && height > _config.base) {
    const scale = width / height;
    height = _config.base;
    width = height * scale;
  }
  image.width = width;
  image.height = height;
  engine(imagetoCanvas(image), 1);
}

/**
 * 压缩图片质量
 * @param canvas
 * @param quality
 */
function engine(canvas, quality) {
  canvasResizetoFile(canvas, quality, (blob)=>{
    if (blob.size > _config.size) {
      if (quality - _config.qualityStep <= 0.5) {
        _config.resolve(blob);
        return;
      }
      engine(canvas, quality - _config.qualityStep);
    } else {
      _config.resolve(blob);
    }
  });
}

export default function compress(file, options) {
  if (!file || !/image\/(png|jpe?g)/.test(file.type)) {
    throw new Error('please upload image[png,jpg,jpeg] file');
  }
  _config = Object.create(options || null);
  _config.size = file.size;
  _config.type = file.type.replace(/png$/, 'jpeg');
  _config.name = file.name.replace(/\.png$/, '.jpeg');
  _config.qualityStep = 0.1;
  _config.base = 1080;

  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject)=>{
    _config.resolve = resolve;
    _config.reject = reject;
    EXIF.getData(file, () => {
      _config.orientation = EXIF.getTag(file, 'Orientation');
      filetoDataURL(file, (data)=>{
        dataURLtoImage(data, computeImgae);
      });
    });
  });
}
