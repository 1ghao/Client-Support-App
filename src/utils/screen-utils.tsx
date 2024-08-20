import {
  StyleSheet,
  Dimensions,
  ViewStyle,
  TextStyle,
  ImageStyle,
} from 'react-native';

// app 只有竖屏模式，
let deviceWidthDp = Dimensions.get('window').width;
function updateDeviceWidthDp() {
  const {width, height} = Dimensions.get('window');
  if (width < height) {
    deviceWidthDp = width;
  } else {
    deviceWidthDp = height;
  }
}
updateDeviceWidthDp();
Dimensions.addEventListener('change', updateDeviceWidthDp);

// 设计分辨率
const uiWidthPx = 375;

export function printScreen() {
  return `
    [deviceWidthDp=${deviceWidthDp}]
    [windowWidth=${Dimensions.get('window').width}]
    [screenWidth=${Dimensions.get('screen').width}]
  `;
}

export const pxToDp = (uiElementPx: number) => {
  return (uiElementPx * deviceWidthDp) / uiWidthPx;
};

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

export const AdaptStyleSheet = {
  create<T>(style: NamedStyles<T>) {
    let s = {...style};
    // 目前仅对以下的属性进行处理
    let list = [
      'width',
      'height',
      'marginTop',
      'marginBottom',
      'marginLeft',
      'marginRight',
      'paddingTop',
      'paddingRight',
      'paddingBottom',
      'paddingLeft',
      'top',
      'right',
      'bottom',
      'left',
      'fontSize',
      'lineHeight',
    ];
    for (let outKey in s) {
      for (let innerKey in s[outKey]) {
        if (
          list.includes(innerKey) &&
          typeof s[outKey][innerKey] === 'number'
        ) {
          // @ts-ignore
          s[outKey][innerKey] = pxToDp(s[outKey][innerKey]);
        }
      }
    }
    return StyleSheet.create(s);
  },
};
