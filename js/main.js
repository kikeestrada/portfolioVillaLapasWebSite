(function($){
    /*================
	 Components
	=================*/
	var Video = (function() {
		var playerVideo,
		    videoState,
			autoplay = false;

		//This function receives:
		// Youtube video ID
		// Element(iFrame) were the video to be displayed [ID or CLASS]
		// Autoplay[boolean]
		function onYouTubeIframeAPIReady(videoID, player, autoplay) {

			// console.log(videoID);
			// console.log('sd');
			// console.log(player);

			$(window).load(function () {
				
				if (autoplay) {
					this.autoplay = true;
				}

				if (playerVideo === undefined) {
					playerVideo = new YT.Player(player, {
						height: '390',
						width: '640',
						videoId: videoID,
						events: {
							'onReady': onPlayerReady,
							'onStateChange': onPlayerStateChange,
							'autoPlay': autoplay
						}
					});
				}
			});
		}

		function onPlayerReady(event) {
			// Auto Play video
			if (playerVideo.D.autoplay) {
				play();
			}
			//event.target.playVideo();
		}

		function onPlayerStateChange() {
			videoState = JSON.parse(event.data);
			if( videoState.info == 0 ){ // Video Completed
				close();
			}
		}
		function play() {
			playerVideo.playVideo();
		}

		function pause() {
			playerVideo.pauseVideo();
		}

		function close() {
			if (playerVideo !== undefined ) {
				playerVideo.pauseVideo();
			}
		}

		return {
			init: onYouTubeIframeAPIReady,
			play: play,
			pause: pause,
			close: close
		}
	})();
    ////
    
    var home = function() {
		function loadVideo() {
			var videoID = $('#videoHome').data('video-id'),
			    playerID = $('#videoHome iframe').attr('id');

				$('.video-home .play').addClass('ready');
				Video.init(videoID, playerID, false);
		}

		function playVideo(e) {
			e.preventDefault();
			Video.play();
			//Some fancy animation
			TweenMax.to($('#frame-intro'),1, {css:{opacity:1,zIndex:1},ease:Power2.easeInOut});
		}

		function init() {
			loadVideo();
			$('#playVideo').on('click',playVideo);
		}

		return {
			init: init()
		}
	};
    
    var rooms = function(){
        console.log('Rooms');
        new SelectFx(document.getElementById('roomType'));
    }
    
    //Always loads this function
	var Global = (function() {
        function scroll(){
            $( window ).scroll(function(){
                var st = $('body').scrollTop();
                (st >= 100)?$('.menu-wrapper').addClass('small'):$('.menu-wrapper').removeClass('small');
            });
        }
        
		function init() {
            
            scroll();
            
            $('.sidr-toggle').sidr({
                side: 'right'
            });
            
			//By Pages
			if ($('.home').length > 0) {
				home();
			}
            
            if ($('.rooms').length > 0) {
				rooms();
			}
		}

		return {
			init: init
		}
	})();

	Global.init();
    
})(jQuery);