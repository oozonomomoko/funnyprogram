//获取input[file]图片的url Important
function getFileUrl(file) {
    var urls = []; 
    var agent = navigator.userAgent;
    console.log(agent);
    if (agent.indexOf("MSIE")>=1) {
        urls.push([file.value, file.name+file.size]); 
    } else if(agent.indexOf("Firefox")>0 || agent.indexOf("Chrome")>0) { 
        for (let i=0; i<file.files.length; i++) {
            let f = file.files.item(i);
            urls.push([window.URL.createObjectURL(f), f.name+f.size]); 
        }
    }
    return urls; 
}
var body = document.body;
function selectFile(e){
    let urls=getFileUrl(this);
    let len = urls.length;
    if (len != 0) {
        this.parentElement.style.opacity = 1;
        this.parentElement.style.backgroundImage='url(' + urls[0][0] + ')';
        this.parentElement.style.backgroundPositionX = '0';
        this.parentElement.style.backgroundPositionY = '0';
        this.parentElement.style.backgroundSize = '100%';
        this.parentElement.setAttribute('setpic', true);
        this.parentElement.setAttribute('single', urls[0][1]);
        let i = 0;
        $('input').each(function(){
            if (!this.parentElement.getAttribute('setpic')) {
                i++;
                if (i >= len) {
                    return;
                }
                this.parentElement.style.opacity = 1;
                this.parentElement.style.backgroundImage='url(' + urls[i][0] + ')';
                this.parentElement.style.backgroundPositionX = '0';
                this.parentElement.style.backgroundPositionY = '0';
                this.parentElement.setAttribute('setpic', true);
                this.parentElement.setAttribute('single', urls[i][1]);
            }
        });
    }
}
$("input").on('change', selectFile);
let index = 0;
$('.pic').css('background-size', '100%').each(function(){this.setAttribute('index', index++);}).on({
    'dblclick': function(e) {
        e.preventDefault();
        this.childNodes[0].click();
    },
    'mousedown': function(e) {
        if (Boolean(this.getAttribute('setpic'))) {
            let that = this;
            let thisIndex = this.getAttribute('index');
            function mousemove(e) {
                e.preventDefault();
                that.style.backgroundPositionX = Number(that.style.backgroundPositionX.replace('px', '')) + e.movementX + 'px';
                that.style.backgroundPositionY = Number(that.style.backgroundPositionY.replace('px', '')) + e.movementY + 'px';
            }
            function mouseup(e) {
                e.preventDefault();
                $('.pic[single]').removeClass('blink');
                body.removeEventListener('mousemove', mousemove);
                body.removeEventListener('mouseup', mouseup);
                if (thisIndex != e.target.getAttribute('index') && e.target.className=='pic') {
                    let temp =  e.target.style.backgroundImage;
                    e.target.style.backgroundImage = that.style.backgroundImage;
                    that.style.backgroundImage = temp;
                    let tempSg = e.target.getAttribute('single');
                    e.target.setAttribute('single', that.getAttribute('single'));
                    that.setAttribute('single', tempSg);
                    
                    that.style.backgroundPositionX = '0';
                    that.style.backgroundPositionY = '0';
                    that.style.backgroundSize = '100%';
                    e.target.style.backgroundPositionX = '0';
                    e.target.style.backgroundPositionY = '0';
                    e.target.style.backgroundSize = '100%';
                    
                    e.target.setAttribute('setpic', true);
                    e.target.style.opacity = 1;
                    
                    if (!temp) {
                        that.style.opacity = '';
                        that.removeAttribute('setpic');
                        that.childNodes[0].outerHTML = that.childNodes[0].outerHTML;
                        that.childNodes[0].onchange = selectFile;
                    }
                    if (!tempSg)
                        that.removeAttribute('single');
                }
            }
            body.addEventListener('mousemove', mousemove);
            body.addEventListener('mouseup', mouseup);
            let single = this.getAttribute('single');
            $('.pic').each(function(){
                if (thisIndex != this.getAttribute('index') && single == this.getAttribute('single')) 
                    this.className = 'pic blink';
            });
        }
    },
    'mousewheel': function(e) {
        if (this.getAttribute('setpic')) {
            e.preventDefault();
            delta = e.originalEvent.wheelDelta > 0 ? 5 : -5;
            this.style.backgroundSize = Number(this.style.backgroundSize.replace('%', '')) + delta + '%';
        }
    }
});
