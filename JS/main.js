!function() {
  var view = document;
  var model = {
    hash_backup: null,
    keys: {
      0: {
        0: "1",
        1: "2",
        2: "3",
        3: "4",
        4: "5",
        5: "6",
        6: "7",
        7: "8",
        8: "9",
        9: "0",
        length: 10
      },
      1: {
        0: "q",
        1: "w",
        2: "e",
        3: "r",
        4: "t",
        5: "y",
        6: "u",
        7: "i",
        8: "o",
        9: "p",
        length: 10
      },
      2: {
        0: "a",
        1: "s",
        2: "d",
        3: "f",
        4: "g",
        5: "h",
        6: "j",
        7: "k",
        8: "l",
        length: 9
      },
      3: { 0: "z", 1: "x", 2: "c", 3: "v", 4: "b", 5: "n", 6: "m", length: 7 },
      length: 4
    },
    hash: {
      1: "163.com",
      2: "github.com",
      3: "developer.mozilla.org/zh-CN/",
      4: "css-tricks.com",
      5: "zhangxinxu.com/wordpress/category/css/page/25/",
      6: "tympanus.net/codrops/category/playground/",
      7: "ituring.com.cn/book/1695",
      8: "cndevdocs.com/",
      9: "adamschwartz.co/magic-of-css/",
      0: "javascript.ruanyifeng.com/",
      q: "qq.com",
      w: "weibo.com",
      e: "ele.me",
      r: "renren.com",
      t: "twitter.com",
      y: "youtube.com",
      u: "uc.cn",
      i: "iqiyi.com",
      o: "oschina.net",
      p: "python.org",
      a: "amazon.cn",
      s: "sohu.com",
      d: "douban.com",
      f: "facebook.com",
      g: "google.com",
      h: "huya.com",
      j: "jd.com",
      k: "",
      l: "linux.org",
      z: "zhihu.com",
      x: "xunlei.com",
      c: "cnki.net",
      v: "v2ex.com",
      b: "bilibili.com",
      n: "nodejs.cn",
      m: "imooc.com",
      search: "google"
    },
    init: function() {
      this.hash_backup = JSON.parse(
        localStorage.getItem("hash_backup") || "null"
      );
      if (this.hash_backup) {
        this.hash = this.hash_backup;
      }
    }
  };
  var controller = {
    view: null,
    model: null,
    form: null,
    init: function(view, model) {
      this.view = view;
      this.model = model;
      this.form = this.view.querySelector("#search");
      this.model.init();
      this.generatingKeyboard();
      this.inputFocus(this.model.keys, this.model.hash);
      this.inputBlur(this.model.keys, this.model.hash);
      this.searchInit();
      this.secrch();
    },
    searchInit: function() {
      let hash = this.model.hash;
      let searchName = this.model.hash.search;
      let searchOption = this.view.querySelector(
        "option[name=" + searchName + "]"
      );
      searchOption.selected = "selected";
      let select = this.view.querySelector("#searchSelect");
      select.addEventListener("change", e => {
        let searchSelect = this.view.getElementById("searchSelect");
        let searchIndex = searchSelect.selectedIndex;
        let searchName = searchSelect.options[searchIndex].innerText;
        hash.search = searchName;
        localStorage.setItem("hash_backup", JSON.stringify(hash));
      });
    },
    secrch: function() {
      this.form.addEventListener("submit", e => {
        e.preventDefault();
        let searchContent = this.form.querySelector("#searchText").value;
        let searchSelect = this.view.getElementById("searchSelect");
        let searchIndex = searchSelect.selectedIndex;
        let searchValue = searchSelect.options[searchIndex].value;
        if (searchContent) {
          window.open(searchValue + searchContent);
        } else {
          alert("还未输入搜索内容");
        }
      });
    },
    generatingKeyboard: function() {
      let keys = this.model.keys;
      let hash = this.model.hash;
      for (let index = 0; index < keys.length; index++) {
        Newdiv = this.view.createElement("div");
        nav.appendChild(Newdiv);
        var row = keys[index];

        for (var index2 = 0; index2 < row["length"]; index2++) {
          var Newkey = this.createKey(row, index2);
          var Newbutton = this.createButton(row, index2);
          var Newspan = this.createSpan(hash, row, index2);
          var Newicon = this.createIcon(hash, row, index2);

          Newdiv.appendChild(Newkey);
          Newkey.appendChild(Newbutton);
          Newkey.appendChild(Newspan);
          Newkey.appendChild(Newicon);

          this.bindEvents(Newkey, hash); //监听用户鼠标和键盘点击事件
        }
      }
    },
    createKey: function(row, index2) {
      let Newkey = this.view.createElement("kbd");
      Newkey.textContent = row[index2];
      Newkey.className = "key";
      Newkey.id = "key";
      return Newkey;
    },
    createButton: function(row, index2) {
      let hash = this.model.hash;
      let Newbutton = this.view.createElement("button");
      Newbutton.textContent = "E";
      Newbutton.id = row[index2];
      Newbutton.onclick = buttonclick => {
        let oldWebsite = hash[buttonclick.target.id];
        let newWebsite = prompt("请输入一个新网址", oldWebsite);
        if (newWebsite) {
          hash[buttonclick.target.id] = newWebsite;
          Newbutton.nextSibling.innerText = "点击前往 http://" + newWebsite;//实时修改提示语句
        }
        localStorage.setItem("hash_backup", JSON.stringify(hash));
      };
      return Newbutton;
    },
    createSpan: function(hash, row, index2) {
      let Newspan = this.view.createElement("span");
      Newspan.textContent = "点击前往 http://" + hash[row[index2]];
      return Newspan;
    },
    createIcon: function(hash, row, index2) {
      let Newicon = this.view.createElement("img");
      if (hash[row[index2]]) {
        Newicon.src = "http://" + hash[row[index2]] + "/favicon.ico";
      } else {
        Newicon.src = "./img/noIcon.png";
      }
      return Newicon;
    },
    bindEvents: function(Newkey, hash) {
      this.onClick(Newkey, hash);
      this.keyPress(hash);
    },
    onClick: function(Newkey, hash) {
      Newkey.onclick = kbdclick => {
        let isKey = kbdclick.toElement.id;
        if (isKey == "key") {
          let key = kbdclick.target.innerText;
          key = key.toLowerCase();
          let website = hash[key[0]];
          if (website) {
            window.open("http://" + website, "_blank");
          } else {
            alert("所选按钮网址为空，请点击编辑后输入");
          }
        }
      };
    },
    keyPress: function(hash) {
      this.view.onkeypress = keypress => {
        let website = hash[keypress.key];
        if (website) {
          window.open("http://" + website, "_blank");
        } else {
          alert("所选按钮网址为空，请点击编辑后输入");
        }
      };
    },
    //当输入栏启用时
    inputFocus: function(keys, hash) {
      let input = this.view.getElementById("searchText");
      input.onfocus = () => {
        for (let index = 0; index < keys.length; index++) {
          var row = keys[index];
          for (var index2 = 0; index2 < row["length"]; index2++) {
            this.view.onkeypress = keypress => {};
          }
        }
      };
    },
    inputBlur: function(keys, hash) {
      let input = this.view.getElementById("searchText");
      input.onblur = () => {
        for (let index = 0; index < keys.length; index++) {
          var row = keys[index];
          for (var index2 = 0; index2 < row["length"]; index2++) {
            this.keyPress(hash);
          }
        }
      };
    }
  };

  controller.init(view, model);
}.call();
