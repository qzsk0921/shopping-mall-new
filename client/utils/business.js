import config from '../config/index'
/**
 * 自定义tabbar
 * @param {array} list 
 * @param {number} selected 
 */
export function setTabBar({
  selected = 0,
  list = config.tabBar.list
} = {
  selected: 0,
  list: config.tabBar.list
}) {
  if (typeof this.getTabBar === 'function' && this.getTabBar()) {
    this.getTabBar().setData({
      selected,
      list
    })
  }
}


function getLocalImg(url) {
  return new Promise(resolve => {
    wx.getImageInfo({
      src: url,
      success: function (res) {
        console.log(res)
        // 保存到本地
        // res = res.path;
        resolve(res)
      }
    })
  })
}

// 版式
async function drawCanvasShopping(that, price, thumbImage, btnImage) {

  const canvasWidth = 200,
    canvasHeight = 160
  // 在自定义组件下，当前组件实例的this，表示在这个自定义组件下查找拥有 canvas-id 的 canvas ，如果省略则不在任何自定义组件内查找
  const ctx = wx.createCanvasContext('canvas', that);
  // 背景色
  ctx.setFillStyle('#ffffff');
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  // 绘制背景
  const cardImageInfo = await getLocalImg(thumbImage)
  ctx.drawImage(cardImageInfo.path, 30, 0, 130, 130);
  // // // 公司 必须
  ctx.save(); // 先保存状态 已便于画完再用

  // ctx.setFontSize(16);
  // ctx.setFillStyle(drawData.card_style.company_color);
  // ctx.fillText(drawData.card_info.company, 24, 26 + 8);

  // 保存按钮
  ctx.drawImage(btnImage, 0, 120, 190, 30);

   // ctx.drawImage(btnImage, 26, 198 - imgInfo.height / 2 / 2, imgInfo.width / 2, imgInfo.height / 2);
   ctx.setFontSize(12);
   ctx.setFillStyle('#ffffff');
   ctx.fillText('￥', 10, 142);

   ctx.setFontSize(18);
   ctx.setFillStyle('#ffffff');
   ctx.fillText(price, 22, 142);

  ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 可以继续绘制

  /**
   * 
   * @param {*} text 
   * @param {*} lw 行宽
   * @param {*} lh 行高
   */
  function fillTextLineBreak(text, lw, lh) {
    const chr = text.split(""); //这个方法是将一个字符串分割成字符串数组
    let temp = "";
    let row = [];

    for (let a = 0; a < chr.length; a++) {
      if (ctx.measureText(temp + '').width < lw) {
        temp += chr[a];
      } else {
        a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
        row.push(temp);
        temp = "";
      }
    }
    row.push(temp);

    //如果数组长度大于2 则截取前两个
    if (row.length > 2) {
      let rowCut = row.slice(0, 2);
      let rowPart = rowCut[1];
      let test = "";
      let empty = [];
      for (let a = 0; a < rowPart.length; a++) {
        if (ctx.measureText(test + '').width < lw) {
          test += rowPart[a];
        } else {
          break;
        }
      }
      empty.push(test);
      let group = empty[0] + "..." //这里只显示两行，超出的用...表示
      rowCut.splice(1, 1, group);
      row = rowCut;
    }
    for (let b = 0; b < row.length; b++) {
      ctx.fillText(row[b], 40, 632 + b * lh, lw);
    }
  }
  // 绘制图片
  return new Promise(resolve => {
    ctx.draw(false, (() => {
      // 延时生成图片 否则真机测试文字会样式混乱
      setTimeout(() => {
        // 生成图片
        wx.canvasToTempFilePath({
          canvasId: 'canvas',
          success: res => {
            // wx.hideLoading();
            // res.tempFilePath
            console.log(res)
            resolve(res.tempFilePath)
          },
          fail: (err) => {
            console.log(err)
            // wx.showToast({
            //   title: '图片生成失败~',
            //   icon: 'none'
            // });
          }
        }, that)
      }, 800)
    })())
  })
}

// 绘制canvas
/**
 * 绘制名片
 * @param {*} drawData 绘制需要的数据
 */
export function drawCanvas(that, price, thumbImage, btnImage) {
  return drawCanvasShopping(that, price, thumbImage, btnImage)
}