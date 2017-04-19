'use strict';

require('./index.less');


function Index() {
    var MusicPlayer = require('@ali/musicplayer');
    var Node = require('@ali/kissy-node');
    var $ = Node.all;
    var musicPlayer = new MusicPlayer({
        nplay: '.play_btn',
        nstop: '.stop_btn',
        npause: '.pause_btn',
        nnext: '.next_btn',
        npre: '.pre_btn',
        mode: 'random',
        auto: 'true',
        volume: 0.8,
        musicList: [{'name': '斑马斑马', 'path': './1.m4a'},
            {'name': '星之所在', 'path': 'https://i.alipayobjects.com/i/ecmng/mp3/201410/xzsz.mp3'},
            {'name': '千与千寻片尾曲口琴版', 'path': 'https://i.alipayobjects.com/i/ecmng/mp3/201410/qyqx.mp3'}
        ]
    });

    musicPlayer.on('error', function(ev) {
        console.log(['error', ev.msg]);
    });
    musicPlayer.on('status', function(ev) {
        console.log(['status2', ev.status, ev.index, ev]);
        switch (ev.status) {
            case 'play':
                if ($('#playlist li').hasClass('cur')) {
                    $('#playlist li').removeClass('cur');
                }
                $('#playlist li').item(ev.index).addClass('cur');
                break;
        }
    });
    musicPlayer.on('progress', function(ev) {
        console.log(['status2', ev.curtime, ev.counttime, ev.progress, ev.load]);
        $('.d2_time').text(ev.curtime + '/' + ev.counttime);
        $('.d2_load').css('width', ev.progress / 100 * 350);
    });
    $('.playgoto_btn').on('click', function() {
        musicPlayer.play(2);
    });
    $('.random_btn').on('click', function() {
        musicPlayer.set('mode', 'random');
    });
    $('.order_btn').on('click', function() {
        musicPlayer.set('mode', 'order');
    });
    $('.single_btn').on('click', function() {
        musicPlayer.set('mode', 'single');
    });
    $('.setlist_btn').on('click', function() {
        musicPlayer.setlist([{'aaa': 'bb'}]);
        //todo
    });
    $('#volumeselect').on('change', function(ev) {
        var _val = $(ev.target).val();
        musicPlayer.set('volume', _val);
    });
    $('#progressselect').on('change', function(ev) {
        var _val = $(ev.target).val();
        musicPlayer.set('progress', _val);
    });

    $('#playlist li').on('click', function(ev) {
        if ($('#playlist li').hasClass('cur')) {
            $('#playlist li').removeClass('cur');
        }
        $(ev.target).addClass('cur');
        var _index = $(ev.target).index();
        musicPlayer.play(_index);
    });
}

new Index();



module.exports = Index;
