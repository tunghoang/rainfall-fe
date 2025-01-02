export const calcStartDate = (endDate) => {
    const now = new Date(endDate)
    now.setDate(now.getDate() - 23)
    return now
}

export const calcCurrentDate = (ndays) => {
    console.log('calcCurrentDate', ndays)
    const startDate = calcCurrentDate()
    const currentDate = currentDate.setDate(startDate.getDate() + ndays)
    return currentDate
}

export function formatDate(d:Date) {
  if (typeof d.getFullYear !== 'function') return ""
  return `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`
}
export function formatDateTime(d:Date) {
  if (typeof d.getFullYear !== 'function') return ""
  let s = `${d.getFullYear()}-${(d.getMonth()+1).toString().padStart(2,'0')}-${d.getDate().toString().padStart(2,'0')}`
  let s1 = `${(d.getHours()).toString().padStart(2,'0')}:00:00`
  return `${s}T${s1}`
}

// Pad a number to 2 digits
const pad = n => `${Math.floor(Math.abs(n))}`.padStart(2, '0');
// Get timezone offset in ISO format (+hh:mm or -hh:mm)
const getTimezoneOffset = date => {
  const tzOffset = -date.getTimezoneOffset();
  const diff = tzOffset >= 0 ? '+' : '-';
  return diff + pad(tzOffset / 60) + ':' + pad(tzOffset % 60);
};

export const toISOStringWithTimezone = date => {
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    getTimezoneOffset(date);
};

function toImageData(georaster, canvasWidth, canvasHeight) {
  if (georaster.values) {
    const { noDataValue, mins, ranges, maxs, values } = georaster;
    const numBands = values.length;
    const xRatio = georaster.width / canvasWidth;
    const yRatio = georaster.height / canvasHeight;
    const data = new Uint8ClampedArray(canvasWidth * canvasHeight * 4);
    for (let rowIndex = 0; rowIndex < canvasHeight; rowIndex++) {
      for (let columnIndex = 0; columnIndex < canvasWidth; columnIndex++) {
        const rasterRowIndex = Math.round(rowIndex * yRatio);
        const rasterColumnIndex = Math.round(columnIndex * xRatio);
        const pixelValues = values.map(band => {
          try {
            return band[rasterRowIndex][rasterColumnIndex];
          } catch (error) {
            console.error(error);
          }
        });
        const haveDataForAllBands = pixelValues.every(value => value !== undefined && value !== noDataValue);
        if (haveDataForAllBands) {
          const i = (rowIndex * (canvasWidth * 4)) + 4 * columnIndex;
          if (numBands === 1) {
            const pixelValue = Math.round(pixelValues[0]);
            if (pixelValue >= 0) {
              const scaledPixelValue = Math.round(pixelValue / maxs[0] * 255);
              data[i] = scaledPixelValue;
              data[i + 1] = scaledPixelValue;
              data[i + 2] = scaledPixelValue;
              data[i + 3] = 255;
            }
            else {
              data[i] = 0;
              data[i+1] = 0;
              data[i+2] = 0;
              data[i+3] = 0;
            }
          } else if (numBands === 3) {
            try {
              const [r, g, b] = pixelValues;
              data[i] = r;
              data[i + 1] = g;
              data[i + 2] = b;
              data[i + 3] = 255;
            } catch (error) {
              console.error(error);
            }
          } else if (numBands === 4) {
            try {
              const [r, g, b, a] = pixelValues;
              data[i] = r;
              data[i + 1] = g;
              data[i + 2] = b;
              data[i + 3] = a;
            } catch (error) {
              console.error(error);
            }
          }
        }
      }
    }
    return new ImageData(data, canvasWidth, canvasHeight);
  }
}

export const toCanvas = (georaster, options) => {
  if (typeof ImageData === "undefined") {
    throw `toCanvas is not supported in your environment`;
  } else {
    const canvas = document.createElement("CANVAS");
    const canvasHeight = options && options.height ? Math.min(georaster.height, options.height) : Math.min(georaster.height, 100);
    const canvasWidth = options && options.width ? Math.min(georaster.width, options.width) : Math.min(georaster.width, 100);
    canvas.height = canvasHeight;
    canvas.width = canvasWidth;
    canvas.style.minHeight = "200px";
    canvas.style.minWidth = "400px";
    canvas.style.maxWidth = "100%";
    const context = canvas.getContext("2d");
    const imageData = toImageData(georaster, canvasWidth, canvasHeight);
    context.putImageData(imageData, 0, 0);
    return canvas;
  }
}
