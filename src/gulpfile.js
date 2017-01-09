'use strict';

let gulp = require('gulp');
let $ = require('gulp-load-plugins')();
let del = require('del');
let markdownToJSON = require('gulp-markdown-to-json');
let marked = require('marked');
let gutil = require('gulp-util');
let replace = require('gulp-replace');
let nunjucks = require('nunjucks');
let fs = require('fs-extra');
let path = require('path');
let hljs = require('highlight.js');
let he = require('he');
let browserSync = require('browser-sync').create();
let runSequence = require('run-sequence');
let minify = require('html-minifier').minify;

const minifyOptions = {
  minifyCSS: true,
  minifyJS: true,
  collapseWhitespace: true
};

let paths = {
  posts: [
    './docs/**/*.md',
  ],
  less: [
    './theme/static/global.less'
  ],
  lessSrc: [
    './theme/static/**/*.less'
  ],
  style: [
    './theme/static/global.css',
  ],
  js: [
    './theme/static/app.js',
  ],
  templates: [
    './theme/**/*.njk',
  ],
  fonts: [
    './theme/static/bs/fonts/*.*',
  ]
};

let nowTime = Date.now();
let timeSuffix = `?t=${nowTime}`;
let defaultGroup = '_default';

let isOnline = false;
let destDir = '../';
let root;
let antBridgeSupport = true;
const env = process.env.NODE_ENV;
const isDev = (env === 'development' || !env);

if (env === 'development') {
  root = '/';
} else if (env === 'online') {
  root = '/';
  isOnline = true;
  timeSuffix = '';
} else if (env === 'online-ab') {
  root = '/';
  isOnline = true;
  timeSuffix = '';
} else if (env === 'local') {
  root = '/site/dist/';
} else {
  root = '/ssdata/site/';
}

let renderer = new marked.Renderer();

// wrap table to enable overflow
renderer.table = function(header, body) {
  return `<div class="table-responsive">
  <table class="table table-striped table-bordered table-hover">
    <thead>${header}</thead>
    <tbody>${body}</tbody>
  </table>
</div>
        `;
};

marked.setOptions({
  renderer: renderer,
  pedantic: true,
  smartypants: true
});

nunjucks.configure('theme', {
  autoescape: false,
  watch: isDev,
  noCache: true
});

gulp.task('clean', function() {
  return del([destDir]);
});

gulp.task('assets:less', function() {
  const AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];
  const banner = '/*! build: <%=buildTime%> */\n';

  return gulp.src(paths.less)
    .pipe(isDev ? $.sourcemaps.init() : gutil.noop())
    .pipe($.less())
    // 注意线上部署时字体路径要相对于 css 文件，否则替换 CDN 资源时会被忽略，导致线上字体引用出错
    .pipe(replace('{{root}}', isOnline ? '' : root))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe($.banner(banner, {
      buildTime: new Date().toString(),
    }))
    .pipe(isDev ? $.sourcemaps.write() : gutil.noop())
    .pipe(isDev ? gutil.noop() : $.cssnano())
    .pipe(gulp.dest(`${destDir}/static`));
});

gulp.task('assets:fonts', function() {
  gutil.log(gutil.colors.yellow('copy fonts'));

  return gulp.src(paths.fonts)
    .pipe(gulp.dest(`${destDir}/static/fonts`));
});

gulp.task('assets:js', function() {
  gutil.log(gutil.colors.yellow('copy js'));

  return gulp.src(paths.js)
    .pipe(isDev ? $.sourcemaps.init() : gutil.noop())
    .pipe($.uglify())
    .pipe(isDev ? $.sourcemaps.write() : gutil.noop())
    .pipe(gulp.dest(`${destDir}/static`));
});

gulp.task('assets', function(callback) {
  runSequence(['assets:fonts', 'assets:less', 'assets:js'], callback);
});

