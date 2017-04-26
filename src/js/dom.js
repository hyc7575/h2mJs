(function() {
    'use stric';
    var global = this;
    var dom = {};

    // 브라우저 전체에 새로 스크롤 생성여부 체크
    function hasVerticalScroll() {
        return document.body.scrollHeight > window.innerHeight;
    }
    dom.hasVerticalScroll = hasVerticalScroll;


    function LayerPop( obj ) {
        this.name = obj.target;
        this.$layer = $(this.name);
        this.$closeBtn = this.$layer.find('.layer-close'); // 팝업 클로즈 버튼
        this.$todayChkBox = this.$layer.find('.today-chkbox') || undefined; // 오늘 하루 안보기용 체크박스
        this.isDim = obj.isDim || false;
        this.$showTrigger = $(obj.showTrigger);
        this.callback = obj.callback || {};

        if( this.isDim && !$('.layer-cover').length ) {
            $('body').append('<div class="layer-cover" style="display: none; position: fixed; left: 0; right: 0; top: 0;bottom: 0; background-color: #000; opacity: 0.8; z-index: 9999;"></div>');
            this.$dim = $('.layer-cover');
        }

        if( !this.$showTrigger.length && parseInt(h2m.cookie.get( this.name ), 10) !== 1 ) {
            this.show();
        }
        this.onEvent();
    }
    LayerPop.prototype.onEvent = function() {
        var thiz = this;
        this.$showTrigger.on('click', function() {
            thiz.show();
        });
        this.$closeBtn.on('click', function(e) {
            e.preventDefault();
            if( thiz.$todayChkBox.prop('checked') ) {
                h2m.cookie.set(thiz.name, 1, '/', 1);
            }
            thiz.hide();
            thiz.callback.close();
        });
    }
    LayerPop.prototype.offEvent = function() {
        this.$closeBtn.off('click');
    }
    LayerPop.prototype.show = function() {
        this.$layer.show();
        if ( this.isDim ) {
            this.$dim.show();
        }
    }
    LayerPop.prototype.hide = function() {
        this.$layer.hide();
        if ( this.isDim ) {
            this.$dim.hide();
        }
    }
    dom.LayerPop = LayerPop;

    global.h2m.dom = dom;
}.call(this));
