var database
$.get('./songs.json').then(function( musicList ) {
        database = musicList
        database.forEach( function(music) {
            if( music.id<=10 ){
                $( '.index .latest-music ol' ).append($( '<li>\n' +
                    '                        <a href="./song.html?id='+music.id+'">\n'+
                    '                            <h3>'+music.name+'</h3>\n' +
                    '                            <p>'+music.singer+' - '+music.album+'</p>\n' +
                    '                            <svg class="icon">\n' +
                    '                                <use xlink:href="#icon-play1"></use>\n' +
                    '                            </svg>\n' +
                    '                        </a>\n' +
                    '                    </li>'

                    )
                )


                // $( '.hot-music .hot-list ol' ).append($( '<li>\n' +
                //     '                        <a href="./song.html">\n' +
                //     '<div class="rank">10</div>'+
                //     '                            <h3>'+music.name+'</h3>\n' +
                //     '                            <p>'+music.singer+' - '+music.album+'</p>\n' +
                //     '                            <svg class="icon">\n' +
                //     '                                <use xlink:href="#icon-play1"></use>\n' +
                //     '                            </svg>\n' +
                //     '                        </a>\n' +
                //     '                    </li>'
                //
                //     )
                // )
            }
            var song = ''
            song +=  '<li>\n' +
                '                        <a href="./song.html?id='+music.id+'">\n'
            if( music.id<=3 ){
                song += '<div class="rank top3">'
            }else{
                song += '<div class="rank">'
            }
            if(music.id<10){
                song += '0'
            }
            song += music.id+'</div>'+
                '                            <h3>'+music.name+'</h3>\n' +
                '                            <p>'+music.singer+' - '+music.album+'</p>\n' +
                '                            <svg class="icon">\n' +
                '                                <use xlink:href="#icon-play1"></use>\n' +
                '                            </svg>\n' +
                '                        </a>\n' +
                '                    </li>'
            $( '.hot-music .hot-list ol' ).append($(song))
        } )

    }

)


$('nav li').click(function(e) {
    var $li = $(e.currentTarget)
    $li.addClass('active')
        .siblings().removeClass('active')
    $('.nav-content>li').eq($li.index()).addClass('active')
        .siblings().removeClass('active')
})

// $('input#search-song').on('input',function(e) {
//     var $input = $(e.currentTarget)
//     var $item = $( ".search .hot-search" )
//     var $content = $( ".search .search-content" )
//     var $keyword = $('.search .search-content .search-keyword span')
//     var value = $input.val().trim()
//     console.log(value)
//     if( $input.val() ){
//         searchSong(value)
//         $keyword.text( value )
//         $content.addClass('active').siblings().removeClass('active')
//     }else{
//         $item.addClass('active').siblings().removeClass('active')
//     }
//
// })

$('input#search-song').on('input',function(e) {
    var $input = $(e.currentTarget)
    var $item = $( ".search .hot-search" )
    var $content = $( ".search .search-content" )
    var $list = $( ".search .search-content ul" )
    var $keyword = $( ".search .search-content .search-keyword span" )
    var value = $input.val().trim()
    $keyword.text( value )
    if( $input.val() ){
        if( searchKeyword(value) ){
            $list.html("")
            searchKeyword(value).forEach(newKeyword)
        }

        $content.addClass('active').siblings().removeClass('active')
    }else{
        $item.addClass('active').siblings().removeClass('active')
    }

})

$( ".search .search-content ul" ).on('click','li',function (e) {

        $(e.currentTarget).children('span').text()

    }

)

$('.search .float-item span').click(function(e) {
    var $info = $( ".search .search-info" )
    $info.addClass('active').siblings().removeClass('active')
    var result = searchSong( $(e.target).text() )[0]
    $( ".search .search-info .singer .highlight" ).text( result[0].singer )
    $( ".search .search-info .singer img" ).attr('src',result[0].cover )
    result.forEach(function(music){
        $( '.search .search-info .songs ol' ).append($( '<li>\n' +
            '                        <a href="./song.html?id='+music.id+'">\n'+
            '                            <h3>'+music.name+'</h3>\n' +
            '                            <p>'+music.singer+' - '+music.album+'</p>\n' +
            '                            <svg class="icon">\n' +
            '                                <use xlink:href="#icon-play1"></use>\n' +
            '                            </svg>\n' +
            '                        </a>\n' +
            '                    </li>'
            )
        )

    })
})

function searchSong( keyword ) {
    var searchResult =[]
    searchResult.push(database.filter(function(music) {
            return (music.name.indexOf(keyword)>=0 || music.singer.indexOf(keyword)>=0 || music.album.indexOf(keyword)>=0 )
        }
        )
    )
    return searchResult
}

function searchKeyword( keyword ) {
    var searchResult =[]
    database.forEach(function (music) {
        if(music.name.indexOf(keyword)>=0){
            searchResult.push({"keyword":music.name,"id":music.id})
        }else
        {if(music.singer.indexOf(keyword)>=0){
            searchResult.push()
        }else
        {if(music.album.indexOf(keyword)>=0){
            searchResult.push({"keyword":music.album,"id":music.id})
        }
        }
        }
    })
    if( searchResult.length ){
        return searchResult
    }

}

function  newKeyword( keyword ) {
    $newNode = $('<li><a href=""><svg class="icon">\n' +
        '                            <use xlink:href="#icon-sousuo"></use>\n' +
        '                        </svg><span></span></a></li>')
    $newNode.find('span').text(keyword.keyword)
    $newNode.find('a').attr('href','./song.html?id='+keyword.id)
    $('.search .search-content ul ').append( $newNode )
}
