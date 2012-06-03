/* 
 *  Manage the toggle in the header bar
 */

var toggle = function() {
    var anchor = $('#gold-toggle'),
        button = $('#gold-toggle-button'),
        winWidth = $(window).width(),
        winHeight = $(window).height();
        
    this.init = function() {
        anchor.on('click', function(evt) {
            
            evt.preventDefault();
            
            if(anchor.hasClass('off')) {
                anchor.removeClass('off').addClass('on');
                $('#gold-mouse').attr('height', winHeight - 76);
                $('#gold-mouse').attr('width', winWidth);
            } else {
                anchor.removeClass('on').addClass('off');
                $('#gold-mouse').attr('height', 0);
                $('#gold-mouse').attr('width', '100%');
            }
        });
    }
}
