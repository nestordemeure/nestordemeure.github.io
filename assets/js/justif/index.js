import { composeProtrusion, latinProtrusion, defaultBuildOptions, breakParagraph, layoutLines, defaultBreakOptions, ItemType, CJK_CHAR, fontProtrusion, buildItems, textMakesBox } from './chunk-AKQMEKJ5.js';
export { composeProtrusion, fontProtrusion, hangingPunctuation, kinsokuNotAtLineEnd, kinsokuNotAtLineStart, latinProtrusion } from './chunk-AKQMEKJ5.js';

// src/dom/measure.ts
function fontSpecOf(style) {
  const letterSpacing = style.letterSpacing === "normal" ? 0 : parseFloat(style.letterSpacing) || 0;
  const wordSpacing = parseFloat(style.wordSpacing) || 0;
  const computed = function (property, fallback) {
    if (fallback === void 0) {
      fallback = "normal";
    }
    return style.getPropertyValue(property).trim() || fallback;
  };
  const spec = {
    style: style.fontStyle,
    weight: style.fontWeight,
    sizePx: parseFloat(style.fontSize) || 16,
    family: style.fontFamily,
    letterSpacingPx: letterSpacing,
    wordSpacingPx: wordSpacing,
    stretch: style.fontStretch || "100%",
    variationSettings: style.fontVariationSettings || "normal",
    variantAlternates: computed("font-variant-alternates"),
    variantCaps: computed("font-variant-caps"),
    variantEastAsian: computed("font-variant-east-asian"),
    // font-variant-emoji is newer than the other longhands and is absent
    // from older CSSStyleDeclaration typings/engines. An unsupported
    // property computes to the same effective initial value.
    variantEmoji: computed("font-variant-emoji"),
    hyphens: style.hyphens || style.webkitHyphens || "manual",
    ligatures: computed("font-variant-ligatures"),
    featureSettings: computed("font-feature-settings"),
    numeric: computed("font-variant-numeric"),
    variantPosition: computed("font-variant-position"),
    direction: style.direction === "rtl" ? "rtl" : "ltr",
    key: ""
  };
  spec.key = [spec.style, spec.weight, spec.sizePx, spec.family, spec.letterSpacingPx, spec.wordSpacingPx, spec.stretch, spec.variationSettings, spec.variantAlternates, spec.variantCaps, spec.variantEastAsian, spec.variantEmoji, spec.ligatures, spec.featureSettings, spec.numeric, spec.variantPosition].join("|");
  return spec;
}
function ctxFontOf(spec) {
  const style = spec.style === "normal" ? "" : spec.style + " ";
  const weight = spec.weight === "400" || spec.weight === "normal" ? "" : spec.weight + " ";
  return `${style}${weight}${spec.sizePx}px ${spec.family}`;
}
var sharedCtx = null;
var currentKey = "";
var currentDirection = "ltr";
function getCtx() {
  if (sharedCtx === null) {
    const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(0, 0);
    sharedCtx = canvas.getContext("2d");
    if (sharedCtx === null) throw new Error("justif: no 2d canvas context");
  }
  return sharedCtx;
}
var probeCtx = null;
function probeAdvance(font, text) {
  if (probeCtx === null) {
    const canvas = typeof document !== "undefined" ? document.createElement("canvas") : new OffscreenCanvas(0, 0);
    probeCtx = canvas.getContext("2d");
    if (probeCtx === null) throw new Error("justif: no 2d canvas context");
  }
  probeCtx.font = font;
  let width = 0;
  for (let at = 0; at < text.length;) {
    let end = Math.min(text.length, at + 2048);
    const code = text.charCodeAt(end - 1);
    if (code >= 55296 && code <= 56319 && end < text.length) end++;
    width += probeCtx.measureText(text.slice(at, end)).width;
    at = end;
  }
  return width;
}
function setFont(ctx, spec) {
  if (currentKey === spec.key && currentDirection === spec.direction) return;
  if ("direction" in ctx) ctx.direction = spec.direction;
  currentDirection = spec.direction;
  ctx.font = ctxFontOf(spec);
  if ("letterSpacing" in ctx) ctx.letterSpacing = spec.letterSpacingPx + "px";
  if ("wordSpacing" in ctx) ctx.wordSpacing = spec.wordSpacingPx + "px";
  if ("fontVariantCaps" in ctx) {
    ctx.fontVariantCaps = "normal";
  }
  currentKey = spec.key;
}
function applyFontSpec(el, spec) {
  el.style.fontStyle = spec.style;
  el.style.fontWeight = spec.weight;
  el.style.fontSize = spec.sizePx + "px";
  el.style.fontFamily = spec.family;
  el.style.letterSpacing = spec.letterSpacingPx + "px";
  el.style.wordSpacing = spec.wordSpacingPx + "px";
  el.style.direction = spec.direction;
  el.style.fontStretch = spec.stretch;
  el.style.fontVariationSettings = spec.variationSettings;
  el.style.setProperty("font-variant-alternates", spec.variantAlternates);
  el.style.setProperty("font-variant-caps", spec.variantCaps);
  el.style.setProperty("font-variant-east-asian", spec.variantEastAsian);
  el.style.setProperty("font-variant-emoji", spec.variantEmoji);
  el.style.setProperty("font-variant-ligatures", spec.ligatures);
  el.style.setProperty("font-variant-numeric", spec.numeric);
  el.style.setProperty("font-variant-position", spec.variantPosition);
  el.style.setProperty("font-feature-settings", spec.featureSettings);
}
function requiresDomMeasurement(spec) {
  return spec.variantCaps !== "normal" || spec.variantAlternates !== "normal" || spec.variantEastAsian !== "normal" || spec.variantEmoji !== "normal" || spec.ligatures !== "normal" || spec.featureSettings !== "normal" || spec.numeric !== "normal" || spec.variantPosition !== "normal";
}
function supportsSpec(spec) {
  if (spec.stretch !== "100%" && spec.stretch !== "normal") return false;
  if (spec.variationSettings !== "normal") return false;
  return true;
}
var widthCache = /* @__PURE__ */new Map();
var domWidthCache = /* @__PURE__ */new Map();
var pendingDomWidths = /* @__PURE__ */new Map();
var collectingDomWidths = false;
var segmenter;
function graphemeCount(text) {
  if (segmenter === void 0) {
    segmenter = typeof Intl !== "undefined" && "Segmenter" in Intl ? new Intl.Segmenter() : null;
  }
  if (segmenter === null) return Array.from(text).length;
  let n = 0;
  for (const _ of segmenter.segment(text)) n++;
  return n;
}
function measureCanvasWidth(text, spec) {
  let perFont = widthCache.get(spec.key);
  if (perFont === void 0) {
    perFont = /* @__PURE__ */new Map();
    widthCache.set(spec.key, perFont);
  }
  const hit = perFont.get(text);
  if (hit !== void 0) return hit;
  const ctx = getCtx();
  setFont(ctx, spec);
  let width = ctx.measureText(text).width;
  if (!("letterSpacing" in ctx)) {
    if (spec.letterSpacingPx !== 0) width += spec.letterSpacingPx * graphemeCount(text);
    if (spec.wordSpacingPx !== 0) {
      let spaces = 0;
      for (const ch of text) if (ch === " " || ch === "\xA0") spaces++;
      width += spec.wordSpacingPx * spaces;
    }
  }
  perFont.set(text, width);
  return width;
}
function cachedDomWidth(text, spec) {
  return domWidthCache.get(spec.key)?.get(text);
}
function queueDomWidth(text, spec) {
  let pending = pendingDomWidths.get(spec.key);
  if (pending === void 0) {
    pending = {
      spec,
      texts: /* @__PURE__ */new Set()
    };
    pendingDomWidths.set(spec.key, pending);
  }
  pending.texts.add(text);
}
function flushDomWidths() {
  if (pendingDomWidths.size === 0) return;
  if (typeof document === "undefined" || document.body === null) {
    pendingDomWidths.clear();
    return;
  }
  const host = document.createElement("div");
  host.style.cssText = "position:absolute;left:-100000px;top:0;visibility:hidden;pointer-events:none;white-space:pre;width:max-content;contain:layout style paint;";
  const probes = [];
  for (const _ref of pendingDomWidths.values()) {
    const spec = _ref.spec;
    const texts = _ref.texts;
    let perFont = domWidthCache.get(spec.key);
    if (perFont === void 0) {
      perFont = /* @__PURE__ */new Map();
      domWidthCache.set(spec.key, perFont);
    }
    for (const text of texts) {
      if (perFont.has(text)) continue;
      if (text.length === 0) {
        perFont.set(text, 0);
        continue;
      }
      const span = document.createElement("span");
      applyFontSpec(span, spec);
      span.style.display = "block";
      span.style.width = "max-content";
      span.style.whiteSpace = "pre";
      span.textContent = text;
      host.append(span);
      probes.push({
        span,
        text,
        spec
      });
    }
  }
  pendingDomWidths.clear();
  document.body.append(host);
  try {
    for (const _ref2 of probes) {
      const span = _ref2.span;
      const text = _ref2.text;
      const spec = _ref2.spec;
      domWidthCache.get(spec.key).set(text, span.getBoundingClientRect().width);
    }
  } finally {
    host.remove();
  }
}
function collectDomMeasurements(work) {
  if (collectingDomWidths) return work();
  collectingDomWidths = true;
  try {
    return work();
  } finally {
    collectingDomWidths = false;
    flushDomWidths();
  }
}
function measureWidth(text, spec) {
  if (!requiresDomMeasurement(spec)) return measureCanvasWidth(text, spec);
  const hit = cachedDomWidth(text, spec);
  if (hit !== void 0) return hit;
  queueDomWidth(text, spec);
  if (collectingDomWidths) return measureCanvasWidth(text, spec);
  flushDomWidths();
  return cachedDomWidth(text, spec) ?? measureCanvasWidth(text, spec);
}
var bearingCache = /* @__PURE__ */new Map();
function measureInkBearings(ch, spec) {
  let perFont = bearingCache.get(spec.key);
  if (perFont === void 0) {
    perFont = /* @__PURE__ */new Map();
    bearingCache.set(spec.key, perFont);
  }
  const hit = perFont.get(ch);
  if (hit !== void 0) return hit;
  const ctx = getCtx();
  setFont(ctx, spec);
  const m = ctx.measureText(ch);
  const bearings = {
    l: Math.max(0, -m.actualBoundingBoxLeft),
    r: Math.max(0, m.width - m.actualBoundingBoxRight)
  };
  perFont.set(ch, bearings);
  return bearings;
}
function isMonospace(spec) {
  return Math.abs(measureWidth("i", spec) - measureWidth("M", spec)) < 0.01;
}
function clearMeasureCache() {
  widthCache.clear();
  domWidthCache.clear();
  pendingDomWidths.clear();
  bearingCache.clear();
  currentKey = "";
}

