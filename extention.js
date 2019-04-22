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

    let like_url    = 'https://www.instagram.com/web/likes/%id%/like/';
    let comment_url = 'https://www.instagram.com/web/comments/%id%/add/';

    let is_profile = () => {
        return sd.entry_data.hasOwnProperty( 'ProfilePage' );
    };
    let is_tag = () => {
        return sd.entry_data.hasOwnProperty( 'TagPage' );
    };
    let is_post = () => {
        return sd.entry_data.hasOwnProperty( 'PostPage' );
    };

    if ( is_profile() || is_tag() ) {
        let edges       = [];
        let liked       = ls.getItem( 'liked' ) ? JSON.parse( ls.getItem( 'liked' ) ) : [];
        let commented   = ls.getItem( 'commented' ) ? JSON.parse( ls.getItem( 'commented' ) ) : [];
        if ( is_profile() ) {
            edges = sd.entry_data.ProfilePage[ "0" ].graphql.user.edge_owner_to_timeline_media.edges.map( edge => {
                return edge.node;
            } );
        }
        if ( is_tag() ) {
            edges = sd.entry_data.TagPage[ "0" ].graphql.hashtag.edge_hashtag_to_top_posts.edges.map( edge => {
                return edge.node;
            } );
            edges = edges.concat( sd.entry_data.TagPage[ "0" ].graphql.hashtag.edge_hashtag_to_media.edges.map( edge => {
                return edge.node;
            } ) );
        }

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
    
            like_btn.onclick = e => {
                e.preventDefault();
                dom.dispatchEvent( new CustomEvent( 'justDoIt', {
                    detail: {
                        element : like_btn,
                        mode    : 'like'
                    }
                } ) );
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
                dom.dispatchEvent( new CustomEvent( 'justDoIt', {
                    detail: {
                        element : comment_btn,
                        mode    : 'comment'
                    }
                } ) );
                return true;
            };

            let title = {};

            dom.addEventListener( 'justDoIt', e => {
                let notification = false;
                if ( ! ( "Notification" in window ) ) {
                    alert( "Этот браузер не поддерживает уведомления" );
                } else {
                    let options = {
                        body: 'Начинаю работу',
                        icon: 'https://scontent-arn2-1.cdninstagram.com/vp/30138339ca6b3e92a97a9f72be93ae96/5D430127/t51.2885-19/s150x150/53088415_255898045341233_1126425219997630464_n.jpg?_nc_ht=scontent-arn2-1.cdninstagram.com'
                    };
                    if ( Notification.permission === "granted" ) {
                        notification = new Notification( 'Приступаю', options );
                    } else {
                        Notification.requestPermission( permission => {
                            // Если пользователь разрешил, то создаем уведомление 
                            if ( permission === "granted" ) {
                                notification = new Notification( 'Приступаю', options );
                            }
                        });
                    }
                }
                let element = e.detail.element;
                element.remove();
                let titleProcess = () => {
                    let title_text = [];
                    Object.keys( title ).forEach( key => {
                        title_text.push( title[ key ].mode + ' - ' + title[ key ].text );
                    } );
                    dom.title = title_text.join( ' :: ' );
                };
                let request = ( id, data, url, cb, edge ) => {
                    let xhr = new XMLHttpRequest();
                    xhr.open( 'POST', url.replace( /%id%/, id ) );
                    xhr.onload = () => {
                        let response = xhr.responseText;
                        let post_url = 'https://www.instagram.com/p/' + edge.shortcode + '/';
                        try {
                            response = JSON.parse( response );
                            if ( 'ok' == response.status ) {
                                console.log( post_url );
                                setTimeout( cb, rand( 5, 10 ) * 10000 );
                            }
                        } catch ( e ) {
                            console.error( post_url );
                            if ( 400 == xhr.status ) {
                                cb();
                            } else {
                                setTimeout( () => {
                                    request( id, data, url, cb, edge );
                                }, rand( 10, 20 ) * 10000 );
                            }
                            
                        }
                    };
                    xhr.setRequestHeader( 'content-type', 'application/x-www-form-urlencoded' );
                    xhr.setRequestHeader( 'x-csrftoken', getCookie( 'csrftoken' ) );
                    xhr.send( data );
                };
                switch ( e.detail.mode ) {
                    case 'like':
                        edges = edges.filter( edge => {
                            return liked.indexOf( edge.id ) < 0;
                        } );
                        if ( edges.length > 0 ) {
                            title[ 'like' ] = {
                                text: 'В процессе: 0/' + edges.length,
                                mode: 'Лайкинг'
                            };
                            shuffle( edges );
                            let func = () => {
                                if ( typeof func.i == 'undefined' ) func.i = 0;
                                if ( func.i < edges.length ) {
                                    title.like.text = 'В процессе: ' + func.i + '/' + edges.length;
                                    let edge = edges[ func.i ];                                    
                                    request( edge.id, null, like_url, () => {
                                        func.i++;
                                        liked.push( edge.id );
                                        ls.setItem( 'liked', JSON.stringify( liked ) );
                                        func();
                                    }, edge );
                                } else {
                                    title.like.text = 'Завершено: ' + func.i + '/' + edges.length;
                                    notification = new Notification( 'Завершено' );
                                }
                                titleProcess();
                            };
                            func();
                        }
                    break;
                    case 'comment':
                        edges = edges.filter( edge => {
                            return commented.indexOf( edge.id ) < 0;
                        } );
                        if ( edges.length > 0 ) {
                            let comments = [];
                            let getComment = () => {
                                let result = prompt( 'Введите комментарий' );
                                if ( result ) {
                                    result = result.split( "|" );
                                    comments = comments.concat( result );
                                    getComment();
                                } else return true;
                            };
                            getComment();
                            if ( comments.length > 0 ) {
                                title[ 'comment' ] = {
                                    text: 'В процессе: 0/' + edges.length,
                                    mode: 'Комментинг'
                                };
                                shuffle( edges );
                                let func = () => {
                                    if ( typeof func.i == 'undefined' ) func.i = 0;
                                    if ( func.i < edges.length ) {
                                        title.comment.text = 'В процессе: ' + func.i + '/' + edges.length;
                                        let edge = edges[ func.i++ ];
                                        let comment = comments[ rand( 0, comments.length - 1 ) ];
                                        request( edge.id, 'comment_text=' + encodeURI( comment ) + '&replied_to_comment_id=', comment_url, () => {
                                            commented.push( edge.id );
                                            ls.setItem( 'commented', JSON.stringify( commented ) );
                                            func();
                                        }, edge );
                                    } else {
                                        title.comment.text = 'Завершено: ' + func.i + '/' + edges.length;
                                    }
                                    titleProcess();
                                };
                                func();
                            }                            
                        }
                    break;
                }
            } );
        
                  
    }

    if ( is_post() ) {
        let edges           = [];
        let liked_comments  = ls.getItem( 'liked_comments' ) ? JSON.parse( ls.getItem( 'liked_comments' ) ) : [];
        let owner           = sd.entry_data.PostPage[ "0" ].graphql.shortcode_media.owner;
        edges = sd.entry_data.PostPage[ "0" ].graphql.shortcode_media.edge_media_to_parent_comment.edges.map( edge => {
            return edge.node;
        } );
        let owner_comments  = edges.filter( edge => {
            return edge.owner.id == owner.id;
        } );
        debugger;
    }

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