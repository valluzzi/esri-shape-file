"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var iconv = require('iconv-lite');
var _require = require('string_decoder'),
  StringDecoder = _require.StringDecoder;
var _require2 = require('./filesystem'),
  forceext = _require2.forceext;
var _require3 = require('./http'),
  fetchText = _require3.fetchText,
  fetchRange = _require3.fetchRange;

/**
 * createDecoder
 */
var createDecoder = function createDecoder(encoding) {
  var decoder = function decoder(buffer) {
    var out = iconv.decode(buffer, encoding);
    return out.replace(/\0/g, '').trim();
  };
  var defaultDecoder = function defaultDecoder(data) {
    var decoder = new StringDecoder();
    var out = decoder.write(data) + decoder.end();
    return out.replace(/\0/g, '').trim();
  };
  if (!encoding) {
    return defaultDecoder;
  }
  if (!iconv.encodingExists(encoding)) {
    if (encoding.length > 5 && iconv.encodingExists(encoding.slice(5))) {
      encoding = encoding.slice(5);
    } else {
      return defaultDecoder;
    }
  }
  return decoder;
};

/**
 * dbfHeader
 * @param {*} buffer 
 * @param {*} decoder 
 * @returns 
 */
var dbfHeader = function dbfHeader(buffer, encoding) {
  var header = {
    lastUpdated: new Date(buffer.readUInt8(1) + 1900, buffer.readUInt8(2) + 1, buffer.readUInt8(3)),
    records: buffer.readUInt32LE(4),
    headerLen: buffer.readUInt16LE(8),
    recLen: buffer.readUInt16LE(10),
    fields: [],
    decoder: createDecoder(encoding)
  };
  var offset = 32;
  while (offset < header.headerLen - 1) {
    header.fields.push({
      name: header.decoder(buffer.slice(offset, offset + 11)),
      dtype: String.fromCharCode(buffer.readUInt8(offset + 11)),
      width: buffer.readUInt8(offset + 16),
      precision: buffer.readUInt8(offset + 17)
    });
    if (buffer.readUInt8(offset + 32) === 13) {
      break;
    } else {
      offset += 32;
    }
  }
  return header;
};

/**
 * parseValue
 */
var parseValue = function parseValue(buffer, offset, length, dtype, decoder) {
  var data = buffer.slice(offset, offset + length);
  var textData = decoder(data);
  switch (dtype) {
    case 'N':
    case 'F':
    case 'O':
      return parseFloat(textData, 10);
    case 'D':
      return new Date(textData.slice(0, 4), parseInt(textData.slice(4, 6), 10) - 1, textData.slice(6, 8));
    case 'L':
      return textData.toLowerCase() === 'y' || textData.toLowerCase() === 't';
    default:
      return textData;
  }
};

/**
 * parseRow
 */
var parseRow = function parseRow(buffer, offset, rowHeaders, decoder) {
  var record = {};
  var _iterator = _createForOfIteratorHelper(rowHeaders),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var header = _step.value;
      var fieldValue = parseValue(buffer, offset, header.width, header.dtype, decoder);
      offset += header.width;
      if (typeof fieldValue !== 'undefined') {
        record[header.name] = fieldValue;
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
  return record;
};
var __CACHE__ = {};

/**
 * readHeader
 */
var readHeader = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(fileshp) {
    var filecpg, filedbf, encoding, buffer, header;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          if (__CACHE__[fileshp]) {
            _context.next = 14;
            break;
          }
          __CACHE__[fileshp] = true;
          filecpg = forceext(fileshp, 'cpg');
          filedbf = forceext(fileshp, 'dbf'); //let encoding = await fetch(filecpg).then(res => res.text()).then(text => text.trim());
          _context.next = 6;
          return fetchText(filecpg).then(function (text) {
            return text.trim();
          });
        case 6:
          encoding = _context.sent;
          console.log("encoding:", encoding);
          encoding = encoding || 'utf-8';
          _context.next = 11;
          return fetchRange(filedbf, [0, 1023]);
        case 11:
          buffer = _context.sent;
          header = dbfHeader(buffer, encoding);
          __CACHE__[fileshp] = header;
        case 14:
          return _context.abrupt("return", __CACHE__[fileshp]);
        case 15:
        case "end":
          return _context.stop();
      }
    }, _callee);
  }));
  return function readHeader(_x) {
    return _ref.apply(this, arguments);
  };
}();

/**
 * readDbf
 */
var readDbf = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(fileshp) {
    var filecpg, encoding, filedbf, buffer, header, offset, reccount, out, j, record;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          filecpg = forceext(fileshp, 'cpg');
          _context2.next = 3;
          return fetchText(filecpg).then(function (text) {
            return text.trim();
          });
        case 3:
          encoding = _context2.sent;
          encoding = encoding || 'utf-8';
          filedbf = forceext(fileshp, 'dbf');
          _context2.next = 8;
          return fetchRange(filedbf);
        case 8:
          buffer = _context2.sent;
          header = dbfHeader(buffer, encoding);
          console.log(header);
          offset = (header.fields.length + 1 << 5) + 2;
          reccount = header.records; // just for debug
          reccount = 3;
          console.log("offset:", offset);
          out = [];
          for (j = 0; j < reccount; j++) {
            record = parseRow(buffer, offset, header.fields, header.decoder);
            out.push(record);
            offset += header.recLen;
          }
          return _context2.abrupt("return", out);
        case 18:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return function readDbf(_x2) {
    return _ref2.apply(this, arguments);
  };
}();
var readRecord = /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(fileshp, fid) {
    var filedbf, header, offset, buffer;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          fid = fid || 0;
          filedbf = forceext(fileshp, 'dbf');
          _context3.next = 4;
          return readHeader(fileshp);
        case 4:
          header = _context3.sent;
          offset = (header.fields.length + 1 << 5) + 2;
          offset += fid * header.recLen;
          _context3.next = 9;
          return fetchRange(filedbf, [offset, offset + header.recLen - 1]);
        case 9:
          buffer = _context3.sent;
          return _context3.abrupt("return", parseRow(buffer, 0, header.fields, header.decoder));
        case 11:
        case "end":
          return _context3.stop();
      }
    }, _callee3);
  }));
  return function readRecord(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
}();
module.exports = {
  readDbf: readDbf,
  readRecord: readRecord
};