// src/dom/calibrate.ts
var NO_EXPANSION = {
  ratioAtMax: 1,
  ratioAtMin: 1
};
var CALIBRATION_STRING = "Sphinx of black quartz, judge my vow; 0123456789 flavors of justified text.";
var RESPONSE_EPSILON = 0.05;
var HEBREW_SAMPLE = "\u05D0\u05D1\u05D2\u05D3\u05D4\u05D5\u05D6\u05D7\u05D8\u05D9\u05DB\u05DC\u05DE\u05E0\u05E1\u05E2\u05E4\u05E6\u05E7\u05E8\u05E9\u05EA";
var ARABIC_SAMPLE = "\u0627\u0644\u062D\u0645\u062F\u0644\u0644\u0647\u0631\u0628\u0627\u0644\u0639\u0627\u0644\u0645\u064A\u0646\u0648\u0628\u0647\u0646\u0633\u062A\u0639\u064A\u0646";
var CJK_SAMPLE = "\u6C38\u56FD\u916C\u9DF9\u91B8\u3042\u304B\u3059\u306A\u306E\u306F\u305F\u307E\u30A2\u30AB\u30CA\u30BF\u30DE\uAC00\uB098\uB2E4\uB77C\uB9C8\uBC14\uC0AC";
function calibrationTextFor(runText) {
  let text = "";
  let tag = "";
  if (runText !== void 0) {
    if (/\p{Script=Hebrew}/u.test(runText)) {
      text = HEBREW_SAMPLE;
      tag = "he";
    }
    if (/\p{Script=Arabic}/u.test(runText)) {
      text += ARABIC_SAMPLE;
      tag += "ar";
    }
    if (/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]/u.test(runText)) {
      text += CJK_SAMPLE;
      tag += "cjk";
    }
  }
  return text === "" ? {
    text: CALIBRATION_STRING,
    tag: ""
  } : {
    text,
    tag
  };
}
var cache = /* @__PURE__ */new Map();
function calibrateStretch(spec, maxPct, minPct, samplePcts, runText) {
  if (samplePcts === void 0) {
    samplePcts = [];
  }
  const _calibrationTextFor = calibrationTextFor(runText),
    calibrationText = _calibrationTextFor.text,
    tag = _calibrationTextFor.tag;
  const cacheKey = `${spec.key}|${maxPct}|${minPct}|${samplePcts.join(",")}|${tag}`;
  const hit = cache.get(cacheKey);
  if (hit !== void 0) return hit;
  if (spec.variationSettings.includes('"wdth"') || spec.stretch !== "100%" && spec.stretch !== "normal") {
    cache.set(cacheKey, NO_EXPANSION);
    return NO_EXPANSION;
  }
  if (typeof document === "undefined" || document.body === null) return NO_EXPANSION;
  const host = document.createElement("div");
  host.style.cssText = "position:absolute;left:-100000px;top:0;visibility:hidden;white-space:pre;width:max-content;contain:layout style;";
  const span = document.createElement("span");
  applyFontSpec(span, spec);
  span.textContent = calibrationText;
  host.append(span);
  document.body.append(host);
  const widthAt = stretch => {
    span.style.fontStretch = stretch;
    return span.getBoundingClientRect().width;
  };
  let result;
  try {
    const base = widthAt("100%");
    const wide = widthAt(maxPct + "%");
    const narrow = widthAt(minPct + "%");
    const ratioAtMax = base > 0 && Math.abs(wide - base) > RESPONSE_EPSILON ? wide / base : 1;
    const ratioAtMin = base > 0 && Math.abs(narrow - base) > RESPONSE_EPSILON ? narrow / base : 1;
    let ratios;
    if (base > 0 && (ratioAtMax !== 1 || ratioAtMin !== 1) && samplePcts.length > 0) {
      ratios = /* @__PURE__ */new Map();
      for (const pct of samplePcts) {
        if (pct > 100 && ratioAtMax === 1) ratios.set(pct, 1);else if (pct < 100 && ratioAtMin === 1) ratios.set(pct, 1);else ratios.set(pct, widthAt(pct + "%") / base);
      }
    }
    result = {
      ratioAtMax,
      ratioAtMin,
      ratios
    };
  } finally {
    host.remove();
  }
  cache.set(cacheKey, result);
  return result;
}
function clearCalibrationCache() {
  cache.clear();
}

// src/dom/observe.ts
function createWidthObserver(onWidths) {
  const pending = /* @__PURE__ */new Map();
  let frame = 0;
  const flush = () => {
    frame = 0;
    if (pending.size === 0) return;
    const batch = new Map(pending);
    pending.clear();
    onWidths(batch);
  };
  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const size = entry.contentBoxSize?.[0];
      const width = size !== void 0 ? size.inlineSize : entry.contentRect.width;
      pending.set(entry.target, width);
    }
    if (frame === 0) frame = requestAnimationFrame(flush);
  });
  return {
    observe: el => observer.observe(el, {
      box: "content-box"
    }),
    unobserve: el => {
      observer.unobserve(el);
      pending.delete(el);
    },
    disconnect: () => {
      observer.disconnect();
      pending.clear();
      if (frame !== 0) cancelAnimationFrame(frame);
    }
  };
}

