'use strict';

exports.__esModule = true;

// private int getOrientation(byte[] jpeg) {
//   if (jpeg == null) {
//     return 0;
//   }
//
//   int offset = 0;
//   int length = 0;
//
//   // ISO/IEC 10918-1:1993(E)
//   while (offset + 3 < jpeg.length && (jpeg[offset++] & 0xFF) == 0xFF) {
//     int marker = jpeg[offset] & 0xFF;
//
//     // Check if the marker is a padding.
//     if (marker == 0xFF) {
//       continue;
//     }
//     offset++;
//
//     // Check if the marker is SOI or TEM.
//     if (marker == 0xD8 || marker == 0x01) {
//       continue;
//     }
//     // Check if the marker is EOI or SOS.
//     if (marker == 0xD9 || marker == 0xDA) {
//       break;
//     }
//
//     // Get the length and check if it is reasonable.
//     length = pack(jpeg, offset, 2, false);
//     if (length < 2 || offset + length > jpeg.length) {
//       Log.e(TAG, "Invalid length");
//       return 0;
//     }
//
//     // Break if the marker is EXIF in APP1.
//     if (marker == 0xE1 && length >= 8
//       && pack(jpeg, offset + 2, 4, false) == 0x45786966
//       && pack(jpeg, offset + 6, 2, false) == 0) {
//       offset += 8;
//       length -= 8;
//       break;
//     }
//
//     // Skip other markers.
//     offset += length;
//     length = 0;
//   }
//
//   // JEITA CP-3451 Exif Version 2.2
//   if (length > 8) {
//     // Identify the byte order.
//     int tag = pack(jpeg, offset, 4, false);
//     if (tag != 0x49492A00 && tag != 0x4D4D002A) {
//       Log.e(TAG, "Invalid byte order");
//       return 0;
//     }
//     boolean littleEndian = (tag == 0x49492A00);
//
//     // Get the offset and check if it is reasonable.
//     int count = pack(jpeg, offset + 4, 4, littleEndian) + 2;
//     if (count < 10 || count > length) {
//       Log.e(TAG, "Invalid offset");
//       return 0;
//     }
//     offset += count;
//     length -= count;
//
//     // Get the count and go through all the elements.
//     count = pack(jpeg, offset - 2, 2, littleEndian);
//     while (count-- > 0 && length >= 12) {
//       // Get the tag and check if it is orientation.
//       tag = pack(jpeg, offset, 2, littleEndian);
//       if (tag == 0x0112) {
//         int orientation = pack(jpeg, offset + 8, 2, littleEndian);
//         switch (orientation) {
//           case 1:
//             return 0;
//           case 3:
//             return 180;
//           case 6:
//             return 90;
//           case 8:
//             return 270;
//         }
//         Log.e(TAG, "Unsupported orientation");
//         return 0;
//       }
//       offset += 12;
//       length -= 12;
//     }
//   }
//
//   Log.e(TAG, "Orientation not found");
//   return 0;
// }
const _fileFun = {};
const _config = Object.create(_fileFun);
const _base = 1280;

/**
 * 通过 url 加载所需要的图片对象
 * @param url
 * @param fn
 */
_fileFun.urltoImage = (url, fn) =>{
  let img = new Image();
  img.src = url;
  img.onload = function() {
    fn(img);
  };
};

/**
 * 将 Image 对象转变为 Canvas 类型对象
 * @param image
 * @returns {HTMLCanvasElement}
 */
_fileFun.imagetoCanvas = (image) =>{
  let cvs = document.createElement('canvas');
  let ctx = cvs.getContext('2d');
  cvs.width = image.width;
  cvs.height = image.height;
  ctx.drawImage(image, 0, 0, cvs.width, cvs.height);
  return cvs ;
};

/**
 * 将 Canvas 对象压缩转变为 Blob 类型对象
 * @param canvas
 * @param quality
 * @param fn
 */
_fileFun.canvasResizetoFile = (canvas, quality, fn) =>{
  canvas.toBlob(function(blob) {
    fn(blob);
  }, 'image/jpeg', quality);
};

/**
 * 将 Canvas 对象压缩转变为 dataURL 字符串
 * @param canvas
 * @param quality
 * @returns {string}
 */
_fileFun.canvasResizetoDataURL = (canvas, quality) =>{
  return canvas.toDataURL('image/jpeg', quality);
};

/**
 * 将 File （ Blob ）类型文件转变为 dataURL 字符串
 * @param file
 * @param fn
 */
_fileFun.filetoDataURL = (file) =>{
  let reader = new FileReader();
  reader.onloadend = function(e) {
    // fn(e.target.result);
    _fileFun.dataURLtoImage(e.target.result);
  };
  reader.readAsDataURL(file);
};

/**
 * 将 dataURL 字符串转变为 Image 类型文件
 * @param dataurl
 * @param fn
 */
_fileFun.dataURLtoImage = (dataurl) =>{
  let img = new Image();
  img.onload = function() {
    // fn(img);
    computeImgae(img);
  };
  img.src = dataurl;
};

/**
 * 将 dataURL 字符串转变为 Blob 类型对象
 * @param dataurl
 * @returns {Blob}
 */
_fileFun.dataURLtoFile = (dataurl) =>{
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
};

function computeImgae(image) {
  // const width = image.o
  // console.log('---------', image.naturalWidth, image.naturalHeight);
  let width = image.naturalWidth;
  let height = image.naturalHeight;
  if (width > _base || height > _base) {
    if (width > height) {
      const scale = height / width;
      width = _base;
      height = width * scale;
    } else {
      const scale = width / height;
      height = _base;
      width = height * scale;
    }
  } else if (width > _base || height < _base) {
    const scale = height / width;
    width = _base;
    height = width * scale;
  } else if (width < _base || height > _base) {
    const scale = width / height;
    height = _base;
    width = height * scale;
  }
  image.width = width;
  image.height = height;
}

function compress(file, options) {
  _config.options = options;

  console.log('11111----------', typeof file, options);
  // eslint-disable-next-line no-undef
  return new Promise((resolve, reject)=>{
    _config.resolve = resolve;
    _config.reject = reject;
    _fileFun.filetoDataURL(file);
  });
}

exports.default = compress;
