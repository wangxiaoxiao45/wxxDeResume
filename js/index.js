let ballRender=(function () {
    let $ball=$('.container').find('.ball');

    var container       = document.querySelector('.container');
    var canvas          = container.querySelector('canvas');
    var processArea     = container.querySelector('.process');
    var processPassed   = container.querySelector('.process-passed');
    var autoPlayControl = container.querySelector('.control');
    var shade           = container.querySelector('.shade');

    var progress   = 0;
    var maxProcess = 101;
    var step       = 0.2;
    var stoped     = false;

    let music=$('#music')[0];

    function autoPlay() {
        if (stoped) {
            waveLoading.draw();
            stoped = false;
        }

        // 遮罩层，防止自动演示期间的用户操作
        removeClass(shade, 'hide');

        (function loading() {
            waveLoading.setProgress(progress);
            progress += step;
            processPassed.style.width = (progress > 100 ? 100 : progress) * 2 + 'px';
            if (progress <= maxProcess) {
                requestAnimationFrame(loading);
            } else {
                progress = 0;
            }
        })();
    }



    function removeClass(el, className) {
        if (el.classList)
            el.classList.remove(className);
        else
            el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    }




    return {
        init(){
            music.pause();
            waveLoading.init({
                color:'#cecece',
                showText: true,
                callback: function () {
                    $ball.remove();
                    swiperRender.init();
                    stoped = true;

                }
            });
            waveLoading.draw();
            window.onload=autoPlay;
        }
    }
})();
ballRender.init();

let swiperRender=(function () {
    var mySwiper=null;
    let $music=$('.music');
    let music=$('#music')[0];
    let $sliders=$('.swiper-slide');
    let $img=$('.two-run');
    let $moonImg=$('.slider-2').find('.moon').children('div');
    let $moonImg2=$('.slider-3').find('.moon').children('div');
    let $moonImg3=$('.slider-4').find('.moon').children('div');
    let $moonImg4=$('.slider-5').find('.moon').children('div');
    let $moonImg5=$('.slider-6').find('.moon').children('div');
    return {
        init(){
            let mySwiper = new Swiper('.swiper-container',{
                height: window.innerHeight,
                direction : 'vertical',
                onInit(){
                    /*$sliders.eq(0)[0].id='slider1';*/
                    $sliders.eq(0).find('.con').addClass('show').removeClass('hide');
                    $img.on('animationend',function () {
                        $(this).removeClass('show').addClass('blink');
                    });
                },
                onTransitionEnd(mySwiper){
                    let acIndex=mySwiper.activeIndex;
                    let itemAry=mySwiper.slides;
                    $.each(itemAry,function (index,item) {
                        /*acIndex==index?item.id=`slider${acIndex+1}`:item.id='no';*/
                        acIndex==index?$(item).find('.con').addClass('show').removeClass('hide'):$(item).find('.con').addClass('hide').removeClass('show');
                        if(acIndex==0){
                            $img.removeClass('blink').addClass('show').on('animationend',function () {
                                $(this).removeClass('show').addClass('blink');
                            });
                        }
                        if(acIndex==1){
                            $moonImg.addClass('moonBlink').on('animationend',function () {
                                setTimeout(()=>{
                                    $(this).removeClass('moonBlink').addClass('moonRun');
                                },500)

                            })
                        }
                        if(acIndex==2){
                            $moonImg2.addClass('moonBlink').on('animationend',function () {
                                setTimeout(()=>{
                                    $(this).removeClass('moonBlink').addClass('moonRun');
                                },500)

                            })
                        }
                        if(acIndex==3){
                            $moonImg3.addClass('moonBlink').on('animationend',function () {
                                setTimeout(()=>{
                                    $(this).removeClass('moonBlink').addClass('moonRun');
                                },500)

                            })
                        }
                        if(acIndex==4){
                            $moonImg4.addClass('moonBlink').on('animationend',function () {
                                setTimeout(()=>{
                                    $(this).removeClass('moonBlink').addClass('moonRun');
                                },500)

                            })
                        }
                        if(acIndex==5){
                            $moonImg5.addClass('moonBlink').on('animationend',function () {
                                setTimeout(()=>{
                                    $(this).removeClass('moonBlink').addClass('moonRun');
                                },500)

                            })
                        }
                    })
                }
            });


            music.play();
            $music.css('display','block');
            $music.on('tap',function () {
                if(!music.paused){
                    music.pause();
                    $music.removeClass('circle');
                }else{
                    music.play();
                    $music.addClass('circle');
                }
            })
        }
    }
})();

