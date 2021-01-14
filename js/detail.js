const cookie = getCookie('login')
const sessionID = sessionStorage.getItem('id')
const cha = document.querySelector('.detail_submit>section')
const detail_submit = document.querySelector(".detail_submit")
const span = document.querySelector('.detail_submit>span')

if(cookie){
    detail_submit.style.display = 'none'
}
session()
async function session(){
    const {list} =  await $.get('../server/detail.php',{list_id:sessionID},null,'json')
    console.log(list[0])
    let str = `
    <div class="show">
            <img src="${list[0].good_img1}" alt="">
            <div class="mask3"></div>
        </div>
        <div class="imgSmall">`
        let arr = [list[0].good_img1,list[0].good_img2,list[0].good_img3,list[0].good_img4,list[0].good_img5]
        for(let i = 0;i<arr.length;i++){
           
            if(arr[i]==0){
                continue
            }else{
            str +=`<img src="${arr[i]}" alt=""></img>`
            }
        }
        str +=`
        </div>
        <div class="mask2">
        </div>
    `
    $('.detail_img').html(str)
    const big_show = document.querySelector('.mask2')
    const img = document.querySelectorAll('.detail_main_main>.detail_img>.imgSmall>img')
    const img_show = document.querySelector('.show>img')
    const mask = document.querySelector('.mask3')
    // const big_show =document.querySelector('.mask2')
    // console.log(mask)
    big_show.style.backgroundImage =`url(${list[0].good_img1})`
    cha.onclick = function(){
        detail_submit.style.display = 'none'
    }
    span.onclick = function(){
        sessionStorage.setItem('url','../views/detail.html')
        window.location.href = '../views/login.html'
    }
    for(let i= 0;i<img.length;i++){
        img[i].onclick= function(e){
            e = e || window.event;
            let  target = e.srcElement ? e.srcElement : e.target;
            for(let j = 0;j<img.length;j++){
                img[j].classList.remove('change')
            }
            target.classList.add('change')
            img_show.src = target.getAttribute('src')
            big_show.style.backgroundImage =`url(${target.src})`
        }
    }
    img_show.onmouseover = function(){
        mask.style.display = 'block'
        big_show.style.display = 'block'
    }
    img_show.onmouseout = function(){
        mask.style.display = 'none'
        big_show.style.display = 'none'
    }
    //获取尺寸
    const big_bW = parseInt(window.getComputedStyle(big_show).backgroundSize.split(' ')[0])
    const big_bH = parseInt(window.getComputedStyle(big_show).backgroundSize.split(' ')[1])
    const bigShow_W = parseInt(window.getComputedStyle(big_show).width)
    const bigShow_H = parseInt(window.getComputedStyle(big_show).height)
    const show_W = parseInt(window.getComputedStyle(img_show).width)
    const show_H= parseInt(window.getComputedStyle(img_show).height)
    //计算遮罩层的尺寸
    maskWidth = show_W * bigShow_W / big_bW
    maskHeight = show_H * bigShow_H / big_bH
    mask.style.width = maskWidth +'px'
    mask.style.height = maskHeight +'px'
    img_show.onmousemove = function(e){
        let moveX = e.offsetX-maskWidth/2
        let moveY = e.offsetY-maskHeight/2
        if (moveX <= 0) moveX = 0
        if (moveY <= 0) moveY = 0
        if (moveX >= show_W - maskWidth) moveX = show_W - maskWidth
        if (moveY >= show_H - maskHeight) moveY = show_H - maskHeight
        mask.style.top = moveY+'px'
        mask.style.left = moveX+'px'
        const bgX = moveX * bigShow_W / maskWidth
        const bgY = moveY * bigShow_H / maskHeight
        console.log(bgX)
        console.log(bgY)
        big_show.style.backgroundPosition = `-${ bgX }px  -${ bgY }px`
    
    }
}




