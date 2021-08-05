function getList(){
    var sourceEle = document.getElementById('source');
    return sourceEle.value.split('\n');
}
function setList(arr){
    var sourceEle = document.getElementById('source');
    sourceEle.value = arr.join('\n')
}


// 去空
var str_noblank = function(){
    var list = getList();
    setList(list.map(x => x.trim()).filter(x=>x!=''&&x.trim()!=''));
}
// 去重
var str_nodup = function(){
    var list = getList();
    setList(Array.from(new Set(list)));
}
// 排序
var str_sort = function(){
    var list = getList();
    setList(list.sort());
}
// 倒序
var str_sort_desc = function(){
    var list = getList();
    setList(list.sort().reverse());
}
// js执行
var str_jsexecute = function(){
    var script = document.getElementById('script');
    eval(script.value);
}