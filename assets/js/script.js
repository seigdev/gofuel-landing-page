(() => {
  function u() {
    function n(t, e, i) {
      let r = document.createElement("a");
      (r.href = t),
        (r.target = i),
        (r.rel = e),
        document.body.appendChild(r),
        r.click(),
        r.remove();
    }
    function o(t) {
      if (this.dataset.hydrated) {
        this.removeEventListener("click", o);
        return;
      }
      t.preventDefault(), t.stopPropagation();
      let e = this.getAttribute("href");
      if (!e) return;
      if (
        /Mac|iPod|iPhone|iPad/u.test(navigator.userAgent)
          ? t.metaKey
          : t.ctrlKey
      )
        return n(e, "", "_blank");
      let r = this.getAttribute("rel") ?? "",
        c = this.getAttribute("target") ?? "";
      n(e, r, c);
    }
    function a(t) {
      if (this.dataset.hydrated) {
        this.removeEventListener("auxclick", o);
        return;
      }
      t.preventDefault(), t.stopPropagation();
      let e = this.getAttribute("href");
      e && n(e, "", "_blank");
    }
    function s(t) {
      if (this.dataset.hydrated) {
        this.removeEventListener("keydown", s);
        return;
      }
      if (t.key !== "Enter") return;
      t.preventDefault(), t.stopPropagation();
      let e = this.getAttribute("href");
      if (!e) return;
      let i = this.getAttribute("rel") ?? "",
        r = this.getAttribute("target") ?? "";
      n(e, i, r);
    }
    document.querySelectorAll("[data-nested-link]").forEach((t) => {
      t instanceof HTMLElement &&
        (t.addEventListener("click", o),
        t.addEventListener("auxclick", a),
        t.addEventListener("keydown", s));
    });
  }
  return u;
})()();

(() => {
  function i() {
    for (let e of document.querySelectorAll("[data-framer-original-sizes]")) {
      let t = e.getAttribute("data-framer-original-sizes");
      t === "" ? e.removeAttribute("sizes") : e.setAttribute("sizes", t),
        e.removeAttribute("data-framer-original-sizes");
    }
  }
  function a() {
    window.__framer_onRewriteBreakpoints = i;
  }
  return a;
})()();

