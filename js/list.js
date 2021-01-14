$('.all').unbind()
$('.all').hover(
    function(){
        $('.mask').css({'display':'block'})
    },
    function(){
        $('.mask').css({'display':'none'})
    }
)
$('.mask').hover(
    function(){
        $('.mask').css({'display':'block'})
    },
    function(){
        $('.mask').css({'display':'none'})
    }
)
$('.denglu').click(function(){
    sessionStorage.setItem('url','../views/list.html')
})
//给列表页添加点击事件
function fn4(){
    $('section>.list_f>.head>h1').click(function(){
        const res = $(this).parent().parent().children()[1]
        $(res).toggleClass('active1')
        const res1 = $(this).children()[0]
        $(res1).toggleClass('active')
    })
    $('section>.list_f>ul>li>img').click(function(){
        sessionStorage.setItem('id',this.dataset.id) 
        window.location.href = '../views/detail.html'
    })
    
}
//获取后端数据
request()
async function request(){
    let {list} =  await $.post('../server/list.php',null,null,'json')
    // console.log(list)
    let str = ``
    for(let i= 0;i<list.length;i++){
       if(i==0){
        str+=`
        <div class="list_f">
                <div class="head">
                    <h1> 
                        <div class="iconfont"></div>${list[i].good_section}</h1>
                </div>
                <ul>
                    <li><img data-id = ${list[i].id} src="${list[i].sample_img}">
                        <p>${list[i].good_name}</p>
                    </li>`
                    continue
       }
       if(list[i].good_section===list[i-1].good_section){
           str+=`
           <li><img data-id = ${list[i].id}  src="${list[i].sample_img}">
                        <p>${list[i].good_name}</p>
                    </li>`
       }else{
           str+=`
           </ul>
           </div>
           <div class="list_f">
                <div class="head">
                    <h1> 
                        <div class="iconfont"></div>${list[i].good_section}</h1>
                </div>
                <ul>
                    <li><img data-id = ${list[i].id} src="${list[i].sample_img}">
                        <p>${list[i].good_name}</p>
                    </li>`
       }
       $('.ss').html(str)
    }
    fn4()
    // console.log(arr)
    
}




