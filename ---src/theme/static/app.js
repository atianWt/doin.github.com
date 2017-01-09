(function(window, document, $) {
  if (!$) {
    return;
  }

  var particlesConfig = {
    "particles": {
      "number": {
        "value": 50,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": "#ffffff"
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": "#000000"
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.3,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 8,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 15,
          "size_min": 0.1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 200,
        "color": "#ffffff",
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1,
        "direction": "none",
        "random": false,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": false,
          "mode": "repulse"
        },
        "onclick": {
          "enable": true,
          "mode": "push"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 400,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  };

  var util = {
    debounce: function(func, wait, immediate) {
      var timeout;
      return function() {
        var context = this;
        var args = arguments;
        var later = function() {
          timeout = null;
          if (!immediate) {
            func.apply(context, args);
          }
        };
        var callNow = immediate && !timeout;

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);

        if (callNow) {
          func.apply(context, args);
        }
      }
    },

    getAbsoluteUrl: (function() {
      var a;

      return function(url) {
        if (!a) {
          a = document.createElement('a');
        }

        a.href = url;

        return a.href;
      };
    })(),

    isTouch: (
    ('ontouchstart' in window &&
    navigator.userAgent.toLowerCase().match(/mobile|tablet/)) ||
    (window.DocumentTouch && document instanceof window.DocumentTouch) ||
    (window.navigator['msPointerEnabled'] &&
    window.navigator['msMaxTouchPoints'] > 0) || // IE 10
    (window.navigator['pointerEnabled'] &&
    window.navigator['maxTouchPoints'] > 0) || // IE >=11
    false),

    isCanvasSupported: function() {
      var elem = document.createElement('canvas');
      return !!(elem.getContext && elem.getContext('2d'));
    }
  };

  var app = {
    // 设置目录显示位置
    setToc: function() {
      var $content = $('#J_myContent');
      var tocClassName = 'my-toc';
      var $toc = $('.directory');
      var windowWidth = window.innerWidth;
      var $tocWrap = $('.' + tocClassName);

      if (!$toc.length) {
        return;
      }

      // 添加 wrap
      if (!$tocWrap.length) {
        var $wrapper = $('<div class="' + tocClassName + '"></div>');
        var $header = $content.children().first();

        if ($header.is('h1')) {
          $wrapper.insertAfter($header);
        } else {
          $wrapper.insertBefore($header);
        }

        $tocWrap = $('.' + tocClassName);
      }

      // 屏幕宽度小于 992 而且菜单未插入到文档中
      if (windowWidth < 992 && !$toc.parent().is('.' + tocClassName)) {
        $tocWrap.append($toc);
      } else if (windowWidth >= 992 && $toc.parent().is('.' + tocClassName)) {
        $toc.insertBefore($content);
      }
    },

    mainNavToggle: function() {
      var $navbarCollapse = $('.navbar-collapse');

      $('.js-toggle').on('click', function() {
        $navbarCollapse.toggleClass('active');
      });
    },

    sidebarToggle: function() {
      var $sidebar = $('.my-sidebar');
      var $dimmer = $('.dimmer');

      $('.js-sidebar-toggle, .dimmer').on('click', function() {
        $sidebar.toggleClass('active');
        $dimmer.toggleClass('active');
      });
    },

    setDemoSchema: function() {
      if (util.isTouch) {
        $('.js-demo').each(function() {
          var schema = '';

          this.href = schema + encodeURIComponent(util.getAbsoluteUrl(this.href));
        });
      }
    },

    setTouchClassName: function() {
      if (util.isTouch) {
        $(document.documentElement).addClass('touch');
      }
    },

    setCopyButton: function() {
      var $codeBlocks = $('.code-wrap .hljs, .demo-wrap .hljs');
      var copyBtn = '<button class="my-btn-copy js-copy" title="复制代码"><span class="glyphicon glyphicon-duplicate"></span></button><span class="my-copy-status js-copy-status">复制成功</span>';

      if (window.Clipboard) {
        $codeBlocks.after(copyBtn);
        var $copyStatus = $('.js-copy-status');

        var clipboard = new Clipboard('.js-copy', {
          text: function(trigger) {
            return $(trigger).prev('.hljs').find('code').text();
          }
        });

        clipboard.on('success', function(e) {
          console.info('Text:', e.text);
          e.clearSelection();
          var $trigger = $(e.trigger);
          var $status = $trigger.next('.my-copy-status');
          var timmer = setTimeout(
            function() {
              $status.removeClass('success');
            }, 2500);

          if ($trigger.data('timmer')) {
            clearTimeout($trigger.data('timmer'));
          }

          $(e.trigger).data('timmer', timmer);
          $status.addClass('success');
        });

        clipboard.on('error', function(e) {
          console.error('Action:', e.action);
          console.error('Trigger:', e.trigger);
        });
      }
    },

    setParticles: function() {
      if (!util.isCanvasSupported() || !$('.index-banner').length) {
        return;
      }

      if (!document.getElementById('particles')) {
        $('.index-banner').append('<div id="particles"></div>');
      }

      $.ajax({
        url: 'https://a.alipayobjects.com/g/component/particles.js/2.0.0/particles.min.js',
        dataType: 'script',
        cache: !0
      }).then(function() {
        var particlesContainer = document.getElementById('particles');
        particlesContainer && window.particlesJS && window.particlesJS('particles', particlesConfig, function() {
          console.log('callback - particles.js config loaded');
        });
      });
    },

    init: function() {
      this.setToc();
      this.mainNavToggle();
      this.sidebarToggle();
      this.setDemoSchema();
      this.setTouchClassName();
      this.setCopyButton();
      //todo 知乎图
      //this.setParticles();
    }
  };

  $(function() {
    app.init();
  });

  $(window).on('resize', util.debounce(app.setToc, 200));

  // 原页面内嵌脚本
  $(document).ready(function(e) {
    // wrap image to enable "click to preview"
    $('.my-content img').each(function(idx) {
      var $image = $(this);
      var $imageWrapLink = $image.parent('a');

      if ($imageWrapLink.size() < 1) {
        $imageWrapLink = $image.wrap('<a href="' + this.getAttribute('src') + '" data-lightbox="image-' + idx + '" data-title="' + this.getAttribute('alt') + '"></a>')
          .parent('a');
      }
    });

    $('.J_qrcode').each(function(i, d) {
      var eQrcode = $(d).next('.qrcode');

      new QRCode(eQrcode[0], {
        width: 256,
        height: 256,
        colorDark: "#444444",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
      });
    });

    // navbar positon handling
    $('.my-sidebar a').on('click', function(e) {
      var navValue = {
        url: $(e.currentTarget).attr('href'),
        scrollTop: $('.my-sidebar').scrollTop(),
      };
      try {
        sessionStorage.setItem('nav', JSON.stringify(navValue));
      } catch (e) {
        //do nothing
      }
    });

    (function navBarRestore() {
      try {
        var navValue = sessionStorage.getItem('nav');
        navValue = navValue && JSON.parse(navValue);
      } catch (e) {
        //do nothing
      }

      if (navValue && navValue.url === location.pathname) {
        $('.my-sidebar').scrollTop(navValue.scrollTop);
      } else {
        var menuItem = $('a[href="' + location.pathname + '"]')
        var offset = menuItem.offset();
        $('.my-sidebar')
          .scrollTop(offset.top - $('.container-fluid').height());
      }
    }());

    var disabledScrolling = false;
    var delta = 5;

    // directory
    (function directoryScroll() {
      function scrollIntoView(anchor) {
        var href = anchor;
        // use native dom api to prevent href has special character, say .,# and etc
        var header = document.getElementById(href.substring(1));
        var scrollTop = $(header).offset().top - $('.navbar').height() - delta;

        // if the value is valid
        if (scrollTop > 0) {
          disabledScrolling = true;
          $('html, body').animate({
            scrollTop: scrollTop
          }, function() {
            disabledScrolling = false;
          });
        }
      }

      $('.directory-item a').on('click', function(e) {
        var href = $(e.currentTarget).attr('href');
        scrollIntoView(href);

        // set active directory item
        $('.directory-item').removeClass('active');
        $(e.currentTarget).closest('.directory-item').addClass('active');
      });

      var offset = $('.title-entry').map(function(_, item) {
        return $(item).offset().top;
      });

      if (offset.length) {
        function onScroll() {
          if (disabledScrolling) return;

          var idx = 0;
          var realOffset = $('body').scrollTop() + $('.navbar').height();
          for (var i = offset.length - 1; i >= 0; i--) {
            if (offset[i] <= realOffset + delta) {
              idx = i;
              break;
            }
          }

          $('.directory-item').removeClass('active').eq(idx).addClass('active');
        }

        $(window).scroll(onScroll);

        // init from page loading
        if (location.hash) {
          // hash is encoded in safari
          var href = decodeURIComponent(location.hash);
          scrollIntoView(href);

          $('.directory-item').removeClass('active');
          $('a[href="' + href + '"]').closest('.directory-item')
            .addClass('active');
        } else {
          onScroll();
        }
      }
    })();

    // tab control
    $('.tab-control .tab').on('click', function(e) {
      var target = $(e.currentTarget);
      if (target.hasClass('active')) return;

      var tabcontrol = target.closest('.tab-control');

      $('.tab', tabcontrol).removeClass('active');
      target.addClass('active');
      $('.tab-item', tabcontrol).removeClass('active')
        .filter('.demo-' + target.data('type')).addClass('active');
    });
  });

  // do quick search
  (function() {
    var data = [];
    var doFilter = function(text) {
      text = text.toLowerCase();
      $('.search-list a').each(function(_, item){
        var title = $(item).data('title');
        if (!text || ~title.indexOf(text)) {
          $(item).removeClass('hide');
        } else{
          $(item).addClass('hide')
        }
      });

      var hasVisibleOne = $('.search-list a').not('.hide').length;
      $('.search-list')[hasVisibleOne? 'show': 'hide']();
    };

    var buildSearchList = function(data) {
      var tpl = function(title, link) {
        return [
          '<a ',
          'data-title="',
          title.toLowerCase(),
          '" href="',
          link,
          '">',
          title,
          '</a>',
        ].join('');
      };

      var domString = [];
      data.forEach(function(item){
        domString.push(tpl(item.title, item.url));
      })

      return domString.join('');
    };

    var updateActiveItem = function(direction) {
      // 没有显示的item
      var visibleItems = $('.search-list a').not('.hide');
      if(visibleItems.length === 0){
        return;
      }

      var current = $('.search-list a.active').removeClass('active');
      if (current.length === 0) { //第一次出现的情况
        current = visibleItems.eq(0)
      }

      var item = current;
      var found = current;
      while((item = item[direction]()).length) {
        if (!item.hasClass('hide')) {
          found = item;
          break;
        }
      }

      $(found).addClass('active')[0].scrollIntoView();
    };

    var resetActiveItem = function(){
      var active = $('.search-list a')
        .removeClass('active')
        .not('.hide')
        .eq(0).addClass('active');

      if(active.length) {
        active[0].scrollIntoView();
      }
    };

    var fetchData = function(text) {
      var jsRoot = document.getElementById('js-root').value;

      if(!data.length) {
        $.ajax({
          url: jsRoot + 'searchResult.json',
          dataType: 'json',
        }).then(function(result){
          data = result || [];

          $('.search-list').html(buildSearchList(data));
          $('.search-bar').show()

          resetActiveItem();

          // register event
          $('#J_searchbox').on('focus', function(){
            $('.search-bar').addClass('active');
          }).on('blur', function(){
            setTimeout(function(){
              $('.search-bar').removeClass('active');
            }, 200);
          }).on('input', function(){
            var text = $(this).val();
            doFilter(text);
            resetActiveItem();
          }).on('keydown', function(e){
            if(e.keyCode === 40) {
              e.preventDefault();
              updateActiveItem('next');
            } else if (e.keyCode === 38) {
              e.preventDefault();
              updateActiveItem('prev');
            } else if(e.keyCode === 13){
              var current = $('.search-list a.active');
              if(current.length) {
                location.href = current.attr('href');
              }
            }
          });
        });
      }
    };

    // 获取数据
    fetchData();
  })();
})(window, window.document, window.jQuery);
