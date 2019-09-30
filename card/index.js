//遮罩层
let c=document.getElementById('canvas');
let ctx=c.getContext('2d');
ctx.fillStyle='#f2f2f2';
ctx.fillRect(0,0,750,280)

ctx.globalCompositeOperation="destination-out";//canvas的一个属性，表示对图像源做什么操作
//监听触摸事件
c.addEventListener('mousedown',mousedown)
//根据鼠标落下的点，再对触摸的过程的所有点都去画圆
function mousedown(e){
    e.preventDefault();
    e.target.addEventListener('mousemove',mousemove)
}
function mousemove(e){
    e.preventDefault();
    drawCircle(e.pageX,e.pageY)
}
//画圆
function drawCircle(x,y){
    ctx.beginPath(); 
    ctx.arc(x,y-c.offsetTop,20,0,2*Math.PI);
    ctx.closePath();
    ctx.fillStyle = '#f2f2f2';
    ctx.fill();
    computeImage()
}
//获取当前画的像素有多少，大于60%就全部展开,rgba是4个像素
function computeImage(){
    let images=ctx.getImageData(0,0,750,280);
    let data=images.data;
    let length=data.length;
    let count=0;
    for(let i=0;i<length;i+=4){
        let rgba=data[i+3];
        if(rgba<10){
            count++
        }
    }
    let plus=count/(length/4);
    if(plus>0.6){
        ctx.globalCompositeOperation='source-in'
    }
}