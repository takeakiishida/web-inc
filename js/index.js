// 変数宣言
var $window = $(window);
var $top = $('#js-topTxt');
var $pageTop = $('#page-top');
var elementY; //要素のy座標-50px
var scroll; //スクロール量
var windowHeight; //画面の高さ
var scrollWeight;
var aboutHeight;
var topHeight;

// ローディングで発火
$window.on('load',function(){
    //ロゴを1.2秒でフェードアウト
    $('#starting__logo').delay(1200).fadeOut('slow');

    //ローディングエリアを1.5秒でフェードアウト
    $('#starting').delay(1500).fadeOut('slow',function(){
        //フェードアウト後bodyにappearクラス付与
        $('body').addClass('appear');
    });
    
    //ページをめくるアニメーションの動作後
    $('#starting__bgAnime').on('animationend', function() {
        loading_fadeAnimation();
        txt();
    });

    //高さ計算
    heightCalc();
});

//スクロールで発火
$window.scroll(function () {
    scroll_fadeAnimation();
});

// ローーディング後のアニメーション
function loading_fadeAnimation(){

    //背景色が伸びるアニメーションの中の要素を透明→不透明にする。
    $('.eleAppear-Trigger').each(function(){
        // 要素の高さ-50pxを取得
		elementY = $(this).offset().top-50;
        
        // スクロール量を取得
		scroll = $window.scrollTop();
        
        // ウィンドウの高さを取得
		windowHeight = $window.height();

        // 要素が画面内に入った場合
		if (scroll >= elementY - windowHeight){
			$(this).addClass('bgappear');
		}
	});

    //背景色が伸びて出現（右→左へ）
    $('.MaskRL-Trigger').each(function(){
        // 要素の高さ-50pxを取得
        elementY = $(this).offset().top-50;

        // スクロール量を取得
        scroll = $window.scrollTop();

        // ウィンドウの高さを取得
        windowHeight = $window.height();

        // 要素が画面内に入った場合
		if (scroll >= elementY - windowHeight){
			$(this).addClass('MaskRL');
		}
	});

    // テキストエリアが右から左へ出現
    $('.TxtappearTrigger').each(function(){
        // 要素の高さ-50pxを取得
        elementY = $(this).offset().top-50;

        // スクロール量を取得
        scroll = $window.scrollTop();

        // ウィンドウの高さを取得
        windowHeight = $window.height();

        // 要素が画面内に入った場合
		if (scroll >= elementY - windowHeight){
			$(this).addClass('Txtappear');
		}
	});
}

// スクロール後のアニメーション
function scroll_fadeAnimation() {

    // ふわっと表示するアニメーション
    $('.flipLeft-Trigger').each(function(){
        // 要素の高さ-50pxを取得
        elementY = $(this).offset().top-50;

        // スクロール量を取得
        scroll = $window.scrollTop();

        // ウィンドウの高さを取得
        windowHeight = $window.height();

        // 要素が画面内に入った場合
        if (scroll >= elementY - windowHeight){
            $(this).addClass('flipLeft');
        }
    });

    //背景色が伸びるアニメーションの中の要素を透明→不透明にする。
    $('.eleAppear-Trigger').each(function(){
        // 要素の高さ-50pxを取得
		elementY = $(this).offset().top-50;
        
        // スクロール量を取得
		scroll = $window.scrollTop();
        
        // ウィンドウの高さを取得
		windowHeight = $window.height();

        // 要素が画面内に入った場合
		if (scroll >= elementY - windowHeight){
			$(this).addClass('bgappear');
		}
	});
    
    //背景色が伸びて出現（左→右へ）
	$('.MaskLR-Trigger').each(function(){
        // 要素の高さ-50pxを取得
		elementY = $(this).offset().top-50;
        
        // スクロール量を取得
		scroll = $window.scrollTop();

        // ウィンドウの高さを取得
		windowHeight = $window.height();

        // 要素が画面内に入った場合
		if (scroll >= elementY - windowHeight){
			$(this).addClass('MaskLR');
		}
	});
}

// ハンバーガーメニュー
$('.l-header-hamburger').on('click',function(){
    $('.l-header-hamburger__nav').toggleClass('is-active');
    $('.l-header-hamburger__nav').toggleClass('is-heightChange');
    $('.l-header-hamburger__line').toggleClass('is-activeMenu');
});
$('.l-header-hamburger__nav a').on('click',function(){
    $('.l-header-hamburger__nav').toggleClass('is-active');
    $('.l-header-hamburger__nav').toggleClass('is-heightChange');
    $('.l-header-hamburger__line').toggleClass('is-activeMenu');
});

//スクロールグレス
$('#p-main').scrollgress({
    height: '6px', //線の太さ
    color: '#ED8700',
});

// スムーススクロール
$(document).ready(function() {
    $('#page-top a').smoothScroll();
    $('#p-header a').smoothScroll();
    $('#p-footer a').smoothScroll();

});

