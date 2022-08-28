(function (t) {
  function e(e) {
    for (
      var a, s, c = e[0], o = e[1], l = e[2], d = 0, f = [];
      d < c.length;
      d++
    )
      (s = c[d]),
        Object.prototype.hasOwnProperty.call(i, s) && i[s] && f.push(i[s][0]),
        (i[s] = 0);
    for (a in o) Object.prototype.hasOwnProperty.call(o, a) && (t[a] = o[a]);
    u && u(e);
    while (f.length) f.shift()();
    return r.push.apply(r, l || []), n();
  }
  function n() {
    for (var t, e = 0; e < r.length; e++) {
      for (var n = r[e], a = !0, c = 1; c < n.length; c++) {
        var o = n[c];
        0 !== i[o] && (a = !1);
      }
      a && (r.splice(e--, 1), (t = s((s.s = n[0]))));
    }
    return t;
  }
  var a = {},
    i = { risk: 0 },
    r = [];
  function s(e) {
    if (a[e]) return a[e].exports;
    var n = (a[e] = { i: e, l: !1, exports: {} });
    return t[e].call(n.exports, n, n.exports, s), (n.l = !0), n.exports;
  }
  (s.m = t),
    (s.c = a),
    (s.d = function (t, e, n) {
      s.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
    }),
    (s.r = function (t) {
      "undefined" !== typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
        Object.defineProperty(t, "__esModule", { value: !0 });
    }),
    (s.t = function (t, e) {
      if ((1 & e && (t = s(t)), 8 & e)) return t;
      if (4 & e && "object" === typeof t && t && t.__esModule) return t;
      var n = Object.create(null);
      if (
        (s.r(n),
        Object.defineProperty(n, "default", { enumerable: !0, value: t }),
        2 & e && "string" != typeof t)
      )
        for (var a in t)
          s.d(
            n,
            a,
            function (e) {
              return t[e];
            }.bind(null, a)
          );
      return n;
    }),
    (s.n = function (t) {
      var e =
        t && t.__esModule
          ? function () {
              return t["default"];
            }
          : function () {
              return t;
            };
      return s.d(e, "a", e), e;
    }),
    (s.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }),
    (s.p = "");
  var c = (window["webpackJsonp"] = window["webpackJsonp"] || []),
    o = c.push.bind(c);
  (c.push = e), (c = c.slice());
  for (var l = 0; l < c.length; l++) e(c[l]);
  var u = o;
  r.push([1, "chunk-vendors"]), n();
})({
  1: function (t, e, n) {
    t.exports = n("cafc");
  },
  "7c15": function (t, e, n) {
    "use strict";
    n.d(e, "b", function () {
      return A;
    }),
      n.d(e, "a", function () {
        return T;
      }),
      n.d(e, "c", function () {
        return k;
      });
    n("d3b7");
    var a = n("bc3a"),
      i = n.n(a),
      r = (n("b680"), n("25f0"), "23y0ufFl5YxIyGrI8hWRUZmKkvtSjLQA"),
      s = "123456789abcdefg",
      c = "zdww",
      o = { value: 0 };

    function l(t, e, n) {
      e in t || (t[e] = n);
    }
    function u(t) {
      return (
        l(t, "commonParams", !0),
        l(t, "commonHeaders", !0),
        l(t, "loading", !0),
        t
      );
    }
    function d(t) {
      return (o.value = (Date.now() / 1e3).toFixed()), t;
    }
    function f(t) {
      return t.loading && $(".loading").show(), t;
    }
    function p(t) {
      if (!t.commonHeaders) return t;
      var e = o.value,
        n = CryptoJS.SHA256(
          e + "fTN2pfuisxTavbTuYVSsNJHetwq5bJvCQkjjtiLM2dCratiA" + e
        )
          .toString(CryptoJS.enc.Hex)
          .toUpperCase();
      return (
        Object.assign(t.headers, {
          "x-wif-nonce": "QkjjtiLM2dCratiA",
          "x-wif-paasid": "smt-application",
          "x-wif-signature": n,
          "x-wif-timestamp": e,
        }),
        t
      );
    }
    function v(t) {
      if (!t.commonParams) return t;
      var e = o.value;
      return (
        (t.data = t.data || {}),
        Object.assign(t.data, {
          appId: "NcApplication",
          paasHeader: c,
          timestampHeader: e,
          nonceHeader: s,
          signatureHeader: CryptoJS.SHA256(e + r + s + e)
            .toString(CryptoJS.enc.Hex)
            .toUpperCase(),
        }),
        t
      );
    }
    function m(t) {
      return console.log("[Request Config]", t), t;
    }
    function b() {
      $(".loading").hide();
    }
    function h(t) {
      return t.config.customHandler ? t : g(t);
    }
    function g(t) {
      var e = t.data;
      if (0 !== e.code) throw t;
      return e;
    }
    function y(t) {
      var e;
      throw (
        (netError(null === (e = t.config) || void 0 === e ? void 0 : e.title),
        console.error("[Request Error]", t),
        t)
      );
    }
    var w = location.protocol,
      C = i.a.create({
        baseURL: "".concat(w, "//bmfw.www.gov.cn/bjww/interface/interfaceJson"),
        method: "post",
      });
    function _() {
      return C.apply(C, arguments).then(h).catch(y).finally(b);
    }
    C.interceptors.request.use(m),
      C.interceptors.request.use(v),
      C.interceptors.request.use(p),
      C.interceptors.request.use(d),
      C.interceptors.request.use(f),
      C.interceptors.request.use(u);
    var j = "243D215B2CA449ECABF1E6C93B7D973C",
      x = "2CA32596474B4077834CCC191D351839",
      O = "3C502C97ABDA40D0A60FBEE50FAAD1DA";
    function A(t) {
      var e = t.blockCode;
      return _({ data: { area_code: e, key: x, appId: "NcApplication" } }).then(
        function (t) {
          return t.data;
        }
      );
    }
    function T() {
      return _({
        commonParams: !0,
        customHandler: !0,
        data: { flag: "11", key: j, appId: "NcApplication" },
      }).then(function (t) {
        return t.data;
      });
    }
    function k() {
      return _({ data: { key: O } }).then(function (t) {
        return t.data;
      });
    }
  },
  "7cd8": function (t, e, n) {
    "use strict";
    var a = n("a184"),
      i = n.n(a);
    i.a;
  },
  a184: function (t, e, n) {},
  cafc: function (t, e, n) {
    "use strict";
    n.r(e);
    n("e623"), n("e379"), n("5dc8"), n("37e1"), n("db4d");
    var a = n("2b0e"),
      i = n("ed09"),
      r = function () {
        var t = this,
          e = t.$createElement,
          n = t._self._c || e;
        return n("div", [
          n(
            "div",
            { staticClass: "tabs-header" },
            [
              n("p", { staticClass: "tabs-header-title" }, [
                t._v("截至" + t._s(t.updatedTime) + "，全国疫情："),
              ]),
              t._l(t.TABS, function (e, a) {
                return n(
                  "div",
                  {
                    key: a,
                    staticClass: "tabs-header-tab",
                    class: { active: t.activeTabIndex === a },
                    on: {
                      click: function (e) {
                        t.activeTabIndex = a;
                      },
                    },
                  },
                  [
                    t._v(" " + t._s(e.label) + " "),
                    n(
                      "span",
                      { class: ["tabs-header-tab-title", e.className] },
                      [t._v("（" + t._s(e.count) + "）")]
                    ),
                  ]
                );
              }),
            ],
            2
          ),
          n(
            "div",
            { staticClass: "risk-tables" },
            [
              t._l(t.listData, function (e, a) {
                return n("div", { key: a, staticClass: "risk-info-table" }, [
                  n("div", { staticClass: "risk-info-table-title" }, [
                    n("div", [t._v(t._s(e.area_name))]),
                    n(
                      "div",
                      {
                        directives: [
                          {
                            name: "show",
                            rawName: "v-show",
                            value: !e.communitys || !e.communitys.length,
                            expression:
                              "!li.communitys || !li.communitys.length",
                          },
                        ],
                        staticClass: "risk-info-table-level",
                        class: t.TABS[t.activeTabIndex].className,
                      },
                      [t._v(" " + t._s(t.TABS[t.activeTabIndex].label) + " ")]
                    ),
                  ]),
                  n(
                    "table",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: e.communitys && e.communitys.length,
                          expression: "li.communitys && li.communitys.length",
                        },
                      ],
                      staticClass: "risk-info-table-inner",
                    },
                    t._l(e.communitys, function (e, a) {
                      return n(
                        "tr",
                        { key: a, class: a % 2 == 0 ? "even" : "odd" },
                        [
                          n("td", [t._v(t._s(e))]),
                          n(
                            "td",
                            {
                              staticClass: "risk-info-table-level",
                              class: t.TABS[t.activeTabIndex].className,
                            },
                            [
                              t._v(
                                " " +
                                  t._s(
                                    t.TABS[t.activeTabIndex].label.slice(0, 3)
                                  ) +
                                  " "
                              ),
                            ]
                          ),
                        ]
                      );
                    }),
                    0
                  ),
                ]);
              }),
              n(
                "div",
                {
                  directives: [
                    {
                      name: "show",
                      rawName: "v-show",
                      value: !t.listData.length && t.loaded,
                      expression: "!listData.length && loaded",
                    },
                  ],
                  staticClass: "nodata",
                },
                [
                  n("div", { staticClass: "imgbox-dj" }, [
                    n("img", {
                      attrs: { src: "source/PC/images/tit-noct.png", alt: "" },
                    }),
                    n("div", { staticClass: "img-tit-dj" }, [
                      t._v(
                        "暂无" +
                          t._s(t.TABS[t.activeTabIndex].label.slice(0, 3)) +
                          "疫情地区"
                      ),
                    ]),
                  ]),
                ]
              ),
            ],
            2
          ),
          n("div", {
            directives: [
              {
                name: "show",
                rawName: "v-show",
                value: t.listData && t.listData.length,
                expression: "listData && listData.length",
              },
            ],
            ref: "$page",
            staticClass: "pages-box",
          }),
          n("div", { staticClass: "other-info" }, [
            n(
              "p",
              {
                directives: [
                  {
                    name: "show",
                    rawName: "v-show",
                    value: t.listData && t.listData.length,
                    expression: "listData && listData.length",
                  },
                ],
              },
              [
                t._v(" 注：其余未列出地区均为"),
                n(
                  "span",
                  { staticStyle: { "font-weight": "bold", color: "#7fc64f" } },
                  [t._v("常态化防控区域")]
                ),
              ]
            ),
            n("div", { staticClass: "source" }, [
              t._v(" 由国家卫生健康委每日汇总各地报送疫情风险等级数据 "),
            ]),
          ]),
          t._m(0),
        ]);
      },
      s = [
        function () {
          var t = this,
            e = t.$createElement,
            n = t._self._c || e;
          return n("div", { staticClass: "main-jycx" }, [
            n("div", { staticClass: "footer_depart" }, [
              n("p", [t._v("本服务由国家卫生健康委提供")]),
            ]),
          ]);
        },
      ],
      c =
        (n("4de4"),
        n("4160"),
        n("fb6a"),
        n("dca8"),
        n("159b"),
        n("96cf"),
        n("1da1")),
      o = n("7c15"),
      l = {
        setup: function () {
          var t = Object(i["d"])([
              { label: "高风险区", className: "h", count: 0, list: [] },
              { label: "中风险区", className: "m", count: 0, list: [] },
              { label: "低风险区", className: "l", count: 0, list: [] },
            ]),
            e = Object(i["e"])(0),
            n = Object(i["e"])(""),
            a = Object(i["e"])(1),
            r = 10,
            s = Object(i["e"])(!1),
            l = Object(i["e"])(null),
            u = Object(i["a"])(function () {
              return t[e.value].list;
            }),
            d = Object(i["a"])(function () {
              return t[e.value].list.slice((a.value - 1) * r, a.value * r);
            });
          function f() {
            return p.apply(this, arguments);
          }
          function p() {
            return (
              (p = Object(c["a"])(
                regeneratorRuntime.mark(function e() {
                  var a, i, r, c, l, u, d, f, p, v, m;
                  return regeneratorRuntime.wrap(function (e) {
                    while (1)
                      switch ((e.prev = e.next)) {
                        case 0:
                          return (e.next = 2), Object(o["c"])();
                        case 2:
                          (a = e.sent),
                            (i = a.end_update_time),
                            a.hcount,
                            a.mcount,
                            a.lcount,
                            (r = a.highlist),
                            (c = a.middlelist),
                            (l = a.lowlist),
                            (u = r.filter(function (t) {
                              return !(
                                "自治区直辖县级行政单位" === t.city &&
                                "新疆维吾尔自治区" === t.province
                              );
                            })),
                            (d = c.filter(function (t) {
                              return !(
                                "自治区直辖县级行政单位" === t.city &&
                                "新疆维吾尔自治区" === t.province
                              );
                            })),
                            (f = l.filter(function (t) {
                              return !(
                                "自治区直辖县级行政单位" === t.city &&
                                "新疆维吾尔自治区" === t.province
                              );
                            })),
                            (p = 0),
                            (v = 0),
                            (m = 0),
                            u.forEach(function (t) {
                              (p += t.communitys.length),
                                t.communitys.length || p++;
                            }),
                            d.forEach(function (t) {
                              (v += t.communitys.length),
                                t.communitys.length || v++;
                            }),
                            f.forEach(function (t) {
                              (m += t.communitys.length),
                                t.communitys.length || m++;
                            }),
                            (t[0].count = p || "0"),
                            (t[1].count = v || "0"),
                            (t[2].count = m || "0"),
                            (t[0].list = Object.freeze(u || [])),
                            (t[1].list = Object.freeze(d || [])),
                            (t[2].list = Object.freeze(f || [])),
                            (n.value = i),
                            (s.value = !0);
                        case 25:
                        case "end":
                          return e.stop();
                      }
                  }, e);
                })
              )),
              p.apply(this, arguments)
            );
          }
          function v() {
            Object(i["c"])(function () {
              $(l.value).paging({
                pageNum: 1,
                totalNum: Math.ceil(u.value.length / r),
                callback: function (t) {
                  (a.value = t),
                    window.scrollTo({ top: 370, behavior: "smooth" });
                },
              });
            });
          }
          return (
            Object(i["f"])(
              e,
              function () {
                (a.value = 1),
                  f().then(function () {
                    v();
                  });
              },
              { immediate: !0 }
            ),
            {
              TABS: t,
              activeTabIndex: e,
              updatedTime: n,
              page: a,
              listData: d,
              loaded: s,
              $page: l,
            }
          );
        },
      },
      u = l,
      d = (n("7cd8"), n("2877")),
      f = Object(d["a"])(u, r, s, !1, null, null, null),
      p = f.exports;
    (a["a"].config.productionTip = !1), a["a"].use(i["b"]);
    new a["a"]({
      render: function (t) {
        return t(p);
      },
    }).$mount("#app");
  },
});
