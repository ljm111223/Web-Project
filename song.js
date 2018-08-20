console.log(location.search)
$.get('./songs.json').then(function (res) {  start(res[
Math.floor( location.search.match( /\?id=(\d+)/ )[1]  ) - 1
    ]) } )
function start( obj ) {
    $('.song-lyric h1').html(obj.name+' -<span> '+obj.singer+'</span>')
    $('.bg').css('background-image','url("'+obj.background+'")')
    $('.disc .cover').attr('src',obj.cover)
    $(function(){
        {
            var lyric = obj.lyric
            var lyricArray = lyric.split('\n')
            var regex = /^\[(.+)\](.*)/
            lyricArray = lyricArray.map(function(str){
                var matchs = str.match(regex)
                if(matchs){
                    return {time:Number(matchs[1].split(":")[0])*60+Number(matchs[1].split(":")[1]),words:matchs[2]}

                }
            })
            var $lyrics = $('.lines')
            lyricArray.map(function(obj){
                var $p = $('<p/>')
                if(obj){
                    $p.attr('time',obj.time).text(obj.words)
                    $p.appendTo($lyrics)
                }
                $('.lyrics p').eq(2).addClass('active')
            })

        }
    })
    var audio = new Audio()
    audio.src = obj.src
    audio.autoplay = true
    $('.disc').click(function () {
        $('.disc').toggleClass( 'active' )
        if(!audio.paused){
            audio.pause()
            $('.icon').css( 'display','flex')
        }else{
            $('.icon').css( 'display','none')
            audio.play()
        }

    })
    setInterval(function(){
        var $lyrics = $('.lyrics p')
        var current = audio.currentTime
        var array = []
        $lyrics.each( function (index,node) {
            array.push({"time":Number($(node).attr('time')),"text":$(node).text()})
        } )
        if( array[3].time<=current ){

            $lyrics.eq(0).remove()
            $lyrics.eq(3).addClass('active').siblings().removeClass('active')
            array.pop()
        }},500 )
    // for( var i=2 ;i++ ;i<arr.length-1 ){
    //     if( array[i].time <= current && array[i+1].time>current){
    //
    //         break
    //     }else{
    //         $
    //     }


    // }




}