gulp.task('build:html', function(callback) {
  let myData = {};
  let rMd = /\.md$/;
  let rMeta = /\/meta\.md$/;
  let demoWriteList = {};

  function writeFile(fileName, fileData) {
    let filePath = path.join(process.cwd(), destDir, fileName);
    gutil.log(gutil.colors.cyan(`writing file: ${filePath}`));
    fs.outputFileSync(filePath, fileData);
  }

  function generateDemo(lang, code, data) {
    let parts = lang.split('/');
    let fileName = data.path.replace(rMd, '-') + (parts[1] || 'demo') + '.html';
    let title = parts[2] || `${file.path}示例代码`;
    let demoURL = `${root}${fileName}`;

    let fileData = nunjucks.render('demo.html.njk', {
      content: he.decode(code),
      title,
      timeSuffix,
    });

    demoWriteList[data.path] = demoWriteList[data.path] || [];
    demoWriteList[data.path].push({
      fileName,
      fileData,
    });

    return ``;
  }

  function generateDemoGroup(data) {
    // 只对jsapi 进行demo组处理
    if (!data.body || data.path.indexOf('jsapi') !== 0) return;

    data.body = data.body.replace(/<pre><code class="lang-demo\/([^"]+)">([\S\s]+?)<\/code><\/pre>\n*<pre><code class="lang-demo\/([^"]+)">([\S\s]+?)<\/code><\/pre>/gm, function(all, lang1, code1, lang2, code2) {
      let source1 = generateDemo('lang-demo/' + lang1, code1, data);

      // 兼容老版本
      if (!antBridgeSupport) {
        return source1;
      }

      let source2 = generateDemo('lang-demo/' + lang2, code2, data);

      // 这里直接假设raw肯定在antbridge版本之前，就不做判断了
      // 这里只检测两个都不包含的情况，直接暴力出错
      if (lang1.indexOf('antbridge-') !== 0 && lang2.indexOf('antbridge-') !== 0) {
        throw new Error(`demo组必须要包含一个antBridge demo，文件名： ${data.path}, demo名： ${lang1}`)
      }

      const rawClass = isOnline ? '' : 'active';
      const abClass = isOnline ? 'active' : '';

      return `<div class="tab-control">
        <ul class="tab-header">
          <li data-type="raw" class="tab ${rawClass}">Raw</li>
          <li data-type="ab" class="tab ${abClass}">Ant Bridge</li>
        </ul>
        <div class="tab-item demo-raw ${rawClass}">${source1}</div>
        <div class="tab-item demo-ab ${abClass}">${source2}</div>
        </div>`;
    });
  }

  function generateSourceCode(data) {
    if (!data.body) return;

    data.body = data.body.replace(/<pre><code class="(?!hljs)([^"]+)">([\S\s]+?)<\/code><\/pre>/gm, function(all, lang, code) {
      // gutil.log(gutil.colors.red(`lang=${lang}`));

      if (lang.toLowerCase() === 'lang-js' || lang.toLowerCase() === 'lang-javascript') {
        return `<div class="code-wrap"><pre class="hljs"><code>${hljs.highlightAuto(he.decode(code), ['javascript']).value}</code></pre></div>`;
      }

      if (lang.indexOf('lang-demo/') === 0) {
        return generateDemo(lang, code, data);
      }

      return `<div class="code-wrap"><pre class="hljs"><code>${hljs.highlightAuto(he.decode(code), [lang.replace('lang-', ''), 'html']).value}</code></pre></div>`;
    });
  }

  function excludePrivateContent(data) {
    if (!data.body) return;

    // 私有定制
    data.body = data.body.replace(/\{\{\{([\S\s]+?)\}\}\}/gm, function(all, content) {
      if (isOnline) {
        return '';
      }

      return content;
    });
  }

  function generateDirectory(data) {
    if (!data.body) return;

    const headers = [];
    data.body = data.body.replace(/<h(\d)[^>]*>([\S\s]*?)<\/h\1>/g, function(match, level, title) {
      //收集所有的h1-h6信息
      headers.push({
        level,
        title
      });

      // 替换原先生成的id为新的id
      return match.replace(/id="[^"]*"/, `id="${title}" class="title-entry"`);
    });

    //如果有标题信息，输出
    if (headers.length) {
      const html = [
        '<ul class="directory">'
      ];
      headers.forEach(function(item, idx) {
        // 默认选择第一个
        html.push(`<li class="directory-item level${item.level} ${idx == 0 ? ' active' : ''}"><a href="#${item.title}">${item.title}</a></li>`)
      });

      html.push('</ul>');
      data.guideList = html.join(''); //把目录放在头部
    }
  }

  function addEditButton(data) {
    // 增加编辑按钮
    if (!isOnline) {
      let issueLabel = path.basename(data.path).replace(/\.md$/, '')
        .replace(/-(\w)/g, function(all, letter) {
          return letter.toUpperCase();
        });

      data.body += `
        <div class="my-qa-wrap">
          <a href="http://gitlab.alipay-inc.com/ssdata/site/edit/master/docs/${data.path}" class="my-edit-button" title="点此编辑" target="_blank"><span class="glyphicon glyphicon-pencil"></span><a>
          <a href="http://gitlab.alipay-inc.com/ssdata/x/issues?label_name=${issueLabel}" class="my-issue-button" title="点此提问" target="_blank"><span class="glyphicon glyphicon-comment"></span><a>
        </div>
      `;
    }
  }

  return gulp.src(paths.posts)
    .pipe(gutil.buffer())
    .pipe(markdownToJSON(marked, 'content.json', (data, file) => {
      data.path = file.path.replace(file.base, '');

      generateDemoGroup(data);
      generateSourceCode(data);
      excludePrivateContent(data);
      generateDirectory(data);
      addEditButton(data);

      gutil.log(gutil.colors.yellow(data.path));

      myData[data.path] = data;

      return data;
    }))
    .on('end', function() {
      let rawFiles = Object.keys(myData).sort((a, b) => a.localeCompare(b));
      let writeList = [];
      let navItems = {};
      let allPosts = [];

      rawFiles.map((file) => {
        let parts = file.split('/');
        let key = parts[0];
        let key2 = parts.slice(0, 2).join('/');
        let topMetaFile = myData[key + '/meta.md'];
        let navItem;
        let secondMetaFile = myData[key2 + '/meta.md'];
        let childNode = {
          path: file.replace(rMd, '.html'),
          data: myData[file],
          root,
        };

        // 添加isNew flag
        const metaValue = childNode.data;
        if(metaValue.isNew && metaValue.expired) {
          const expiredDate = new Date(metaValue.expired);

          if (expiredDate > new Date()) {
            childNode.isNew = true;
          }
        }

        // 如果一级目录不存在 meta.md 则忽略
        // 如果是 meta/static 关键词忽略，避免覆盖
        if (!topMetaFile || key === 'meta' || key === 'static' || isOnline && !topMetaFile.public) {
          return;
        }

        if (isOnline &&!myData[file].public) {
          return;
        }

        !rMeta.test(file) && writeList.push(file);
        navItem = navItems[key] = navItems[key] || {
            meta: {
              value: topMetaFile,
              key,
            },
            menuList: [],
          };
        navItem.meta.value.navTitle = navItem.meta.value.navTitle || navItem.meta.value.title;

        let group = parts[1] && !rMd.test(parts[1]) ? parts[1] : defaultGroup;
        let hasMetaFile = false;
        if (parts.length >= 3 && secondMetaFile) {
          hasMetaFile = true;
        } else {
          group = defaultGroup;
        }

        // console.log(`file=${file}, topMetaFile=${!!topMetaFile}, hasMetaFile=${hasMetaFile}, group=${group}`);

        // 过滤二级菜单
        if (hasMetaFile && isOnline && !secondMetaFile.public) {
          return;
        }

        // 二级菜单
        navItem[group] = navItem[group] || {
            list: [],
          };

        if (!rMeta.test(file)) {
          allPosts.push(childNode);
          navItem[group].list.push(childNode);
        } else if (hasMetaFile) {
          navItem[group].meta = myData[file];
        }
      });

      let navKeys = [];
      Object.keys(navItems).sort((a, b) => {
        return Number(navItems[a].meta.value.order || 0) - Number(navItems[b].meta.value.order || 0);
      }).map((key) => {
        navKeys.push(key);

        Object.keys(navItems[key])
          .filter((k) => k !== 'meta' && k !== 'menuList')
          .sort((a, b) => a.localeCompare(b))
          .map((navKey) => {
            navItems[key].menuList.push(navKey);

            navItems[key][navKey].list.sort((a, b) => {
              return Number(a.data.order || 0) - Number(b.data.order || 0);
            });
          });

        navItems[key].menuList = navItems[key].menuList.sort((a, b) => {
          gutil.log(navItems[key][a].meta)

          return Number((navItems[key][a].meta || {}).order || 0) - Number((navItems[key][b].meta || {}).order || 0);
        });

        navItems[key].menuList.splice(navItems[key].menuList.indexOf(defaultGroup), 1);
        navItems[key].menuList.unshift(defaultGroup);

        gutil.log(navItems[key].menuList);

        let firstNavKey = navItems[key].menuList[0];
        navItems[key].meta.value.path = navItems[key][firstNavKey].list[0].path;
      });

      // console.dir(writeList);

      // 排序
      Object.keys(navItems).forEach((key) => {
        if (navItems[key]._default.list) {
          navItems[key]._default.list.forEach((el, index) => {
            const id = 'el_' + index;
            navItems[key][id] = {
              list: [el],
              meta: el.data
            };
            navItems[key].menuList.push(id);
          });
          delete navItems[key]._default;
          navItems[key].menuList = navItems[key].menuList.filter(el => el !== '_default');

          // 重新排序
          navItems[key].menuList = navItems[key].menuList.sort((a, b) => {
            // console.log(navItems[key][a].meta.order, navItems[key][b].meta.order);
            return navItems[key][a].meta.order - navItems[key][b].meta.order > 0;
          });

          // 去掉meta
          navItems[key].menuList.forEach((el, index) => {
            if (el.match('el_')) {
              delete navItems[key][el].meta;
            }
          });
        }
      });

      writeList.forEach((file) => {
        let fileName = file.replace(rMd, '.html');

        let navKey = file.split('/')[0];
        let data = {
          navItems,
          navKeys,
          root,
          navKey,
          data: myData[file],
          timeSuffix,
          isOnline,
          antSayKey: fileName,
        };

        let fileData = nunjucks.render('post.html.njk', data);

        writeFile(fileName, minify(fileData, minifyOptions));

        if (demoWriteList[file]) {
          demoWriteList[file].forEach((d) => {
            writeFile(d.fileName, d.fileData);
          });
        }
      });

      let indexData = nunjucks.render('index.html.njk', {
        navItems,
        navKeys,
        root,
        timeSuffix,
        isOnline,
        isHome: true,
      });

      writeFile('index.html', minify(indexData, minifyOptions));

      // write quick search data to json
      const quickSearchList = allPosts.map((value) => ({
        url: value.root + value.path,
        title: value.data.title
      }));
      writeFile('searchResult.json', JSON.stringify(quickSearchList));
    });
});

gulp.task('build', function(callback) {
  //runSequence('clean', ['build:html', 'assets'], callback);
    runSequence(['build:html', 'assets'], callback);
});

gulp.task('watch', function() {
  gulp.watch(paths.posts.concat(paths.templates), ['build:html']);
  gulp.watch(paths.lessSrc, ['assets:less']);
  gulp.watch(paths.js, ['assets:js']);
});

gulp.task('server', function(callback) {
  browserSync.init({
    files: '../',
    server: '../',
    reloadDebounce: 200,
    reloadDelay: 1000,
    open: 'external',
    injectChanges: false,
  });
});

// start server after build finished
gulp.task('dev', function() {
  runSequence('build', ['watch', 'server']);
});

gulp.task('default', ['build', 'watch']);
