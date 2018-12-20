<template>
  <div>
    <div id ='app' class="home">
      <div     v-show="errorpage == true">
        <img :src="imgurl" id="apps" style="position: fixed;top:0;width: 100%;z-index:-1"  >
        <div id="hh" >
          <div v-if="anflag == true">
            <!--<p style="text-align: center;color: #fff;font-size: 18px;">-->
              <!--答案二维码-->
            <!--</p>-->
            <!--<p style="text-align: center;margin-top: 10px;line-height: 32px;color: #fff;font-size: 24px;padding: 10px 20px;">-->
             <!--{{answer.content}}-->
            <!--</p>-->
            <div class="dh">
              <div class="anim-text"  contenteditable spellcheck="false"></div>
              <div id="controls" style="opacity: 0;">
                <select  name="selectEffect" id="selectEffect" class="control">
                  <option value="hop">Hop in</option>
                  <!--<option value="slide">Slide in</option>-->
                </select>
                <div class="tip tip-effect">
                </div>
              </div>
            </div>
          </div>
          <div v-if="anflag == false" style="display: flex;flex-direction: column;justify-content: center;align-items: center">
            <p style="text-align: left;color: #fff;font-size: 22px;line-height: 36px;">
              答案二维码
              <!--店铺：{{shorp.name}}-->
            </p>
            <p style="text-align: left;color: #fff;font-size: 22px;line-height: 36px;">
            二维码已失效
            </p>
            <p style="text-align: left;color: #fff;font-size: 22px;line-height: 36px;">
              订购热线：{{shorp.orderPhone}}
            </p>
          </div>
        </div>
        <p style="text-align: center;color: #fff;font-size: 12px;position: absolute;bottom: 15px;width: 30%;text-align: center;left: 35%;">本答案仅供娱乐</p>
      </div>
      <div style="display: flex;flex-direction: column;align-items: center;margin-top: 60px;" v-show="errorpage == false" >
        <img style="height: 160px;width: 160px;" src="../assets/sb.png"/>
        <p style="text-align: center;margin-top: 10px;font-size: 18px;color:#999;">
          数据加载失败
        </p>
        <p style="text-align: center;margin-top: 10px;font-size: 18px;color:#999;">
          网络或服务器延迟，请稍后再试
        </p>
      </div>
    </div>
    <!--<div>
      <Bgmusic :musicsrc='musicbg'></Bgmusic>
    </div>-->

    <!--<audio id="audio"   controls="controls" autoplay="autoplay" preload="auto">
      <source src="/../../static/img/1.mp3" type="audio/ogg">
      <source src="../../static/img/1.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
    </audio>-->
  </div>

</template>

