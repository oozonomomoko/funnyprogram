var members = {
  '遠藤さくら': {
    'showName': '遠藤 さくら', // 展示名称
    'unread': false, // 是否未读
    'blog': null, // 最新博客
    'obj': null // 页面元素
  },
  '秋元真夏':{'showName':'秋元 真夏'},
  '生田絵梨花':{'showName':'生田 絵梨花'},
  '齋藤飛鳥':{'showName':'齋藤 飛鳥'},
  '高山一実':{'showName':'高山 一実'},
  '樋口日奈':{'showName':'樋口 日奈'},
  '星野みなみ':{'showName':'星野 みなみ'},
  '松村沙友理':{'showName':'松村 沙友理'},
  '和田まあや':{'showName':'和田 まあや'},
  '伊藤純奈':{'showName':'伊藤 純奈'},
  '北野日奈子':{'showName':'北野 日奈子'},
  '新内眞衣':{'showName':'新内 眞衣'},
  '鈴木絢音':{'showName':'鈴木 絢音'},
  '寺田蘭世':{'showName':'寺田 蘭世'},
  '堀未央奈':{'showName':'堀 未央奈'},
  '山崎怜奈':{'showName':'山崎 怜奈'},
  '渡辺みり愛':{'showName':'渡辺 みり愛'},
  '伊藤理々杏':{'showName':'伊藤 理々杏'},
  '岩本蓮加':{'showName':'岩本 蓮加'},
  '梅澤美波':{'showName':'梅澤 美波'},
  '大園桃子':{'showName':'大園 桃子'},
  '久保史緒里':{'showName':'久保 史緒里'},
  '阪口珠美':{'showName':'阪口 珠美'},
  '佐藤楓':{'showName':'佐藤 楓'},
  '中村麗乃':{'showName':'中村 麗乃'},
  '向井葉月':{'showName':'向井 葉月'},
  '山下美月':{'showName':'山下 美月'},
  '吉田綾乃クリスティー':{'showName':'吉田 綾乃クリスティー'},
  '与田祐希':{'showName':'与田 祐希'},
  '遠藤さくら':{'showName':'遠藤 さくら'},
  '賀喜遥香':{'showName':'賀喜 遥香'},
  '掛橋沙耶香':{'showName':'掛橋 沙耶香'},
  '金川紗耶':{'showName':'金川 紗耶'},
  '北川悠理':{'showName':'北川 悠理'},
  '柴田柚菜':{'showName':'柴田 柚菜'},
  '清宮レイ':{'showName':'清宮 レイ'},
  '田村真佑':{'showName':'田村 真佑'},
  '筒井あやめ':{'showName':'筒井 あやめ'},
  '早川聖来':{'showName':'早川 聖来'},
  '矢久保美緒':{'showName':'矢久保 美緒'},
  '黒見明香':{'showName':'黒見 明香'},
  '佐藤璃果':{'showName':'佐藤 璃果'},
  '林瑠奈':{'showName':'林 瑠奈'},
  '松尾美佑':{'showName':'松尾 美佑'},
  '弓木奈於':{'showName':'弓木 奈於'}
};

function showMembers() {
  let content = document.querySelector('.content');
  for (let name in members) {
    let span = document.createElement('span');
    span.textContent = members[name].showName;
    content.appendChild(span);
    randomPos(span);
    addDragEvent(span);
    members[name].obj = span;
  }
}

