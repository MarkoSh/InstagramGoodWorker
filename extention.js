// ==UserScript==
// @name         Инста
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.instagram.com/*
// @grant        none
// ==/UserScript==

( ( sd, dom, body, ls ) => {

    'use strict';

    let is_profile = () => {
        return sd.entry_data.hasOwnProperty( 'ProfilePage' );
    };
    let is_tag = () => {
        return sd.entry_data.hasOwnProperty( 'TagPage' );
    };

    let tools = () => {
        let container = dom.createElement( 'div' );
        container.setAttribute( 'style', `
        position: fixed;
        top: 100px;
        right: 100px;
        ` );
        body.appendChild( container );

        let like_btn = dom.createElement( 'a' );
        container.appendChild( like_btn );
        like_btn.setAttribute( 'href', '#' );
        like_btn.setAttribute( 'style', `
        width: 24px;
        height: 24px;
        display: block;
        background-image: url(/static/bundles/es6/sprite_glyphs_61393e2520c3.png/61393e2520c3.png);
        background-position: -78px -203px;
        margin: 10px;
        ` );
        let process = false;
        like_btn.onclick = e => {
            e.preventDefault();
            process = ! process;
            if ( like_btn.classList.contains( 'process' ) ) return true;
            
            let edges = false;
            if ( is_profile() ) {
                edges = sd.entry_data.ProfilePage[ "0" ].graphql.user.edge_owner_to_timeline_media.edges.map( edge => {
                    return edge.node;
                } );
            }
            if ( is_tag() ) {
                edges = sd.entry_data.TagPage[ "0" ].graphql.hashtag.edge_hashtag_to_media.edges.map( edge => {
                    return edge.node;
                } );
            }

            like_btn.classList.add( 'process' );
            let deg = 0;
            let animation = setInterval( () => {
                like_btn.style.transform = 'rotate( ' + deg + 'deg )';
                deg = deg <= 360 ? deg + 6: 0;
            }, 100 );

            shuffle( edges );
            if ( edges && edges.length > 0 ) {
                let liker = () => {
                    if ( ! process ) {
                        clearInterval( animation );
                        like_btn.classList.remove( 'process' );
                        like_btn.style.transform = '';
                        document.title = 'Остановлено';
                        return true;
                    };
                    if ( typeof liker.i == 'undefined' ) liker.i = 0;
                    document.title = 'Работаем, ' + liker.i + '/' + edges.length + '...';
                    if ( liker.i >= edges.length ) {
                        clearInterval( animation );
                        like_btn.classList.remove( 'process' );
                        like_btn.style.transform = '';
                        document.title = 'Завершено';
                    } else {
                        let edge = edges[ liker.i ];
                        let xhr = new XMLHttpRequest();
                        xhr.open( 'POST', 'https://www.instagram.com/web/likes/' + edge.id + '/like/' );
                        xhr.onload = () => {
                            let response = xhr.responseText;
                            try {
                                response = JSON.parse( response );
                                if ( 'ok' == response.status ) {
                                    liker.i++;
                                    setTimeout( liker, rand( 1, 5 ) * 1000 );
                                }
                            } catch ( e ) {
                                setTimeout( liker, rand( 1, 5 ) * 10000 );
                            }
                        };
                        xhr.setRequestHeader( 'content-type', 'application/x-www-form-urlencoded' );
                        xhr.setRequestHeader( 'x-csrftoken', getCookie( 'csrftoken' ) );
                        xhr.send();
                    }
                };
                liker();
            } else {
                like_btn.classList.remove( 'process' );
            }
            return true;
        };

        let comment_btn = dom.createElement( 'a' );
        container.appendChild( comment_btn );
        comment_btn.setAttribute( 'href', '#' );
        comment_btn.setAttribute( 'style', `
        width: 24px;
        height: 24px;
        display: block;
        background-image: url(/static/bundles/es6/sprite_glyphs_61393e2520c3.png/61393e2520c3.png);
        background-position: -131px -146px;
        margin: 10px;
        ` );
        comment_btn.onclick = e => {
            e.preventDefault();
            process = ! process;
            if ( comment_btn.classList.contains( 'process' ) ) return true;
            
            let edges = false;
            if ( is_profile() ) {
                edges = sd.entry_data.ProfilePage[ "0" ].graphql.user.edge_owner_to_timeline_media.edges.map( edge => {
                    return edge.node;
                } );
            }
            if ( is_tag() ) {
                edges = sd.entry_data.TagPage[ "0" ].graphql.hashtag.edge_hashtag_to_media.edges.map( edge => {
                    return edge.node;
                } );
            }

            comment_btn.classList.add( 'process' );
            let deg = 0;
            let animation = setInterval( () => {
                comment_btn.style.transform = 'rotate( ' + deg + 'deg )';
                deg = deg <= 360 ? deg + 6: 0;
            }, 100 );

            shuffle( edges );

            let comments = [];
            let getComment = () => {
                let result = prompt( 'Введите комментарий' );
                if ( result ) {
                    comments.push( result ); 
                    getComment();
                } else return true;
            };
            getComment();

            if ( edges && edges.length > 0 && comments.length > 0 ) {
                let commenter = () => {
                    if ( ! process ) {
                        clearInterval( animation );
                        comment_btn.classList.remove( 'process' );
                        comment_btn.style.transform = '';
                        document.title = 'Остановлено';
                        return true;
                    };
                    if ( typeof commenter.i == 'undefined' ) commenter.i = 0;
                    document.title = 'Работаем, ' + commenter.i + '/' + edges.length + '...';
                    if ( commenter.i >= edges.length ) {
                        clearInterval( animation );
                        comment_btn.classList.remove( 'process' );
                        comment_btn.style.transform = '';
                        document.title = 'Завершено';
                    } else {
                        let edge = edges[ commenter.i ];
                        let xhr = new XMLHttpRequest();
                        xhr.open( 'POST', 'https://www.instagram.com/web/comments/' + edge.id + '/add/' );
                        xhr.onload = () => {
                            let response = xhr.responseText;
                            try {
                                response = JSON.parse( response );
                                if ( 'ok' == response.status ) {
                                    commenter.i++;
                                    setTimeout( commenter, rand( 1, 5 ) * 10000 );
                                }
                            } catch ( e ) {
                                setTimeout( commenter, rand( 1, 5 ) * 30000 );
                            }
                        };
                        let comment = comments[ rand( 0, comments.length - 1 ) ];
                        xhr.setRequestHeader( 'content-type', 'application/x-www-form-urlencoded' );
                        xhr.setRequestHeader( 'x-csrftoken', getCookie( 'csrftoken' ) );
                        xhr.send( 'comment_text=' + encodeURI( comment ) + '&replied_to_comment_id=' );
                    }
                };
                commenter();
            } else {
                comment_btn.classList.remove( 'process' );
            }
            return true;
        };
    };
    tools();


} )( window._sharedData, document, document.body, localStorage );

function rand( min, max ) {
    return Math.floor(Math.random() * (max - min)) + min;
}

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getCookie( name ) {
    var matches = document.cookie.match( new RegExp(
      "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}