// ページの先頭に戻るボタン
$window.on('scroll',function() {
    if($window.scrollTop() > 700) {
        $pageTop.stop(true).fadeIn(400);
    }
    else {
        $pageTop.stop(true).fadeOut(400);
    }
});

// 一文字ずつテキストを表示する。
function txt() {
    $('.js-type').children().addBack().contents().each(function() {
        if (this.nodeType == 3) {
          $(this).replaceWith($(this).text().replace(/(\S)/g, '<span>$1</span>'));
        }
      });
    setTimeout(function(){
        $('.js-type').css({'opacity':1});
        for (var i = 0; i <= $('.js-type').children().length; i++) {
            $('.js-type').children('span:eq('+i+')').delay(80*i).animate({'opacity':1},400);
        };
    },800);
};

//  aboutエリアの高さを計算する
function heightCalc() {
        // aboutエリアのテキストまでの高さを取得する。
        aboutHeight = $('.p-about__txt').offset().top;
        // 固定しているボックスのトップからの高さを取得する。
        topHeight = $('.p-top__txtArea').offset().top;
        scrollWeight = aboutHeight - topHeight;
}

//メッセージエリアを固定する
$(document).ready(function(){
    if ($window.width() >= 768) {
        $window.on('scroll',function(){
            // console.log($window.scrollTop());//スクロール量の確認ログ
            // メッセージ固定
            // スクロールが700以下の場合は、一番最初の位置で固定される。
            if( ($window.scrollTop() >= 0) && ($window.scrollTop() <= scrollWeight ) ) {
                $top.addClass('is-fixed');
                $top.removeClass('is-release');
                // スクロールをelse文から戻してきたときの対応。以下を記載しなければ動作しない。
                //is-releaseに設定していたtopの値を削除する。
                //ただし、is-releaseは削除されているので、代わりにis-fixedに指定する。
                $('.is-fixed').css('top', '');
            }
            // 固定を解除し、absoluteで要素を固定する
            // スクロールが710より大きい場合は、aboutの部分で固定され続ける。
            else {
                $top.removeClass('is-fixed');
                $top.addClass('is-release');
                $('.is-release').css('top', scrollWeight + 20);
            }
        });
    }
});

//スライダー
var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    autoplay: {
        delay: 2000,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true,
      },
    centeredSlides : true,
    breakpoints: {
        767: {
            slidesPerView: 2.7,
            spaceBetween: 25
        },
        1024: {
            slidesPerView: 3.7,
            spaceBetween: 35
        }
    }
});

// タブの表示切替部分について
$('.p-price-selectItem a').on('click',function(event){
    // リンク機能を無効にする。これは知らなかった。ページ内リンクが理由のカクツキを防止する。
    event.preventDefault();
    var tab = $(this).attr('href');

    // いったん全てのactiveを削除する。
    $('.p-price-tabItem').removeClass('is-active');
    $('.p-price-selectItem a').removeClass('is-active--color');

    // クリックしたaタグの属性のみ、アクティブにする。
    $(tab).addClass('is-active');
    $(this).addClass('is-active--color');
});

// vegas
var windowwidth = window.innerWidth || document.documentElement.clientWidth || 0;
		if (windowwidth >= 768){
			var responsiveImage = [//PC用の画像
				{ src: './img/female_m.jpg'},
				{ src: './img/male_m.jpg'},
				{ src: './img/female2_m.jpg'},
			];
		} else {
			var responsiveImage = [//タブレットサイズ（768px）以下用の画像
				{ src: './img/female_m.jpg'},
				{ src: './img/male_m.jpg'},
				{ src: './img/female2_m.jpg'},
			];
		}

//Vegas全体設定
$('#bg-slider').vegas({
		transition: 'zoomOut',//切り替わりアニメーションの種類
		transitionDuration: 2000,//切り替わりのアニメーション時間（ミリ秒単位）
		delay: 8000,//スライド1枚あたりの表示時間(ミリ秒)
		animationDuration: 20000,//スライドの切り替え時間(ミリ秒)
		slides: responsiveImage,//画像設定を読む
		timer: false,// プログレスバーを非表示したい場合、false
});

//アコーディオンをクリックした時の動作
$('.title').on('click', function() {//タイトル要素をクリックしたら
	$('.box').slideUp(500);//クラス名.boxがついたすべてのアコーディオンを閉じる
	var findElm = $(this).next(".box");//タイトル直後のアコーディオンを行うエリアを取得
	if($(this).hasClass('close')){//タイトル要素にクラス名closeがあれば
		$(this).removeClass('close');//クラス名を除去
	}else{//それ以外は
		$('.close').removeClass('close'); //クラス名closeを全て除去した後
		$(this).addClass('close');//クリックしたタイトルにクラス名closeを付与し
		$(findElm).slideDown(500);//アコーディオンを開く
	}
});