<script>
import FooterBar from "@/components/FooterBar.vue";
import Bgmusic from '@/components/Bgmusic.vue'
export default {
  name: "home",
  data(){
    return{
      bookpage:true,
      errorpage:true,
      heights:660,
      codeparamts:[],
      answer:{},
      shorp:{},
      anflag:true,
      imgs:0,
      imgurl:'',
      musicbg: "../../static/img/1.mp3",
    }
  },
  components: {
    FooterBar,
    Bgmusic
  },
  methods:{
    golink(item){
      this.$router.push({path: item.htmlurl})

    },
    steps(){
      if(!localStorage.getItem("token")){
        this.$router.replace({path: '/login'})
      }else{
        if(this.middbuttons[0].state === 0){
            this.show1 = true
        }else{
          this.$router.push({path: '/Instructions'})
        }
      }
    },
    gostate(){
      let url = document.location.toString()
      // alert(url)
      //url = 'https://www.xunhuai.net/Index/Indexpage?QrcodrId=0089E3A98C89D07FD2FC2ABE6A6A94C2&ShopId=B141ED0F02742108A6DA5F1606587092&AnsBookNum=53#/'
      console.log(url)
      let arrUrl = url.split('?')
      let paramt = []
      let paramts = {}
      paramts = arrUrl[1]
      paramts = paramts.split('&')
      paramt = paramts
      paramt.forEach(item => {
        this.codeparamts.push(item.split('='))
      })
      // console.error(this.codeparamts[0][1])
      // alert(this.codeparamts[2][1])
      // let ansnum = this.codeparamts[2][1]
      // ansnum = ansnum.substr(0,ansnum.length-2)
      // alert(ansnum)
      this.getData1()

    },
    getData1() {
      let self = this
      this.$dialog.loading.open("获取中...")
      let param = {id:this.codeparamts[0][1]}

      this.$http
        .post(
          "/Qrcode/selectByPrimaryKey",
          { emulateJSON: true ,param, headers: { "Content-Type": "multipart/form-data"}}
        )
        .then(
          function(res) {
            this.$dialog.loading.close()
            console.log(res)
            // alert(res)


            if(res.body.code == '00000'){
              if(res.body.data.scanTimes > 1){
                this.anflag = false
                this.getData2()
              }else {
                this.getData3()
              }
              this.errorpage = true
              let url = document.location.toString()
            }else{
              this.errorpage = false
              // alert(res.body.msg);
            }

          },
          function(res) {
            console.log(res)
          }
        );
    },
    getData2() {
      let self = this
      this.$dialog.loading.open("获取中...")
      let id = this.codeparamts[1][1]
      // id = JSON.parse(id)
      let param = {id:id}
      this.$http
        .post(
          "/Qrcode/Shop/selectByKey",
          { emulateJSON: true ,param,headers:{"Content-Type":"multipart/form-data"}}
        )
        .then(
          function(res) {
            this.$dialog.loading.close()
            console.log(res)
            if(res.body.code == '00000'){
              this.shorp = res.body.data
              this.errorpage = true
              let url = document.location.toString()
            }else{
              this.errorpage = false
              // alert(res.body.msg);
            }

          },
          function(res) {
            console.log(res)
          }
        );
    },
    getData3() {
      let self = this
      this.$dialog.loading.open("获取中...")
      let ansnum = this.codeparamts[2][1]
      if(this.codeparamts.length == 3){
        ansnum = ansnum.substr(0,ansnum.length-2)
      }
      let param = {
        ansNum: ansnum,
      }
      this.$http
        .post(
          "/Qrcode/Answerbook/findByAnsNum",
          { emulateJSON: true ,param, headers: { "Content-Type": "multipart/form-data"}}
        )
        .then(
          function(res) {
            this.getData2()
            this.$dialog.loading.close()
            console.log(res)
            if(res.body.code == '00000'){
              this.errorpage = true
              this.anflag = true
              this.answer = res.body.data
              this.ndy()
              // let url = document.location.toString()
            }else{
              this.errorpage = false
              // alert(res.body.msg);
            }

          },
          function(res) {
            console.log(res)
          }
        );
    },
    getData() {
      let self = this
      this.$dialog.loading.open("获取中...")
      let params = {
        'page': 1,
        'pagemax': 30
      }
      this.$http
        .post(
          "/Qrcode/insertManual",
          { emulateJSON: true , headers: { "Content-Type": "multipart/form-data"}}
        )
        .then(
          function(res) {
            this.$dialog.loading.close()
            if(res.body.code == '00000'){
              this.errorpage = true
              let url = document.location.toString()
              // url = '140.143.97.150:8889/Qrcode/Index?QrcodrId=13229B273E22E5E426B8DC9917030929&ShopId=B141ED0F02742108A6DA5F1606587092&AnsBookNum=1'
              let arrUrl = url.split('?')
              let paramt= []
              let paramts = arrUrl[1]
              params = paramts.split('&')
              paramt = params
              paramt.forEach(item => {
                this.codeparamts.push(item.split('='))
              })
              this.getData1()
              // console.error(this.codeparamts)
              // this.banner = res.body.data.topads
              // this.topbottom = res.body.data.upbuttons
              // this.horns = res.body.data.horns
              // this.middbuttons = res.body.data.middbuttons
              // this.bottombuttons = res.body.data.bottombuttons
              // localStorage.setItem("bottombuttons", this.bottombuttons)
            }else{
              this.errorpage = false
              // alert(res.body.msg);
            }

          },
          function(res) {
            console.log(res)
          }
        );
    },
    ndy() {
      const util = {
        math: {
          degToRad: alpha => alpha * Math.PI / 180,

          polarToDecart: (alpha, r) => {
            alpha = this.degToRad(alpha);
            return {x: r * Math.cos(alpha), y: r * Math.sin(alpha)};
          }
        },
        //设置字体颜色 rgb格式
        color: {
          random: (opts = {}) => {
            let h, s, l;

            h = opts.hue || Math.floor(Math.random() * 360);
            s = opts.saturation || Math.floor(Math.random() * 101);
            l = opts.lightness || Math.floor(Math.random() * 101);

            return `hsl(${255}, ${255}%, ${255}%)`;
          }
        }
      };


      /**
       * Make a contenteditable element more controllable
       */
      class FunkyLetters {
        /**
         * Constructor
         * @param  {Element} el  document element with contenteditable=true or selector
         * @param  {Object} [opts] options
         */
        constructor(el, opts = {}) {
          if(typeof el == 'string') {
            el = document.querySelector(el);
          }
          this.container = el;
          this.options = opts;
          this._splitLetters();
          this._listenToInput();
        }


        /**
         * Split container's text into one letter spans optionally colored
         */
        _splitLetters() {
          this.container.innerHTML = FunkyLetters.splitTextLetters(this.container.textContent, this.options);
        }


        /**
         * Split the text into one letter spans
         * @param  {string} text input text
         * @param  {Object} [opts] options
         * @return {string}      html with text split into letters
         */
        static splitTextLetters(text, opts = {}) {
          let letters;

          text = text.replace(/\s+/, ' ');
          letters = text.split(/(?=.)/);

          return letters.reduce((a, b) => a + FunkyLetters.makeLetterHtml(b, opts), '');
        }


        /**
         * Generate html string for a letter
         * @param  {string} letter single letter
         * @param  {Object} [opts]   options
         * @return {string}        html string
         */
        static makeLetterHtml(letter, opts = {}) {
          let style = '',
            className = 'char';

          if(/\s/.test(letter)) {
            letter = ' ';
            className += ' space';
          } else {
            className += ' letter';
          }
          if(opts.colorize) {
            style += 'color:' + util.color.random({saturation: 100, lightness: 50}) + ';';
          }

          return `<span class="${className}" ${style && 'style="' + style + '"'}><span class="letter-inner">${letter}</span></span>`;
        }


        /**
         * Watch input
         */
        _listenToInput() {
          let me = this;
          // this.container.dataset.text = this.container.textContent;

          this.container.addEventListener('keydown', function(e) {
            let letterEl = me.getFocusLetter();

            if(e.key.length === 1 && !e.altKey && !e.ctrlKey) {
              e.preventDefault();
              me.insertText(e.key);
              return;
            }

            // If the container is empty
            if(!letterEl) return;

            switch(e.key) {
              // Firefox focuses in two steps on inline-block elements
              case 'ArrowRight':
                if(navigator.userAgent.indexOf('AppleWebKit') !== -1) break;
                if(!letterEl.nextElementSibling) break;
                e.preventDefault();
                me.setFocus(letterEl.nextElementSibling, 1);
                break;

              case 'ArrowLeft':
                if(navigator.userAgent.indexOf('AppleWebKit') !== -1) break;
                e.preventDefault();
                if(!letterEl.previousElementSibling) {
                  me.setFocus(letterEl, 0);
                } else {
                  me.setFocus(letterEl.previousElementSibling, 1);
                }
                break;

              case 'ArrowUp':
              case 'ArrowDown':
                e.preventDefault();
                break;

              case 'Home':
              case 'PageUp':
                e.preventDefault();
                me.setFocus(this.firstElementChild, 0);
                break;

              case 'End':
              case 'PageDown':
                e.preventDefault();
                me.setFocus(this.lastElementChild, 1);
                break;
            }
          });

          this.container.addEventListener('input', function(e) {
            // Firefox leaves empty containers when text is deleted. Make sure those are deleted too.
            me._cleanEmpty();
          });

          this.container.addEventListener('paste', function(e) {
            if(e.clipboardData.types.indexOf('text/plain') != -1) {
              e.preventDefault();
              me.insertText(e.clipboardData.getData('text/plain'));
            }
          });
        }

        /**
         * Format text and insert it into the container at the caret position
         * @param  {string} text the text to insert
         */
        insertText(text) {
          let sel = document.getSelection(),
            range = document.createRange(),
            node = this.getFocusLetter(),
            isBeforeNode = sel.focusOffset === 0;

          sel.deleteFromDocument();
          if(!node) {
            this.container.insertAdjacentHTML('afterbegin', FunkyLetters.splitTextLetters(text, this.options));
            this.setFocus(Array.from(this.container.querySelectorAll('.char')).pop(), 1);
          } else if(isBeforeNode) {
            node.insertAdjacentHTML('beforebegin', FunkyLetters.splitTextLetters(text, this.options));
            this.setFocus(node.previousElementSibling, 1);
          } else {
            node.insertAdjacentHTML('afterend', FunkyLetters.splitTextLetters(text, this.options));
            for(let i = text.length; i > 0 && node.nextElementSibling; i--) {
              node = node.nextElementSibling;
            }
            this.setFocus(node, node.textContent.length);
          }

          this.container.dataset.changed = true;
          this._cleanEmpty();
        }

        /**
         * Get the character in focus (at caret position)
         * @return {Element} the element node in focus
         */
        getFocusLetter() {
          const sel = document.getSelection();
          return sel.anchorNode.closest ? sel.anchorNode.closest('.char') : sel.anchorNode.parentElement.closest('.char');
        }

        /**
         * Set cursor position
         * @param {Element} node   letter element to focus on
         * @param {Integer} offset offset. In our case, either 0 or 1
         */
        setFocus(node, offset) {
          const sel = document.getSelection(),
            range = document.createRange();

          range.setStart(node, offset);
          sel.removeAllRanges();
          sel.addRange(range);
        }

        /**
         * Delete elements other than .char the browser could have generated
         */
        _cleanEmpty() {
          const focusLetter = this.getFocusLetter();
          Array.from(this.container.children).forEach(el => {
            if(el.classList.contains('char') && el.textContent) return;
            if(el === focusLetter) {
              if(el.previousElementSibling) {
                this.setFocus(el, 1);
              } else if (el.nextElementSibling) {
                this.setFocus(el.nextElementSibling, 1);
              }
            }
            el.remove();
          });
        }
      }

      /**
       * Control animations of an element's children
       */
      class Animator {
        /**
         * Constructor
         * @param  {Element|string} el the container element whose children are being animated
         */
        constructor(el) {
          this.container = el;
          this._removeClassTimer = null;

          // this.container.addEventListener('animationend', () => {
          // 	clearTimeout(this._removeClassTimer);
          // 	this._removeClassTimer = setTimeout(() => {
          // 		this.container.classList.remove('anim');
          // 	}, 900);
          // });
        }


        /**
         * Run animation using the effect
         * @param  {string} effect effect name
         */
        animate(effect) {
          const cont = this.container;
          if(cont.classList.contains('anim')) {
            cont.classList.remove('anim');
            setTimeout(() => {
              this.animate(effect);
            }, 50);
            return;
          }
          clearTimeout(this._removeClassTimer);
          cont.classList.add('anim');
          if(cont.dataset.effect === effect && !('changed' in cont.dataset)) return;
          cont.dataset.effect = effect;
          delete cont.dataset.changed;
          // if(effect !== 'converge'* && effect !== 'spiral'*/ && effect !== 'meteorite') {
          // 	Array.prototype.forEach.call(cont.children, function(el) {
          // 		el.style.transform = '';
          // 	});
          // }
          if(!Animator.effects[effect]) {
            throw new Error(`Animator: effect ${effect} is not defined`);
          }
          if(Animator.effects[effect].delays) {
            this.distributeDelays(Animator.effects[effect].delays);
          } else {
            this.distributeDelays({shift: false});
          }
        }


        /**
         * 设置单个字上下移动
         * Distribute animation delays
         * @param  {Object} opts           options
         * @param  {Object} opts.shift     shift each next item this much milliseconds
         * @param  {Object} [opts.random]  distribute delays randomly: without regard to document order
         * @param  {Object} [opts.reverse] distribute delays in reverse document order starting with the last element
         */
        distributeDelays(opts) {
          let shift = opts.shift != null ? opts.shift : 100,
            curShift = 0,
            els = Array.from(this.container.children);

          if(opts.random) {
            let newEls = [];
            for(let j = 0, l = els.length; j < l; j++) {
              let i = Math.floor(Math.random() * els.length);
              newEls.push(els.splice(i, 1)[0]);
            }
            els = newEls;
          }
          if(opts.reverse) {
            els = els.reverse();
          }

          els.forEach(el => {
            curShift += typeof shift == 'object' ? Math.round(Math.random() * (shift.max - shift.min) + shift.min) : shift;
            el.style.animationDelay = el.querySelector('.letter-inner').style.animationDelay = '';
            if(shift === false) return;
            el.style.animationDelay = (parseFloat(getComputedStyle(el, null).animationDelay) + curShift/1000) + 's';
            el.querySelector('.letter-inner').style.animationDelay = (parseFloat(getComputedStyle(el.querySelector('.letter-inner'), null).animationDelay) + curShift/1000) + 's';
          });
        }


        /**
         * Distribute children's offset positions
         * We are currently doing this in Sass
         * @param  {Object} opts options
         */
        distributeOffsets(opts) {
          let coords,
            alpha = opts.minAngle || 0,
            x = 100,
            y = 100,
            els = this.container.children;

          for(let i = 0; i < els.length; i++) {
            if(opts.dx || opts.dy) {
              x -= opts.dx || 0;
              y -= opts.dy || 0;
            } else {
              if(opts.random) {
                alpha = Math.random * (opts.maxAngle || 360 - opts.minAngle || 0) + opts.minAngle || 0;
                coords = util.math.polarToDecart(alpha, 100);
              } else {
                coords = util.math.polarToDecart(alpha, 100);
                alpha += opts.dAlpha;
              }
              x = coords.x;
              y = coords.y;
            }
            els[i].style.transform = 'translate(' + x.toFixed(3) + 'vmax,' + y.toFixed(3) +'vmax)';
          }
        }
      }
      /**
       * The available animation effects and their settings
       * @type {Object}
       */
      Animator.effects = {
        roll: {
          delays: {shift: 100}
        },
        slide: {
          delays: {shift: 160}
        },
        swivel: {
          delays: {shift: 100, random: true}
        },
        peel: {
          delays: {shift: 70}
        },
        wave: {
          delays: {shift: 30}
        },
        wave2: {
          delays: {shift: 120}
        },
        hop: {
          delays: {shift: 140} //140
        },
        converge: {
          delays: {shift: false}
        },
        fade: {
          delays: {shift: 80, random: true}
        },
        snow: {
          delays: {shift: 600, random: true}
        },
        spiral: {
          delays: {shift: 100}
        },
        meteorite: {
          delays: {shift: 50, random: true}
        },
        bounce: {
          delays: {shift: 200, random: true}
        },
        float: {
          delays: {shift: 400, random: true}
        },
        bubble: {
          delays: {shift: {min: 200, max: 500}, random: true}
        },
      };

      const animationContainer = document.querySelector('.anim-text');
      animationContainer.innerHTML=this.answer.content
      let config = localStorage['funkyLetters:config'];
      try {
        config = JSON.parse(config);
      } catch(e) {
        config = {
          completed: {}
        };
      }

     // Tips
      if(config.completed.changeEffect) {
        document.querySelector('.tip-effect').classList.add('hide');
      } else {
        document.querySelector('#selectEffect').addEventListener('change', () => {
          document.querySelector('.tip-effect').classList.add('hide');
          config.completed.changeEffect = true;
          localStorage['funkyLetters:config'] = JSON.stringify(config);
        }, {once: true});
      }

      if(config.completed.type) {
        document.querySelector('.tip-type').classList.add('hide');
      } else {
        animationContainer.addEventListener('keydown', () => {
          document.querySelector('.tip-type').classList.add('hide');
          config.completed.type = true;
          localStorage['funkyLetters:config'] = JSON.stringify(config);
        }, {once: true});
      }

      if(config.completed.comeBack) {
        document.querySelector('.alert-come-back').classList.add('hide');
      }


      new FunkyLetters(animationContainer, {colorize: true});

      const animator = new Animator(animationContainer);
      animator.animate(document.querySelector('#selectEffect').value);


     // Listen to controls
      /*document.querySelector('#selectEffect').addEventListener('change', function(e) {
        animator.animate(this.value);
      });
      document.querySelector('.animate').addEventListener('click', function(e) {
        animator.animate(document.querySelector('#selectEffect').value);
      });*/


      // Animate on enter key
      animationContainer.addEventListener('keydown', function(e) {
        switch(e.keyCode) {
          case 13:
            e.preventDefault();
            document.querySelector('.animate').focus();
            document.querySelector('.animate').click();
            break;
        }
      });

      // Other
      /*document.querySelector('.dismiss').addEventListener('click', function(e) {
        this.closest('.alert').classList.add('close');
        config.completed.comeBack = true;
        localStorage['funkyLetters:config'] = JSON.stringify(config);
      });*/
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      this.heights = screen.height
      document.getElementById('apps').style.height = screen.height+'px'
      document.getElementById('hh').style.paddingTop = screen.height/2-140+'px'
      this.imgs = parseInt(Math.floor(Math.random() * 12))
      this.imgurl = '../../static/img/'+this.imgs+'.jpg'
      this.gostate()
      // this.getData()
    });
  }
};
</script>
<style scoped>