function getDistance(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

function randomPos(span) {
  let minW = window.innerWidth * 0.1;
  let minH = window.innerHeight * 0.1;
  let left = minW + window.innerWidth * 0.8 * Math.random();
  let top = minH + window.innerHeight * 0.8 * Math.random();
  span.style.left = left + 'px';
  span.style.top = top + 'px';
}

function addDragEvent(span) {
  span.addEventListener('mousedown', mousedown);
  span.addEventListener('mousewheel', scaleFun, {
    'passive': false
  });
}

function refresh() {
  $.ajax({
    'url': 'http://blog.nogizaka46.com/atom.xml',
    'method': 'get',
    'success': function(data) {
      let entries = data.getElementsByTagName('entry');
      $(entries).each(updateBlog);
    },
    'error': function() {}
  });
}

function updateBlog(idx, entry) {
  let name = entry.querySelector('author>name').textContent;
  let title = entry.querySelector('title').textContent;
  if (name == '新4期生リレー') {
    for (let n in members){
      if (title.indexOf(n)>=0){
        name = n;
      }
    }
  }
  let updated = entry.querySelector('updated').textContent;
  let summary = entry.querySelector('summary').textContent;
  let content = entry.querySelector('content').textContent;
  if (members[name]) {
    $(members[name].obj).addClass('new');
  }
}

$(function() {
  showMembers();
  refresh();
  window.setInterval(refresh, 10 * 1000);

})


// 拖拽and缩放
let startDistance;
let lastDistance;
let tempSale;

function mousedown(e) {
  this.style.transition = 'none';
  this.style.position = 'fixed';
  moveXTmp = e.touches ? e.touches[0].pageX : e.pageX;
  moveYTmp = e.touches ? e.touches[0].pageY : e.pageY;
  if (e.touches && e.touches.length === 2) {
    moveXTmp = (e.touches[0].pageX + e.touches[1].pageX) / 2;
    moveYTmp = (e.touches[0].pageY + e.touches[1].pageY) / 2;
    startDistance = getDistance(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e.touches[1].pageY);
  }
  let that = this;
  let scale = Number(this.getAttribute('scale') ? this.getAttribute('scale') : 1);

  function mousemove(e) {
    e.preventDefault();
    if (e.touches) {
      if (e.touches.length === 1) {
        that.style.left = that.offsetLeft + e.touches[0].pageX - moveXTmp + 'px';
        that.style.top = that.offsetTop + e.touches[0].pageY - moveYTmp + 'px';
        moveXTmp = e.touches ? e.touches[0].pageX : e.pageX;
        moveYTmp = e.touches ? e.touches[0].pageY : e.pageY;
      } else if (e.touches.length === 2) {
        let currDistance = getDistance(e.touches[0].pageX, e.touches[0].pageY, e.touches[1].pageX, e.touches[1].pageY);
        let tempSale = currDistance / startDistance * scale;
        that.style.transform = 'scale(' + tempSale + ')';
        that.setAttribute('scale', tempSale);
        let currX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
        let currY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
        that.style.left = that.offsetLeft + currX - moveXTmp + 'px';
        that.style.top = that.offsetTop + currY - moveYTmp + 'px';
        moveXTmp = currX;
        moveYTmp = currY;
        name.value = moveXTmp + ':' + moveYTmp;
      }
    } else {
      that.style.left = that.offsetLeft + e.movementX + 'px';
      that.style.top = that.offsetTop + e.movementY + 'px';
    }
  }

  function mouseup(e) {
    that.style.transition = '0.3s';
    this.removeEventListener('mousemove', mousemove);
    this.removeEventListener('touchmove', mousemove, {
      'passive': false
    });
    this.removeEventListener('mouseup', mouseup);
    this.removeEventListener('touchend', mouseup);
  }
  document.body.addEventListener('mousemove', mousemove);
  document.body.addEventListener('touchmove', mousemove, {
    'passive': false
  });
  document.body.addEventListener('mouseup', mouseup);
  document.body.addEventListener('touchend', mouseup);
}

function scaleFun(e) {
  e.preventDefault();
  let wheelDelta = e.detail ? e.detail : e.wheelDelta;
  let cur = Number(this.getAttribute('scale') ? this.getAttribute('scale') : 1);
  if (wheelDelta > 0) {
    cur += 0.05;
  } else if (wheelDelta < 0 && cur > 0.1) {
    cur -= 0.05;
  }
  cur = cur < 0.4 ? 0.4 : cur;
  this.style.transform = 'scale(' + cur + ')';
  this.setAttribute('scale', cur);
}
