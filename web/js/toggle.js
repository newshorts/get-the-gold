/* 
 *  Manage the toggle in the header bar
 */

var toggle = function() {
    var anchor = $('#gold-toggle'),
        button = $('#gold-toggle-button'),
        text = $('#gold-toggle-text'),
        winWidth,
        winHeight,
        win;
        
    this.init = function() {
        
        win = $(window);
        
        anchor.on('click', function(evt) {
            
            evt.preventDefault();
            
            winWidth = win.width();
            winHeight = win.height();
            
            adjustOnOff();
            adjustSize();
        });
        
        win.on('resize', function(evt) {
            winWidth = win.width();
            winHeight = win.height();
            adjustSize();
        });
        
        
    }
    
    var adjustOnOff = function() {
        if(anchor.hasClass('off')) {
            anchor.removeClass('off').addClass('on');
            text.removeClass('off').addClass('on');
            text.text('ON');
        } else {
            anchor.removeClass('on').addClass('off');
            text.removeClass('on').addClass('off');
            text.text('OFF');
        }
    }
    
    var adjustSize = function() {
        if(anchor.hasClass('off')) {
            $('#gold-mouse').attr('height', 0);
            $('#gold-mouse').attr('width', '100%');
        } else {
            $('#gold-mouse').attr('height', winHeight - 76);
            $('#gold-mouse').attr('width', winWidth);
        }
    }
}