.home {
  width: 100%;

}
.home1{
  width: 100%;
  background-repeat:no-repeat;
  background-position:top;
  background-attachment:fixed;
}

.home-img img{
 width: 100%;
 height: 16rem;
}
.home-box {
  z-index: 100;
  width: 92%;
  margin: 0 auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 0.8rem;
  overflow: hidden;
  position: relative;
  bottom: 3.5rem;
}
.home-box-column {
  display: flex;
  justify-content: space-around;
  padding: 2rem 0;
  flex-wrap: wrap;
}
.home-box-column-img {
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}
.home-box-column-img img {
  width: 2.1rem;
  height: 2.1rem;
}
.column-corlor1 {
  background: rgba(146, 232, 120, 1);
}
.column-corlor2 {
  background: rgba(241, 180, 139, 1);
}
.column-corlor3 {
  background: rgba(149, 194, 246, 1);
}
.home-box-column-text {
  text-align: center;
  font-size: 0.8rem;
  font-family: PingFang-SC-Medium;
  color: #666666;
  padding-top: 0.5rem;
}
.home-notice {
  display: flex;
  padding: 0px 2rem;
}
.home-notice img {
  width: 24px;
  height: 24px;
  margin-right: 0.8rem;
  margin-top: 3px;
}
.center-content {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  background: linear-gradient(
    180deg,
    rgba(188, 242, 246, 1),
    rgba(49, 192, 254, 1),
    rgba(139, 210, 241, 1)
  );
}
.center-content img{
   width: 2.1rem;
  height: 2.1rem;
}
.center-margin {
  margin: 0 auto;
}
.home-centent{
  display: flex;
  width: auto;
  justify-content: center;
  margin: 2.3rem auto;
}
</style>