// src/dom/read.ts
var REJECT_TAGS = /* @__PURE__ */new Set(["BR", "WBR", "IMG", "PICTURE", "VIDEO", "AUDIO", "CANVAS", "IFRAME", "OBJECT", "EMBED", "INPUT", "BUTTON", "SELECT", "TEXTAREA", "MATH", "TABLE", "HR", "SVG"]);
var UNSUPPORTED_SCRIPTS = /[\u0E00-\u0EFF]/;
var BIDI_CONTROLS = /[\u061C\u200E\u200F\u202A-\u202E\u2066-\u2069]/;
var STRONG_RTL = /[\u0590-\u08FF\uFB1D-\uFDFF\uFE70-\uFEFF\u{10800}-\u{10FFF}\u{1E800}-\u{1EFFF}]/u;
var NON_RTL_LETTER = /(?![\p{Script=Hebrew}\p{Script=Arabic}])\p{L}/u;
var RTL_LETTER = /[\p{Script=Hebrew}\p{Script=Arabic}]/u;
function textSupported(text, direction) {
  if (BIDI_CONTROLS.test(text)) return false;
  if (UNSUPPORTED_SCRIPTS.test(text)) return false;
  if (direction === "rtl") {
    if (NON_RTL_LETTER.test(text)) return false;
    if (!RTL_LETTER.test(text)) return false;
  } else if (STRONG_RTL.test(text)) {
    return false;
  }
  return true;
}
var MARGIN_PROPS = ["marginLeft", "marginRight"];
function transparentColor(color) {
  const value = color.trim().toLowerCase();
  if (value === "transparent") return true;
  if (/^rgba\([^)]*,\s*0(?:\.0*)?%?\s*\)$/.test(value)) return true;
  return /\/\s*0(?:\.0*)?%?\s*\)$/.test(value);
}
function splitCss(value, commas) {
  const out = [];
  let depth = 0;
  let start = 0;
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (ch === "(") depth++;else if (ch === ")") depth = Math.max(0, depth - 1);else if (depth === 0 && (commas ? ch === "," : /\s/.test(ch))) {
      const token = value.slice(start, i).trim();
      if (token.length > 0) out.push(token);
      start = i + 1;
    }
  }
  const tail = value.slice(start).trim();
  if (tail.length > 0) out.push(tail);
  return out;
}
function shadowPaintedEdges(value, direction) {
  let left = false;
  let right = false;
  if (value === "none") return {
    start: false,
    end: false
  };
  for (const shadow of splitCss(value, true)) {
    const tokens = splitCss(shadow, false);
    if (tokens.some(token => token.toLowerCase() === "inset")) continue;
    const color = tokens.find(token => token === "transparent" || /^[a-z-]+\(/i.test(token));
    if (color !== void 0 && transparentColor(color)) continue;
    const lengths = tokens.filter(token => /^[-+]?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?(?:px)?$/i.test(token)).map(token => parseFloat(token));
    if (lengths.length < 2) continue;
    const offsetX = lengths[0];
    const blur = Math.max(0, lengths[2] ?? 0);
    const spread = lengths[3] ?? 0;
    const reach = blur + spread;
    if (offsetX - reach < 0) left = true;
    if (offsetX + reach > 0) right = true;
  }
  return direction === "rtl" ? {
    start: right,
    end: left
  } : {
    start: left,
    end: right
  };
}
function paintedInlineEdges(style, direction) {
  const clips = style.backgroundClip.split(",").map(clip => clip.trim());
  const clippedToText = clips.length > 0 && clips.every(clip => clip === "text");
  const background = !clippedToText && (style.backgroundImage !== "none" || !transparentColor(style.backgroundColor));
  if (background) return {
    start: true,
    end: true
  };
  return shadowPaintedEdges(style.boxShadow, direction);
}
function readParagraph(p) {
  const view = p.ownerDocument.defaultView;
  if (view === null) return "detached from its document";
  const cs = view.getComputedStyle(p);
  if (cs.display === "none") return "display: none";
  if (cs.whiteSpace !== "normal") return `white-space: ${cs.whiteSpace} on the paragraph`;
  if (cs.textTransform !== "none") return `text-transform: ${cs.textTransform}`;
  if (cs.writingMode !== "horizontal-tb") return `writing-mode: ${cs.writingMode}`;
  const direction = cs.direction === "rtl" ? "rtl" : "ltr";
  if (p.isContentEditable) return "content-editable";
  if (p.shadowRoot !== null) return "element hosts a shadow root";
  const specs = [];
  const keyToIndex = /* @__PURE__ */new Map();
  const indexSpec = style => {
    const spec = fontSpecOf(style);
    const existing = keyToIndex.get(spec.key);
    if (existing !== void 0) return existing;
    specs.push(spec);
    keyToIndex.set(spec.key, specs.length - 1);
    return specs.length - 1;
  };
  const baseSpec = indexSpec(cs);
  const runs = [];
  let skip = null;
  let nextAtomicKey = 0;
  const walk = (node, chain, spec, atomicKey) => {
    for (let child = node.firstChild; child !== null; child = child.nextSibling) {
      if (skip !== null) return;
      if (child.nodeType === 3) {
        const text = child.nodeValue ?? "";
        if (text.length > 0) {
          runs.push({
            text,
            spec,
            ancestors: chain,
            atomicKey
          });
        }
      } else if (child.nodeType === 1) {
        const el = child;
        if (REJECT_TAGS.has(el.tagName.toUpperCase())) {
          skip = `<${el.tagName.toLowerCase()}> content`;
          return;
        }
        const elStyle = view.getComputedStyle(el);
        if (elStyle.display !== "inline" || elStyle.float !== "none" || elStyle.position !== "static" && elStyle.position !== "relative") {
          skip = `non-inline-flow <${el.tagName.toLowerCase()}> (display/float/position)`;
          return;
        }
        if (MARGIN_PROPS.some(prop => (parseFloat(elStyle[prop]) || 0) !== 0)) {
          skip = `inline <${el.tagName.toLowerCase()}> has a horizontal margin`;
          return;
        }
        const padStart = (parseFloat(direction === "rtl" ? elStyle.paddingRight : elStyle.paddingLeft) || 0) + (parseFloat(direction === "rtl" ? elStyle.borderRightWidth : elStyle.borderLeftWidth) || 0);
        const padEnd = (parseFloat(direction === "rtl" ? elStyle.paddingLeft : elStyle.paddingRight) || 0) + (parseFloat(direction === "rtl" ? elStyle.borderLeftWidth : elStyle.borderRightWidth) || 0);
        const padded = padStart > 0 || padEnd > 0;
        const decorationBreak = elStyle.getPropertyValue("box-decoration-break") || elStyle.getPropertyValue("-webkit-box-decoration-break");
        if (padded && decorationBreak === "clone") {
          skip = `box-decoration-break: clone on padded <${el.tagName.toLowerCase()}>`;
          return;
        }
        if (elStyle.textTransform !== "none") {
          skip = `text-transform: ${elStyle.textTransform} on <${el.tagName.toLowerCase()}>`;
          return;
        }
        if (elStyle.direction !== cs.direction || elStyle.unicodeBidi !== "normal" && elStyle.unicodeBidi !== "isolate") {
          skip = `direction/unicode-bidi override on <${el.tagName.toLowerCase()}>`;
          return;
        }
        let childKey = atomicKey;
        if (elStyle.whiteSpace === "nowrap") {
          childKey = atomicKey ?? nextAtomicKey++;
        } else if (elStyle.whiteSpace !== "normal") {
          skip = `white-space: ${elStyle.whiteSpace} on <${el.tagName.toLowerCase()}>`;
          return;
        }
        const before = runs.length;
        const paintedHere = paintedInlineEdges(elStyle, direction);
        walk(el, [...chain, el], indexSpec(elStyle), childKey);
        if (skip !== null) return;
        const inspectEdges = padded || paintedHere.start || paintedHere.end;
        const inside = inspectEdges ? runs.slice(before) : [];
        let firstBoxAt = -1;
        let lastBoxAt = -1;
        for (let i = 0; i < inside.length; i++) {
          if (!textMakesBox(inside[i].text)) continue;
          if (firstBoxAt < 0) firstBoxAt = i;
          lastBoxAt = i;
        }
        if (padded) {
          if (firstBoxAt < 0) {
            skip = `padded <${el.tagName.toLowerCase()}> with no text content`;
            return;
          }
          const first = runs[before];
          const last = runs[runs.length - 1];
          first.padStartPx = (first.padStartPx ?? 0) + padStart;
          last.padEndPx = (last.padEndPx ?? 0) + padEnd;
        }
        if ((paintedHere.start || paintedHere.end) && firstBoxAt >= 0) {
          if (paintedHere.start) {
            let startInset = 0;
            for (let i = 0; i <= firstBoxAt; i++) {
              startInset += inside[i].padStartPx ?? 0;
            }
            const firstBoxRun = inside[firstBoxAt];
            firstBoxRun.boxStartProtrusionPx = startInset;
            firstBoxRun.boxStartProtrusionOwner = el;
          }
          if (paintedHere.end) {
            let endInset = 0;
            for (let i = lastBoxAt; i < inside.length; i++) {
              endInset += inside[i].padEndPx ?? 0;
            }
            inside[inside.length - 1].boxEndProtrusionPx = endInset;
            inside[lastBoxAt].boxEndProtrusionOwner = el;
          }
        }
      }
    }
  };
  walk(p, [], baseSpec, void 0);
  if (skip !== null) return skip;
  if (runs.length === 0) return "no text content";
  if (!textSupported(runs.map(r => r.text).join(""), direction)) {
    return "unsupported text (bidi controls, mixed direction, or a script without break support)";
  }
  const contentWidth = contentWidthOf(p);
  if (contentWidth <= 0) return "zero content width";
  let textIndent = parseFloat(cs.textIndent) || 0;
  const textIndentPct = cs.textIndent.endsWith("%") ? textIndent / 100 : null;
  if (textIndentPct !== null) textIndent = textIndentPct * contentWidth;
  const lineHeightPx = parseFloat(cs.lineHeight);
  const styles = cs;
  const cis = styles.containIntrinsicBlockSize ?? styles.containIntrinsicHeight ?? "";
  const pinIntrinsicSize = (styles.contentVisibility ?? "") === "auto" || cis !== "" && cis !== "none";
  return {
    runs,
    specs,
    baseSpec,
    contentWidth,
    textIndent,
    textIndentPct,
    lineHeightPx: Number.isFinite(lineHeightPx) ? lineHeightPx : null,
    pinIntrinsicSize,
    justifyAll: cs.textAlign === "justify-all" || cs.textAlignLast === "justify",
    direction
  };
}
function contentWidthOf(p) {
  const view = p.ownerDocument.defaultView;
  if (view === null) return 0;
  const cs = view.getComputedStyle(p);
  return p.getBoundingClientRect().width - (parseFloat(cs.paddingLeft) || 0) - (parseFloat(cs.paddingRight) || 0) - (parseFloat(cs.borderLeftWidth) || 0) - (parseFloat(cs.borderRightWidth) || 0);
}

// src/dom/write.ts
var WRAP_SAFETY_PAD_PX = 1.5;
var CORRECTION_WINDOW_PX = -3;
var WRAP_SPARE_PX = 1;
var STYLE_ID = "justif-style";
var px = v => `${Math.round(v * 1e3) / 1e3}px`;
var SHEET_TEXT = '.justif-seg{white-space:nowrap}.justif-hyphen::after{content:"-"}@supports (content:"-" / ""){.justif-hyphen::after{content:"-" / ""}}';
function disableTextAutosizing(el) {
  el.style.setProperty("-webkit-text-size-adjust", "100%", "important");
  el.style.setProperty("text-size-adjust", "100%", "important");
}
var styledRoots = /* @__PURE__ */new WeakSet();
function ensureStylesheet(root) {
  if (styledRoots.has(root)) return;
  const isDoc = root.nodeType === 9;
  const doc = isDoc ? root : root.ownerDocument;
  const win = doc.defaultView;
  if (win !== null && "adoptedStyleSheets" in root) {
    try {
      const sheet = new win.CSSStyleSheet();
      sheet.replaceSync(SHEET_TEXT);
      root.adoptedStyleSheets = [...root.adoptedStyleSheets, sheet];
      styledRoots.add(root);
      return;
    } catch {}
  }
  if (isDoc && doc.getElementById(STYLE_ID) !== null) {
    styledRoots.add(root);
    return;
  }
  const style = doc.createElement("style");
  style.id = STYLE_ID;
  style.textContent = SHEET_TEXT;
  (isDoc ? doc.head : root).append(style);
  styledRoots.add(root);
}
function writeParagraph(p, segments, lineWidths) {
  const doc = p.ownerDocument;
  const root = p.getRootNode();
  ensureStylesheet(root.nodeType === 9 || root.nodeType === 11 && "host" in root ? root : doc);
  const lineElements = [[]];
  const fragment = doc.createDocumentFragment();
  const stack = [];
  const containerAt = depth => depth === 0 ? fragment : stack[depth - 1].clone;
  const commonDepth = chain => {
    let i = 0;
    while (i < stack.length && i < chain.length && stack[i].src === chain[i]) i++;
    return i;
  };
  const containerFor = chain => {
    let depth = commonDepth(chain);
    stack.length = depth;
    for (; depth < chain.length; depth++) {
      const src = chain[depth];
      const clone = src.cloneNode(false);
      containerAt(depth).append(clone);
      stack.push({
        src,
        clone
      });
    }
    return containerAt(chain.length);
  };
  const cloneFor = (src, chain) => {
    if (src === void 0) return void 0;
    const depth = chain.indexOf(src);
    return depth < 0 ? void 0 : stack[depth]?.clone;
  };
  let prevContainer = fragment;
  for (const segment of segments) {
    if (segment.joint === "hyphen") {
      const hyphen = doc.createElement("span");
      hyphen.className = "justif-hyphen";
      disableTextAutosizing(hyphen);
      const entries = lineElements[lineElements.length - 1];
      const prevEntry = entries[entries.length - 1];
      if (prevEntry !== void 0 && prevEntry.marginEndEl.style.marginInlineEnd !== "") {
        hyphen.style.marginInlineEnd = prevEntry.marginEndEl.style.marginInlineEnd;
        prevEntry.marginEndEl.style.marginInlineEnd = "";
      }
      prevContainer.append(hyphen);
      entries.push({
        el: hyphen,
        seg: null,
        marginEndEl: hyphen
      });
    }
    if (segment.joint !== "none") {
      lineElements.push([]);
      const depth = Math.min(commonDepth(segment.ancestors), stack.length);
      stack.length = depth;
      const container2 = containerAt(depth);
      if (segment.joint === "space") container2.append(doc.createTextNode(" "));else container2.append(doc.createElement("wbr"));
    }
    const container = containerFor(segment.ancestors);
    const el = doc.createElement("span");
    el.className = "justif-seg";
    disableTextAutosizing(el);
    el.style.wordSpacing = px(segment.wordSpacingPx);
    if (segment.letterSpacingPx !== null) {
      el.style.letterSpacing = px(segment.letterSpacingPx);
      if (segment.fontFeatureSettings !== void 0) {
        el.style.fontFeatureSettings = segment.fontFeatureSettings;
      }
    }
    if (segment.isolateShaping === true) el.style.unicodeBidi = "isolate";
    if (segment.fontStretchPct !== 100) {
      el.style.fontStretch = `${Math.round(segment.fontStretchPct * 100) / 100}%`;
    }
    const marginStartEl = cloneFor(segment.marginStartOwner, segment.ancestors) ?? el;
    const marginEndEl = cloneFor(segment.marginEndOwner, segment.ancestors) ?? el;
    if (segment.marginStartPx !== 0) {
      marginStartEl.style.marginInlineStart = px(segment.marginStartPx);
    }
    if (segment.marginEndPx !== 0) marginEndEl.style.marginInlineEnd = px(segment.marginEndPx);
    if (segment.cjk === true) {
      el.style.fontKerning = "none";
      el.style.setProperty("text-spacing-trim", "space-all");
    }
    el.textContent = segment.text;
    container.append(el);
    prevContainer = container;
    lineElements[lineElements.length - 1].push({
      el,
      seg: segment,
      marginEndEl
    });
  }
  p.replaceChildren(fragment);
  return {
    doc,
    lineElements,
    lineWidths
  };
}
function measureCorrections(pending) {
  const corrections = [];
  const hidden = [];
  let range = null;
  for (let i = 0; i < pending.length; i++) {
    const _pending$i = pending[i],
      doc = _pending$i.doc,
      lineElements = _pending$i.lineElements,
      lineWidths = _pending$i.lineWidths;
    const firstEntry = lineElements.find(l => l.length > 0)?.[0];
    if (firstEntry === void 0 || !firstEntry.el.isConnected) continue;
    range ?? (range = doc.createRange());
    let sawInk = false;
    const paraCorrections = [];
    for (let li = 0; li < lineElements.length; li++) {
      const entries = lineElements[li];
      if (entries.length === 0) continue;
      const availableWidth = lineWidths[li] ?? lineWidths[lineWidths.length - 1] ?? 0;
      let rectPx = 0;
      let modelPx = 0;
      let ownMargins = 0;
      for (const _ref3 of entries) {
        const el = _ref3.el;
        const seg = _ref3.seg;
        const marginEndEl = _ref3.marginEndEl;
        if (seg === null || seg.edgeTrim.lead === 0 && seg.edgeTrim.trail === 0) {
          rectPx += el.getBoundingClientRect().width;
        } else {
          const node = el.firstChild;
          range.setStart(node, seg.edgeTrim.lead);
          range.setEnd(node, seg.text.length - seg.edgeTrim.trail);
          rectPx += range.getBoundingClientRect().width;
          modelPx += seg.edgeTrim.modelPx;
        }
        if (seg !== null && seg.decorPx !== void 0) modelPx += seg.decorPx;
        modelPx += seg?.marginStartPx ?? 0;
        const me = parseFloat(marginEndEl.style.marginInlineEnd) || 0;
        modelPx += me;
        ownMargins += me;
      }
      if (rectPx !== 0) sawInk = true;
      const layout = rectPx + modelPx;
      const overflow = layout - availableWidth;
      if (overflow > CORRECTION_WINDOW_PX) {
        const last = entries[entries.length - 1];
        paraCorrections.push({
          el: last.el,
          marginEl: last.marginEndEl,
          marginPx: ownMargins - (overflow + WRAP_SPARE_PX)
        });
      }
    }
    if (!sawInk) hidden.push(i);else corrections.push(...paraCorrections);
  }
  return {
    corrections,
    hidden
  };
}
function applyCorrections(corrections) {
  for (const c of corrections) {
    let target = c.el;
    for (let parent = target.parentElement; parent !== null && !parent.hasAttribute("data-justif") && parent.lastChild === target; parent = target.parentElement) {
      target = parent;
    }
    if (c.marginEl !== target) c.marginEl.style.marginInlineEnd = "0px";
    target.style.marginInlineEnd = px(c.marginPx);
  }
}

// src/dom/segments.ts
function trackingFeatureSettings(spec, active) {
  if (!active || spec.letterSpacingPx !== 0) return void 0;
  if (spec.ligatures === "none" || /\bno-common-ligatures\b/.test(spec.ligatures)) {
    return void 0;
  }
  const settings = spec.featureSettings === "normal" ? [] : [spec.featureSettings];
  const explicitlyOff = tag => new RegExp(`["']${tag}["']\\s*(?:0|off)\\b`, "i").test(spec.featureSettings);
  if (!explicitlyOff("liga")) settings.push('"liga" 1');
  if (!explicitlyOff("clig")) settings.push('"clig" 1');
  return settings.length > 0 ? settings.join(", ") : void 0;
}
function spaceWidthIn(spec, runText) {
  if (spec.direction === "rtl") {
    const probe = /\p{Script=Arabic}/u.test(runText) ? "\u0644" : /\p{Script=Hebrew}/u.test(runText) ? "\u05D0" : null;
    if (probe !== null) {
      return measureWidth(`${probe} ${probe}`, spec) - 2 * measureWidth(probe, spec);
    }
  }
  if (requiresDomMeasurement(spec) && spec.variantPosition === "normal") {
    const letter = /\p{L}/u.exec(runText)?.[0] ?? "n";
    return measureWidth(`${letter} ${letter}`, spec) - 2 * measureWidth(letter, spec);
  }
  return measureWidth(" ", spec);
}
function measureFor(specByKey) {
  return {
    width: (text, run) => measureWidth(text, specByKey.get(run.fontKey)),
    charAdvance: (ch, run) => measureWidth(ch, specByKey.get(run.fontKey)),
    inkBearings: (ch, run) => measureInkBearings(ch, specByKey.get(run.fontKey))
  };
}
function runTexts(scan) {
  return scan.runs.map((r, i) => ({
    text: r.text,
    run: i,
    boxStartProtrusionPx: r.boxStartProtrusionPx,
    boxEndProtrusionPx: r.boxEndProtrusionPx,
    padStartPx: r.padStartPx,
    padEndPx: r.padEndPx,
    atomicKey: r.atomicKey
  }));
}
function buildRunMetrics(scan, expansion, spacing, protrusion) {
  const paragraphText = scan.runs.map(r => r.text).join(" ");
  const baseSpaceWidth = spaceWidthIn(scan.specs[scan.baseSpec], paragraphText);
  const pull = spacing.pull ?? 0.7;
  const samplePcts = [];
  if (expansion !== false && expansion.step > 0) {
    const stepPct = 100 * expansion.step;
    for (let q = stepPct; q <= 100 * expansion.max + 1e-9; q += stepPct) {
      samplePcts.push(Math.round((100 + q) * 1e3) / 1e3);
    }
    for (let q = stepPct; q <= 100 * expansion.shrink + 1e-9; q += stepPct) {
      samplePcts.push(Math.round((100 - q) * 1e3) / 1e3);
    }
  }
  return scan.runs.map(run => {
    const spec = scan.specs[run.spec];
    let perFont;
    let perFontFirst;
    if (protrusion !== void 0 && protrusion.enabled) {
      const matched = fontProtrusion(spec.family);
      if (matched !== void 0) {
        const composed = composeProtrusion({
          ...latinProtrusion,
          ...matched
        }, protrusion.user, protrusion.hang);
        perFont = composed.rest;
        if (composed.first !== composed.rest) perFontFirst = composed.first;
      }
    }
    const naturalSpace = spaceWidthIn(spec, run.text);
    const spaceWidth = naturalSpace > baseSpaceWidth ? naturalSpace + (baseSpaceWidth - naturalSpace) * pull : naturalSpace;
    const flexWidth = naturalSpace + (Math.min(naturalSpace, baseSpaceWidth) - naturalSpace) * pull;
    const calibration = expansion === false ? NO_EXPANSION : calibrateStretch(spec, 100 + 100 * expansion.max, 100 - 100 * expansion.shrink, samplePcts, run.text);
    return {
      fontKey: spec.key,
      space: {
        width: spaceWidth,
        stretch: flexWidth * spacing.stretch,
        shrink: flexWidth * spacing.shrink
      },
      hyphenWidth: measureWidth("-", spec),
      ratioAtMax: calibration.ratioAtMax,
      ratioAtMin: calibration.ratioAtMin,
      expansionRatios: calibration.ratios,
      // RTL paragraphs never hyphenate: Arabic cursive joining makes the
      // prefix-incremental fragment measurement in buildItems invalid
      // (splitting changes the glyphs on both sides of the cut), and
      // Hebrew convention breaks without hyphens if at all. noHyphens
      // also strips soft hyphens and keeps the hyphenate callback from
      // ever being called for these runs.
      noHyphens: spec.hyphens === "none" || scan.direction === "rtl",
      // Word spaces between different font FAMILIES lose their shrink
      // (BuildOptions.boundaryShrink): chips and pills live at those
      // boundaries. Style/weight/size changes within a family (<em>,
      // <strong>) are not boundaries.
      familyKey: spec.family,
      // Monospace cells carry huge side bearings; advance-relative protrusion
      // codes would hang the ink visibly past the margin — but only when the
      // mono run sits INSIDE another font's prose (inline code), where the
      // hang reads as overflow against the base font's margin rhythm. A
      // paragraph set in a mono font owns its margin: it protrudes like any
      // other font (full cell hangs under hangingPunctuation — the
      // typewriter-tradition grid behavior).
      protrudeInkOnly: isMonospace(spec) && spec.key !== scan.specs[scan.baseSpec].key,
      protrusion: perFont,
      protrusionFirst: perFontFirst
    };
  });
}
function buildRenderSegments(scan, runsMetrics, para, lines) {
  const segments = [];
  let pendingJoint = "none";
  const decorStartSeen = /* @__PURE__ */new Set();
  const lastSegForRun = /* @__PURE__ */new Map();
  for (const line of lines) {
    const desired = (runIndex, flexOf) => {
      const metrics = runsMetrics[runIndex];
      const spec = scan.specs[scan.runs[runIndex].spec];
      const widthOffset = metrics.space.width - spaceWidthIn(spec, scan.runs[runIndex].text);
      const pool = flexOf ?? metrics.space;
      const flex = line.glueRatio >= 0 ? pool.stretch : pool.shrink;
      return spec.wordSpacingPx + widthOffset + line.glueRatio * flex;
    };
    let joint = pendingJoint;
    let first = true;
    let text = "";
    let run = -1;
    let trackY = 0;
    let trackZ = 0;
    let cjkY = 0;
    let cjkZ = 0;
    let hasCJK = false;
    let boxChars = 0;
    let rigidFlex = null;
    const flush = () => {
      if (run < 0 || text.length === 0) return;
      const trackFlex = line.trackRatio >= 0 ? trackY : trackZ;
      const cjkFlex = line.glueRatio >= 0 ? cjkY : cjkZ;
      const extraPx = (trackFlex > 0 ? line.trackRatio * trackFlex : 0) + (cjkFlex > 0 ? line.glueRatio * cjkFlex : 0);
      const ls = boxChars > 0 && extraPx !== 0 ? extraPx / boxChars : 0;
      const lead = text.length - text.trimStart().length;
      const trail = lead < text.length ? text.length - text.trimEnd().length : 0;
      const spec = scan.specs[scan.runs[run].spec];
      const table = runsMetrics[run].expansionRatios;
      const key = Math.round(line.fontStretch * 1e3) / 1e3;
      const ratio = table?.get(key) ?? 1;
      const wordSpacing = desired(run, rigidFlex ?? void 0);
      const spacePx = spaceWidthIn(spec, scan.runs[run].text) * ratio + wordSpacing;
      const srcRun = scan.runs[run];
      let decorPx;
      if (srcRun.padStartPx !== void 0 && !decorStartSeen.has(run)) {
        decorStartSeen.add(run);
        decorPx = srcRun.padStartPx;
      }
      segments.push({
        text,
        ancestors: srcRun.ancestors,
        wordSpacingPx: wordSpacing - ls,
        letterSpacingPx: ls !== 0 ? spec.letterSpacingPx + ls : null,
        fontFeatureSettings: trackingFeatureSettings(spec, ls !== 0),
        isolateShaping: spec.variantPosition !== "normal",
        fontStretchPct: line.fontStretch,
        marginStartPx: first ? -line.leftHang : 0,
        marginEndPx: 0,
        // the line's last segment is patched after the loop
        edgeTrim: {
          lead,
          trail,
          modelPx: (lead + trail) * spacePx
        },
        decorPx,
        cjk: hasCJK,
        joint,
        marginStartOwner: first && line.leftHang > 0 ? srcRun.boxStartProtrusionOwner : void 0,
        // Assigned only to the line's actual final segment below. Pointing
        // multiple entries at one clone would make correction measurement
        // count the clone's single margin more than once.
        marginEndOwner: void 0
      });
      if (srcRun.padEndPx !== void 0) lastSegForRun.set(run, segments.length - 1);
      joint = "none";
      first = false;
      text = "";
      run = -1;
      trackY = 0;
      trackZ = 0;
      cjkY = 0;
      cjkZ = 0;
      hasCJK = false;
      boxChars = 0;
    };
    for (let i = line.start; i < line.end; i++) {
      const it = para.items[i];
      if (it.type === ItemType.Box) {
        if (run !== -1 && run !== it.run) {
          const junction = text.slice(-1) + (it.text[0] ?? "");
          const risky = /[\u002D\u2010-\u2015]/.test(junction);
          flush();
          text = risky ? "\u2060" : "";
        }
        run = it.run;
        text += it.text;
        trackY += it.trackStretch;
        trackZ += it.trackShrink;
        boxChars += Array.from(it.text).length;
        if (!hasCJK && CJK_CHAR.test(it.text)) hasCJK = true;
      } else if (it.type === ItemType.Glue) {
        if (it.cjk === true) {
          cjkY += it.stretch;
          cjkZ += it.shrink;
          continue;
        }
        const glueSpec = scan.specs[scan.runs[it.run].spec];
        if (glueSpec.variantPosition !== "normal") {
          flush();
          run = it.run;
          text = " ";
          flush();
          continue;
        }
        if (it.rigid === true && line.glueRatio < 0) {
          flush();
          run = it.run;
          text = "\xA0";
          rigidFlex = {
            stretch: it.stretch,
            shrink: it.shrink
          };
          flush();
          rigidFlex = null;
          continue;
        }
        if (run === -1 || run === it.run) {
          run = it.run;
          text += " ";
        } else {
          flush();
          run = it.run;
          text = "\xA0";
        }
      }
    }
    flush();
    const last = segments[segments.length - 1];
    if (last !== void 0) {
      last.marginEndPx = -(line.rightHang + line.overflowPx + WRAP_SAFETY_PAD_PX);
      let endBox;
      for (let i = line.end - 1; i >= line.start; i--) {
        const candidate = para.items[i];
        if (candidate.type === ItemType.Box) {
          endBox = candidate;
          break;
        }
      }
      if (endBox?.type === ItemType.Box && endBox.paintedEnd === true) {
        last.marginEndOwner = scan.runs[endBox.run]?.boxEndProtrusionOwner;
      }
    }
    const brk = para.items[line.end];
    if (line.hyphenated) pendingJoint = "hyphen";else if (brk !== void 0 && brk.type === ItemType.Glue) pendingJoint = "space";else if (brk !== void 0 && brk.type === ItemType.Penalty && brk.width === 0 && !brk.flagged) {
      pendingJoint = brk.cjk === true ? "wbr" : "space";
    } else pendingJoint = "wbr";
  }
  for (const _ref4 of lastSegForRun) {
    const runIndex = _ref4[0];
    const segIndex = _ref4[1];
    const seg = segments[segIndex];
    seg.decorPx = (seg.decorPx ?? 0) + scan.runs[runIndex].padEndPx;
  }
  return segments;
}

// src/index.ts
var states = /* @__PURE__ */new WeakMap();
function restoreStyleAttribute(el, style) {
  if (style === null) {
    el.setAttribute("style", "");
    el.removeAttribute("style");
  } else {
    el.setAttribute("style", style);
  }
}
function restoreManagedOutput(p, state) {
  if (!state.enhanced) return false;
  p.replaceChildren(state.original);
  restoreStyleAttribute(p, state.originalStyleAttr);
  p.removeAttribute("data-justif");
  state.lastPatch = "";
  state.enhanced = false;
  return true;
}
var DEFAULT_EXPANSION = {
  max: 0.02,
  shrink: 0.02,
  step: 5e-3
};
var DEFAULT_SPACING = {
  stretch: 0.5,
  shrink: 1 / 3,
  pull: 0.7,
  boundaryShrink: 0
};
var DEFAULT_TRACKING = {
  max: 0.03,
  shrink: 0.03
};
function noopController() {
  return {
    ready: Promise.resolve(),
    refresh() {},
    destroy() {},
    paragraphs: []
  };
}
function withOverrides(defaults, overrides) {
  const merged = {
    ...defaults
  };
  for (const key of Object.keys(defaults)) {
    const value = overrides[key];
    if (value !== void 0) merged[key] = value;
  }
  return merged;
}
function justify(targets, options) {
  if (options === void 0) {
    options = {};
  }
  if (typeof document === "undefined" || typeof window === "undefined") {
    return noopController();
  }
  const paragraphs = [];
  for (const el of targets instanceof Element ? [targets] : targets) {
    if (el instanceof HTMLElement) paragraphs.push(el);
  }
  const owner = /* @__PURE__ */Symbol("justif-controller");
  const bailed = /* @__PURE__ */new WeakSet();
  let destroyed = false;
  const breakOpts = withOverrides(defaultBreakOptions, options);
  const lastLineMinWidth = Math.max(0, Math.min(1, options.lastLineMinWidth ?? 0.33));
  breakOpts.lastLineMinWidth = lastLineMinWidth;
  const protrusionUser = typeof options.protrusion === "object" ? options.protrusion : null;
  const hangMode = options.hangingPunctuation === false ? false : options.hangingPunctuation === true || options.hangingPunctuation === void 0 ? "first-line" : options.hangingPunctuation;
  const composed = options.protrusion === false ? null : composeProtrusion(latinProtrusion, protrusionUser, hangMode);
  const protrusion = composed === null ? false : composed.rest;
  const protrusionFirst = composed !== null && composed.first !== composed.rest ? composed.first : void 0;
  const protrusionCtx = {
    enabled: composed !== null,
    user: protrusionUser,
    hang: hangMode
  };
  const expansion = options.expansion === void 0 ? DEFAULT_EXPANSION : options.expansion;
  const spacing = options.spacing ?? DEFAULT_SPACING;
  const tracking = options.tracking === false ? false : options.tracking === true || options.tracking === void 0 ? DEFAULT_TRACKING : {
    ...DEFAULT_TRACKING,
    ...options.tracking
  };
  let hyphenate = options.hyphenate;
  if (hyphenate !== void 0) {
    const inner = hyphenate;
    const cache2 = /* @__PURE__ */new Map();
    hyphenate = word => {
      let pieces = cache2.get(word);
      if (pieces === void 0) {
        pieces = inner(word);
        cache2.set(word, pieces);
      }
      return pieces;
    };
  }
  const buildOpts = {
    ...defaultBuildOptions,
    hyphenate,
    lastLineFit: Math.max(0, Math.min(1, options.lastLineFit ?? 0)),
    lastLineMinWidth,
    hyphenPenalty: options.hyphenPenalty ?? defaultBuildOptions.hyphenPenalty,
    exHyphenPenalty: options.exHyphenPenalty ?? defaultBuildOptions.exHyphenPenalty,
    protrusion,
    protrusionFirst,
    expansion,
    tracking,
    boundaryShrink: spacing.boundaryShrink ?? defaultBuildOptions.boundaryShrink
  };
  const disableTextAutosizingForScan = () => {
    const saved = [];
    const seen = /* @__PURE__ */new WeakSet();
    const disable = el => {
      if (seen.has(el)) return;
      seen.add(el);
      saved.push({
        el,
        style: el.getAttribute("style")
      });
      disableTextAutosizing(el);
    };
    for (const p of paragraphs) {
      if (states.get(p)?.enhanced) continue;
      disable(p);
      for (const el of p.querySelectorAll("*")) {
        if (el instanceof HTMLElement) disable(el);
      }
    }
    return () => {
      for (const _ref5 of saved) {
        const el = _ref5.el;
        const style = _ref5.style;
        restoreStyleAttribute(el, style);
      }
    };
  };
  const scanned = /* @__PURE__ */new Map();
  const pendingSkips = [];
  const scanParagraph = p => {
    if (states.get(p)?.enhanced) return true;
    if (bailed.has(p)) return false;
    if (scanned.has(p)) return true;
    let scan;
    try {
      scan = readParagraph(p);
      if (typeof scan !== "string") {
        const bad = scan.specs.find(sp => !supportsSpec(sp));
        if (bad !== void 0) {
          scan = bad.stretch !== "100%" && bad.stretch !== "normal" ? `author font-stretch: ${bad.stretch} on a run` : "font-variation-settings on a run";
        }
      }
    } catch (error) {
      scan = `threw while scanning: ${error instanceof Error ? error.message : String(error)}`;
    }
    if (typeof scan === "string") {
      bailed.add(p);
      pendingSkips.push({
        p,
        reason: scan
      });
      return false;
    }
    scanned.set(p, scan);
    return true;
  };
  const buildPara = (scan, runsMetrics, specByKey) => {
    const opts = scan.direction === "rtl" ? {
      ...buildOpts,
      tracking: false
    } : buildOpts;
    return buildItems(runTexts(scan), runsMetrics, opts, measureFor(specByKey));
  };
  const prepare = p => {
    if (states.get(p)?.enhanced) {
      scanned.delete(p);
      return true;
    }
    const scan = scanned.get(p);
    if (scan === void 0) return false;
    scanned.delete(p);
    try {
      const specByKey = /* @__PURE__ */new Map();
      for (const spec of scan.specs) specByKey.set(spec.key, spec);
      const runsMetrics = buildRunMetrics(scan, expansion, spacing, protrusionCtx);
      states.set(p, {
        owner,
        original: document.createDocumentFragment(),
        originalStyleAttr: p.getAttribute("style"),
        scan,
        runsMetrics,
        specByKey,
        para: buildPara(scan, runsMetrics, specByKey),
        width: scan.contentWidth,
        lastPatch: "",
        enhanced: false
      });
    } catch (error) {
      bailed.add(p);
      emitSkip(p, `threw while measuring: ${error instanceof Error ? error.message : String(error)}`);
      return false;
    }
    return true;
  };
  const safePatch = p => {
    try {
      return patchOne(p);
    } catch (error) {
      const changed = states.get(p)?.enhanced === true;
      restore(p);
      bailed.add(p);
      emitSkip(p, `threw while rendering: ${error instanceof Error ? error.message : String(error)}`);
      return {
        changed,
        pending: null
      };
    }
  };
  const emitSkip = (p, reason) => {
    try {
      options.onSkip?.(p, reason);
    } catch (err) {
      console.error("justif: onSkip callback threw", err);
    }
  };
  const emitRelayout = p => {
    try {
      options.onRelayout?.(p);
    } catch (err) {
      console.error("justif: onRelayout callback threw", err);
    }
  };
  const patchOne = p => {
    const state = states.get(p);
    if (state === void 0 || state.owner !== owner) return {
      changed: false,
      pending: null
    };
    const indentPx = state.scan.textIndentPct !== null ? state.scan.textIndentPct * state.width : state.scan.textIndent;
    const widths = indentPx !== 0 ? [state.width - indentPx, state.width] : state.width;
    const paragraphMinWidth = state.scan.justifyAll ? 1 : lastLineMinWidth;
    const paragraphBreakOpts = paragraphMinWidth === lastLineMinWidth ? breakOpts : {
      ...breakOpts,
      lastLineMinWidth: paragraphMinWidth
    };
    const paragraphBuildOpts = paragraphMinWidth === lastLineMinWidth ? buildOpts : {
      ...buildOpts,
      lastLineMinWidth: paragraphMinWidth
    };
    const result = breakParagraph(state.para, widths, paragraphBreakOpts);
    const lines = layoutLines(state.para, result, widths, paragraphBuildOpts);
    if (lines.length === 1) {
      const line = lines[0];
      const adjusted = Math.abs(line.glueRatio) > 1e-9 || Math.abs(line.trackRatio) > 1e-9 || Math.abs(line.fontStretch - 100) > 1e-9;
      const reachedFullWidth = paragraphMinWidth === 1 && (result.endingMinWidth ?? paragraphMinWidth) >= 1 - 1e-9 && line.overfull !== true && adjusted;
      if (!reachedFullWidth) {
        pendingWidths.delete(p);
        pendingCorrections.delete(p);
        hiddenCorrections.delete(p);
        return {
          changed: restoreManagedOutput(p, state),
          pending: null
        };
      }
    }
    const rendered = buildRenderSegments(state.scan, state.runsMetrics, state.para, lines);
    const fingerprint = result.breakpoints.join(",") + "|" + lines.map(l => `${l.glueRatio.toFixed(4)}:${l.fontStretch}`).join(",");
    if (fingerprint === state.lastPatch) return {
      changed: false,
      pending: null
    };
    state.lastPatch = fingerprint;
    if (!state.enhanced) {
      state.original.append(...p.childNodes);
      state.enhanced = true;
      p.setAttribute("data-justif", "");
      disableTextAutosizing(p);
      p.style.textAlign = state.scan.direction === "rtl" ? "right" : "left";
      p.style.setProperty("hanging-punctuation", "none");
    }
    if (state.scan.pinIntrinsicSize && state.scan.lineHeightPx !== null) {
      p.style.containIntrinsicBlockSize = `auto ${Math.round(lines.length * state.scan.lineHeightPx * 1e3) / 1e3}px`;
    }
    pendingCorrections.delete(p);
    hiddenCorrections.delete(p);
    return {
      changed: true,
      pending: writeParagraph(p, rendered, lines.map(l => l.width))
    };
  };
  const flushPatches = batch => {
    if (batch.length === 0) return;
    const measure = [];
    for (const e of batch) {
      if (viewObserver === null || nearViewport.has(e.p)) measure.push(e);else if (e.p.isConnected) hiddenCorrections.set(e.p, e.pending);
    }
    if (measure.length > 0) {
      const _measureCorrections = measureCorrections(measure.map(e => e.pending)),
        corrections = _measureCorrections.corrections,
        hidden = _measureCorrections.hidden;
      applyCorrections(corrections);
      for (const i of hidden) {
        const e = measure[i];
        hiddenCorrections.set(e.p, e.pending);
      }
    }
  };
  const commit = scannable2 => {
    collectDomMeasurements(() => {
      for (const p of scannable2) {
        const scan = scanned.get(p);
        if (scan === void 0) continue;
        if (!scan.specs.some(requiresDomMeasurement)) continue;
        try {
          const specByKey = new Map(scan.specs.map(spec => [spec.key, spec]));
          const runsMetrics = buildRunMetrics(scan, expansion, spacing, protrusionCtx);
          buildPara(scan, runsMetrics, specByKey);
        } catch {}
      }
    });
    const batch = [];
    const changed = [];
    for (const p of scannable2) {
      if (!prepare(p)) continue;
      const outcome = safePatch(p);
      if (outcome.pending !== null) batch.push({
        p,
        pending: outcome.pending
      });
      if (outcome.changed) changed.push(p);
    }
    flushPatches(batch);
    for (const p of changed) emitRelayout(p);
  };
  let fontProbes = [];
  let fontsConverged = false;
  const reprobeBaselines = () => {
    for (const f of fontProbes) {
      f.baseline = probeAdvance(f.font, f.sample);
      f.kernBaseline = probeAdvance(f.font, f.kernSample);
    }
  };
  const probesChanged = () => fontProbes.some(f => Math.abs(probeAdvance(f.font, f.sample) - f.baseline) > 0.01 || Math.abs(probeAdvance(f.font, f.kernSample) - f.kernBaseline) > 0.01);
  const remeasureAll = () => {
    if (destroyed) return;
    clearMeasureCache();
    clearCalibrationCache();
    reprobeBaselines();
    const mine = paragraphs.filter(p => states.get(p)?.owner === owner);
    const widths = new Map(mine.map(p => [p, contentWidthOf(p)]));
    collectDomMeasurements(() => {
      for (const p of mine) {
        const state = states.get(p);
        if (!state.scan.specs.some(requiresDomMeasurement)) continue;
        try {
          const runsMetrics = buildRunMetrics(state.scan, expansion, spacing, protrusionCtx);
          buildPara(state.scan, runsMetrics, state.specByKey);
        } catch {}
      }
    });
    const batch = [];
    const changed = [];
    for (const p of mine) {
      const state = states.get(p);
      state.runsMetrics = buildRunMetrics(state.scan, expansion, spacing, protrusionCtx);
      state.para = buildPara(state.scan, state.runsMetrics, state.specByKey);
      state.width = widths.get(p);
      state.lastPatch = "";
      const outcome = safePatch(p);
      if (outcome.pending !== null) batch.push({
        p,
        pending: outcome.pending
      });
      if (outcome.changed) changed.push(p);
    }
    flushPatches(batch);
    for (const p of changed) emitRelayout(p);
  };
  const pendingWidths = /* @__PURE__ */new Map();
  const pendingCorrections = /* @__PURE__ */new Map();
  const hiddenCorrections = /* @__PURE__ */new Map();
  let pendingOrder = [];
  let pendingCursor = 0;
  let sliceQueued = false;
  const SLICE_BUDGET_MS = 10;
  const CORRECTION_CHUNK = 100;
  const nearViewport = /* @__PURE__ */new Set();
  const viewObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
    let promoted = false;
    for (const e of entries) {
      if (e.isIntersecting) {
        nearViewport.add(e.target);
        if (promoteParked(e.target)) promoted = true;
      } else {
        nearViewport.delete(e.target);
        if (!e.target.isConnected) {
          const t = e.target;
          hiddenCorrections.delete(t);
          pendingCorrections.delete(t);
          pendingWidths.delete(t);
        }
      }
    }
    if (promoted) scheduleSlice();
  }, {
    rootMargin: "50%"
  });
  const revealObserver = typeof IntersectionObserver === "undefined" ? null : new IntersectionObserver(entries => {
    let revealed = false;
    for (const e of entries) {
      if (e.isIntersecting && promoteParked(e.target)) revealed = true;
    }
    if (revealed) scheduleSlice();
  });
  const promoteParked = el => {
    const parked = hiddenCorrections.get(el);
    if (parked === void 0) return false;
    hiddenCorrections.delete(el);
    const s = states.get(el);
    if (s === void 0 || s.owner !== owner || !s.enhanced) return false;
    pendingCorrections.set(el, parked);
    return true;
  };
  const scheduleSlice = () => {
    if (sliceQueued) return;
    sliceQueued = true;
    requestAnimationFrame(drainPending);
  };
  const visibleFirst = els => {
    if (els.length > 1 && viewObserver !== null) {
      els.sort((a, b) => Number(!nearViewport.has(a)) - Number(!nearViewport.has(b)));
    }
    return els;
  };
  const drainPending = () => {
    sliceQueued = false;
    if (destroyed) {
      pendingWidths.clear();
      pendingCorrections.clear();
      hiddenCorrections.clear();
      pendingOrder = [];
      return;
    }
    const start = performance.now();
    let anchor = null;
    let anchorTop = 0;
    if (pendingCursor < pendingOrder.length) {
      let above = null;
      let below = null;
      for (const p of paragraphs) {
        if (!nearViewport.has(p)) continue;
        const top = p.getBoundingClientRect().top;
        if (top >= 0 && top < window.innerHeight) {
          anchor = p;
          anchorTop = top;
          break;
        }
        if (top < 0) above = p;else below ?? (below = p);
      }
      if (anchor === null) {
        anchor = above ?? below;
        if (anchor !== null) anchorTop = anchor.getBoundingClientRect().top;
      }
    }
    let wrote = false;
    while (pendingCursor < pendingOrder.length) {
      if (wrote && performance.now() - start > SLICE_BUDGET_MS) break;
      const el = pendingOrder[pendingCursor++];
      const width = pendingWidths.get(el);
      if (width === void 0) continue;
      pendingWidths.delete(el);
      const state = states.get(el);
      if (state === void 0 || state.owner !== owner) continue;
      if (Math.abs(width - state.width) < 0.05) continue;
      state.width = width;
      const outcome = safePatch(el);
      if (outcome.changed) {
        if (outcome.pending !== null) pendingCorrections.set(el, outcome.pending);
        wrote = true;
        emitRelayout(el);
        if (destroyed) return;
      }
    }
    if (wrote && anchor !== null) {
      const delta = anchor.getBoundingClientRect().top - anchorTop;
      if (Math.abs(delta) > 0.5) window.scrollBy(0, delta);
    }
    if (pendingCursor < pendingOrder.length) {
      scheduleSlice();
      return;
    }
    if (!wrote && pendingCorrections.size > 0) {
      const els = visibleFirst([...pendingCorrections.keys()]);
      const batch = [];
      for (const el of els.slice(0, CORRECTION_CHUNK)) {
        batch.push({
          p: el,
          pending: pendingCorrections.get(el)
        });
        pendingCorrections.delete(el);
      }
      flushPatches(batch);
    }
    if (pendingCorrections.size > 0 || pendingWidths.size > 0) scheduleSlice();
  };
  const onCopy = e => {
    if (e.clipboardData === null) return;
    const sel = document.getSelection();
    if (sel === null || sel.rangeCount === 0 || sel.isCollapsed) return;
    let touches = false;
    let authorNbsp = false;
    for (const p of paragraphs) {
      const state = states.get(p);
      if (state === void 0 || state.owner !== owner || !state.enhanced) continue;
      if (!sel.containsNode(p, true)) continue;
      touches = true;
      if (state.scan.runs.some(r => /[\u00A0\u202F]/.test(r.text))) authorNbsp = true;
    }
    if (!touches) return;
    const clean = v => {
      const noWj = v.replace(/\u2060/g, "");
      return authorNbsp ? noWj : noWj.replace(/\u00A0/g, " ");
    };
    const BLOCKY = /^(?:P|DIV|LI|UL|OL|BLOCKQUOTE|H[1-6]|PRE|TABLE|TR|SECTION|ARTICLE|HEADER|FOOTER|FIGURE|FIGCAPTION)$/;
    const plainOf = node => {
      if (node.nodeType === Node.TEXT_NODE) return node.nodeValue ?? "";
      let out = "";
      for (let c = node.firstChild; c !== null; c = c.nextSibling) out += plainOf(c);
      if (node.nodeType === Node.ELEMENT_NODE) {
        const tag = node.tagName;
        if (tag === "BR") out += "\n";else if (BLOCKY.test(tag)) out += "\n\n";
      }
      return out;
    };
    const html = document.createElement("div");
    let plain = "";
    for (let i = 0; i < sel.rangeCount; i++) {
      const frag = sel.getRangeAt(i).cloneContents();
      const walker = document.createTreeWalker(frag, NodeFilter.SHOW_TEXT);
      for (let n = walker.nextNode(); n !== null; n = walker.nextNode()) {
        n.nodeValue = clean(n.nodeValue ?? "");
      }
      plain += plainOf(frag);
      html.append(frag);
    }
    e.clipboardData.setData("text/plain", plain.replace(/\n+$/, ""));
    e.clipboardData.setData("text/html", html.innerHTML);
    e.preventDefault();
  };
  if (options.cleanClipboard !== false) document.addEventListener("copy", onCopy);
  let observer = null;
  const onFontsLoaded = () => {
    if (probesChanged()) remeasureAll();
  };
  const attachObservers = () => {
    for (const p of paragraphs) {
      const s = states.get(p);
      if (s !== void 0 && s.owner === owner) {
        viewObserver?.observe(p);
        revealObserver?.observe(p);
      }
    }
    if (options.observeResize !== false) {
      observer = createWidthObserver(widths => {
        for (const _ref6 of widths) {
          const el = _ref6[0];
          const width = _ref6[1];
          const state = states.get(el);
          if (state === void 0 || state.owner !== owner) continue;
          if (Math.abs(width - state.width) < 0.05) {
            pendingWidths.delete(el);
            continue;
          }
          pendingWidths.set(el, width);
        }
        if (pendingWidths.size > 0) {
          pendingOrder = visibleFirst([...pendingWidths.keys()]);
          pendingCursor = 0;
          if (!sliceQueued) drainPending();
        }
      });
      for (const p of paragraphs) {
        const s = states.get(p);
        if (s !== void 0 && s.owner === owner) observer.observe(p);
      }
    }
    document.fonts.addEventListener("loadingdone", onFontsLoaded);
  };
  const restoreScanStyles = disableTextAutosizingForScan();
  let scannable;
  try {
    scannable = paragraphs.filter(scanParagraph);
  } finally {
    restoreScanStyles();
  }
  for (const _ref7 of pendingSkips) {
    const p = _ref7.p;
    const reason = _ref7.reason;
    emitSkip(p, reason);
  }
  const KERN_SAMPLE_MAX = 256;
  const fontSample = /* @__PURE__ */new Map();
  for (const p of scannable) {
    const scan = scanned.get(p);
    if (scan === void 0) continue;
    for (const spec of scan.specs) {
      const font = ctxFontOf(spec);
      if (!fontSample.has(font)) fontSample.set(font, {
        chars: /* @__PURE__ */new Set(),
        kern: ""
      });
    }
    for (const run of scan.runs) {
      const s = fontSample.get(ctxFontOf(scan.specs[run.spec]));
      for (const ch of run.text) s.chars.add(ch);
      if (s.kern.length < KERN_SAMPLE_MAX) {
        s.kern += run.text.slice(0, KERN_SAMPLE_MAX - s.kern.length);
      }
      if (hyphenate !== void 0 || run.text.includes("\xAD")) s.chars.add("-");
    }
  }
  fontProbes = [...fontSample].map(_ref8 => {
    let font = _ref8[0],
      s = _ref8[1];
    return {
      font,
      sample: s.chars.size === 0 ? " " : [...s.chars].join(""),
      kernSample: s.kern,
      baseline: 0,
      kernBaseline: 0
    };
  });
  let ready;
  try {
    commit(scannable);
    reprobeBaselines();
    attachObservers();
    if (fontProbes.length === 0) {
      fontsConverged = true;
      ready = Promise.resolve();
    } else {
      ready = Promise.all(fontProbes.map(f => document.fonts.load(f.font, f.sample + f.kernSample).catch(() => {}))).then(() => {
        fontsConverged = true;
        if (!destroyed) onFontsLoaded();
      });
    }
  } catch (error) {
    ready = Promise.reject(error instanceof Error ? error : new Error(String(error)));
  }
  ready.catch(() => {});
  return {
    ready,
    paragraphs,
    refresh: remeasureAll,
    destroy() {
      destroyed = true;
      if (!fontsConverged) {
        clearMeasureCache();
        clearCalibrationCache();
      }
      pendingWidths.clear();
      pendingCorrections.clear();
      hiddenCorrections.clear();
      pendingOrder = [];
      document.removeEventListener("copy", onCopy);
      document.fonts.removeEventListener("loadingdone", onFontsLoaded);
      viewObserver?.disconnect();
      revealObserver?.disconnect();
      observer?.disconnect();
      observer = null;
      for (const p of paragraphs) {
        if (states.get(p)?.owner === owner) restore(p);
      }
    }
  };
}
function unjustify(targets) {
  for (const el of targets instanceof Element ? [targets] : targets) {
    if (el instanceof HTMLElement) restore(el);
  }
}
function restore(p) {
  const state = states.get(p);
  if (state === void 0) return;
  restoreManagedOutput(p, state);
  states.delete(p);
}
export { justify, unjustify };
//# sourceMappingURL=index.js.map
//# sourceMappingURL=index.js.map