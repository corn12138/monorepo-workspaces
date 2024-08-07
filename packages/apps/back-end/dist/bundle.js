(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('core-js/modules/esnext.async-iterator.for-each.js'), require('core-js/modules/esnext.iterator.constructor.js'), require('core-js/modules/esnext.iterator.for-each.js'), require('koa'), require('koa-router'), require('koa-bodyparser'), require('core-js/modules/esnext.async-iterator.reduce.js'), require('core-js/modules/esnext.iterator.reduce.js'), require('core-js/modules/es.array.push.js'), require('jsonwebtoken')) :
    typeof define === 'function' && define.amd ? define(['core-js/modules/esnext.async-iterator.for-each.js', 'core-js/modules/esnext.iterator.constructor.js', 'core-js/modules/esnext.iterator.for-each.js', 'koa', 'koa-router', 'koa-bodyparser', 'core-js/modules/esnext.async-iterator.reduce.js', 'core-js/modules/esnext.iterator.reduce.js', 'core-js/modules/es.array.push.js', 'jsonwebtoken'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(null, null, null, global.Koa, global.Router, global.bodyParser, null, null, null, global.jwt));
})(this, (function (esnext_asyncIterator_forEach_js, esnext_iterator_constructor_js, esnext_iterator_forEach_js, Koa, Router, bodyParser, esnext_asyncIterator_reduce_js, esnext_iterator_reduce_js, es_array_push_js, jwt) { 'use strict';

    const RequestMethod = {
      GET: "get",
      POST: "post",
      PUT: "put",
      DELETE: "delete",
      OPTIONS: "options"
    };
    const controllers = [];
    function Controller(prefix = '') {
      return function (target) {
        target.prefix = prefix;
      };
    }
    function RequestMapping(method = "", url = "") {
      return function (target, proKey, descriptor) {
        let path = url || `\${proKey}`;
        const item = {
          path,
          method,
          handler: target[proKey],
          //函数体
          constructor: target.constructor
        };
        controllers.push(item);
      };
    }

    var _dec$2, _dec2$2, _class$2, _class2$2;
    function _applyDecoratedDescriptor$2(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
    let BookController$1 = (_dec$2 = Controller("/book"), _dec2$2 = RequestMapping(RequestMethod.GET, "/all"), _dec$2(_class$2 = (_class2$2 = class BookController {
      async getAllBooks(ctx) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve("success");
          }, 1000);
        }).then(res => {
          ctx.body = {
            data: ['一秒学会前端', "一天精通web3"]
          };
        });
      }
      // 
      // async getFeed()
    }, (_applyDecoratedDescriptor$2(_class2$2.prototype, "getAllBooks", [_dec2$2], Object.getOwnPropertyDescriptor(_class2$2.prototype, "getAllBooks"), _class2$2.prototype)), _class2$2)) || _class$2);
    /**
     * router的本质 就是函数和地址对应的关系
     * 
     * router.get('/book/all', async (ctx)=>{
     * 
     *     return new Promise((resolve, reject) => {
                setTimeout(()=>{
                    resolve("success")
                },1000);
            }).then(res=>{
                ctx.body = {
                    data:['一秒学会前端',"一天精通web3"]
                }
            })
     * })

            所以， 装饰器 ，是帮我们在运行之前 做收集的。
     */

    // 构建一个自定义的 jwt的插件
    const SALT = 'fengkuangxingqisi.vme50';
    const signature = user => jwt.sign(user, SALT, {
      expiresIn: "10h"
    });
    const verify = async token => {
      return new Promise((resolve, reject) => {
        if (token) {
          jwt.verify(token, SALT, (err, data) => {
            if (err) {
              if (err.name === "tokenExprieError") {
                resolve({
                  status: "failed",
                  error: "tokenExprieError"
                });
              } else {
                resolve({
                  status: "failed",
                  error: "token 非法"
                });
              }
            } else {
              resolve({
                status: "success",
                // error:"token is null"
                data
              });
            }
          });
        } else {
          resolve({
            status: "failed",
            error: "token is null"
          });
        }
      });
    };
    const jwtVerify = whiteList => async (ctx, next) => {
      if (whiteList.includes(ctx.path)) {
        next(ctx);
      } else {
        // 这里开始鉴权的逻辑
        let token;
        try {
          token = ctx.request.header.authorization.split("Bearer ")[1];
        } catch (error) {
          const res = await verify(token);
          if (res.status === 'success') {
            next(ctx);
          } else {
            ctx.body = {
              ...res,
              code: 401
            };
          }
        }
      }
    };

    //

    class UserService {
      async validate({
        username,
        password
      }) {
        console.log(username, password, "<=======");
        if (username && password) {
          //走 SQL的逻辑
          if (username === 'luyi') {
            if (password === '123456') {
              const token = signature({
                username
              });
              return {
                code: 200,
                msg: '登录成功',
                status: "success",
                data: {
                  token
                }
              };
            }
            ;
            return {
              code: 200,
              msg: "密码不正确",
              status: "failed"
            };
          }
          ;
          return {
            code: 200,
            msg: "账号未注册",
            status: "failed"
          };
        }
        ;
        return {
          code: 200,
          msg: "账号密码未填写",
          status: "failed"
        };
      }
    }
    ;

    var _dec$1, _dec2$1, _dec3, _class$1, _class2$1;
    function _applyDecoratedDescriptor$1(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
    let UserController = (_dec$1 = Controller("/user"), _dec2$1 = RequestMapping(RequestMethod.GET, "/all"), _dec3 = RequestMapping(RequestMethod.POST, "/login"), _dec$1(_class$1 = (_class2$1 = class UserController {
      async getAllTeachers(ctx) {
        ctx.body = {
          data: ['luyi', "yunyin"]
        };
      }
      async loginUser(ctx) {
        const {
          body
        } = ctx.request;
        const userService = new UserService();
        ctx.body = await userService.validate(body);
      }
    }, (_applyDecoratedDescriptor$1(_class2$1.prototype, "getAllTeachers", [_dec2$1], Object.getOwnPropertyDescriptor(_class2$1.prototype, "getAllTeachers"), _class2$1.prototype), _applyDecoratedDescriptor$1(_class2$1.prototype, "loginUser", [_dec3], Object.getOwnPropertyDescriptor(_class2$1.prototype, "loginUser"), _class2$1.prototype)), _class2$1)) || _class$1);

    const mockList1 = [{
      id: "18_1716607619.756",
      type: "feed",
      offset: 18,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607619,
      updated_time: 1716607619,
      target: {
        id: 3416161716,
        type: "answer",
        url: "https://api.zhihu.com/answers/3416161716",
        author: {
          id: "8dd530d9d332560ed454e65d00a01635",
          url: "https://api.zhihu.com/people/8dd530d9d332560ed454e65d00a01635",
          user_type: "people",
          url_token: "ou-yang-zhou-49",
          name: "大大大西瓜",
          headline: "",
          avatar_url: "https://pica.zhimg.com/50/v2-f143b4ea2d897dc93df62888ee4eb5bc_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 48,
          is_following: false,
          is_followed: false
        },
        created_time: 1709375638,
        updated_time: 1709375638,
        voteup_count: 46,
        thanks_count: 8,
        comment_count: 40,
        is_copyable: true,
        question: {
          id: 615053669,
          type: "question",
          url: "https://api.zhihu.com/questions/615053669",
          author: {
            id: "831cdb7f5739a6d104dc638b388d8981",
            url: "https://api.zhihu.com/people/831cdb7f5739a6d104dc638b388d8981",
            user_type: "people",
            url_token: "yi-shui-15-81",
            name: "有志",
            headline: "再见是为了下次更好的相遇",
            avatar_url: "https://picx.zhimg.com/50/v2-46c4b674941d2b375557ca20a6b3aaf4_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "我好好奇，前端为什么突然就G了？",
          created: 1690879591,
          answer_count: 0,
          follower_count: 0,
          comment_count: 8,
          bound_topic_ids: [225, 769, 7912],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "我面试10个前端，有8个是没有工作经验，都是培训班出来的，他甚至连404是什么都不知道。还有两个水平太差了，== 和 ===，flex布局这些都不懂。然后要的薪资比我还高，我说实话你要是有能力总能找到工作，就是薪资问题，但是你说G了，那肯定是你水平的问题。",
        excerpt_new: "我面试10个前端，有8个是没有工作经验，都是培训班出来的，他甚至连404是什么都不知道。还有两个水平太差了，== 和 ===，flex布局这些都不懂。然后要的薪资比我还高，我说实话你要是有能力总能找到工作，就是薪资问题，但是你说G了，那肯定是你水平的问题。",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="fdGC0lGZ">我面试10个前端，有8个是没有工作经验，都是培训班出来的，他甚至连404是什么都不知道。还有两个水平太差了，== 和 ===，flex布局这些都不懂。然后要的薪资比我还高，我说实话你要是有能力总能找到工作，就是薪资问题，但是你说G了，那肯定是你水平的问题。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 35309,
        favorite_count: 4,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3416161716}',
      attached_info: "CvIECNid2brcy4+PtgEQBBoJNjUxMTk1NzcwIJaBjK8GKC4wKEASSiAKFVRTX1NPVVJDRV9USEVNRV9NRVJHRRIBMBgAIAA6AFoIOTg5NTg0OTNiIGE2MzNkY2M3MjNhZWUyNTJiZTc1NTY3YjRjZGY4ODg2cgozNDE2MTYxNzE2igEJNjE1MDUzNjY5qgEJcmVjb21tZW5kwgEgOGRkNTMwZDlkMzMyNTYwZWQ0NTRlNjVkMDBhMDE2MzXyAQoIDBIGTm9ybWFs8gEoCAoSJDFhYTkzMDVmLTM5MWEtNDUwNC04N2RjLTE5MjJiOTliZmYwYvIBBQgLEgE0ggIAiALEo6bu+jGSAiA4ZGQ1MzBkOWQzMzI1NjBlZDQ1NGU2NWQwMGEwMTYzNZoCAMoCFEZpcnN0QnJ1c2hXZWlnaHRSdWxl2gIVVFNfU09VUkNFX1RIRU1FX01FUkdF6AIC+gILTk9STUFMX0ZMT1eKAyAwMDQxMWNhZWM3MTk0YzVlODY2ZjMwYTU1NTEwOWY3YpoDDQoCdjAQABoFb3RoZXKoA+2TAtgDAOoDG1RoZW1lTWVyZ2VOZXdWM1Bvb2xSZWNhbGxlcvoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTcwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAAAg8fzMP4EFAAAAAAAAAACJBUwMvz+/f6k/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQKSAiUKCTY1MTE5NTc3MBIKMzQxNjE2MTcxNhgEIgpJTUFHRV9URVhU",
      action_card: false
    }, {
      id: "19_1716607619.284",
      type: "feed",
      offset: 19,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607619,
      updated_time: 1716607619,
      target: {
        id: 3358754957,
        type: "answer",
        url: "https://api.zhihu.com/answers/3358754957",
        author: {
          id: "1b74bea46ddb341cf24a8adbfe7b39ab",
          url: "https://api.zhihu.com/people/1b74bea46ddb341cf24a8adbfe7b39ab",
          user_type: "people",
          url_token: "yan-qing-ge-33",
          name: "扛着锄头去打工",
          headline: "",
          avatar_url: "https://pic1.zhimg.com/50/v2-1af02b697d135050a5759ac019f1426e_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 661,
          is_following: false,
          is_followed: false
        },
        created_time: 1704974679,
        updated_time: 1704974679,
        voteup_count: 4845,
        thanks_count: 595,
        comment_count: 1080,
        is_copyable: true,
        question: {
          id: 613547868,
          type: "question",
          url: "https://api.zhihu.com/questions/613547868",
          author: {
            id: "376d2aba743c822ba83328a4bbf000a4",
            url: "https://api.zhihu.com/people/376d2aba743c822ba83328a4bbf000a4",
            user_type: "people",
            url_token: "96303-87",
            name: "知乎用户96303",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 2,
            is_following: false,
            is_followed: false
          },
          title: "男朋友以为我喝醉了，对我说出侮辱性词汇，我该怎么办？",
          created: 1690075712,
          answer_count: 0,
          follower_count: 0,
          comment_count: 146,
          bound_topic_ids: [9628],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "他以为我断片了，但事实是我只是头晕很困，就没有力气管他的动手动脚，后来他开始叫我小宝贝，叫着叫着变成了一句xmg，我当时人很懵，只记得我当时已经全身都僵硬，不知道该怎么做了，今天问他的时候开始我没有说明，他还假装我不知道没听见，然后他就给我解释说那是他看小电影学的，想着我喝醉了不知道，他之前真的是对我很好的一个人，我根本没办法想象到他怎么会说出这种话，谁能告诉我该怎么应对这件事，我好乱。   姐妹，你们…",
        excerpt_new: "他以为我断片了，但事实是我只是头晕很困，就没有力气管他的动手动脚，后来他开始叫我小宝贝，叫着叫着变成了一句xmg，我当时人很懵，只记得我当时已经全身都僵硬，不知道该怎么做了，今天问他的时候开始我没有说明，他还假装我不知道没听见，然后他就给我解释说那是他看小电影学的，想着我喝醉了不知道，他之前真的是对我很好的一个人，我根本没办法想象到他怎么会说出这种话，谁能告诉我该怎么应对这件事，我好乱。   姐妹，你们…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<blockquote data-pid="T5CBMuXS">他以为我断片了，但事实是我只是头晕很困，就没有力气管他的动手动脚，后来他开始叫我小宝贝，叫着叫着变成了一句xmg，我当时人很懵，只记得我当时已经全身都僵硬，不知道该怎么做了，今天问他的时候开始我没有说明，他还假装我不知道没听见，然后他就给我解释说那是他看小电影学的，想着我喝醉了不知道，他之前真的是对我很好的一个人，我根本没办法想象到他怎么会说出这种话，谁能告诉我该怎么应对这件事，我好乱。</blockquote><figure data-size="normal"><img src="https://pic2.zhimg.com/v2-2673abc19a64526164afda5e92584b83_b.jpg" data-rawwidth="600" data-rawheight="600" data-size="normal" data-original-token="v2-7a0751b17fc031ca22a72ab467977cf8" data-default-watermark-src="https://pic3.zhimg.com/v2-fa72ab976b4d9720c62e38339b204a3c_b.jpg" class="origin_image zh-lightbox-thumb" width="600" data-original="https://pic2.zhimg.com/v2-2673abc19a64526164afda5e92584b83_r.jpg"/></figure><p data-pid="7F_C_AhM">姐妹，你们这种情况应该是还没有到完全了解、可以把“欲望付诸于行动”的程度吧？</p><p data-pid="5W8ua-FN">如果你们已经那啥过了，你从没听到过这样的词汇，现在突然听到，可能是你男朋友隐藏的好，也可能是看小视频发掘了他的X癖。</p><figure data-size="normal"><img src="https://pic4.zhimg.com/v2-cf1f429dad2982a72ad803bc83981123_b.jpg" data-rawwidth="889" data-rawheight="500" data-size="normal" data-original-token="v2-2cc629afcb237492e6f881f9ef1f67be" data-default-watermark-src="https://picx.zhimg.com/v2-8da0924f5497e53a0c7f846f96a4850f_b.jpg" class="origin_image zh-lightbox-thumb" width="889" data-original="https://pic4.zhimg.com/v2-cf1f429dad2982a72ad803bc83981123_r.jpg"/></figure><p data-pid="WNhs6EIg">总之，这件事可以证明的是你男朋友喜欢这种，具体情况可能要分两种：</p><p data-pid="sqWRV0Sz">1、他只在和你做那事的时候喜欢。那就看你能否接受，可以当做伴侣间的小情趣，不接受的话就跟他明确说明，说你感受到被侮辱，让他以后别再说。</p><p data-pid="WfI_-3Qb">2、他潜意识里不尊重你，想奴化你。进一步，他根本不尊重女性，这样你们就没必要再相处下去了，离得越远越好。</p><p data-pid="zfU8vv_R">另外“他以为你断片了、动手动脚”，他平时经常这样吗？他平时在你清醒时会这样对你吗？感觉这个你男朋友问题有点大，你好好再考虑考虑你们的交往吧。</p><figure data-size="normal"><img src="https://pica.zhimg.com/v2-28d933db31a45f83b5887ad216c05308_b.jpg" data-rawwidth="500" data-rawheight="313" data-size="normal" data-original-token="v2-88812d18e81fd4e64b3a67abd11df368" data-default-watermark-src="https://pica.zhimg.com/v2-b522f1b53af2c1ab5e6498b160bb1d5a_b.jpg" class="origin_image zh-lightbox-thumb" width="500" data-original="https://pica.zhimg.com/v2-28d933db31a45f83b5887ad216c05308_r.jpg"/></figure><p></p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 2260099,
        favorite_count: 1016,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3358754957}',
      attached_info: "CqAFCNid2brcy4+PtgEQBBoJNjQwNzU5NDQ3INey/6wGKO0lMLgIQBNKKAoTVFNfU09VUkNFX0ZFRURSRV9WNxIBMBgAIAA6CnsicmF3IjoiIn1aCDk4NjI0MjUxYiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIKMzM1ODc1NDk1N4oBCTYxMzU0Nzg2OKoBCXJlY29tbWVuZMIBIDFiNzRiZWE0NmRkYjM0MWNmMjRhOGFkYmZlN2IzOWFi8gEKCAwSBk5vcm1hbPIBKAgKEiQyOTI0OGEzZC02NGIyLTRhNTctYWVhMi04MTE2MTExYzg4Y2XyAQUICxIBNIICAIgCxaOm7voxkgIgMWI3NGJlYTQ2ZGRiMzQxY2YyNGE4YWRiZmU3YjM5YWKaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCG09sZENvbnRlbnRSZWR1Y2U1V2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhNUU19TT1VSQ0VfRkVFRFJFX1Y36AIC+gILTk9STUFMX0ZMT1eKAyAwMDQxMWNhZWM3MTk0YzVlODY2ZjMwYTU1NTEwOWY3YpoDDQoCdjAQABoFb3RoZXKoA4P5iQHYAwDqAwlmZWVkcmVfdjf6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAzE2MMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAACrIxz+BBQAAAAAAAAAAiQVMDL8/v3+pP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUCkgIlCgk2NDA3NTk0NDcSCjMzNTg3NTQ5NTcYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }, {
      id: "20_1716607619.110",
      type: "feed",
      offset: 20,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607619,
      updated_time: 1716607619,
      target: {
        id: 3491370171,
        type: "answer",
        url: "https://api.zhihu.com/answers/3491370171",
        author: {
          id: "224630b28c9437c94e8a6eff29047971",
          url: "https://api.zhihu.com/people/224630b28c9437c94e8a6eff29047971",
          user_type: "people",
          url_token: "xiao-ming-28-28-88",
          name: "yell明",
          headline: "人类性行为观察员",
          avatar_url: "https://pic1.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 157,
          is_following: false,
          is_followed: false
        },
        created_time: 1715145112,
        updated_time: 1715145112,
        voteup_count: 1023,
        thanks_count: 54,
        comment_count: 105,
        is_copyable: true,
        question: {
          id: 638459259,
          type: "question",
          url: "https://api.zhihu.com/questions/638459259",
          author: {
            id: "ee110f592306a93caaf4d6ed369922e0",
            url: "https://api.zhihu.com/people/ee110f592306a93caaf4d6ed369922e0",
            user_type: "people",
            url_token: "seed-94-84",
            name: "爆seed",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/v2-80874bf491da13fe02fd83dc1e92ded4_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 13,
            is_following: false,
            is_followed: false
          },
          title: "听说男孩学芭蕾要阉掉是真的吗，是真的我想学?",
          created: 1704579617,
          answer_count: 0,
          follower_count: 0,
          comment_count: 4,
          bound_topic_ids: [1316341, 2649865, 2649866, 2870987, 3130209],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "谢谢邀请我。。。，是的要都切掉，这样穿裤子会平整，女舞伴会比较放心，而且和女舞伴身体接触的时候能够没有顾及，清心寡欲比较容易提升芭蕾舞的境界，如果平时补充雄激素，身体还是会有欲望，在跳舞的时候那种雄性欲望的迸发已经不是通过下体这般低俗的展示出来，而是由内而外灵魂的散发。 所以要都切掉。",
        excerpt_new: "谢谢邀请我。。。，是的要都切掉，这样穿裤子会平整，女舞伴会比较放心，而且和女舞伴身体接触的时候能够没有顾及，清心寡欲比较容易提升芭蕾舞的境界，如果平时补充雄激素，身体还是会有欲望，在跳舞的时候那种雄性欲望的迸发已经不是通过下体这般低俗的展示出来，而是由内而外灵魂的散发。 所以要都切掉。",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="dn3sMBlk">谢谢邀请我。。。，是的要都切掉，这样穿裤子会平整，女舞伴会比较放心，而且和女舞伴身体接触的时候能够没有顾及，清心寡欲比较容易提升芭蕾舞的境界，如果平时补充雄激素，身体还是会有欲望，在跳舞的时候那种雄性欲望的迸发已经不是通过下体这般低俗的展示出来，而是由内而外灵魂的散发。</p><p data-pid="rAn40Abm">所以要都切掉。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: true,
        visited_count: 385633,
        favorite_count: 88,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3491370171}',
      attached_info: "CoEFCNid2brcy4+PtgEQBBoJNjY0ODY3MzkwIJiT7LEGKP8HMGlAFEooChNUU19TT1VSQ0VfRkVFRFJFX1Y3EgEwGAAgADoKeyJyYXciOiIifVoJMTA0MTU4MjE3YiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIKMzQ5MTM3MDE3MYoBCTYzODQ1OTI1OaoBCXJlY29tbWVuZMIBIDIyNDYzMGIyOGM5NDM3Yzk0ZThhNmVmZjI5MDQ3OTcx8gEKCAwSBk5vcm1hbPIBKAgKEiQ0NzliY2Y2Zi1mY2M5LTQ2N2UtYmY4NC0wY2YwNGI1MWViYTnyAQUICxIBNIICAIgCxaOm7voxkgIgMjI0NjMwYjI4Yzk0MzdjOTRlOGE2ZWZmMjkwNDc5NzGaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhNUU19TT1VSQ0VfRkVFRFJFX1Y36AIC+gILTk9STUFMX0ZMT1eKAyAwMDQxMWNhZWM3MTk0YzVlODY2ZjMwYTU1NTEwOWY3YpoDDQoCdjAQABoFb3RoZXKoA+HEF9gDAOoDCWZlZWRyZV92N/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAAAg6jXEP4EFAAAAAAAAAACJBUwMvz+/f6k/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQKSAiUKCTY2NDg2NzM5MBIKMzQ5MTM3MDE3MRgEIgpJTUFHRV9URVhU",
      action_card: false
    }, {
      id: "21_1716607619.739",
      type: "feed",
      offset: 21,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607619,
      updated_time: 1716607619,
      target: {
        id: 3454329137,
        type: "answer",
        url: "https://api.zhihu.com/answers/3454329137",
        author: {
          id: "cab3f3ed43aba3ea0317eef599691c83",
          url: "https://api.zhihu.com/people/cab3f3ed43aba3ea0317eef599691c83",
          user_type: "people",
          url_token: "ae5555",
          name: "ae5555",
          headline: "一位爱好游泳健身舞蹈的绅士",
          avatar_url: "https://pic1.zhimg.com/50/v2-4ce278de3c081164ed7df9deeac34970_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 8835,
          is_following: false,
          is_followed: false
        },
        created_time: 1712217119,
        updated_time: 1713752819,
        voteup_count: 5462,
        thanks_count: 329,
        comment_count: 568,
        is_copyable: false,
        question: {
          id: 20308010,
          type: "question",
          url: "https://api.zhihu.com/questions/20308010",
          author: {
            id: "11c151b0b4a6477c8947a7a8058f632b",
            url: "https://api.zhihu.com/people/11c151b0b4a6477c8947a7a8058f632b",
            user_type: "people",
            url_token: "chenghan",
            name: "程瀚",
            headline: "你不懂，你没红过。",
            avatar_url: "https://pic1.zhimg.com/50/v2-ccde0a27f2e7116e1ab329e19ea0308e_l.jpg?source=b6762063",
            is_org: false,
            gender: 1,
            followers_count: 344685,
            is_following: false,
            is_followed: false
          },
          title: "什么叫洗钱？",
          created: 1340261110,
          answer_count: 0,
          follower_count: 0,
          comment_count: 18,
          bound_topic_ids: [17334, 19800],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "你是国土资源局一把手，年收入50w，有人送你3000w现金，这明显是不能花的。 怎么办？ 让小舅子注册一家游戏公司，请4-5个人开发个巨sb的网页游戏，找个网吧三和大神注册个账号，你充3000w进去，扣除4-5个游戏开发者的工资给三和大神500块网费以及缴纳的税费，剩下都是你的。以后收的钱也可以这样操作。 或者 注册个直播平台，雇个艺术系大学生跳舞当网红，叫十个三和大神注册个账号，自己给这网红刷3000万礼物，这些钱扣除给艺术…",
        excerpt_new: "你是国土资源局一把手，年收入50w，有人送你3000w现金，这明显是不能花的。 怎么办？ 让小舅子注册一家游戏公司，请4-5个人开发个巨sb的网页游戏，找个网吧三和大神注册个账号，你充3000w进去，扣除4-5个游戏开发者的工资给三和大神500块网费以及缴纳的税费，剩下都是你的。以后收的钱也可以这样操作。 或者 注册个直播平台，雇个艺术系大学生跳舞当网红，叫十个三和大神注册个账号，自己给这网红刷3000万礼物，这些钱扣除给艺术…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "disallowed",
        content: '<p data-pid="jN7kkgqv">你是国土资源局一把手，年收入50w，有人送你3000w现金，这明显是不能花的。</p><p data-pid="YVhKU_8N">怎么办？</p><p data-pid="QlgnHVJz">让小舅子注册一家游戏公司，请4-5个人开发个巨sb的网页游戏，找个网吧三和大神注册个账号，你充3000w进去，扣除4-5个游戏开发者的工资给三和大神500块网费以及缴纳的税费，剩下都是你的。以后收的钱也可以这样操作。</p><p data-pid="IASnlrv_">或者</p><p data-pid="d1L-eIME">注册个直播平台，雇个艺术系大学生跳舞当网红，叫十个三和大神注册个账号，自己给这网红刷3000万礼物，这些钱扣除给艺术大学生的工资和三和大神们的网费 剩下都是你的。</p><p data-pid="ur7gqbpL">电影，炒茶，红酒，茅台，古董字画，赌博（自己做庄自己去赌输个精光）这些老招就不讲了，大家都知道。</p><p data-pid="RdCrbOZt">——————————————————</p><p data-pid="1iv-ezGJ">看到评论区这么踊跃，我回应一下</p><p data-pid="Ns0MEV9i">首先洗钱是个靠脑子的活，我都讲得这么清楚了懂得人自然懂，不懂的人你手把手教他他还是不懂。抬杠前先动动脑子。</p><p data-pid="TDsO8A0m">其次3000万现金是我举的例子，事实上不可能这么多现金，大多数人都是转账。至于你说银行查不查的问题，有没有一种可能我可以出具合同证明呢？比如咨询费，系统维护费，设计费等等，毕竟公司是我的了，公章在我手上。还有一种做法就是找代充公司，就是我们日常见的游戏代充，这些公司会帮你做好流水。至于女大学生那个更简单了，大额充值可以跟直播平台谈返点，网红都是这样捧出来的，你不知道只是你不关注新闻。</p><p data-pid="tOERQ0hi">最后公司名义上是小舅子开，但实际控制人是我，你说我是不是可以动公账，比如报销我日常消费，以公司名义购房购车，聘请我儿子作为公司独立董事给他开巨额工资？</p><p data-pid="f6oPKmxx">你非要说天网恢恢疏而不漏，这些手段很容易被纪委抓到，我只能说我刚讲的例子都是被抓进去的人曾经用过的，裁判文书网公开资料，是实际的，可行的，能被破解的，但也是现在还在用的。抓这些人也不麻烦，根本不需要纪委去调查，只要贪官收钱不办事，纪委那自然能收到一沓举报资料，不管洗钱手段多高明多复杂都没用，把你抓进去后，你自然会交代洗钱过程。</p><p data-pid="4bFIPc2h">即使都这样了，几乎每星期都有人被纪委抓进去，还是有那么多人前赴后继的贪，洗钱的手段不管手段多复杂，就算钱划去欧美新加坡加拿大甚至拉美非洲，只要行贿的人举报，最后都是两条路：退赃交给国家的15年以上到无期，拒不退赃的死缓到死刑。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 805608,
        favorite_count: 4079,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3454329137}',
      attached_info: "Cv4ECNid2brcy4+PtgEQBBoJNjU4MTMyNTEyIJ+4ubAGKNYqMLgEQBVKKAoTVFNfU09VUkNFX0ZFRURSRV9WNxIBMBgAIAA6CnsicmF3IjoiIn1aBjMwMzQ3MGIgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjM0NTQzMjkxMzeKAQgyMDMwODAxMKoBCXJlY29tbWVuZMIBIGNhYjNmM2VkNDNhYmEzZWEwMzE3ZWVmNTk5NjkxYzgz8gEKCAwSBk5vcm1hbPIBKAgKEiRkOTI3N2IyOC1mM2VlLTRiM2UtOTE1YS0wYjkwNGQyMTUzMjXyAQUICxIBNIICAIgCxaOm7voxkgIgY2FiM2YzZWQ0M2FiYTNlYTAzMTdlZWY1OTk2OTFjODOaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhNUU19TT1VSQ0VfRkVFRFJFX1Y36AIC+gILTk9STUFMX0ZMT1eKAyAwMDQxMWNhZWM3MTk0YzVlODY2ZjMwYTU1NTEwOWY3YpoDDQoCdjAQABoFb3RoZXKoA+iVMdgDAOoDCWZlZWRyZV92N/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAABAD7fDP4EFAAAAAAAAAACJBUwMvz+/f6k/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQKSAiUKCTY1ODEzMjUxMhIKMzQ1NDMyOTEzNxgEIgpJTUFHRV9URVhU",
      action_card: false
    }, {
      id: "22_1716607619.441",
      type: "feed",
      offset: 22,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607619,
      updated_time: 1716607619,
      target: {
        id: 3509255000,
        type: "answer",
        url: "https://api.zhihu.com/answers/3509255000",
        author: {
          id: "0b2d7ef426cd6be458a113a8b0371b83",
          url: "https://api.zhihu.com/people/0b2d7ef426cd6be458a113a8b0371b83",
          user_type: "people",
          url_token: "42-54-24-65-76",
          name: "通星塔",
          headline: "儿童发展，自闭症家庭干预",
          avatar_url: "https://picx.zhimg.com/50/v2-756b85962ddf58da4a94de432a88105a_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          followers_count: 52,
          is_following: false,
          is_followed: false
        },
        created_time: 1716591656,
        updated_time: 1716591656,
        voteup_count: 1,
        thanks_count: 0,
        comment_count: 0,
        is_copyable: false,
        question: {
          id: 655874455,
          type: "question",
          url: "https://api.zhihu.com/questions/655874455",
          author: {
            id: "d2c717bd1904173694007691fd9d8345",
            url: "https://api.zhihu.com/people/d2c717bd1904173694007691fd9d8345",
            user_type: "people",
            url_token: "shui-bai-la",
            name: "水白啦",
            headline: "",
            avatar_url: "https://pic1.zhimg.com/50/v2-5780012d89b3ad8113edbd7a75b4e2e9_l.jpg?source=b6762063",
            is_org: false,
            gender: 1,
            followers_count: 2,
            is_following: false,
            is_followed: false
          },
          title: "专科学历，前端，感觉完全找不到工作啊，有没有前辈给点建议？",
          created: 1715583769,
          answer_count: 0,
          follower_count: 0,
          comment_count: 1,
          bound_topic_ids: [225, 707, 9611, 2170995],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "专科，进大厂很难。 再者岗位少了，人多了，没办法的事。 除非你真的是实力超群，不可替代。自己去想想，到底能不能达到这个level。 不要等到30多了再考虑这些事情，中年危机可不是跟你开玩笑的。",
        excerpt_new: "专科，进大厂很难。 再者岗位少了，人多了，没办法的事。 除非你真的是实力超群，不可替代。自己去想想，到底能不能达到这个level。 不要等到30多了再考虑这些事情，中年危机可不是跟你开玩笑的。",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "disallowed",
        content: '<p data-pid="f4HW2OLx">专科，进大厂很难。</p><p data-pid="iOJl33zi">再者岗位少了，人多了，没办法的事。</p><p data-pid="l-Qi0CkM">除非你真的是实力超群，不可替代。自己去想想，到底能不能达到这个level。</p><p data-pid="elpsgIRe">不要等到30多了再考虑这些事情，中年危机可不是跟你开玩笑的。</p><p></p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: true,
        visited_count: 19,
        favorite_count: 0,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3509255000}',
      attached_info: "CqQFCNid2brcy4+PtgEQBBoJNjY4MTE3ODIxIKi4xLIGKAEwAEAWSiQKGVRTX1NPVVJDRV9XQVJNX1VQX05PUk1BTDESATAYACAAOgBKIgoXVFNfU09VUkNFX1dBUk1VUF9SVUNFTkUSATAYACAAOgBaCTEwODAyNzczMmIgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjM1MDkyNTUwMDCKAQk2NTU4NzQ0NTWqAQlyZWNvbW1lbmTCASAwYjJkN2VmNDI2Y2Q2YmU0NThhMTEzYThiMDM3MWI4M/IBCggMEgZOb3JtYWzyASgIChIkNjkwMzMxOTktMzdlZi00YTNkLTkxNDctZTM1M2M0ZGVkYmMw8gEFCAsSATSCAgCIAsWjpu76MZICIDBiMmQ3ZWY0MjZjZDZiZTQ1OGExMTNhOGIwMzcxYjgzmgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXKAhhDb250ZW50V2FybVVwQnJlYWtJblJ1bGXaAhlUU19TT1VSQ0VfV0FSTV9VUF9OT1JNQUwx6AIC+gILTk9STUFMX0ZMT1eKAyAwMDQxMWNhZWM3MTk0YzVlODY2ZjMwYTU1NTEwOWY3YpoDDQoCdjAQABoFb3RoZXKoAxPYAwDqAwt0ZXh0X3J1Y2VuZfoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQCYWnCBAM0MDDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAAAHpbI/gQUAAAAAAAAAAIkFTAy/P79/qT+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFApICJQoJNjY4MTE3ODIxEgozNTA5MjU1MDAwGAQiCklNQUdFX1RFWFQ=",
      action_card: false
    }, {
      id: "23_1716607619.185",
      type: "feed",
      offset: 23,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607619,
      updated_time: 1716607619,
      target: {
        id: 3183702494,
        type: "answer",
        url: "https://api.zhihu.com/answers/3183702494",
        author: {
          id: "476335b39c59f6a5dcf62f52979fe667",
          url: "https://api.zhihu.com/people/476335b39c59f6a5dcf62f52979fe667",
          user_type: "people",
          url_token: "nan-shi-34",
          name: "南石",
          headline: "",
          avatar_url: "https://picx.zhimg.com/50/v2-c162084afbcc673739eebe31f4692e1d_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          followers_count: 3190,
          is_following: false,
          is_followed: false
        },
        created_time: 1693040632,
        updated_time: 1693040632,
        voteup_count: 27019,
        thanks_count: 3211,
        comment_count: 1522,
        is_copyable: true,
        question: {
          id: 430474423,
          type: "question",
          url: "https://api.zhihu.com/questions/430474423",
          author: {
            id: "9bc146bb4e9a0d9e0eb55d13b0a42146",
            url: "https://api.zhihu.com/people/9bc146bb4e9a0d9e0eb55d13b0a42146",
            user_type: "people",
            url_token: "july-76-72",
            name: "July",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/v2-759c88e7172413579218dc7bde698e22_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 5,
            is_following: false,
            is_followed: false
          },
          title: "如何看待大学里面怀孕的女生？",
          created: 1605489559,
          answer_count: 0,
          follower_count: 0,
          comment_count: 64,
          bound_topic_ids: [27361, 62197, 132854],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "大学一对学弟学妹平时出双入对，大三的时候女生怀孕了， 两个人偷偷地想去打掉，到了医院大夫告诉他们，双胞胎，你们再考虑考虑吧， 男的慌了，打电话给爸妈求助，第二天爸妈杀到了学校，妈妈笑的眼睛都成一条线了， 直接说，会亲家。 双方在学校附近的小饭店会面，达成共识，领证结婚，找老师办休学，生了孩子爷爷奶奶带，再回来完成学业。 一切顺利，等到同届同学毕业的时候，两人也生完孩子回到学校。 据说因为结婚证是全国性…",
        excerpt_new: "大学一对学弟学妹平时出双入对，大三的时候女生怀孕了， 两个人偷偷地想去打掉，到了医院大夫告诉他们，双胞胎，你们再考虑考虑吧， 男的慌了，打电话给爸妈求助，第二天爸妈杀到了学校，妈妈笑的眼睛都成一条线了， 直接说，会亲家。 双方在学校附近的小饭店会面，达成共识，领证结婚，找老师办休学，生了孩子爷爷奶奶带，再回来完成学业。 一切顺利，等到同届同学毕业的时候，两人也生完孩子回到学校。 据说因为结婚证是全国性…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="3bQJRzQO">大学一对学弟学妹平时出双入对，大三的时候女生怀孕了，</p><p data-pid="6FBJWqEE">两个人偷偷地想去打掉，到了医院大夫告诉他们，双胞胎，你们再考虑考虑吧，</p><p data-pid="v1lLgqoO">男的慌了，打电话给爸妈求助，第二天爸妈杀到了学校，妈妈笑的眼睛都成一条线了，</p><p data-pid="Ev8HTg7X">直接说，会亲家。</p><p data-pid="7aLFxpRv">双方在学校附近的小饭店会面，达成共识，领证结婚，找老师办休学，生了孩子爷爷奶奶带，再回来完成学业。</p><p data-pid="qa2nIpmh">一切顺利，等到同届同学毕业的时候，两人也生完孩子回到学校。</p><p data-pid="IoEMFZyr">据说因为结婚证是全国性证书，还给两人多加了2学分。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 4297208,
        favorite_count: 1545,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3183702494}',
      attached_info: "CqAFCNid2brcy4+PtgEQBBoJNjA4OTM4MTgwIPj/pqcGKIvTATDyC0AXSigKE1RTX1NPVVJDRV9GRUVEUkVfVjcSATAYACAAOgp7InJhdyI6IiJ9Wgg1Nzk0MDI5MGIgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjMxODM3MDI0OTSKAQk0MzA0NzQ0MjOqAQlyZWNvbW1lbmTCASA0NzYzMzViMzljNTlmNmE1ZGNmNjJmNTI5NzlmZTY2N/IBCggMEgZOb3JtYWzyASgIChIkNmNiMTRiMTItY2E5OS00NGMwLWE0NDItN2VhODQ5M2M5ZWZi8gEFCAsSATSCAgCIAsWjpu76MZICIDQ3NjMzNWIzOWM1OWY2YTVkY2Y2MmY1Mjk3OWZlNjY3mgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAhZSZXZpc2l0VmFsdWVXZWlnaHRSdWxl2gITVFNfU09VUkNFX0ZFRURSRV9WN+gCAvoCC05PUk1BTF9GTE9XigMgMDA0MTFjYWVjNzE5NGM1ZTg2NmYzMGE1NTUxMDlmN2KaAw0KAnYwEAAaBW90aGVyqAP4o4YC2AMA6gMJZmVlZHJlX3Y3+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAIzMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAQG0Nxz+BBQAAAAAAAAAAiQVMDL8/v3+pP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUCkgIlCgk2MDg5MzgxODASCjMxODM3MDI0OTQYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }];
    const mockList2 = [{
      id: "24_1716607630.221",
      type: "feed",
      offset: 24,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3476277118,
        type: "answer",
        url: "https://api.zhihu.com/answers/3476277118",
        author: {
          id: "3f03c9e6ac9e67dcecb5bebc16a90699",
          url: "https://api.zhihu.com/people/3f03c9e6ac9e67dcecb5bebc16a90699",
          user_type: "people",
          url_token: "shuai-jiang-shan",
          name: "handsome",
          headline: "",
          avatar_url: "https://pic1.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 13,
          is_following: false,
          is_followed: false
        },
        created_time: 1713881552,
        updated_time: 1714017751,
        voteup_count: 217,
        thanks_count: 22,
        comment_count: 85,
        is_copyable: false,
        question: {
          id: 592327756,
          type: "question",
          url: "https://api.zhihu.com/questions/592327756",
          author: {
            id: "d1fd14d197abd477e49b9687a8843a8d",
            url: "https://api.zhihu.com/people/d1fd14d197abd477e49b9687a8843a8d",
            user_type: "people",
            url_token: "shen-diao-da-xia-52-70",
            name: "樱木",
            headline: "学生",
            avatar_url: "https://picx.zhimg.com/50/v2-b50bfe56cc4d554923070f253c008c4d_l.jpg?source=b6762063",
            is_org: false,
            gender: 1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "如何评价前端已死？",
          created: 1679981946,
          answer_count: 0,
          follower_count: 0,
          comment_count: 5,
          bound_topic_ids: [99, 225, 307, 769, 1746],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "面了一个15-25k的，给我出了个这题，我本能说123456，他说对了，解释一下，我解释不出来，他说我基础差，可能他的工作需要他把promise套这么多层吧，神tm基础差。 Promise.resolve().then(() => { console.log(0); return Promise.resolve(4); }).then((res) => { console.log(res); }); Promise.resolve().then(() => { console.log(1); }).then(() => { console.log(2); }).then(() => { console.log(3); }).then(() => { cons…",
        excerpt_new: "面了一个15-25k的，给我出了个这题，我本能说123456，他说对了，解释一下，我解释不出来，他说我基础差，可能他的工作需要他把promise套这么多层吧，神tm基础差。 Promise.resolve().then(() => { console.log(0); return Promise.resolve(4); }).then((res) => { console.log(res); }); Promise.resolve().then(() => { console.log(1); }).then(() => { console.log(2); }).then(() => { console.log(3); }).then(() => { cons…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "disallowed",
        content: '<p data-pid="-TZOA_a_">面了一个15-25k的，给我出了个这题，我本能说123456，他说对了，解释一下，我解释不出来，他说我基础差，可能他的工作需要他把promise套这么多层吧，神tm基础差。</p><p data-pid="JI0ByXXh">Promise.resolve().then(() =&gt; {</p><p data-pid="qhltkpB5">    console.log(0);</p><p data-pid="rcxvAWCG">    return Promise.resolve(4);</p><p data-pid="IbYgyjxa">}).then((res) =&gt; {</p><p data-pid="gEurvDNO">    console.log(res);</p><p data-pid="aYjC6ubf">});</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="NhHlr6tS">Promise.resolve().then(() =&gt; {</p><p data-pid="VGKZFKZo">    console.log(1);</p><p data-pid="Cz7CqJs0">}).then(() =&gt; {</p><p data-pid="YolDr8Fb">    console.log(2);</p><p data-pid="0Lrg3-UC">}).then(() =&gt; {</p><p data-pid="tf2RkUCb">    console.log(3);</p><p data-pid="hFpniNg5">}).then(() =&gt; {</p><p data-pid="CaPz4Pij">    console.log(5);</p><p data-pid="HoSeNGx_">}).then(() =&gt; {</p><p data-pid="-UwXQfUa">    console.log(6);</p><p data-pid="eNhFw9sS">});</p><p data-pid="OsHXKQSi">更新，感觉跟一个误区一样。技术岗不应该是要追求简单的方式解决复杂的问题吗？我刚开始工作的时候也特别喜欢这种东西，炫技一样，但问题是代码不止一个人看，即使只有你自己看，越复杂的东西后期自己也会想骂娘。</p><p data-pid="yD-quUfC">全是if else for循环，最终解决了，那在我这里也比你炫技写一堆reduce啥的要强。</p><figure data-size="normal"><img src="https://pica.zhimg.com/v2-9a541784ff0c140cb01934ef626d636c_b.jpg" data-rawwidth="469" data-rawheight="701" data-size="normal" data-original-token="v2-a66a09f38c47325c92051f5fa0022087" data-default-watermark-src="https://pica.zhimg.com/v2-e2f8d1bd1e2b2d51db2e8cd9c6cbff80_b.jpg" class="origin_image zh-lightbox-thumb" width="469" data-original="https://pica.zhimg.com/v2-9a541784ff0c140cb01934ef626d636c_r.jpg"/></figure><p data-pid="zx6-Snbx">比如这一坨，我也知道没啥技术含量这个代码，但是下面的明显是能感觉到他比上面的有点技术含量，至少阅读门槛是要高的，但是，意义在哪里？代码量变多了，性能也基本没啥优化，阅读难度也提高了。</p><p data-pid="-FDoPr6c">现在的前端找工作面试现状大概就是这样，要让程序员好不容易在工作中思路下简化的代码思路给重新复杂化。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 107584,
        favorite_count: 101,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3476277118}',
      attached_info: "CrYFCNnhqva8xN6hnQEQBBoJNjYyMTIzNjQ2INCDn7EGKNkBMFVAGEogChVUU19TT1VSQ0VfVEhFTUVfTUVSR0USATAYACAAOgBKKAodVFNfU09VUkNFX0lOVEVSRVNUX1dPUkRfTUVSR0USATAYACAAOgBaCDkzOTEwMDg4YiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIKMzQ3NjI3NzExOIoBCTU5MjMyNzc1NqoBCXJlY29tbWVuZMIBIDNmMDNjOWU2YWM5ZTY3ZGNlY2I1YmViYzE2YTkwNjk58gEKCAwSBk5vcm1hbPIBKAgKEiQxNmM4NmYwOS03Njc3LTRmOTItYjQ0Ni1mNWQzZDE3M2QwNzfyAQUICxIBNYICAIgC6vWm7voxkgIgM2YwM2M5ZTZhYzllNjdkY2VjYjViZWJjMTZhOTA2OTmaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhVUU19TT1VSQ0VfVEhFTUVfTUVSR0XoAgL6AgtOT1JNQUxfRkxPV4oDIGYxODk1MDI2YmMyODQ1ODQ4ZGFmNWIxNWZjMDI1Njk3mgMNCgJ2MBAAGgVvdGhlcqgDwMgG2AMA6gMbVGhlbWVNZXJnZU5ld1YzUG9vbFJlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAMxNjDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAKBjw8w/gQUAAAAAAAAAAIkFFvHlcsY+rT+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFBJICJQoJNjYyMTIzNjQ2EgozNDc2Mjc3MTE4GAQiCklNQUdFX1RFWFQ=",
      action_card: false
    }, {
      id: "25_1716607630.496",
      type: "feed",
      offset: 25,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3486888027,
        type: "answer",
        url: "https://api.zhihu.com/answers/3486888027",
        author: {
          id: "0504655e14307466b079eb7c974a9f47",
          url: "https://api.zhihu.com/people/0504655e14307466b079eb7c974a9f47",
          user_type: "people",
          url_token: "han-yue-64-98",
          name: "二月七",
          headline: "可你不是富士山呀",
          avatar_url: "https://picx.zhimg.com/50/6e040533acb03fbe1e27c14dcae644f9_l.jpg?source=b6762063",
          is_org: false,
          gender: 0,
          followers_count: 118,
          is_following: false,
          is_followed: false
        },
        created_time: 1714784819,
        updated_time: 1714949485,
        voteup_count: 962,
        thanks_count: 16,
        comment_count: 250,
        is_copyable: true,
        question: {
          id: 304420948,
          type: "question",
          url: "https://api.zhihu.com/questions/304420948",
          author: {
            id: "",
            url: "",
            user_type: "people",
            url_token: "",
            name: "匿名用户",
            headline: "",
            avatar_url: "https://picx.zhimg.com/v2-d41c2ceaed8f51999522f903672a521f_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "你都是怎么发现自己感染艾滋病的？",
          created: 1543754381,
          answer_count: 0,
          follower_count: 0,
          comment_count: 56,
          bound_topic_ids: [6140, 7878, 18012, 19920],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "不是我，是前男友。 我是怎么知道的呢，因为那段时间他一直想让我吃短效避孕药。因为他先是手臂桡骨骨折，然后是不明原因肠梗阻，都去了一线城市看病，这事儿就搁置了。我是知道他经历了结膜炎，低烧不退等症状的。突然有一天又提到了让我去做个检查看一下能不能吃短效，在进去检查之前交代我，跟医生说开个术前六项检查.我开始觉得事情不对，经过了几天的争论吵闹，我知道了。 当时没有立刻离开，我总觉得以我的了解他不是那样…",
        excerpt_new: "不是我，是前男友。 我是怎么知道的呢，因为那段时间他一直想让我吃短效避孕药。因为他先是手臂桡骨骨折，然后是不明原因肠梗阻，都去了一线城市看病，这事儿就搁置了。我是知道他经历了结膜炎，低烧不退等症状的。突然有一天又提到了让我去做个检查看一下能不能吃短效，在进去检查之前交代我，跟医生说开个术前六项检查.我开始觉得事情不对，经过了几天的争论吵闹，我知道了。 当时没有立刻离开，我总觉得以我的了解他不是那样…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="eEBXFrvj">不是我，是前男友。</p><p data-pid="jDANYAIf">我是怎么知道的呢，因为那段时间他一直想让我吃短效避孕药。因为他先是手臂桡骨骨折，然后是不明原因肠梗阻，都去了一线城市看病，这事儿就搁置了。我是知道他经历了结膜炎，低烧不退等症状的。突然有一天又提到了让我去做个检查看一下能不能吃短效，在进去检查之前交代我，跟医生说开个术前六项检查.我开始觉得事情不对，经过了几天的争论吵闹，我知道了。</p><p data-pid="RWRV10bY">当时没有立刻离开，我总觉得以我的了解他不是那样的人。恰好骨折啊肠梗阻啊住院治疗，是否是这样感染的也未可知。问他他说不知道。</p><p data-pid="GQt67caC">分手还是源于信任问题，积攒的事情太多，我无法面对巨大的压力，他也没有一句多的解释。就这样分开了。</p><p data-pid="mIC-PqPc">还有我，已经查过多次，距离这事儿已经过去半年，我监测结果全部阴性。</p><p data-pid="2VZpZq7M">怎么说呢，确实想过和你的未来，可也只能到这了。</p><p data-pid="1ARTEojG">恋爱脑没治了哈哈哈</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="pTTxYBzG">感谢大家关注 别赞了 </p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 612991,
        favorite_count: 90,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3486888027}',
      attached_info: "CoEFCNnhqva8xN6hnQEQBBoJNjY0MDUyMjQ0ILOU1rEGKMIHMPoBQBlKKAoTVFNfU09VUkNFX0ZFRURSRV9WNxIBMBgAIAA6CnsicmF3IjoiIn1aCDI5OTI1NTc2YiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIKMzQ4Njg4ODAyN4oBCTMwNDQyMDk0OKoBCXJlY29tbWVuZMIBIDA1MDQ2NTVlMTQzMDc0NjZiMDc5ZWI3Yzk3NGE5ZjQ38gEKCAwSBk5vcm1hbPIBKAgKEiRkMzk5NjFjMC04NjMxLTQwNGItOTBmOC1mMmIwNDU0NjY5MTDyAQUICxIBNYICAIgC6vWm7voxkgIgMDUwNDY1NWUxNDMwNzQ2NmIwNzllYjdjOTc0YTlmNDeaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhNUU19TT1VSQ0VfRkVFRFJFX1Y36AIC+gILTk9STUFMX0ZMT1eKAyBmMTg5NTAyNmJjMjg0NTg0OGRhZjViMTVmYzAyNTY5N5oDDQoCdjAQABoFb3RoZXKoA/+0JdgDAOoDCWZlZWRyZV92N/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAADA4BvDP4EFAAAAAAAAAACJBRbx5XLGPq0/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQSSAiUKCTY2NDA1MjI0NBIKMzQ4Njg4ODAyNxgEIgpJTUFHRV9URVhU",
      action_card: false
    }, {
      id: "26_1716607630.212",
      type: "feed",
      offset: 26,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3493135023,
        type: "answer",
        url: "https://api.zhihu.com/answers/3493135023",
        author: {
          id: "227fff837eae9229257c1ba4b9f0b490",
          url: "https://api.zhihu.com/people/227fff837eae9229257c1ba4b9f0b490",
          user_type: "people",
          url_token: "94-34-81-45",
          name: "我能不能睡中间",
          headline: "",
          avatar_url: "https://picx.zhimg.com/50/v2-89bd26957b9e87e191e16082680d5fec_l.jpg?source=b6762063",
          is_org: false,
          gender: 0,
          followers_count: 294,
          is_following: false,
          is_followed: false
        },
        created_time: 1715269403,
        updated_time: 1715269403,
        voteup_count: 51,
        thanks_count: 6,
        comment_count: 5,
        is_copyable: true,
        question: {
          id: 652586405,
          type: "question",
          url: "https://api.zhihu.com/questions/652586405",
          author: {
            id: "258ba3673ddcdf42fbf5ca7cc1e6cbc8",
            url: "https://api.zhihu.com/people/258ba3673ddcdf42fbf5ca7cc1e6cbc8",
            user_type: "people",
            url_token: "mo-shang-hua-kai-60-28-68",
            name: "开玩笑吧",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/v2-d0f0835e57f5898a750c0de0713e9d68_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 31,
            is_following: false,
            is_followed: false
          },
          title: "男人生理需求那么难忍么？",
          created: 1712810919,
          answer_count: 0,
          follower_count: 0,
          comment_count: 32,
          bound_topic_ids: [10486, 75373, 83626, 2494774, 3053979],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "失恋后，我赌气嫁给了一个36岁的老男人。 婚后吵架，我骂他老牛吃嫩草。 他沉下脸：“今天日免上别求我。” 我冷笑：“求你再多坚持一会儿？” 看到他危险的眼神，我立马捂住了嘴。 每次他摘眼镜，我都知道他要亲亲。 但当他开始摘手表时，我就知道我该跑了…… …… 在爷爷第十个忌日到来前，我踏上了去西藏的路。 我要走遍他曾驻守过的地方，再去他的长眠之处看望他。 程临逸说要让爷爷看到我和他幸福相爱的样子，却和他的女“…",
        excerpt_new: "失恋后，我赌气嫁给了一个36岁的老男人。 婚后吵架，我骂他老牛吃嫩草。 他沉下脸：“今天日免上别求我。” 我冷笑：“求你再多坚持一会儿？” 看到他危险的眼神，我立马捂住了嘴。 每次他摘眼镜，我都知道他要亲亲。 但当他开始摘手表时，我就知道我该跑了…… …… 在爷爷第十个忌日到来前，我踏上了去西藏的路。 我要走遍他曾驻守过的地方，再去他的长眠之处看望他。 程临逸说要让爷爷看到我和他幸福相爱的样子，却和他的女“…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="TWuDyrCu">失恋后，我赌气嫁给了一个36岁的老男人。</p><p data-pid="gXAJhALY">婚后吵架，我骂他老牛吃嫩草。</p><p data-pid="CATdUoiL">他沉下脸：“今天日免上别求我。”</p><p data-pid="WXTgheOQ">我冷笑：“求你再多坚持一会儿？”</p><p data-pid="-E3OWd3l">看到他危险的眼神，我立马捂住了嘴。</p><p data-pid="VjXvBSIs">每次他摘眼镜，我都知道他要亲亲。</p><p data-pid="_EIePUVa">但当他开始摘手表时，我就知道我该跑了……</p><p data-pid="13Orv2Y-">……</p><p data-pid="OnMoFCgB">在爷爷第十个忌日到来前，我踏上了去西藏的路。</p><p data-pid="jyDACHgb">我要走遍他曾驻守过的地方，再去他的长眠之处看望他。</p><p data-pid="p3IEpUsj">程临逸说要让爷爷看到我和他幸福相爱的样子，却和他的女“兄弟”一路打得火热。</p><p data-pid="G9n0-37c">最后，我和一个陌生的藏族男人走完了这段路。</p><p data-pid="3UBmvDvb">程临逸却红着眼来求我复合。</p><p data-pid="0ZvBL0ve">——</p><p data-pid="ttwqss_K">青藏线G109国道。</p><p data-pid="yuyLNDEb">公路两岸，绿草茵茵，天蓝如海。</p><p data-pid="GsjLdWHm">唯一的美中不足，就是我和程临逸已经在这里堵了半个小时！</p><p data-pid="0eguDulK">我干脆拿出手机录周围的风景。</p><p data-pid="_zFqiHBB">程临逸使劲按了按喇叭，不悦地说：“姜梦璇，我开了这么久，这两边除了草还是草，究竟有什么好拍的。”</p><p data-pid="aoTyH3HV">他生气到不耐烦，直接叫我的全名。</p><p data-pid="xZ-IoKoZ">我攥紧了手机，说：“我只是想多看看爷爷待过的地方，留下纪念。”</p><p data-pid="z9ENJPNn">恋爱一个月，其实他很少用这样的语气和我说话。</p><p data-pid="6DQLLdgj">因为我们在大院里从小一起长大，青梅竹马情谊深厚。</p><p data-pid="2Px3CQdo">他知道我爷爷大半辈子都驻守在西藏，最后也葬在这里。</p><p data-pid="Jm0Rll0W">当年爷爷去世时，他还抱着我说：“别哭，等长大了，我陪你去看安爷爷。”</p><p data-pid="B850VYfv">半个月前我决定进藏时，他也说：“我现在是你的男朋友，更应该和你一起，让爷爷见证我们的幸福。”</p><p data-pid="j4dOPyuh">现在，还有三天，爷爷的第十个忌日就要到了。</p><p data-pid="gx3-uKlH">我们已经穿过荒凉的无人区，看过被称为“天路”的青藏铁路，也遇见过怀揣信仰的朝圣者。</p><p data-pid="uK3M9feo">眼看我们还有三天就能赶到寺庙去看爷爷，他却突然变得很不耐烦……</p><p data-pid="M6v8DyHK">我只当他是堵车太久心烦了，轻声安抚：“等到下个休息站换我来开。”</p><p data-pid="PiTfPioy">程临逸好似没听见，语气发沉：“早知道这么麻烦，就该直接坐飞机到拉萨。”</p><p data-pid="NV-ajPK5">说着，他缓缓打起方向盘，准备超车。</p><p data-pid="prvkhJLs">我无声叹了口气，不想和他争执，正要把手机收起来。</p><p data-pid="MxeHjuZx">屏幕里却忽然闯进一个骑着骏马的高大身影。</p><p data-pid="6e7DU08U">虽然看不见长相，但黑色劲装把他衬的肩宽腿长、身形挺拔，气势凌厉如雪山之巅。</p><p data-pid="eQNti_fG">我看得愣了一瞬。</p><p data-pid="jYnI9h5V">就见他轻勒缰绳，在我们车边停下，抬手示意。</p><p data-pid="GCwFpUUE">我连忙收起手机，将车窗降了下来：“请问有什么事？”</p><p data-pid="rIYXf-3w">“车辆不能压草地。”人忍不住联想到神山上裹挟着雪粒的风。</p><p data-pid="cUp32PIG">我这才注意到程临逸竟要把车开到草原上去，连忙提醒：“别破坏植被。”</p><p data-pid="t32fsS9i">程临逸眉头皱得死紧，脸色更加难看，低声骂了一句，将车头回正。</p><p data-pid="1EYGaCMx">我看他这副模样，心里不禁发堵。</p><p data-pid="oGWsKcNn">但还是转头对那位小哥说：“谢谢提醒，以后我们会注意的。”</p><p data-pid="jD5daX-y">他定定地看了我一眼，驱马离开。</p><p data-pid="0Me-TO5p">接下来的路程，程临逸没再说过一句话。</p><p data-pid="D6iojXWs">我心里憋闷，但又不知道该如何说。</p><p data-pid="FEs0C-9w">这样尴尬的氛围一直持续到抵达休息站。</p><p data-pid="T3fWOv6I">我们点了餐，刚找到地方坐下，就听见一个高亢的声音喊：“程临逸！你小子不厚道！”</p><p data-pid="cPAlL8WJ">我闻声看去，就见一个打扮性感的女人大步朝我们走来。</p><p data-pid="yW_O3doB">看清那张脸的刹那，我的心就直直沉了下去。</p><p data-pid="tcyMT5aE">许也韵，程临逸总是挂在嘴边的“好哥们儿”。</p><p data-pid="PO-fnYaf">程临逸一看见她，眼睛瞬间亮了，却又故作冷脸地说：“你怎么来了？”</p><p data-pid="OJKonu0M">许也韵直接在他身边坐下，笑嘻嘻地朝他胸口拍了一下：“我也来旅游，不行啊？”</p><p data-pid="mVouSWMp">说着，又似笑非笑地上下扫了我一眼：“我说你怎么抛下哥们儿进藏了，原来是跟女朋友来的啊，我不会打扰你们吧？”</p><p data-pid="tak754c5">程临逸直接回道：“你别小人之心，小璇又不是那种小气的人，大家一起玩呗。”</p><p data-pid="RYc21Kpk">看着他们俩的亲昵互动，我心里仿佛堵了一团棉花。</p><p data-pid="zfuOZ_IN">正想说些什么。</p><p data-pid="j61TvQin">就听许也韵就笑着说：“那行，我就当一回电灯泡。”</p><p data-pid="Z67mQ8AE">这事就这样定下了，根本没给我说话的机会。</p><p data-pid="LBglkaAw">明明从前，程临逸什么事都会把我放在第一位，生怕我不高兴。</p><p data-pid="fZb-IBjl">可不知道从什么时候开始，程临逸的眼里只剩下了许也韵……一个才出现不过半年的女人。</p><p data-pid="UA4BHiIY">我不想再看，说了句：“我出去透透气。”</p><p data-pid="1ekrfqMm">而后起身匆匆离开。</p><p data-pid="CXNy9fBI">身后传来许也韵的笑声，我竟觉得是在讽刺我，更加快了脚步。</p><p data-pid="GJJ2Xjur">直到走出休息站，清冽的风吹过来。</p><p data-pid="DpoggTtx">我抬头看过去。</p><p data-pid="gKoOwS9t">一望无际的草坪，天际线边的雪顶冰山。</p><p data-pid="7PGIByb6">辽阔景象瞬间疏通了我胸腔内淤堵的情绪，钝痛的心慢慢平复下来。</p><p data-pid="rNgHP9uX">我又缓了缓，才进门去找程临逸。</p><p data-pid="1h8BVmxl">不想原本的桌子上空空荡荡，程临逸和许也韵不知所踪！</p><p data-pid="l8wB9zoW">我心一紧，正想给他打电话。</p><p data-pid="DO44ZsSd">他的信息就发了过来。</p><p data-pid="MXrHG8F2">【阿韵扭了腿，我先送她去救护站，在前面县城等你。】</p><p data-pid="vYoVPURC">2</p><p data-pid="MwZbEL1D">程临逸居然就这样把我丢下，和许也韵走了？！</p><p data-pid="_MQ1mlH6">我颤着手打程临逸电话，可听筒中却只传来冰冷的机械女声。</p><p data-pid="5MFEshsi">我只能憋着火发动汽车，打算等到了县城见到他再说。</p><p data-pid="v2TSxKKB">可导航却不知道带着我拐到了什么路上。</p><p data-pid="Gkf2nmmi">等我反应过来的时候，眼前的景色已经大变样。</p><p data-pid="zkxa3GbZ">山川雪顶看不见了，目光所及之处一片黄色，俨然换成了沙滩戈壁。</p><p data-pid="tSPSYnqh">路也越来越跌宕，周围一辆车都没有，很远的地方有成群的藏羚羊路过。</p><p data-pid="FnGaXBIR">寂静荒漠中，好似天地间都只剩下了我一个人……</p><p data-pid="2tzd9pH3">我被眼前的景象震撼住了，甚至都忘了程临逸的事情。</p><p data-pid="ebAlq37u">正出神，刚刚还冰蓝的天，瞬间就黑沉了下来。</p><p data-pid="PaztHpXz">狂风裹来骤雨，雨点如石子般拍打着我的车窗。</p><p data-pid="wXoOMYoM">雨刷器扫不去玻璃上的水流，我看不清前面的路了。</p><p data-pid="D4c-XEE4">封闭的车厢里，我想起藏区和无人区的传说，恐惧一点点在心里滋生蔓延。</p><p data-pid="nryBuXOF">我忍不住给程临逸打电话。</p><p data-pid="En9XS-3v">可打到第三个，听筒里才传来声音。</p><p data-pid="TS8ZRF4g">“临逸，轻点儿，别碰那里……”</p><p data-pid="GlkeZEJw">是许也韵！</p><p data-pid="LSsmfuxK">我如遭雷击，猛地一脚刹车踩下去，险些撞在方向盘上。</p><p data-pid="bHhrTdNk">这时，电话那头的程临逸才哑声开口：“小璇，我们在这边等你呢，你路上慢点。”</p><p data-pid="LBrUt6CW">“还有事要办，先挂了。”</p><p data-pid="knTHpTlZ">急匆匆说完，就直接挂断了电话。</p><p data-pid="b1_PDJHK">全程没问过我，在哪里，怎么样。</p><p data-pid="foDijxBW">我也才回过神来，原来他所谓的“许也韵伤了脚”只是借口，其实就是想甩开我和许也韵开房！</p><p data-pid="L9ZIsXa3">这个认知像是刀子一样顶进心口，心里尖锐的痛一阵强过一阵。</p><p data-pid="fWpkRQWY">我根本无法冷静，当即重新发动车，就要去抓住这对狗男女！</p><p data-pid="aQJb54mr">可启动键都快要被我按烂，车也没动静。</p><p data-pid="82xwfXon">抛锚了。</p><p data-pid="_HkK5eo0">我强行按下翻涌的情绪，气连害怕都顾不上了，冒着雨下车去查看情况。</p><p data-pid="LoihkC4Y">可弄到我全身都淋透，车子还是无法启动。</p><p data-pid="Yt9DGR16">最近的拖车厂都在几百公里外，根本不接我这单。</p><p data-pid="LVRArUww">我毫无办法，精疲力竭地回到车里。</p><p data-pid="3HS5mSCF">漫天的雨声带着孤寂困住我，我一瞬间忍不住情绪，趴在方向盘上放声痛哭。</p><p data-pid="HRZeKSri">我怎么会这么倒霉……</p><p data-pid="qQPWDcBU">困在前不着村后不着店的路上淋成落汤鸡，男朋友却在县城里跟别的女人开房……</p><p data-pid="GDhdcP1x">哭着哭着，我又忍不住从包里拿出以前的旧照片。</p><p data-pid="bqI_RTw4">照片的背景是一片雪山白云，爷爷抱着我，站在边境线边。</p><p data-pid="sQmaKfUr">我看着爷爷慈祥的笑脸，心里更加酸楚。</p><p data-pid="S6p6GV8G">“爷爷，我只是想来看看你，看看你守护的这边土地，怎么会这么难……”</p><p data-pid="qJ0Blgx-">我摩挲着照片，指尖无意触碰到背后的一串数字。</p><p data-pid="sdb73_eu">怔愣了一瞬后，耳边又回响起爷爷对我说过的话：“小璇啊，以后你在藏区遇到什么困难，都可以打这个电话。”</p><p data-pid="4aH8eIhw">这号码的主人是爷爷最好的战友，过命的情谊。</p><p data-pid="ruNk1QMa">我抱着试试的心态，拨出了那串号码。</p><p data-pid="T_Dnw5qZ">“哪位？”</p><p data-pid="LJwzOb1z">一道低沉清冷的声音传来，还有几分耳熟。</p><p data-pid="YfRP9dQN">我听见是年轻男人的声音有些紧张，又像是抓住救命稻草般，把自己遇到的情况说了。</p><p data-pid="Ir7dE508">才小心翼翼地问：“您可以帮帮我吗？”</p><p data-pid="VC2kw2oI">“位置。”</p><p data-pid="Sv-Znv4A">听见他答应，我陡然松了口气。</p><p data-pid="DAeq_1CO">我说不清这里的位置，就和他加了微信，发了定位过去。</p><p data-pid="bvEOrNPZ">片刻后，对方回了个：“嗯”。</p><p data-pid="JqJapq0O">等对话结束，我又开始焦虑起来。</p><p data-pid="EUBrfXOh">这号码已经这么多年，说不定早就换了主人。</p><p data-pid="1mXtQTf0">又或者，他只是碍于情面敷衍我……</p><p data-pid="Hzy7Ehlu">胡猜乱想了大半个小时，当我以为他不会来的时候。</p><p data-pid="m6PxO9h8">两束车灯强光突然出现在道路尽头，由远及近，好似一点点照进我的心里。</p><p data-pid="AeDeOl-5">会是他吗？</p><p data-pid="UZ-OJsu6">我的心提着，捏着手机的指骨发白。</p><p data-pid="hyJkoq7X">直到越野车在我的车前停下，一个高大的身影下了车。</p><p data-pid="Tkfo495x">铺天的雨幕中，我看见一个穿着黑色劲装的男人背着光、撑着伞，一步步向我走来——</p><p data-pid="S8fHfq7w">3</p><p data-pid="Ziytvo6Z">男人耳间的白松石耳坠轻轻摇晃，炫目的光彩勾住了我所有的注意力。</p><p data-pid="FT0o7-1s">直到车灯清晰地照出男人的面容。</p><p data-pid="hbOKNS7l">肤色略深，五官深邃立体，每一处都堪称精雕细琢，神来之笔。</p><p data-pid="vpC2g4ZB">我看着，脑中忽然冒出一个念头。</p><p data-pid="8E-VW8P-">这一幕，大概会深深烙印在我心底很多很多年……</p><p data-pid="3zETVhFL">愣神间，他已经走到我的车边。</p><p data-pid="ELMT0yyZ">我警惕地只降下一半车窗：“你是扎西岭错，我爷爷留下的电话号码的主人？”</p><p data-pid="nKgWFY2t">他定定看我一眼，颔首：“车放在这，你跟我走。”</p><p data-pid="hcU8__Y0">确认了之后，我提着那口气松了下来。</p><p data-pid="0r9ndHOs">当即将爷爷的照片收回包里，护着包下了车。</p><p data-pid="1mcQv909">走进扎西岭错伞下的那刻，一股极淡的松香裹来，顷刻间好像挡住了所有的风雨。</p><p data-pid="se64iQoR">心松了，我恍然才注意到，天地间一片黑色，好似只有我们踽踽独行。</p><p data-pid="qAhdIIet">下意识地，我又朝他靠近了些。</p><p data-pid="eIO_1nG7">他的伞也好似往我这边倾斜些。</p><p data-pid="qvyIfgkz">不知道为什么，这一方伞下格外安定，像是有魔力一般，抚平了我所有的恐惧不安。</p><p data-pid="8tYn7Gvn">甚至还有心情看看周围的风景。</p><p data-pid="YbxJd18n">正要上时扎西岭错的车，一阵轰鸣声骤然传来。</p><p data-pid="xuNNV1QJ">一辆车横冲直撞的开了过来，又在我面前急急停下。</p><p data-pid="UOP6zxK7">我一惊，偏头就看见程临逸撑着伞跳下车，急匆匆走过来：“小璇！”</p><p data-pid="i8U_238U">他一把将我扯到他的伞下，警惕地瞪着扎西岭错：“这男的是谁？你怎么一点警惕性都没有？！”</p><p data-pid="h4A19Uyc">不分青红皂白的指责瞬间挑起了那我的情绪。</p><p data-pid="Dae-o9Ik">我刚要解释，却扎西岭错睨了他一眼，才拉开车门。</p><p data-pid="NeAeeVEA">那一眼淡漠、沉寂到像是没有任何情绪。</p><p data-pid="gsRNO_Us">可我却从里面看见一丝不屑，和警告。</p><p data-pid="w_t6ijct">上车时，扎西岭错抬眼看向我，薄唇微动，似乎说了句什么。</p><p data-pid="IcihEQNE">可雨声将他的话尽数吞没，只依稀听见什么卡里沛……</p><p data-pid="MXtkmKmA">我心头狠狠一跳，恍然好似觉得这一幕有些熟悉！</p><p data-pid="cFDWImrh">我心头狠狠一跳，恍然好似觉得这一幕有些熟悉！</p><p data-pid="fWMpG59I">记忆中，我小时候跟着爷爷在藏区生活过一段时间，后来离开回北京时，好像也曾有人跟我说“卡里沛”。</p><p data-pid="vV22Ekle">那是“再见”的意思，恍惚里，好像还说“姜梦璇，我在这里，在边境线等你回来”。</p><p data-pid="InOeuick">还没来的及道谢，扎西岭错的越野车已经疾驰而去。</p><p data-pid="STKgpV8w">程临逸不悦地说：“别看了！我才一会儿不在，你边上就有别的男人！”</p><p data-pid="SBaoigrm">我心头一刺，攥紧了手：“他是我请来帮忙的，我给你打了那么多电话，可你只会嫌我坏了你的好事。”</p><p data-pid="64317Ofk">说到这里，刚才那股被无形扇了一巴掌的难堪和屈辱又浮上心头。</p><p data-pid="0qf2lDWg">程临逸神情僵了一瞬，皱起眉说：“你在胡说些什么？我不是马上就来找你了吗？”</p><p data-pid="mOBQ-qa-">我被他反问得一愣，说：“明明是你为了和许也韵……”</p><p data-pid="SN09tb8-">后面的“开房”两个字，像是棉絮一样堵在我的喉间，怎么也说不出来。</p><p data-pid="Hd1OfKBo">程临逸眉头紧拧着，话里满是失望：“小璇，我们一起长大，你这样猜忌我，真的很让我心寒。”</p><p data-pid="n-HBt79c">我的心瞬间沉了下去，明明是他把我丢下在先！</p><p data-pid="R9zihqn_">可能是我的脸色太难看。</p><p data-pid="QlbGXvtr">程临逸缓了脸色，毫不介意我浑身湿透将我搂进怀里。</p><p data-pid="Ee2AI_us">“行了，别多想，有话到车上去说，别感冒了。”</p><p data-pid="7Y64ZIkG">熟悉的关怀让心头酸软一片。</p><p data-pid="JvT87RIl">毕竟过去的十几年，他都是这样处处关切照顾我。</p><p data-pid="rohAEK6p">虽然不知道他什么时候开始变得陌生，但我始终都把他当成以前那个温柔体贴的程临逸看待。</p><p data-pid="e5rZl5B5">我上了他的车。</p><p data-pid="Mfx_SFKK">程临逸给我披上毯子，又把暖气开到最大，给我解释：“阿韵脚崴了，你打电话来的时候，我正扶她到诊室，她现在还在医院等我们。”</p><p data-pid="gmw0y_Kb">我看他的导航目的地是县城医院，这才相信了。</p><p data-pid="cyCP6R35">可心情还是沉闷：“抱歉，是我误会你了。”</p><p data-pid="mW8G0yTL">犹豫了片刻，我才说：“可是我还是觉得你和许也韵……”</p><p data-pid="NQeOlDop">话没说完，程临逸语气就沉了下去：“我们就是好哥们儿，你别想多了。”</p><p data-pid="XxT4uZDD">“女人就是麻烦。”</p><p data-pid="sV9BRMzr">他话里的嫌弃不满没有丝毫掩饰。</p><p data-pid="PaNwVXXp">我心里一刺，委屈蔓延上来。</p><p data-pid="pgeejNRs">许也韵也是女人，为什么他的态度这么不一样？</p><p data-pid="wEg0I8Uc">可我折腾了一路，已经不想再争执，只能默默咽下这口苦水。</p><p data-pid="6mN2W8Ha">可程临逸却又说：“阿韵的腿伤了，这几天咱们就先停在县城，等她的腿伤好了再说。”</p><p data-pid="9NCXRX3a">我心里顿时咯噔一下，难以置信地说：“这几天都留在这儿？”</p><p data-pid="pSoOTPdp">程临逸搭着方向盘，毫不在意的反问我：“不然呢？阿韵脚受伤了，哪儿都去不了。”</p><p data-pid="EYg2FnY2">句句不离许也韵。</p><p data-pid="0DDBB0kT">却全然忘了，还有三天就是爷爷的忌日！</p><p data-pid="CddXFzlk">我的心紧紧蜷缩在一起，连声音都发紧：“爷爷的忌日就要到了，我们最多只能留一天，她可以在医院等我们……”</p><p data-pid="4-E2Qpxz">程临逸皱起眉，冷声道：“她一个人怎么行！你就不能懂点事儿？活人重要还是死人重要？”</p><p data-pid="q5ITf_Ri">我没想到他会说出这样的话。</p><p data-pid="J9Nz2NfQ">一时间像生吞了一颗石头，胸腔里哪儿都咯得疼！</p><p data-pid="s3UAlYFP">是他口口声声说要来陪我祭拜爷爷，走当年爷爷走过的路。</p><p data-pid="7ia5IqfG">现在却又主动反悔……</p><p data-pid="Agfwg3YH">我看着这张喜欢了很多年，突然涌上一股深切的疲倦。</p><p data-pid="C4dLV6A5">如果程临逸不想，我强逼着他去又有什么意义？</p><p data-pid="A3Qn9fgg">我深吸一口气，轻声说：“既然这样，那我们分开走吧。”</p><p data-pid="XuErjjFU">4</p><p data-pid="OETbmjIi">车里瞬间一片死寂。</p><p data-pid="K1M59PKa">程临逸的脸色骤然沉下：“我怎么可能让你一个人上路？姜梦璇，你闹脾气也要有个限度！”</p><p data-pid="W8SPOwjT">我攥紧手，尽量语气平和：“我没有闹脾气，你要陪许也韵我不阻止，分开走是最合适的方式。”</p><p data-pid="cEAkbAfE">程临逸猛地拍了下方向盘，语气烦躁：“阿韵现在下床走路都难，你就非要在这个时候作吗！？”</p><p data-pid="Jf9a8mAC">“再说，爷爷又不是只有这一个忌日，你为什么非要这么犟？”</p><p data-pid="-tLERFvh">我胸口瞬间窜起一团火，但心底却凉得透彻。</p><p data-pid="UHREIZ0l">爷爷从前把程临逸当亲孙一样看待，有什么好东西都想着他！</p><p data-pid="bE_wkyde">我也从没有想过要程临逸二选一，但他的话却把亲疏远近划得如此分明。</p><p data-pid="YPZxaUeV">虽然我是他的正牌女友。</p><p data-pid="CgguzMcj">但好像只要有许也韵在，我就变成了那个不合时宜的第三者。</p><p data-pid="9wrbbEQq">我垂着眸，强行在按心里的情绪。</p><p data-pid="-4yMvzfV">闭上嘴看向窗外，不想再说了。</p><p data-pid="4EbxOhY8">程临逸也没再说话，车辆急速往前开着，窗外风景飞快后退。</p><p data-pid="Z0pBt-dl">我们之间的气氛骤然降到冰点。</p><p data-pid="p1pX3rNd">抵达补给的县城后。</p><p data-pid="-mvGpBw2">我心烦意乱回酒店匆匆洗了个热水澡，疲惫地躺在床上睡着了。</p><p data-pid="rCUDGzTI">第二天。</p><p data-pid="fAxxDpth">我被一阵手机震动的声音吵醒。</p><p data-pid="JvKYajvG">打开才看见是程临逸那些“注意安全”的叮嘱。</p><p data-pid="87RbQ7nJ">如果是往常，我看见这些，都会很开心雀跃，毕竟我喜欢了他好多年。</p><p data-pid="7gY3yxCk">但现在，我一看见和他相关的东西，就会想起他的出尔反尔。</p><p data-pid="JhQq7G5R">只剩闷烦。</p><p data-pid="z40gjSsw">我干脆点进了昨晚新加的那个雪山头像。</p><p data-pid="XKU71oB8">里面只有简单的四个字，和一个地址。</p><p data-pid="65j10zAx">【车在这里。】</p><p data-pid="G9nk7VcS">我看着他头像上的巍峨雪山，莫名想起他左耳上的白松石坠子。</p><p data-pid="WfsDf1gm">忽然明白那个熟悉感从何而来。</p><p data-pid="D-IguuDG">忍不住打下一句：【谢谢！昨天那个骑马的小哥……是你吗？】</p><p data-pid="EGvRSWSR">等了好一会，对面都没有回复。</p><p data-pid="J-xyTxH2">我就直接去修车厂拿了车，补给好物资之后，启程赶往下一个地点。</p><p data-pid="j4dMxZlP">一路上独行，那些烦嘈的事情好像都远去了。</p><p data-pid="DXFY5TsJ">或许是下过一场大雨的原因，此刻外面的空气无比清洗。</p><p data-pid="e-RRITso">甚至经过湖泊时，还有成群的动物在低头喝水。</p><p data-pid="jXhSy1HN">我看着，闷烦的心情陡然平静下来。</p><p data-pid="KopqTkZA">心里只有在远方等待我的爷爷，和爷爷曾说过的那些地点和风景……</p><p data-pid="GbEOGult">几小时后，我抵达一处小镇。</p><p data-pid="eEV4N1e3">导航到爷爷曾提过的一家牦牛肉餐馆，点了几道爷爷提到过的菜。</p><p data-pid="vjPxlQOY">不想刚坐下，三个腰肥体壮的壮汉就围了过来。</p><p data-pid="ndsUEV_M">其中一个人拿着手机笑得猥琐：“美女一个人啊，加个微信呗？”</p><p data-pid="uru5LA9d">我心里发怵，赶忙摆手拒绝：“抱歉，我有男朋友了。”</p><p data-pid="iQrdqYhb">接着站起身打算离开。</p><p data-pid="lms5u2iz">可手腕却猛然被人拽住。</p><p data-pid="64ZBKROr">“走什么，不给老子面子是吧！？”</p><p data-pid="0zkSWX-L">又有人在我肩上推了一把：“装什么？你这骚样要真有男朋友，他能让你一个人？”</p><p data-pid="2C8ifN89">“别碰我！”我又恶心又害怕，提高声音说，“你们再不走我报警了啊！”</p><p data-pid="LmgERKv4">他们听到这话，竟直接掀了桌子：“贱人，你报一个试试？！”</p><p data-pid="i5ayD4uy">拽着我的手更加使劲，我疼得大喊“救命”！</p><p data-pid="2wbSrFC0">但路过的人都惧怕这些混混，不敢上前。</p><p data-pid="5lng08UB">慌乱至极的时候，一辆熟悉的车在路边停下。</p><p data-pid="-BbyWqBj">我眼尖地注意到，车里的人竟是程临逸和许也韵！</p><p data-pid="R3dziD_t">我双眼一亮，连忙大喊：“程临逸！救我！”</p><p data-pid="G42RjjAD">可程临逸看了我一眼，神情一变。</p><p data-pid="adVTh-3W">下一秒，他竟然直接将车开走！就这样丢下了我……</p><p data-pid="QxNn5Ppx">我的心骤然沉到了谷底，彻骨的凉意从脚底蔓延上来！</p><p data-pid="LAs7XhKM">几个大汉爆发出一阵大笑。</p><p data-pid="alAAI7bg">“装什么清高？管一个有对象的路人叫男朋友，还不如喊我们哥几个，我们哥几个保证让你爽！”</p><p data-pid="_JrqOpka">这话像一把刀狠狠刺进我的心脏，心痛、害怕、无助一瞬间齐齐涌上来。</p><p data-pid="KrOXRZn5">连我信任的爱人都视而不见地离开，那还有谁能救我？</p><p data-pid="sgf85Ap9">就在我陷入绝望，打算挣个鱼死网破的时候。</p><p data-pid="QtFEwWaq">一个高大的身影陡然出现，把我护到了身后。</p><p data-pid="jC1t8loP">我一愣，又闻到了那股令人心安的松香。</p><p data-pid="s329XDpy">是扎西岭错！</p><p data-pid="P3Vup7-W">他光是站在我身前，那群大汉却像是看见了什么可怕的人。</p><p data-pid="_KxjFPJF">白了脸色，点头哈腰道歉：“对不起，对不起，是我们有眼不识泰山……”</p><p data-pid="Ps-NoUn8">“滚。”</p><p data-pid="tJMSFSE4">短短一个字。</p><p data-pid="3xt399lt">却让那群大汉如蒙大赦，讪笑着走了。</p><p data-pid="e6j8Gfb-">我的心里一颤，顿时好奇的抬头看他。</p><p data-pid="FpwjtA6x">那一瞬，恰好有工人搬着镜子从旁边路过。</p><p data-pid="vvMuk5vl">透过镜子，他淡漠到极致的脸一晃而过。</p><p data-pid="JGk-p25M">明明他没什么表情，我却恍然想起佛刹中的怒目金刚，杀意与佛性都体现到淋漓尽致……</p><p data-pid="KZj60bL5">突然，我对扎西岭错升起一股强烈的好奇。</p><p data-pid="cWgFmVmA">他究竟是什么身份能让混混惧怕，又是为什么，屡次替我解围？</p><p data-pid="D36GPVK4">正想着，扎西岭错已经转过身，对着我伸出手。</p><p data-pid="fhaZxEli">“钥匙。”</p><p data-pid="W0N8S-6L">我一愣：“什么？”</p><p data-pid="V_RYuAqW">下一秒，扎西岭错的话，像是春日里第一场雨，祛除了我所有的焦急和恐惧。</p><p data-pid="hfTGTLXx">他说：“剩下的路，我来开。”</p><p data-pid="d6t0OEL0">5</p><p data-pid="3_0odWun">我怔了一瞬，低头从包里翻找钥匙。</p><p data-pid="4cV03p03">比起一个人担惊受怕，我确实更倾向于和扎西岭错一起。</p><p data-pid="BmJ0Z0iX">不知道为什么，我明明才只见过他两面，却下意识信赖他说的话。</p><p data-pid="-KGllmfs">我找出钥匙，正要递给扎西岭错。</p><p data-pid="dp3cAYUB">突然，一辆警车开了过来，拦住了刚刚还没走远的几个大汉，将他们控制起来带走了。</p><p data-pid="tIT3Lb3J">“小璇！”程临逸着急忙慌地跑过来，握紧我的手，“你没事吧？”</p><p data-pid="qApvJzDD">我还没开口，就又听他劈头盖脸地训斥。</p><p data-pid="Sexuazl1">“我就跟你说了别一个人走！你看看，这就是你不懂事不听话的后果！”</p><p data-pid="nCGEiY8-">我一愣，又想起他刚刚把车开走时头也不回的样子。</p><p data-pid="0Vk9AQgV">“可就算你和我一起走，刚刚那种情况，你就会保护我吗？”</p><p data-pid="mkzSECQm">程临逸神情僵了一瞬，仿佛受了天大的冤屈。</p><p data-pid="yIPfBzZ3">“你是在怪我？可我只有一个人，就算下车也没办法打赢他们，而且我马上就去找警察了，这样还不够吗？！”</p><p data-pid="xXZAOa5Y">“我为了你的安全带着受伤的阿韵一路跟过来，你怎么这么不记好？”</p><p data-pid="0OFx0dwI">我被他说得哑口无言。</p><p data-pid="53iuWBUw">心里更像是堵了一团浸了水的棉花，有苦说不出。</p><p data-pid="PqMA5dXn">多说无益，我压下心里的涩痛：“你说的都对。”</p><p data-pid="KZlw7nir">但是我现在不想和他一起走了。</p><p data-pid="ipOKG7T1">就算我喜欢程临逸，我也不想在去见爷爷的时候。</p><p data-pid="3MvUYvkJ">一路争吵，一路怨怼。</p><p data-pid="QrCLkeYJ">我只想要好好感受西藏的魅力，想知道究竟是什么样的地方。</p><p data-pid="cpiZjadC">能让爷爷付出一生守在这里。</p><p data-pid="_Ct9LoKI">我转身看向扎西岭错，手指揪紧了衣服。</p><p data-pid="aldTz9nm">可纵使再难以启齿，也还是强逼着自己说了出来：“扎西岭错，我想走我爷爷曾经走过的路，你能……”</p><p data-pid="U5m1Y-Re">话没说完，他清冽的声音就传了过来。</p><p data-pid="vUUQWIi2">“可以。”</p><p data-pid="Gf8vEgEw">我双眼一亮，抬头就撞进扎西岭错浅如琥珀的双眸。</p><p data-pid="tt5YC8rd">对视间，一股难言的情绪在胸腔里冲撞，我对他的熟悉感也越来越强。</p><p data-pid="_6aMKA6e">可还不等我想起来这股熟悉感从哪里来。</p><p data-pid="3lsPtEMG">程临逸忽然握住我的手：“你确定你要跟这个刚认识的男人走？”</p><p data-pid="G_NvjAw4">“姜梦璇，你能不能别贱！”</p><p data-pid="IFCjiMHA">我定在那里，难以置信这话是程临逸说出来的！</p><p data-pid="wFEBIMzn">“放开我。”我挣扎着要抽出手，声音都在发颤。</p><p data-pid="rEPIZ-uN">程临逸的脸上顿时闪过懊悔，钳住我的手不断用力：“对不起……啊！”</p><p data-pid="6Ie_pblg">下一秒，他的手腕就被扎西岭错握住。</p><p data-pid="WyDPnGTW">程临逸那张俊美的脸顿时涨成猪肝色，硬生生松开了握住我的手！</p><p data-pid="vBLFSuxG">直到被扎西岭错送回酒店，我还没从刚刚的震撼场面中走出来。</p><p data-pid="8MONrY0g">我偏头，看向扎西岭错。</p><p data-pid="gNXESkbS">他还是穿着黑色连帽衫，肩上登山包的线勒住他劲瘦的腰，肩宽腿长。</p><p data-pid="SE78Rnb0">看上去只比程临逸高五公分，但从小健身的程临逸在他面前竟然手无缚鸡之力！</p><p data-pid="AZTPIlZ8">再联合到刚刚那些混混对他的态度，我更加好奇他究竟是什么身份来历。</p><p data-pid="wE1MU_QI">当晚，我洗了澡，以为自己受了惊吓，会很难入睡。</p><p data-pid="gJgUkl8a">可当在床上躺下的那刻。</p><p data-pid="R9-sW6eB">我想起的不是那群大汉，一路上的危机时刻。</p><p data-pid="E8zMSHvv">而是扎西岭错，那个神秘的藏族男人。</p><p data-pid="Og0UfhYo">甚至梦中，我都记得他像天神一样出现，救我出困境……</p><p data-pid="zMCP3gD1">那一刹，好像有什么风吹过水面，我的心里泛起一丝丝涟漪。</p><p data-pid="VuFYzuSm">半夜醒来，我忍不住拿出手机，点开他的聊天框，问：【我爷爷的骨灰就存放在县城外的寺庙里，明天是他的忌日，你想一起去看看他吗？】</p><p data-pid="Fsrb7UjQ">消息发出，我莫名有些忐忑。</p><p data-pid="FQhi05XH">但爷爷留的号码主人是他，他应该和爷爷交情匪浅，于情于理，我都该问一问。</p><p data-pid="5v4AHxDY">正想着，手机音骤然响起。</p><p data-pid="w3Tf_78W">【好。】</p><p data-pid="VudgispP">短短一个字，我却忽然有些难言的高兴。</p><p data-pid="QBRJQchD">结果就再也没睡着。</p><p data-pid="Q0sDADpj">于是六点，我就早早换了一身冲锋衣出发。</p><p data-pid="on1QrUOk">寺庙离县城七十多公里，伫立在一座山巅上，背后是常年冰封的雪山，而雪山的那一边，是另一个国度。</p><p data-pid="bEISmw2O">我开车到的时候，远远就看见扎西岭错站在台阶上。</p><p data-pid="01De804w">他今天和以往不同，身上穿了黑色的藏服，身后云雾缭绕，五彩经幡在浅草覆盖的山坡上飘扬。</p><p data-pid="vbhSk4Om">日出时夺目的金色阳光，尽数落在他的身上。</p><p data-pid="oB2-Z_vV">一眼望去，像是守护这片土地的山神！</p><p data-pid="3FJj4L_O">我下意识握紧方向旁，几次调整呼吸后才停车。</p><p data-pid="PqbP_aei">寺庙白墙红瓦神圣屹立于山巅，我打算拾阶而上。</p><p data-pid="SB27jBuZ">走到扎西岭错身旁时，却陡然滑了一下。</p><p data-pid="9wqic-2Q">剧烈的失重感传来，眼看我就要摔下阶梯！</p><p data-pid="NPqIi1ic">慌忙失措中，一双微凉有力的手紧紧握住了我的手腕。</p><p data-pid="ou0FG58u">只一瞬，我就站平稳了。</p><p data-pid="ShRYhOZZ">危机解除，可扎西岭错的手却没有松开。</p><p data-pid="wPsEAUpC">他指尖冰冷，掌心却无比温热，连带着我的心跳都仿佛处在冰火两重天。</p><p data-pid="PKZiQoBA">急促跳动，久久不曾平复。</p><p data-pid="dGey95KW">“谢谢。”</p><p data-pid="XooLQDDs">我轻声道谢，却也没有主动抽出手。</p><p data-pid="F9lLjQup">上寺庙这一路，我们都默契地没有提起这回事。</p><p data-pid="9rpozJBa">他拉着我，一路往上。</p><p data-pid="khRED_PJ">走到后面时，空气越稀薄，眼前的风景变化也越大。</p><p data-pid="vPVhynBB">无尽颜延绵的雪顶，洁白纯净到让我心境都开阔许多。</p><p data-pid="uPLN5vFE">偶尔，我能闻到扎西岭错身上传来的淡淡松香，这香闻起来宁静温和，和他身上的不羁神秘截然不同。</p><p data-pid="dQRGKK0P">配上寺庙中偶尔传来的钟声，就连路过朝圣声，都会忍不住朝他行礼！我心里对扎西岭错的好奇心更胜，一路都在想该怎么开口问。</p><p data-pid="gY3drnJr">心口难以言喻的悸动更是一下强过一下。</p><p data-pid="b6oBDL9G">犹疑间，我们到了。</p><p data-pid="JGibL2Uq">只是没想到本该借香客的寺庙却大门紧闭。</p><p data-pid="b-rOi2Gd">门口的喇嘛一脸歉意地说：“抱歉，本寺近日闭关修行，暂不对外开放。”</p><p data-pid="AtdhRxuL">6</p><p data-pid="USpzJlI-">这话像是一盆冰水从我头上狠狠淋下！</p><p data-pid="8HlHCnew">“怎么会不对外开放？”</p><p data-pid="POBoFxIy">我的语气急切，甚至有些发抖。</p><p data-pid="1CLOM-f8">往年我都是在爷爷的旧居祭拜，但这是他的第十年忌日。</p><p data-pid="BL2PK7nM">我走了一千多公里，经历了那么多，才到这里……</p><p data-pid="C7UZ3JaU">“可不可以通融一下？我家里人的骨灰供奉在里面……”我强忍着泪意和失落想求情。</p><p data-pid="UDb-sIZV">手腕上的力道骤然松了。</p><p data-pid="ELjq9K3W">身边的扎西岭错突然朝喇嘛双手合十，说了一大串我听不懂的藏语。</p><p data-pid="GxKOtPbR">喇嘛的神情瞬间变得恭敬肃穆。</p><p data-pid="NmZpDvAe">他朝我双手合十行了一礼，说：“您请跟我来。”</p><p data-pid="r3ahnBtx">事情转折太过突然，我满头雾水地回了礼。</p><p data-pid="nCtgHW76">走在寺庙长长的回廊下，我小声问身旁的男人：“扎西……”</p><p data-pid="TQohbonJ">“岭错。”扎西岭错淡声打断。</p><p data-pid="vMntefSg">明明是很简单地两个字，不知道为什么，我的脸上却有些发热。</p><p data-pid="fPK98FFJ">“岭错……你刚刚跟他说了什么？”</p><p data-pid="-MPT2H-5">他淡色的瞳孔在我脸上凝了一瞬，才说：“说了你爷爷的身份。”</p><p data-pid="wuchuv0f">明明他语气淡然与往常没有任何区别。</p><p data-pid="jcJ4Z_6p">可我却莫名觉得扎西岭错这时候是开心的……</p><p data-pid="DN_dXzSC">这时，喇嘛在一处大殿外停下：“这里就是供奉逝者骨灰的大殿。”</p><p data-pid="yaAjdAu2">我立刻撇开其他思绪，跟着进了大殿。</p><p data-pid="MyYQiJ3H">一进门，我就找到了属于我爷爷的灵位。</p><p data-pid="Ly2ryToT">上面写着“先考安公讳先民府君之灵位”的字样，旁边还刻着一列藏文。</p><p data-pid="WKjJ7jeX">恭敬的用词让我心里划过一股暖流，甚至眼里也涌上了热泪。</p><p data-pid="GXx6VkDu">“爷爷去世前，特别交代我们将他的骨灰一半留在边境线，一半留在这里。”</p><p data-pid="4VinxB5K">“他说，如果人死后真的可以在天上保佑活着的人，他更想要保佑藏区的人民……”</p><p data-pid="RTqD0GcG">喇嘛诵了声佛号，说：“安将军和阿旺将军都是真正有无量功德之人，我们不会忘记他们。”</p><p data-pid="pXQA9_8p">瞬间，我泪如雨下。</p><p data-pid="SYM-xSUi">爷爷离开十年，这片土地上还有人民记得他。</p><p data-pid="EyUgFOnw">还有阿旺将军，就是爷爷总提到的那位老战友……</p><p data-pid="Ol7ri62h">泪眼朦胧中，我看见扎西岭错双手合十、低眉敛目地诵念着经文。</p><p data-pid="TWd7YJ-u">正对着我爷爷的灵位，还有……旁边那位。</p><p data-pid="yxuSV4TT">我看着那个只有藏文的灵位，问：“我爷爷旁边那位，就是阿旺将军吗？”</p><p data-pid="fj3LcYOP">扎西岭错缓缓睁开眼睛，说：“是我的祖父。”</p><p data-pid="n16VV8_F">说着，他动作熟稔给两个牌位都燃了香。</p><p data-pid="6mBEKMu0">我顿时了然。</p><p data-pid="tH_SByc2">大概过去这些年，他来给自己的爷爷祭拜时，也都会为我的爷爷燃一炷香。</p><p data-pid="_n7F71tE">难怪，当我说拜托他陪我来找爷爷时，他答应地毫不犹豫。</p><p data-pid="f0cWUt3r">“谢谢你，岭错。”</p><p data-pid="tfBpXob6">扎西岭错定定地看了我片刻，敛了下眸，就算应答。</p><p data-pid="xVspGiu9">他陪着我和爷爷说了一会儿话。</p><p data-pid="AZQbSil6">又带着我去主殿拜了佛。</p><p data-pid="Qi6QdIBe">看着庄严宝象的佛祖，周围信徒不断诵经，为逝去或者往生的人祈福。</p><p data-pid="bf5pP3h2">第一次，我感受到了信仰的力量。</p><p data-pid="-otX5wkg">它把一群素不相识的人团结在一起，为了陌生人去祈祷去付出……</p><p data-pid="blF8C-gr">扎西岭错又带我绕着寺院的转经道走过一圈。</p><p data-pid="6i0MFikk">白墙红瓦的寺，纯净如水的云和蓝天，清冽神秘的雪顶……</p><p data-pid="jwCmU0IM">我只看着，都觉得心都被净化了。</p><p data-pid="xcdQwB3y">万千烦恼都不过转瞬之间。</p><p data-pid="RHXb_VLs">这时，寺庙转角处传来交谈声。</p><p data-pid="U4fQLFpM">是一个在情场中失意的女子，在问喇嘛：“情之一字，何为缘起缘灭，为什么别人总能放下执念……”</p><p data-pid="TfQwZQZN">喇嘛的掌心贴在一起，说：“世间情爱千万种，放不下未必就是爱。”</p><p data-pid="2jSwX4f3">这话像是一记闷钟，敲得我的心口狠震了瞬。</p><p data-pid="nPVmBOs_">我猛然想起我和程临逸。</p><p data-pid="RTAoXBRu">从我成年开始，家里就在商量和程家的婚事。</p><p data-pid="ZmP8HKNc">我很早就把他当成了我未来的另一半，所以对他穷追猛打，不敢想自己会失去他。</p><p data-pid="hxycXc0Y">但这真的是爱吗？</p><p data-pid="rd4uIWhd">想到这里，我脑子里莫名想到另一张脸。</p><p data-pid="41eNdWTa">心跳又开始急促起来。</p><p data-pid="H9jfJnIA">我下意识寻找他的身影，却陡然对上他的目光。</p><p data-pid="vUqbE6c-">扎西岭错站在前方不远处的回廊中，正在回头看我。</p><p data-pid="S_qSTz8e">四目相对。</p><p data-pid="f_3XSh2U">我脑子里忽然出现一句话。</p><p data-pid="7GZbGhfm">你在桥上看风景，看风景的人在看你……</p><p data-pid="pU9q8bdJ">扎西岭错的眼神一片澄澈，可我却慌乱的收回视线，准备下山。</p><p data-pid="ayEDuHaD">走出寺庙时，喇嘛快步出来叫住了我。</p><p data-pid="dlJAxA9N">“这是安将军存放在寺院里的信物，他曾特别交代，要交到你的手上。”</p><p data-pid="tWQ1BNcK">他说着，将一个小盒子递给了我。</p><p data-pid="YHTGbW53">里面静静躺着两只小铜铃，和一封信。</p><p data-pid="fPEjbysT">我展开信，看着上面熟悉的遒劲字迹，眼泪顿时掉了下来。</p><p data-pid="fTC6LZFo">“小璇乖孙女，等你来这里看爷爷的时候，肯定已经长成了大姑娘，和程家那小子，也该走到一起了吧？”</p><p data-pid="IvsxNL_w">“爷爷虽然视力不行了，但眼力还在。这铃铛留给你们一人一只，就算没走到一起，你们也要好好的，互相扶持——望乖孙女幸福。”</p><p data-pid="7TEkE82L">爷爷一生守卫边境，所有的爱都留给了这片土地和我。</p><p data-pid="C2w0bxu4">而我却连曾经答应他的，会把爱人带来给他看看都做不到……</p><p data-pid="ZJOkatMz">我拿着信物，心口酸软涩疼。</p><p data-pid="W4a6sIqW">一时之间竟然不知道该怎么做，或者我确实应该好好和程临逸谈谈。</p><p data-pid="1LLjIQOv">可在我没有注意到的地方，身旁的扎西岭错定定地看着那对铃铛，许久才移开目光。</p><p data-pid="_tKT_tJZ">一小时后，我下到半山腰。</p><p data-pid="eAVGxmA5">就见程临逸和许也韵不知什么时候跟了上来，正背对着我拉扯在一起。</p><p data-pid="GB5X8CNu">程临逸的语气中满是无奈：“阿韵，我的心意你还不清楚吗？要不是为了看你吃醋，我怎么会和姜梦璇在一起？”</p><p data-pid="StS88eAA">我脚步一顿，浑身血液倒流。</p><p data-pid="JkaPRPzo">难怪，我喜欢程临逸这么多年，他一直视而不见，上个月却忽然说要和我在一起。</p><p data-pid="lnhGz2BB">我以为是守得云开见月明，原来却是被拿去当刺激许也韵的工具……</p><p data-pid="Yqdbb7Ok">亏我刚刚还想好好和他谈谈，真是可悲又可笑！</p><p data-pid="5LI21jKQ">这时，程临逸似有所感回过头，看见我眼神一变：“小璇，你们这么快……”</p><p data-pid="IgGLXlh3">他话没说完，目光又凝在我手里的盒子上。</p><p data-pid="ftrjoeoW">下一刻，大步上前来，急切地说：“这是不是你在寺庙里求到的？能不能送给阿韵？”</p><p data-pid="2_MKznO0">我质问的话瞬间哽在喉咙，难以置信：“……你说什么？”</p><p data-pid="dKOuns1g">程临逸轻描淡写：“我们上来就是找你说这事的，你就当帮阿韵祈福了，她最近真的很倒霉，反正你命已经够好了，不需要这个……”</p><p data-pid="w3DDO820">一句一句，像是在嘲笑我这些年的爱慕和付出。</p><p data-pid="ROkvMgwJ">心口绞痛难以言喻。</p><p data-pid="vpyn6zHG">我忍无可忍，抬手狠狠扇了他一耳光！</p><p data-pid="USMNZbqi">随着耳光声落下的，还有我心死至极的一句。</p><p data-pid="VaR_Q7cX">“程临逸，分手吧。”</p><p data-pid="084uOP51">7</p><p data-pid="Yx1kFY_a">一时间，山坡上只有细细的风声。</p><p data-pid="RtPZgAxg">7</p><p data-pid="FrVEDUsV">程临逸呆滞了好几秒，才回过神来：“你说什么？！”</p><p data-pid="M_SZWM2w">我攥紧盒子，坚定地重复了一遍：“我说，我们分手。”</p><p data-pid="PqWbPUPo">即使我尽量保持平静，但尾音还是因为哽咽而颤抖，抱着盒子的指节发白。</p><p data-pid="ujboShwd">程临逸气极了：“为什么？就因为这个盒子？”</p><p data-pid="u4j5zCDR">他又瞪向我身旁的扎西岭错：“还是因为你心里有了别人？！这个来历不明的野男人有什么……”</p><p data-pid="DZMtj1F0">“够了！”</p><p data-pid="nl_nFuJQ">我怒然打断他：“和他没有任何关系，我和你分手纯粹是因为你是一个烂人！”</p><p data-pid="1qOR_7fJ">程临逸可以倒打一耙，说我任性、说我做，我都能忍了。</p><p data-pid="2XEm8E1J">但扎西岭错……</p><p data-pid="dlZ8OH9N">我绝不允许程临逸往他身上泼任何脏水！</p><p data-pid="ePNq2rZb">“反正你和我在一起，只是为了刺激许也韵，现在我成全你们，你该感到高兴！”</p><p data-pid="qZhnlD_A">“那又怎么样？”</p><p data-pid="j5ETYS6A">程临逸反问我，“我就算喜欢也不会娶她，我要娶的人只会是你！”</p><p data-pid="z3TYuwNE">我被他恶心得不轻，当即绕过他就要下山。</p><p data-pid="hnHJQG-w">程临逸又想来拉我，却被许也韵拽住：“你什么意思？不会娶我？你……”</p><p data-pid="F8krq8pE">争执声渐渐远去。</p><p data-pid="2zHPdExi">我捧着爷爷留的盒子走在山道上，脑海中闪过这么多年的种种。</p><p data-pid="KGG5N3Bm">其实程临逸以前不是这样的。</p><p data-pid="ch3XIGUj">小时候爷爷去世时，他会紧紧抱着我说：“小璇别怕，你还有我，我会是你最坚实的后盾！”</p><p data-pid="6Eqpz-Pp">我闯祸时，也是程临逸把我护在身后：“小璇，我罩你，我永远保护你。”</p><p data-pid="ZofRZN27">可不知道从什么时候开始。</p><p data-pid="HcLCIMXq">他就变了……</p><p data-pid="MekJTNQh">好在，我醒得也不算晚。</p><p data-pid="SuaKUmWS">以后做邻居也好，点头之交也行，我再也不会和程临逸做恋人了。</p><p data-pid="I5MzMnch">忧虑散去的那一刻，我听见身后跟着一道沉沉脚步声。</p><p data-pid="Lzh2Z9lU">一声一声，沉稳冷静。</p><p data-pid="-lWpowm3">我不用回头，就知道是扎西岭错。</p><p data-pid="NcvYVnoL">他没有安慰我，也没有嘲笑我。</p><p data-pid="xldAuH_n">只是用那双清澈如溪般的眼神看着我，问：“去哪。”</p><p data-pid="cIP7CPlX">我想了想，强行按下心口翻腾地情绪说：“我本来想最后一站去边境线看看，但是……”</p><p data-pid="gC-pv8QK">“好。”</p><p data-pid="NO1PP0t8">扎西岭错直接拉开车门。</p><p data-pid="zH6F0TuN">或许是他答应的过于坚定轻松，我也好像甩掉了所有的忧愁顾虑跟他上车。</p><p data-pid="y6eEEBXz">就这样，我们甩开了程临逸重新上路，向着边境线出发。</p><p data-pid="7x40ZKYy">五个小时后，边境小镇。</p><p data-pid="5xFiJCt9">住下后，我打算出门逛逛。</p><p data-pid="I47nXqDq">不想刚走到高山牧场，就看见扎西岭错穿着青色藏袍在驭马。</p><p data-pid="6AOm_P8k">他骑着黑色野性难驯的高大骏马，在草原上漫步。</p><p data-pid="7pWNi338">绿色的草，白色连绵不绝的雪山，一碧如洗的天，都在他身旁背后。</p><p data-pid="kTc44SZP">但我的眼里只有他，仿佛天地间只有他是唯一的亮色。</p><p data-pid="Mrr__TRA">出神间，一阵清脆铃铛声渐行渐近。</p><p data-pid="DFz6aL6g">我看着他驭马走来，缓缓伸出手。</p><p data-pid="Khrp4FQX">鬼使神差地，我握住了他的手。</p><p data-pid="ltB1tQhu">倏然，失重感传来，再回过神来时，我已经稳稳坐在马背上。</p><p data-pid="PKRh7LIV">眼前的景像骤然开阔，身后坚硬的胸膛里传来强有力的心跳，熟悉的松香裹住我。</p><p data-pid="_04WkRCH">我的心骤然紧缩在一起。</p><p data-pid="wmv3HzUp">太近了……</p><p data-pid="P8U8wDP7">近到我甚至能听见他的心跳呼吸。</p><p data-pid="ROR7xeci">正当我想往前挪一挪时，扎西岭错的声音从背后传来：“握紧马鞍。”</p><p data-pid="I-SOI9LT">我心一紧，赶忙死死抓紧马鞍。</p><p data-pid="y6PWVWzM">下一秒，他的手从后背环绕而来，几乎将我圈进怀里。</p><p data-pid="oYQOAK5r">我耳根一热，正想说点什么。</p><p data-pid="I9koGoSI">扎西岭错就踢了马肚。</p><p data-pid="lIPVmt5b">黑马当即嘶鸣一声，如离铉的箭般冲了出去！</p><p data-pid="8VNinxCu">我一惊，没说出口的话又咽了回去。</p><p data-pid="igilgfOb">缓过这口气来之后，才感受到草原上的疾风刮在脸上。</p><p data-pid="H6WqKEpO">面前是无尽的草原，远阔的蓝天。</p><p data-pid="EArhqPRn">烦恼好像瞬间就散了。</p><p data-pid="39Lx5Q9x">胸腔里奔腾汹涌而出的，只有自由！</p><p data-pid="DrX8w7Hb">后来，他还带我在草原上摸了牦牛，看小羊在绿地上奔腾。</p><p data-pid="Qmj8Y3TZ">第一次，我感受到生命的热烈，大自然的鬼斧神工。</p><p data-pid="RRO5UDV2">第一次，我感受到生命的热烈，大自然的鬼斧神工。</p><p data-pid="LbBWk4YF">一切的一切，都好像脱离了俗世的烦恼忧思。</p><p data-pid="N1JgoccG">我想，如果人世间有净土，那一定会是西藏。</p><p data-pid="JcDRNnf9">如果世界上真的有神——</p><p data-pid="mKb1bR7-">那一定是扎西岭错。</p><p data-pid="Zhj1uTDd">……</p><p data-pid="MXb0mW3t">一直到夕阳西下，我和岭错才回到小镇上。</p><p data-pid="Deu3JF7b">正好又遇上热情的藏民在办篝火晚会，邀请我们一起参加。</p><p data-pid="G6w15e-J">我们在院子外搭起篝火，围着火喝酒。</p><p data-pid="vF3ExmGC">酒精上头之后，话也就变多了。</p><p data-pid="jUjKxIA9">我看着面前明亮的火焰，一边喝酒，一边说起我和程临逸的过去。</p><p data-pid="Kmzu7jcT">扎西岭错身边放着藏泉酒，静静坐着听我倾诉。</p><p data-pid="QqugeB_e">我已经有些醉了，看不清他眼神里的幽深，也看不见他眼里跳跃的火苗。</p><p data-pid="N5TMqX46">说了许多之后，我看向他，问：“是不是世界上所有人，都长了一颗容易改变的心？”</p><p data-pid="gFGGXu5Q">他扭过头，定定地看我片刻，才说：“不是。”</p><p data-pid="ygS0ox2C">“很多人一件事就做了一辈子，就像你爷爷和我的祖父，他们穷极一生守在边境线上，守卫国土的心从未变过。”</p><p data-pid="m8BAGH_O">他清冷的声音如冬日清泉般淌过我的心。</p><p data-pid="4H01xypX">所有的困惑瞬间散去，只剩清明。</p><p data-pid="IVVSd5sH">这也是第一次，我听他说那么多话。</p><p data-pid="z49TLIOR">我拿着酒撑起身，朝他走去：“你说的对，让我们为永垂不朽的英雄而干杯……”</p><p data-pid="8Q0JZuX-">话没说完，我脚下一个不稳，就直直朝他跌了下去！</p><p data-pid="K9WIiDl-">一阵天旋地转后。</p><p data-pid="gZ95PJs7">我竟将他扑倒在地，发丝扫过他的脸颊，鼻尖几乎碰到了一起。</p><p data-pid="9PiwyzQC">火光明灭，鼻息交融，我看着近在咫尺的一双幽潭般的眼，一时怔住了。</p><p data-pid="ciQQJXEf">大概宇宙在他身上单独过吸引力法则。</p><p data-pid="uuMba-8e">我心里陡然冒出一个危险至极的想法，想再靠他近一些……</p><p data-pid="vjNTJhaj">“你醉了。”扎西岭错扶住我的肩膀，声音很低，双眼却明如星辰。</p><p data-pid="YxYPlSNg">我猛然回神，酒意瞬间醒了大半。</p><p data-pid="WVwktuxy">他那样皎皎如明月一般的人，不该被我这样随意对待。</p><p data-pid="Qph1Er5e">“抱歉……”</p><p data-pid="6vQJuT7V">我慌张地挣扎着爬起身。</p><p data-pid="NEi0UsMh">混乱间，他的衣服里掉出一张照片。</p><p data-pid="oP7crNFB">“你的照片掉了……”我一边说，一边捡起下意识看了一眼，顿时愣住。</p><p data-pid="vkeWhqbH">照片上，两个年过半百的军人各抱着一个孩子。</p><p data-pid="PHY1NnQf">左边的军人，正是将我抱在怀里、笑得眯起眼的爷爷。</p><p data-pid="2hIpk5tt">而更让我惊讶的是，照片下方写着一句——</p><p data-pid="FhR2t5QI">“小璇、岭错，此定娃娃亲，今2001年1月24日留影为念。”</p><p data-pid="1GWpFXSO">8</p><p data-pid="162nVAwT">我的目光定在了“娃娃亲”三个字上。</p><p data-pid="-Ycp7jry">连我自己都没发觉，我的心跳在持续失控，藏着我没有觉察的欣喜。</p><p data-pid="4TGDAsdC">甚至连声音都在发颤：“我们……定过娃娃亲吗？”</p><p data-pid="uUZ5dwuX">扎西岭错却定定看着我，没有说话。</p><p data-pid="led7yKbI">往常，他那双纯澈如鹿般的眼神，此刻却像是染上了浓墨。</p><p data-pid="F65IVFxS">让我看不清，猜不透……</p><p data-pid="klp8SQe0">这时，草原上的冷风吹来。</p><p data-pid="UMpdp3TZ">我陡然打了个颤，冷静下来。</p><p data-pid="LPUe0TV2">或者……扎西岭错是不是在觉得，我会用这个借口缠上他。</p><p data-pid="UK3A8cs1">他会不会觉得，我是个很随意的人。</p><p data-pid="Rvy8pECg">瞬间，我的心沉入谷底，慌张把照片递还给他：“这应该是开玩笑的吧？我从没听爷爷提起过……”</p><p data-pid="wV3OEdrP">说这话时，喉间舌根是我自己都没发觉的苦涩。</p><p data-pid="nidhUCpK">他眼里的情绪也骤然变了，莫名沉了下去。</p><p data-pid="Y2mR21CZ">我心里一慌，话音顿时堵在喉头。</p><p data-pid="juvWJfhV">他很快垂下眸，站起身接过照片，语气淡淡地说：“该休息了。”</p><p data-pid="83sA8bJS">我黯然看着他的背影，站了一会儿也只能进屋。</p><p data-pid="wFFCTEXn">可躺在床上之后，巨大的失落感传来。</p><p data-pid="uFrxAsbm">竟然会是一夜心跳难平，辗转反侧。</p><p data-pid="GSH4_KU9">翌日，我顶着黑眼圈换上登山设备，朝边境线去。</p><p data-pid="KkZT9HLh">在路上，我们遇到了一队正在巡逻的战士，和一只热情扑过来的小黑狗。</p><p data-pid="E-Tx-avw">战士们将小黑狗拉到一边，态度熟稔地朝扎西岭错敬了个军礼：“首长好！”</p><p data-pid="5GnshzWL">首长？</p><p data-pid="52qWBxJH">我只知道扎西岭错的身份不一般，只没想到，竟然也是军官？</p><p data-pid="tJELZ5Dn">扎西岭错淡然颔首：“这是安司令的孙女，我带她去祭拜。”</p><p data-pid="BZtGJfAJ">瞬间，连长看向我的眼神肃然起铝驺敬：“既然这样，我们就一起去吧！”</p><p data-pid="quGDLi0L">他们要巡逻，我和扎西岭错也跟着走过一段巡逻的路。</p><p data-pid="wlxxBXSp">边境线其实很普通，但当我走过溪流上的独木桥、爬过断崖的藤梯，踏过雪白的冰原，看见另一边截然不同的国家时。</p><p data-pid="0zzNc70q">脚下崎岖难行，冰冻冷硬的路，忽然都算不上什么了。</p><p data-pid="4Jd2pbN-">我的心炽热滚烫，仿佛接受了一场全新的洗礼。</p><p data-pid="JyFdbOK6">也瞬间明白了，爷爷为什么会留在这里一辈子。</p><p data-pid="TtzWBX3g">缓缓前行间，我在边境线附近的一处高地上看见了爷爷的墓碑。</p><p data-pid="PS0zpXUl">在这样寒冷的地方，墓碑上却干干净净，竟然没有一片雪。</p><p data-pid="wTWiSYqC">连长说：“我们每天经过，都会给老司令擦擦墓碑，有时候还会看到有群众过来。”</p><p data-pid="SsHqpLN7">这里很冷，但我心的暖意却冲向四肢百骸。</p><p data-pid="aFSRQ5-7">连带着眼眶都泛酸。</p><p data-pid="ECyIZfAw">我看向扎西岭错，问：“我们都已经到这里了，我想去看看界碑。”</p><p data-pid="Yb4qkyla">扎西岭错闻言，转过头，看向身后广袤的雪山冰原，说：“没有界碑。”</p><p data-pid="oOlUqqVw">我一怔。</p><p data-pid="b_qs4jE8">就又听他说：“用脚丈量国土，每个人都是伟大祖国的坐标，都有守卫国土的义务和责任。”</p><p data-pid="jEqR7rw_">他身后，所有的战士齐齐应声。</p><p data-pid="gp9mam5f">“我们就是界碑！”</p><p data-pid="L50wzDkw">这一瞬，我心里的暖意和敬仰已经无法忍耐。</p><p data-pid="0kpzYdmI">眼泪夺眶而出：“你们是最值得尊敬的人！”</p><p data-pid="Rndr5moV">我坐在爷爷的墓碑前，跟他说我这一路的所见所闻。</p><p data-pid="zYspRl3b">“爷爷，我明白了你的信仰，也会在这段旅途后，找到我自己的信仰。”</p><p data-pid="HfgEKOA7">“你的精神会永远传递……”</p><p data-pid="3K3fYpCz">这时，风吹动藏民们挂起的彩幡，传来一整整声响。</p><p data-pid="ldrVOwef">仿佛是爷爷对我的回应……</p><p data-pid="Pe-G7Hn4">这时，还有藏民为我撒出了龙达，告诉我，这些彩色龙达会为我带来好运。</p><p data-pid="uIRJytx1">边境的所有战士，所有藏民，都为我送上了美好的祝愿。</p><p data-pid="ngsIfZl8">临走之前，战士们又热情招待了我。</p><p data-pid="rfzU4h5M">拿出了他们好久才吃一次的自热火锅，说起我爷爷和阿旺爷爷的趣事。</p><p data-pid="CaDMqKGQ">他意味深长的目光在我和扎西岭错身上打量：“我听说两位老将军当时曾开玩笑，给他们的孙子孙女定了娃娃亲来着……”</p><p data-pid="EDNlBHwr">“而且我们一直都知道，首长有个在北京的未婚妻。”</p><p data-pid="hQrLBtNW">其他战士们看热闹不嫌事大地附和起来。</p><p data-pid="TXun3np4">我脸上一阵发热，悄悄看向扎西岭错。</p><p data-pid="rihQD438">却不料，直接对上了他那双深邃的眼眸。</p><p data-pid="jWCtgbE0">沉沉眸色中，我不知道他在想什么。</p><p data-pid="ePIeJ507">只是这一刻，身后的彩旗雪山，成群的牛羊绿草都沦为这个男人的陪衬。</p><p data-pid="PJot4tzw">我的心跳顿时失了频率。</p><p data-pid="6jJmYc39">一下接一下砸在耳边，擂红了双颊……</p><p data-pid="RatLA3wB">离开的时候已经是下午了。</p><p data-pid="b4-jsSys">刚走到一处草坡，就接到了我妈打来的电话：“小璇，你和临逸闹分手了？”</p><p data-pid="SujV-c-t">我的心一沉，却还是打算说清楚：“是，我想清楚了，以前我对他更多的是依赖和习惯，不是喜欢……”</p><p data-pid="cBVicqXt">可我妈不耐烦地打断：“我没空听你说什么喜欢不喜欢，你在外面野够了就尽快回来订婚，这事由不得你！”</p><p data-pid="KU19S2aL">“妈……”</p><p data-pid="ayQMnTuB">刚开口，她就直接挂断了电话。</p><p data-pid="1HaeaRn5">我看着熄灭的手机屏，心头仿佛笼罩了一层愁云。</p><p data-pid="oNotE_jG">“姜梦璇。”身后的男人忽然低声唤道。</p><p data-pid="a7beWuRZ">我第一次听见他喊我的名字。</p><p data-pid="2CegeMDW">顷刻间，这名字好像突然就具象化了起来。</p><p data-pid="ldtvoOHx">我的眼前仿佛真的出现了夏日的涓涓溪流。</p><p data-pid="opd3ho5W">以至于怔了瞬才反应过来，收起手机回头。</p><p data-pid="Q0I1pkLS">恰好看见眼前的男人迎着暮光站得挺拔，一双墨瞳在夕阳照耀下仿若剔透的琥珀。</p><p data-pid="_xWPfZvg">而他身后是遥远的神山，原本一片洁白的雪山之巅此时覆上大片金色。</p><p data-pid="IJWsot-E">仿佛神明降临世间，耀眼而肃穆。</p><p data-pid="heQI8ob-">原来这就是……日照金山。</p><p data-pid="PtEpyDQU">而扎西岭错，或许是神赐予世间的礼物……</p><p data-pid="KfYeKEil">熟悉的悸动又一次在心头浮现。</p><p data-pid="Ssx5QY18">鬼使神差，我突然问了一个连我自己都没想到的问题：“如果我回去，就要和程临逸订婚……你会怎么样？”</p><p data-pid="Jssk8vBk">问完我就后悔了。</p><p data-pid="f5pK6dz-">他会怎么看我，我是不是太冒昧。</p><p data-pid="SCL7EnbR">毕竟我们才见过几面，认识几天。</p><p data-pid="NjV6JMLy">但纵使是这样，我也仍旧迫切地想要知道他的答案。</p><p data-pid="gPwLbLp8">可扎西岭错那双如蓝天般澄澈的眼睛只是静静地看着我。</p><p data-pid="yPVlRFQm">等日照金山那抹光真正将他全部笼罩的时候，我听见他的声音被冷风裹挟而来。</p><p data-pid="f8wK2UYh">“恭喜。”</p><p data-pid="-YTFDUQT">9</p><p data-pid="U22DcgmF">巨大的失落和涩意从心底蔓延上来。</p><p data-pid="S1J4VkTf">像是烟火炸掉后，那见过最美瞬间的无尽惆怅和遗憾。</p><p data-pid="bajKWiX5">我垂下头，强扯出一个难看的笑：“……谢谢。”</p><p data-pid="xCI7DjHp">然后不断在在心里告诉自己。</p><p data-pid="vTOVxVdS">我们本来就是萍水相逢……</p><p data-pid="Nq-N47ZB">他看向远处的日照金山，默了瞬，说：“你可以向神山许愿。”</p><p data-pid="NsT_IELs">我顺着他的视线看过去。</p><p data-pid="eIobXUqm">强行按下心口疼痛，双手合十闭上了眼。</p><p data-pid="3TMwsTir">脑海中闪过这些日子发生的种种，最后的画面定格在扎西岭错的脸上。</p><p data-pid="3_N_xBHY">我在心里默默许愿：“我想和爱的人在一起，而不是做家族的联姻工具。”</p><p data-pid="t5Cjd_Pi">睁开眼后，就对上了一双干净到没有任何杂质的眼眸。</p><p data-pid="cIEdTR3r">扎西岭错依旧站在神山前，静静地看着我。</p><p data-pid="gE4W55OQ">我没有移开目光，也不想移开。</p><p data-pid="WjluZGJG">这一次，就这一次，我想要将这一幕烙印在脑海。</p><p data-pid="FitH6k3n">这份悸动和眼前的美景一样，我带不走，那就让它永远留在神山下吧……</p><p data-pid="S9An1voK">返程的路上，我们都很沉默。</p><p data-pid="RVkckInM">我的手机却不停地弹着新消息，都是程临逸发来的。</p><p data-pid="X6wwSem7">【小璇，伯母跟你说了吧？我在拉萨的机场等你一起回京。】</p><p data-pid="h51g59VI">【抱歉小璇，阿韵身体不舒服，我得带她先走了，在北京等你。】</p><p data-pid="1KwnpkTL">【你别生气，我保证一回去就跟她断了，以后我心里只有你！】</p><p data-pid="GZqXtx7q">我看着这些信息，心口像是堵了一团火，烦闷到极点。</p><p data-pid="qANqRXix">我早已经不在乎程临逸跟谁一起，只是他越解释，我越觉得当初看错了人！</p><p data-pid="h8EesO7L">车辆进入市区。</p><p data-pid="3hvyTuD5">离机场越近，我越能确定，我不想和程临逸订婚！</p><p data-pid="Swa6whyo">我摇下车窗，近乎贪婪地感受着西藏的阳光和风，目不转睛得看着草原上成群的牦牛和羊群。</p><p data-pid="gvqCmN2X">只有这种时候，我才能感觉到自己是自由的。</p><p data-pid="TCaPPucN">直到下车前，我才扭头看向扎西岭错，扯起嘴角笑了笑，说：“那张合照……可以让我用手机拍下来吗？”</p><p data-pid="RK1OBs3S">我想留下一张他的照片。</p><p data-pid="lvx2ItU3">然而，扎西岭错却直接将照片递给我，语气淡淡说：“不准丢。”</p><p data-pid="icMr-KyM">“不会的。”</p><p data-pid="nZXZ5qyN">我的目光一寸寸扫过照片，小心翼翼地把它和爷爷的照片收在一起。</p><p data-pid="0ry9G0We">不知道是出于什么感情，我把爷爷留下的铃铛，分了一只给扎西岭错。</p><p data-pid="pLgvjF3l">递出去的这一刻，我甚至不敢看他的眼睛：“你帮我这么多，这是我送给你的谢礼……”</p><p data-pid="sDaPlTBZ">直到他收下，我的心才落回胸腔。</p><p data-pid="qdpyZJjn">纵使我再怎么舍不得西藏，却还是要回北京。</p><p data-pid="y2QZMHW3">只是心里的惆怅苦涩怎么也压不住。</p><p data-pid="XpzKcyKO">就像是离开了净土又重新回到凡尘的俗世中。</p><p data-pid="rW0jiNLa">以至于在飞机上，我一直在看扎西给我那张照片。</p><p data-pid="dvnroftZ">照片上的他小脸蛋很圆，表情却很冷，精致的五官和他现在几乎是等比例放大。</p><p data-pid="EW-Au0nj">想起他说的那句“不准丢”，我的心又开始悸动。</p><p data-pid="hrkDmpsA">恍然间，我的脑子里忽然冒出一段埋藏已久的记忆。</p><p data-pid="IYAD4mDY">小时候，我跟着爷爷在藏区就和扎西岭错认识。</p><p data-pid="Ppa9Ij_C">离开藏区，回北京的时候。</p><p data-pid="i_OA531z">我甚至还对他承诺过:“以后我每年都会来这里看你，等我们都长大了，我们就结婚。”</p><p data-pid="9LCgBZFy">所以，扎西岭错才会郑重的告诉我，他会一直一直在边境等我。</p><p data-pid="ZFT4ntAa">这么多年，一直是我失约……</p><p data-pid="Rpxerpj0">心像是被什么东西狠狠捏住，酸辣苦涩一齐涌上。</p><p data-pid="CXTuMoDN">我怅然到喉间都哽住，好久好久才回过神来要收起照片。</p><p data-pid="zsGJPYib">却瞥到下面写的那行“娃娃亲”的字，心里忽然有了想法……</p><p data-pid="F-RkX7UK">回到家。</p><p data-pid="h-mP94Wd">刚进家门，程临逸和程家父母齐齐坐在客厅沙发上。</p><p data-pid="yvm1E5n2">见我回来，程临逸连忙上前来：“小璇，你没生我的气吧？我知道错了……”</p><p data-pid="OWL3YfDa">我后退一步，避开了他伸过来的手。</p><p data-pid="J-J3ThmF">“姜梦璇！你……”我妈直接沉下脸站了起来。</p><p data-pid="SDvqx6Lq">我赶在她出言教训我之前开口：“妈，我不能和程临逸订婚。”</p><p data-pid="f0a2OEiT">说着，我直接将那张合照拿出来，放到我爸妈面前。</p><p data-pid="phY1T6ii">“因为当年爷爷给我定了娃娃亲，我已经有婚约了！”</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 4814,
        favorite_count: 22,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3493135023}',
      attached_info: "CuYECNnhqva8xN6hnQEQBBoJNjY1MTg4MDYyIJve87EGKDMwBUAaSigKE1RTX1NPVVJDRV9GRUVEUkVfVjcSATAYACAAOgp7InJhdyI6IiJ9WgkxMDcyOTY3MzdiIGE2MzNkY2M3MjNhZWUyNTJiZTc1NTY3YjRjZGY4ODg2cgozNDkzMTM1MDIzigEJNjUyNTg2NDA1qgEJcmVjb21tZW5kwgEgMjI3ZmZmODM3ZWFlOTIyOTI1N2MxYmE0YjlmMGI0OTDyAQoIDBIGTm9ybWFs8gEoCAoSJDM2Yzc1NzFkLWUxODctNDg1NS1hZWI1LWE3OGU1NTk0YTUyM/IBBQgLEgE1ggIAiALq9abu+jGSAiAyMjdmZmY4MzdlYWU5MjI5MjU3YzFiYTRiOWYwYjQ5MJoCAMoCFEZpcnN0QnJ1c2hXZWlnaHRSdWxl2gITVFNfU09VUkNFX0ZFRURSRV9WN+gCA/oCC05PUk1BTF9GTE9XigMgZjE4OTUwMjZiYzI4NDU4NDhkYWY1YjE1ZmMwMjU2OTeaAw0KAnYwEAAaBW90aGVyqAPOJdgDAOoDCWZlZWRyZV92N/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEzoAQAqAQAsAQAugQGbWFudWFswgQDMTcwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAABA43zFP4EFAAAAAAAAAACJBRbx5XLGPq0/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQSSAiUKCTY2NTE4ODA2MhIKMzQ5MzEzNTAyMxgEIgpJTUFHRV9URVhU",
      action_card: false
    }, {
      id: "27_1716607630.811",
      type: "feed",
      offset: 27,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 2948516354,
        type: "answer",
        url: "https://api.zhihu.com/answers/2948516354",
        author: {
          id: "0b60ade560bd4f4935b6592b87c91788",
          url: "https://api.zhihu.com/people/0b60ade560bd4f4935b6592b87c91788",
          user_type: "people",
          url_token: "cheng-xu-zhong",
          name: "程虚中",
          headline: "",
          avatar_url: "https://pic1.zhimg.com/50/7ee6d00b3d9e8d7c8f8b1f12cfb89bf8_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 2141,
          is_following: false,
          is_followed: false
        },
        created_time: 1679480637,
        updated_time: 1679480637,
        voteup_count: 104198,
        thanks_count: 23929,
        comment_count: 875,
        is_copyable: false,
        question: {
          id: 351292633,
          type: "question",
          url: "https://api.zhihu.com/questions/351292633",
          author: {
            id: "",
            url: "",
            user_type: "people",
            url_token: "",
            name: "匿名用户",
            headline: "",
            avatar_url: "https://pic1.zhimg.com/v2-d41c2ceaed8f51999522f903672a521f_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "一个女人能装到什么程度？",
          created: 1571375713,
          answer_count: 0,
          follower_count: 0,
          comment_count: 4,
          bound_topic_ids: [2057],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "高中老师。 高考当天她穿着旗袍高跟送我们，下楼梯的时候一屁股坐地上了，她蹦起来说没事没事别怕啊，我就是今天太高兴了，你们东西带了没挨个再给我看一眼？ 一个个看完了，挨个嘱咐过了，把人送进考场，我们出来的时候她还在外面站着，翘首以盼，笑容满面，挨个抱抱我们叫我们赶快去吃饭休息好考下一场。 后来才知道，那一跤不轻，她奔五十的人摔一个屁股墩，脚踝当场就肿了，膝盖也受了伤，回家就下不来床了。 怕我们分心担心…",
        excerpt_new: "高中老师。 高考当天她穿着旗袍高跟送我们，下楼梯的时候一屁股坐地上了，她蹦起来说没事没事别怕啊，我就是今天太高兴了，你们东西带了没挨个再给我看一眼？ 一个个看完了，挨个嘱咐过了，把人送进考场，我们出来的时候她还在外面站着，翘首以盼，笑容满面，挨个抱抱我们叫我们赶快去吃饭休息好考下一场。 后来才知道，那一跤不轻，她奔五十的人摔一个屁股墩，脚踝当场就肿了，膝盖也受了伤，回家就下不来床了。 怕我们分心担心…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "disallowed",
        content: '<p data-pid="fZ5gUILe">高中老师。</p><p data-pid="2BIg_m1T">高考当天她穿着旗袍高跟送我们，下楼梯的时候一屁股坐地上了，她蹦起来说没事没事别怕啊，我就是今天太高兴了，你们东西带了没挨个再给我看一眼？</p><p data-pid="V7YLm8Ux">一个个看完了，挨个嘱咐过了，把人送进考场，我们出来的时候她还在外面站着，翘首以盼，笑容满面，挨个抱抱我们叫我们赶快去吃饭休息好考下一场。</p><p data-pid="CoDed0Xy">后来才知道，那一跤不轻，她奔五十的人摔一个屁股墩，脚踝当场就肿了，膝盖也受了伤，回家就下不来床了。</p><p data-pid="pmNeOIMz">怕我们分心担心，一路装到最后。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 5078786,
        favorite_count: 4753,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 2948516354}',
      attached_info: "CvsFCNnhqva8xN6hnQEQBBoJNTY2MTc3ODY0IL2u66AGKIauBjDrBkAbSmMKHFRTX1NPVVJDRV9IT1RfQ1JPU1NfUkVBTFRJTUUSPWhvdF9yZWNhbGxfcmVhbHRpbWVfdDpub3JtYWw6MjAyNC0wNS0yNTpmZW1hbGU6anV2ZW5pbGU6b3RoZXIYACAAOgBaCDQwMzQyOTMwYiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIKMjk0ODUxNjM1NIoBCTM1MTI5MjYzM6oBCXJlY29tbWVuZMIBIDBiNjBhZGU1NjBiZDRmNDkzNWI2NTkyYjg3YzkxNzg48gEKCAwSBk5vcm1hbPIBKAgKEiQwZWUzZDRmNy00OTEzLTQxMDktOTAzMi1iMTBjYjllZjg3ZmXyAQUICxIBNYICAIgC6vWm7voxkgIgMGI2MGFkZTU2MGJkNGY0OTM1YjY1OTJiODdjOTE3ODiaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCG09sZENvbnRlbnRSZWR1Y2U1V2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhxUU19TT1VSQ0VfSE9UX0NST1NTX1JFQUxUSU1F6AIC+gILTk9STUFMX0ZMT1eKAyBmMTg5NTAyNmJjMjg0NTg0OGRhZjViMTVmYzAyNTY5N5oDDQoCdjAQABoFb3RoZXKoA4L+tQLYAwDqAx9ob3RDcm9zc1JlYWxUaW1lQ29udGVudFJlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAMxNjDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAMB4Dr8/gQUAAAAAAAAAAIkFFvHlcsY+rT+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFBJICJQoJNTY2MTc3ODY0EgoyOTQ4NTE2MzU0GAQiCklNQUdFX1RFWFQ=",
      action_card: false
    }, {
      id: "28_1716607630.46",
      type: "feed",
      offset: 28,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3509092719,
        type: "answer",
        url: "https://api.zhihu.com/answers/3509092719",
        author: {
          id: "b6cbee7fb17692e6fdabee240af2a276",
          url: "https://api.zhihu.com/people/b6cbee7fb17692e6fdabee240af2a276",
          user_type: "people",
          url_token: "shuai-bi-6-27",
          name: "做咩啊",
          headline: "做咩",
          avatar_url: "https://picx.zhimg.com/50/v2-fae97f7defb254eb0d1d13acd5f158bd_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          followers_count: 64,
          is_following: false,
          is_followed: false
        },
        created_time: 1716562284,
        updated_time: 1716562420,
        voteup_count: 22,
        thanks_count: 2,
        comment_count: 0,
        is_copyable: true,
        question: {
          id: 657059743,
          type: "question",
          url: "https://api.zhihu.com/questions/657059743",
          author: {
            id: "2a863e6f623a1d9901ef03e7c1faae7c",
            url: "https://api.zhihu.com/people/2a863e6f623a1d9901ef03e7c1faae7c",
            user_type: "people",
            url_token: "shui-hao-tian-81",
            name: "水好甜",
            headline: "欢迎大家关注我的微信公众号趣乐源地（bvs681)",
            avatar_url: "https://pic1.zhimg.com/50/v2-a1859aca169b65ad813868358d8d59d6_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 447,
            is_following: false,
            is_followed: false
          },
          title: "如何评价央视新闻发布的“警方公布‘胖猫’事件调查细节，‘胖猫’姐姐网暴谭某，故意引导舆论”？",
          created: 1716555788,
          answer_count: 0,
          follower_count: 0,
          comment_count: 0,
          bound_topic_ids: [288, 3470598, 3470946, 3472505, 3474705],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "官方通告和胖猫姐姐的做法没看出来有啥区别，按照官方说的都是截取一部分。。还是摇一个吧",
        excerpt_new: "官方通告和胖猫姐姐的做法没看出来有啥区别，按照官方说的都是截取一部分。。还是摇一个吧",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="QMuipta8">官方通告和胖猫姐姐的做法没看出来有啥区别，按照官方说的都是截取一部分。。还是摇一个吧</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 836,
        favorite_count: 0,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3509092719}',
      attached_info: "CrMFCNnhqva8xN6hnQEQBBoJNjY4MDg4NDIwIOzSwrIGKBYwAEAcSiQKGVRTX1NPVVJDRV9XQVJNX1VQX05PUk1BTDESATAYACAAOgBaCTEwODI5MTEzMmIgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjM1MDkwOTI3MTmKAQk2NTcwNTk3NDOqAQlyZWNvbW1lbmTCASBiNmNiZWU3ZmIxNzY5MmU2ZmRhYmVlMjQwYWYyYTI3NvIBCggMEgZOb3JtYWzyASgIChIkNmMyODc0NzktMTlhYi00MTZlLTkxNzUtMGU1NDBiZWE3NWUy8gEFCAsSATWCAgCIAur1pu76MZICIGI2Y2JlZTdmYjE3NjkyZTZmZGFiZWUyNDBhZjJhMjc2mgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAhhDb250ZW50V2FybVVwQnJlYWtJblJ1bGXaAhlUU19TT1VSQ0VfV0FSTV9VUF9OT1JNQUwx6AIC+gILTk9STUFMX0ZMT1eKAyBmMTg5NTAyNmJjMjg0NTg0OGRhZjViMTVmYzAyNTY5N5oDDQoCdjAQABoFb3RoZXKoA8QG2AMA6gMfdGV4dF8xMmhvdXJfdW5pZmluc2hlZF9yZWNhbGxlcvoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQCYWnCBAM0MDDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAACD8wp0/gQUAAAAAAAAAAIkFFvHlcsY+rT+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFBJICJQoJNjY4MDg4NDIwEgozNTA5MDkyNzE5GAQiCklNQUdFX1RFWFQ=",
      action_card: false
    }, {
      id: "29_1716607630.460",
      type: "feed",
      offset: 29,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3501584199,
        type: "answer",
        url: "https://api.zhihu.com/answers/3501584199",
        author: {
          id: "79942bf938ce982893bd24143a2d2cc1",
          url: "https://api.zhihu.com/people/79942bf938ce982893bd24143a2d2cc1",
          user_type: "people",
          url_token: "yang-pei-liang-30",
          name: "杨絮pro",
          headline: "写写身边故事，感悟生活道理，不敢教人做事，只做一面镜子。",
          avatar_url: "https://pica.zhimg.com/50/v2-8bd018e18b92c9b5d5274620ec47e9c7_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          followers_count: 4203,
          is_following: false,
          is_followed: false
        },
        created_time: 1715937625,
        updated_time: 1715937625,
        voteup_count: 4491,
        thanks_count: 148,
        comment_count: 514,
        is_copyable: true,
        question: {
          id: 358755951,
          type: "question",
          url: "https://api.zhihu.com/questions/358755951",
          author: {
            id: "a0beea0ce9d612de906ba8aa7e6fd9eb",
            url: "https://api.zhihu.com/people/a0beea0ce9d612de906ba8aa7e6fd9eb",
            user_type: "people",
            url_token: "yan-guo-liu-sheng-16-91",
            name: "银燕",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/v2-b0520ca46c21dbb5b27274d4b472ad85_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "什么叫降维打击？",
          created: 1575194085,
          answer_count: 0,
          follower_count: 0,
          comment_count: 194,
          bound_topic_ids: [3269, 76521, 182519, 1833036, 2109549],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "我一哥们，985毕业，年薪六十多万，39了还单身，从来没谈过恋爱那种。各种相亲没结果，他自己地中海发型，却是个颜控。我开玩笑说，你要是钻石王老五，就不愁没有漂亮女人了。于是，他脑袋一抽，辞职创业了。租了80平的办公室，招了一个985本科漂亮女生当前台，招了两个硕士应届生当高管，每天开会研究战略，说白了就是讨论公司干点啥。 他把创业的事儿广而告之，邀请朋友、同学到公司参观、洽谈。 每天都有好些人来拜访，一副热…",
        excerpt_new: "我一哥们，985毕业，年薪六十多万，39了还单身，从来没谈过恋爱那种。各种相亲没结果，他自己地中海发型，却是个颜控。我开玩笑说，你要是钻石王老五，就不愁没有漂亮女人了。于是，他脑袋一抽，辞职创业了。租了80平的办公室，招了一个985本科漂亮女生当前台，招了两个硕士应届生当高管，每天开会研究战略，说白了就是讨论公司干点啥。 他把创业的事儿广而告之，邀请朋友、同学到公司参观、洽谈。 每天都有好些人来拜访，一副热…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="M1nmGZt8"> 我一哥们，985毕业，年薪六十多万，39了还单身，从来没谈过恋爱那种。各种相亲没结果，他自己地中海发型，却是个颜控。我开玩笑说，你要是钻石王老五，就不愁没有漂亮女人了。于是，他脑袋一抽，辞职创业了。租了80平的办公室，招了一个985本科漂亮女生当前台，招了两个硕士应届生当高管，每天开会研究战略，说白了就是讨论公司干点啥。</p><p data-pid="gl7Nc3sl">他把创业的事儿广而告之，邀请朋友、同学到公司参观、洽谈。</p><p data-pid="tEyoyiRN">每天都有好些人来拜访，一副热热闹闹、欣欣向荣的景象，前台忙得不亦乐乎，两个研究生高管也自信心爆棚。</p><p data-pid="BUH4l5_J">我去了几次，说实话，他们那些天马行空的想法，靠谱程度无限接近于零。</p><p data-pid="kKy0yJAj">他们公司福利是真好，不打卡，不查考勤，只要理由合适，带薪假随便请，当月工资，29号就发，只会提前，绝不延迟。办公室各种饮料零食随便享用。</p><p data-pid="0EM2F-Cj">八个月后，他通知我参加婚礼。</p><p data-pid="pO2D5EUm">婚礼上，漂亮前台变成了新娘，穿着洁白的婚纱，时不时摸一下微微隆起的腹部，脸上荡漾着幸福的笑容。</p><p data-pid="IS8jGbTd">都说先立业后成家，这哥们是准备先成家后立业了，估计再过半年就得当爸爸了。</p><p data-pid="wxmXdcnN">两周后，我路过他公司，就上去看看。</p><p data-pid="uyw9QvxN">大门紧闭，里面漆黑一片，门上贴着招租启示。</p><p data-pid="K3Cvw7rT">我赶紧给他打电话。</p><p data-pid="fl-I1-_5">他说，没研究出可做的业务，就把公司注销了。</p><p data-pid="k6LPbrQ1">因为我的一句玩笑话，让他有了不切实际的梦，现在梦想的翅膀折断，天知道他有多痛。</p><p data-pid="lRFfu0cJ">我有负罪感。</p><p data-pid="J13zxrtT">我小心翼翼地说，亏了不少钱吧。</p><p data-pid="ngVPOkR_">他说，房租6万，高管工资8万，前台工资不能算亏，加上其他杂七杂八的，一共十六七万吧。</p><p data-pid="LdPlqfME">我说，高管工资这么低吗？</p><p data-pid="PJuLrd03">他说，用股权激励了。</p><p data-pid="GGIJmade">我说，亏十六七万也不少了，都怪我，不该开玩笑说让你当钻石王老五。</p><p data-pid="RJYEI5mN">他哈哈大笑说，我得谢谢你啊，十六七万娶个985本科的漂亮老婆，我赚到了啊。</p><p data-pid="1Qve3ija">我愣了一下，然后全懂了，他压根就没想过创业成功，只是装钻石王老五讨老婆呢。</p><p data-pid="Avz6c1vM">我说，那你接下来再找份工作？</p><p data-pid="vEDn1aL_">他笑着说，我已经回原公司上班了，当初跟老板约定的就是请长假，不超过一年的长假。</p><p data-pid="nTcYJ7tx">好吧，是我格局低了，原来一切尽在他的掌握之中。</p><p data-pid="zcCGPcbI">看似冲动，实则深思熟虑，看似愚钝，实则精于算计。</p><p data-pid="cYYHaAD3">不知道那个漂亮前台知道真相会作何感想，哦，不对，她永远都不会知道真相。</p><p data-pid="zA1HalrH">在她的认知里，她嫁给了一个有梦想、有热血、创业失败仍然可以让她生活无忧的责任担当。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 516822,
        favorite_count: 747,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3501584199}',
      attached_info: "CoEFCNnhqva8xN6hnQEQBBoJNjY2NzIzOTQ5INnCnLIGKIsjMIIEQB1KKAoTVFNfU09VUkNFX0ZFRURSRV9WNxIBMBgAIAA6CnsicmF3IjoiIn1aCDQyMDAxOTM1YiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIKMzUwMTU4NDE5OYoBCTM1ODc1NTk1MaoBCXJlY29tbWVuZMIBIDc5OTQyYmY5MzhjZTk4Mjg5M2JkMjQxNDNhMmQyY2Mx8gEKCAwSBk5vcm1hbPIBKAgKEiQxMjcwNGU1Yi1mZmJmLTQ3MGQtOGYxZi03NGEzN2YxNjY4YjPyAQUICxIBNYICAIgC6vWm7voxkgIgNzk5NDJiZjkzOGNlOTgyODkzYmQyNDE0M2EyZDJjYzGaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhNUU19TT1VSQ0VfRkVFRFJFX1Y36AIC+gILTk9STUFMX0ZMT1eKAyBmMTg5NTAyNmJjMjg0NTg0OGRhZjViMTVmYzAyNTY5N5oDDQoCdjAQABoFb3RoZXKoA9bFH9gDAOoDCWZlZWRyZV92N/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAABgAbfDP4EFAAAAAAAAAACJBRbx5XLGPq0/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQSSAiUKCTY2NjcyMzk0ORIKMzUwMTU4NDE5ORgEIgpJTUFHRV9URVhU",
      action_card: false
    }];
    const mockList3 = [{
      id: "30_1716607630.364",
      type: "feed",
      offset: 30,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3498792647,
        type: "answer",
        url: "https://api.zhihu.com/answers/3498792647",
        author: {
          id: "88e0de94e07a58f3729999febd3cd38a",
          url: "https://api.zhihu.com/people/88e0de94e07a58f3729999febd3cd38a",
          user_type: "people",
          url_token: "lan-se-de-hai-37-47",
          name: "内容在审核后发布",
          headline: "无产阶级联合起来！",
          avatar_url: "https://picx.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 13,
          is_following: false,
          is_followed: false
        },
        created_time: 1715736081,
        updated_time: 1715927439,
        voteup_count: 19,
        thanks_count: 1,
        comment_count: 46,
        is_copyable: false,
        question: {
          id: 647291906,
          type: "question",
          url: "https://api.zhihu.com/questions/647291906",
          author: {
            id: "f2631cb9f6cc5e80d69574ffc6acdda4",
            url: "https://api.zhihu.com/people/f2631cb9f6cc5e80d69574ffc6acdda4",
            user_type: "people",
            url_token: "warren-60-30-6",
            name: "warren",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/v2-ce968be9bf77ff7414aa45f7d74129b1_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "后端真的比前端累吗?",
          created: 1709696564,
          answer_count: 0,
          follower_count: 0,
          comment_count: 1,
          bound_topic_ids: [769, 1125],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "看了下评论区，都成了前端吐槽专区了，我敢保证98%的前端都是简单的页面渲染数据，flex布局搞一下，npm install 一下。本人前后端都搞",
        excerpt_new: "看了下评论区，都成了前端吐槽专区了，我敢保证98%的前端都是简单的页面渲染数据，flex布局搞一下，npm install 一下。本人前后端都搞",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "disallowed",
        content: '<p data-pid="esfb49HT">看了下评论区，都成了前端吐槽专区了，我敢保证98%的前端都是简单的页面渲染数据，flex布局搞一下，npm install 一下。本人前后端都搞</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 11732,
        favorite_count: 1,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3498792647}',
      attached_info: "CqQFCOSTzLG0we6nigEQBBoJNjY2MjE2MzQwIJGckLIGKBMwLkAeSiMKFVRTX1NPVVJDRV9USEVNRV9NRVJHRRIEMTA2MhgAIAA6AEotCh1UU19TT1VSQ0VfSU5URVJFU1RfV09SRF9NRVJHRRIGMzc4NDg0GAAgADoAWgkxMDYxMjAxMjRiIGE2MzNkY2M3MjNhZWUyNTJiZTc1NTY3YjRjZGY4ODg2cgozNDk4NzkyNjQ3igEJNjQ3MjkxOTA2qgEJcmVjb21tZW5kwgEgODhlMGRlOTRlMDdhNThmMzcyOTk5OWZlYmQzY2QzOGHyAQoIDBIGTm9ybWFs8gEoCAoSJDFjNDhlNjliLTUzNDAtNDJlNS1iZjIyLTViZDQ2YWE3ZjViNvIBBQgLEgE2ggIAiAKu/Kbu+jGSAiA4OGUwZGU5NGUwN2E1OGYzNzI5OTk5ZmViZDNjZDM4YZoCAMoCFEZpcnN0QnJ1c2hXZWlnaHRSdWxl2gIVVFNfU09VUkNFX1RIRU1FX01FUkdF6AIC+gILTk9STUFMX0ZMT1eKAyA3ZDVhN2M5M2RkNzk0ZTU1ODUwMDE1MDdhOGM3ODU0NpoDDQoCdjAQABoFb3RoZXKoA9Rb2AMA6gMbVGhlbWVNZXJnZU5ld1YzUG9vbFJlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAMxNzDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAEAU7cg/gQUAAAAAAAAAAIkF0Op+QZQBsD+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFBZICJQoJNjY2MjE2MzQwEgozNDk4NzkyNjQ3GAQiCklNQUdFX1RFWFQ=",
      action_card: false
    }, {
      id: "31_1716607630.503",
      type: "feed",
      offset: 31,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3053677515,
        type: "answer",
        url: "https://api.zhihu.com/answers/3053677515",
        author: {
          id: "12b3f14533367beb538f5f7e6b29bb8f",
          url: "https://api.zhihu.com/people/12b3f14533367beb538f5f7e6b29bb8f",
          user_type: "people",
          url_token: "du-wei-hao-12",
          name: "杜阳同学",
          headline: "一身正气人长久，一日得失看黄昏 ",
          avatar_url: "https://pic1.zhimg.com/50/v2-616935f360a2a3c4a95278959f381f97_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          badge: [{
            type: "identity_people",
            description: "电子设备制造业 员工"
          }],
          followers_count: 12329,
          is_following: false,
          is_followed: false
        },
        created_time: 1685570240,
        updated_time: 1685570240,
        voteup_count: 119,
        thanks_count: 59,
        comment_count: 83,
        is_copyable: false,
        question: {
          id: 294783324,
          type: "question",
          url: "https://api.zhihu.com/questions/294783324",
          author: {
            id: "ac6cbcdc2efd84fb5c215ed900efb5f8",
            url: "https://api.zhihu.com/people/ac6cbcdc2efd84fb5c215ed900efb5f8",
            user_type: "people",
            url_token: "wei-shi-yao-mei-you-qian",
            name: "科幻池塘",
            headline: "今宵别梦寒",
            avatar_url: "https://picx.zhimg.com/50/v2-08903e0b3617ead304d2b4c8c32655ec_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "地球上有哪些超出常人想象的神秘事件？",
          created: 1537013835,
          answer_count: 0,
          follower_count: 0,
          comment_count: 67,
          bound_topic_ids: [3298, 7770, 8051, 8609, 30495],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        thumbnail: "https://picx.zhimg.com/50/v2-771b2459fe6518f3d7999f8cef8e5d94_720w.jpg?source=b6762063",
        thumbnail_extra_info: {
          video_id: "1647481627885424640",
          type: "video",
          url: "https://picx.zhimg.com/v2-771b2459fe6518f3d7999f8cef8e5d94.jpg?source=382ee89a",
          height: 1920,
          width: 1080,
          duration: 6,
          playlist: {
            ld: {
              url: "https://vdn6.vzuu.com/SD/abf8b65a-f493-11ed-8139-eadec016a7d9-v8_f2_t1_vx7DMxRO.mp4?pkey=AAVav5BnFH5yQI-7a1pzPJb9-AHfhAFoGXCEZupkbGccNyEJuA45iOCvU6v7ZG6It4YhKtEUGzW3A4t26Hilwqg6&c=avc.8.0&f=mp4&pu=4e83193b&bu=b9ce98d5&expiration=1716614830&v=ks6",
              width: 478,
              height: 848,
              bitrate: 296,
              duration: 6,
              format: "mp4",
              fps: 25,
              size: 250556
            },
            sd: {
              url: "https://vdn6.vzuu.com/SD/abf8b65a-f493-11ed-8139-eadec016a7d9-v8_f2_t1_vx7DMxRO.mp4?pkey=AAVav5BnFH5yQI-7a1pzPJb9-AHfhAFoGXCEZupkbGccNyEJuA45iOCvU6v7ZG6It4YhKtEUGzW3A4t26Hilwqg6&c=avc.8.0&f=mp4&pu=4e83193b&bu=b9ce98d5&expiration=1716614830&v=ks6",
              width: 478,
              height: 848,
              bitrate: 296,
              duration: 6,
              format: "mp4",
              fps: 25,
              size: 250556
            },
            hd: {
              url: "https://vdn6.vzuu.com/SD/abf8b65a-f493-11ed-8139-eadec016a7d9-v8_f2_t1_vx7DMxRO.mp4?pkey=AAVav5BnFH5yQI-7a1pzPJb9-AHfhAFoGXCEZupkbGccNyEJuA45iOCvU6v7ZG6It4YhKtEUGzW3A4t26Hilwqg6&c=avc.8.0&f=mp4&pu=4e83193b&bu=b9ce98d5&expiration=1716614830&v=ks6",
              width: 478,
              height: 848,
              bitrate: 296,
              duration: 6,
              format: "mp4",
              fps: 25,
              size: 250556
            }
          },
          show_maker_entrance: false,
          play_auth_token: "V1-0f31dc4683300b655fd5d693382600f9-0-ac1f40d31a4611ef868c9eedcf611eb2-1716607630953-1716694030953-f9d728797d4d198c7de282c4651e0fe335e0c2261e4f1510f8b426cb25cfec32"
        },
        excerpt: "拍下龙算不算？",
        excerpt_new: "拍下龙算不算？",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "disallowed",
        content: '<p data-pid="6hp4C5KU">拍下龙算不算？</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 1,
        play_count: 5020382,
        attachment: {
          type: "video",
          is_complete: false,
          parent_content_token: "1647481672172994560",
          split_start: 0,
          parent_play_count: 5020635,
          parent_voteup_count: 0,
          parent_title: "地球上有哪些超出常人想象的神秘事件？"
        },
        thumbnails: ["https://picx.zhimg.com/50/v2-771b2459fe6518f3d7999f8cef8e5d94_720w.jpg?source=b6762063"],
        favorite_count: 52,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3053677515}',
      attached_info: "CsIFCOSTzLG0we6nigEQBBoJNTg1Mjk5NjU4IMCF36MGKHcwU0AfSjQKH1RTX1NPVVJDRV9GRUVEUkVfVjNfVklERU9fTUVSR0USATAYACAAOgp7InJhdyI6IiJ9WggyNzc4NDQ3OWIgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZogKDfoP35we4WcgozMDUzNjc3NTE1igEJMjk0NzgzMzI0qgEJcmVjb21tZW5kwgEgMTJiM2YxNDUzMzM2N2JlYjUzOGY1ZjdlNmIyOWJiOGbyAQoIDBIGTm9ybWFs8gEoCAoSJDBmYWVlNWMwLTM2MjktNDAzNi1hNzgzLTIxZGZkOTU0NWY2YvIBBQgLEgE2ggIAiAKu/Kbu+jGSAiAxMmIzZjE0NTMzMzY3YmViNTM4ZjVmN2U2YjI5YmI4ZpoCAMoCFEZpcnN0QnJ1c2hXZWlnaHRSdWxlygIbT2xkQ29udGVudFJlZHVjZTVXZWlnaHRSdWxlygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCH1RTX1NPVVJDRV9GRUVEUkVfVjNfVklERU9fTUVSR0XoAgL6AgtOT1JNQUxfRkxPV4oDIDdkNWE3YzkzZGQ3OTRlNTU4NTAwMTUwN2E4Yzc4NTQ2mgMNCgJ2MBAAGgVvdGhlcqgDAdgDAOoDD2ZlZWRyZV92M192aWRlb/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQCMzDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAAAfCqI/gQUAAAAAAAAAAIkF0Op+QZQBsD+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFBZICIAoJNTg1Mjk5NjU4EgozMDUzNjc3NTE1GAQiBVZJREVP",
      action_card: false
    }, {
      id: "32_1716607630.510",
      type: "feed",
      offset: 32,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3501852799,
        type: "answer",
        url: "https://api.zhihu.com/answers/3501852799",
        author: {
          id: "6c8e3aad2e611db723c111866025ef79",
          url: "https://api.zhihu.com/people/6c8e3aad2e611db723c111866025ef79",
          user_type: "people",
          url_token: "48-73-96-44-49",
          name: "可可代茶",
          headline: "",
          avatar_url: "https://picx.zhimg.com/50/v2-e1b6192aa0d8dcf140ba189dea518a4c_l.jpg?source=b6762063",
          is_org: false,
          gender: 0,
          followers_count: 640,
          is_following: false,
          is_followed: false
        },
        created_time: 1715958712,
        updated_time: 1715958712,
        voteup_count: 266,
        thanks_count: 8,
        comment_count: 10,
        is_copyable: true,
        question: {
          id: 610432919,
          type: "question",
          url: "https://api.zhihu.com/questions/610432919",
          author: {
            id: "",
            url: "",
            user_type: "people",
            url_token: "",
            name: "匿名用户",
            headline: "",
            avatar_url: "https://pica.zhimg.com/v2-d41c2ceaed8f51999522f903672a521f_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "有一个欲望很强的男朋友怎么办?",
          created: 1688523753,
          answer_count: 0,
          follower_count: 0,
          comment_count: 7,
          bound_topic_ids: [9628],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: '“宝贝，一次就好……” 成年第一天，我和男朋友在家里初尝禁/果。 “乖，很快，给我……” 他的胃口不小，除了每个月那几天，他都要我去他宿舍 25岁， 他已经成了商界赫赫有名的人物 出于责任，在一起的第六年，他向我求了婚。 我欣喜若狂，抛弃工作和生活，全心全意扮演完美的豪门太太 朋友们都说，我永远不可能离开他。 我也是这么觉得。 直到我不小心撞到他和好兄弟聊天， “真打算结婚了?" 听到这，准备敲门的我把手放了下…',
        excerpt_new: '“宝贝，一次就好……” 成年第一天，我和男朋友在家里初尝禁/果。 “乖，很快，给我……” 他的胃口不小，除了每个月那几天，他都要我去他宿舍 25岁， 他已经成了商界赫赫有名的人物 出于责任，在一起的第六年，他向我求了婚。 我欣喜若狂，抛弃工作和生活，全心全意扮演完美的豪门太太 朋友们都说，我永远不可能离开他。 我也是这么觉得。 直到我不小心撞到他和好兄弟聊天， “真打算结婚了?" 听到这，准备敲门的我把手放了下…',
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p></p><p data-pid="510EJVpw">“宝贝，一次就好……”</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="gM7smDm-">成年第一天，我和男朋友在家里初尝禁/果。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="e_RVMN0R">“乖，很快，给我……”</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="PhsVcBRO">他的胃口不小，除了每个月那几天，他都要我去他宿舍</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="8fipTKsl">25岁，</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="ux9MY_2b">他已经成了商界赫赫有名的人物</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="BXyFJ5-A">出于责任，在一起的第六年，他向我求了婚。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="moVPD1T6">我欣喜若狂，抛弃工作和生活，全心全意扮演完美的豪门太太</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="7OXMjCNl">朋友们都说，我永远不可能离开他。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="L5wJCIOi">我也是这么觉得。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="7HdrX5ZI">直到我不小心撞到他和好兄弟聊天，</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="F_k8Cyz1">“真打算结婚了?&#34;</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="GfkLOThB">听到这，准备敲门的我把手放了下来</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="NtEj9ckn">男人的嗓音响起，“结婚早晚的事&#34;</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="bILX_Ra7">他冷漠的声音不带一丝感情，“爸妈喜欢，长得好看，回去能撑起门面，娶回去省得烦我，&#34;</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="O4IyO2BI">领证那天，我逃了。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="Zd5gMJtt">多年后的校友会，他依旧是那么高高在上</p><p data-pid="cQf6mEUN">第1章</p><p data-pid="5cjQHWOP">我追了金融系男神六年，</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="_aWnFB2M">连坐在他身边的机会都没有</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="RLloepNN">直到后来迎新会团建</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="-IJJK6Gv">他挽着一小姑娘出现……</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="GJ-joqd8">小姑娘说:</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="o5iwDP98">“抱歉啊大家，</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="Sa4a7rJU">学长知道我要参加迎新会，一定要送我过来。”</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="Dh-dEmk1">我没想到他会来。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="bInuSie6">我一直以为，他是不喜热闹的。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="AIbprjp1">大学期间，院里系里经常会有各种活动，</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="GMqeacLe">哪怕是校领导出面，他也一样避而远之。</p><p class="ztext-empty-paragraph"><br/></p><p class="ztext-empty-paragraph"><br/></p><p class="ztext-empty-paragraph"><br/></p><p data-pid="vxI2QMQP">　　我赶到校友会时，大伙儿喝的正嗨。</p><p data-pid="4gLgd-QP">　　人群中央，周宗宣神色肃然的坐在圆桌前，头顶水晶灯折射出的光晕洒在他挺翘的鼻峰和眉眼上，衬的整个人如美玉打造的神邸，清冷又端正。</p><p data-pid="s8lng0hc">　　他身旁坐着一位面容姣好的妹子。</p><p data-pid="p1n7QvbJ">　　他的手随意的搭在她身后，举手投足间尽是关爱。</p><p data-pid="LLt1-eZA">　　真心话大冒险的瓶口恰巧对准了女孩。</p><p data-pid="0V5y4U24">　　好事者用着一副讨好的口吻道：“从在场异性中选择一位接吻两分钟。”</p><p data-pid="DV3r4ZSt">　　女孩听完羞涩的低下头，小心翼翼的递给了周宗宣一个求助的眼神，我见犹怜。</p><p data-pid="jcAr4Y0S">　　周宗宣跟众人递了个眼色，轻声道：“别闹，她胆子小。”</p><p data-pid="OiHfYt0O">　　他说别闹，自然也就没人敢为难她，但出于尊重游戏规则，周宗宣还是饮完了面前的酒。</p><p data-pid="ZI2Gkol5">　　护着的意思显而易见。</p><p data-pid="h2LIQltg">　　起哄声此起彼伏，没人察觉到站在角落里的我。</p><p data-pid="gNoN2sYL">　　我捂着手腕上的伤疤，悄悄地转过身。</p><p data-pid="bM7jdKuG">　　“嫂子，你也刚到？”</p><p data-pid="y23hxDha">　　班委严冬的询问声引起了大家的注意。</p><p data-pid="xiFxqgWD">　　嫂子。</p><p data-pid="Jh4WbK--">　　这个曾经我引以为傲的称谓，在此刻尤其显得滑稽。</p><p data-pid="oA_ZliuJ">　　一瞬间，所有人的目光纷纷朝我看来，我扯了扯嘴角，平静道：“好久不见。”</p><p data-pid="zqIFONnB">　　没人回应。</p><p data-pid="6AM5qM4_">　　室内陷入了短暂的静谧中。</p><p data-pid="wosWy2ol">　　仿佛能听到针落地的声音。</p><p data-pid="eD3Z7el_">　　也是，如今的周宗宣似已找到正缘，又有谁愿意搭理我这个舔了他六年的舔狗呢？</p><p data-pid="BWiMMeZx">　　我的出现，确实有些不合时宜。</p><p data-pid="wFr0D__Q">　　但就在这时，周宗宣身侧的女孩率先打破了僵局：“我知道你，孟西晴，我们系前几届有名的学霸女神！”</p><p data-pid="J_bAC-On">　　女孩子长相甜美，语气也很温柔，实在让人讨厌不起来。</p><p data-pid="0kEf3Fw7">　　“学姐你好，我是林西西，也是计算机系，”她做自我介绍，又看向周宗宣，小声道：“学长，你怎么没告诉我孟学姐今晚也来啊？”</p><p data-pid="8I7swDiF">　　周宗宣淡淡的看了我一眼，声音不咸不淡：“无关紧要的人，提她做什么？”</p><p data-pid="qBAgPnnT">　　无关紧要。</p><p data-pid="r6ZJ-wCy">　　原来，周宗宣是这么定义我的。</p><p data-pid="Gvbar9Dr">　　但仔细想想，他说的也没错。</p><p data-pid="45LyPqLQ">　　否则，整整六年，我怎么会连一个光明正大坐在他身边的机会都没有？</p><p data-pid="Ouzz_YFL">　　他从未承认过我的身份。</p><p data-pid="TifVHsY0">　　更别提为我挡酒了。</p><p data-pid="jREbWI2w">　　可笑的是，我一直以为，冷静克制的周宗宣，是不会喝酒的。</p><p data-pid="l02W4UY_">　　聚会结束，一行人一起下了楼。</p><p data-pid="8b6i9NGu">　　周宗宣和林西西被众人簇拥在最前排。</p><p data-pid="hkABrp0p">　　女孩细软的声音钻到我的耳朵里：“说了少喝点，你看，现在难受了吧？”</p><p data-pid="BueGroJW">　　周宗宣的回应算的上满分：“因为谁？”</p><p data-pid="QlfWn8Ti">　　林西西红着眼圈道：“学长别送我了，看着心疼。”</p><p data-pid="8pLnOKJN">　　周宗宣不知道回了句什么，女孩马上破涕为笑。</p><p data-pid="KAcNWJ8f">　　两人浓情蜜意，旁若无人，站在后排的我却收到了一个又一个的同情眼神。</p><p data-pid="xhJmXdi1">　　我心情也有点丧。</p><p data-pid="b6WNk9Uu">　　原本今晚我是想借校友会结识一些投资圈人脉的。</p><p data-pid="RONPOEFr">　　现在计划落空，我还被看了一晚上的笑话。</p><p data-pid="rSIuuxjd">　　严冬看不下去了，提议送我去地铁口。</p><p data-pid="Q9sJBqab">　　“抱歉，我不知道宗宣会来。”严冬神色愧疚，“以前他从不参加这种聚会。”</p><p data-pid="STFAuQJX">　　严冬说的是实话，校友会名单上也的确没有周宗宣。</p><p data-pid="utQ4cImF">　　我语气平和：“没事，都过去了，以后还得仰仗班委多多提携。”</p><p data-pid="e1R2tScY">　　严冬点头：“项目书我留着，有消息我马上联系你。”</p><p data-pid="qyAei0mQ">　　看吧，谈钱比谈感情容易多了。</p><p data-pid="hXhy2E1H">　　一小时后，我拎着醒酒药返回小区。</p><p data-pid="xqThFMcP">　　电梯门开，迎面而来的是一位熟悉的高大身影，仔细一瞧，不是周宗宣又是谁？</p><p data-pid="Foru33MZ">　　他手里夹了支烟，打火机悬在半空中，暗蓝色条纹领带松松垮垮的悬在脖颈间，整个人看上去有些颓。</p><p data-pid="KlAJhlDd">　　见到我，他眼神一滞，幽深的黑眸微颤了颤，薄唇紧抿到一处。</p><p data-pid="sohIAE1K">　　我垂眸，从容的收回视线，伸手去按楼层。</p><p data-pid="ttpjgXy4">　　我们都没说话。</p><p data-pid="kUBZr4nh">　　倏忽间，一道阴影覆下，浓重酒精味猛地笼过来，我只觉得腰间一紧，整个人被周宗宣扣进了怀里。</p><p data-pid="ODHmZac0">　　男人沙哑的嗓音落在我的耳中：“晴晴，你还是心疼我的对不对。”</p><p data-pid="B0QLYWQc">　　周宗宣说这话的时温柔的蹭了蹭我的脖颈，语气里也带着一丝讨好的意味。</p><p data-pid="IrFSV5HR">　　这在过往六年中前所未有。</p><p data-pid="YyIFYsWq">　　我回想一小时前在聚会上他跟那位林小姐温声说话的场景，顿时哭笑不得。</p><p data-pid="qBbYNNE6">　　心疼。</p><p data-pid="YGU2hV80">　　说心疼他的，是林西西。</p><p data-pid="LxssknK0">　　晴晴和西西，发音本就类似。</p><p data-pid="w-AnVMR2">　　浓重的酒精味告诉我他喝多了。</p><p data-pid="Owi9vdK8">　　我疲倦的抬起头，提醒道：“抱歉，我不是林小姐。”</p><p data-pid="pxXfbcD6">　　周宗宣搂着我的手臂明显一顿。</p><p data-pid="xdVlWPKZ">　　视线交汇时，我识趣的站到一旁，余光中，看到了周宗宣僵硬的面庞。</p><p data-pid="g54LDedd">　　气氛有一瞬的尴尬。</p><p data-pid="R5gub6-o">　　“叮”的一声后，电梯抵达楼层，我面无表情的往外走，隐约间察觉到了男人若有似无的目光。</p><p data-pid="tEyo_B8J">　　我快步进门，然而在房门即将关上时，周宗宣忽然毫无征兆的冲了进来，将我抵在了玄关处。</p><p data-pid="ht2wBycp">　　男人长腿侵略强势，瞬间，我就被禁锢在了他的方寸之地。</p><p data-pid="_A04I5yz">　　“孟西晴，你住这？”</p><p data-pid="S7nLqr5H">　　周宗宣语气森然，身上裹着一层寒意。</p><p data-pid="iSd_oUPE">　　我住的是两年前我们同居过的房子。</p><p data-pid="7gRwMTmU">　　我实话实说：“房东说了，老顾客，每月减三百。”</p><p data-pid="x20zA9it">　　三百块啊，对于我们这种社畜来说，能省则省。</p><p data-pid="UI33p2mp">　　周宗宣显然不大满意我这个回答，冷嗤道：“故意的？”</p><p data-pid="TQz5FvdO">　　我伸手开了灯，指着室内已经倒腾过的格局，反问道：“像吗？”</p><p data-pid="qEBqYAeO">　　他喜欢的性冷淡风如今已变成了孟菲斯风格，两者南辕北辙。</p><p data-pid="bXqmBghh">　　周宗宣收回视线，眉头微蹙，顿了两秒后道：“你得搬走，差价我补。”</p><p data-pid="0W2Gy96D">　　我不知道周宗宣还在介意什么。</p><p data-pid="ncaDh-FM">　　那些我们睡过做过的角落，早已经不复存在，况且他也不会再来了不是吗？</p><p data-pid="RPuatV04">　　下一秒，周宗宣的声音便解开了我的疑惑：“林西西住在楼上。”</p><p data-pid="Vzgnl-Hl">　　原来如此。</p><p data-pid="s9zC5zx_">　　还真是巧。</p><p data-pid="6reGhamS">　　难怪方才我们会遇见，如果我没猜错，他应该刚送完小姑娘。</p><p data-pid="ucTQZxdS">　　他为了不让她误会，也算是煞费苦心了。</p><p data-pid="XjMHXaSM">　　“这个问题很好解决，”我瞅了一眼室内老旧的设施，提议道：“你可以给林小姐换个更好的住处。”</p><p data-pid="Rhg8AWsv">　　陆家嘴附近，可以站在万米高空欣赏华灯初上的豪华套房，反正周宗宣也付得起。</p><p data-pid="mZN8ZsTm">　　他一向不缺钱。</p><p data-pid="f7eZ89F6">　　周宗宣没听进我的建议，拒绝道：“我不想她被人误会。”</p><p data-pid="WKhyNEol">　　他语气坚决，若不是亲眼所见，我都不知道，那个高高在上的周宗宣，竟可以替一个人考虑的如此周全。</p><p data-pid="tcdCODhI">　　心口某处像是被毒蜂蛰了一下，泛着丝丝的疼意，我顿了顿，平和道：“抱歉，我不想搬。”</p><p data-pid="9uZtK_iB">　　这里位于大学城附近，物价低，附近的地铁线直达公司，十分便利。</p><p data-pid="J-So66CR">　　但为了避免不必要的矛盾，我理智说：“你放心，我跟林小姐，不会有交集。”</p><p data-pid="1PCEE5fo">　　跟你，亦不会。</p><p data-pid="MY41688u">　　我在心里默默地说。</p><p data-pid="NgDHAnij">　　“你最好言而有信。”</p><p data-pid="JHZ1cMY9">　　周宗宣递给我一个警告的眼神后，摔门而去。</p><p data-pid="xKY2BMc_">　　我愣在原地，心口有些堵。</p><p data-pid="Xz0rq_nY">　　聒噪的手机铃声打断了我的思绪。</p><p data-pid="SYTfJWl-">　　电话来自老板兼好友吴凌。</p><p data-pid="eHZ4_Dvv">　　“准备一下，明早跟我一起去见新的投资方。”</p><p data-pid="0oI0rPNO">　　三十岁的女强人中气十足的声音从听筒里冒出来，砸掉了我心口多余的杂绪。</p><p data-pid="jKPzzeWH">　　想着每个月的账单，我一秒回到现实。</p><p data-pid="p0GI0NPH">　　然而当吴凌的那辆奔驰G500停在荣域资本楼下时，我整个人就不淡定了。</p><p data-pid="QLgb9WaN">　　荣域资本，投行圈的新晋黑马，创始人，周宗宣。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="78QY5R_R">第2章给她镀金</p><p data-pid="hKthEouU">　　下车前我从吴凌口中得知此次面见大佬的机会是她昨晚干了二斤白酒拿来的。</p><p data-pid="hU_l5cj3">　　在事业面前，她一向豁得出去。</p><p data-pid="ozysg7Zn">　　事实上这两年我也偶尔会从财经新闻上看到周宗宣的身影，什么眼光精准，从无败绩之类，特别是半年前接手某互联网大厂的案例，更是让他在整个投资圈名声大噪。</p><p data-pid="Ig1SoeRv">　　昔日的金融系才子成长为资本圈红人，在意料之内，也在情理之中。</p><p data-pid="MuHnwWNy">　　这也是他昨晚在校友会上备受追捧的原因之一。</p><p data-pid="eZJsR1VF">　　按道理来说，我这个见不得光的前任，应该能避则避，可看着吴凌脸上厚厚的粉底，我还是硬着头皮上了楼。</p><p data-pid="m5ganso1">　　我想，我们毕竟是名不见经传的小游戏工作室，周宗宣应该没那个时间亲自接待。</p><p data-pid="lIO1zzQG">　　事实证明我的猜测是正确的。</p><p data-pid="GLjHLYf9">　　会议室内，三名穿着光鲜亮丽的负责人整齐的坐成一排，耐心的听着我跟吴凌的讲解。</p><p data-pid="FjRlWNAu">　　提问，应答，整个流程下来已经是两个小时后的事情了。</p><p data-pid="5aJjVKMG">　　其中一名负责人送我们到楼下，吴凌轻车熟路的跟他约饭，我则站在一旁赔笑。</p><p data-pid="MBYCbkf2">　　突然，一个甜腻的声音传到我的耳中：“孟学姐，真的是你呀？”</p><p data-pid="BJ4-1R9O">　　我转过身，一眼就看到了站在不远处的周宗宣和林西西。</p><p data-pid="pWe-jjgL">　　周宗宣一身正装，裁剪得当的西装把他整个人衬托的更加高大挺拔，加上那完美的侧颜和轮廓分明的五官，好看的让人挪不开眼。</p><p data-pid="sjG0YjzG">　　他身侧的林西西身着水蓝色衬衫配黑西裤，稚嫩中带着一丝娇俏。</p><p data-pid="LPOaPfVT">　　仔细瞧的话，男人腕上的蓝宝石袖口，恰好跟林西西的蓝色耳钉相衬。</p><p data-pid="RkbdaI8S">　　般配的很。</p><p data-pid="c-Fu_EJN">　　如果忽略掉周宗宣那双瑞凤眼里一闪而过的不快的话。</p><p data-pid="fmcVFozu">　　距离近了，林西西好奇的眼神落在我脸上：“孟学姐，你们是来谈合作的吗？”</p><p data-pid="m8wy1tCf">　　还挺聪明。</p><p data-pid="pZDbsTlW">　　吴凌机灵的嗅出一抹异常，上前一步，把手伸到了周宗宣面前，笑道：“周总，久仰大名，我常听晴晴提起你，今日有幸见到本人了。”</p><p data-pid="-1t2nHqf">　　这是吴凌的常用台词，但今天，只怕她要碰一鼻子灰了。</p><p data-pid="C4S1YSUK">　　这不，周宗宣只是淡淡的看了她一眼，目光便越过她看向我，冷嗤道：“是吗？”</p><p data-pid="g-klcZl_">　　语气里明显带着讥诮。</p><p data-pid="PvVEyI58">　　我回想昨晚自己信誓旦旦的模样，有些无地自容。</p><p data-pid="qsu3UC7o">　　“学姐你们还没吃饭吧？”林西西态度热情，“我们公司的伙食可是出了名的好，要不吃了再走？”</p><p data-pid="LwP8_TiX">　　我这才意识到，周宗宣已经把林西西安排在了他的公司。</p><p data-pid="KWgz3wmI">　　这对一个还没毕业的大四学生而言，是多么难能可贵。</p><p data-pid="slQjr7lQ">　　他已经护她如此。</p><p data-pid="xdxLxkOn">　　我想着以前，自己厚着脸皮去图书馆找他，也只会被他安排在对面的位置上。</p><p data-pid="KtRFM9WE">　　生怕辱了他高岭之花的人设似的。</p><p data-pid="w49OQ9o2">　　而那时的我，还以此为傲，把它当做一份殊荣。</p><p data-pid="p_h2mqcu">　　“不了，”我试图找回自己的声音，“等会我们还有事，先告辞了。”</p><p data-pid="PobPEtr6">　　说完我给吴凌递了个眼神，却看到了她脸上那副恨铁不成钢的表情。</p><p data-pid="j8Ftq3nx">　　上车后，吴凌冷着一张脸看着我：“不解释解释？”</p><p data-pid="Vp0t3i9C">　　“他不会投我们的，”我叹了口气，“我不想你白费心思。”</p><p data-pid="qDfKj0j0">　　吴凌皱眉，迟疑了两秒后，张大嘴巴道：“不是吧晴晴，你那个渣前任，是……是周宗宣？”</p><p data-pid="dsaT08sO">　　到底是瞒不住了。</p><p data-pid="0281GXSa">　　“完了，”吴凌得出结论，“万一周宗宣看了我们的项目书……”</p><p data-pid="pOjRXknR">　　我跟吴凌对视了一眼，这才意识到问题的严重性。</p><p data-pid="PGWaY9BF">　　因为在我们的恋爱游戏里，主角之一的金融系学神男主是舔狗人设。</p><p data-pid="8qJIVjbf">　　怎么舔都舔不到女主的那种。</p><p data-pid="cyOTkMdw">　　项目前景堪忧。</p><p data-pid="aoguE34d">　　我现在只希望周宗宣能一刀切，看也不看就把项目书扔到垃圾桶，至少我们不会落得一个故意找茬的名头。</p><p data-pid="yzo6Pirv">　　以周宗宣如今在投资圈的地位，只要他想，我们确实会寸步难行。</p><p data-pid="U8g4eY6W">　　这对于债台高筑的我们来说，无疑是雪上加霜。</p><p data-pid="u7a2ccbF">　　风平浪静的过了一下午，我跟吴凌渐渐恢复理智，决定继续找投资方。</p><p data-pid="p0AUSB1S">　　晚九点，我神色萎靡的回住处，刚下电梯，远远地就看到一人。</p><p data-pid="3mvw3dUS">　　走廊昏暗，男人抱着手臂靠在一旁，表情隐藏在黑暗中，指尖却露出一抹猩红。</p><p data-pid="iS8Sz8vW">　　是周宗宣。</p><p data-pid="lzfzwa5m">　　感应灯应声亮起，我跟周宗宣的视线在空气中交汇。</p><p data-pid="WA8yoE46">　　四周弥漫着呛人的烟味。</p><p data-pid="Eyjr55qb">　　我看着他，和气道：“是巧合。”</p><p data-pid="6lvC5hBC">　　周宗宣没说话。</p><p data-pid="epYP2qxi">　　无形的压迫感扑面而来，我继续解释：“我们已经在找其他资方，请周总放宽心。”</p><p data-pid="ZNYJj6Rs">　　我不怕得罪周宗宣，但我得替整个公司着想。</p><p data-pid="reIZiAFZ">　　果然，听我这么一说，周宗宣浑身上下的戾气瞬间淡了些许。</p><p data-pid="_9kUwJVs">　　我没再多言，伸手去开门，下一秒，却听到周宗宣说：“项目，我们可以投。”</p><p data-pid="SCbPBTN6">　　我手上一滞，心口不自觉的闪过一抹异样。</p><p data-pid="xqcYHbE9">　　看来，他已经看过项目书了。</p><p data-pid="RKcCNlZX">　　但为什么呢？</p><p data-pid="sAGFFRlR">　　周宗宣不缺大项目，真要合作，完全可以先联系吴凌，他何必不辞劳苦的站在这？</p><p data-pid="pfeVvZub">　　我低垂着眼，想问，却不知道如何开口。</p><p data-pid="8DA53FLP">　　我猜事情没那么简单。</p><p data-pid="TL5qzD6y">　　果不其然，紧接着，我又听到周宗宣说：“但我有一个要求。”</p><p data-pid="U9dy8bb-">　　我猜对了。</p><p data-pid="yIRvMZQs">　　迎上周宗宣的目光，我客套道：“周总请讲。”</p><p data-pid="73O6-BE9">　　“西西的毕业设计需要一个项目，这款游戏，我希望她也能参与。”</p><p data-pid="ngytkrCQ">　　原来，是想拿我们所有人的心血给林西西镀金呢。</p><p data-pid="iZa-9wV8">　　我蜷了蜷手指，又松开，说：“明早我会跟吴总汇报。”</p><p data-pid="RZeryVTi">　　我只是技术入股，总不能因为个人原因就拒绝周宗宣抛来的橄榄枝。</p><p data-pid="V7qmaYTd">　　而且，我们缺钱。</p><p data-pid="8elfcRD1">　　很缺。</p><p data-pid="QIlvhDL8">　　似没料到我会如此从容，周宗宣淡淡看了我一眼后，简短的应了一声。</p><p data-pid="QZhS3j5U">　　一般他露出这幅表情就代表谈话结束了。</p><p data-pid="C7nMod0-">　　我识相的进门，没再多说一个字。</p><p data-pid="x9MrhhFx">　　门外，脚步声渐渐隐没，我蹲下身，将脸埋在膝盖里。</p><p data-pid="jJu68IM_">　　翌日一早，我将荣域资本愿意投钱的消息告知了吴凌。</p><p data-pid="YZCNGE3a">　　吴凌一整个懵住，半晌才来了一句：“渣男的人脉也是人脉啊。”</p><p data-pid="RSvFsBPO">　　我哭笑不得，随即提了周宗宣的要求，吴凌听完拍了拍我的肩膀，安抚道：“想想两百零八平的大平层，再想想会所里那些男模，这个钱，得拿。”</p><p data-pid="x2CcAjGq">　　我务实的点点头：“到嘴的鸭子，得吃。”</p><p data-pid="DkR1k5GP">　　于是我跟吴凌又来到了荣域集团。</p><p data-pid="oRxQwh6n">　　这一次，前台领着我们去了顶层的总裁办。</p><p data-pid="MNCrAEJy">　　推门进去前，我隐约听到了女孩铜铃般清脆的笑声，抬眼一看，林西西正乖巧的坐在周宗宣身旁，放肆的笑。</p><p data-pid="2XzQmpdp">　　见我们进来，她立即拉开和周宗宣的距离，羞涩道：“我先出去了。”</p><p data-pid="dWkN7z5m">　　“不用，”周宗宣叫住她，目光落在我跟吴凌的脸上，说：“跟你的新同事打个招呼吧。”</p><p data-pid="QA9vjZWq">　　“新……新同事？”杏眸里是一闪而过的诧异，倏忽间又蓄满了委屈，林西西小声道：“学长是嫌我笨了吗？”</p><p data-pid="T63hvfUN">　　“想什么呢，”周宗宣温声回应：“你不是愁毕业设计没思路？现在有了。”</p><p data-pid="Fk5M8i16">　　林西西抬起头，一脸茫然。</p><p data-pid="YNUJ6NbU">　　吴凌恰到好处的伸出手，说：“是的林小姐，欢迎你加入《恋爱物语》的大家庭。”</p><p data-pid="Cwu_glhZ">　　林西西欣喜的望向周宗宣，百感交集道：“学长，你对我真好。”</p><p data-pid="1hlHDy-d">　　看得出来，这份意外惊喜让小姑娘十分感动。</p><p data-pid="zd3T3g_c">　　我也挺意外的。</p><p data-pid="uEPKsAK8">　　回想过往的六年，我也没少给周宗宣创造各种惊喜，纪念日，生日会等，并乐此不疲。</p><p data-pid="Oe3LNtZV">　　现在，他也算上道了。</p><p data-pid="E1meThAB">　　只是周宗宣前后的矛盾做法让我有点儿迷惑，不过在金钱面前，这些都不值一提。</p><p data-pid="qFUqyyF6">　　周宗宣投了五百万。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="-StPrnH_">第3章老婆</p><p data-pid="7x0wvHqj">　　财政危机勉强解除，整个工作室都松了口气。</p><p data-pid="lsijm2ZL">　　为了以示重视，林西西来上班的第一天，吴凌就给她安排了迎新会。</p><p data-pid="JhqEOAwC">　　团建地点从几百块的KTV换成了香格里拉大酒店。</p><p data-pid="rbD1wwYw">　　公司八个人全部到场。</p><p data-pid="Pt5qVxLr">　　等着她。</p><p data-pid="EXRYqDT3">　　吴凌无聊的朝嘴里塞了一块甜点，说：“到底是被偏爱的小公主，还要回去换衣服，啧。”</p><p data-pid="14pz-67h">　　“那是财神爷。”我实话实说。</p><p data-pid="wyTOnn5I">　　“说是来工作，看来得供着。”</p><p data-pid="6hae9tkb">　　我隐约间有种不好的预感。</p><p data-pid="eMjfngwD">　　正出神时，厅外传来了动静，我随着众人的目光看过去，只见穿着嫩粉色纱裙的林西西宛如公主一般挽着周宗宣出现在大家的视野中，夺人眼球。</p><p data-pid="BO_3b4lW">　　吴凌调侃：“真财神爷来了。”</p><p data-pid="7zU0W9kG">　　我没想到周宗宣会来。</p><p data-pid="whbXq0Bn">　　我一直以为，他是不喜热闹的。</p><p data-pid="GciaMnG3">　　大学期间，院里系里经常会有各种活动，哪怕是校领导出面，周宗宣也一样避而远之。</p><p data-pid="Tf_BJMco">　　高冷中甚至带着些不合群。</p><p data-pid="vdrPklOL">　　每每这时候，都是我去校领导那说好话，现在想想，还真是多此一举。</p><p data-pid="JHi5lUsf">　　一饮而尽了杯中的酒，我快步迎上前去。</p><p data-pid="9MlcM_l4">　　“抱歉啊大家，学长知道我要参加迎新会，一定要送我过来。”</p><p data-pid="5xah6vBR">　　少女的娇羞带着一丝软糯，任谁都发不起脾气。</p><p data-pid="30y4ncxQ">　　我客气道：“周总大驾光临，是我们的荣幸。”</p><p data-pid="iz5oaBDO">　　毕竟现在能跟周宗宣站在一起的非富即贵。</p><p data-pid="pzXihFub">　　吴凌听我这么一说，附和道：“晴晴先前就想邀请周总，但又怕周总日理万机，这不，巧了。”</p><p data-pid="S6UZCLNW">　　这姐姐，善意的谎话真的是张口就来。</p><p data-pid="se7msvYh">　　我心虚扯了扯嘴角，却意外撞上了周宗宣投来的探究目光。</p><p data-pid="YSWYT3R5">　　我更心虚了。</p><p data-pid="g82OFXy_">　　急中生智，我给主持使眼色。</p><p data-pid="2INDnC8-">　　迎新会正是开始。</p><p data-pid="sOzu1n28">　　吴凌在暖场方面一直天赋异禀，三言两语，就把氛围给烘托起来了。</p><p data-pid="WGuryD4V">　　她提议大家一起玩你画我猜的游戏。</p><p data-pid="gwBY7pNQ">　　每次公司活动的必备节目。</p><p data-pid="xq5Eemnp">　　往年七人，除了吴凌这个裁判外，大家会分成三组，如今又多了两人，加一组。</p><p data-pid="hjK4iU4s">　　没错，林西西把周宗宣也拉到了游戏的队伍里。</p><p data-pid="-LGpsjeE">　　小姑娘心性，她满脸写着跃跃欲试。</p><p data-pid="WGkA8lOx">　　抽签分组。</p><p data-pid="zbWYmMHK">　　始料未及的是，我跟周宗宣居然抽到了一组。</p><p data-pid="mEc0kYRx">　　站在我身侧的林西西也注意到了这一点，脸上是肉眼可见的失落。</p><p data-pid="dcS0hXqj">　　我主动避嫌，趁大家没察觉，不动声色的跟林西西交换了纸条。</p><p data-pid="XiB_371q">　　林西西诧异的看了我一眼，开心地翘起了嘴角：“学姐，你真好。”</p><p data-pid="jQKHn6hJ">　　客气了，我在心里默默地说。</p><p data-pid="cg47hS8t">　　让甲方爸爸玩的尽兴也是我们乙方应尽的义务。</p><p data-pid="hb_F_u_T">　　这一折腾，就闹到了深夜。</p><p data-pid="8ykQDTGJ">　　眼看着大家都喝高了，我叫来服务生送上浓茶，一杯杯的递过去。</p><p data-pid="XkzlDvBJ">　　递到周宗宣时，我站在一米之外，安静的看着林西西悉心的替他擦着额角的汗。</p><p data-pid="do3ERMeo">　　男人双眼微闭，背靠沙发，领口的扣子不知何时解开了两颗，露出了精致的锁骨，清贵的轮廓在明暗交错的灯光下，浸着一层疲惫。</p><p data-pid="gXHpTeOg">　　看来是醉了。</p><p data-pid="LQ-a60VZ">　　我不忍打扰，转身欲走，耳边却传来了男人沙哑的呢喃声：“晴晴。”</p><p data-pid="JlZbeyjB">　　我定在原地，双脚跟灌了铅一样无法动弹，又听到周宗宣说：“老婆，别走好吗。”</p><p data-pid="qLWqteVQ">　　一声老婆，让我如遭雷击，心口轰然炸响。</p><p data-pid="BJmnfGEv">　　视线转向周宗宣时，却看到了林西西那张写满错愕的小脸。</p><p data-pid="RcBU_Z2h">　　神奇般的，我们的视线在空气中交汇。</p><p data-pid="5uDpbIVi">　　我提醒她：“周总叫你呢。”</p><p data-pid="9EUEnCrx">　　这种缠绵不舍的语调，肯定不是叫我。</p><p data-pid="X3R-cg5i">　　林西西一愣，嘟嘟嘴，轻轻地刮了一下周宗宣高挺的鼻梁，娇嗔道：“学长，聚会还没结束呢。”</p><p data-pid="n_RqYRsd">　　周宗宣闻声抬了抬眼皮，嘴角噙着一抹笑意。</p><p data-pid="8brKueBW">　　验证了我的猜测。</p><p data-pid="TGSVvGkN">　　送走财神爷已经是半小时之后的事情了。</p><p data-pid="1j8o7kme">　　看着远去的迈巴赫，吴凌用胳膊肘戳我，语气里带着安抚：“今晚辛苦了。”</p><p data-pid="D6w8KXih">　　我半开玩笑道：“来点实在的吴总。”</p><p data-pid="k0jmHZB3">　　吴凌白了我一眼：“出息。”</p><p data-pid="cFHfNxR2">　　说归说，吴大富婆还是贴心的把我送到小区楼下，并暗许我明早不用打卡。</p><p data-pid="W4nTJpvT">　　精神补偿也算是落到了实处。</p><p data-pid="p0wfmHMP">　　可这一夜，我却睡得很不踏实。</p><p data-pid="vxOLetZt">　　梦里反反复复的出现那个身影，在无数个深夜里，紧紧地拥我入怀。</p><p data-pid="twc6O9ow">　　情到深处时，他会掐紧我的细腰，用着诱哄的语气说：“老婆，叫大声点。”</p><p data-pid="OhjZYyKi">　　那是周宗宣不为人知的一面。</p><p data-pid="ohmZlxv2">　　重欲，占有欲极强。</p><p data-pid="PWPwmwuJ">　　却见不得光。</p><p data-pid="xgIFn1Kb">　　我失眠了。</p><p data-pid="D_pUmQWC">　　早高峰，地铁到站，我像沙丁鱼一样涌出人群，却意外的发现无线耳机被挤掉了一只。</p><p data-pid="NhB2G5AL">　　正当我暗自感慨时，一抬眼，就看到了停在不远处的黑色迈巴赫。</p><p data-pid="WbM4Y0om">　　车前，西装革履的周宗宣绅士的打开副驾门，那叫一个体贴入微。</p><p data-pid="Wx_vVbOk">　　片时，身着橘粉色收腰连衣裙的林西西从车里下来，小姑娘神采奕奕，像是晨间飞舞的小蝴蝶。</p><p data-pid="-QVIJ7e4">　　他竟然亲自送她上班。</p><p data-pid="meu2BUfa">　　荣域集团跟我们工作室一东一西。</p><p data-pid="J7fPCWLq">　　这就意味着有起床气的周宗宣得多花一小时通勤。</p><p data-pid="Kek8etwl">　　我想着以前自己每天起早给他做早餐哄他起床的日子，心口不由得溢出一丝苦涩。</p><p data-pid="Tx0OT7CJ">　　人与人的区别，竟这么大。</p><p data-pid="4HssPz0J">　　我打算避开两人。</p><p data-pid="PdNtkYY7">　　可刚抬脚，林西西那软软的招呼声就传到了我的耳中：“学姐，早上好！”</p><p data-pid="cAwX7wtF">　　我没法视而不见，神色平静的走过去，视线在周宗宣脸上一扫而过，礼貌道：“周总早，林小姐早。”</p><p data-pid="nay1Jc5L">　　林西西自来熟：“学姐，叫我西西就好。”</p><p data-pid="TQKr0SDA">　　我简短的应了一声，走也不是，不走也不是。</p><p data-pid="xbbV3Zqd">　　周宗宣似没有立即离开的意思。</p><p data-pid="uYBW_gjq">　　我只能明知故问道：“周总来考察？”</p><p data-pid="Y_ARk5UI">　　一旁的林西西捂着嘴笑：“不是的学姐，学长怕我迷路，找不到新公司的地址，特意送我过来的。”</p><p data-pid="cfXeYCjd">　　跟我猜的大差不差。</p><p data-pid="yUP52IxG">　　我面不改色，客套道：“欢迎周总随时莅临指导。”</p><p data-pid="Kzqwp7c-">　　周宗宣看了眼腕表，幽深的眸子忽然落在我的脸上，语气淡淡：“有劳孟经理在前面带路。”</p><p data-pid="_a1NjXkn">　　不是，周宗宣这是要跟着上楼的意思？</p><p data-pid="2H65tbsa">　　林西西也听出来了，眼神里是藏不住的欣喜：“学长要跟我们一起？”</p><p data-pid="leBtUnV-">　　周宗宣嘴角噙着一抹笑意，嗓音低沉道：“嗯，看看你的工作环境。”</p><p data-pid="B8ajS8wB">　　原来，只把林西西放在我们工作室镀金还不够，周宗宣还在意她的工作日常。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="4qKYoauY">第4章我身边有人了</p><p data-pid="_ZoPG_qx">　　周宗宣的突然到访让所有人大吃一惊。</p><p data-pid="KM3JFVoD">　　彼时熬夜加班的王嘉正顶着一头乱糟糟的头发从茶水间走出来，嘴里还吊着牙刷。</p><p data-pid="GptdMIOL">　　这是我们程序员的日常，但周宗宣见状还是微微蹙了眉。</p><p data-pid="uBrl_iXG">　　理解。</p><p data-pid="-DfIBXH6">　　小工作室，终究不能跟荣域那种大集团比。</p><p data-pid="DzetpnZg">　　我猜周宗宣有点儿后悔把林西西放在这了。</p><p data-pid="OJque7JC">　　林西西本人倒是没在意，指着靠窗的位置说：“学长，这就是我的工位啦。”</p><p data-pid="bfXVseq0">　　周宗宣没吭声。</p><p data-pid="QVrlWN21">　　我顺着他的眼神看过去，只见他的视线落在了林西西对面的工位上。</p><p data-pid="0lMXhuz4">　　那是我平时敲代码的地方。</p><p data-pid="ONoAKEPb">　　办公桌上，除了台式机外，还有一台年代久远的黑色笔记本电脑。</p><p data-pid="6QaK0sHT">　　是周宗宣大二参赛时获得的奖品。</p><p data-pid="FjZU4FG1">　　也是他送我的为数不多的礼物之一。</p><p data-pid="BOkG03YF">　　配置不错，我一直用到现在。</p><p data-pid="9_IuJ2sY">　　“咦，学姐，你这笔记本跟学长的是同款耶。”林西西也察觉到了这一点，瞪着小鹿似的大眼睛看着我，问：“写代码顺手吗？”</p><p data-pid="Gg99Mb8E">　　我不知道周宗宣有同款。</p><p data-pid="J6id0ZCo">　　但为了避免不必要的麻烦，我面上无波道：“旧了，不如新款。”</p><p data-pid="mPTNUbyP">　　我话音刚落，便听到林西西问周宗宣：“学长你觉得呢？”</p><p data-pid="zy9leqRV">　　逐一采访是吧。</p><p data-pid="gws5roaW">　　周宗宣不答反问：“想换笔记本了？”</p><p data-pid="at2U4jjc">　　林西西揉了揉鼻子：“之前那个买的时候没注意配置，被商家坑了。”</p><p data-pid="MMHZ8Rzo">　　“你呀……”</p><p data-pid="y_K7F56N">　　明明是怒其不争的台词，可从周宗宣嘴里说出来，却带着一丝宠溺的意味。</p><p data-pid="zQTms-9t">　　和他本人的高冷形象有些违和。</p><p data-pid="tpCtx_qE">　　“学长是不是又想说我笨了？”林西西嘟嘟嘴，刚准备回应，却莫名的打了个喷嚏。</p><p data-pid="IsGqIlJk">　　周宗宣紧张上前，关切道：“感冒了？”</p><p data-pid="N9ZJgvTI">　　林西西吸了吸鼻子，眼神里闪过一丝惶恐：“糟糕，可能花粉过敏……”</p><p data-pid="eQoeF2WL">　　她的话还没说完，又连打了两个喷嚏。</p><p data-pid="E6STBnvY">　　我安抚的话还没来得及开口，就听到周宗宣说：“马上把这些没用的花草处理掉。”</p><p data-pid="UOcNsMyi">　　周宗宣指的是窗口处摆放的多肉绿植们。</p><p data-pid="6nTLZpo7">　　那可是吴凌的宝贝。</p><p data-pid="BLa46klb">　　我为难道：“周总，这些多肉已过了花期，你看……”</p><p data-pid="uNvrKUSg">　　“我不想再说第二遍。”周宗宣打断了我的话，态度坚决道：“再添一个空气净化器。”</p><p data-pid="vhRoyM7p">　　我顿时哑口无言。</p><p data-pid="ssQztM91">　　林西西站在一旁解释：“学长，孟学姐也不知道我花粉过敏，不然也不会把我安排在这了。”</p><p data-pid="XjOgKGIq">　　她指的是窗口的位置。</p><p data-pid="IMIDlz1l">　　那个我认为采光极佳，隐私度高，在整个办公区当之无愧的最佳工位。</p><p data-pid="en2Mt4Qq">　　我看着小姑娘无辜的眼神，短暂的思考后，开腔道：“是我们考虑不周，这样，右侧的办公室平时也没人，要不就让林小姐去那里办公吧。”</p><p data-pid="ObeMU_dH">　　站在一旁的王嘉马上接话：“西晴姐，不合适吧？那可是吴总留给你的办公室。”</p><p data-pid="xnKe6QEG">　　他意思是说林西西还不够格。</p><p data-pid="amYRMhOe">　　林西西也听出来了，摇摇头，拒绝道：“我没事的学姐，吃两粒过敏药就好了，我毕竟是新人，哪有坐办公室的道理。”</p><p data-pid="dKUtdQsH">　　道理是人定的，有周宗宣这个投资人在，道理就通了。</p><p data-pid="fn_AAqB7">　　果不其然，下一秒，周宗宣便拿定了主意：“就这么办吧。”</p><p data-pid="CbjacRF4">　　林西西怯怯的看向周宗宣：“学长，这不合适的。”</p><p data-pid="jpDNBVKa">　　深不见底的黑眸突然瞄向了我，我听到周宗宣用着不咸不淡的语气问：“孟经理，你说呢？”</p><p data-pid="Nm31_wpA">　　我掩饰极好的情绪在这一秒忽然有了一丝裂缝，我笑了笑，说：“就按周总说的办。”</p><p data-pid="QkeA6l6w">　　如周宗宣所愿，林西西搬进了办公室。</p><p data-pid="vjWW2Jiv">　　匆忙赶来的吴凌把我叫到楼下咖啡厅，吐槽道：“这哪里是拿投资，分明是窝囊费。”</p><p data-pid="ruGvtzKo">　　我从容道：“一间办公室而已，不至于。”</p><p data-pid="-InK3MXd">　　吴凌抿了口咖啡，愁眉不展道：“你就不怕这只是个开始，这让我怎么放心出差哦。”</p><p data-pid="XZIlJn3R">　　我避重就轻：“别忘了，周宗宣是投资人，他会让自己的投出去的钱打水漂吗？”</p><p data-pid="ig57RQse">　　林西西亦不会。</p><p data-pid="74-qRrXW">　　她还需要拿这个项目去应付毕业设计呢。</p><p data-pid="_a8EZ7nI">　　再说人家是资方，找点事情也很正常。</p><p data-pid="kp9ag9Pg">　　回办公室后，我把王嘉和林西西叫来开会，神色如常的安排工作。</p><p data-pid="dWkpXRYn">　　王嘉听完后立马展开工作，林西西却咬了咬唇，一副欲言又止的模样。</p><p data-pid="Q0ijXI_o">　　我看着她，问：“有问题？”</p><p data-pid="ODa76Bn3">　　“学姐，我没有前端搭建的经验。”</p><p data-pid="qYM6aaiY">　　我略感诧异，按理说软件专业的学生在校内会有各类实践，于是从桌上拿出一本相关书籍，说：“你先看，不懂的再问我。”</p><p data-pid="bP8vtiCm">　　林西西轻轻地应了一声，转身回办公室。</p><p data-pid="pMMIjbjJ">　　我也投入到了工作之中。</p><p data-pid="uyjQYpi_">　　这一忙，就忙到了华灯初上，匆匆收拾完桌面后，我便出发了。</p><p data-pid="4okei95B">　　我得赶在商场下班前过去一趟，买净化器。</p><p data-pid="t8fm0DtF">　　商场人来人往，我刚从观光电梯下来，耳侧却忽然响起了一声呼唤。</p><p data-pid="86kNoIyW">　　“晴晴。”</p><p data-pid="9GdMtsqn">　　我疑惑转身，看到了站在两米之外那个身着暗红色丝绒收腰礼裙的中年女人。</p><p data-pid="sRxdZFsE">　　我一眼就认出了她，沈华兰。</p><p data-pid="6oYGcarA">　　周宗宣的母亲。</p><p data-pid="UUP2Xqns">　　两年没见，她俨然已经是一副贵妇打扮了。</p><p data-pid="y8MGSFmb">　　视线相撞，她快步走到我面前，僵硬的扯了扯嘴角，问：“什么时候回的京港？”</p><p data-pid="YZF_I9zx">　　我平淡道：“有些日子了。”</p><p data-pid="cut-J5sO">　　“那还走吗？”</p><p data-pid="x-rziBmY">　　说完她自己也觉得尴尬，解释道：“阿姨身边有几个优秀的男孩子，你要是不走，我可以帮你物色一个，你知道的，阿姨一直很喜欢你。”</p><p data-pid="FeW3eF5x">　　我心下了然。</p><p data-pid="u6cajFO4">　　如此急迫的模样，原来是怕我继续纠缠她儿子啊。</p><p data-pid="gLxhlp9H">　　也是，当初我有多稀罕周宗宣，就有多费心思讨好沈华兰。</p><p data-pid="x99hMbey">　　婆媳本无缘，全靠我嘴甜。</p><p data-pid="VWsJwi2X">　　她对我心存警惕也在情理之中。</p><p data-pid="ZXrrwjrQ">　　理解归理解，可看着往日里以慈祥形象的长辈一脸警惕的望着自己时，我的心口还是不由得溢出一股酸涩来。</p><p data-pid="tT6v2gal">　　她大概还不知道我跟周宗宣合作的事。</p><p data-pid="xp5vYxL-">　　也不知道周宗宣已经有了林西西。</p><p data-pid="BeYUXFHu">　　那才是他捧在掌心的宝贝。</p><p data-pid="jeMmUzia">　　“晴晴？”沈华兰见我没吭声，用着试探的口吻道：“你跟宗宣……”</p><p data-pid="EZ6Q40sK">　　“阿姨，不劳您费心了，”我打断沈华兰，迎上她的目光，谢绝道：“我身边有人了。”</p><p data-pid="NDoD2Xbj">　　看吧，跟了吴凌两年，我睁眼说瞎话的本事也见长了。</p><p data-pid="adWIYH0V">　　沈华兰听到这话明显松了口气，但下一刻，她原本轻松的脸颊上却莫名的闪过了一丝慌乱。</p><p data-pid="BdbaT7tl">　　“宗宣……你怎么提前过来了？”</p><p data-pid="_9db-h9n">　　我顺着沈华兰的眼神望过去，果然看到了站在几步之遥的周宗宣。</p><p data-pid="8VdsQIzI">　　男人身着笔挺的燕尾礼服，浑身上下裹着一层寒意，像是从画报里走出来的冷傲男神，品貌非凡。</p><p data-pid="8-cvABSZ">　　正目不转睛的盯着我。</p><p data-pid="KWvU5p7j">　　但嘴角，却噙着显而易见的讥诮。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="motcVW02">第5章新款</p><p data-pid="lo8eghyZ">　　“宗宣，你说巧不巧，”沈华兰结结巴巴的开口，“晴晴回京港了，还交了男朋友。”</p><p data-pid="ymScLwL0">　　长辈就是长辈，挺会掐重点的。</p><p data-pid="St8ILH0_">　　但这个话题并没有引起周宗宣的兴致，他只是淡漠的看了眼腕表，提醒道：“拍卖会快开始了。”</p><p data-pid="rLv6TcKD">　　“哎呀，差点儿忘了正事，”沈华兰热情的拉住我的手，说：“晴晴，改天我请客，把你男朋友也带过来让阿姨把把关。”</p><p data-pid="gIffrFwU">　　客套话，我没放心上，只是敷衍的点了点头。</p><p data-pid="2Kw2mut-">　　但沈华兰似乎觉得还不够，嗔了周宗宣一眼，说：“你倒是说句话啊。”</p><p data-pid="SKa4NbDF">　　周宗宣冷嗤一声：“你们很熟？”</p><p data-pid="pbRk9kxa">　　气氛陡然降到了冰点。</p><p data-pid="T_dUDkJc">　　但周宗宣说得对，没有他，我跟沈华兰根本不会有交集。</p><p data-pid="s9vD-hcD">　　我自己给自己找台阶：“阿姨，周总，我还有事，先告辞了。”</p><p data-pid="Fz8JIMPe">　　这话我憋了好一会。</p><p data-pid="fp79Dmfc">　　财神爷的面子已给足，我淡定离开现场。</p><p data-pid="28NdSdXt">　　隐约间，我听到沈华兰问：“晴晴怎么叫你周总？”</p><p data-pid="hVUfjYw_">　　语气里藏着试探。</p><p data-pid="pRiLBsyz">　　我揉了揉突突的太阳穴，默默地走向家电区。</p><p data-pid="jENSTC2c">　　买好空气净化器已经是半小时后的事情了，商家人不错，愿意免费送货上门，我这才安心下楼。</p><p data-pid="OR2_2d0C">　　电梯经过三楼美食区时，一群人浩浩荡荡的走过来，为首的竟是班委严冬。</p><p data-pid="FbYFK2su">　　他上身着黑色翻领夹克配白T，下身搭配了一条暗色系的休闲裤，加上脸上挂着那副银丝眼镜，整个人看上去颇有几分人夫的既视感。</p><p data-pid="o7UbkjZ_">　　事实上他大学毕业后并没有去大厂，而是留校任教授一职。</p><p data-pid="D-G0GUPg">　　如果我没猜错，围绕他四周的那几位，应该都是他的学生。</p><p data-pid="upBHL5s4">　　他一向人缘极好。</p><p data-pid="ob_KhZqp">　　我正犹豫着要不要上前跟他打招呼时，严冬也看到了我。</p><p data-pid="0ISLNKaD">　　他快步上电梯，笑着说：“西晴，这么巧。”</p><p data-pid="k2LpEnjP">　　和他同行的几名小年轻也跟了上来，一双双眼睛落在我的脸上，其中一位打趣道：“严教授，艳福不浅啊。”</p><p data-pid="lmYUPjkN">　　“别闹，”严冬态度谦和，解释道：“是我同学，按辈分，你们都得喊一声学姐。”</p><p data-pid="T0BWpoJG">　　小伙子们马上端正态度，整齐道：“学姐好。”</p><p data-pid="vOVi9fUE">　　我被他们的滑稽模样给逗乐了。</p><p data-pid="_4_tmzrC">　　电梯抵达一楼，一群小伙子跟商量好似的逃之夭夭，临走前还不忘拜托我照顾一下他们的严教授。</p><p data-pid="B1ObSH9-">　　严冬喝酒了。</p><p data-pid="GPYKK3xh">　　我们一起去了停车场，我替他叫了代驾。</p><p data-pid="GmWxIFYT">　　严冬见我没上车，问：“不一起吗？”</p><p data-pid="xE_-rlsA">　　“不顺路，”我实话实说，又怕他有负担，“已经叫车了。”</p><p data-pid="DtzFKpYy">　　严冬轻轻地叹了口气，又从车里下来，但手里却多了一个米白色小格纹的商务手提包。</p><p data-pid="zxZLsf97">　　“上次网站搭建，多亏你及时出手，”他看着我，认真道：“算是谢礼。”</p><p data-pid="ZtAPeC7F">　　也不知是不是巧合，手提包的款式刚好跟我的笔记本大小相衬，但它做工精细，皮质上乘，一看就价格不菲。</p><p data-pid="YZMyRoDu">　　我谢绝道：“这不合适，我也没帮上什么忙。”</p><p data-pid="Zf_-id_P">　　“看不上？”严冬语气失落，自责道：“看来我在选礼物方面确实不合格。”</p><p data-pid="NRrTlF2H">　　“我不是这个意思。”</p><p data-pid="oO3wE2rk">　　“那就拿着，”严冬少见的态度强硬，“这次是我唐突了，下不为例行不行？”</p><p data-pid="hXX0z1sv">　　说完他又露出了一个要好好反省的表情。</p><p data-pid="0GUgKSDi">　　我自知人情难还，没再让他为难，勉强的点点头。</p><p data-pid="0vPLWgdX">　　严冬这才放心上车，临走前叮嘱我，到家一定要给他发信息。</p><p data-pid="Ryiwgu_r">　　看着黑色宝马消失在视线里，我转身朝地铁口走，谁知刚走两步，耳旁却响起了打火机的脆响声。</p><p data-pid="mVvpLwji">　　我疑惑的瞄了一眼，却看到了站在不远处的周宗宣。</p><p data-pid="efNfnpKo">　　烟雾飘渺中男人的脸明昧不定。</p><p data-pid="AqCarMIW">　　我默不作声继续向前，耳旁却传来了男人幽冷的声音：“这就是你选的新款？”</p><p data-pid="GKPslXYs">　　周宗宣说这话时视线刚好落在我的手提包上。</p><p data-pid="mTbSUD7Y">　　眼神锐利。</p><p data-pid="Rhvw1_rG">　　我不知道周宗宣是什么时候出现的。</p><p data-pid="FMjObWOZ">　　又为何要对一个手提包品头论足。</p><p data-pid="KtHg3JZ_">　　不解中，我的脑海里忽然闪现出一早在工作室时林西西问我的话。</p><p data-pid="k_X_DT66">　　我估计周宗宣是误以为我换了新笔记本。</p><p data-pid="-UXzF4mv">　　旧与新，他在介意什么呢？</p><p data-pid="5pMCjfe7">　　我迎上周宗宣目光，平和道：“这好像不归资方管吧？”</p><p data-pid="_0a1jLMz">　　周宗宣神色一顿，猛吸了一口烟后，狠狠地捻灭烟头，转身离去。</p><p data-pid="47-s3aca">　　变脸了。</p><p data-pid="OYYhffMY">　　罪过。</p><p data-pid="TbzXUhsy">　　得罪金主爸爸可不是好事，我应该再忍忍的。</p><p data-pid="3JZyShoM">　　我可不想吴凌出差一趟回来公司被我弄得鸡飞狗跳。</p><p data-pid="HQe_149c">　　翌日一早，我如常上班，没在楼下遇见周宗宣。</p><p data-pid="YgWqFza7">　　我略感庆幸，但很快，这种心情就被一个接一个的同城快递给搅合了。</p><p data-pid="2jrVG_3j">　　“林小姐，您的笔记本请签收一下。”</p><p data-pid="nDcvcpNN">　　“林小姐，你的电脑包麻烦签收。”</p><p data-pid="dKdeACwg">　　“林小姐……”</p><p data-pid="TC0tMdV1">　　当林西西第八次打开快递时，里面竟装的是过敏药。</p><p data-pid="7gZ9WSqY">　　前台小雅最喜凑热闹，指着发件人的名字说：“还是周总吗？天哪，颜值在线还舍得花钱，这是什么绝世男友啊。”</p><p data-pid="53l-BHCa">　　林西西看着堆着跟小山一样的快递，眼神里是藏不住的欢喜。</p><p data-pid="kw8cwaPD">　　她红着脸关上了门，边拆快递边打电话。</p><p data-pid="nsXElaez">　　过道的位置离办公室很近，小姑娘抑扬顿挫的嗓音不受控的钻进我的耳朵里。</p><p data-pid="NwoM4SNQ">　　“学长你也真是的，买这么多，一定花了不少钱吧？”</p><p data-pid="XkSii5r1">　　“那不行的，要不我请你吃饭？”</p><p data-pid="1iCDsAr8">　　电话那头不知道回了什么，林西西不由得捂着嘴笑：“学长又取笑我。”</p><p data-pid="DKxV-hTh">　　我低头看了眼面前已经被磨光了字迹的笔记本，自嘲的扯了扯嘴角。</p><p data-pid="_cgSHQlA">　　舔了六年才得到一个不稀罕的奖品，跟精挑细选给女朋友的礼物，终究是没法比。</p><p data-pid="fdHMbv1z">　　午休后，王嘉将昨晚完成的代码交给我检查，我思索片刻，敲了林西西的办公室门。</p><p data-pid="WeIAL47X">　　推门进去时，林西西正在摆弄面前的新笔记本。</p><p data-pid="dm_mqNTm">　　玫瑰金，名牌，最低配置也是一万起。</p><p data-pid="jlqpJ3Js">　　周大总裁果然是财大气粗。</p><p data-pid="rRTnFgZu">　　见到我，林西西眼神里闪过一抹讪讪，解释道：“抱歉啊学姐，我也不知道宗宣学长怎么一声不吭送了那么多礼物，没打扰到大家吧？”</p><p data-pid="qH9Qh0It">　　“昨天交给你的工作进行到哪一步了？”</p><p data-pid="XCmXLuww">　　林西西瞪大双眼，露出了一脸无辜的表情：“对不起啊学姐，新笔记本刚做完系统，代码我还没来得及写。”</p><p data-pid="Gtkit9xf">　　意料之内。</p><p data-pid="RVtXeNyG">　　“那，下班前能写一段吗？”</p><p data-pid="yx6-ZVmJ">　　林西西面露难色：“我尽量。”</p><p data-pid="j31Aufsh">　　她说尽量，我也没催促，但回到工位后，我还是把她的工作接过来了。</p><p data-pid="ZNzG1Ht8">　　怎么说呢，她虽是资方的人，但也是我们技术部的一份子，既然要挂名，那也不能有名无实。</p><p data-pid="Arc5pUSo">　　简单的程序还是要写一写的。</p><p data-pid="nrpIOwKY">　　免得时间久了会引起其他同事的不满。</p><p data-pid="U9v4Lp6b">　　现在她没完成，只能由我来完成。</p><p data-pid="B9k6_u4L">　　这一忙，就忙到了月挂枝头，我扫了一眼时间，已经晚上七点多了。</p><p data-pid="_uffBErG">　　我转身看了眼林西西的办公室，她人竟还没走。</p><p data-pid="HuCA8pcJ">　　正低头回信息。</p><p data-pid="6Kw3MCbE">　　似察觉到了我的目光，林西西起身，抱着笔记本便出了办公室。</p><p data-pid="a7BwV4f_">　　“学姐，我写好了一段，你帮我看看？”</p><p data-pid="AI60bl9E">　　夹杂着讨好的语气。</p><p data-pid="3tYNuP7G">　　反而让我有些不好意思了。</p><p data-pid="NdwLpmT4">　　我快速的浏览完代码，一时语塞。</p><p data-pid="BzLzyjGH">　　我想可能是我对她要求太高了。</p><p data-pid="Vk8XutgI">　　刚准备开口，面前的小姑娘蓦的眼圈一红，说：“学姐，我是不是太笨了？”</p><p data-pid="0wFXDShD">　　她话音刚落，工作室的大门突然毫无征兆的打开了，我抬眼望去，一眼就看到了站在门口的周宗宣。</p><p data-pid="8FCOkpgv">　　男人的视线第一时间落在林西西脸上，林西西也诧异的看着他，下一秒，女孩睫毛低垂，轻轻地咬了下唇。</p><p data-pid="YAop0owD">　　挺委屈的。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="NzbyACdC">第6章修正</p><p data-pid="W69AFLgg">　　距离近了，我一眼就看到了周宗宣眼底的不悦。</p><p data-pid="UF_I25e_">　　“孟经理，不解释解释？”</p><p data-pid="meSk20Oz">　　倒是一副公事公办的样子。</p><p data-pid="3CObCLG6">　　林西西先我一步开口：“学长，跟孟学姐没关系，是我自己太笨了。”</p><p data-pid="QrsW2kn2">　　小姑娘说完又露出了一副自责的表情。</p><p data-pid="ulTgQXmX">　　“你先去车里等我。”周宗宣温声开口，似是安抚。</p><p data-pid="TuzQts9V">　　林西西第一时间看向了我，像在征求我的意见。</p><p data-pid="Wt1exdR9">　　我顿时哭笑不得。</p><p data-pid="KbgGauzk">　　有金主爸爸在，她哪里要看我的脸色。</p><p data-pid="WKri6Xn_">　　周宗宣见她站着没动，又开腔道：“听话。”</p><p data-pid="Wammqa8o">　　林西西这才乖巧的收拾东西离开。</p><p data-pid="GfY3RXXe">　　少时，我被周宗宣叫进了林西西的办公室。</p><p data-pid="qeHd-kIB">　　他背对着我，视线却在整个办公室内流转，勘探的眸子最后落在了我的脸上，问：“空气净化器还没买？”</p><p data-pid="_yyrDreo">　　他竟细心至此。</p><p data-pid="3WNTJ3qJ">　　我沉声道：“商家说明天送。”</p><p data-pid="ya3vGCaK">　　周宗宣没立即接话，修长的手指在办公桌上轻轻敲打着，半晌出声道：“林西西不是你，她是踩着录取线进的南大，你对她要求不要太苛刻。”</p><p data-pid="vx8MrZ5U">　　苛刻。</p><p data-pid="Eem_zMpI">　　不过只写一段简单的前端代码，在周宗宣眼里就成了苛刻。</p><p data-pid="rRe3Ngtk">　　行，金主爸爸说了算。</p><p data-pid="hZsj8b9M">　　我顿了两秒，理智的问：“那依周总的意思，以后我该怎么给林小姐安排任务？”</p><p data-pid="RdzJJBZW">　　周宗宣闻声抬眸，目光再次与我相撞，严肃道：“今天的事，我不想再看到第二次。”</p><p data-pid="PHwxCxJ9">　　敲打的口吻，伴随着男人坚定的眼神，我这才知道，原来周宗宣全力维护一个人的时候是这样的。</p><p data-pid="uLE-GL7f">　　心口的疼密密麻麻的涌了出来，我听见自己说：“听周总的。”</p><p data-pid="TjIz1giH">　　送走周宗宣时已经晚上八点了，王嘉人还没走，见我一动不动的坐在工位上，关切道：“西晴姐，你不舒服吗？”</p><p data-pid="qtI8KWCv">　　“没。”</p><p data-pid="ohoHoYc2">　　“那脸色怎么这么难看？要不我送你去医院。”</p><p data-pid="tBp8J7nK">　　我摆摆手：“可能是饿了，你先走吧。”</p><p data-pid="WpwEcg7Y">　　王嘉看着我欲言又止。</p><p data-pid="j_H4kpmD">　　周宗宣跟我对峙的时候他就坐在角落里。</p><p data-pid="PH8sxPDb">　　想了想，我又开口道：“真没事，早点回去休息吧。”</p><p data-pid="3hvFHJ2p">　　王嘉这才离开。</p><p data-pid="uqf6lUad">　　我沉寂片刻，安静的打开电脑，代码却越敲越乱。</p><p data-pid="G8ELg5Fw">　　过往的记忆在这漆黑的夜里像藤蔓一样绕在心口上，越绕越紧，裹的我快喘不过气来。</p><p data-pid="oYcubJxA">　　六年，两千多个日夜，或许在周宗宣眼里，是没法跟林西西一点委屈相提并论的吧。</p><p data-pid="dByziS0e">　　我敲了一晚上的代码，又花了时间将整个游戏前后端细分。</p><p data-pid="md_sig4m">　　进度快的话，三个月就能完成搭建。</p><p data-pid="_bLHn19o">　　我只需要再辛苦点。</p><p data-pid="E3vRRCQL">　　林西西在茶水间撞见我刷牙时，杏眸里是一闪而过的慌乱。</p><p data-pid="YvmPnvxR">　　“学姐，你一夜没回吗？”</p><p data-pid="QrbbbGs1">　　我淡定开口：“有一行代码出了点问题，我花点时间给修正了。”</p><p data-pid="S3sYng1W">　　林西西一脸心疼：“这也太辛苦了，等等，我那有宗宣学长寄来的坚果，我给你拿点。”</p><p data-pid="hRY6ld78">　　说完，像只俏皮的小兔子一样闪开了。</p><p data-pid="ZkrAFGIF">　　没心没肺的。</p><p data-pid="WICKJbd_">　　好像昨天的不快根本没发生似的。</p><p data-pid="pjyJLuTk">　　这大概就是被人捧在手心里宠着的样子吧。</p><p data-pid="npyHS8eH">　　不像我，唯一拿得出手的，就是这一堆代码了。</p><p data-pid="YqrqBfnG">　　连续两天，我都沉浸在没日没夜的工作中，直到一通电话插了进来。</p><p data-pid="sg2U9BF8">　　打电话过来的，是沈华兰。</p><p data-pid="5kuIgHYZ">　　“晴晴，明天就是周末了，阿姨知道一家不错的私房菜馆，你跟男朋友一起过来尝尝呗？”</p><p data-pid="mgADPVx3">　　我不知道沈华兰从哪里弄来的我的电话号码。</p><p data-pid="Npq-z0r2">　　当然也清楚她说的请吃饭其实醉翁之意不在酒。</p><p data-pid="G4QHj-0L">　　她还想试探什么呢？</p><p data-pid="Eso7iMLL">　　难不成，周宗宣还没有跟她透露林西西的存在？</p><p data-pid="KZEENt4P">　　不管是什么原因，周家的事，我没兴趣继续掺和。</p><p data-pid="f2Ngcvkd">　　于是我回应道：“抱歉阿姨，明天我还要加班。”</p><p data-pid="Vl-Qwp4N">　　大概没料到我会拒绝，电话那头明显顿了顿，紧接着，我又听到沈华兰抱怨道：“听宗宣说荣域投资了你们的项目，回头我跟他说说，别给你太大压力。”</p><p data-pid="ryyxnaEU">　　这是拿出投资人母亲的身份来给我施压了。</p><p data-pid="M4sK0Z0D">　　我捏了捏眉心，松口道：“阿姨，明晚行吗？”</p><p data-pid="eLaiksEv">　　“好咧，我把地址发给你，记得一定要带男朋友一起过来哦。”</p><p data-pid="aXJRYTH-">　　我哪来的男朋友。</p><p data-pid="s3sqOczR">　　算了，明天见着沈华兰再说吧。</p><p data-pid="UowVKalx">　　周六傍晚，我如约来到了城郊的一处私房菜馆。</p><p data-pid="TWi1RV6O">　　店面装修雅致，古色古香，连端菜的服务生都穿着考究，一看就是个销金的地方。</p><p data-pid="Smpj7NBG">　　沈华兰现在也算是水涨船高了。</p><p data-pid="q63o64Em">　　包厢内，保养得当的女人诧异的看着我，问：“怎么一个人，男朋友没一起吗？”</p><p data-pid="NOJP4EaR">　　“他忙。”</p><p data-pid="hGP49Etb">　　沈华兰收回视线，眼神里闪过一抹狐疑，又开口道：“没事，宗宣还在路上，我们先点菜。”</p><p data-pid="7SAuq9Fv">　　我握着茶盏的手一顿。</p><p data-pid="AF_diOzT">　　周宗宣今晚也过来？</p><p data-pid="mzKPwRDj">　　见我没吱声，沈华兰又递来了一个试探的眼神，说：“晴晴，你们公司跟宗宣有合作，可认识一位叫做林西西的女孩子？”</p><p data-pid="Ef7BxVLq">　　看来我猜对了，周宗宣还没有跟家里正式介绍林西西。</p><p data-pid="fL843Hp2">　　我回答的很官方：“我跟周总不常见面，不清楚呢。”</p><p data-pid="-vKNxU7t">　　沈华兰叹了口气，说：“昨天我去荣域，听前台八卦，说宗宣在设计师那定了一件昂贵的小礼裙，收件人是林小姐。”</p><p data-pid="8MOdr0k_">　　她说完，眼神便瞄向了我。</p><p data-pid="KCm0Vq9p">　　我笑了笑，说：“阿姨，这个事情你可以直接问周总。”</p><p data-pid="Fv_hhIMC">　　别人的私事我管不来，更何况这个人还是周宗宣。</p><p data-pid="X-FFR1L4">　　沈华兰见我说的滴水不漏，吐槽道：“晴晴啊，阿姨这是担心哪，不瞒你说，这位林小姐的人事档案我看过了，家境普通，家里就是个开小吃店的，在校表现也一般，真不知道宗宣看上她哪儿了。”</p><p data-pid="j8K4GnBZ">　　沈华兰的意思很简单，就林西西这样的身份，根本配不上周宗宣。</p><p data-pid="4ko9IogP">　　我也觉得意外。</p><p data-pid="EspSzNXV">　　我一直以为，被周宗宣捧在掌心的女孩子，至少得是京港哪家豪门的千金。</p><p data-pid="CZ09cDJG">　　“看我，”沈华兰见我默不作声，急忙捂了捂嘴巴，说：“晴晴，阿姨没别的意思，来来来，点菜。”</p><p data-pid="EIH10gud">　　我估计她是懊恼周宗宣为什么会选一个连我都比不上的普通女孩子。</p><p data-pid="qOs6GQeK">　　但这世上的偏爱，又哪里讲什么道理呢。</p><p data-pid="n_UG3Erj">　　没多久，周宗宣一身正装进来了，见包间里只有我跟沈华兰两人，脸上明显闪过了一抹戏谑。</p><p data-pid="sGbWTxWy">　　“男朋友没来？”</p><p data-pid="-9LN4PPK">　　像是料定了我在扯谎一样。</p><p data-pid="YauuMKqa">　　我想大概是先前我在这对母子面前的姿态摆的太低了，以至于给了他们一种可以任由拿捏的错觉。</p><p data-pid="DAScfrZD">　　桌上的手机不合时宜的发出了提示音。</p><p data-pid="GYav0Upr">　　我扫了一眼，是严冬发来的消息。</p><p data-pid="YjWCvjyn">　　“明晚有时间吗？听说这部悬疑剧不错，要不要一起？”</p><p data-pid="wqn8Ob2F">　　我攥着手机，轻飘飘道：“下次吧，我一定带他过来。”</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="j_rN7E2e">第7章顺路而已</p><p data-pid="tgBvJV81">　　一顿饭吃的食不甘味。</p><p data-pid="BoCG5Y47">　　我耐着性子陪沈华兰小酌。</p><p data-pid="Bqoup58N">　　周宗宣没有参与其中，整个饭局里，我们一共也没说上几句话。</p><p data-pid="DyqVqIY7">　　倒是他的手机一直震动不停。</p><p data-pid="IYFAcouX">　　周宗宣没恼，反而耐心的回复着，嘴角时不时会露出一抹笑。</p><p data-pid="WFyhwBAd">　　饭菜也没吃上几口。</p><p data-pid="GvekwePY">　　不用猜也知道微信那头的人是谁。</p><p data-pid="IY0e9V1n">　　沈华兰看在眼里，眸中的焦虑越来越盛，趁着周宗宣出去时，跟我吐槽道：“晴晴，你说，宗宣怎么突然间跟走火入魔似的？”</p><p data-pid="pTQqdWMy">　　我能理解。</p><p data-pid="hV-kXgmN">　　毕竟以前的周宗宣，是不会把大把的时间花费在回信息这种事上。</p><p data-pid="JsJAPBI-">　　现在不一样了。</p><p data-pid="BxgvzqT3">　　饭后，周家的司机在餐馆外候着，沈华兰看了一眼还在回信息的周宗宣，叮嘱道：“太晚了，你送晴晴一趟。”</p><p data-pid="h7RqjO1O">　　周宗宣跟没听到一样。</p><p data-pid="sZW_lq6_">　　我自己给自己找台阶：“阿姨，我叫车了。”</p><p data-pid="1shYhhgF">　　沈华兰的眼神里难得闪过了一抹愧疚。</p><p data-pid="-VTkwUlb">　　没一会，餐馆门前只剩下了我跟周宗宣两人，我刚打开打车软件，周宗宣那低沉的嗓音便传到我的耳中：“走吧。”</p><p data-pid="nFVmMZjw">　　我诧异的看向他，这才意识到他是要送我回的意思。</p><p data-pid="GVdLGRic">　　“谢谢周总，我叫车了。”</p><p data-pid="xBkyXDhq">　　周宗宣驻足，漆黑的眸子静静地落在我脸上，用着讥诮的口吻说：“怎么，怕男朋友误会？”</p><p data-pid="DSHbrcKM">　　我没再矫情。</p><p data-pid="kmdgF23O">　　七八十的打车费，能省则省。</p><p data-pid="Sl-R53gg">　　不得不说，豪车的舒适度还是很有竞争力的。</p><p data-pid="HLr0G1pD">　　这不，刚坐上副驾没一会，我的上下眼皮便开始打起架来。</p><p data-pid="T8i-kv64">　　我已经连续两三天没睡个好觉了，整个人在酒精从催促下，恹恹欲睡。</p><p data-pid="OqdudCXt">　　周宗宣不知道怎么就瞧出了这一点，轻声道：“睡吧，到了我叫你。”</p><p data-pid="8GauVngO">　　声音还挺和善的。</p><p data-pid="cEkG0jAp">　　我迟疑的两秒，理智便被睡意夺走了。</p><p data-pid="4mDhyAxE">　　也不知道过了多久，我隐约间听到了手机的震动声，这才微微的睁开眼。</p><p data-pid="7IEBHNiC">　　模糊的视线里，我看到了近在咫尺的周宗宣。</p><p data-pid="X5Wxtqhh">　　正盯着我。</p><p data-pid="XC8-5HCL">　　但那双我再熟悉不过的瑞凤眼中，不再是先前的凌厉和冷漠，而是如水般的温柔。</p><p data-pid="9Lpua1if">　　亦真亦幻。</p><p data-pid="6nMqnKPw">　　鼻尖弥漫着熟悉的皂香。</p><p data-pid="-kR1_4Vw">　　清冽的气息在这样狭窄的空间里不断的侵蚀着我的五感。</p><p data-pid="U72kJUbG">　　我的视线慢慢下滑，这才发现周宗宣原本规整的领口不知何时解开了，露出了一抹冷白的皮肤，隐约能瞧见那平直的锁骨。</p><p data-pid="i5-GEiSV">　　像无数个梦境中那样，他端坐在一旁，禁欲又诱人。</p><p data-pid="Zuba-YUl">　　但既然是梦，为什么男人那双冷的眸，在此时此刻，会忽然闪过一抹艳？</p><p data-pid="TxvtVXTa">　　就像是戒律森严的大佛，忽然生出了某些不该有的念头。</p><p data-pid="_vGz4VOj">　　有些反常。</p><p data-pid="SSrzLhlB">　　夜很静，我们就这样安静地对视着。</p><p data-pid="k43xwzJO">　　可危险的气息像是雨后长出来的霉，在这样的暗夜里，于我心底深处肆意增长，无法遏制。</p><p data-pid="UYU9dRoD">　　我心口轻颤，呼吸越来越重。</p><p data-pid="GI6dXvfL">　　理智逐渐崩塌，下一刻，我的一只手不由自主的扯住了周宗宣的领结，拉近了我们彼此之间的距离。</p><p data-pid="sZcwRlsv">　　反正只是个梦，不是吗？</p><p data-pid="n5tjT-ZV">　　呼吸错乱，我听见自己说：“老公……”</p><p data-pid="i2OXekg1">　　瞬息之间，滚烫的吐息掠过我的脖颈，真实的又不像是梦。</p><p data-pid="2H1L6TI5">　　我后知后觉的往回缩，肩胛却被男人冰凉的指骨给捏住。</p><p data-pid="WhF_jkJo">　　霸道的不像话。</p><p data-pid="NzxzNdSk">　　不对，这不是梦。</p><p data-pid="TBNtYenT">　　我猛地睁开眼，在周宗宣凑过来时，毫不犹豫的别过脸。</p><p data-pid="ykEaUnm6">　　暧昧终止。</p><p data-pid="yCyXmQsg">　　心口急促的心跳像是无形中给了我一巴掌。</p><p data-pid="w6JK_-dc">　　我一秒清醒。</p><p data-pid="k9UBV64x">　　“你手机响了。”</p><p data-pid="liPYHVS2">　　我浑身一震，稍微动弹了下，忽然发现什么东西滑到了脚边，低头一看，竟是周宗宣的西装外套。</p><p data-pid="FZYNbihh">　　我佯装没察觉，盯着手机上闪烁的名字。</p><p data-pid="z7E1JXtm">　　是严冬的电话。</p><p data-pid="yV9MUwhl">　　“不接吗？”周宗宣再次提醒，语气不咸不淡的，“响了好几次了。”</p><p data-pid="cZ2-HhT3">　　我攥紧手机，抬眼看向窗外，这才发现车已经停在了公寓楼下。</p><p data-pid="BSHs7IVD">　　我开口致谢：“今晚有劳周总了，早点休息。”</p><p data-pid="TIJZYtlk">　　“不客气，顺路而已。”</p><p data-pid="7Zmx_rxP">　　他声音很轻，听不出任何情绪。</p><p data-pid="jGSh_xGJ">　　若不是心口如雷的心跳，我甚至怀疑方才的一切只不过是我一个人的错觉。</p><p data-pid="AWiX8_09">　　目光掠过周宗宣时，我看到他点开了一个粉色猫咪头像，用着温柔的语调问：“睡了吗？”</p><p data-pid="G6hSGW8v">　　那头像我在公司群里见过，是林西西。</p><p data-pid="7asNJNiv">　　我这才意识到，周宗宣说的顺路，还真是顺路。</p><p data-pid="AkeBIscJ">　　人家的掌心娇可不就住在我楼上么。</p><p data-pid="zevs6tNm">　　我掐了下手心，默默地下了车。</p><p data-pid="c33YW-Cl">　　不过是个梦。</p><p data-pid="o4k4EWFe">　　须臾，掌心的手机又响了，我定了定神，按下了接听键。</p><p data-pid="6E1jiAQR">　　温润的嗓音夹杂着少有的急躁从听筒里传出来：“西晴，你没事吧？”</p><p data-pid="MaU3G94l">　　我有些懵：“我没事啊，怎么了？”</p><p data-pid="tLdp3dd_">　　“听王嘉说你这两天都在加班，消息也没回，我……”</p><p data-pid="3Rkb8kq-">　　王嘉当初是严冬推荐来工作室的。</p><p data-pid="ohGwhOvA">　　听严冬这语气，估计是怕我过劳死。</p><p data-pid="TCMa1ZyN">　　我想着他席间发来的信息，还有之前送的手提包，心里五味杂陈。</p><p data-pid="yG5kDHjA">　　难得在这偌大的京港，还有个这样的朋友惦记我。</p><p data-pid="rApDVQh4">　　于是我提议道：“明晚你有空吗？我想请你吃饭。”</p><p data-pid="7GzO4GxN">　　“啊？”</p><p data-pid="g9aBQAw6">　　话说出口，我又觉得有些唐突，改口道：“改天也行。”</p><p data-pid="FkbPowW-">　　“就明晚，”严冬语气急切，“你忙完给我发信息，我去接你。”</p><p data-pid="Bh0YbG23">　　翌日下午，严冬如约来到工作室。</p><p data-pid="VGQg-tXR">　　男人身着白色压纹圆领卫衣搭配深棕色休闲裤和白色板鞋，整个人看上去闲适又文艺。</p><p data-pid="VeyUFy8y">　　手里还拎着一个购物袋。</p><p data-pid="gYBo06l3">　　见我还在敲代码，端着一盒蓝莓轻车熟路的进了茶水间。</p><p data-pid="9aRft4j5">　　我收拾桌面准备出发。</p><p data-pid="XBK6maEU">　　就在这时，一则视频电话插了进来，我点开一看，竟是沈华兰。</p><p data-pid="mKgCVpu1">　　这个点了，她打电话给我做什么？</p><p data-pid="PNiRZL_6">　　迟疑了几秒，我还是按了接听。</p><p data-pid="OgcEH8Hg">　　刹那间，沈华兰那急促的语调便从听筒里传来了出来：“晴晴，宗宣糊涂啊，他居然要带着那位林小姐参加今晚的家宴，劝都劝不住。”</p><p data-pid="OYO-kZQo">　　不过是参加个家宴，沈华兰就已经受不了了，那她要是知道周宗宣大笔一挥投了我们五百万给林西西镀金，还不得气坏？</p><p data-pid="sScTRVSe">　　而我还得替周宗宣瞒着沈华兰。</p><p data-pid="6ZYI-4ml">　　说也不是，不说也不是。</p><p data-pid="Vl8GEa54">　　想到这，我心里也不是滋味。</p><p data-pid="-14QpGAf">　　视频那头，沈华兰滔滔不绝：“你帮阿姨劝劝他好不好？这么多年，宗宣也就听过你两句。”</p><p data-pid="j7c5Sdrq">　　我一时语塞。</p><p data-pid="scqxCdhg">　　就在我思考着如何回绝时，严冬忽然端着洗好的蓝莓走了过来。</p><p data-pid="BLugW2kI">　　“西晴，快尝尝。”</p><p data-pid="ihYjNuoD">　　男人修长的手指突然伸到我嘴边，惊得我目瞪口呆。</p><p data-pid="DbA81mqV">　　紧接着我便听到了沈华兰的惊呼声：“晴晴，这就是你新交的男朋友？”</p><p data-pid="30NyG9Ja">　　严冬的流畅的面部线条在这一秒落在了视频里。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="QkaBLh6i">第8章留门</p><p data-pid="iAuOfPMB">　　我反应过来时，急忙切换了摄像头。</p><p data-pid="yYeGMkqK">　　听筒里，沈华兰的声音里明显夹杂着些不可思议：“不好意思啊晴晴，你看，只顾着让你听我这个老人家晴晴叨叨了，这样，我们有时间再聊。”</p><p data-pid="0TCRUvDj">　　也没等我回应，沈华兰已经掐断了线。</p><p data-pid="bXhqx-BS">　　我尴尬的看向严冬，说：“抱歉，周宗宣的妈妈，可能误……”</p><p data-pid="zYmJo7Er">　　“挺辛苦的吧？”</p><p data-pid="vgvKntx4">　　严冬无端的冒了这么一句，语气里带着一丝担忧。</p><p data-pid="7PI0iKZp">　　我抬眸看他，不确定他说的是哪种辛苦。</p><p data-pid="CpN1xqqG">　　工作呢，还是应付前男友的母亲。</p><p data-pid="L6zXr9f0">　　见我没吭声，严冬又递给我一颗蓝莓，说：“缓解眼疲劳的，多吃点。”</p><p data-pid="5-ttl7zS">　　我心里挺不是滋味的，转移话题道：“时间差不多了，去吃饭吧。”</p><p data-pid="8g-jrfox">　　严冬识趣的没再继续这个话题。</p><p data-pid="6JWn9V26">　　日料店里，我看着面前堆叠似小山一样的餐盘，不好意思道：“班委，我难得请客，你多吃点。”</p><p data-pid="oDAdW8kx">　　说完，我客气的将三文鱼推到了他面前。</p><p data-pid="k2Sp19yq">　　严冬扫了我一眼，说：“西晴，你太瘦了，身体是革命的本钱，你想闯事业，体质可不能差。”</p><p data-pid="VRp8GuKH">　　三文鱼又被推了回来。</p><p data-pid="3MbDH8SN">　　我实在拗不过他，说：“那就一起吃。”</p><p data-pid="pMmEnOrE">　　这顿饭吃的还挺愉快的。</p><p data-pid="L4zw36KT">　　但结账时，服务生却礼貌的告诉我，严冬已经买过单了。</p><p data-pid="-oxO3JZq">　　“下顿，下顿你请行不行？”</p><p data-pid="dSxjyNSW">　　他温和又谦逊，边说话，边当着我的面将转账退了回来。</p><p data-pid="xV720Msg">　　我没同意，提议AA，严冬似抓着我的把柄似的笑着说：“我请一顿，你请一顿，也是AA。”</p><p data-pid="ZU85dgcD">　　我顿时接不上话了。</p><p data-pid="kc9iMujk">　　行程结束时已经是晚上九点，严冬又坚持送我到楼下。</p><p data-pid="i6lNRiL_">　　路灯下，他的影子被拉的又瘦又长，却迟迟没有离开的意思。</p><p data-pid="9an6IbXh">　　半晌，他推了推银丝眼镜，开口道：“你看，除了写代码，还有很多有趣的事情对不对？”</p><p data-pid="jpPi8mgt">　　他指的是饭后他带我去附近套圈圈的事。</p><p data-pid="ZWpxw43L">　　我没好意思扫他的兴，就跟着去了，看得出来，他玩的挺开心的。</p><p data-pid="R3k_dIdF">　　我不大习惯这种示好，和声道：“今天谢谢你，路上注意安全。”</p><p data-pid="SOrmhBdC">　　严冬一向进退有度，道了声晚安后，便驱车离开。</p><p data-pid="BLHn1Yne">　　我安静的回了住处，难得的早睡，可闭上眼却怎么也睡不着。</p><p data-pid="h8m-ex4f">　　我想到了沈华兰的话。</p><p data-pid="W5jdJBnQ">　　如果我没猜错的话，也就是今晚，周宗宣会把林西西正式介绍给周家人。</p><p data-pid="Ky-tYROp">　　而舔了六年的我，连周家的大门朝哪都不清楚。</p><p data-pid="lTJKvYeW">　　对比明显。</p><p data-pid="o5sP9_8k">　　也对，从两年前开始，我跟周宗宣的命运，就各自不同了。</p><p data-pid="ELNdu4Q6">　　眼下最紧要的，是另外一件事。</p><p data-pid="xGzDZdp9">　　敲门声打断了我的思绪。</p><p data-pid="1fs-P1WY">　　“谁啊？”我一头雾水。</p><p data-pid="m8YFTl7U">　　“是我。”</p><p data-pid="ai26uYCG">　　低沉的嗓音刚从门缝里钻进来，我满脸错愕的站在原地。</p><p data-pid="t6686M6e">　　没错，是周宗宣的声音。</p><p data-pid="mUhIR8It">　　可今晚，他不是要陪着林西西参加家宴吗？</p><p data-pid="oVuTlc_J">　　这种时候怎么会出现在我的住处？</p><p data-pid="VcKfkZBu">　　狐疑时，男人的声音再次从门外传来：“开门。”</p><p data-pid="3HjFsj5G">　　语气还挺强势的。</p><p data-pid="TmhdgydN">　　但，凭什么？</p><p data-pid="w-Edb37P">　　就算是投资人，也没道理半夜跑来我家窜门吧？</p><p data-pid="eTLtBeBj">　　我面无表情的站在原地，下一秒，就听到了周宗宣失礼的拍门声。</p><p data-pid="pxD72T-9">　　愈演愈烈。</p><p data-pid="hx5V-pE9">　　我不想惊扰到邻居，小心翼翼的开了条门缝，问：“周总，有事吗？”</p><p data-pid="GLpqDPSM">　　一抬眼，就撞上了男人那双迷乱的眸子。</p><p data-pid="dsqI74N3">　　浓郁的酒精味争先恐后的钻进我的鼻孔，我还没来得及关门，周宗宣便用力一推，整个人压了过来，趴在了我的肩头。</p><p data-pid="VeMk36eL">　　“老婆，你的心好狠啊，怎么不给老公留门呢？”</p><p data-pid="X_NNpL0M">　　周宗宣喊我老婆的时候，整张脸埋在我的肩头，语气也是委屈巴巴的。</p><p data-pid="aofxcQod">　　明显喝多了。</p><p data-pid="YIa8Z36s">　　留门。</p><p data-pid="oTSs6EG1">　　他觉得他在我这还有门吗？</p><p data-pid="nMJFPJ_D">　　我心口压着火，紧接着便意识到，这可能是个误会。</p><p data-pid="bNFiHVN1">　　喊老婆是真的。</p><p data-pid="4oWOrUWQ">　　留门也不假。</p><p data-pid="MzD369LM">　　可周宗宣找的，不是我。</p><p data-pid="hcvUXfj1">　　我联想到沈华兰口中的家宴，琢磨着周宗宣今晚可能跟林西西发生了些不愉快。</p><p data-pid="V2TFIiwM">　　毕竟，除了林西西外，也没人能让高高在上的周宗宣大晚上的来求和。</p><p data-pid="xrR5dePI">　　我更没有。</p><p data-pid="XzPHo2GP">　　想到这，我定了定神，提醒道：“周总，你老婆在楼上呢。”</p><p data-pid="y1ETuqxi">　　说完，我便试图推开他。</p><p data-pid="9Ux8OxAk">　　但周宗宣非但没有立即松开我，反而把我搂的更紧了：“老婆，你还在生我的气对不对？”</p><p data-pid="Mj5rjlgU">　　讨好的语气，伴随着贪婪的拥抱，瞬间就把我心口的怒火给点燃了。</p><p data-pid="riFNt8Eb">　　我抵了下后牙槽，认真道：“周宗宣，你认错人了。”</p><p data-pid="4cNQufM9">　　周宗宣不依：“过分，昨晚还叫人家老公，今晚就直呼名讳了。”</p><p data-pid="H8Fr9tyV">　　看吧，醉的不轻。</p><p data-pid="fHkjGbFU">　　我深吸口气，说：“周宗宣，你抬起头看看，我到底是谁？”</p><p data-pid="9sDPnHtQ">　　男人闻声缓缓抬起头来，视线相撞，我竟在他的眼尾捕捉到了一抹红。</p><p data-pid="6_BCQkZA">　　我一愣，心口仿佛被什么东西轻轻地挠了一下，到嘴的话又被咽了下去。</p><p data-pid="Yj-KSRV_">　　我第一次看到周宗宣这么失态的样子。</p><p data-pid="RYn8WPU-">　　下一秒，男人跟着了魔一样，整个人紧逼过来，将我抵在了玄关处。</p><p data-pid="buxkySVT">　　薄唇相贴时，我意外地看到了男人眼底汹涌的欲念。</p><p data-pid="Eq9eROeF">　　我的呼吸乱了。</p><p data-pid="mRXKnxNp">　　全乱套了。</p><p data-pid="JH5U4fg3">　　心口好像透了风，周宗宣吻的愈烈，我的心就愈凉。</p><p data-pid="9cIi9TuQ">　　我忍无可忍，朝着他的唇上毫不客气的咬了下去。</p><p data-pid="EvDBmIoJ">　　“嘶……”</p><p data-pid="TGXWBsxH">　　周宗宣吃痛，倒吸了一口凉气，满脸错愕的看向我。</p><p data-pid="0MDExIvz">　　我静静地看着他，呼吸都是乱的：“现在清醒了吗？”</p><p data-pid="6M5VMWUx">　　周宗宣似乎还没从方才的剧情里抽离出来，顿了几秒后，舔了下唇上的血珠，猛扯开门冲了出去。</p><p data-pid="vNM1K5vt">　　关门声响，我像是泄了气的皮球，瘫软在原地。</p><p data-pid="K5pLVF9v">　　周一一早，我如常去上班，却在电梯口遇见了林西西。</p><p data-pid="860284Zl">　　小姑娘扎了个可爱的丸子头，正低着头发微信。</p><p data-pid="YrcywX7L">　　心情不错的样子。</p><p data-pid="aVgQR8Hk">　　见到我，她开心的打招呼：“学姐，早上好呀。”</p><p data-pid="ni2R6BEz">　　杏眸中的开心显而易见。</p><p data-pid="CiBelmc-">　　不像是在周家家宴上被为难的样子。</p><p data-pid="PuauostB">　　我联想昨晚周宗宣失魂落魄的模样，心口闪过一抹疑惑。</p><p data-pid="-JMjjE2Z">　　就在这时，林西西的手机里突然传出了男人的说话声：“昨晚你也辛苦了，别担心，家里那边我来应付。”</p><p data-pid="vgPlbfpL">　　低沉沙哑，像是刚刚睡醒的模样。</p><p data-pid="sdCtsNSk">　　周宗宣的声音。</p><p data-pid="HE4BUYlq">　　林西西大概没察觉到自己不小心点了扩音，锁屏后，又悄悄地瞄了我一眼。</p><p data-pid="2Nvjb4bd">　　然后走到一旁回信息了。</p><p data-pid="93wn-bqw">　　电梯门关上时，我隐约听到林西西说：“学长，听你这么说，我真的挺开心的。”</p><p data-pid="td_mUxvv">　　这样，一切就说得通了。</p><p data-pid="d9fbLksv">　　陷入真爱的周宗宣打碎了牙往肚子里吞，默默地护着林西西周全。</p><p data-pid="C-Dz37B4">　　小姑娘又怎会黯然伤神呢？</p><p data-pid="ezAstI6A">　　不像我。</p><p data-pid="7zOYbPI4">　　一上午，我都在紧锣密鼓的敲代码。</p><p data-pid="XpBjjgb6">　　午休后，工作室的大门忽然被推开，身着西装革履的男人拎着咖啡走了进来：“大家好，我是周总的助理曾智，来给嫂子送下午茶。”</p><p data-pid="5ENBFgPq">　　我觉得这个声音有些耳熟，抬眼看向曾智时，顿时了然。</p><p data-pid="S7XmNETe">　　是周宗宣金融系的学弟，在校时就很崇拜周学神，没想到毕业了又忙着给他当跑腿了。</p><p data-pid="JtmvCRTe">　　送下午茶。</p><p data-pid="MYvA2ruz">　　看来周宗宣的浪漫细胞已经被林西西给激活了。</p><p data-pid="apsrz0G9">　　我自嘲的扯了扯嘴角，刚收回视线，就见曾智大步流星的朝我走来。</p><p data-pid="FR5TocwM">　　视线刚碰上，我就听到他笑着说：“嫂子，您的咖啡。”</p><p data-pid="eUe0cBwp">　　他说这话时林西西刚走出办公室，闻声低下了头。</p><p data-pid="Kv-NYRi5">　　脸上红一阵白一阵的。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 19574,
        favorite_count: 104,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3501852799}',
      attached_info: "CsIFCOSTzLG0we6nigEQBBoJNjY2NzcyNzgzILjnnbIGKIoCMApAIEowChtUU19TT1VSQ0VfQkFTSUNfSU5GT19SRUNBTEwSATAYACAAOgp7InJhdyI6IiJ9SigKE1RTX1NPVVJDRV9GRUVEUkVfVjcSATAYACAAOgp7InJhdyI6IiJ9Wgg5NzkzMjYyNWIgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjM1MDE4NTI3OTmKAQk2MTA0MzI5MTmqAQlyZWNvbW1lbmTCASA2YzhlM2FhZDJlNjExZGI3MjNjMTExODY2MDI1ZWY3OfIBCggMEgZOb3JtYWzyASgIChIkMDA1MDdiZWUtMTlkNS00YjA2LWIwMDctM2UyM2U3MmVjY2Y48gEFCAsSATaCAgCIAq78pu76MZICIDZjOGUzYWFkMmU2MTFkYjcyM2MxMTE4NjYwMjVlZjc5mgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXKAhZSZXZpc2l0VmFsdWVXZWlnaHRSdWxl2gIbVFNfU09VUkNFX0JBU0lDX0lORk9fUkVDQUxM6AID+gILTk9STUFMX0ZMT1eKAyA3ZDVhN2M5M2RkNzk0ZTU1ODUwMDE1MDdhOGM3ODU0NpoDDQoCdjAQABoFb3RoZXKoA/aYAdgDAOoDEWJhc2ljX2luZm9fcmVjYWxs+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATOgBACoBACwBAC6BAZtYW51YWzCBAMxNjDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAKDEWsU/gQUAAAAAAAAAAIkF0Op+QZQBsD+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFBZICJQoJNjY2NzcyNzgzEgozNTAxODUyNzk5GAQiCklNQUdFX1RFWFQ=",
      action_card: false
    }, {
      id: "33_1716607630.246",
      type: "feed",
      offset: 33,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3505170967,
        type: "answer",
        url: "https://api.zhihu.com/answers/3505170967",
        author: {
          id: "4c92b0c485ea905c07fe48043ba011dc",
          url: "https://api.zhihu.com/people/4c92b0c485ea905c07fe48043ba011dc",
          user_type: "people",
          url_token: "cao-zhi-hu-guan-li-yuan-de-niang-99",
          name: "哈迷蚩",
          headline: "",
          avatar_url: "https://pica.zhimg.com/50/v2-00646cca725c16a550bc5d5a8f4172e4_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          followers_count: 677,
          is_following: false,
          is_followed: false
        },
        created_time: 1716262474,
        updated_time: 1716262474,
        voteup_count: 186,
        thanks_count: 7,
        comment_count: 25,
        is_copyable: true,
        question: {
          id: 586112871,
          type: "question",
          url: "https://api.zhihu.com/questions/586112871",
          author: {
            id: "",
            url: "",
            user_type: "people",
            url_token: "",
            name: "匿名用户",
            headline: "",
            avatar_url: "https://picx.zhimg.com/v2-d41c2ceaed8f51999522f903672a521f_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "我爸对计算机行业的看法，是否准确？",
          created: 1677262223,
          answer_count: 0,
          follower_count: 0,
          comment_count: 107,
          bound_topic_ids: [1771, 5105],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "所有学技术、搞技术、痴迷技术的，都应该看看令尊这段话，醍醐灌顶",
        excerpt_new: "所有学技术、搞技术、痴迷技术的，都应该看看令尊这段话，醍醐灌顶",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="DW3j7KTM">所有学技术、搞技术、痴迷技术的，都应该看看令尊这段话，醍醐灌顶</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 95881,
        favorite_count: 82,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3505170967}',
      attached_info: "CucECOSTzLG0we6nigEQBBoJNjY3Mzc1MjcwIMqssLIGKLoBMBlAIUooChNUU19TT1VSQ0VfRkVFRFJFX1Y3EgEwGAAgADoKeyJyYXciOiIifVoIOTI1MjkwNzViIGE2MzNkY2M3MjNhZWUyNTJiZTc1NTY3YjRjZGY4ODg2cgozNTA1MTcwOTY3igEJNTg2MTEyODcxqgEJcmVjb21tZW5kwgEgNGM5MmIwYzQ4NWVhOTA1YzA3ZmU0ODA0M2JhMDExZGPyAQoIDBIGTm9ybWFs8gEoCAoSJGVjNzNjYWExLWM2YmUtNDVhZC1iMjNhLTM3MmU1YzBmMWNjM/IBBQgLEgE2ggIAiAKu/Kbu+jGSAiA0YzkyYjBjNDg1ZWE5MDVjMDdmZTQ4MDQzYmEwMTFkY5oCAMoCFEZpcnN0QnJ1c2hXZWlnaHRSdWxl2gITVFNfU09VUkNFX0ZFRURSRV9WN+gCAvoCC05PUk1BTF9GTE9XigMgN2Q1YTdjOTNkZDc5NGU1NTg1MDAxNTA3YThjNzg1NDaaAw0KAnYwEAAaBW90aGVyqAOJ7QXYAwDqAwlmZWVkcmVfdjf6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAzE2MMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAgFu/uD+BBQAAAAAAAAAAiQXQ6n5BlAGwP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUFkgIlCgk2NjczNzUyNzASCjM1MDUxNzA5NjcYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }, {
      id: "34_1716607630.476",
      type: "feed",
      offset: 34,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3508653824,
        type: "answer",
        url: "https://api.zhihu.com/answers/3508653824",
        author: {
          id: "739d4dee0718f46316c13ea5b126afdb",
          url: "https://api.zhihu.com/people/739d4dee0718f46316c13ea5b126afdb",
          user_type: "people",
          url_token: "gwei-75-60",
          name: "码云笔记",
          headline: "知无不言，言无不尽",
          avatar_url: "https://pica.zhimg.com/50/v2-e69b9418d586b9229167661ffa035835_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          badge: [{
            type: "identity_people",
            description: "电子游戏行业 从业人员"
          }],
          followers_count: 2,
          is_following: false,
          is_followed: false
        },
        created_time: 1716533557,
        updated_time: 1716533557,
        voteup_count: 0,
        thanks_count: 0,
        comment_count: 0,
        is_copyable: true,
        question: {
          id: 655314573,
          type: "question",
          url: "https://api.zhihu.com/questions/655314573",
          author: {
            id: "c04a7a2732cb8f7ba5ebe61ca7853bf9",
            url: "https://api.zhihu.com/people/c04a7a2732cb8f7ba5ebe61ca7853bf9",
            user_type: "people",
            url_token: "hai-xiao-guo-qu-chao-qi-chao-luo-41",
            name: "Sydtalk",
            headline: "95后创业公司总经理",
            avatar_url: "https://pic1.zhimg.com/50/v2-20c4f6d3abdb9e586fc30f77e8601087_l.jpg?source=b6762063",
            is_org: false,
            gender: 1,
            badge: [{
              type: "identity_people",
              description: "成都创威拓尔网络科技有限公司 总经理"
            }],
            followers_count: 15,
            is_following: false,
            is_followed: false
          },
          title: "弟弟正在读大专编程，请问学JAVA还是C++，或者网页设计更有前景一些呢？",
          created: 1715129057,
          answer_count: 0,
          follower_count: 0,
          comment_count: 12,
          bound_topic_ids: [213, 1354, 3646, 11569, 74149],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "啥学历，低于统招本科的，趁早改行，学历是敲门砖！！！ 其他，没有什么所谓更有前景，互联网行业前几年特别火，现在也就那样了",
        excerpt_new: "啥学历，低于统招本科的，趁早改行，学历是敲门砖！！！ 其他，没有什么所谓更有前景，互联网行业前几年特别火，现在也就那样了",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="p1OuXz4I">啥学历，低于统招本科的，趁早改行，学历是敲门砖！！！</p><p data-pid="TCmKfBxc">其他，没有什么所谓更有前景，互联网行业前几年特别火，现在也就那样了</p><p></p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: true,
        visited_count: 35,
        favorite_count: 1,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3508653824}',
      attached_info: "CpQFCOSTzLG0we6nigEQBBoJNjY4MDA4NTc3ILXywLIGKAAwAEAiSiQKGVRTX1NPVVJDRV9XQVJNX1VQX05PUk1BTDESATAYACAAOgBaCTEwNzkwMzAyM2IgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjM1MDg2NTM4MjSKAQk2NTUzMTQ1NzOqAQlyZWNvbW1lbmTCASA3MzlkNGRlZTA3MThmNDYzMTZjMTNlYTViMTI2YWZkYvIBCggMEgZOb3JtYWzyASgIChIkYjhiMDNlMWYtNTg3MC00OGYwLTlkMzgtOTMyNWIyMzRkZTEw8gEFCAsSATaCAgCIAq78pu76MZICIDczOWQ0ZGVlMDcxOGY0NjMxNmMxM2VhNWIxMjZhZmRimgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXKAhhDb250ZW50V2FybVVwQnJlYWtJblJ1bGXaAhlUU19TT1VSQ0VfV0FSTV9VUF9OT1JNQUwx6AIC+gILTk9STUFMX0ZMT1eKAyA3ZDVhN2M5M2RkNzk0ZTU1ODUwMDE1MDdhOGM3ODU0NpoDDQoCdjAQABoFb3RoZXKoAyPYAwDqAx90ZXh0XzEyaG91cl91bmlmaW5zaGVkX3JlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAJhacIEAzQwMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAwBkslj+BBQAAAAAAAAAAiQXQ6n5BlAGwP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUFkgIlCgk2NjgwMDg1NzcSCjM1MDg2NTM4MjQYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }, {
      id: "35_1716607630.986",
      type: "feed",
      offset: 35,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607630,
      updated_time: 1716607630,
      target: {
        id: 3479434389,
        type: "answer",
        url: "https://api.zhihu.com/answers/3479434389",
        author: {
          id: "99882fcd8adfce2eeb31e2963134a5c8",
          url: "https://api.zhihu.com/people/99882fcd8adfce2eeb31e2963134a5c8",
          user_type: "people",
          url_token: "you-51-16",
          name: "swdfzslxsss",
          headline: "观察者",
          avatar_url: "https://picx.zhimg.com/50/v2-1354d5d19c1dbc4aa7167e831b930fa5_l.jpg?source=b6762063",
          is_org: false,
          gender: 0,
          followers_count: 273,
          is_following: false,
          is_followed: false
        },
        created_time: 1714115331,
        updated_time: 1714115331,
        voteup_count: 16261,
        thanks_count: 601,
        comment_count: 612,
        is_copyable: true,
        question: {
          id: 263925140,
          type: "question",
          url: "https://api.zhihu.com/questions/263925140",
          author: {
            id: "",
            url: "",
            user_type: "people",
            url_token: "",
            name: "匿名用户",
            headline: "",
            avatar_url: "https://pic1.zhimg.com/v2-d41c2ceaed8f51999522f903672a521f_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "杨幂为什么会变成今天这样呢？",
          created: 1512984953,
          answer_count: 0,
          follower_count: 0,
          comment_count: 6,
          bound_topic_ids: [10026],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        thumbnail: "https://picx.zhimg.com/50/v2-4445aa5be12de145b62e8113aa421826_720w.jpg?source=b6762063",
        excerpt: "看到一个帖子，真的说到心坎里去了….",
        excerpt_new: "看到一个帖子，真的说到心坎里去了….",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="-f4pJYhv">看到一个帖子，真的说到心坎里去了….</p><figure data-size="normal"><img src="https://pic1.zhimg.com/v2-5ed7ce5b07b7244754759c0d20d96a20_b.jpg" data-rawwidth="990" data-rawheight="7132" data-size="normal" data-original-token="v2-fbdb243888816495eef84a2a61277e9a" data-default-watermark-src="https://pic4.zhimg.com/v2-5231444e5e9255696076fc0da5e39279_b.jpg" class="origin_image zh-lightbox-thumb" width="990" data-original="https://pic1.zhimg.com/v2-5ed7ce5b07b7244754759c0d20d96a20_r.jpg"/></figure><p class="ztext-empty-paragraph"><br/></p><figure data-size="normal"><img src="https://picx.zhimg.com/v2-818ecfedc88ada188b8be2b3e2cca361_b.jpg" data-rawwidth="1179" data-rawheight="408" data-size="normal" data-original-token="v2-425c9d5d0e93c47fff789d7aa32fd760" data-default-watermark-src="https://pica.zhimg.com/v2-7b5dedd134b36e535a086c8826ad1452_b.jpg" class="origin_image zh-lightbox-thumb" width="1179" data-original="https://picx.zhimg.com/v2-818ecfedc88ada188b8be2b3e2cca361_r.jpg"/></figure><p class="ztext-empty-paragraph"><br/></p><figure data-size="normal"><img src="https://pic3.zhimg.com/v2-7df784d02462dbf56fc000d588a0fde2_b.jpg" data-rawwidth="1173" data-rawheight="1832" data-size="normal" data-original-token="v2-409acadb31fba86cd158e3d3154fcc40" data-default-watermark-src="https://pic4.zhimg.com/v2-26bcca67e2484d86421ba5df0d06c987_b.jpg" class="origin_image zh-lightbox-thumb" width="1173" data-original="https://pic3.zhimg.com/v2-7df784d02462dbf56fc000d588a0fde2_r.jpg"/></figure><p></p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 1180016,
        thumbnails: ["https://picx.zhimg.com/50/v2-4445aa5be12de145b62e8113aa421826_720w.jpg?source=b6762063", "https://picx.zhimg.com/50/v2-3952726db2db7fbac8cbe9f3b9137a09_720w.jpg?source=b6762063"],
        favorite_count: 3243,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3479434389}',
      attached_info: "CscFCOSTzLG0we6nigEQBBoJNjYyNjk3MzU2IIOmrbEGKIV/MOQEQCNKTwocVFNfU09VUkNFX0hPVF9DUk9TU19SRUFMVElNRRIpaG90X3JlY2FsbF9yZWFsdGltZV90Om5vcm1hbDoyMDI0LTA1LTI1OjgYACAAOgBaCDIwMDAwNjE3YiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIKMzQ3OTQzNDM4OYoBCTI2MzkyNTE0MKoBCXJlY29tbWVuZMIBIDk5ODgyZmNkOGFkZmNlMmVlYjMxZTI5NjMxMzRhNWM48gEKCAwSBk5vcm1hbPIBKAgKEiQxMDUzNzZjOC0xMzM1LTQ1MTMtYTdmYi00MGZiNDVkNDM4NDPyAQUICxIBNoICAIgCrvym7voxkgIgOTk4ODJmY2Q4YWRmY2UyZWViMzFlMjk2MzEzNGE1YziaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhxUU19TT1VSQ0VfSE9UX0NST1NTX1JFQUxUSU1F6AIC+gILTk9STUFMX0ZMT1eKAyA3ZDVhN2M5M2RkNzk0ZTU1ODUwMDE1MDdhOGM3ODU0NpoDDQoCdjAQABoFb3RoZXKoA/CCSNgDAOoDH2hvdENyb3NzUmVhbFRpbWVDb250ZW50UmVjYWxsZXL6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAzE2MMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAA4LPRuz+BBQAAAAAAAAAAiQXQ6n5BlAGwP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUFkgIlCgk2NjI2OTczNTYSCjM0Nzk0MzQzODkYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }];
    const mockList4 = [{
      id: "36_1716607631.486",
      type: "feed",
      offset: 36,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607631,
      updated_time: 1716607631,
      target: {
        id: 3473400388,
        type: "answer",
        url: "https://api.zhihu.com/answers/3473400388",
        author: {
          id: "2d0c3748f7ab0b099fe8ebe64a823f45",
          url: "https://api.zhihu.com/people/2d0c3748f7ab0b099fe8ebe64a823f45",
          user_type: "people",
          url_token: "du-xiao-qing-74-43",
          name: "非著名学家",
          headline: "大学主修经济学，辅修计算机，两手都要抓，两手都要硬。",
          avatar_url: "https://picx.zhimg.com/50/v2-7c89e76de517a6db5947daa1c5cad2ce_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          badge: [{
            type: "identity_people",
            description: "科研行业 从业人员"
          }],
          followers_count: 302,
          is_following: false,
          is_followed: false
        },
        created_time: 1713672730,
        updated_time: 1713672730,
        voteup_count: 5,
        thanks_count: 0,
        comment_count: 5,
        is_copyable: true,
        question: {
          id: 612474287,
          type: "question",
          url: "https://api.zhihu.com/questions/612474287",
          author: {
            id: "862e10a7e3cbfc16ddb2c23bcc99223f",
            url: "https://api.zhihu.com/people/862e10a7e3cbfc16ddb2c23bcc99223f",
            user_type: "people",
            url_token: "newrea",
            name: "newrea",
            headline: "front-end Web developer",
            avatar_url: "https://picx.zhimg.com/50/v2-fb43a2f800f082ef23f438490b0df5fe_l.jpg?source=b6762063",
            is_org: false,
            gender: 1,
            followers_count: 2,
            is_following: false,
            is_followed: false
          },
          title: "32岁前端干了8年，是继续做前端开发，还是转其它工作?",
          created: 1689553194,
          answer_count: 0,
          follower_count: 0,
          comment_count: 5,
          bound_topic_ids: [225],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "跟我差不多的阶段，今年金三银四去体验了一下招聘市场，除了几个常年招人的公司，比如拼多多&字节，其他的就只有华为od会理一下。 非常奇怪的是，一家中小型机构的机会都没有，感觉到了这个阶段，只有进大厂或者外包两条路，但是进大厂后，我们这个年纪也没啥发展势头，基本就是高薪外包，非常不稳定的，所以一定要开始准备离开前端这条路了。",
        excerpt_new: "跟我差不多的阶段，今年金三银四去体验了一下招聘市场，除了几个常年招人的公司，比如拼多多&字节，其他的就只有华为od会理一下。 非常奇怪的是，一家中小型机构的机会都没有，感觉到了这个阶段，只有进大厂或者外包两条路，但是进大厂后，我们这个年纪也没啥发展势头，基本就是高薪外包，非常不稳定的，所以一定要开始准备离开前端这条路了。",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="akHxkFX1">跟我差不多的阶段，今年金三银四去体验了一下招聘市场，除了几个常年招人的公司，比如拼多多&amp;字节，其他的就只有华为od会理一下。</p><p data-pid="ItzRRhVy">非常奇怪的是，一家中小型机构的机会都没有，感觉到了这个阶段，只有进大厂或者外包两条路，但是进大厂后，我们这个年纪也没啥发展势头，基本就是高薪外包，非常不稳定的，所以一定要开始准备离开前端这条路了。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 5150,
        favorite_count: 2,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3473400388}',
      attached_info: "Cu0ECIPmg9ePyKLDuQEQBBoJNjYxNTk5ODk4IJqkkrEGKAUwBUAkSiAKFVRTX1NPVVJDRV9USEVNRV9NRVJHRRIBMBgAIAA6AFoIOTgzODYyNzZiIGE2MzNkY2M3MjNhZWUyNTJiZTc1NTY3YjRjZGY4ODg2cgozNDczNDAwMzg4igEJNjEyNDc0Mjg3qgEJcmVjb21tZW5kwgEgMmQwYzM3NDhmN2FiMGIwOTlmZThlYmU2NGE4MjNmNDXyAQoIDBIGTm9ybWFs8gEoCAoSJGVjN2MyZmRlLWIwNWQtNDJhZi05ZmExLWI2ZGVlZTI2M2Q5ZfIBBQgLEgE3ggIAiAKNg6fu+jGSAiAyZDBjMzc0OGY3YWIwYjA5OWZlOGViZTY0YTgyM2Y0NZoCAMoCFEZpcnN0QnJ1c2hXZWlnaHRSdWxl2gIVVFNfU09VUkNFX1RIRU1FX01FUkdF6AIC+gILTk9STUFMX0ZMT1eKAyBhNTFkZjM0OTg3MDY0Njk4YWFkOGM0M2VlZWMxZTU2Y5oDDQoCdjAQABoFb3RoZXKoA54o2AMA6gMbVGhlbWVNZXJnZU5ld1YzUG9vbFJlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAJhacIEAzQwMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAgD0Uvj+BBQAAAAAAAAAAiQV1LRYwrv+wP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUGkgIlCgk2NjE1OTk4OTgSCjM0NzM0MDAzODgYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }, {
      id: "37_1716607631.20",
      type: "feed",
      offset: 37,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607631,
      updated_time: 1716607631,
      target: {
        id: 3068426834,
        type: "answer",
        url: "https://api.zhihu.com/answers/3068426834",
        author: {
          id: "e311a1fab11dd3c38ccaa9978556180a",
          url: "https://api.zhihu.com/people/e311a1fab11dd3c38ccaa9978556180a",
          user_type: "people",
          url_token: "zi-you-de-jia-suo-42",
          name: "传奇",
          headline: "因为我不快乐，所以希望大家都快乐！点赞关注开心不迷路！",
          avatar_url: "https://picx.zhimg.com/50/v2-56cfc0c0ddfe788cf713e395d08bf6f6_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          followers_count: 26291,
          is_following: false,
          is_followed: false
        },
        created_time: 1686447915,
        updated_time: 1688177715,
        voteup_count: 264,
        thanks_count: 147,
        comment_count: 89,
        is_copyable: true,
        question: {
          id: 275241454,
          type: "question",
          url: "https://api.zhihu.com/questions/275241454",
          author: {
            id: "f4e3690bbd847d2ffa5298b90133f38e",
            url: "https://api.zhihu.com/people/f4e3690bbd847d2ffa5298b90133f38e",
            user_type: "people",
            url_token: "a1796854",
            name: "佳人倾城绝",
            headline: "整形问题可私信，其他的就随缘啦~",
            avatar_url: "https://picx.zhimg.com/50/v2-8a34a5b7cdd1ad30d968abbaaa254ee4_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 2777,
            is_following: false,
            is_followed: false
          },
          title: "你见过哪些特别尴尬的视频？",
          created: 1524976989,
          answer_count: 0,
          follower_count: 0,
          comment_count: 31,
          bound_topic_ids: [68, 307, 6641, 20223, 67520],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        thumbnail: "https://picx.zhimg.com/50/v2-ce71fcfb79a9de930d038778b9e91140_720w.jpg?source=b6762063",
        thumbnail_extra_info: {
          video_id: "1651162009986211840",
          type: "video",
          url: "https://pic1.zhimg.com/v2-ce71fcfb79a9de930d038778b9e91140.jpg?source=382ee89a",
          height: 1080,
          width: 1920,
          duration: 72,
          playlist: {
            ld: {
              url: "https://vdn6.vzuu.com/SD/1c8fb74c-07f9-11ee-bdfc-ea53acd4367d-v8_f2_t1_xOwOeM4C.mp4?pkey=AAVMjsqWjjBXqDBF1E1KevFwPBX8QXKNNg6O5ipbvq-9HMngXnm0GqAonXbgRzuuSm340i64ZiB9phI5kx7YuDa_&c=avc.8.0&f=mp4&pu=1513c7c2&bu=b9ce98d5&expiration=1716614831&v=ks6",
              width: 848,
              height: 478,
              bitrate: 530,
              duration: 72,
              format: "mp4",
              fps: 25,
              size: 4774983
            },
            sd: {
              url: "https://vdn6.vzuu.com/SD/1c8fb74c-07f9-11ee-bdfc-ea53acd4367d-v8_f2_t1_xOwOeM4C.mp4?pkey=AAVMjsqWjjBXqDBF1E1KevFwPBX8QXKNNg6O5ipbvq-9HMngXnm0GqAonXbgRzuuSm340i64ZiB9phI5kx7YuDa_&c=avc.8.0&f=mp4&pu=1513c7c2&bu=b9ce98d5&expiration=1716614831&v=ks6",
              width: 848,
              height: 478,
              bitrate: 530,
              duration: 72,
              format: "mp4",
              fps: 25,
              size: 4774983
            },
            hd: {
              url: "https://vdn6.vzuu.com/SD/1c8fb74c-07f9-11ee-bdfc-ea53acd4367d-v8_f2_t1_xOwOeM4C.mp4?pkey=AAVMjsqWjjBXqDBF1E1KevFwPBX8QXKNNg6O5ipbvq-9HMngXnm0GqAonXbgRzuuSm340i64ZiB9phI5kx7YuDa_&c=avc.8.0&f=mp4&pu=1513c7c2&bu=b9ce98d5&expiration=1716614831&v=ks6",
              width: 848,
              height: 478,
              bitrate: 530,
              duration: 72,
              format: "mp4",
              fps: 25,
              size: 4774983
            }
          },
          show_maker_entrance: false,
          play_auth_token: "V1-0f31dc4683300b655fd5d693382600f9-0-aca1711b1a4611ef8193b64b81aec893-1716607631806-1716694031806-a0c8d08f8772e93b27583c3d22a4111d6c4e6acc8a6eaa299d6a1c0b994c8ca3"
        },
        excerpt: "",
        excerpt_new: "",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: "",
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 1,
        play_count: 3222081,
        attachment: {
          type: "video",
          is_complete: true,
          parent_content_token: "1651162012141891584",
          split_start: 0,
          parent_play_count: 4166769,
          parent_voteup_count: 84,
          parent_title: "明星的嫌弃藏不住，热巴杨洋互相避嫌，章子怡刘嘉玲无声胜有声"
        },
        thumbnails: ["https://picx.zhimg.com/50/v2-ce71fcfb79a9de930d038778b9e91140_720w.jpg?source=b6762063"],
        favorite_count: 317,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3068426834}',
      attached_info: "CsQFCIPmg9ePyKLDuQEQBBoJNTg3OTgwNzEyIKvOlKQGKIgCMFlAJUo0Ch9UU19TT1VSQ0VfRkVFRFJFX1YzX1ZJREVPX01FUkdFEgEwGAAgADoKeyJyYXciOiIifVoIMjM0NDA0NzliIGE2MzNkY2M3MjNhZWUyNTJiZTc1NTY3YjRjZGY4ODg2aIDA5P6Y44b1FnIKMzA2ODQyNjgzNIoBCTI3NTI0MTQ1NKoBCXJlY29tbWVuZMIBIGUzMTFhMWZhYjExZGQzYzM4Y2NhYTk5Nzg1NTYxODBh8gEKCAwSBk5vcm1hbPIBKAgKEiRhYTQ4YjU5OC05MDRjLTQyNzctYmZlNy05ZDg1MzhhYjFmYjbyAQUICxIBN4ICAIgCjYOn7voxkgIgZTMxMWExZmFiMTFkZDNjMzhjY2FhOTk3ODU1NjE4MGGaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCG09sZENvbnRlbnRSZWR1Y2U1V2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAh9UU19TT1VSQ0VfRkVFRFJFX1YzX1ZJREVPX01FUkdF6AIC+gILTk9STUFMX0ZMT1eKAyBhNTFkZjM0OTg3MDY0Njk4YWFkOGM0M2VlZWMxZTU2Y5oDDQoCdjAQABoFb3RoZXKoAwHYAwDqAw9mZWVkcmVfdjNfdmlkZW/6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAzE2MMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAAFRerj+BBQAAAAAAAAAAiQV1LRYwrv+wP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUGkgIgCgk1ODc5ODA3MTISCjMwNjg0MjY4MzQYBCIFVklERU8=",
      action_card: false
    }, {
      id: "38_1716607631.901",
      type: "feed",
      offset: 38,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607631,
      updated_time: 1716607631,
      target: {
        id: 3090327377,
        type: "answer",
        url: "https://api.zhihu.com/answers/3090327377",
        author: {
          id: "910c9ebed19f9b4e790809f13d942304",
          url: "https://api.zhihu.com/people/910c9ebed19f9b4e790809f13d942304",
          user_type: "people",
          url_token: "xu-zhi-qiang-73-99",
          name: "许志强",
          headline: "",
          avatar_url: "https://pica.zhimg.com/50/v2-b5214b63f72c304a34df10044a08f1df_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          followers_count: 140,
          is_following: false,
          is_followed: false
        },
        created_time: 1687744885,
        updated_time: 1687744885,
        voteup_count: 2219,
        thanks_count: 247,
        comment_count: 599,
        is_copyable: true,
        question: {
          id: 470855035,
          type: "question",
          url: "https://api.zhihu.com/questions/470855035",
          author: {
            id: "b0bd39d8ae0591c167c7617c47a64aa3",
            url: "https://api.zhihu.com/people/b0bd39d8ae0591c167c7617c47a64aa3",
            user_type: "people",
            url_token: "yogurt-81",
            name: "yogurt",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/8379b1d7be665a9f22afff26c4b5879d_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "经常游泳有害处吗？",
          created: 1625715843,
          answer_count: 0,
          follower_count: 0,
          comment_count: 21,
          bound_topic_ids: [2742, 71643, 134173],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "我强烈不建议游泳，尤其是孩子。我本人就是一个游泳爱好者，游泳本身没有问题，是一项非常好的有氧运动，长期坚持游泳肯定有益健康，这点毋庸置疑。问题的关键是游泳池的水质不能得到保障，为了节约成本，过量使用科技狠活儿是非常常见的现象。游泳池内的空气都很刺鼻，长期在这种环境游泳，呼吸道系统会收到很大伤害。",
        excerpt_new: "我强烈不建议游泳，尤其是孩子。我本人就是一个游泳爱好者，游泳本身没有问题，是一项非常好的有氧运动，长期坚持游泳肯定有益健康，这点毋庸置疑。问题的关键是游泳池的水质不能得到保障，为了节约成本，过量使用科技狠活儿是非常常见的现象。游泳池内的空气都很刺鼻，长期在这种环境游泳，呼吸道系统会收到很大伤害。",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="HUyydGLY">我强烈不建议游泳，尤其是孩子。我本人就是一个游泳爱好者，游泳本身没有问题，是一项非常好的有氧运动，长期坚持游泳肯定有益健康，这点毋庸置疑。问题的关键是游泳池的水质不能得到保障，为了节约成本，过量使用科技狠活儿是非常常见的现象。游泳池内的空气都很刺鼻，长期在这种环境游泳，呼吸道系统会收到很大伤害。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 1738663,
        favorite_count: 539,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3090327377}',
      attached_info: "Cp8FCIPmg9ePyKLDuQEQBBoJNTkxOTYyODYwIPXi46QGKKsRMNcEQCZKKAoTVFNfU09VUkNFX0ZFRURSRV9WNxIBMBgAIAA6CnsicmF3IjoiIn1aCDY2OTEzOTQ3YiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIKMzA5MDMyNzM3N4oBCTQ3MDg1NTAzNaoBCXJlY29tbWVuZMIBIDkxMGM5ZWJlZDE5ZjliNGU3OTA4MDlmMTNkOTQyMzA08gEKCAwSBk5vcm1hbPIBKAgKEiQ0OTYwOTZjOS0wOTA4LTRjNzYtYTAwYS04ZjFlNDE4NWI3NznyAQUICxIBN4ICAIgCjYOn7voxkgIgOTEwYzllYmVkMTlmOWI0ZTc5MDgwOWYxM2Q5NDIzMDSaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCG09sZENvbnRlbnRSZWR1Y2U1V2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhNUU19TT1VSQ0VfRkVFRFJFX1Y36AIC+gILTk9STUFMX0ZMT1eKAyBhNTFkZjM0OTg3MDY0Njk4YWFkOGM0M2VlZWMxZTU2Y5oDDQoCdjAQABoFb3RoZXKoA6ePatgDAOoDCWZlZWRyZV92N/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAABAgre1P4EFAAAAAAAAAACJBXUtFjCu/7A/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQaSAiUKCTU5MTk2Mjg2MBIKMzA5MDMyNzM3NxgEIgpJTUFHRV9URVhU",
      action_card: false
    }, {
      id: "39_1716607631.150",
      type: "feed",
      offset: 39,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607631,
      updated_time: 1716607631,
      target: {
        id: 3389961146,
        type: "answer",
        url: "https://api.zhihu.com/answers/3389961146",
        author: {
          id: "1d5b6721d25f6aa30e506c88c612e6bf",
          url: "https://api.zhihu.com/people/1d5b6721d25f6aa30e506c88c612e6bf",
          user_type: "people",
          url_token: "xiao-xiao-zhi-ya-11",
          name: "小小支呀",
          headline: "微：qwerdsa11",
          avatar_url: "https://pic1.zhimg.com/50/v2-89d60c6a83fa666dcf6a649171858790_l.jpg?source=b6762063",
          is_org: false,
          gender: 0,
          followers_count: 1172,
          is_following: false,
          is_followed: false
        },
        created_time: 1707280107,
        updated_time: 1707280107,
        voteup_count: 7033,
        thanks_count: 449,
        comment_count: 203,
        is_copyable: true,
        question: {
          id: 564436753,
          type: "question",
          url: "https://api.zhihu.com/questions/564436753",
          author: {
            id: "90b2a6cdfb22fac487e735a2f7f867be",
            url: "https://api.zhihu.com/people/90b2a6cdfb22fac487e735a2f7f867be",
            user_type: "people",
            url_token: "lan-xiao-ting-3-96",
            name: "澜渟高级产品经理",
            headline: "澜渟高级产品经理 专研家用盆底医学品牌",
            avatar_url: "https://pic1.zhimg.com/50/v2-d8e3e1573c0b8800117b7e3990433602_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 488,
            is_following: false,
            is_followed: false
          },
          title: "你在妇产科听到过哪些八卦？",
          created: 1667467881,
          answer_count: 0,
          follower_count: 0,
          comment_count: 5,
          bound_topic_ids: [4621],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "1、一个高中女生肚子好大了，爸妈陪着来做检查，问怀没怀孕，女孩很肯定没怀孕，每个月都来大姨妈，爸妈还说医生怎么能说他家孩子怀孕了呢，但是医生还是叫做了个B超，嘿!两个子宫一个怀孕一个来大姨妈…… 2、听人说的，一个女的抱个婴儿来测黄疸，据说她儿子上高三，婴儿是她儿子的女同学生的，那段时间因为疫情，学校停课，学生都在家里上网课，女孩也在她家住着，女孩爸妈根本不知道她已经生了个孩子，她正发愁该怎么通知对…",
        excerpt_new: "1、一个高中女生肚子好大了，爸妈陪着来做检查，问怀没怀孕，女孩很肯定没怀孕，每个月都来大姨妈，爸妈还说医生怎么能说他家孩子怀孕了呢，但是医生还是叫做了个B超，嘿!两个子宫一个怀孕一个来大姨妈…… 2、听人说的，一个女的抱个婴儿来测黄疸，据说她儿子上高三，婴儿是她儿子的女同学生的，那段时间因为疫情，学校停课，学生都在家里上网课，女孩也在她家住着，女孩爸妈根本不知道她已经生了个孩子，她正发愁该怎么通知对…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="UPh9F2Lt">1、一个高中女生肚子好大了，爸妈陪着来做检查，问怀没怀孕，女孩很肯定没怀孕，每个月都来大姨妈，爸妈还说医生怎么能说他家孩子怀孕了呢，但是医生还是叫做了个B超，嘿!两个子宫一个怀孕一个来大姨妈……</p><p data-pid="jxIamKx-">2、听人说的，一个女的抱个婴儿来测黄疸，据说她儿子上高三，婴儿是她儿子的女同学生的，那段时间因为疫情，学校停课，学生都在家里上网课，女孩也在她家住着，女孩爸妈根本不知道她已经生了个孩子，她正发愁该怎么通知对方家长……</p><p data-pid="02Ftd3sY">3、媳妇在待产室，老婆婆问一声能不能快点让她儿子签字，他儿子好回房去睡觉</p><p data-pid="zegvkmpE">4、临床一产妇生完了才让她老公来，贫血严重，医生让输血，男的一问一袋要500块，当场拒绝，嘴里还说早知道贫血就不娶她了……</p><p data-pid="pHLpOybA">5、一个小孕妇，代产输催产素，疼得嗷嗷叫，护士都看不下去了，给她老公说胎位不正，别顺了，剖吧，男的只会说一句，我妈说没钱，顺吧！</p><p data-pid="TVNUvIXF">6、去年在省立医院见到一个小姑娘，十八九岁的样子，可能不全流产，去彩超室排队，血顺着两条腿往下淌。。没人陪同！</p><p data-pid="yyoSvE_0">7、去产检，一女孩很漂亮，家属签字时进来一男的，五十多岁。医生说咋又来了，她说那人家没注意又怀了。她去取药，医生对男的说，你要爱惜爱惜她，一年来几次了。男的说自己有三个孩子，她有两个，都没离婚……她自己要受罪，也不怨我</p><p data-pid="werzbirh">8、</p><p data-pid="b-K4KaAx"><b>产妇：</b>医生，<b>我肚子上的脂肪好多，帮我切点儿。</b></p><p data-pid="WL51fEI0"><b>医生：</b>我是妇产科的，不是整形美容科的，我们不许跨专业手术。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="BwBjH5DA">9、</p><p data-pid="g1IqZGpm"><b>产妇：</b>医生，我妈说了，<b>脐带要从宝宝后脑勺捋下去，</b>我妈说了，<b>宝宝要脸朝后出来。</b></p><p data-pid="6dz2oKb2"><b>医生：</b>好吧，幸好你妈没有说头位的先要脚出来，我们试试看。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="tFBCKj3T">10、</p><p data-pid="Qdrn65G-"><b>产妇：</b>医生，我家宝宝出来后<b>第一时间要放到地上，背贴贴地。</b></p><p data-pid="Ffe57lBP"><b>医生：</b>叔可忍，婶不可忍，你家宝宝长大了知道你这么折腾他，他肯定怀疑是不是你亲生的。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 1884464,
        favorite_count: 652,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3389961146}',
      attached_info: "CuEFCIPmg9ePyKLDuQEQBBoJNjQ2NDMzNDQ4IOuNjK4GKPk2MMsBQCdKMAobVFNfU09VUkNFX0JBU0lDX0lORk9fUkVDQUxMEgEwGAAgADoKeyJyYXciOiIifUooChNUU19TT1VSQ0VfRkVFRFJFX1Y3EgEwGAAgADoKeyJyYXciOiIifVoIODc3MTI1NThiIGE2MzNkY2M3MjNhZWUyNTJiZTc1NTY3YjRjZGY4ODg2cgozMzg5OTYxMTQ2igEJNTY0NDM2NzUzqgEJcmVjb21tZW5kwgEgMWQ1YjY3MjFkMjVmNmFhMzBlNTA2Yzg4YzYxMmU2YmbyAQoIDBIGTm9ybWFs8gEoCAoSJGE1ZmVlMTk4LTI1M2EtNDE1OC1hMzFkLWFiNmZiY2MzYmQ1OfIBBQgLEgE3ggIAiAKNg6fu+jGSAiAxZDViNjcyMWQyNWY2YWEzMGU1MDZjODhjNjEyZTZiZpoCAMoCFEZpcnN0QnJ1c2hXZWlnaHRSdWxlygIbT2xkQ29udGVudFJlZHVjZTVXZWlnaHRSdWxlygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCG1RTX1NPVVJDRV9CQVNJQ19JTkZPX1JFQ0FMTOgCAvoCC05PUk1BTF9GTE9XigMgYTUxZGYzNDk4NzA2NDY5OGFhZDhjNDNlZWVjMWU1NmOaAw0KAnYwEAAaBW90aGVyqAOwgnPYAwDqAxFiYXNpY19pbmZvX3JlY2FsbPoDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAADAgpfDP4EFAAAAAAAAAACJBXUtFjCu/7A/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQaSAiUKCTY0NjQzMzQ0OBIKMzM4OTk2MTE0NhgEIgpJTUFHRV9URVhU",
      action_card: false
    }, {
      id: "40_1716607631.202",
      type: "feed",
      offset: 40,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607631,
      updated_time: 1716607631,
      target: {
        id: 3508910106,
        type: "answer",
        url: "https://api.zhihu.com/answers/3508910106",
        author: {
          id: "54fcde969e3144923c6f37630a246408",
          url: "https://api.zhihu.com/people/54fcde969e3144923c6f37630a246408",
          user_type: "people",
          url_token: "loversdiy",
          name: "Ai资源宝库",
          headline: "专注于分享人工智能精品资源：Ai副业项目，Ai效率神器！",
          avatar_url: "https://pic1.zhimg.com/50/v2-a0b38ba0d10394c52845083b6b08083c_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          followers_count: 31,
          is_following: false,
          is_followed: false
        },
        created_time: 1716547255,
        updated_time: 1716547255,
        voteup_count: 0,
        thanks_count: 0,
        comment_count: 0,
        is_copyable: true,
        question: {
          id: 650313364,
          type: "question",
          url: "https://api.zhihu.com/questions/650313364",
          author: {
            id: "b56aa00f44b840867f603476a5c87acf",
            url: "https://api.zhihu.com/people/b56aa00f44b840867f603476a5c87acf",
            user_type: "people",
            url_token: "56867-31",
            name: "1599 值吗",
            headline: "",
            avatar_url: "https://pica.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 1,
            is_following: false,
            is_followed: false
          },
          title: "AI 技术做自媒体能赚米吗？",
          created: 1711465844,
          answer_count: 0,
          follower_count: 0,
          comment_count: 0,
          bound_topic_ids: [350, 188574, 174356, 32797],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "能肯定是能的！ 目前流行的Ai技术主要应用两个方面：Ai问答、Ai绘画！ Ai+自媒体是完全可行的，但是花费1599报课，完全没有必要！网上自媒体教程很多，要多想，多干！ 普通人不要学习：ChatGPT、Midjourey、Stable Diffsion，前两个需要科学上网，本身就有些碰触红线，第三个学习成本高、周期长 国产Ai也正在崛起： 百度的文心一言、阿里的通义系列、抖音的豆包、腾讯的混元、Kimi、智谱清言、海螺Ai、讯飞星火，Ai工具层出不穷…",
        excerpt_new: "能肯定是能的！ 目前流行的Ai技术主要应用两个方面：Ai问答、Ai绘画！ Ai+自媒体是完全可行的，但是花费1599报课，完全没有必要！网上自媒体教程很多，要多想，多干！ 普通人不要学习：ChatGPT、Midjourey、Stable Diffsion，前两个需要科学上网，本身就有些碰触红线，第三个学习成本高、周期长 国产Ai也正在崛起： 百度的文心一言、阿里的通义系列、抖音的豆包、腾讯的混元、Kimi、智谱清言、海螺Ai、讯飞星火，Ai工具层出不穷…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="l33jwPdX">能肯定是能的！</p><p data-pid="YuqhGsxA">目前流行的Ai技术主要应用两个方面：Ai问答、Ai绘画！</p><p data-pid="j4c1LQnS">Ai+自媒体是完全可行的，但是花费1599报课，完全没有必要！网上自媒体教程很多，要多想，多干！</p><p data-pid="COmCiY_e">普通人不要学习：ChatGPT、Midjourey、Stable Diffsion，前两个需要科学上网，本身就有些碰触红线，第三个学习成本高、周期长</p><p data-pid="kpT33ExE">国产Ai也正在崛起：</p><p data-pid="61G6ku-u">百度的文心一言、阿里的通义系列、抖音的豆包、腾讯的混元、Kimi、智谱清言、海螺Ai、讯飞星火，Ai工具层出不穷，要做的是先去使用这些工具，摸索下对做自媒体有什么帮助！用工具的同时要有自己的思维和理解，现在很多自媒体平台有Ai检测措施！</p><p data-pid="23SH2xBW">想靠自媒体变现，不建议单纯的依赖平台！</p><p data-pid="iCtBz63P">Ai最好能和传统网赚项目相结合去做，做的同时能获取收益，而不是靠着平台的几分钱活着！</p><p></p><p></p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 13,
        favorite_count: 0,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3508910106}',
      attached_info: "CpQFCIPmg9ePyKLDuQEQBBoJNjY4MDU1MTk3ILfdwbIGKAAwAEAoSiQKGVRTX1NPVVJDRV9XQVJNX1VQX05PUk1BTDESATAYACAAOgBaCTEwNjc5MTk0MmIgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjM1MDg5MTAxMDaKAQk2NTAzMTMzNjSqAQlyZWNvbW1lbmTCASA1NGZjZGU5NjllMzE0NDkyM2M2ZjM3NjMwYTI0NjQwOPIBCggMEgZOb3JtYWzyASgIChIkMjQxOTkzNDMtZTA3ZS00ODNkLWFkN2UtZGUxYTM1Zjg0MjIz8gEFCAsSATeCAgCIAo2Dp+76MZICIDU0ZmNkZTk2OWUzMTQ0OTIzYzZmMzc2MzBhMjQ2NDA4mgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXKAhhDb250ZW50V2FybVVwQnJlYWtJblJ1bGXaAhlUU19TT1VSQ0VfV0FSTV9VUF9OT1JNQUwx6AIC+gILTk9STUFMX0ZMT1eKAyBhNTFkZjM0OTg3MDY0Njk4YWFkOGM0M2VlZWMxZTU2Y5oDDQoCdjAQABoFb3RoZXKoAw3YAwDqAx90ZXh0XzEyaG91cl91bmlmaW5zaGVkX3JlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAJhacIEAzQwMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAgMDWkj+BBQAAAAAAAAAAiQV1LRYwrv+wP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUGkgIlCgk2NjgwNTUxOTcSCjM1MDg5MTAxMDYYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }, {
      id: "41_1716607631.438",
      type: "feed",
      offset: 41,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607631,
      updated_time: 1716607631,
      target: {
        id: 3504322769,
        type: "answer",
        url: "https://api.zhihu.com/answers/3504322769",
        author: {
          id: "51410cd77a1949827ca35b1b6f81be15",
          url: "https://api.zhihu.com/people/51410cd77a1949827ca35b1b6f81be15",
          user_type: "people",
          url_token: "34-18-88-26-58",
          name: "你是什么质地",
          headline: "只讲自己的故事",
          avatar_url: "https://pic1.zhimg.com/50/v2-10b20470e80a6274affe25aeba407dce_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          followers_count: 88,
          is_following: false,
          is_followed: false
        },
        created_time: 1716190247,
        updated_time: 1716190247,
        voteup_count: 1390,
        thanks_count: 43,
        comment_count: 173,
        is_copyable: true,
        question: {
          id: 511294533,
          type: "question",
          url: "https://api.zhihu.com/questions/511294533",
          author: {
            id: "bc402f110e1bbcd4b71220d34f62bf9f",
            url: "https://api.zhihu.com/people/bc402f110e1bbcd4b71220d34f62bf9f",
            user_type: "people",
            url_token: "yan-shi-59-24",
            name: "知乎用户Zbik5S",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "女生主动起来会有多主动?",
          created: 1642039023,
          answer_count: 0,
          follower_count: 0,
          comment_count: 54,
          bound_topic_ids: [3058, 7198, 152824],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "16年欧冠决赛。 约妹子一起看球，妹子说：没兴趣，要睡觉。 我说，那要不去你家看？妹子说：行。 然后我带了啤酒小吃去了她家。 球赛还没开始，妹子说困得不行了，先睡了。 我在客厅等着球赛开始，百无聊赖。于是就去卧室找妹子。门没关，妹子穿着短袖短裤躺在床上，我看着妹子的大长腿忍不住扑了上去，妹子醒了，推开我说：你好好看你的球。 然后我就真的回到了客厅，看了一夜球。",
        excerpt_new: "16年欧冠决赛。 约妹子一起看球，妹子说：没兴趣，要睡觉。 我说，那要不去你家看？妹子说：行。 然后我带了啤酒小吃去了她家。 球赛还没开始，妹子说困得不行了，先睡了。 我在客厅等着球赛开始，百无聊赖。于是就去卧室找妹子。门没关，妹子穿着短袖短裤躺在床上，我看着妹子的大长腿忍不住扑了上去，妹子醒了，推开我说：你好好看你的球。 然后我就真的回到了客厅，看了一夜球。",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="whhRHRoJ">16年欧冠决赛。</p><p data-pid="Su2rcWxQ">约妹子一起看球，妹子说：没兴趣，要睡觉。</p><p data-pid="_p5bDJFC">我说，那要不去你家看？妹子说：行。</p><p data-pid="pYj1-QYg">然后我带了啤酒小吃去了她家。</p><p data-pid="LKgjrTtH">球赛还没开始，妹子说困得不行了，先睡了。</p><p data-pid="JmcSjZRP">我在客厅等着球赛开始，百无聊赖。于是就去卧室找妹子。门没关，妹子穿着短袖短裤躺在床上，我看着妹子的大长腿忍不住扑了上去，妹子醒了，推开我说：你好好看你的球。</p><p data-pid="RXaHe6jU">然后我就真的回到了客厅，看了一夜球。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 430442,
        favorite_count: 132,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3504322769}',
      attached_info: "CoEFCIPmg9ePyKLDuQEQBBoJNjY3MjIxMzkzIKf4q7IGKO4KMK0BQClKKAoTVFNfU09VUkNFX0ZFRURSRV9WNxIBMBgAIAA6CnsicmF3IjoiIn1aCDc1OTAyNTg4YiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIKMzUwNDMyMjc2OYoBCTUxMTI5NDUzM6oBCXJlY29tbWVuZMIBIDUxNDEwY2Q3N2ExOTQ5ODI3Y2EzNWIxYjZmODFiZTE18gEKCAwSBk5vcm1hbPIBKAgKEiQxMjJhMzMxZS01MzZlLTRkOTMtOTNhMi1mMTI5OWNhMzk0ZWHyAQUICxIBN4ICAIgCjYOn7voxkgIgNTE0MTBjZDc3YTE5NDk4MjdjYTM1YjFiNmY4MWJlMTWaAgDKAhRGaXJzdEJydXNoV2VpZ2h0UnVsZcoCFlJldmlzaXRWYWx1ZVdlaWdodFJ1bGXaAhNUU19TT1VSQ0VfRkVFRFJFX1Y36AIC+gILTk9STUFMX0ZMT1eKAyBhNTFkZjM0OTg3MDY0Njk4YWFkOGM0M2VlZWMxZTU2Y5oDDQoCdjAQABoFb3RoZXKoA+qiGtgDAOoDCWZlZWRyZV92N/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAABg0EzBP4EFAAAAAAAAAACJBXUtFjCu/7A/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQaSAiUKCTY2NzIyMTM5MxIKMzUwNDMyMjc2ORgEIgpJTUFHRV9URVhU",
      action_card: false
    }];
    const mockList5 = [{
      id: "42_1716607632.86",
      type: "feed",
      offset: 42,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607632,
      updated_time: 1716607632,
      target: {
        id: 620839483,
        type: "answer",
        url: "https://api.zhihu.com/answers/620839483",
        author: {
          id: "69ed13f3ddc662d6ecd8261512117e85",
          url: "https://api.zhihu.com/people/69ed13f3ddc662d6ecd8261512117e85",
          user_type: "people",
          url_token: "yujiangshui",
          name: "于江水在银河系",
          headline: "目前定居银河系，关注 Web3、人工智能和种菜技术。",
          avatar_url: "https://picx.zhimg.com/50/v2-c33bc887b78fde3bb97ce3e44e8c6262_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          badge: [{
            type: "best_answerer",
            description: "前端开发话题下的优秀答主",
            topic_names: ["前端开发"],
            topic_ids: [225]
          }],
          followers_count: 31533,
          is_following: false,
          is_followed: false
        },
        created_time: 1552384731,
        updated_time: 1552459023,
        voteup_count: 825,
        thanks_count: 137,
        comment_count: 157,
        is_copyable: false,
        question: {
          id: 31985865,
          type: "question",
          url: "https://api.zhihu.com/questions/31985865",
          author: {
            id: "559ec8498271b8d57d8db08c8aba569f",
            url: "https://api.zhihu.com/people/559ec8498271b8d57d8db08c8aba569f",
            user_type: "people",
            url_token: "liu-elva-94",
            name: "Elva",
            headline: "",
            avatar_url: "https://pic1.zhimg.com/50/5423d3ebef11b29c5167549694e16420_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 1,
            is_following: false,
            is_followed: false
          },
          title: "为什么前端精通Node.js的人这么少？",
          created: 1436248143,
          answer_count: 0,
          follower_count: 0,
          comment_count: 2,
          bound_topic_ids: [225, 6445],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "之前曾经跟一个后端老大争论过 Node 应用的问题，他一句话把我噎死了，大意就是 前端用 Node.js 写后端，通常考虑的是怎么快速实现业务需求，Java 同学写后端，考虑架构和性能（比如内存、进程之类）等，注意到很多地方。然后又举出了实际的例子，说某些 Node 应用全是靠堆机器运行，要是 Java 写根本用不了这些资源。 想想也有道理，前端主要知识领域是客户端 JS、CSS、前端性能、用户体验等，除了专业做 Node.js 的，也没有很…",
        excerpt_new: "之前曾经跟一个后端老大争论过 Node 应用的问题，他一句话把我噎死了，大意就是 前端用 Node.js 写后端，通常考虑的是怎么快速实现业务需求，Java 同学写后端，考虑架构和性能（比如内存、进程之类）等，注意到很多地方。然后又举出了实际的例子，说某些 Node 应用全是靠堆机器运行，要是 Java 写根本用不了这些资源。 想想也有道理，前端主要知识领域是客户端 JS、CSS、前端性能、用户体验等，除了专业做 Node.js 的，也没有很…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "need_payment",
        content: '<p data-pid="oW54LD1k">之前曾经跟一个后端老大争论过 Node 应用的问题，他一句话把我噎死了，大意就是 <b>前端用 Node.js 写后端，通常考虑的是怎么快速实现业务需求，Java 同学写后端，考虑架构和性能（比如内存、进程之类）等，注意到很多地方。</b></p><p data-pid="HoKyjuXL">然后又举出了实际的例子，说某些 Node 应用全是靠堆机器运行，要是 Java 写根本用不了这些资源。</p><p data-pid="kGZkgbGO">想想也有道理，前端主要知识领域是客户端 JS、CSS、前端性能、用户体验等，除了专业做 Node.js 的，也没有很多空闲时间去深入研究和学习底层的一些知识，可以从操作系统进程、内存等底层关注到上层业务去做优化，写 Node.js 通常为了快速实现一些工具、简单的 Web 服务或者 BFF 层逻辑等，哪有这么深入的研究，框架帮忙做好就好，用就是了。</p><p data-pid="YI1V5aay">当然反过来看，<b>为啥非专业做 Node.js 前端要这么精通 Node.js 呢？</b>简单上手，为前端扩展后端和客户端的能力，快速实现小需求，就足够带来很大的价值了吧。此外，让前端去做 Node.js 的工作，其实也需要投入一些培养、学习成本，很多轻度用 Node.js 的公司或者小团队也没有这么大资源投入吧。</p><p data-pid="k5YIXhE4">以上就是我觉得为什么前端精通 Node.js 的人这么少的原因。主业前端搞好了，Node.js 能快速满足需求就够了，并不需要特别精通（除非专门做 Node 的同学）。现在的 Lambda 这些 FaaS 服务，函数都要求比较小，用 Node.js 来写，更不需要精通啥，能调用通各种服务就好了。</p><p data-pid="IslPvt9y">===补充</p><p data-pid="U_vQjd7a">看到评论有说还是看人或者精通 Java 的人也不多等，我再简单总结下<b>这个问题</b>我所认为的回答（个人见解）：</p><ol><li data-pid="BZmIRQ82">前端精通 Node.js 少，是因为对于大部分前端来说，学会 Node.js 只是能力扩展，并没有很多精力关注很细节的东西（Java 后端可是全部精力都在 Java 以及相关的架构设计、高并发、内存控制啥的上面），往往满足需求就好了。</li><li data-pid="WTc_c4R4">Node.js 通常适用于一些简单场景，比如工程工具、Web Server（渲染层）、接口聚合（BFF）以及 Serverless 架构的应用等，这些业务场景也不需要开发的前端具备多高的 Node.js 水平，不需要精通也可以实现需求（也是 Node.js 的重要优势）。</li></ol><p data-pid="kHYlS64-">以上就是我认为前端精通 Node.js 的人少的原因。当然也有基于 Node.js 的核心应用，也有研究 GC、C++ 扩展、部署运维监控等的大神，但精通的可能真的不多。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 251802,
        favorite_count: 650,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 620839483}',
      attached_info: "Co8FCLa1o+6vpaSkmQEQBBoJMTQyOTQ3MzgyINuFnuQFKLkGMJ0BQCpKIAoVVFNfU09VUkNFX1RIRU1FX01FUkdFEgEwGAAgADoAWgc0OTkzNjgxYiBhNjMzZGNjNzIzYWVlMjUyYmU3NTU2N2I0Y2RmODg4NnIJNjIwODM5NDgzigEIMzE5ODU4NjWqAQlyZWNvbW1lbmTCASA2OWVkMTNmM2RkYzY2MmQ2ZWNkODI2MTUxMjExN2U4NfIBCggMEgZOb3JtYWzyASgIChIkMWYzYTZkN2ItZDcyNS00YTAzLWJiYTAtMzc5NWQ5MzkzZDNm8gEFCAsSATiCAgCIAvWKp+76MZICIDY5ZWQxM2YzZGRjNjYyZDZlY2Q4MjYxNTEyMTE3ZTg1mgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXaAhVUU19TT1VSQ0VfVEhFTUVfTUVSR0XoAgT6AgtOT1JNQUxfRkxPV4oDIDJmYThiMjU0YThlOTQ1Nzg4YTZkMDU5Njc1YmJiNjE0mgMNCgJ2MBAAGgVvdGhlcqgDmq8P2AMA6gMbVGhlbWVNZXJnZU5ld1YzUG9vbFJlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATSgBACoBACwBAC6BAZtYW51YWzCBAMxMTDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAIBekcM/gQUAAAAAAAAAAIkF6mdrbi+ysT+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFB5ICJAoJMTQyOTQ3MzgyEgk2MjA4Mzk0ODMYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }, {
      id: "43_1716607632.348",
      type: "feed",
      offset: 43,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607632,
      updated_time: 1716607632,
      target: {
        id: 3436324479,
        type: "answer",
        url: "https://api.zhihu.com/answers/3436324479",
        author: {
          id: "d5ec192887f97fd2d982b072ff250f2a",
          url: "https://api.zhihu.com/people/d5ec192887f97fd2d982b072ff250f2a",
          user_type: "people",
          url_token: "13-38-95-36-38",
          name: "慕白",
          headline: "92年出生，基层工作11年",
          avatar_url: "https://pica.zhimg.com/50/v2-6b99189ceeab76a366eb18207d43f7f8_l.jpg?source=b6762063",
          is_org: false,
          gender: 1,
          badge: [{
            type: "identity_people",
            description: "广南县篆角乡卫生院 布标分院负责人"
          }],
          followers_count: 1298,
          is_following: false,
          is_followed: false
        },
        created_time: 1710847138,
        updated_time: 1710847138,
        voteup_count: 252,
        thanks_count: 29,
        comment_count: 74,
        is_copyable: false,
        question: {
          id: 61028170,
          type: "question",
          url: "https://api.zhihu.com/questions/61028170",
          author: {
            id: "6be75dbfbda0187e6bcb80484b8f7ed3",
            url: "https://api.zhihu.com/people/6be75dbfbda0187e6bcb80484b8f7ed3",
            user_type: "people",
            url_token: "si-ling-66-49",
            name: "肆陵MUA",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/v2-0f7c87f345fce2556573ce30cced5d48_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 456,
            is_following: false,
            is_followed: false
          },
          title: "有哪些让你感动至落泪的照片？",
          created: 1497312233,
          answer_count: 0,
          follower_count: 0,
          comment_count: 35,
          bound_topic_ids: [307, 388, 988, 6311, 66698],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        thumbnail: "https://pic1.zhimg.com/50/v2-34158eca7e0f90b316e29a3119db32d8_720w.jpg?source=b6762063",
        thumbnail_extra_info: {
          video_id: "1753500250999119873",
          type: "video",
          url: "https://picx.zhimg.com/v2-34158eca7e0f90b316e29a3119db32d8.jpg?source=382ee89a",
          height: 1280,
          width: 720,
          duration: 7,
          playlist: {
            ld: {
              url: "https://vdn6.vzuu.com/SD/3f4c1bd2-e5e2-11ee-84e4-1a263ff94483-v8_f2_t1_xNxAjsDp.mp4?pkey=AAVllFisw5rdKiyb0YGIRj4ElmyvNPEJyPdoV4KkvD6nLQpo3j0W_EjV9TfQjl4oSU7ak_xBVjgIGN6-TvOMCnHz&c=avc.8.0&f=mp4&pu=4e83193b&bu=b9ce98d5&expiration=1716614832&v=ks6",
              width: 478,
              height: 848,
              bitrate: 296,
              duration: 7,
              format: "mp4",
              fps: 25,
              size: 292293
            },
            sd: {
              url: "https://vdn6.vzuu.com/SD/3f4c1bd2-e5e2-11ee-84e4-1a263ff94483-v8_f2_t1_xNxAjsDp.mp4?pkey=AAVllFisw5rdKiyb0YGIRj4ElmyvNPEJyPdoV4KkvD6nLQpo3j0W_EjV9TfQjl4oSU7ak_xBVjgIGN6-TvOMCnHz&c=avc.8.0&f=mp4&pu=4e83193b&bu=b9ce98d5&expiration=1716614832&v=ks6",
              width: 478,
              height: 848,
              bitrate: 296,
              duration: 7,
              format: "mp4",
              fps: 25,
              size: 292293
            },
            hd: {
              url: "https://vdn6.vzuu.com/SD/3f4c1bd2-e5e2-11ee-84e4-1a263ff94483-v8_f2_t1_xNxAjsDp.mp4?pkey=AAVllFisw5rdKiyb0YGIRj4ElmyvNPEJyPdoV4KkvD6nLQpo3j0W_EjV9TfQjl4oSU7ak_xBVjgIGN6-TvOMCnHz&c=avc.8.0&f=mp4&pu=4e83193b&bu=b9ce98d5&expiration=1716614832&v=ks6",
              width: 478,
              height: 848,
              bitrate: 296,
              duration: 7,
              format: "mp4",
              fps: 25,
              size: 292293
            }
          },
          show_maker_entrance: false,
          play_auth_token: "V1-0f31dc4683300b655fd5d693382600f9-0-ad429b011a4611ef868c9eedcf611eb2-1716607632863-1716694032863-db99ffcbb7294a0be2b77202f7a83f9efbe17983a2bb5bcb1b06a38976342800"
        },
        excerpt: "如果日本人再敢欺负中国人，别看我老了，我照样拿着枪和他们拼命。",
        excerpt_new: "如果日本人再敢欺负中国人，别看我老了，我照样拿着枪和他们拼命。",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "disallowed",
        content: '<p data-pid="VwxwhTmh">如果日本人再敢欺负中国人，别看我老了，我照样拿着枪和他们拼命。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 1,
        play_count: 1141796,
        attachment: {
          type: "video",
          is_complete: false,
          parent_content_token: "1753500665429872640",
          split_start: 0,
          parent_play_count: 1141898,
          parent_voteup_count: 0,
          parent_title: "有哪些让你感动至落泪的照片？"
        },
        thumbnails: ["https://picx.zhimg.com/50/v2-34158eca7e0f90b316e29a3119db32d8_720w.jpg?source=b6762063"],
        favorite_count: 36,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3436324479}',
      attached_info: "CqQFCLa1o+6vpaSkmQEQBBoJNjU0ODYwNTg5IKLp5a8GKPwBMEpAK0o0Ch9UU19TT1VSQ0VfRkVFRFJFX1YzX1ZJREVPX01FUkdFEgEwGAAgADoKeyJyYXciOiIifVoIMTY2MzUyMTBiIGE2MzNkY2M3MjNhZWUyNTJiZTc1NTY3YjRjZGY4ODg2aIHA8bKB5uuqGHIKMzQzNjMyNDQ3OYoBCDYxMDI4MTcwqgEJcmVjb21tZW5kwgEgZDVlYzE5Mjg4N2Y5N2ZkMmQ5ODJiMDcyZmYyNTBmMmHyAQoIDBIGTm9ybWFs8gEoCAoSJDMyMTliOGZiLWUzMmYtNDJmZC05Zjk3LTYyMmZhZDI2MmQ2ZfIBBQgLEgE4ggIAiAL1iqfu+jGSAiBkNWVjMTkyODg3Zjk3ZmQyZDk4MmIwNzJmZjI1MGYyYZoCAMoCFEZpcnN0QnJ1c2hXZWlnaHRSdWxlygIWUmV2aXNpdFZhbHVlV2VpZ2h0UnVsZdoCH1RTX1NPVVJDRV9GRUVEUkVfVjNfVklERU9fTUVSR0XoAgL6AgtOT1JNQUxfRkxPV4oDIDJmYThiMjU0YThlOTQ1Nzg4YTZkMDU5Njc1YmJiNjE0mgMNCgJ2MBAAGgVvdGhlcqgDAdgDAOoDD2ZlZWRyZV92M192aWRlb/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEyoAQAqAQAsAQAugQGbWFudWFswgQCMzDIBADSBA/mjqjojZDlt7Lmm7TmlrDYBADwBAD5BAAAAADK958/gQUAAAAAAAAAAIkF6mdrbi+ysT+SBQCaBQNkZnSiBQNkZnSyBQExuQUAAAAAAAAAANAFAOAFAOgFAPAFB5ICIAoJNjU0ODYwNTg5EgozNDM2MzI0NDc5GAQiBVZJREVP",
      action_card: false
    }, {
      id: "44_1716607632.194",
      type: "feed",
      offset: 44,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607632,
      updated_time: 1716607632,
      target: {
        id: 2781099609,
        type: "answer",
        url: "https://api.zhihu.com/answers/2781099609",
        author: {
          id: "0ce79a54d8b54de9d9d0e943b795236c",
          url: "https://api.zhihu.com/people/0ce79a54d8b54de9d9d0e943b795236c",
          user_type: "people",
          url_token: "lvfeifei-68",
          name: "盛夏啦",
          headline: "",
          avatar_url: "https://pic1.zhimg.com/50/v2-f8233b73e40d7407e5eb2db3caffb0cd_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 773,
          is_following: false,
          is_followed: false
        },
        created_time: 1669775074,
        updated_time: 1669775074,
        voteup_count: 36619,
        thanks_count: 3136,
        comment_count: 1325,
        is_copyable: true,
        question: {
          id: 476697113,
          type: "question",
          url: "https://api.zhihu.com/questions/476697113",
          author: {
            id: "965e9395e969c5034650f65a7ca13024",
            url: "https://api.zhihu.com/people/965e9395e969c5034650f65a7ca13024",
            user_type: "people",
            url_token: "xiao-qiao-61-5-28",
            name: "小乔",
            headline: "可爱到了",
            avatar_url: "https://picx.zhimg.com/50/v2-45e632cda5b048c177d72308a0cc2661_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 32,
            is_following: false,
            is_followed: false
          },
          title: "吴亦凡这种大起大落之后，会咋样？",
          created: 1627880746,
          answer_count: 0,
          follower_count: 0,
          comment_count: 23,
          bound_topic_ids: [8456],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "吴亦凡可能没有机会去思考以后咋样了。 他在国内蹲完13年之后会被遣返回加拿大，加拿大警方会在他回国几天内，对他发起传讯，然后不出意外的话，他会接着去蹲监狱。 鉴于此前他还在美国强奸了幼女，美国的律师和警察应该也会对他发出监狱邀请书。 大概会成为全球巡回蹲监狱的明星第一人。",
        excerpt_new: "吴亦凡可能没有机会去思考以后咋样了。 他在国内蹲完13年之后会被遣返回加拿大，加拿大警方会在他回国几天内，对他发起传讯，然后不出意外的话，他会接着去蹲监狱。 鉴于此前他还在美国强奸了幼女，美国的律师和警察应该也会对他发出监狱邀请书。 大概会成为全球巡回蹲监狱的明星第一人。",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="IdiVmdP-">吴亦凡可能没有机会去思考以后咋样了。</p><p data-pid="U4F1iml0">他在国内蹲完13年之后会被遣返回加拿大，加拿大警方会在他回国几天内，对他发起传讯，然后不出意外的话，他会接着去蹲监狱。</p><p data-pid="ECdcf9GB">鉴于此前他还在美国强奸了幼女，美国的律师和警察应该也会对他发出监狱邀请书。</p><p data-pid="ydwiiGW2">大概会成为全球巡回蹲监狱的明星第一人。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 6272415,
        favorite_count: 1030,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 2781099609}',
      attached_info: "CqAFCLa1o+6vpaSkmQEQBBoJNTM1NzQxNTAyIOL9mpwGKIueAjCtCkAsSigKE1RTX1NPVVJDRV9GRUVEUkVfVjcSATAYACAAOgp7InJhdyI6IiJ9Wgg2ODIxMzI4NGIgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjI3ODEwOTk2MDmKAQk0NzY2OTcxMTOqAQlyZWNvbW1lbmTCASAwY2U3OWE1NGQ4YjU0ZGU5ZDlkMGU5NDNiNzk1MjM2Y/IBCggMEgZOb3JtYWzyASgIChIkZDQ3Mzk5MTYtYWQ4OS00NTg1LWI1NGEtMTljMWQwYmFkY2I58gEFCAsSATiCAgCIAvWKp+76MZICIDBjZTc5YTU0ZDhiNTRkZTlkOWQwZTk0M2I3OTUyMzZjmgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAhZSZXZpc2l0VmFsdWVXZWlnaHRSdWxl2gITVFNfU09VUkNFX0ZFRURSRV9WN+gCAvoCC05PUk1BTF9GTE9XigMgMmZhOGIyNTRhOGU5NDU3ODhhNmQwNTk2NzViYmI2MTSaAw0KAnYwEAAaBW90aGVyqAOf6/4C2AMA6gMJZmVlZHJlX3Y3+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATKgBACoBACwBAC6BAZtYW51YWzCBAIzMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAIFj/vz+BBQAAAAAAAAAAiQXqZ2tuL7KxP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUHkgIlCgk1MzU3NDE1MDISCjI3ODEwOTk2MDkYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }, {
      id: "45_1716607632.445",
      type: "feed",
      offset: 45,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607632,
      updated_time: 1716607632,
      target: {
        id: 3486009384,
        type: "answer",
        url: "https://api.zhihu.com/answers/3486009384",
        author: {
          id: "a52b7f975c447bf6b359e3370e78a6ac",
          url: "https://api.zhihu.com/people/a52b7f975c447bf6b359e3370e78a6ac",
          user_type: "people",
          url_token: "you-ren-ke-xin-ma",
          name: "有人可信吗",
          headline: "",
          avatar_url: "https://pica.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 292,
          is_following: false,
          is_followed: false
        },
        created_time: 1714695765,
        updated_time: 1714695765,
        voteup_count: 386,
        thanks_count: 4,
        comment_count: 9,
        is_copyable: true,
        question: {
          id: 614186261,
          type: "question",
          url: "https://api.zhihu.com/questions/614186261",
          author: {
            id: "5de077b29905515058b0131857a5ad0c",
            url: "https://api.zhihu.com/people/5de077b29905515058b0131857a5ad0c",
            user_type: "people",
            url_token: "72-34-17-30",
            name: "橙子昕球",
            headline: "",
            avatar_url: "https://picx.zhimg.com/50/v2-0739a1a57f29ea3682d484c23a565972_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 22,
            is_following: false,
            is_followed: false
          },
          title: "有没有那种女主全程都很清醒的文?",
          created: 1690393693,
          answer_count: 0,
          follower_count: 0,
          comment_count: 7,
          bound_topic_ids: [4105, 19898, 124781, 184412, 452315],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "“腿张开，小腹收紧！” 我羞耻的躺在软榻上，浑身只剩一片白纱遮羞，双颊潮红。 房间内奏着琴瑟之音，似骤雨狂风吹珠落，袅袅春香更让人心神浮躁，欲求渐升。 一个丰腴的女人倚靠在窗前，她便是教坊司的春娘，对这样的场面早已经习以为常了。 直到我双腿颤颤巍巍，春娘才扭着身子朝我走来，轻轻扶住我的玉腿，从胸口摸出一根小臂长短，双指粗细的木棍，恰到好处的放在我的双腿之间。 “记清楚了，你是罪人之女，这是你唯一的翻…",
        excerpt_new: "“腿张开，小腹收紧！” 我羞耻的躺在软榻上，浑身只剩一片白纱遮羞，双颊潮红。 房间内奏着琴瑟之音，似骤雨狂风吹珠落，袅袅春香更让人心神浮躁，欲求渐升。 一个丰腴的女人倚靠在窗前，她便是教坊司的春娘，对这样的场面早已经习以为常了。 直到我双腿颤颤巍巍，春娘才扭着身子朝我走来，轻轻扶住我的玉腿，从胸口摸出一根小臂长短，双指粗细的木棍，恰到好处的放在我的双腿之间。 “记清楚了，你是罪人之女，这是你唯一的翻…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="OaGtuEUA">“腿张开，小腹收紧！”</p><p data-pid="Yoqr46LD">　　我羞耻的躺在软榻上，浑身只剩一片白纱遮羞，双颊潮红。</p><p data-pid="8Wlwhzfo">　　房间内奏着琴瑟之音，似骤雨狂风吹珠落，袅袅春香更让人心神浮躁，欲求渐升。</p><p data-pid="6Ashcoj6">　　一个丰腴的女人倚靠在窗前，她便是教坊司的春娘，对这样的场面早已经习以为常了。</p><p data-pid="CCJctNOz">　　直到我双腿颤颤巍巍，春娘才扭着身子朝我走来，轻轻扶住我的玉腿，从胸口摸出一根小臂长短，双指粗细的木棍，恰到好处的放在我的双腿之间。</p><p data-pid="pnc3Zfbz">　　“记清楚了，你是罪人之女，这是你唯一的翻身之本，你要想活，就要好好利用。”</p><p data-pid="PNWFTIHJ">　　我努力点点头，言罢，那木棍便蛮横的侵入我的体内，我一时没受住，一声娇喘，浑身卸了力。</p><p data-pid="T4hrOqvN">　　春娘捡起木棍，放在鼻翼上嗅着，“倒是一副好皮肉，就是还得练。”</p><p data-pid="4NQk0Rz3">　　说完，又再次抬起我的玉腿，这次分开的尺度更大，一股难以言明的酸胀感从四面八方袭击着我娇弱的身子。</p><p data-pid="wB8qjkd0">　　“你若还是受不住，夹不住，未来那些风流公子，可没人愿意在你身上花时间，只有让那些公子欲罢不能，你才有一线机会，到时候莫说我没帮你！”</p><p data-pid="Hcyf0N1w">　　我闻言咬唇，颤颤巍巍的应下。</p><p data-pid="-Z3-D4Vk">　　又过了一刻，春娘又欺身过来，我感觉自己就像一团面团，任她搓扁揉圆。</p><p data-pid="mgzba1zk">　　一种美妙的感觉油然而生，我忍不住发出勾人心魄的呓语，这种无师自通，仿佛与生俱来的浅唱低吟，让我羞愧难当。</p><p data-pid="-KJISw7l">　　“记住这个感觉，又纯又欲，才是佳品！”</p><p data-pid="s_WgHCDg">　　直到天色渐暗，我嘶喊娇喘声也渐熄。</p><p data-pid="TRRr1Yaf">　　春娘托着脸颊，面含深意的看着我。</p><p data-pid="rh0tgpkz">　　“白采婕。”</p><p data-pid="5f2VZqaa">　　我低下头一声不吭。</p><p data-pid="JYy4tLFh">　　没错，白采婕是我的本名，我父亲本是御史台户察案检察御史白皋。</p><p data-pid="PfV8xXsw">　　数月前，父亲追查盐铁司赵封贪贿一案，却遭奸人陷害，全家被斩。</p><p data-pid="JRuVKnPz">　　父亲为了保住我，将我装扮成府内婢女，才堪堪躲过一劫。</p><p data-pid="mAHkUHGe">　　留给我的只有两个选择，要么流放宁古塔，要么进教坊，成为一名官妓。</p><p data-pid="85j4lWMr">　　这地方虽然也叫教坊，可却是盐铁司郎中赵封私设的，里面的女人都是他圈养的玩物罢了。</p><p data-pid="QddUu6b-">　　我不甘心父亲就这么蒙冤，于是入了这教坊，怎奈春娘第一次见了我，便断定我不是婢女，几番逼问，我只能承认我是白家独女。</p><p data-pid="SMmBZV84">　　当时城外兵马正乱，定北军虎豹骑一支偏军在城内搜捕罪人，其中就有白家。</p><p data-pid="VxxpfH0Y">　　我提心吊胆许久，以为自己要么死在这教坊内，要么被定北军带走，但春娘没有为难我。</p><p data-pid="9-W1avTx">　　反而独自带着我，每日锁在闺房内，好吃好喝的供着，各种稀奇古怪的香膏胭脂也对我毫不吝啬。</p><p data-pid="L-3UDEtI">　　半年下来，我这身子出落得更加娇艳动人。</p><p data-pid="ARdx0G23">　　都说美人在皮也在骨，寻常人占了一个便是难得一见的佳品，而我在春娘的调养下，不仅全占了，还得天独厚，且不说身段，就是我一小节玉足，都出落的精致万分。</p><p data-pid="foxZmOP5">　　直到今日，春娘开始教我春术，名字取得高雅，但其实便是取悦男子之术，毕竟我们这等身份，这份羞耻可是我们的饭碗。</p><p data-pid="1k01HFMY">　　春娘见我低头不语，轻笑一声，“想不想给你父亲报仇？”</p><p data-pid="3LW8RsDE">　　我点点头，这是我活着唯一的愿想！</p><p data-pid="w22XN3-j">　　“帮我一个忙，我便助你一臂之力。”</p><p data-pid="64ZEl4J8">　　我没得选择，只能点点头，“春娘你只管吩咐，只要白采婕能办到！”</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="KzM3mYFI">第2章</p><p data-pid="dN8huQe3">　　螳螂捕蝉，黄雀在后。</p><p data-pid="ZD90JuHM">　　直到此刻，我所见到的春娘，不过冰山一角。</p><p data-pid="UNfeRkla">　　春娘寻我帮忙的前一夜，平日里高高在上的春娘，却毕恭毕敬。</p><p data-pid="jhM0Hs_Y">　　站在春娘对面的人，名唤许朗。</p><p data-pid="pKRbJhvF">　　十年前，一场险些掀翻王朝的起义，让弄权者至今惶惶不可终日。而当时那场起义的领导者，名唤许梁梦，许朗正是他的儿子。</p><p data-pid="dOYooqmM">　　据我所知，当年许梁梦本是朝廷大将，可惜后来忽然造反，失败后手下的将士死的死，散的散，朝廷诛了许家九族，可唯独跑了一个儿子，没想到许朗竟藏在教坊司。</p><p data-pid="Pe-lJ4O9">　　蛰伏多年，如今新的风暴已经跃跃欲试。但现在还差一个机会。许朗如今是最低贱的奴籍，连走出教坊司都是个问题，更谈何召回当年的部将呢……</p><p data-pid="4uAwwqCm">　　“白采婕，是白皋的女儿。”</p><p data-pid="3JcEqmvM">　　“她是忠臣之后深陷囹圄，我是谋反逆贼身处地狱，不妨好好利用一下。”</p><p data-pid="f8XNCtBu">　　许朗的侧脸淡漠如冰，只是一句话，就让身陷囹圄的我，又被迫卷进了一场更大的阴谋……</p><p data-pid="ZdrBNmcY">　　翌日，春娘带了一个男人进来。</p><p data-pid="J5xntNtK">　　“他唤做许朗，不是阉人。”</p><p data-pid="oitEi50q">　　春娘倚在凭栏处，背对着男子，声音平淡如水，教人猜不透摸不着里面的道道。</p><p data-pid="U0g6uU2d">　　我黛眉微微紧蹙，教坊养着这么多阉人，为的就是服侍我们这些官妓。</p><p data-pid="kSqOFiiM">　　但不是每一个官妓都能有这种待遇，只有成了花魁，才会给每个花魁配一个贴身的小斯。</p><p data-pid="iZDXU-H4">　　既然是服侍花魁的，所以才要阉人。</p><p data-pid="clv-YnqW">　　“许朗，不能越雷池半分！”</p><p data-pid="4xZ-1gUi">　　春娘的话很重。</p><p data-pid="2m52QxMc">　　许朗点点头，将我身上唯一的白纱脱下。</p><p data-pid="AvX84Swo">　　双臂将我抱在怀里，送进铺满花瓣的浴桶内。</p><p data-pid="cFtbttKw">　　我胸前两团实在挺拔，平躺在许朗的臂弯内，凸起却险些触碰到许朗下巴。</p><p data-pid="P0znltgN">　　我能感受到许朗逐渐急促的呼吸，自己也莫名燥热起来。</p><p data-pid="JRceLgX0">　　这是我袒胸相对的第一个男人！</p><p data-pid="u6iaP_1b">　　入水之后，许朗轻轻的擦拭着我的身体，他的指尖划过胸前落到小腹，我没忍住笑得咯吱咯吱乱颤，柳腰绵绵，峰峦叠叠，这活色生香的模样，没有男人把持得住，许朗也不例外。</p><p data-pid="OPKkpQTH">　　春娘眼尖的很，手中木棍破空飞出。</p><p data-pid="XxEl6XId">　　“才这点程度就把持不住了？往后忍不住的话，你不仅害死自己，还害死白采婕！”</p><p data-pid="tGsXG0-V">　　说到这里，许朗停顿了下来，额上冒着汗珠，喉结滚动，“我定会保护好白采婕姑娘！”</p><p data-pid="bCLqpSV4">　　我心神一颤，这是第一次有男子向我许诺。</p><p data-pid="iRy6nDnd">　　说完，我腹下悄然一紧，却是许朗探索到了泉眼，几次揉捏，手法温柔婉转，我眸子渐渐迷失。</p><p data-pid="PsICckjj">　　“嗯哼……”</p><p data-pid="-IzLJm76">　　“小姐，可是弄疼你了？”</p><p data-pid="jvcvvzeZ">　　“没……”</p><p data-pid="G24F-27v">　　食髓知味的感觉一发不可收拾，但许朗倒是双目清明，让我不由得对他生出几分好奇和佩服来。</p><p data-pid="NQdl1JkC">　　沐浴过后，我换上衣服，许朗在一旁扶着我。</p><p data-pid="qH1X0e5t">　　“春娘，你说让我帮你忙，是……”</p><p data-pid="lVZVZyTQ">　　“我会想办法帮你进赵府，但你要答应我，带许朗走。”</p><p data-pid="BSHembtO">　　我以为，这是一笔划算的交易，也是春娘送我的投名状。</p><p data-pid="nvXqx2bT">　　月色清明，凉风习习。</p><p data-pid="xp3CErqu">　　我躺在床上，许朗守在一边，挺得板正。</p><p data-pid="uofVDNCP">　　爹爹，我一定会为你申冤，只是爹爹，我的身子似乎脏了，你会不会嫌弃我？</p><p data-pid="_Hjrv7hh">　　但就算你生气，我也要走完这条路。</p><p data-pid="0S2Y0svh">　　我翻身，许朗看着我，仿佛把我看穿，就是一个养在深闺，一朝变故后鼓起勇气跌跌撞撞复仇的女孩。</p><p data-pid="TSPDNkRd">　　而我眼波却在许朗身上流转，舍不得离开，那双眼睛，深不见底，是那样的好看！</p><p data-pid="of0ipXcX">　　可是，我深陷腌臜之地，他还有机会，早点送他走，莫要耽误了他！但往后的事情发展还是出乎我的意料。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="xYWqU5TH">第3章</p><p data-pid="4nsCZRTP">　　春娘说，我们是堕入地狱的妖孽，想要活下去，就要撕掉那层羞耻心。</p><p data-pid="EqgcSZyP">　　要纯，要欲，要媚，要浪，独独不能要脸。</p><p data-pid="prx8D8MO">　　听见这话的时候，我才十岁。</p><p data-pid="IqHeGNeG">　　六年后，我如愿变成了一只祸国殃民的狐狸。</p><p data-pid="CupltR7x">　　这六年，没人知道我是怎么过来的，每次我被春娘训得晕厥，都是许朗悉心照顾，我和许朗早已亲密无间，就差最后一层纸没有捅破。</p><p data-pid="jxsaZhde">　　我知道，我已经爱上许朗，可是这层纸太厚，不仅仅有我的顾虑，也有许朗的顾虑……</p><p data-pid="30swbwNZ">　　“藏在闺中六年，小狐狸要出世了！”</p><p data-pid="xz0HVkQ2">　　春娘千娇百媚的扭着身子说话，将我的神拉回来，我也恰好在她眼角看见一丝不舍。</p><p data-pid="22VqJ6sX">　　我不傻，这六年，她是把我当亲女儿对待。</p><p data-pid="G0BvFN_i">　　不然我早就在教坊内沉沦了几百回，染上一身脏病，哪里还能保留这处子身到现在。</p><p data-pid="X52Ggt3K">　　“许朗，帮我把名帖拿来瞧瞧。”</p><p data-pid="zlL9_BHc">　　这名帖，是春娘为我精挑细选的公子哥，无一不是达官贵人。</p><p data-pid="FBltD2tl">　　如今他们豪掷千金，只为买我一床嫣红。</p><p data-pid="JJc4CQB6">　　我把名帖都看了一遍，春娘挑的都是显赫之人，但我感兴趣的却不多。</p><p data-pid="UzZ6BwAp">　　原因其他，里面没有和赵府关系特别紧密的。</p><p data-pid="xiP4Bfo7">　　春娘自然知道我的心思，“伺候好一个人，后面排着队找你的，就像那蜂蝶，密密麻麻。”</p><p data-pid="dx5urIfI">　　我当然知道，但我想进赵府，就不能在外面留下太多风流情。</p><p data-pid="xeuVX7lI">　　“也罢，还有一人，就是盐铁司郎中赵封嫡子，赵宇。”</p><p data-pid="GfTGjspX">　　我眼睑微掀，这名帖里面，却没有赵宇的名号！</p><p data-pid="Bx1q4bqe">　　“赵宇这人，自小本钱足，心狠手辣，玩得太花，而且子孙根大，寻常女子，怕无福消受。”</p><p data-pid="MhoqNYLQ">　　原来春娘是为我着想。</p><p data-pid="--GbfkWz">　　“小姐，换个人也未尝不可。”</p><p data-pid="VY4K4XB5">　　我的许朗也劝我，我心里莫名开心，其实我说不怕是假的，只是……</p><p data-pid="tJdblany">　　这世道就是如此，只有最狠的人，才能笑到最后。</p><p data-pid="qxDabAX1">　　翌日。</p><p data-pid="LOa0w-5Y">　　教坊给我举办了隆重的掀红礼。</p><p data-pid="lgErzapB">　　我着艳红薄衫，在众星捧月下飞舞而下。</p><p data-pid="XgEhwRah">　　一蹙一笑，让无数人的心尖都颤抖。</p><p data-pid="y04AAC3a">　　我在台上看见了那个要取我首夜的男人，肥头大耳，目光无神，一身淫邪之色，应该长年纵情色欲，就似那体衰的狼狗，让人瞧了便没了欲望。</p><p data-pid="3mUkiAPc">　　再说那腰身，无处安放的横肉被束成一圈圈，看到这里，我蓦然想起了许朗……</p><p data-pid="EDInCxjW">　　“妙啊，妙啊，此等天仙，竟由我来开苞！”</p><p data-pid="tBSF7GWO">　　见我峰峦玉骨，魅色天成，赵宇喜上眉梢，连连叫嚣。</p><p data-pid="TC10qgoK">　　无数人恨赵宇恨得牙痒痒，不少人甚至当下丢出万金，要赵宇让出我。</p><p data-pid="57sm1hpO">　　可惜，盐铁司虽然只是从六品官员，可却是朝廷数一数二的肥差，就算拿一个正三品的官职和赵封换，人家可还不要。</p><p data-pid="Pbn84F-B">　　这万金在赵宇眼中，不过他一个月的钱粮罢了。</p><p data-pid="R3g8kq1b">　　我才舞到一半，赵宇便欺身过来，握紧我的腰身，不管台下众人，抚摸我羸弱的脖颈，揭下我数片薄衫，粗暴揉捏。</p><p data-pid="WU8eQp9_">　　我黛眉微蹙，星眸含泪，俯身在赵宇耳朵吹起兰花气，“冤家，这就忍不住了？奴家可还有万般把式未曾施展呢……”</p><p data-pid="F8F--Qin">　　赵宇指尖微顿，倏地抬眼，一对奸淫的眼珠子恨不得吞了我。</p><p data-pid="hpfirQYA">　　“春娘，给我安排水房，我现在就要了这妖精！”</p><p data-pid="u_2VNkrv">　　听得这话，我盈盈一笑，鱼儿阿鱼儿，就怕你不上勾呢！</p><p data-pid="wIdeT5x0">　　许朗啊许朗，你瞧我怎么揭开这一道细细的裂缝，用甘泉，洗涤这世间罪恶。</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="X6au978o">第4章</p><p data-pid="rt_r2i1N">　　水床，其实就是一个温泉池，底下铺了细软。</p><p data-pid="qadSGin_">　　我被赵宇横着抱进去。</p><p data-pid="9r7g4SQu">　　许朗独自守在门口，神情看似寡淡，但我分明在他眼角看见一丝……不悦。</p><p data-pid="Vj80Wu_D">　　闺门合上，两道身影就要缠绵，可惜最后一刻，一股迷烟混在水雾中，袅袅飘动。</p><p data-pid="SOTrvpTg">　　“少将军，这是为何？”说话的是春娘。</p><p data-pid="rW7Cpwee">　　当然这些话我都不知道，因为此时我和赵宇都已经晕倒了。</p><p data-pid="B43dS9td">　　若是我能听见看见，想必会很开心很开心。</p><p data-pid="o3vVKwlS">　　因为我的许朗说，“没什么，就是不喜欢这赵宇，厌恶至极。”</p><p data-pid="4_J3Okgs">　　原来这烟唤情烟，我和赵宇吸入后，便会陷入同一个梦境。</p><p data-pid="0Y-5Xzld">　　在梦里，我们尽情撕咬……</p><p data-pid="Zx7JF5iL">　　虽然只是梦，但许朗见我闭着眼，红着脸，嘴角还勾起一个好看的笑容时，脸色如铁，寻了个借口走了。</p><p data-pid="1SWn8n6f">　　其实，梦里我开心的是，平反迈出了第一步。</p><p data-pid="JQ6B3M86">　　春娘看着许朗，她在怕，怕许朗对我动了心。</p><p data-pid="Fgm7LD2y">　　后半夜，我醒来时，正巧更夫经过，竟四更天了。</p><p data-pid="jmdFrbNg">　　赵宇不舍的勾起我的下巴，“美人，你等着我。”</p><p data-pid="DEm76bhw">　　前脚赵宇刚走，许朗后脚便进来。</p><p data-pid="gOqXoqiX">　　我衣不蔽体躺在地上，朝许朗眨了眨眼。</p><p data-pid="ThLaecMm">　　“许朗，你怎么无动于衷呢……”</p><p data-pid="sdy0T4BI">　　我伸手撩拨着他的下巴，不料许朗反手钳住我，双目赤红，“小姐，莫要惹火！”</p><p data-pid="JOsDYaAp">　　我咬着牙，哀怨的看着许朗，“男人，没一个好东西！”</p><p data-pid="TTVMtWA_">　　“小姐，我与其他人不一样！”</p><p data-pid="TWUfYANv">　　话音落下，许朗臂弯一松，我身下没了支撑，整个人落到了水里，水花伴着热腾腾的水雾，撩人得很。</p><p data-pid="dxp29FWo">　　许朗看着我，一股燥热再也按耐不住，他此刻只有一个想法，就是吃掉我！</p><p data-pid="8bwymXu9">　　水波浮动，许朗三两下解开我的腰带，裙裳从我脚踝滑落，浑身已经空无一物。</p><p data-pid="lHV7xX6w">　　我还没来得及反应，许朗已经将我按到水池边从身后欺身而上。</p><p data-pid="vx47cBpp">　　他狠心一送，我低声轻哼，咬着朱唇向下望去，许朗那东西着实惊人。</p><p data-pid="BJPwAlfc">　　“许朗，慢点儿，让我多享片刻欢愉。”我高高撅起腴臀，将春娘教我的三十六般把式，尽数施展。</p><p data-pid="Is-E_4N9">　　媚声入骨，销魂夺魄，我声声颤音，许朗已经承受不住，水池边上影子忽然摇曳得猛烈起来。</p><p data-pid="BncVEseS">　　我高高昂起鹅颈，转身攀附许朗，柔唇覆上，腹下微微收力，一阵滚烫烫的我心尖颤抖。</p><p data-pid="HfRxcCJQ">　　“许朗，我的命都要被你取了……”</p><p data-pid="il3pxJnN">　　许朗喘着粗气，意犹未尽，将头埋在我的胸上。</p><p data-pid="Ylyk3P6B">　　我索性贴紧，葱葱玉指调皮的画起圈圈，“许朗，你终于憋不住了么……”</p><p data-pid="BH24_PQ0">　　翌日我直睡到晌午。</p><p data-pid="Covhp7UV">　　老鸨亲自端着甜点，一步三扭，嘴巴笑到了天上，看来昨夜赵宇给了不少的好处。</p><p data-pid="oGh7lYTG">　　“不愧是春娘调教六年的花魁，昨夜一曲舞毕，白采婕姑娘的声都传到了长安府了！”</p><p data-pid="HjZ6repn">　　无事不登三宝殿，我穿上衣裳步履懒散的走到窗边，瞧见屋外早就等了一批下人，手上都端着盒子，里面装满金灿灿的黄金。</p><p data-pid="2Y_NfnSu">　　看那数量，教坊六年都没能赚这么多！</p><p data-pid="01wF5Cib">　　老鸨屏退其他人，拉着我的手到偏室去。</p><p data-pid="tSuH4tir">　　赵宇想把我纳回赵府，做个暖床丫鬟。</p><p data-pid="dtG8_gLK">　　这我早有预料，本以为我至少能混个偏房夫人，没想到还是一个丫鬟。</p><p data-pid="gK_aZ24H">　　人啊，一旦脏了，就不管怎么洗，都难等大雅之堂。</p><p data-pid="fVLn0q1H">　　一旦我年老色衰，死了都没人理，这世道，可真黑！</p><p data-pid="lAV-JBSE">　　我拿起属于我的黄金，努努嘴巴，用力的嗅了下，这该死的铜臭味，可真好闻！</p><p data-pid="2tDwUeXI">　　然后抓起一把丢给老鸨。</p><p data-pid="nTLscF63">　　“进赵府，没问题，但我的许朗也要跟我一起走。”</p><p data-pid="viOAr7R6">　　“诶嘿嘿，没问题，全听白姑娘的！”</p><p data-pid="7CcBrWKW">　　我以为这就成功带许朗离开了，但还是出现了意外……</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="l0QoVb2M">第5章</p><p data-pid="s5gjY2Cg">　　收拾细软的时候，春娘哭了。</p><p data-pid="68povAEc">　　“昨夜定北军又来了……”</p><p data-pid="717NfNGi">　　定北军？提前这个名号，我心里总会泛起些许涟漪。</p><p data-pid="w6GvEbX5">　　见我面色不虞，春娘掐在我腰肢上，这六年定北军一直在找你，莫不是忘了？</p><p data-pid="ZgYESLQK">　　我微微一笑，怎么敢忘，也不知道爹爹怎么惹恼了这定北军……</p><p data-pid="4NS8giHK">　　其实春娘就是嘴硬，真要恨我，六年前我就死了，现在她更不会把这些年调制的香膏药丸，金银钱财都给了我。</p><p data-pid="CfzB97S6">　　那可是她在教坊安身立命的本，多少花魁求她都不给。</p><p data-pid="SaAx5WPt">　　“别看赵宇给了一堆金子，你带回赵府，就带不走了，我这些虽然不多，但以后能带走！”</p><p data-pid="NkZ68dvY">　　之后的话，是对许朗说的。</p><p data-pid="YeElQVXc">　　“你出去之后，西去天水，南下京兆都成，寻几个志同道合的朋友，干一番事业！”</p><p data-pid="Qa8V9q_4">　　春娘絮絮叨叨说了许多，不料许朗一句话打乱了春娘苦心孤诣的谋划。</p><p data-pid="pAJmM424">　　“我先随小姐进赵府！”</p><p data-pid="oLG2AiKE">　　言罢，春娘欲言又止，神情焦急，又恶狠狠的瞪了我一眼，我张张嘴巴，没说话。</p><p data-pid="o1vkLIZq">　　“我说过，会保护好小姐。”</p><p data-pid="qJNiHy9S">　　春娘终于举起手掌，不过被我拦住了。</p><p data-pid="FUoNNgel">　　这么动人的情话，我怎么可以无动于衷？</p><p data-pid="MrYjNb4Q">　　春娘看看我，又看看许朗，一副恨铁不成钢的样子，拉着许朗进了偏房。</p><p data-pid="eJQSFNQ3">　　“少将军，你又是为何？”</p><p data-pid="yjWTqPOQ">　　“我在外行走，需要一个不易被人擦觉的身份，赵府下人挺好。”</p><p data-pid="Kx0U9PVp">　　我踮着脚尖原地蹦跶，还以为许朗被我拿捏了，怎料我才是棋子，想想自己真可笑，沦落如此，竟还能生出情爱。</p><p data-pid="c0XJPvib">　　就这样，我和许朗都进了赵府。</p><p data-pid="KoQhsqib">　　都说富者田连阡陌，贫者立锥无地。</p><p data-pid="99zUPRvu">　　没进赵府前，我只知道这句话十二字八十八划。</p><p data-pid="H6JVusrl">　　直到我看见——</p><p data-pid="B-vx-Uf4">　　一扇六间占地的麒麟大门，盖琉璃碧瓦，着红紫名漆，高墙下玉砖粉石一路围砌下去，望不到头，门楣上黑底金漆赵府两个大字，气势夺人。</p><p data-pid="Y4raZ0lV">　　就连门口的巷道，也有专人打扫，哪像寻常百姓家，泥土飞扬，一眼望去没一块落脚的地方。</p><p data-pid="spVKkYbT">　　我才明白这句话的深意，这就是家家户户安居乐业的世道，可笑。</p><p data-pid="TuQdpVHm">　　许朗扶着我的手，几个下人屁颠屁颠的牵着我裙摆，迎着我进门。</p><p data-pid="Z0p7_vTy">　　赵宇在府内等得我心急，刚瞧见我，眉眼就笑了，三步并做二朝我走来。</p><p data-pid="8kUSBqMk">　　“小妖精，想死我了！”说罢就要动手动脚，全然不把身边的人当一回事。</p><p data-pid="f6rNCGPN">　　“冤家，奴家一路舟车劳顿，还待我洗漱完了，再和冤家好好叙旧，奴家也想死公子那好宝贝呢！”</p><p data-pid="hLvVVIkk">　　我俏皮的掐了赵宇腰间的嫩肉，这公子哥看着我媚眼如丝，顿时就软了。</p><p data-pid="B3KGmNek">　　来之前我想过，暖床丫懷，估计和我在教坊住的差不多，但到了一看，我就明白为什么许多人都渴望嫁入赵府了。</p><p data-pid="bjItJrT1">　　我倚靠在窗边，风一吹，才发现楼下的许朗一脸不情愿。</p><p data-pid="HRb1PrHq">　　“许朗，你为什么不走，非要跟我进赵府？”</p><p data-pid="uQKP11iG">　　“外面世道乱，进赵府不见得不好。”</p><p data-pid="TsV1Cd5-">　　我轻笑，嘴硬，可不能让我舒服！</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="xr3KctiU">第6章</p><p data-pid="6VbzvYg9">　　我进赵府不久，赵宇便罕见的要举办春日宴。</p><p data-pid="67JAPaEE">　　春日宴，白天有演武，晚上有艳舞，真妙！</p><p data-pid="NOwksiPz">　　我看着那安排，隐隐约约觉得没有那么简单……</p><p data-pid="ChQyd6se">　　看着陆陆续续进来拜访的帖子堆成小山，我心中烦躁之意更盛！</p><p data-pid="TpzNMj0i">　　自己独自坐在秋千上，身子不受控制的荡起来，直到许朗过来。</p><p data-pid="FQPBM7Vc">　　我抬起眼睑，心里莫名平静些许。</p><p data-pid="1J-MU3dz">　　“许朗，演武你要参见吗？我听春娘说，你一身功夫了得。”</p><p data-pid="lIPbpFjT">　　“小姐想见我出风头吗？”</p><p data-pid="gwzScdxP">　　“想！”</p><p data-pid="Hl7C8A9R">　　“那小姐可要看仔细了，记好我的每一个动作！”</p><p data-pid="gmaxdxev">　　许朗颇为自豪的摆出好几个架势，看来是真有点功夫。</p><p data-pid="-yxLzy3B">　　我的许朗，是这样优秀，让我永远只能抬头仰望……</p><p data-pid="kZG960fl">　　不过，这时候，一张拜帖让我有些惊慌失措。</p><p data-pid="xuN5f2J9">　　是定北军虎豹骑指挥使，振武校尉齐岚！</p><p data-pid="E4TjNYuz">　　齐白两家是世交，齐岚父亲齐徐安是正五品定远将军，齐岚自小尚武，白家未出事前，齐岚已经领振武校尉，算是年轻有为，而且我们早早就订了娃娃亲。</p><p data-pid="e_dPGxEf">　　只是我万万没想到，齐岚竟去了定北军，联想这几年定北军四处寻我，莫不是齐岚找了我六年！？</p><p data-pid="MQbFVPg-">　　唉，我为什么会一副做贼心虚的样子？许朗也盯着我，带着些疑惑……</p><p data-pid="_9hlGpdD">　　我低头躲开，地上的碎石被我踢得四散。</p><p data-pid="hwHAGms3">　　“小姐，你倾心这齐小将军？”</p><p data-pid="kVEo3tpa">　　我差点没跳起来，正要解释，却发现许朗眸子冰得，让我如坐冰窖。</p><p data-pid="1tzeHxMp">　　我感觉我那点小心思，仿佛都被许朗看穿。</p><p data-pid="Uu7U4lvL">　　当然，许朗也确实知道我和齐岚的关系，青梅竹马！</p><p data-pid="feIeftNc">　　“这齐小将军，全无他父亲齐徐安的风骨，竟和赵宇纠缠在一起……”</p><p data-pid="vB0rOksV">　　这声讥笑，我第一反应不是附和，而是……而是嗅到了一丝醋意？？</p><p data-pid="0juzzDNS">　　珠眸泛光，我一反被动应对，“许朗你不会把一夜情，当喜欢吧！”</p><p data-pid="CMO0xzPI">　　一如既往的该死沉默，我都后悔死了，直到有人喊他去干活，许朗才幽幽出声，“我身处地狱，又怎么敢耽误小姐。”</p><p data-pid="GJt2Tb9W">　　这话，是说他还是说我？可太讽刺了！</p><p data-pid="W9VTHlLU">　　我咬着唇，心思百转千绕，看着许朗走远，而赵宇带着齐岚也兴致满满的找进来。</p><p data-pid="4uLRJkIy">　　“白采婕，快来见过齐将军！”</p><p data-pid="suasaBRt">　　要死，我想过无数种我和齐岚久别重逢的场景，但唯独没有这一种。</p><p data-pid="3ebG0xv7">　　我一声媚笑三分酥软，正欲拜见我那竹马将军，不料还未抬起头，便听见齐岚冰冷的话。</p><p data-pid="f19YZGpM">　　“不用了，她不是我要寻的人。”</p><p data-pid="pmWRL5aM">　　怎地，　我如今的声音都那么下贱吗？心里万般苦楚，只能打碎牙吞进去。</p><p data-pid="EEBvF51B">　　“齐将军这么笃定，想来那女子定是将军心头尖尖的人！”赵宇这么多年没混到一官半职，齐岚这种年轻有为的人，一直是他想亲近的，“那齐将军，这春日宴，将军可一定要来，晚上可有趣了！”</p><p data-pid="tlzpOHYt">　　赵宇一连强调了几次，齐岚不耐烦的走远，我款款屈膝，正色请了个万安。</p><p data-pid="IbDvS2zG">　　白采婕，你是一个低贱之人，莫要去沾染任何人，他日若大仇得报，便一死慰藉白家清白骨吧！</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="epCSV3lp">第7章</p><p data-pid="YwbOXkcO">　　鹰飞兔走，窗间蝶舞。</p><p data-pid="pxdPLTjN">　　春日宴终于在一派和采婕中拉开序幕。</p><p data-pid="gK9ZmeRR">　　我被安排在赵宇身边，柔弱无骨的腰肢盈盈一握，半遮半掩的轻纱下，盛世美颜惊鸿一现。</p><p data-pid="j07A0KLP">　　只需要坐在那儿，便让全场的男儿郎气血翻滚。</p><p data-pid="S0DBgGRR">　　我还看见了齐岚，他最终还是来了，只是不知道是为了应付赵宇，还是想看看赵宇特别安排的“盛宴”！</p><p data-pid="UkuyCcBr">　　我烦恼的揉揉鬓角，还在苦思赵宇今晚到底有何安排，反正这春日宴无聊得要紧，那些公子哥，花拳绣腿……</p><p data-pid="FsPK-9nV">　　直到日上三竿，许朗从最底层过五关斩六将，竟隐约又夺魁的气势，才让这春日宴有了点看头！</p><p data-pid="DuzbKg-i">　　赵宇心中得意，不由得大声喝彩，就连齐岚也移眼看了一下许朗。</p><p data-pid="qBEMasYD">　　“小将军，这奴才竟敢正眼看你，真是放肆无礼！”</p><p data-pid="jVrudGBS">　　确实，我也在许朗眼里看到了一丝……挑衅！</p><p data-pid="X1Sl6rcP">　　最终，我生命中羁绊最深的两个男人，站到了一起，同场竞技！</p><p data-pid="q9Bn5nr2">　　我托腮看过去，巧目顾盼，　连赵宇不安分的手都被我拍飞。</p><p data-pid="EHPDg5uT">　　他们比得是射箭，我莫名想起与许朗的那一夜擦枪走火，顿时娇脸潮红。</p><p data-pid="lK8BcQew">　　只见他手腕长弓，弓尾振动，随着细碎的白烟，箭刃如白虹贯日，正中红心。</p><p data-pid="HWIa9_hH">　　“好！”全场叫好之声不听，我看见许朗朝我望来，心里竟有些娇羞。</p><p data-pid="Q5Fu44Bc">　　这一幕，不知是勾起了齐岚的好胜心还是也想博佳人一笑。</p><p data-pid="OBbPIhqM">　　齐岚飞身上马，咦！难不成要骑射！？</p><p data-pid="z0kXL-5_">　　拈弓得法，架箭从容，前推后走，弓满式成！</p><p data-pid="YMKlQa_w">　　不愧是将军出身，射个箭都这么帅！我迎着齐岚询问的目光，点头如捣蒜。</p><p data-pid="mkpXuVvT">　　之后，双方你来我往，难分伯仲，直到日落西山都没决出个高低。</p><p data-pid="hPFIcES_">　　虽然如此，但最终赢得，肯定还是齐岚，毕竟这府内的人，根本不认识许朗。</p><p data-pid="UYsuXOBz">　　“小姐，今日许朗没输！”</p><p data-pid="l1TDvLq9">　　演武结束，这是许朗见到我的第一句话，我故作轻佻，“可你也没赢，而且齐小将军，可比你俊！”</p><p data-pid="RJsmVnBX">　　我这么一说，我的许朗顿时急眼了。</p><p data-pid="W22HJCHE">　　“小姐真觉得齐岚好？”</p><p data-pid="p8SKY0lI">　　这问题我没有回答，因为春娘说，对付男人，就要欲拒还迎，让他们自己去想……</p><p data-pid="Hgtr8N1q">　　越想就越爱！</p><p data-pid="Hlf7OCbs">　　“好与不好又如何，我只是赵宇的暖床婢女，人家可是年轻有为的小将军！何况，我要的是什么你又不是不知道……”</p><p data-pid="mZ5B1LDp">　　正如我所言，我已经是没皮没脸的人，哪里还敢奢望什么儿女情长？</p><p data-pid="fv4QB6Cs">　　“小姐，你很好，何须自贬？许朗看来，你要走的路，比这世道还清白！”</p><p data-pid="ceUhFOc_">　　我看向许朗，这该死的嘴巴真甜。</p><p data-pid="k87U9l7L">　　确实，我心中早有决断，今夜乃是关键。</p><p data-pid="NJs1iU9P">　　我听说赵封时常不着家，那家中正房，都已经数年为见到自己的好郎君了，我不闹出点动静，如何见得到赵封？</p><p data-pid="QIP5o1fj">　　若今夜有一位公子死在赵府，只怕不出三日，赵封就得回来。</p><p data-pid="IaSgN1Ok">　　临走前，许朗将我抱进浴桶，我见他喉结涌动，满意的笑笑，我忽然发现自己很喜欢看我的许朗难以自持的样子。</p><p data-pid="sww2JbSB">　　我抬起脚，任由许朗将我浑身揉透，静静地享受片刻安宁。</p><p data-pid="aG40Ag7A">　　春色微凉，没有许朗在一旁不断添水，很快就有一丝凉意，我站起来，水珠在我身上划出一条条血脉喷张的弧线，我的目光荡开朦胧的水雾，落在赵府的宴会厅上。</p><p data-pid="TxHNKUbd">　　大戏徐徐拉开，只剩这女主角，还未登场，因为我还在苦恼，要找谁来搅动这赵府这谭深渊……</p><p class="ztext-empty-paragraph"><br/></p><p data-pid="EQ7exv0U">第8章</p><p data-pid="miFLkIPS">　　赵府什么都好，唯有一事不好。</p><p data-pid="GX4z3TcP">　　这些年，进了赵宇门楣的女人，都落了个不得好死的结局。</p><p data-pid="8u1cB3gS">　　所以我既好奇又担心，晚上到底如何安排，不过目前只是接到一纸红帖——戌时，献霓裳舞一曲。</p><p data-pid="aY_qcG_F">　　我拨弄了下舞衣，轻薄若无物，还不如不穿呢。</p><p data-pid="ZLZHqIga">　　许朗脸色微沉，是动了怒，“这赵宇……”</p><p data-pid="WsVfkiC-">　　话未说完，葱葱玉指贴上许朗的嘴唇，我感受到那对干燥开裂的唇微微抖了抖。</p><p data-pid="G981JemU">　　人要摆正自己的位置，这一点，我的许朗做得就不如我。</p><p data-pid="0CK9l_X7">　　许朗啊，你看那些风花雪月的才子，粉面白皮俊俏得紧，一身雅气，其实心里脏着呢！</p><p data-pid="A594AYml">　　有钱人不逛窑子，因为他们管窑子叫勾栏，勾栏一曲千金散，多么诗情画意，一夜春宵，来的人笑了，留下来的人也笑了。</p><p data-pid="htXxDe74">　　所以我也得笑！</p><p data-pid="It3MbpH3">　　前院热闹喧嚣，我补了补妆，“今夜高朋满座，烟火不眠，我也要好好准备准备啦。”</p><p data-pid="9y8-W_7L">　　我要准备的，当然不止是舞蹈，还有一杯毒酒。</p><p data-pid="MQd_bzib">　　赵封常年不回府内，若不闹出人命，怎么逼这老东西现身？</p><p data-pid="PYLhwrQH">　　好在一切顺利，我趁着换衣服的功夫，悄悄溜到了厨房，眼前摆着许多美酒佳酿，都已经装入酒壶，一会应该就会送去给赴宴的客人。</p><p data-pid="A7RFaBNH">　　时间不多，我没办法思虑，只能随便选一壶，将提前准备的毒药一股脑倒入。</p><p data-pid="gKhcJqyu">　　下完毒，时辰也刚好到，管家四处找我，我只好沾点油荤在嘴上，佯装不好意思的看着管家。</p><p data-pid="4KDaEH2B">　　好在没人生疑，毕竟没吃过什么美味佳肴，贪吃点也正常。</p><p data-pid="Pql9yKBm">　　我登台一曲舞毕，宴会气氛攀升到最高点，我终于收到了第二纸红帖。</p><p data-pid="yx4o8Uny">　　——盐铁司赵郎中公子赵宇；户部左曹许郎中公子许珩；礼部司钱郎中公子钱缒；兵部库部司马郎中公子马仇。</p><p data-pid="AF9Lc6TD">　　我神色慌乱，连连折了几次，才将红纸收好，台下几人目光如炬，贪婪的落在我身上。</p><p data-pid="BC8p6RZC">　　春娘说，听闻赵宇玩得花，我没想到，竟如此肮脏！</p><p data-pid="5h0Tmi9H">　　今夜，竟是“连环炮”……</p><p data-pid="7FW0mLP9">　　我是赤着眼回到座上的，赵宇撩着我的青丝，故意问我怎么一幅委屈哀怨的样子。</p><p data-pid="Kj8IDcCg">　　“赵公子，你高头大马，十里乐队迎我入府，可曾对我有过一丝情意？”</p><p data-pid="GzN8lBqQ">　　我靠在赵宇胸膛上，做着最后的挣扎。</p><p data-pid="xcUXPEn8">　　“额……”</p><p data-pid="xajS-6qz">　　宽大的手掌牢牢扼住我的玉颈，“买你回来可花了赵家五年的收入，当然要好好利用你了……”</p><p data-pid="RfFF-aj4">　　从宴会厅离开后，我心绪不宁，茫然四顾，却找不到许朗。</p><p data-pid="A6DXtlki">　　“许朗，你去哪儿了？”</p><p data-pid="lAIhv9RD">　　“白小姐，快到舫内等着吧！”说话的是管家，正要迎我去船舫，见我茫然四顾的样子，笑得前仰后合，“小姐若是在寻许朗，就不用费心了，他已经离开赵府了。”</p><p data-pid="cIoydCcE">　　走了？我脚步有些乱，心也漏了半拍，这是我第一次寻不到许朗。</p><p data-pid="1lPC5vEv">　　他此时走？那为何当初要和我进府……</p><p data-pid="4VMJNfth">　　此时，赵府船舫内，我美目紧闭，六年前白家的一幕幕如翻涌出的突泉，历历在目。</p><p data-pid="CGygLLTf">　　事已至此，我也只好出手搏一搏了。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 21362,
        favorite_count: 149,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3486009384}',
      attached_info: "CpkFCLa1o+6vpaSkmQEQBBoJNjYzODkyMzEwINXc0LEGKIIDMAlALUooChNUU19TT1VSQ0VfRkVFRFJFX1Y3EgEwGAAgADoKeyJyYXciOiIifUowChtUU19TT1VSQ0VfQkFTSUNfSU5GT19SRUNBTEwSATAYACAAOgp7InJhdyI6IiJ9Wgg5ODc2NjA3N2IgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjM0ODYwMDkzODSKAQk2MTQxODYyNjGqAQlyZWNvbW1lbmTCASBhNTJiN2Y5NzVjNDQ3YmY2YjM1OWUzMzcwZTc4YTZhY/IBCggMEgZOb3JtYWzyASgIChIkMjJiODY3NTUtMzQ5MS00YWI5LWEwMDUtYWQ2ZDlkMGMzZGQw8gEFCAsSATiCAgCIAvWKp+76MZICIGE1MmI3Zjk3NWM0NDdiZjZiMzU5ZTMzNzBlNzhhNmFjmgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXaAhNUU19TT1VSQ0VfRkVFRFJFX1Y36AID+gILTk9STUFMX0ZMT1eKAyAyZmE4YjI1NGE4ZTk0NTc4OGE2ZDA1OTY3NWJiYjYxNJoDDQoCdjAQABoFb3RoZXKoA/KmAdgDAOoDCWZlZWRyZV92N/oDHxIMVU5LTk9XTl9NT0RFIAAqDU5PX0lNQUdFX01PREWABACIBACSBAZOb3JtYWyaBAEzoAQAqAQAsAQAugQGbWFudWFswgQDMTYwyAQA0gQP5o6o6I2Q5bey5pu05paw2AQA8AQA+QQAAADgjN22P4EFAAAAAAAAAACJBepna24vsrE/kgUAmgUDZGZ0ogUDZGZ0sgUBMbkFAAAAAAAAAADQBQDgBQDoBQDwBQeSAiUKCTY2Mzg5MjMxMBIKMzQ4NjAwOTM4NBgEIgpJTUFHRV9URVhU",
      action_card: false
    }, {
      id: "46_1716607632.938",
      type: "feed",
      offset: 46,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607632,
      updated_time: 1716607632,
      target: {
        id: 3508609257,
        type: "answer",
        url: "https://api.zhihu.com/answers/3508609257",
        author: {
          id: "74d6e9d4e3d1400de534b47de3db07fc",
          url: "https://api.zhihu.com/people/74d6e9d4e3d1400de534b47de3db07fc",
          user_type: "people",
          url_token: "mo-huan-shi-nian",
          name: "卷卷的魔幻十年",
          headline: "互联网牛马，只讲干货",
          avatar_url: "https://pic1.zhimg.com/50/v2-6fc4afebfbaf04c4a3fa79eb527f4c99_l.jpg?source=b6762063",
          is_org: false,
          gender: 0,
          badge: [{
            type: "identity_people",
            description: "PMP 项目管理专业人员资格证持证人"
          }],
          followers_count: 110,
          is_following: false,
          is_followed: false
        },
        created_time: 1716531018,
        updated_time: 1716531018,
        voteup_count: 0,
        thanks_count: 0,
        comment_count: 0,
        is_copyable: true,
        question: {
          id: 276408296,
          type: "question",
          url: "https://api.zhihu.com/questions/276408296",
          author: {
            id: "5be159e58450d3954d715e6c0475e534",
            url: "https://api.zhihu.com/people/5be159e58450d3954d715e6c0475e534",
            user_type: "people",
            url_token: "wu-suo-wei-61-64-14",
            name: "无所谓",
            headline: "很懒的一个人",
            avatar_url: "https://pica.zhimg.com/50/v2-f75b2f8dc1a1b463fc865f06c4311134_l.jpg?source=b6762063",
            is_org: false,
            gender: 0,
            followers_count: 1,
            is_following: false,
            is_followed: false
          },
          title: "学历和能力相比哪个更重要呢？",
          created: 1525785477,
          answer_count: 0,
          follower_count: 0,
          comment_count: 17,
          bound_topic_ids: [307, 676, 1053, 2029, 11609],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "首先学历和能力本身就是个人学历和能力都是个人发展中非常重要的因素，但是具体这两样能力哪一个更重要，需要放到不同的情景下，见仁见智。 相信大家在高考前，都听过老师说的一句话，以后 学历是你工作的敲门砖，没有这个敲门砖你连看到好工作背影的机会都没有。事实也确实如此，尤其是大公司或者外企单位，学历是一个硬性指标。这里额外提一下，不是他们目光短浅，只通过学历来筛选， 有的时候是不得不。很多职位，特别是那些…",
        excerpt_new: "首先学历和能力本身就是个人学历和能力都是个人发展中非常重要的因素，但是具体这两样能力哪一个更重要，需要放到不同的情景下，见仁见智。 相信大家在高考前，都听过老师说的一句话，以后 学历是你工作的敲门砖，没有这个敲门砖你连看到好工作背影的机会都没有。事实也确实如此，尤其是大公司或者外企单位，学历是一个硬性指标。这里额外提一下，不是他们目光短浅，只通过学历来筛选， 有的时候是不得不。很多职位，特别是那些…",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="HWDC_rDp">首先学历和能力本身就是个人学历和能力都是个人发展中非常重要的因素，但是具体这两样能力哪一个更重要，需要放到不同的情景下，见仁见智。</p><p data-pid="eyJKn8t3">相信大家在高考前，都听过老师说的一句话，以后<b>学历是你工作的敲门砖</b>，没有这个敲门砖你连看到好工作背影的机会都没有。</p><p data-pid="GKGq1WVb">事实也确实如此，尤其是大公司或者外企单位，学历是一个硬性指标。这里额外提一下，不是他们目光短浅，只通过学历来筛选，<b>有的时候是不得不</b>。很多职位，特别是那些需要专业知识和技能的职位，通常要求应聘者具有特定的学历背景。学历可以证明一个人已经接受了系统的教育和培训，具备了一定的基础知识和能力。在某些行业，如医学、法律、工程等，学历甚至是必要的条件。</p><p data-pid="5TZl5w_Y">还有就是大公司员工的整体学历水平提升，对公司来说也是一个加分项，对于想要上市做大做强的公司更是如此。</p><p data-pid="B3pmJ1u5">再说现在大学生的学历普遍都在提升，每年毕业的学生成千上万，大家都很优秀，但都是一张白纸，作为用人单位，<b>你要通过什么火眼金睛，从他们中找到属于你的孙悟空呢</b>，显然学历筛选成为他们设置招人关卡第一步也很正常了。</p><hr/><p data-pid="KvWQIUjl">然而，能力在实际工作中同样至关重要。在你没有投入工作中时，你的学历是对你能力的一种体现。学历可以提供基础知识，但真正能够应对复杂工作挑战、解决问题、实现目标的是一个人的能力。能力包括专业技能、沟通能力、团队协作能力、创新能力、解决问题的能力等等。这些能力是在实践中不断积累和提升的，它们决定了一个人在工作中的表现和成就。</p><hr/><p data-pid="XW7AiVmc">因此，学历和能力并不是互相排斥的，而是相互补充的。在不同的职业和情境中，它们的重要性可能有所不同。对于某些职业，如研究、教育等，学历可能更为重要；而对于某些职业，如销售、市场营销等，能力可能更为关键。</p><p data-pid="6mnZgvkv">此外，还需要注意到，随着社会的进步和科技的发展，知识和技能的更新速度越来越快。因此，持续学习和提升自己的能力变得尤为重要。</p><p data-pid="XM0MD8Vt">无论学历高低，都需要不断学习和实践，以适应不断变化的工作环境。</p><p data-pid="HWxAfM6r">最后希望看到这里的大家都能给顺风顺水，不被学历卡，不被能力轻视。</p><hr/><p data-pid="iqONcPBa"><b>我是魔幻十年，互联网打工10年，关注我，了解更多职场问题，没有答案的话，我马上写，更新嘎嘎快～也欢迎查看我的职场专栏哦！</b></p><p class="ztext-empty-paragraph"><br/></p><a href="https://www.zhihu.com/column/c_1730622408036450304" data-draft-node="block" data-draft-type="link-card" data-image="https://pic2.zhimg.com/v2-52a669542a8699d42a3c5796c7e536e9_ipico.jpg" data-image-width="200" data-image-height="200" class="internal">职场一点通</a><a data-draft-node="block" data-draft-type="ad-link-card" data-ad-id="fee_74d6e9d4e3d1400de534b47de3db07fc"></a><p></p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 6,
        favorite_count: 0,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3508609257}',
      attached_info: "Cs0FCLa1o+6vpaSkmQEQBBoJNjY4MDAwNDcwIMrewLIGKAAwAEAuSiQKGVRTX1NPVVJDRV9XQVJNX1VQX05PUk1BTDESATAYACAAOgBKLQoiVFNfU09VUkNFX1dBUk1VUF9UV09UT1dFUl9UVlBfVEVYVBIBMBgAIAA6AFoIMjM2OTk2MDhiIGE2MzNkY2M3MjNhZWUyNTJiZTc1NTY3YjRjZGY4ODg2cgozNTA4NjA5MjU3igEJMjc2NDA4Mjk2qgEJcmVjb21tZW5kwgEgNzRkNmU5ZDRlM2QxNDAwZGU1MzRiNDdkZTNkYjA3ZmPyAQoIDBIGTm9ybWFs8gEoCAoSJDJlNjlmZjRlLWQ5NDAtNDFkYy05YTJkLTBjOTU0M2FkMjFlMvIBBQgLEgE4ggIAiAL1iqfu+jGSAiA3NGQ2ZTlkNGUzZDE0MDBkZTUzNGI0N2RlM2RiMDdmY5oCAMoCFEZpcnN0QnJ1c2hXZWlnaHRSdWxlygIYQ29udGVudFdhcm1VcEJyZWFrSW5SdWxl2gIZVFNfU09VUkNFX1dBUk1fVVBfTk9STUFMMegCA/oCC05PUk1BTF9GTE9XigMgMmZhOGIyNTRhOGU5NDU3ODhhNmQwNTk2NzViYmI2MTSaAw0KAnYwEAAaBW90aGVyqAMG2AMA6gMqY29udGVudFdhcm11cFR3b1Rvd2VyVHZwVGV4dE5vcm1hbFJlY2FsbGVy+gMfEgxVTktOT1dOX01PREUgACoNTk9fSU1BR0VfTU9ERYAEAIgEAJIEBk5vcm1hbJoEATOgBACoBACwBAC6BAJhacIEAzQwMMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAIMKakT+BBQAAAAAAAAAAiQXqZ2tuL7KxP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUHkgIlCgk2NjgwMDA0NzASCjM1MDg2MDkyNTcYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }, {
      id: "47_1716607632.575",
      type: "feed",
      offset: 47,
      verb: "TOPIC_ACKNOWLEDGED_ANSWER",
      created_time: 1716607632,
      updated_time: 1716607632,
      target: {
        id: 3280347689,
        type: "answer",
        url: "https://api.zhihu.com/answers/3280347689",
        author: {
          id: "a6a0bb74048a3fb3a826b7d3824cbeed",
          url: "https://api.zhihu.com/people/a6a0bb74048a3fb3a826b7d3824cbeed",
          user_type: "people",
          url_token: "seekerdoge",
          name: "Seekerdoge",
          headline: "程序员",
          avatar_url: "https://picx.zhimg.com/50/v2-abed1a8c04700ba7d72b45195223e0ff_l.jpg?source=b6762063",
          is_org: false,
          gender: -1,
          followers_count: 50,
          is_following: false,
          is_followed: false
        },
        created_time: 1699357225,
        updated_time: 1699357225,
        voteup_count: 505,
        thanks_count: 37,
        comment_count: 166,
        is_copyable: true,
        question: {
          id: 624691015,
          type: "question",
          url: "https://api.zhihu.com/questions/624691015",
          author: {
            id: "30e49f0e74b5ffd70ff4103b22d0380b",
            url: "https://api.zhihu.com/people/30e49f0e74b5ffd70ff4103b22d0380b",
            user_type: "people",
            url_token: "sir-33-11",
            name: "sir",
            headline: "",
            avatar_url: "https://pic1.zhimg.com/50/v2-21ff9cce9f22424c0b2bd0daeda17df8_l.jpg?source=b6762063",
            is_org: false,
            gender: -1,
            followers_count: 0,
            is_following: false,
            is_followed: false
          },
          title: "计算机大一新生代码写到这个程度是啥水平?",
          created: 1696393046,
          answer_count: 0,
          follower_count: 0,
          comment_count: 23,
          bound_topic_ids: [16440, 17215, 21796, 27472],
          is_following: false,
          excerpt: "",
          relationship: {
            is_author: false
          },
          detail: "",
          question_type: "normal"
        },
        excerpt: "如果是独立写的，那么就是大专的顶尖水平，烂本中上水平，985普通水平。",
        excerpt_new: "如果是独立写的，那么就是大专的顶尖水平，烂本中上水平，985普通水平。",
        preview_type: "default",
        preview_text: "",
        reshipment_settings: "allowed",
        content: '<p data-pid="y7Vn9n_z">如果是独立写的，那么就是大专的顶尖水平，烂本中上水平，985普通水平。</p>',
        relationship: {
          is_thanked: false,
          is_nothelp: false,
          voting: 0
        },
        is_labeled: false,
        visited_count: 637363,
        favorite_count: 41,
        answer_type: "normal"
      },
      brief: '{"source": "TS", "type": "answer", "id": 3280347689}',
      attached_info: "CqAFCLa1o+6vpaSkmQEQBBoJNjI2NTA0OTQwIKnEqKoGKPkDMKYBQC9KKAoTVFNfU09VUkNFX0ZFRURSRV9WNxIBMBgAIAA6CnsicmF3IjoiIn1aCTEwMTA5OTM2OWIgYTYzM2RjYzcyM2FlZTI1MmJlNzU1NjdiNGNkZjg4ODZyCjMyODAzNDc2ODmKAQk2MjQ2OTEwMTWqAQlyZWNvbW1lbmTCASBhNmEwYmI3NDA0OGEzZmIzYTgyNmI3ZDM4MjRjYmVlZPIBCggMEgZOb3JtYWzyASgIChIkY2RiNTdjODMtMGI5ZC00MzZjLWIxZjUtNTk1ZjBlMmVmNGI48gEFCAsSATiCAgCIAvWKp+76MZICIGE2YTBiYjc0MDQ4YTNmYjNhODI2YjdkMzgyNGNiZWVkmgIAygIURmlyc3RCcnVzaFdlaWdodFJ1bGXKAhtPbGRDb250ZW50UmVkdWNlNVdlaWdodFJ1bGXKAhZSZXZpc2l0VmFsdWVXZWlnaHRSdWxl2gITVFNfU09VUkNFX0ZFRURSRV9WN+gCAvoCC05PUk1BTF9GTE9XigMgMmZhOGIyNTRhOGU5NDU3ODhhNmQwNTk2NzViYmI2MTSaAw0KAnYwEAAaBW90aGVyqAOz8ybYAwDqAwlmZWVkcmVfdjf6Ax8SDFVOS05PV05fTU9ERSAAKg1OT19JTUFHRV9NT0RFgAQAiAQAkgQGTm9ybWFsmgQBMqAEAKgEALAEALoEBm1hbnVhbMIEAzE2MMgEANIED+aOqOiNkOW3suabtOaWsNgEAPAEAPkEAAAAwIr0uj+BBQAAAAAAAAAAiQXqZ2tuL7KxP5IFAJoFA2RmdKIFA2RmdLIFATG5BQAAAAAAAAAA0AUA4AUA6AUA8AUHkgIlCgk2MjY1MDQ5NDASCjMyODAzNDc2ODkYBCIKSU1BR0VfVEVYVA==",
      action_card: false
    }];
    var mockData = {
      mockList: [...mockList1, ...mockList2, ...mockList3, ...mockList4, ...mockList5]
    };

    var _dec, _dec2, _class, _class2;
    function _applyDecoratedDescriptor(i, e, r, n, l) { var a = {}; return Object.keys(n).forEach(function (i) { a[i] = n[i]; }), a.enumerable = !!a.enumerable, a.configurable = !!a.configurable, ("value" in a || a.initializer) && (a.writable = !0), a = r.slice().reverse().reduce(function (r, n) { return n(i, e, r) || r; }, a), l && void 0 !== a.initializer && (a.value = a.initializer ? a.initializer.call(l) : void 0, a.initializer = void 0), void 0 === a.initializer ? (Object.defineProperty(i, e, a), null) : a; }
    let BookController = (_dec = Controller("/feed"), _dec2 = RequestMapping(RequestMethod.GET, "/list"), _dec(_class = (_class2 = class BookController {
      async getAllBooks(ctx) {
        // return new Promise((resolve, reject) => {
        //     setTimeout(() => {
        //         resolve("success")
        //     }, 1000);
        // }).then(res => {
        //     console.log(ctx, res, "sd")
        //     ctx.body = {
        //         data: ['一秒学会前端', "一天精通web3"]
        //     }
        // })
        const {
          request,
          response
        } = ctx;
        const {
          startNum = 0,
          pageSize = 10
        } = ctx.query;
        const resList = mockData.mockList.slice(Number(startNum), Number(startNum) + Number(pageSize));
        ctx.body = {
          list: resList
        };
        console.log("REQ", request, response, "RES", ctx.query);
      }
    }, (_applyDecoratedDescriptor(_class2.prototype, "getAllBooks", [_dec2], Object.getOwnPropertyDescriptor(_class2.prototype, "getAllBooks"), _class2.prototype)), _class2)) || _class);

    var index = [BookController$1, UserController, BookController];

    const app = new Koa();
    const router = new Router();
    app.use(bodyParser());
    app.use(async (ctx, next) => {
      ctx.set("Access-Control-Allow-Origin", "*");
      ctx.set("Access-Control-Allow-Header", "*");
      ctx.set("Access-Control-Allow-Methods", "*");
      ctx.set("Content-Type", "application/json;charset=utf-8");
      if (ctx.request.method.toLowerCase() === 'options') {
        ctx.state = 200;
      } else {
        await next(ctx);
      }
    });

    // jwt
    app.use(jwtVerify([
    // 跳过这两个接口的验证
    "/api/user/login", '/api/user/register', '/api/feed/list']));
    const COMMON_API = '/api';
    controllers.forEach(item => {
      let {
        method,
        path,
        handler,
        constructor
      } = item;
      const {
        prefix
      } = constructor;
      if (prefix) {
        path = `${COMMON_API}${prefix}${path}`;
      } else {
        path = `${COMMON_API}${path}`;
      }
      ;
      router[method](path, handler);
    });
    app.use(router.routes());
    app.listen(4000, () => {
      console.log('4000 is listening');
    });

}));