("use strict");
var animator = (() => {
  var z = Object.defineProperty;
  var ve = Object.getOwnPropertyDescriptor;
  var Oe = Object.getOwnPropertyNames;
  var Se = Object.prototype.hasOwnProperty;
  var ke = (e, t) => {
      for (var n in t)
        z(e, n, {
          get: t[n],
          enumerable: !0,
        });
    },
    Pe = (e, t, n, o) => {
      if ((t && typeof t == "object") || typeof t == "function")
        for (let f of Oe(t))
          !Se.call(e, f) &&
            f !== n &&
            z(e, f, {
              get: () => t[f],
              enumerable: !(o = ve(t, f)) || o.enumerable,
            });
      return e;
    };
  var De = (e) =>
    Pe(
      z({}, "__esModule", {
        value: !0,
      }),
      e
    );
  var nt = {};
  ke(nt, {
    animateAppearEffects: () => Me,
    getActiveVariantHash: () => Te,
    spring: () => P,
    startOptimizedAppearAnimation: () => N,
  });
  var Ie = [
      "transformPerspective",
      "x",
      "y",
      "z",
      "translateX",
      "translateY",
      "translateZ",
      "scale",
      "scaleX",
      "scaleY",
      "rotate",
      "rotateX",
      "rotateY",
      "rotateZ",
      "skew",
      "skewX",
      "skewY",
    ],
    W = new Set(Ie);
  var S = (e) => e * 1e3,
    k = (e) => e / 1e3;
  var E = (e) => e;
  var H = E;
  var B = (e, t, n) => (n > t ? t : n < e ? e : n);
  function U(e, t) {
    return t ? e * (1e3 / t) : 0;
  }
  var Ke = 5;
  function Q(e, t, n) {
    let o = Math.max(t - Ke, 0);
    return U(n - e(o), t - o);
  }
  var L = 0.001,
    Ee = 0.01,
    J = 10,
    Ce = 0.05,
    Ve = 1;
  function ee({
    duration: e = 800,
    bounce: t = 0.25,
    velocity: n = 0,
    mass: o = 1,
  }) {
    let f, r;
    H(e <= S(J), "Spring duration must be 10 seconds or less");
    let a = 1 - t;
    (a = B(Ce, Ve, a)),
      (e = B(Ee, J, k(e))),
      a < 1
        ? ((f = (s) => {
            let p = s * a,
              c = p * e,
              u = p - n,
              l = C(s, a),
              d = Math.exp(-c);
            return L - (u / l) * d;
          }),
          (r = (s) => {
            let c = s * a * e,
              u = c * n + n,
              l = Math.pow(a, 2) * Math.pow(s, 2) * e,
              d = Math.exp(-c),
              g = C(Math.pow(s, 2), a);
            return ((-f(s) + L > 0 ? -1 : 1) * ((u - l) * d)) / g;
          }))
        : ((f = (s) => {
            let p = Math.exp(-s * e),
              c = (s - n) * e + 1;
            return -L + p * c;
          }),
          (r = (s) => {
            let p = Math.exp(-s * e),
              c = (n - s) * (e * e);
            return p * c;
          }));
    let m = 5 / e,
      i = ze(f, r, m);
    if (((e = S(e)), isNaN(i)))
      return {
        stiffness: 100,
        damping: 10,
        duration: e,
      };
    {
      let s = Math.pow(i, 2) * o;
      return {
        stiffness: s,
        damping: a * 2 * Math.sqrt(o * s),
        duration: e,
      };
    }
  }
  var $e = 12;
  function ze(e, t, n) {
    let o = n;
    for (let f = 1; f < $e; f++) o = o - e(o) / t(o);
    return o;
  }
  function C(e, t) {
    return e * Math.sqrt(1 - t * t);
  }
  var Be = ["duration", "bounce"],
    Le = ["stiffness", "damping", "mass"];
  function te(e, t) {
    return t.some((n) => e[n] !== void 0);
  }
  function Re(e) {
    let t = {
      velocity: 0,
      stiffness: 100,
      damping: 10,
      mass: 1,
      isResolvedFromDuration: !1,
      ...e,
    };
    if (!te(e, Le) && te(e, Be)) {
      let n = ee(e);
      (t = {
        ...t,
        ...n,
        mass: 1,
      }),
        (t.isResolvedFromDuration = !0);
    }
    return t;
  }
  function P({ keyframes: e, restDelta: t, restSpeed: n, ...o }) {
    let f = e[0],
      r = e[e.length - 1],
      a = {
        done: !1,
        value: f,
      },
      {
        stiffness: m,
        damping: i,
        mass: s,
        duration: p,
        velocity: c,
        isResolvedFromDuration: u,
      } = Re({
        ...o,
        velocity: -k(o.velocity || 0),
      }),
      l = c || 0,
      d = i / (2 * Math.sqrt(m * s)),
      g = r - f,
      y = k(Math.sqrt(m / s)),
      M = Math.abs(g) < 5;
    n || (n = M ? 0.01 : 2), t || (t = M ? 0.005 : 0.5);
    let h;
    if (d < 1) {
      let x = C(y, d);
      h = (A) => {
        let T = Math.exp(-d * y * A);
        return (
          r -
          T * (((l + d * y * g) / x) * Math.sin(x * A) + g * Math.cos(x * A))
        );
      };
    } else if (d === 1) h = (x) => r - Math.exp(-y * x) * (g + (l + y * g) * x);
    else {
      let x = y * Math.sqrt(d * d - 1);
      h = (A) => {
        let T = Math.exp(-d * y * A),
          K = Math.min(x * A, 300);
        return (
          r - (T * ((l + d * y * g) * Math.sinh(K) + x * g * Math.cosh(K))) / x
        );
      };
    }
    return {
      calculatedDuration: (u && p) || null,
      next: (x) => {
        let A = h(x);
        if (u) a.done = x >= p;
        else {
          let T = 0;
          d < 1 && (T = x === 0 ? S(l) : Q(h, x, A));
          let K = Math.abs(T) <= n,
            be = Math.abs(r - A) <= t;
          a.done = K && be;
        }
        return (a.value = a.done ? r : A), a;
      },
    };
  }
  var ne = (e) => Array.isArray(e) && typeof e[0] == "number";
  var oe = (e, t, n) => {
    let o = t - e;
    return o === 0 ? 1 : (n - e) / o;
  };
  var Fe = 10,
    re = (e, t) => {
      let n = "",
        o = Math.max(Math.round(t / Fe), 2);
      for (let f = 0; f < o; f++) n += e(oe(0, o - 1, f)) + ", ";
      return `linear(${n.substring(0, n.length - 2)})`;
    };
  function ie(e) {
    let t;
    return () => (t === void 0 && (t = e()), t);
  }
  var se = {
    linearEasing: void 0,
  };
  function ae(e, t) {
    let n = ie(e);
    return () => {
      var o;
      return (o = se[t]) !== null && o !== void 0 ? o : n();
    };
  }
  var pe = ae(() => {
    try {
      document.createElement("div").animate(
        {
          opacity: 0,
        },
        {
          easing: "linear(0, 1)",
        }
      );
    } catch {
      return !1;
    }
    return !0;
  }, "linearEasing");
  var D = ([e, t, n, o]) => `cubic-bezier(${e}, ${t}, ${n}, ${o})`,
    fe = {
      linear: "linear",
      ease: "ease",
      easeIn: "ease-in",
      easeOut: "ease-out",
      easeInOut: "ease-in-out",
      circIn: D([0, 0.65, 0.55, 1]),
      circOut: D([0.55, 0, 1, 0.45]),
      backIn: D([0.31, 0.01, 0.66, -0.59]),
      backOut: D([0.33, 1.53, 0.69, 0.99]),
    };
  function R(e, t) {
    if (e)
      return typeof e == "function" && pe()
        ? re(e, t)
        : ne(e)
        ? D(e)
        : Array.isArray(e)
        ? e.map((n) => R(n, t) || fe.easeOut)
        : fe[e];
  }
  function F(
    e,
    t,
    n,
    {
      delay: o = 0,
      duration: f = 300,
      repeat: r = 0,
      repeatType: a = "loop",
      ease: m,
      times: i,
    } = {}
  ) {
    let s = {
      [t]: n,
    };
    i && (s.offset = i);
    let p = R(m, f);
    return (
      Array.isArray(p) && (s.easing = p),
      e.animate(s, {
        delay: o,
        duration: f,
        easing: Array.isArray(p) ? "linear" : p,
        fill: "both",
        iterations: r + 1,
        direction: a === "reverse" ? "alternate" : "normal",
      })
    );
  }
  var me = (e) => e.replace(/([a-z])([A-Z])/gu, "$1-$2").toLowerCase();
  var X = "framerAppearId",
    ce = "data-" + me(X);
  function ue(e) {
    return e.props[ce];
  }
  var b = (e, t) => {
    let n = W.has(t) ? "transform" : t;
    return `${e}: ${n}`;
  };
  var w = new Map(),
    v = new Map();
  function Y(e, t, n) {
    var o;
    let f = b(e, t),
      r = w.get(f);
    if (!r) return null;
    let { animation: a, startTime: m } = r;
    function i() {
      var s;
      (s = window.MotionCancelOptimisedAnimation) === null ||
        s === void 0 ||
        s.call(window, e, t, n);
    }
    return (
      (a.onfinish = i),
      m === null ||
      (!((o = window.MotionHandoffIsComplete) === null || o === void 0) &&
        o.call(window, e))
        ? (i(), null)
        : m
    );
  }
  var V,
    O,
    j = new Set();
  function Xe() {
    j.forEach((e) => {
      e.animation.play(), (e.animation.startTime = e.startTime);
    }),
      j.clear();
  }
  function N(e, t, n, o, f) {
    if (window.MotionIsMounted) return;
    let r = e.dataset[X];
    if (!r) return;
    window.MotionHandoffAnimation = Y;
    let a = b(r, t);
    O ||
      ((O = F(e, t, [n[0], n[0]], {
        duration: 1e4,
        ease: "linear",
      })),
      w.set(a, {
        animation: O,
        startTime: null,
      }),
      (window.MotionHandoffAnimation = Y),
      (window.MotionHasOptimisedAnimation = (i, s) => {
        if (!i) return !1;
        if (!s) return v.has(i);
        let p = b(i, s);
        return !!w.get(p);
      }),
      (window.MotionHandoffMarkAsComplete = (i) => {
        v.has(i) && v.set(i, !0);
      }),
      (window.MotionHandoffIsComplete = (i) => v.get(i) === !0),
      (window.MotionCancelOptimisedAnimation = (i, s, p, c) => {
        let u = b(i, s),
          l = w.get(u);
        l &&
          (p && c === void 0
            ? p.postRender(() => {
                p.postRender(() => {
                  l.animation.cancel();
                });
              })
            : l.animation.cancel(),
          p && c
            ? (j.add(l), p.render(Xe))
            : (w.delete(u),
              w.size || (window.MotionCancelOptimisedAnimation = void 0)));
      }),
      (window.MotionCheckAppearSync = (i, s, p) => {
        var c, u;
        let l = ue(i);
        if (!l) return;
        let d =
            (c = window.MotionHasOptimisedAnimation) === null || c === void 0
              ? void 0
              : c.call(window, l, s),
          g = (u = i.props.values) === null || u === void 0 ? void 0 : u[s];
        if (!d || !g) return;
        let y = p.on("change", (M) => {
          var h;
          g.get() !== M &&
            ((h = window.MotionCancelOptimisedAnimation) === null ||
              h === void 0 ||
              h.call(window, l, s),
            y());
        });
        return y;
      }));
    let m = () => {
      O.cancel();
      let i = F(e, t, n, o);
      V === void 0 && (V = performance.now()),
        (i.startTime = V),
        w.set(a, {
          animation: i,
          startTime: V,
        }),
        f && f(i);
    };
    v.set(r, !1), O.ready ? O.ready.then(m).catch(E) : m();
  }
  var G = [
      "transformPerspective",
      "x",
      "y",
      "z",
      "translateX",
      "translateY",
      "translateZ",
      "scale",
      "scaleX",
      "scaleY",
      "rotate",
      "rotateX",
      "rotateY",
      "rotateZ",
      "skew",
      "skewX",
      "skewY",
    ],
    Ye = {
      x: "translateX",
      y: "translateY",
      z: "translateZ",
      transformPerspective: "perspective",
    },
    je = {
      translateX: "px",
      translateY: "px",
      translateZ: "px",
      x: "px",
      y: "px",
      z: "px",
      perspective: "px",
      transformPerspective: "px",
      rotate: "deg",
      rotateX: "deg",
      rotateY: "deg",
    };
  function le(e, t) {
    let n = je[e];
    return !n || (typeof t == "string" && t.endsWith(n)) ? t : `${t}${n}`;
  }
  function _(e) {
    return G.includes(e);
  }
  var Ne = (e, t) => G.indexOf(e) - G.indexOf(t);
  function de({ transform: e, transformKeys: t }, n) {
    let o = {},
      f = !0,
      r = "";
    t.sort(Ne);
    for (let a of t) {
      let m = e[a],
        i = !0;
      typeof m == "number"
        ? (i = m === (a.startsWith("scale") ? 1 : 0))
        : (i = parseFloat(m) === 0),
        i || ((f = !1), (r += `${Ye[a] || a}(${e[a]}) `)),
        n && (o[a] = e[a]);
    }
    return (r = r.trim()), n ? (r = n(o, r)) : f && (r = "none"), r;
  }
  function Z(e, t) {
    let n = new Set(Object.keys(e));
    for (let o in t) n.add(o);
    return Array.from(n);
  }
  function q(e, t) {
    let n = t - e.length;
    if (n <= 0) return e;
    let o = new Array(n).fill(e[e.length - 1]);
    return e.concat(o);
  }
  function I(e) {
    return e * 1e3;
  }
  var ye = {
      duration: 0.001,
    },
    $ = {
      opacity: 1,
      scale: 1,
      translateX: 0,
      translateY: 0,
      translateZ: 0,
      x: 0,
      y: 0,
      z: 0,
      rotate: 0,
      rotateX: 0,
      rotateY: 0,
    };
  function Ae(e, t, n, o, f) {
    return (
      n.delay && (n.delay = I(n.delay)),
      n.type === "spring" ? _e(e, t, n, o, f) : qe(e, t, n, o, f)
    );
  }
  function Ge(e, t, n) {
    let o = {},
      f = 0,
      r = 0;
    for (let a of Z(e, t)) {
      let m = e[a] ?? $[a],
        i = t[a] ?? $[a];
      if (
        m === void 0 ||
        i === void 0 ||
        (a !== "transformPerspective" && m === i)
      )
        continue;
      a === "transformPerspective" && (o[a] = [m, i]);
      let s = Je(m, i, n),
        { duration: p, keyframes: c } = s;
      p === void 0 ||
        c === void 0 ||
        (p > f && ((f = p), (r = c.length)), (o[a] = c));
    }
    return {
      keyframeValuesByProps: o,
      longestDuration: f,
      longestLength: r,
    };
  }
  function _e(e, t, n, o, f) {
    let r = {},
      {
        keyframeValuesByProps: a,
        longestDuration: m,
        longestLength: i,
      } = Ge(e, t, n);
    if (!i) return r;
    let s = {
        ease: "linear",
        duration: m,
        delay: n.delay,
      },
      p = f ? ye : s,
      c = {};
    for (let [l, d] of Object.entries(a))
      _(l)
        ? (c[l] = q(d, i))
        : (r[l] = {
            keyframes: q(d, i),
            options: l === "opacity" ? s : p,
          });
    let u = we(c, o);
    return (
      u &&
        (r.transform = {
          keyframes: u,
          options: p,
        }),
      r
    );
  }
  function Ze(e) {
    let { type: t, duration: n, ...o } = e;
    return {
      duration: I(n),
      ...o,
    };
  }
  function qe(e, t, n, o, f) {
    let r = Ze(n);
    if (!r) return;
    let a = {},
      m = f ? ye : r,
      i = {};
    for (let p of Z(e, t)) {
      let c = e[p] ?? $[p],
        u = t[p] ?? $[p];
      c === void 0 ||
        u === void 0 ||
        (p !== "transformPerspective" && c === u) ||
        (_(p)
          ? (i[p] = [c, u])
          : (a[p] = {
              keyframes: [c, u],
              options: p === "opacity" ? r : m,
            }));
    }
    let s = we(i, o);
    return (
      s &&
        (a.transform = {
          keyframes: s,
          options: m,
        }),
      a
    );
  }
  var We = ["duration", "bounce"],
    He = ["stiffness", "damping", "mass"];
  function he(e) {
    return He.some((t) => t in e) ? !1 : We.some((t) => t in e);
  }
  function Ue(e, t, n) {
    return he(n)
      ? `${e}-${t}-${n.duration}-${n.bounce}`
      : `${e}-${t}-${n.damping}-${n.stiffness}-${n.mass}`;
  }
  function Qe(e) {
    return he(e)
      ? {
          ...e,
          duration: I(e.duration),
        }
      : e;
  }
  var xe = new Map(),
    ge = 10;
  function Je(e, t, n) {
    let o = Ue(e, t, n),
      f = xe.get(o);
    if (f) return f;
    let r = [e, t],
      a = P({
        ...Qe(n),
        keyframes: r,
      }),
      m = {
        done: !1,
        value: r[0],
      },
      i = [],
      s = 0;
    for (; !m.done && s < I(10); ) (m = a.next(s)), i.push(m.value), (s += ge);
    r = i;
    let p = s - ge,
      u = {
        keyframes: r,
        duration: p,
        ease: "linear",
      };
    return xe.set(o, u), u;
  }
  function we(e, t) {
    let n = [],
      o = Object.values(e)[0]?.length;
    if (!o) return;
    let f = Object.keys(e);
    for (let r = 0; r < o; r++) {
      let a = {};
      for (let [i, s] of Object.entries(e)) {
        let p = s[r];
        p !== void 0 && (a[i] = le(i, p));
      }
      let m = de(
        {
          transform: a,
          transformKeys: f,
        },
        t
      );
      n.push(m);
    }
    return n;
  }
  function et(e, t) {
    if (!t)
      for (let n in e) {
        let o = e[n];
        return o?.legacy === !0 ? o : void 0;
      }
  }
  function Me(e, t, n, o, f, r) {
    for (let [a, m] of Object.entries(e)) {
      let i = r ? m[r] : void 0;
      if (i === null || (!i && m.default === null)) continue;
      let s = i ?? m.default ?? et(m, r);
      if (!s) continue;
      let { initial: p, animate: c, transformTemplate: u } = s;
      if (!p || !c) continue;
      let { transition: l, ...d } = c,
        g = Ae(p, d, l, tt(u, o), f);
      if (!g) continue;
      let y = {},
        M = {};
      for (let [x, A] of Object.entries(g))
        (y[x] = A.keyframes), (M[x] = A.options);
      let h = r ? `:not(.hidden-${r}) ` : "";
      t(`${h}[${n}="${a}"]`, y, M);
    }
  }
  function tt(e, t) {
    if (!(!e || !t)) return (n, o) => e.replace(t, o);
  }
  function Te(e) {
    return e
      ? e.find((n) =>
          n.mediaQuery ? window.matchMedia(n.mediaQuery).matches === !0 : !1
        )?.hash
      : void 0;
  }
  return De(nt);
})();

(() => {
  function s(r, n, t) {
    window.__framer_disable_appear_effects_optimization__ ||
      typeof animator > "u" ||
      requestAnimationFrame(() => {
        performance.mark("framer-appear-start"),
          animator.animateAppearEffects(
            JSON.parse(window.__framer__appearAnimationsContent.text),
            (i, o, p) => {
              let e = document.querySelector(i);
              if (e)
                for (let [a, m] of Object.entries(o))
                  animator.startOptimizedAppearAnimation(e, a, m, p[a]);
            },
            r,
            n,
            t &&
              window.matchMedia("(prefers-reduced-motion:reduce)").matches ===
                !0,
            animator.getActiveVariantHash(
              JSON.parse(window.__framer__breakpoints.text)
            )
          ),
          performance.mark("framer-appear-end"),
          performance.measure(
            "framer-appear",
            "framer-appear-start",
            "framer-appear-end"
          );
      });
  }
  return s;
})()("data-framer-appear-id", "__Appear_Animation_Transform__", false);
