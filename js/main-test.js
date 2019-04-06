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
$("input").on('change', function(e){
    let urls=getFileUrl(this)[0][0];
    let len = urls.length;
    if (len != 0) {
        let i = -1;
        $('input').each(function(){
            this.parentElement.style.opacity = 1;
            this.parentElement.style.backgroundImage='url(' + urls + ')';
            if (''===this.parentElement.style.right) {
                this.parentElement.style.backgroundPositionX = -Number(this.parentElement.style.left.replace('px', '')) + 'px'; 
            } else {
                this.parentElement.style.backgroundPositionX = Number(this.parentElement.style.right.replace('px', '')) + Number(this.parentElement.style.width.replace('px', '')) - 3000 + 'px';
            }
            if (''===this.parentElement.style.bottom) {
                this.parentElement.style.backgroundPositionY = -Number(this.parentElement.style.top.replace('px', '')) + 'px'; 
            } else {
                this.parentElement.style.backgroundPositionY = Number(this.parentElement.style.bottom.replace('px', '')) + Number(this.parentElement.style.height.replace('px', '')) - 1734 + 'px';
            }
        });
    }
});

$('.pic').css('background-size','3000px').on({
    'dblclick': function(e) {
        e.preventDefault();
        this.childNodes[0].click();
    },
    'mousedown': function(e) {
        let all = $('.pic');
        function mousemove(e) {
            e.preventDefault();
            all.each(function(){
                this.style.backgroundPositionX = Number(this.style.backgroundPositionX.replace('px', '')) + e.movementX + 'px';
                this.style.backgroundPositionY = Number(this.style.backgroundPositionY.replace('px', '')) + e.movementY + 'px';
            });
        }
        function mouseup(e) {
            e.preventDefault();
            body.removeEventListener('mousemove', mousemove);
            body.removeEventListener('mouseup', mouseup);
        }
        body.addEventListener('mousemove', mousemove);
        body.addEventListener('mouseup', mouseup);
    },
    'mousewheel': function(e) {
        e.preventDefault();
        delta = e.originalEvent.wheelDelta > 0 ? 10 : -10;
        $('.pic').each(function(e){
            this.style.backgroundSize = Number(this.style.backgroundSize.replace('px', '')) + delta + 'px';
        });
    }
});
