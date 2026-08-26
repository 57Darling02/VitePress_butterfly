/* Obsidian plugin: VitePress Butterfly */
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
  }
});

// node_modules/.pnpm/tweetnacl@1.0.3/node_modules/tweetnacl/nacl-fast.js
var require_nacl_fast = __commonJS({
  "node_modules/.pnpm/tweetnacl@1.0.3/node_modules/tweetnacl/nacl-fast.js"(exports, module2) {
    (function(nacl2) {
      "use strict";
      var gf = function(init) {
        var i, r = new Float64Array(16);
        if (init) for (i = 0; i < init.length; i++) r[i] = init[i];
        return r;
      };
      var randombytes = function() {
        throw new Error("no PRNG");
      };
      var _0 = new Uint8Array(16);
      var _9 = new Uint8Array(32);
      _9[0] = 9;
      var gf0 = gf(), gf1 = gf([1]), _121665 = gf([56129, 1]), D = gf([30883, 4953, 19914, 30187, 55467, 16705, 2637, 112, 59544, 30585, 16505, 36039, 65139, 11119, 27886, 20995]), D2 = gf([61785, 9906, 39828, 60374, 45398, 33411, 5274, 224, 53552, 61171, 33010, 6542, 64743, 22239, 55772, 9222]), X = gf([54554, 36645, 11616, 51542, 42930, 38181, 51040, 26924, 56412, 64982, 57905, 49316, 21502, 52590, 14035, 8553]), Y = gf([26200, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214, 26214]), I = gf([41136, 18958, 6951, 50414, 58488, 44335, 6150, 12099, 55207, 15867, 153, 11085, 57099, 20417, 9344, 11139]);
      function ts64(x, i, h, l) {
        x[i] = h >> 24 & 255;
        x[i + 1] = h >> 16 & 255;
        x[i + 2] = h >> 8 & 255;
        x[i + 3] = h & 255;
        x[i + 4] = l >> 24 & 255;
        x[i + 5] = l >> 16 & 255;
        x[i + 6] = l >> 8 & 255;
        x[i + 7] = l & 255;
      }
      function vn(x, xi, y, yi, n) {
        var i, d = 0;
        for (i = 0; i < n; i++) d |= x[xi + i] ^ y[yi + i];
        return (1 & d - 1 >>> 8) - 1;
      }
      function crypto_verify_16(x, xi, y, yi) {
        return vn(x, xi, y, yi, 16);
      }
      function crypto_verify_32(x, xi, y, yi) {
        return vn(x, xi, y, yi, 32);
      }
      function core_salsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        x0 = x0 + j0 | 0;
        x1 = x1 + j1 | 0;
        x2 = x2 + j2 | 0;
        x3 = x3 + j3 | 0;
        x4 = x4 + j4 | 0;
        x5 = x5 + j5 | 0;
        x6 = x6 + j6 | 0;
        x7 = x7 + j7 | 0;
        x8 = x8 + j8 | 0;
        x9 = x9 + j9 | 0;
        x10 = x10 + j10 | 0;
        x11 = x11 + j11 | 0;
        x12 = x12 + j12 | 0;
        x13 = x13 + j13 | 0;
        x14 = x14 + j14 | 0;
        x15 = x15 + j15 | 0;
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x1 >>> 0 & 255;
        o[5] = x1 >>> 8 & 255;
        o[6] = x1 >>> 16 & 255;
        o[7] = x1 >>> 24 & 255;
        o[8] = x2 >>> 0 & 255;
        o[9] = x2 >>> 8 & 255;
        o[10] = x2 >>> 16 & 255;
        o[11] = x2 >>> 24 & 255;
        o[12] = x3 >>> 0 & 255;
        o[13] = x3 >>> 8 & 255;
        o[14] = x3 >>> 16 & 255;
        o[15] = x3 >>> 24 & 255;
        o[16] = x4 >>> 0 & 255;
        o[17] = x4 >>> 8 & 255;
        o[18] = x4 >>> 16 & 255;
        o[19] = x4 >>> 24 & 255;
        o[20] = x5 >>> 0 & 255;
        o[21] = x5 >>> 8 & 255;
        o[22] = x5 >>> 16 & 255;
        o[23] = x5 >>> 24 & 255;
        o[24] = x6 >>> 0 & 255;
        o[25] = x6 >>> 8 & 255;
        o[26] = x6 >>> 16 & 255;
        o[27] = x6 >>> 24 & 255;
        o[28] = x7 >>> 0 & 255;
        o[29] = x7 >>> 8 & 255;
        o[30] = x7 >>> 16 & 255;
        o[31] = x7 >>> 24 & 255;
        o[32] = x8 >>> 0 & 255;
        o[33] = x8 >>> 8 & 255;
        o[34] = x8 >>> 16 & 255;
        o[35] = x8 >>> 24 & 255;
        o[36] = x9 >>> 0 & 255;
        o[37] = x9 >>> 8 & 255;
        o[38] = x9 >>> 16 & 255;
        o[39] = x9 >>> 24 & 255;
        o[40] = x10 >>> 0 & 255;
        o[41] = x10 >>> 8 & 255;
        o[42] = x10 >>> 16 & 255;
        o[43] = x10 >>> 24 & 255;
        o[44] = x11 >>> 0 & 255;
        o[45] = x11 >>> 8 & 255;
        o[46] = x11 >>> 16 & 255;
        o[47] = x11 >>> 24 & 255;
        o[48] = x12 >>> 0 & 255;
        o[49] = x12 >>> 8 & 255;
        o[50] = x12 >>> 16 & 255;
        o[51] = x12 >>> 24 & 255;
        o[52] = x13 >>> 0 & 255;
        o[53] = x13 >>> 8 & 255;
        o[54] = x13 >>> 16 & 255;
        o[55] = x13 >>> 24 & 255;
        o[56] = x14 >>> 0 & 255;
        o[57] = x14 >>> 8 & 255;
        o[58] = x14 >>> 16 & 255;
        o[59] = x14 >>> 24 & 255;
        o[60] = x15 >>> 0 & 255;
        o[61] = x15 >>> 8 & 255;
        o[62] = x15 >>> 16 & 255;
        o[63] = x15 >>> 24 & 255;
      }
      function core_hsalsa20(o, p, k, c) {
        var j0 = c[0] & 255 | (c[1] & 255) << 8 | (c[2] & 255) << 16 | (c[3] & 255) << 24, j1 = k[0] & 255 | (k[1] & 255) << 8 | (k[2] & 255) << 16 | (k[3] & 255) << 24, j2 = k[4] & 255 | (k[5] & 255) << 8 | (k[6] & 255) << 16 | (k[7] & 255) << 24, j3 = k[8] & 255 | (k[9] & 255) << 8 | (k[10] & 255) << 16 | (k[11] & 255) << 24, j4 = k[12] & 255 | (k[13] & 255) << 8 | (k[14] & 255) << 16 | (k[15] & 255) << 24, j5 = c[4] & 255 | (c[5] & 255) << 8 | (c[6] & 255) << 16 | (c[7] & 255) << 24, j6 = p[0] & 255 | (p[1] & 255) << 8 | (p[2] & 255) << 16 | (p[3] & 255) << 24, j7 = p[4] & 255 | (p[5] & 255) << 8 | (p[6] & 255) << 16 | (p[7] & 255) << 24, j8 = p[8] & 255 | (p[9] & 255) << 8 | (p[10] & 255) << 16 | (p[11] & 255) << 24, j9 = p[12] & 255 | (p[13] & 255) << 8 | (p[14] & 255) << 16 | (p[15] & 255) << 24, j10 = c[8] & 255 | (c[9] & 255) << 8 | (c[10] & 255) << 16 | (c[11] & 255) << 24, j11 = k[16] & 255 | (k[17] & 255) << 8 | (k[18] & 255) << 16 | (k[19] & 255) << 24, j12 = k[20] & 255 | (k[21] & 255) << 8 | (k[22] & 255) << 16 | (k[23] & 255) << 24, j13 = k[24] & 255 | (k[25] & 255) << 8 | (k[26] & 255) << 16 | (k[27] & 255) << 24, j14 = k[28] & 255 | (k[29] & 255) << 8 | (k[30] & 255) << 16 | (k[31] & 255) << 24, j15 = c[12] & 255 | (c[13] & 255) << 8 | (c[14] & 255) << 16 | (c[15] & 255) << 24;
        var x0 = j0, x1 = j1, x2 = j2, x3 = j3, x4 = j4, x5 = j5, x6 = j6, x7 = j7, x8 = j8, x9 = j9, x10 = j10, x11 = j11, x12 = j12, x13 = j13, x14 = j14, x15 = j15, u;
        for (var i = 0; i < 20; i += 2) {
          u = x0 + x12 | 0;
          x4 ^= u << 7 | u >>> 32 - 7;
          u = x4 + x0 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x4 | 0;
          x12 ^= u << 13 | u >>> 32 - 13;
          u = x12 + x8 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x1 | 0;
          x9 ^= u << 7 | u >>> 32 - 7;
          u = x9 + x5 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x9 | 0;
          x1 ^= u << 13 | u >>> 32 - 13;
          u = x1 + x13 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x6 | 0;
          x14 ^= u << 7 | u >>> 32 - 7;
          u = x14 + x10 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x14 | 0;
          x6 ^= u << 13 | u >>> 32 - 13;
          u = x6 + x2 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x11 | 0;
          x3 ^= u << 7 | u >>> 32 - 7;
          u = x3 + x15 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x3 | 0;
          x11 ^= u << 13 | u >>> 32 - 13;
          u = x11 + x7 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
          u = x0 + x3 | 0;
          x1 ^= u << 7 | u >>> 32 - 7;
          u = x1 + x0 | 0;
          x2 ^= u << 9 | u >>> 32 - 9;
          u = x2 + x1 | 0;
          x3 ^= u << 13 | u >>> 32 - 13;
          u = x3 + x2 | 0;
          x0 ^= u << 18 | u >>> 32 - 18;
          u = x5 + x4 | 0;
          x6 ^= u << 7 | u >>> 32 - 7;
          u = x6 + x5 | 0;
          x7 ^= u << 9 | u >>> 32 - 9;
          u = x7 + x6 | 0;
          x4 ^= u << 13 | u >>> 32 - 13;
          u = x4 + x7 | 0;
          x5 ^= u << 18 | u >>> 32 - 18;
          u = x10 + x9 | 0;
          x11 ^= u << 7 | u >>> 32 - 7;
          u = x11 + x10 | 0;
          x8 ^= u << 9 | u >>> 32 - 9;
          u = x8 + x11 | 0;
          x9 ^= u << 13 | u >>> 32 - 13;
          u = x9 + x8 | 0;
          x10 ^= u << 18 | u >>> 32 - 18;
          u = x15 + x14 | 0;
          x12 ^= u << 7 | u >>> 32 - 7;
          u = x12 + x15 | 0;
          x13 ^= u << 9 | u >>> 32 - 9;
          u = x13 + x12 | 0;
          x14 ^= u << 13 | u >>> 32 - 13;
          u = x14 + x13 | 0;
          x15 ^= u << 18 | u >>> 32 - 18;
        }
        o[0] = x0 >>> 0 & 255;
        o[1] = x0 >>> 8 & 255;
        o[2] = x0 >>> 16 & 255;
        o[3] = x0 >>> 24 & 255;
        o[4] = x5 >>> 0 & 255;
        o[5] = x5 >>> 8 & 255;
        o[6] = x5 >>> 16 & 255;
        o[7] = x5 >>> 24 & 255;
        o[8] = x10 >>> 0 & 255;
        o[9] = x10 >>> 8 & 255;
        o[10] = x10 >>> 16 & 255;
        o[11] = x10 >>> 24 & 255;
        o[12] = x15 >>> 0 & 255;
        o[13] = x15 >>> 8 & 255;
        o[14] = x15 >>> 16 & 255;
        o[15] = x15 >>> 24 & 255;
        o[16] = x6 >>> 0 & 255;
        o[17] = x6 >>> 8 & 255;
        o[18] = x6 >>> 16 & 255;
        o[19] = x6 >>> 24 & 255;
        o[20] = x7 >>> 0 & 255;
        o[21] = x7 >>> 8 & 255;
        o[22] = x7 >>> 16 & 255;
        o[23] = x7 >>> 24 & 255;
        o[24] = x8 >>> 0 & 255;
        o[25] = x8 >>> 8 & 255;
        o[26] = x8 >>> 16 & 255;
        o[27] = x8 >>> 24 & 255;
        o[28] = x9 >>> 0 & 255;
        o[29] = x9 >>> 8 & 255;
        o[30] = x9 >>> 16 & 255;
        o[31] = x9 >>> 24 & 255;
      }
      function crypto_core_salsa20(out, inp, k, c) {
        core_salsa20(out, inp, k, c);
      }
      function crypto_core_hsalsa20(out, inp, k, c) {
        core_hsalsa20(out, inp, k, c);
      }
      var sigma = new Uint8Array([101, 120, 112, 97, 110, 100, 32, 51, 50, 45, 98, 121, 116, 101, 32, 107]);
      function crypto_stream_salsa20_xor(c, cpos, m, mpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++) z[i] = 0;
        for (i = 0; i < 8; i++) z[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < 64; i++) c[cpos + i] = m[mpos + i] ^ x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z[i] & 255) | 0;
            z[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
          mpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < b; i++) c[cpos + i] = m[mpos + i] ^ x[i];
        }
        return 0;
      }
      function crypto_stream_salsa20(c, cpos, b, n, k) {
        var z = new Uint8Array(16), x = new Uint8Array(64);
        var u, i;
        for (i = 0; i < 16; i++) z[i] = 0;
        for (i = 0; i < 8; i++) z[i] = n[i];
        while (b >= 64) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < 64; i++) c[cpos + i] = x[i];
          u = 1;
          for (i = 8; i < 16; i++) {
            u = u + (z[i] & 255) | 0;
            z[i] = u & 255;
            u >>>= 8;
          }
          b -= 64;
          cpos += 64;
        }
        if (b > 0) {
          crypto_core_salsa20(x, z, k, sigma);
          for (i = 0; i < b; i++) c[cpos + i] = x[i];
        }
        return 0;
      }
      function crypto_stream(c, cpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
        return crypto_stream_salsa20(c, cpos, d, sn, s);
      }
      function crypto_stream_xor(c, cpos, m, mpos, d, n, k) {
        var s = new Uint8Array(32);
        crypto_core_hsalsa20(s, n, k, sigma);
        var sn = new Uint8Array(8);
        for (var i = 0; i < 8; i++) sn[i] = n[i + 16];
        return crypto_stream_salsa20_xor(c, cpos, m, mpos, d, sn, s);
      }
      var poly1305 = function(key) {
        this.buffer = new Uint8Array(16);
        this.r = new Uint16Array(10);
        this.h = new Uint16Array(10);
        this.pad = new Uint16Array(8);
        this.leftover = 0;
        this.fin = 0;
        var t0, t1, t2, t3, t4, t5, t6, t7;
        t0 = key[0] & 255 | (key[1] & 255) << 8;
        this.r[0] = t0 & 8191;
        t1 = key[2] & 255 | (key[3] & 255) << 8;
        this.r[1] = (t0 >>> 13 | t1 << 3) & 8191;
        t2 = key[4] & 255 | (key[5] & 255) << 8;
        this.r[2] = (t1 >>> 10 | t2 << 6) & 7939;
        t3 = key[6] & 255 | (key[7] & 255) << 8;
        this.r[3] = (t2 >>> 7 | t3 << 9) & 8191;
        t4 = key[8] & 255 | (key[9] & 255) << 8;
        this.r[4] = (t3 >>> 4 | t4 << 12) & 255;
        this.r[5] = t4 >>> 1 & 8190;
        t5 = key[10] & 255 | (key[11] & 255) << 8;
        this.r[6] = (t4 >>> 14 | t5 << 2) & 8191;
        t6 = key[12] & 255 | (key[13] & 255) << 8;
        this.r[7] = (t5 >>> 11 | t6 << 5) & 8065;
        t7 = key[14] & 255 | (key[15] & 255) << 8;
        this.r[8] = (t6 >>> 8 | t7 << 8) & 8191;
        this.r[9] = t7 >>> 5 & 127;
        this.pad[0] = key[16] & 255 | (key[17] & 255) << 8;
        this.pad[1] = key[18] & 255 | (key[19] & 255) << 8;
        this.pad[2] = key[20] & 255 | (key[21] & 255) << 8;
        this.pad[3] = key[22] & 255 | (key[23] & 255) << 8;
        this.pad[4] = key[24] & 255 | (key[25] & 255) << 8;
        this.pad[5] = key[26] & 255 | (key[27] & 255) << 8;
        this.pad[6] = key[28] & 255 | (key[29] & 255) << 8;
        this.pad[7] = key[30] & 255 | (key[31] & 255) << 8;
      };
      poly1305.prototype.blocks = function(m, mpos, bytes) {
        var hibit = this.fin ? 0 : 1 << 11;
        var t0, t1, t2, t3, t4, t5, t6, t7, c;
        var d0, d1, d2, d3, d4, d5, d6, d7, d8, d9;
        var h0 = this.h[0], h1 = this.h[1], h2 = this.h[2], h3 = this.h[3], h4 = this.h[4], h5 = this.h[5], h6 = this.h[6], h7 = this.h[7], h8 = this.h[8], h9 = this.h[9];
        var r0 = this.r[0], r1 = this.r[1], r2 = this.r[2], r3 = this.r[3], r4 = this.r[4], r5 = this.r[5], r6 = this.r[6], r7 = this.r[7], r8 = this.r[8], r9 = this.r[9];
        while (bytes >= 16) {
          t0 = m[mpos + 0] & 255 | (m[mpos + 1] & 255) << 8;
          h0 += t0 & 8191;
          t1 = m[mpos + 2] & 255 | (m[mpos + 3] & 255) << 8;
          h1 += (t0 >>> 13 | t1 << 3) & 8191;
          t2 = m[mpos + 4] & 255 | (m[mpos + 5] & 255) << 8;
          h2 += (t1 >>> 10 | t2 << 6) & 8191;
          t3 = m[mpos + 6] & 255 | (m[mpos + 7] & 255) << 8;
          h3 += (t2 >>> 7 | t3 << 9) & 8191;
          t4 = m[mpos + 8] & 255 | (m[mpos + 9] & 255) << 8;
          h4 += (t3 >>> 4 | t4 << 12) & 8191;
          h5 += t4 >>> 1 & 8191;
          t5 = m[mpos + 10] & 255 | (m[mpos + 11] & 255) << 8;
          h6 += (t4 >>> 14 | t5 << 2) & 8191;
          t6 = m[mpos + 12] & 255 | (m[mpos + 13] & 255) << 8;
          h7 += (t5 >>> 11 | t6 << 5) & 8191;
          t7 = m[mpos + 14] & 255 | (m[mpos + 15] & 255) << 8;
          h8 += (t6 >>> 8 | t7 << 8) & 8191;
          h9 += t7 >>> 5 | hibit;
          c = 0;
          d0 = c;
          d0 += h0 * r0;
          d0 += h1 * (5 * r9);
          d0 += h2 * (5 * r8);
          d0 += h3 * (5 * r7);
          d0 += h4 * (5 * r6);
          c = d0 >>> 13;
          d0 &= 8191;
          d0 += h5 * (5 * r5);
          d0 += h6 * (5 * r4);
          d0 += h7 * (5 * r3);
          d0 += h8 * (5 * r2);
          d0 += h9 * (5 * r1);
          c += d0 >>> 13;
          d0 &= 8191;
          d1 = c;
          d1 += h0 * r1;
          d1 += h1 * r0;
          d1 += h2 * (5 * r9);
          d1 += h3 * (5 * r8);
          d1 += h4 * (5 * r7);
          c = d1 >>> 13;
          d1 &= 8191;
          d1 += h5 * (5 * r6);
          d1 += h6 * (5 * r5);
          d1 += h7 * (5 * r4);
          d1 += h8 * (5 * r3);
          d1 += h9 * (5 * r2);
          c += d1 >>> 13;
          d1 &= 8191;
          d2 = c;
          d2 += h0 * r2;
          d2 += h1 * r1;
          d2 += h2 * r0;
          d2 += h3 * (5 * r9);
          d2 += h4 * (5 * r8);
          c = d2 >>> 13;
          d2 &= 8191;
          d2 += h5 * (5 * r7);
          d2 += h6 * (5 * r6);
          d2 += h7 * (5 * r5);
          d2 += h8 * (5 * r4);
          d2 += h9 * (5 * r3);
          c += d2 >>> 13;
          d2 &= 8191;
          d3 = c;
          d3 += h0 * r3;
          d3 += h1 * r2;
          d3 += h2 * r1;
          d3 += h3 * r0;
          d3 += h4 * (5 * r9);
          c = d3 >>> 13;
          d3 &= 8191;
          d3 += h5 * (5 * r8);
          d3 += h6 * (5 * r7);
          d3 += h7 * (5 * r6);
          d3 += h8 * (5 * r5);
          d3 += h9 * (5 * r4);
          c += d3 >>> 13;
          d3 &= 8191;
          d4 = c;
          d4 += h0 * r4;
          d4 += h1 * r3;
          d4 += h2 * r2;
          d4 += h3 * r1;
          d4 += h4 * r0;
          c = d4 >>> 13;
          d4 &= 8191;
          d4 += h5 * (5 * r9);
          d4 += h6 * (5 * r8);
          d4 += h7 * (5 * r7);
          d4 += h8 * (5 * r6);
          d4 += h9 * (5 * r5);
          c += d4 >>> 13;
          d4 &= 8191;
          d5 = c;
          d5 += h0 * r5;
          d5 += h1 * r4;
          d5 += h2 * r3;
          d5 += h3 * r2;
          d5 += h4 * r1;
          c = d5 >>> 13;
          d5 &= 8191;
          d5 += h5 * r0;
          d5 += h6 * (5 * r9);
          d5 += h7 * (5 * r8);
          d5 += h8 * (5 * r7);
          d5 += h9 * (5 * r6);
          c += d5 >>> 13;
          d5 &= 8191;
          d6 = c;
          d6 += h0 * r6;
          d6 += h1 * r5;
          d6 += h2 * r4;
          d6 += h3 * r3;
          d6 += h4 * r2;
          c = d6 >>> 13;
          d6 &= 8191;
          d6 += h5 * r1;
          d6 += h6 * r0;
          d6 += h7 * (5 * r9);
          d6 += h8 * (5 * r8);
          d6 += h9 * (5 * r7);
          c += d6 >>> 13;
          d6 &= 8191;
          d7 = c;
          d7 += h0 * r7;
          d7 += h1 * r6;
          d7 += h2 * r5;
          d7 += h3 * r4;
          d7 += h4 * r3;
          c = d7 >>> 13;
          d7 &= 8191;
          d7 += h5 * r2;
          d7 += h6 * r1;
          d7 += h7 * r0;
          d7 += h8 * (5 * r9);
          d7 += h9 * (5 * r8);
          c += d7 >>> 13;
          d7 &= 8191;
          d8 = c;
          d8 += h0 * r8;
          d8 += h1 * r7;
          d8 += h2 * r6;
          d8 += h3 * r5;
          d8 += h4 * r4;
          c = d8 >>> 13;
          d8 &= 8191;
          d8 += h5 * r3;
          d8 += h6 * r2;
          d8 += h7 * r1;
          d8 += h8 * r0;
          d8 += h9 * (5 * r9);
          c += d8 >>> 13;
          d8 &= 8191;
          d9 = c;
          d9 += h0 * r9;
          d9 += h1 * r8;
          d9 += h2 * r7;
          d9 += h3 * r6;
          d9 += h4 * r5;
          c = d9 >>> 13;
          d9 &= 8191;
          d9 += h5 * r4;
          d9 += h6 * r3;
          d9 += h7 * r2;
          d9 += h8 * r1;
          d9 += h9 * r0;
          c += d9 >>> 13;
          d9 &= 8191;
          c = (c << 2) + c | 0;
          c = c + d0 | 0;
          d0 = c & 8191;
          c = c >>> 13;
          d1 += c;
          h0 = d0;
          h1 = d1;
          h2 = d2;
          h3 = d3;
          h4 = d4;
          h5 = d5;
          h6 = d6;
          h7 = d7;
          h8 = d8;
          h9 = d9;
          mpos += 16;
          bytes -= 16;
        }
        this.h[0] = h0;
        this.h[1] = h1;
        this.h[2] = h2;
        this.h[3] = h3;
        this.h[4] = h4;
        this.h[5] = h5;
        this.h[6] = h6;
        this.h[7] = h7;
        this.h[8] = h8;
        this.h[9] = h9;
      };
      poly1305.prototype.finish = function(mac, macpos) {
        var g = new Uint16Array(10);
        var c, mask, f, i;
        if (this.leftover) {
          i = this.leftover;
          this.buffer[i++] = 1;
          for (; i < 16; i++) this.buffer[i] = 0;
          this.fin = 1;
          this.blocks(this.buffer, 0, 16);
        }
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        for (i = 2; i < 10; i++) {
          this.h[i] += c;
          c = this.h[i] >>> 13;
          this.h[i] &= 8191;
        }
        this.h[0] += c * 5;
        c = this.h[0] >>> 13;
        this.h[0] &= 8191;
        this.h[1] += c;
        c = this.h[1] >>> 13;
        this.h[1] &= 8191;
        this.h[2] += c;
        g[0] = this.h[0] + 5;
        c = g[0] >>> 13;
        g[0] &= 8191;
        for (i = 1; i < 10; i++) {
          g[i] = this.h[i] + c;
          c = g[i] >>> 13;
          g[i] &= 8191;
        }
        g[9] -= 1 << 13;
        mask = (c ^ 1) - 1;
        for (i = 0; i < 10; i++) g[i] &= mask;
        mask = ~mask;
        for (i = 0; i < 10; i++) this.h[i] = this.h[i] & mask | g[i];
        this.h[0] = (this.h[0] | this.h[1] << 13) & 65535;
        this.h[1] = (this.h[1] >>> 3 | this.h[2] << 10) & 65535;
        this.h[2] = (this.h[2] >>> 6 | this.h[3] << 7) & 65535;
        this.h[3] = (this.h[3] >>> 9 | this.h[4] << 4) & 65535;
        this.h[4] = (this.h[4] >>> 12 | this.h[5] << 1 | this.h[6] << 14) & 65535;
        this.h[5] = (this.h[6] >>> 2 | this.h[7] << 11) & 65535;
        this.h[6] = (this.h[7] >>> 5 | this.h[8] << 8) & 65535;
        this.h[7] = (this.h[8] >>> 8 | this.h[9] << 5) & 65535;
        f = this.h[0] + this.pad[0];
        this.h[0] = f & 65535;
        for (i = 1; i < 8; i++) {
          f = (this.h[i] + this.pad[i] | 0) + (f >>> 16) | 0;
          this.h[i] = f & 65535;
        }
        mac[macpos + 0] = this.h[0] >>> 0 & 255;
        mac[macpos + 1] = this.h[0] >>> 8 & 255;
        mac[macpos + 2] = this.h[1] >>> 0 & 255;
        mac[macpos + 3] = this.h[1] >>> 8 & 255;
        mac[macpos + 4] = this.h[2] >>> 0 & 255;
        mac[macpos + 5] = this.h[2] >>> 8 & 255;
        mac[macpos + 6] = this.h[3] >>> 0 & 255;
        mac[macpos + 7] = this.h[3] >>> 8 & 255;
        mac[macpos + 8] = this.h[4] >>> 0 & 255;
        mac[macpos + 9] = this.h[4] >>> 8 & 255;
        mac[macpos + 10] = this.h[5] >>> 0 & 255;
        mac[macpos + 11] = this.h[5] >>> 8 & 255;
        mac[macpos + 12] = this.h[6] >>> 0 & 255;
        mac[macpos + 13] = this.h[6] >>> 8 & 255;
        mac[macpos + 14] = this.h[7] >>> 0 & 255;
        mac[macpos + 15] = this.h[7] >>> 8 & 255;
      };
      poly1305.prototype.update = function(m, mpos, bytes) {
        var i, want;
        if (this.leftover) {
          want = 16 - this.leftover;
          if (want > bytes)
            want = bytes;
          for (i = 0; i < want; i++)
            this.buffer[this.leftover + i] = m[mpos + i];
          bytes -= want;
          mpos += want;
          this.leftover += want;
          if (this.leftover < 16)
            return;
          this.blocks(this.buffer, 0, 16);
          this.leftover = 0;
        }
        if (bytes >= 16) {
          want = bytes - bytes % 16;
          this.blocks(m, mpos, want);
          mpos += want;
          bytes -= want;
        }
        if (bytes) {
          for (i = 0; i < bytes; i++)
            this.buffer[this.leftover + i] = m[mpos + i];
          this.leftover += bytes;
        }
      };
      function crypto_onetimeauth(out, outpos, m, mpos, n, k) {
        var s = new poly1305(k);
        s.update(m, mpos, n);
        s.finish(out, outpos);
        return 0;
      }
      function crypto_onetimeauth_verify(h, hpos, m, mpos, n, k) {
        var x = new Uint8Array(16);
        crypto_onetimeauth(x, 0, m, mpos, n, k);
        return crypto_verify_16(h, hpos, x, 0);
      }
      function crypto_secretbox(c, m, d, n, k) {
        var i;
        if (d < 32) return -1;
        crypto_stream_xor(c, 0, m, 0, d, n, k);
        crypto_onetimeauth(c, 16, c, 32, d - 32, c);
        for (i = 0; i < 16; i++) c[i] = 0;
        return 0;
      }
      function crypto_secretbox_open(m, c, d, n, k) {
        var i;
        var x = new Uint8Array(32);
        if (d < 32) return -1;
        crypto_stream(x, 0, 32, n, k);
        if (crypto_onetimeauth_verify(c, 16, c, 32, d - 32, x) !== 0) return -1;
        crypto_stream_xor(m, 0, c, 0, d, n, k);
        for (i = 0; i < 32; i++) m[i] = 0;
        return 0;
      }
      function set25519(r, a) {
        var i;
        for (i = 0; i < 16; i++) r[i] = a[i] | 0;
      }
      function car25519(o) {
        var i, v, c = 1;
        for (i = 0; i < 16; i++) {
          v = o[i] + c + 65535;
          c = Math.floor(v / 65536);
          o[i] = v - c * 65536;
        }
        o[0] += c - 1 + 37 * (c - 1);
      }
      function sel25519(p, q, b) {
        var t, c = ~(b - 1);
        for (var i = 0; i < 16; i++) {
          t = c & (p[i] ^ q[i]);
          p[i] ^= t;
          q[i] ^= t;
        }
      }
      function pack25519(o, n) {
        var i, j, b;
        var m = gf(), t = gf();
        for (i = 0; i < 16; i++) t[i] = n[i];
        car25519(t);
        car25519(t);
        car25519(t);
        for (j = 0; j < 2; j++) {
          m[0] = t[0] - 65517;
          for (i = 1; i < 15; i++) {
            m[i] = t[i] - 65535 - (m[i - 1] >> 16 & 1);
            m[i - 1] &= 65535;
          }
          m[15] = t[15] - 32767 - (m[14] >> 16 & 1);
          b = m[15] >> 16 & 1;
          m[14] &= 65535;
          sel25519(t, m, 1 - b);
        }
        for (i = 0; i < 16; i++) {
          o[2 * i] = t[i] & 255;
          o[2 * i + 1] = t[i] >> 8;
        }
      }
      function neq25519(a, b) {
        var c = new Uint8Array(32), d = new Uint8Array(32);
        pack25519(c, a);
        pack25519(d, b);
        return crypto_verify_32(c, 0, d, 0);
      }
      function par25519(a) {
        var d = new Uint8Array(32);
        pack25519(d, a);
        return d[0] & 1;
      }
      function unpack25519(o, n) {
        var i;
        for (i = 0; i < 16; i++) o[i] = n[2 * i] + (n[2 * i + 1] << 8);
        o[15] &= 32767;
      }
      function A(o, a, b) {
        for (var i = 0; i < 16; i++) o[i] = a[i] + b[i];
      }
      function Z(o, a, b) {
        for (var i = 0; i < 16; i++) o[i] = a[i] - b[i];
      }
      function M(o, a, b) {
        var v, c, t0 = 0, t1 = 0, t2 = 0, t3 = 0, t4 = 0, t5 = 0, t6 = 0, t7 = 0, t8 = 0, t9 = 0, t10 = 0, t11 = 0, t12 = 0, t13 = 0, t14 = 0, t15 = 0, t16 = 0, t17 = 0, t18 = 0, t19 = 0, t20 = 0, t21 = 0, t22 = 0, t23 = 0, t24 = 0, t25 = 0, t26 = 0, t27 = 0, t28 = 0, t29 = 0, t30 = 0, b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = b[6], b7 = b[7], b8 = b[8], b9 = b[9], b10 = b[10], b11 = b[11], b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];
        v = a[0];
        t0 += v * b0;
        t1 += v * b1;
        t2 += v * b2;
        t3 += v * b3;
        t4 += v * b4;
        t5 += v * b5;
        t6 += v * b6;
        t7 += v * b7;
        t8 += v * b8;
        t9 += v * b9;
        t10 += v * b10;
        t11 += v * b11;
        t12 += v * b12;
        t13 += v * b13;
        t14 += v * b14;
        t15 += v * b15;
        v = a[1];
        t1 += v * b0;
        t2 += v * b1;
        t3 += v * b2;
        t4 += v * b3;
        t5 += v * b4;
        t6 += v * b5;
        t7 += v * b6;
        t8 += v * b7;
        t9 += v * b8;
        t10 += v * b9;
        t11 += v * b10;
        t12 += v * b11;
        t13 += v * b12;
        t14 += v * b13;
        t15 += v * b14;
        t16 += v * b15;
        v = a[2];
        t2 += v * b0;
        t3 += v * b1;
        t4 += v * b2;
        t5 += v * b3;
        t6 += v * b4;
        t7 += v * b5;
        t8 += v * b6;
        t9 += v * b7;
        t10 += v * b8;
        t11 += v * b9;
        t12 += v * b10;
        t13 += v * b11;
        t14 += v * b12;
        t15 += v * b13;
        t16 += v * b14;
        t17 += v * b15;
        v = a[3];
        t3 += v * b0;
        t4 += v * b1;
        t5 += v * b2;
        t6 += v * b3;
        t7 += v * b4;
        t8 += v * b5;
        t9 += v * b6;
        t10 += v * b7;
        t11 += v * b8;
        t12 += v * b9;
        t13 += v * b10;
        t14 += v * b11;
        t15 += v * b12;
        t16 += v * b13;
        t17 += v * b14;
        t18 += v * b15;
        v = a[4];
        t4 += v * b0;
        t5 += v * b1;
        t6 += v * b2;
        t7 += v * b3;
        t8 += v * b4;
        t9 += v * b5;
        t10 += v * b6;
        t11 += v * b7;
        t12 += v * b8;
        t13 += v * b9;
        t14 += v * b10;
        t15 += v * b11;
        t16 += v * b12;
        t17 += v * b13;
        t18 += v * b14;
        t19 += v * b15;
        v = a[5];
        t5 += v * b0;
        t6 += v * b1;
        t7 += v * b2;
        t8 += v * b3;
        t9 += v * b4;
        t10 += v * b5;
        t11 += v * b6;
        t12 += v * b7;
        t13 += v * b8;
        t14 += v * b9;
        t15 += v * b10;
        t16 += v * b11;
        t17 += v * b12;
        t18 += v * b13;
        t19 += v * b14;
        t20 += v * b15;
        v = a[6];
        t6 += v * b0;
        t7 += v * b1;
        t8 += v * b2;
        t9 += v * b3;
        t10 += v * b4;
        t11 += v * b5;
        t12 += v * b6;
        t13 += v * b7;
        t14 += v * b8;
        t15 += v * b9;
        t16 += v * b10;
        t17 += v * b11;
        t18 += v * b12;
        t19 += v * b13;
        t20 += v * b14;
        t21 += v * b15;
        v = a[7];
        t7 += v * b0;
        t8 += v * b1;
        t9 += v * b2;
        t10 += v * b3;
        t11 += v * b4;
        t12 += v * b5;
        t13 += v * b6;
        t14 += v * b7;
        t15 += v * b8;
        t16 += v * b9;
        t17 += v * b10;
        t18 += v * b11;
        t19 += v * b12;
        t20 += v * b13;
        t21 += v * b14;
        t22 += v * b15;
        v = a[8];
        t8 += v * b0;
        t9 += v * b1;
        t10 += v * b2;
        t11 += v * b3;
        t12 += v * b4;
        t13 += v * b5;
        t14 += v * b6;
        t15 += v * b7;
        t16 += v * b8;
        t17 += v * b9;
        t18 += v * b10;
        t19 += v * b11;
        t20 += v * b12;
        t21 += v * b13;
        t22 += v * b14;
        t23 += v * b15;
        v = a[9];
        t9 += v * b0;
        t10 += v * b1;
        t11 += v * b2;
        t12 += v * b3;
        t13 += v * b4;
        t14 += v * b5;
        t15 += v * b6;
        t16 += v * b7;
        t17 += v * b8;
        t18 += v * b9;
        t19 += v * b10;
        t20 += v * b11;
        t21 += v * b12;
        t22 += v * b13;
        t23 += v * b14;
        t24 += v * b15;
        v = a[10];
        t10 += v * b0;
        t11 += v * b1;
        t12 += v * b2;
        t13 += v * b3;
        t14 += v * b4;
        t15 += v * b5;
        t16 += v * b6;
        t17 += v * b7;
        t18 += v * b8;
        t19 += v * b9;
        t20 += v * b10;
        t21 += v * b11;
        t22 += v * b12;
        t23 += v * b13;
        t24 += v * b14;
        t25 += v * b15;
        v = a[11];
        t11 += v * b0;
        t12 += v * b1;
        t13 += v * b2;
        t14 += v * b3;
        t15 += v * b4;
        t16 += v * b5;
        t17 += v * b6;
        t18 += v * b7;
        t19 += v * b8;
        t20 += v * b9;
        t21 += v * b10;
        t22 += v * b11;
        t23 += v * b12;
        t24 += v * b13;
        t25 += v * b14;
        t26 += v * b15;
        v = a[12];
        t12 += v * b0;
        t13 += v * b1;
        t14 += v * b2;
        t15 += v * b3;
        t16 += v * b4;
        t17 += v * b5;
        t18 += v * b6;
        t19 += v * b7;
        t20 += v * b8;
        t21 += v * b9;
        t22 += v * b10;
        t23 += v * b11;
        t24 += v * b12;
        t25 += v * b13;
        t26 += v * b14;
        t27 += v * b15;
        v = a[13];
        t13 += v * b0;
        t14 += v * b1;
        t15 += v * b2;
        t16 += v * b3;
        t17 += v * b4;
        t18 += v * b5;
        t19 += v * b6;
        t20 += v * b7;
        t21 += v * b8;
        t22 += v * b9;
        t23 += v * b10;
        t24 += v * b11;
        t25 += v * b12;
        t26 += v * b13;
        t27 += v * b14;
        t28 += v * b15;
        v = a[14];
        t14 += v * b0;
        t15 += v * b1;
        t16 += v * b2;
        t17 += v * b3;
        t18 += v * b4;
        t19 += v * b5;
        t20 += v * b6;
        t21 += v * b7;
        t22 += v * b8;
        t23 += v * b9;
        t24 += v * b10;
        t25 += v * b11;
        t26 += v * b12;
        t27 += v * b13;
        t28 += v * b14;
        t29 += v * b15;
        v = a[15];
        t15 += v * b0;
        t16 += v * b1;
        t17 += v * b2;
        t18 += v * b3;
        t19 += v * b4;
        t20 += v * b5;
        t21 += v * b6;
        t22 += v * b7;
        t23 += v * b8;
        t24 += v * b9;
        t25 += v * b10;
        t26 += v * b11;
        t27 += v * b12;
        t28 += v * b13;
        t29 += v * b14;
        t30 += v * b15;
        t0 += 38 * t16;
        t1 += 38 * t17;
        t2 += 38 * t18;
        t3 += 38 * t19;
        t4 += 38 * t20;
        t5 += 38 * t21;
        t6 += 38 * t22;
        t7 += 38 * t23;
        t8 += 38 * t24;
        t9 += 38 * t25;
        t10 += 38 * t26;
        t11 += 38 * t27;
        t12 += 38 * t28;
        t13 += 38 * t29;
        t14 += 38 * t30;
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        c = 1;
        v = t0 + c + 65535;
        c = Math.floor(v / 65536);
        t0 = v - c * 65536;
        v = t1 + c + 65535;
        c = Math.floor(v / 65536);
        t1 = v - c * 65536;
        v = t2 + c + 65535;
        c = Math.floor(v / 65536);
        t2 = v - c * 65536;
        v = t3 + c + 65535;
        c = Math.floor(v / 65536);
        t3 = v - c * 65536;
        v = t4 + c + 65535;
        c = Math.floor(v / 65536);
        t4 = v - c * 65536;
        v = t5 + c + 65535;
        c = Math.floor(v / 65536);
        t5 = v - c * 65536;
        v = t6 + c + 65535;
        c = Math.floor(v / 65536);
        t6 = v - c * 65536;
        v = t7 + c + 65535;
        c = Math.floor(v / 65536);
        t7 = v - c * 65536;
        v = t8 + c + 65535;
        c = Math.floor(v / 65536);
        t8 = v - c * 65536;
        v = t9 + c + 65535;
        c = Math.floor(v / 65536);
        t9 = v - c * 65536;
        v = t10 + c + 65535;
        c = Math.floor(v / 65536);
        t10 = v - c * 65536;
        v = t11 + c + 65535;
        c = Math.floor(v / 65536);
        t11 = v - c * 65536;
        v = t12 + c + 65535;
        c = Math.floor(v / 65536);
        t12 = v - c * 65536;
        v = t13 + c + 65535;
        c = Math.floor(v / 65536);
        t13 = v - c * 65536;
        v = t14 + c + 65535;
        c = Math.floor(v / 65536);
        t14 = v - c * 65536;
        v = t15 + c + 65535;
        c = Math.floor(v / 65536);
        t15 = v - c * 65536;
        t0 += c - 1 + 37 * (c - 1);
        o[0] = t0;
        o[1] = t1;
        o[2] = t2;
        o[3] = t3;
        o[4] = t4;
        o[5] = t5;
        o[6] = t6;
        o[7] = t7;
        o[8] = t8;
        o[9] = t9;
        o[10] = t10;
        o[11] = t11;
        o[12] = t12;
        o[13] = t13;
        o[14] = t14;
        o[15] = t15;
      }
      function S(o, a) {
        M(o, a, a);
      }
      function inv25519(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++) c[a] = i[a];
        for (a = 253; a >= 0; a--) {
          S(c, c);
          if (a !== 2 && a !== 4) M(c, c, i);
        }
        for (a = 0; a < 16; a++) o[a] = c[a];
      }
      function pow2523(o, i) {
        var c = gf();
        var a;
        for (a = 0; a < 16; a++) c[a] = i[a];
        for (a = 250; a >= 0; a--) {
          S(c, c);
          if (a !== 1) M(c, c, i);
        }
        for (a = 0; a < 16; a++) o[a] = c[a];
      }
      function crypto_scalarmult(q, n, p) {
        var z = new Uint8Array(32);
        var x = new Float64Array(80), r, i;
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf();
        for (i = 0; i < 31; i++) z[i] = n[i];
        z[31] = n[31] & 127 | 64;
        z[0] &= 248;
        unpack25519(x, p);
        for (i = 0; i < 16; i++) {
          b[i] = x[i];
          d[i] = a[i] = c[i] = 0;
        }
        a[0] = d[0] = 1;
        for (i = 254; i >= 0; --i) {
          r = z[i >>> 3] >>> (i & 7) & 1;
          sel25519(a, b, r);
          sel25519(c, d, r);
          A(e, a, c);
          Z(a, a, c);
          A(c, b, d);
          Z(b, b, d);
          S(d, e);
          S(f, a);
          M(a, c, a);
          M(c, b, e);
          A(e, a, c);
          Z(a, a, c);
          S(b, a);
          Z(c, d, f);
          M(a, c, _121665);
          A(a, a, d);
          M(c, c, a);
          M(a, d, f);
          M(d, b, x);
          S(b, e);
          sel25519(a, b, r);
          sel25519(c, d, r);
        }
        for (i = 0; i < 16; i++) {
          x[i + 16] = a[i];
          x[i + 32] = c[i];
          x[i + 48] = b[i];
          x[i + 64] = d[i];
        }
        var x32 = x.subarray(32);
        var x16 = x.subarray(16);
        inv25519(x32, x32);
        M(x16, x16, x32);
        pack25519(q, x16);
        return 0;
      }
      function crypto_scalarmult_base(q, n) {
        return crypto_scalarmult(q, n, _9);
      }
      function crypto_box_keypair(y, x) {
        randombytes(x, 32);
        return crypto_scalarmult_base(y, x);
      }
      function crypto_box_beforenm(k, y, x) {
        var s = new Uint8Array(32);
        crypto_scalarmult(s, x, y);
        return crypto_core_hsalsa20(k, _0, s, sigma);
      }
      var crypto_box_afternm = crypto_secretbox;
      var crypto_box_open_afternm = crypto_secretbox_open;
      function crypto_box(c, m, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_afternm(c, m, d, n, k);
      }
      function crypto_box_open(m, c, d, n, y, x) {
        var k = new Uint8Array(32);
        crypto_box_beforenm(k, y, x);
        return crypto_box_open_afternm(m, c, d, n, k);
      }
      var K = [
        1116352408,
        3609767458,
        1899447441,
        602891725,
        3049323471,
        3964484399,
        3921009573,
        2173295548,
        961987163,
        4081628472,
        1508970993,
        3053834265,
        2453635748,
        2937671579,
        2870763221,
        3664609560,
        3624381080,
        2734883394,
        310598401,
        1164996542,
        607225278,
        1323610764,
        1426881987,
        3590304994,
        1925078388,
        4068182383,
        2162078206,
        991336113,
        2614888103,
        633803317,
        3248222580,
        3479774868,
        3835390401,
        2666613458,
        4022224774,
        944711139,
        264347078,
        2341262773,
        604807628,
        2007800933,
        770255983,
        1495990901,
        1249150122,
        1856431235,
        1555081692,
        3175218132,
        1996064986,
        2198950837,
        2554220882,
        3999719339,
        2821834349,
        766784016,
        2952996808,
        2566594879,
        3210313671,
        3203337956,
        3336571891,
        1034457026,
        3584528711,
        2466948901,
        113926993,
        3758326383,
        338241895,
        168717936,
        666307205,
        1188179964,
        773529912,
        1546045734,
        1294757372,
        1522805485,
        1396182291,
        2643833823,
        1695183700,
        2343527390,
        1986661051,
        1014477480,
        2177026350,
        1206759142,
        2456956037,
        344077627,
        2730485921,
        1290863460,
        2820302411,
        3158454273,
        3259730800,
        3505952657,
        3345764771,
        106217008,
        3516065817,
        3606008344,
        3600352804,
        1432725776,
        4094571909,
        1467031594,
        275423344,
        851169720,
        430227734,
        3100823752,
        506948616,
        1363258195,
        659060556,
        3750685593,
        883997877,
        3785050280,
        958139571,
        3318307427,
        1322822218,
        3812723403,
        1537002063,
        2003034995,
        1747873779,
        3602036899,
        1955562222,
        1575990012,
        2024104815,
        1125592928,
        2227730452,
        2716904306,
        2361852424,
        442776044,
        2428436474,
        593698344,
        2756734187,
        3733110249,
        3204031479,
        2999351573,
        3329325298,
        3815920427,
        3391569614,
        3928383900,
        3515267271,
        566280711,
        3940187606,
        3454069534,
        4118630271,
        4000239992,
        116418474,
        1914138554,
        174292421,
        2731055270,
        289380356,
        3203993006,
        460393269,
        320620315,
        685471733,
        587496836,
        852142971,
        1086792851,
        1017036298,
        365543100,
        1126000580,
        2618297676,
        1288033470,
        3409855158,
        1501505948,
        4234509866,
        1607167915,
        987167468,
        1816402316,
        1246189591
      ];
      function crypto_hashblocks_hl(hh, hl, m, n) {
        var wh = new Int32Array(16), wl = new Int32Array(16), bh0, bh1, bh2, bh3, bh4, bh5, bh6, bh7, bl0, bl1, bl2, bl3, bl4, bl5, bl6, bl7, th, tl, i, j, h, l, a, b, c, d;
        var ah0 = hh[0], ah1 = hh[1], ah2 = hh[2], ah3 = hh[3], ah4 = hh[4], ah5 = hh[5], ah6 = hh[6], ah7 = hh[7], al0 = hl[0], al1 = hl[1], al2 = hl[2], al3 = hl[3], al4 = hl[4], al5 = hl[5], al6 = hl[6], al7 = hl[7];
        var pos = 0;
        while (n >= 128) {
          for (i = 0; i < 16; i++) {
            j = 8 * i + pos;
            wh[i] = m[j + 0] << 24 | m[j + 1] << 16 | m[j + 2] << 8 | m[j + 3];
            wl[i] = m[j + 4] << 24 | m[j + 5] << 16 | m[j + 6] << 8 | m[j + 7];
          }
          for (i = 0; i < 80; i++) {
            bh0 = ah0;
            bh1 = ah1;
            bh2 = ah2;
            bh3 = ah3;
            bh4 = ah4;
            bh5 = ah5;
            bh6 = ah6;
            bh7 = ah7;
            bl0 = al0;
            bl1 = al1;
            bl2 = al2;
            bl3 = al3;
            bl4 = al4;
            bl5 = al5;
            bl6 = al6;
            bl7 = al7;
            h = ah7;
            l = al7;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah4 >>> 14 | al4 << 32 - 14) ^ (ah4 >>> 18 | al4 << 32 - 18) ^ (al4 >>> 41 - 32 | ah4 << 32 - (41 - 32));
            l = (al4 >>> 14 | ah4 << 32 - 14) ^ (al4 >>> 18 | ah4 << 32 - 18) ^ (ah4 >>> 41 - 32 | al4 << 32 - (41 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah4 & ah5 ^ ~ah4 & ah6;
            l = al4 & al5 ^ ~al4 & al6;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = K[i * 2];
            l = K[i * 2 + 1];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = wh[i % 16];
            l = wl[i % 16];
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            th = c & 65535 | d << 16;
            tl = a & 65535 | b << 16;
            h = th;
            l = tl;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = (ah0 >>> 28 | al0 << 32 - 28) ^ (al0 >>> 34 - 32 | ah0 << 32 - (34 - 32)) ^ (al0 >>> 39 - 32 | ah0 << 32 - (39 - 32));
            l = (al0 >>> 28 | ah0 << 32 - 28) ^ (ah0 >>> 34 - 32 | al0 << 32 - (34 - 32)) ^ (ah0 >>> 39 - 32 | al0 << 32 - (39 - 32));
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            h = ah0 & ah1 ^ ah0 & ah2 ^ ah1 & ah2;
            l = al0 & al1 ^ al0 & al2 ^ al1 & al2;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh7 = c & 65535 | d << 16;
            bl7 = a & 65535 | b << 16;
            h = bh3;
            l = bl3;
            a = l & 65535;
            b = l >>> 16;
            c = h & 65535;
            d = h >>> 16;
            h = th;
            l = tl;
            a += l & 65535;
            b += l >>> 16;
            c += h & 65535;
            d += h >>> 16;
            b += a >>> 16;
            c += b >>> 16;
            d += c >>> 16;
            bh3 = c & 65535 | d << 16;
            bl3 = a & 65535 | b << 16;
            ah1 = bh0;
            ah2 = bh1;
            ah3 = bh2;
            ah4 = bh3;
            ah5 = bh4;
            ah6 = bh5;
            ah7 = bh6;
            ah0 = bh7;
            al1 = bl0;
            al2 = bl1;
            al3 = bl2;
            al4 = bl3;
            al5 = bl4;
            al6 = bl5;
            al7 = bl6;
            al0 = bl7;
            if (i % 16 === 15) {
              for (j = 0; j < 16; j++) {
                h = wh[j];
                l = wl[j];
                a = l & 65535;
                b = l >>> 16;
                c = h & 65535;
                d = h >>> 16;
                h = wh[(j + 9) % 16];
                l = wl[(j + 9) % 16];
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 1) % 16];
                tl = wl[(j + 1) % 16];
                h = (th >>> 1 | tl << 32 - 1) ^ (th >>> 8 | tl << 32 - 8) ^ th >>> 7;
                l = (tl >>> 1 | th << 32 - 1) ^ (tl >>> 8 | th << 32 - 8) ^ (tl >>> 7 | th << 32 - 7);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                th = wh[(j + 14) % 16];
                tl = wl[(j + 14) % 16];
                h = (th >>> 19 | tl << 32 - 19) ^ (tl >>> 61 - 32 | th << 32 - (61 - 32)) ^ th >>> 6;
                l = (tl >>> 19 | th << 32 - 19) ^ (th >>> 61 - 32 | tl << 32 - (61 - 32)) ^ (tl >>> 6 | th << 32 - 6);
                a += l & 65535;
                b += l >>> 16;
                c += h & 65535;
                d += h >>> 16;
                b += a >>> 16;
                c += b >>> 16;
                d += c >>> 16;
                wh[j] = c & 65535 | d << 16;
                wl[j] = a & 65535 | b << 16;
              }
            }
          }
          h = ah0;
          l = al0;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[0];
          l = hl[0];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[0] = ah0 = c & 65535 | d << 16;
          hl[0] = al0 = a & 65535 | b << 16;
          h = ah1;
          l = al1;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[1];
          l = hl[1];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[1] = ah1 = c & 65535 | d << 16;
          hl[1] = al1 = a & 65535 | b << 16;
          h = ah2;
          l = al2;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[2];
          l = hl[2];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[2] = ah2 = c & 65535 | d << 16;
          hl[2] = al2 = a & 65535 | b << 16;
          h = ah3;
          l = al3;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[3];
          l = hl[3];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[3] = ah3 = c & 65535 | d << 16;
          hl[3] = al3 = a & 65535 | b << 16;
          h = ah4;
          l = al4;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[4];
          l = hl[4];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[4] = ah4 = c & 65535 | d << 16;
          hl[4] = al4 = a & 65535 | b << 16;
          h = ah5;
          l = al5;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[5];
          l = hl[5];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[5] = ah5 = c & 65535 | d << 16;
          hl[5] = al5 = a & 65535 | b << 16;
          h = ah6;
          l = al6;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[6];
          l = hl[6];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[6] = ah6 = c & 65535 | d << 16;
          hl[6] = al6 = a & 65535 | b << 16;
          h = ah7;
          l = al7;
          a = l & 65535;
          b = l >>> 16;
          c = h & 65535;
          d = h >>> 16;
          h = hh[7];
          l = hl[7];
          a += l & 65535;
          b += l >>> 16;
          c += h & 65535;
          d += h >>> 16;
          b += a >>> 16;
          c += b >>> 16;
          d += c >>> 16;
          hh[7] = ah7 = c & 65535 | d << 16;
          hl[7] = al7 = a & 65535 | b << 16;
          pos += 128;
          n -= 128;
        }
        return n;
      }
      function crypto_hash(out, m, n) {
        var hh = new Int32Array(8), hl = new Int32Array(8), x = new Uint8Array(256), i, b = n;
        hh[0] = 1779033703;
        hh[1] = 3144134277;
        hh[2] = 1013904242;
        hh[3] = 2773480762;
        hh[4] = 1359893119;
        hh[5] = 2600822924;
        hh[6] = 528734635;
        hh[7] = 1541459225;
        hl[0] = 4089235720;
        hl[1] = 2227873595;
        hl[2] = 4271175723;
        hl[3] = 1595750129;
        hl[4] = 2917565137;
        hl[5] = 725511199;
        hl[6] = 4215389547;
        hl[7] = 327033209;
        crypto_hashblocks_hl(hh, hl, m, n);
        n %= 128;
        for (i = 0; i < n; i++) x[i] = m[b - n + i];
        x[n] = 128;
        n = 256 - 128 * (n < 112 ? 1 : 0);
        x[n - 9] = 0;
        ts64(x, n - 8, b / 536870912 | 0, b << 3);
        crypto_hashblocks_hl(hh, hl, x, n);
        for (i = 0; i < 8; i++) ts64(out, 8 * i, hh[i], hl[i]);
        return 0;
      }
      function add2(p, q) {
        var a = gf(), b = gf(), c = gf(), d = gf(), e = gf(), f = gf(), g = gf(), h = gf(), t = gf();
        Z(a, p[1], p[0]);
        Z(t, q[1], q[0]);
        M(a, a, t);
        A(b, p[0], p[1]);
        A(t, q[0], q[1]);
        M(b, b, t);
        M(c, p[3], q[3]);
        M(c, c, D2);
        M(d, p[2], q[2]);
        A(d, d, d);
        Z(e, b, a);
        Z(f, d, c);
        A(g, d, c);
        A(h, b, a);
        M(p[0], e, f);
        M(p[1], h, g);
        M(p[2], g, f);
        M(p[3], e, h);
      }
      function cswap(p, q, b) {
        var i;
        for (i = 0; i < 4; i++) {
          sel25519(p[i], q[i], b);
        }
      }
      function pack(r, p) {
        var tx = gf(), ty = gf(), zi = gf();
        inv25519(zi, p[2]);
        M(tx, p[0], zi);
        M(ty, p[1], zi);
        pack25519(r, ty);
        r[31] ^= par25519(tx) << 7;
      }
      function scalarmult(p, q, s) {
        var b, i;
        set25519(p[0], gf0);
        set25519(p[1], gf1);
        set25519(p[2], gf1);
        set25519(p[3], gf0);
        for (i = 255; i >= 0; --i) {
          b = s[i / 8 | 0] >> (i & 7) & 1;
          cswap(p, q, b);
          add2(q, p);
          add2(p, p);
          cswap(p, q, b);
        }
      }
      function scalarbase(p, s) {
        var q = [gf(), gf(), gf(), gf()];
        set25519(q[0], X);
        set25519(q[1], Y);
        set25519(q[2], gf1);
        M(q[3], X, Y);
        scalarmult(p, q, s);
      }
      function crypto_sign_keypair(pk, sk, seeded) {
        var d = new Uint8Array(64);
        var p = [gf(), gf(), gf(), gf()];
        var i;
        if (!seeded) randombytes(sk, 32);
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        scalarbase(p, d);
        pack(pk, p);
        for (i = 0; i < 32; i++) sk[i + 32] = pk[i];
        return 0;
      }
      var L = new Float64Array([237, 211, 245, 92, 26, 99, 18, 88, 214, 156, 247, 162, 222, 249, 222, 20, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 16]);
      function modL(r, x) {
        var carry, i, j, k;
        for (i = 63; i >= 32; --i) {
          carry = 0;
          for (j = i - 32, k = i - 12; j < k; ++j) {
            x[j] += carry - 16 * x[i] * L[j - (i - 32)];
            carry = Math.floor((x[j] + 128) / 256);
            x[j] -= carry * 256;
          }
          x[j] += carry;
          x[i] = 0;
        }
        carry = 0;
        for (j = 0; j < 32; j++) {
          x[j] += carry - (x[31] >> 4) * L[j];
          carry = x[j] >> 8;
          x[j] &= 255;
        }
        for (j = 0; j < 32; j++) x[j] -= carry * L[j];
        for (i = 0; i < 32; i++) {
          x[i + 1] += x[i] >> 8;
          r[i] = x[i] & 255;
        }
      }
      function reduce(r) {
        var x = new Float64Array(64), i;
        for (i = 0; i < 64; i++) x[i] = r[i];
        for (i = 0; i < 64; i++) r[i] = 0;
        modL(r, x);
      }
      function crypto_sign(sm, m, n, sk) {
        var d = new Uint8Array(64), h = new Uint8Array(64), r = new Uint8Array(64);
        var i, j, x = new Float64Array(64);
        var p = [gf(), gf(), gf(), gf()];
        crypto_hash(d, sk, 32);
        d[0] &= 248;
        d[31] &= 127;
        d[31] |= 64;
        var smlen = n + 64;
        for (i = 0; i < n; i++) sm[64 + i] = m[i];
        for (i = 0; i < 32; i++) sm[32 + i] = d[32 + i];
        crypto_hash(r, sm.subarray(32), n + 32);
        reduce(r);
        scalarbase(p, r);
        pack(sm, p);
        for (i = 32; i < 64; i++) sm[i] = sk[i];
        crypto_hash(h, sm, n + 64);
        reduce(h);
        for (i = 0; i < 64; i++) x[i] = 0;
        for (i = 0; i < 32; i++) x[i] = r[i];
        for (i = 0; i < 32; i++) {
          for (j = 0; j < 32; j++) {
            x[i + j] += h[i] * d[j];
          }
        }
        modL(sm.subarray(32), x);
        return smlen;
      }
      function unpackneg(r, p) {
        var t = gf(), chk = gf(), num = gf(), den = gf(), den2 = gf(), den4 = gf(), den6 = gf();
        set25519(r[2], gf1);
        unpack25519(r[1], p);
        S(num, r[1]);
        M(den, num, D);
        Z(num, num, r[2]);
        A(den, r[2], den);
        S(den2, den);
        S(den4, den2);
        M(den6, den4, den2);
        M(t, den6, num);
        M(t, t, den);
        pow2523(t, t);
        M(t, t, num);
        M(t, t, den);
        M(t, t, den);
        M(r[0], t, den);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num)) M(r[0], r[0], I);
        S(chk, r[0]);
        M(chk, chk, den);
        if (neq25519(chk, num)) return -1;
        if (par25519(r[0]) === p[31] >> 7) Z(r[0], gf0, r[0]);
        M(r[3], r[0], r[1]);
        return 0;
      }
      function crypto_sign_open(m, sm, n, pk) {
        var i;
        var t = new Uint8Array(32), h = new Uint8Array(64);
        var p = [gf(), gf(), gf(), gf()], q = [gf(), gf(), gf(), gf()];
        if (n < 64) return -1;
        if (unpackneg(q, pk)) return -1;
        for (i = 0; i < n; i++) m[i] = sm[i];
        for (i = 0; i < 32; i++) m[i + 32] = pk[i];
        crypto_hash(h, m, n);
        reduce(h);
        scalarmult(p, q, h);
        scalarbase(q, sm.subarray(32));
        add2(p, q);
        pack(t, p);
        n -= 64;
        if (crypto_verify_32(sm, 0, t, 0)) {
          for (i = 0; i < n; i++) m[i] = 0;
          return -1;
        }
        for (i = 0; i < n; i++) m[i] = sm[i + 64];
        return n;
      }
      var crypto_secretbox_KEYBYTES = 32, crypto_secretbox_NONCEBYTES = 24, crypto_secretbox_ZEROBYTES = 32, crypto_secretbox_BOXZEROBYTES = 16, crypto_scalarmult_BYTES = 32, crypto_scalarmult_SCALARBYTES = 32, crypto_box_PUBLICKEYBYTES = 32, crypto_box_SECRETKEYBYTES = 32, crypto_box_BEFORENMBYTES = 32, crypto_box_NONCEBYTES = crypto_secretbox_NONCEBYTES, crypto_box_ZEROBYTES = crypto_secretbox_ZEROBYTES, crypto_box_BOXZEROBYTES = crypto_secretbox_BOXZEROBYTES, crypto_sign_BYTES = 64, crypto_sign_PUBLICKEYBYTES = 32, crypto_sign_SECRETKEYBYTES = 64, crypto_sign_SEEDBYTES = 32, crypto_hash_BYTES = 64;
      nacl2.lowlevel = {
        crypto_core_hsalsa20,
        crypto_stream_xor,
        crypto_stream,
        crypto_stream_salsa20_xor,
        crypto_stream_salsa20,
        crypto_onetimeauth,
        crypto_onetimeauth_verify,
        crypto_verify_16,
        crypto_verify_32,
        crypto_secretbox,
        crypto_secretbox_open,
        crypto_scalarmult,
        crypto_scalarmult_base,
        crypto_box_beforenm,
        crypto_box_afternm,
        crypto_box,
        crypto_box_open,
        crypto_box_keypair,
        crypto_hash,
        crypto_sign,
        crypto_sign_keypair,
        crypto_sign_open,
        crypto_secretbox_KEYBYTES,
        crypto_secretbox_NONCEBYTES,
        crypto_secretbox_ZEROBYTES,
        crypto_secretbox_BOXZEROBYTES,
        crypto_scalarmult_BYTES,
        crypto_scalarmult_SCALARBYTES,
        crypto_box_PUBLICKEYBYTES,
        crypto_box_SECRETKEYBYTES,
        crypto_box_BEFORENMBYTES,
        crypto_box_NONCEBYTES,
        crypto_box_ZEROBYTES,
        crypto_box_BOXZEROBYTES,
        crypto_sign_BYTES,
        crypto_sign_PUBLICKEYBYTES,
        crypto_sign_SECRETKEYBYTES,
        crypto_sign_SEEDBYTES,
        crypto_hash_BYTES,
        gf,
        D,
        L,
        pack25519,
        unpack25519,
        M,
        A,
        S,
        Z,
        pow2523,
        add: add2,
        set25519,
        modL,
        scalarmult,
        scalarbase
      };
      function checkLengths(k, n) {
        if (k.length !== crypto_secretbox_KEYBYTES) throw new Error("bad key size");
        if (n.length !== crypto_secretbox_NONCEBYTES) throw new Error("bad nonce size");
      }
      function checkBoxLengths(pk, sk) {
        if (pk.length !== crypto_box_PUBLICKEYBYTES) throw new Error("bad public key size");
        if (sk.length !== crypto_box_SECRETKEYBYTES) throw new Error("bad secret key size");
      }
      function checkArrayTypes() {
        for (var i = 0; i < arguments.length; i++) {
          if (!(arguments[i] instanceof Uint8Array))
            throw new TypeError("unexpected type, use Uint8Array");
        }
      }
      function cleanup(arr) {
        for (var i = 0; i < arr.length; i++) arr[i] = 0;
      }
      nacl2.randomBytes = function(n) {
        var b = new Uint8Array(n);
        randombytes(b, n);
        return b;
      };
      nacl2.secretbox = function(msg, nonce, key) {
        checkArrayTypes(msg, nonce, key);
        checkLengths(key, nonce);
        var m = new Uint8Array(crypto_secretbox_ZEROBYTES + msg.length);
        var c = new Uint8Array(m.length);
        for (var i = 0; i < msg.length; i++) m[i + crypto_secretbox_ZEROBYTES] = msg[i];
        crypto_secretbox(c, m, m.length, nonce, key);
        return c.subarray(crypto_secretbox_BOXZEROBYTES);
      };
      nacl2.secretbox.open = function(box, nonce, key) {
        checkArrayTypes(box, nonce, key);
        checkLengths(key, nonce);
        var c = new Uint8Array(crypto_secretbox_BOXZEROBYTES + box.length);
        var m = new Uint8Array(c.length);
        for (var i = 0; i < box.length; i++) c[i + crypto_secretbox_BOXZEROBYTES] = box[i];
        if (c.length < 32) return null;
        if (crypto_secretbox_open(m, c, c.length, nonce, key) !== 0) return null;
        return m.subarray(crypto_secretbox_ZEROBYTES);
      };
      nacl2.secretbox.keyLength = crypto_secretbox_KEYBYTES;
      nacl2.secretbox.nonceLength = crypto_secretbox_NONCEBYTES;
      nacl2.secretbox.overheadLength = crypto_secretbox_BOXZEROBYTES;
      nacl2.scalarMult = function(n, p) {
        checkArrayTypes(n, p);
        if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size");
        if (p.length !== crypto_scalarmult_BYTES) throw new Error("bad p size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult(q, n, p);
        return q;
      };
      nacl2.scalarMult.base = function(n) {
        checkArrayTypes(n);
        if (n.length !== crypto_scalarmult_SCALARBYTES) throw new Error("bad n size");
        var q = new Uint8Array(crypto_scalarmult_BYTES);
        crypto_scalarmult_base(q, n);
        return q;
      };
      nacl2.scalarMult.scalarLength = crypto_scalarmult_SCALARBYTES;
      nacl2.scalarMult.groupElementLength = crypto_scalarmult_BYTES;
      nacl2.box = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox(msg, nonce, k);
      };
      nacl2.box.before = function(publicKey, secretKey) {
        checkArrayTypes(publicKey, secretKey);
        checkBoxLengths(publicKey, secretKey);
        var k = new Uint8Array(crypto_box_BEFORENMBYTES);
        crypto_box_beforenm(k, publicKey, secretKey);
        return k;
      };
      nacl2.box.after = nacl2.secretbox;
      nacl2.box.open = function(msg, nonce, publicKey, secretKey) {
        var k = nacl2.box.before(publicKey, secretKey);
        return nacl2.secretbox.open(msg, nonce, k);
      };
      nacl2.box.open.after = nacl2.secretbox.open;
      nacl2.box.keyPair = function() {
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_box_SECRETKEYBYTES);
        crypto_box_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.box.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_box_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_box_PUBLICKEYBYTES);
        crypto_scalarmult_base(pk, secretKey);
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl2.box.publicKeyLength = crypto_box_PUBLICKEYBYTES;
      nacl2.box.secretKeyLength = crypto_box_SECRETKEYBYTES;
      nacl2.box.sharedKeyLength = crypto_box_BEFORENMBYTES;
      nacl2.box.nonceLength = crypto_box_NONCEBYTES;
      nacl2.box.overheadLength = nacl2.secretbox.overheadLength;
      nacl2.sign = function(msg, secretKey) {
        checkArrayTypes(msg, secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var signedMsg = new Uint8Array(crypto_sign_BYTES + msg.length);
        crypto_sign(signedMsg, msg, msg.length, secretKey);
        return signedMsg;
      };
      nacl2.sign.open = function(signedMsg, publicKey) {
        checkArrayTypes(signedMsg, publicKey);
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var tmp = new Uint8Array(signedMsg.length);
        var mlen = crypto_sign_open(tmp, signedMsg, signedMsg.length, publicKey);
        if (mlen < 0) return null;
        var m = new Uint8Array(mlen);
        for (var i = 0; i < m.length; i++) m[i] = tmp[i];
        return m;
      };
      nacl2.sign.detached = function(msg, secretKey) {
        var signedMsg = nacl2.sign(msg, secretKey);
        var sig = new Uint8Array(crypto_sign_BYTES);
        for (var i = 0; i < sig.length; i++) sig[i] = signedMsg[i];
        return sig;
      };
      nacl2.sign.detached.verify = function(msg, sig, publicKey) {
        checkArrayTypes(msg, sig, publicKey);
        if (sig.length !== crypto_sign_BYTES)
          throw new Error("bad signature size");
        if (publicKey.length !== crypto_sign_PUBLICKEYBYTES)
          throw new Error("bad public key size");
        var sm = new Uint8Array(crypto_sign_BYTES + msg.length);
        var m = new Uint8Array(crypto_sign_BYTES + msg.length);
        var i;
        for (i = 0; i < crypto_sign_BYTES; i++) sm[i] = sig[i];
        for (i = 0; i < msg.length; i++) sm[i + crypto_sign_BYTES] = msg[i];
        return crypto_sign_open(m, sm, sm.length, publicKey) >= 0;
      };
      nacl2.sign.keyPair = function() {
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        crypto_sign_keypair(pk, sk);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.sign.keyPair.fromSecretKey = function(secretKey) {
        checkArrayTypes(secretKey);
        if (secretKey.length !== crypto_sign_SECRETKEYBYTES)
          throw new Error("bad secret key size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        for (var i = 0; i < pk.length; i++) pk[i] = secretKey[32 + i];
        return { publicKey: pk, secretKey: new Uint8Array(secretKey) };
      };
      nacl2.sign.keyPair.fromSeed = function(seed) {
        checkArrayTypes(seed);
        if (seed.length !== crypto_sign_SEEDBYTES)
          throw new Error("bad seed size");
        var pk = new Uint8Array(crypto_sign_PUBLICKEYBYTES);
        var sk = new Uint8Array(crypto_sign_SECRETKEYBYTES);
        for (var i = 0; i < 32; i++) sk[i] = seed[i];
        crypto_sign_keypair(pk, sk, true);
        return { publicKey: pk, secretKey: sk };
      };
      nacl2.sign.publicKeyLength = crypto_sign_PUBLICKEYBYTES;
      nacl2.sign.secretKeyLength = crypto_sign_SECRETKEYBYTES;
      nacl2.sign.seedLength = crypto_sign_SEEDBYTES;
      nacl2.sign.signatureLength = crypto_sign_BYTES;
      nacl2.hash = function(msg) {
        checkArrayTypes(msg);
        var h = new Uint8Array(crypto_hash_BYTES);
        crypto_hash(h, msg, msg.length);
        return h;
      };
      nacl2.hash.hashLength = crypto_hash_BYTES;
      nacl2.verify = function(x, y) {
        checkArrayTypes(x, y);
        if (x.length === 0 || y.length === 0) return false;
        if (x.length !== y.length) return false;
        return vn(x, 0, y, 0, x.length) === 0 ? true : false;
      };
      nacl2.setPRNG = function(fn) {
        randombytes = fn;
      };
      (function() {
        var crypto = typeof self !== "undefined" ? self.crypto || self.msCrypto : null;
        if (crypto && crypto.getRandomValues) {
          var QUOTA = 65536;
          nacl2.setPRNG(function(x, n) {
            var i, v = new Uint8Array(n);
            for (i = 0; i < n; i += QUOTA) {
              crypto.getRandomValues(v.subarray(i, i + Math.min(n - i, QUOTA)));
            }
            for (i = 0; i < n; i++) x[i] = v[i];
            cleanup(v);
          });
        } else if (typeof require !== "undefined") {
          crypto = require_crypto();
          if (crypto && crypto.randomBytes) {
            nacl2.setPRNG(function(x, n) {
              var i, v = crypto.randomBytes(n);
              for (i = 0; i < n; i++) x[i] = v[i];
              cleanup(v);
            });
          }
        }
      })();
    })(typeof module2 !== "undefined" && module2.exports ? module2.exports : self.nacl = self.nacl || {});
  }
});

// node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/utils.js
function isBytes(a) {
  return a instanceof Uint8Array || ArrayBuffer.isView(a) && a.constructor.name === "Uint8Array" && "BYTES_PER_ELEMENT" in a && a.BYTES_PER_ELEMENT === 1;
}
function anumber(n, title = "") {
  if (typeof n !== "number") {
    const prefix = title && `"${title}" `;
    throw new TypeError(`${prefix}expected number, got ${typeof n}`);
  }
  if (!Number.isSafeInteger(n) || n < 0) {
    const prefix = title && `"${title}" `;
    throw new RangeError(`${prefix}expected integer >= 0, got ${n}`);
  }
}
function abytes(value, length, title = "") {
  const bytes = isBytes(value);
  const len = value?.length;
  const needsLen = length !== void 0;
  if (!bytes || needsLen && len !== length) {
    const prefix = title && `"${title}" `;
    const ofLen = needsLen ? ` of length ${length}` : "";
    const got = bytes ? `length=${len}` : `type=${typeof value}`;
    const message = prefix + "expected Uint8Array" + ofLen + ", got " + got;
    if (!bytes)
      throw new TypeError(message);
    throw new RangeError(message);
  }
  return value;
}
function aexists(instance, checkFinished = true) {
  if (instance.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (checkFinished && instance.finished)
    throw new Error("Hash#digest() has already been called");
}
function aoutput(out, instance) {
  abytes(out, void 0, "digestInto() output");
  const min = instance.outputLen;
  if (out.length < min) {
    throw new RangeError('"digestInto() output" expected to be of length >=' + min);
  }
}
function u32(arr) {
  return new Uint32Array(arr.buffer, arr.byteOffset, Math.floor(arr.byteLength / 4));
}
function clean(...arrays) {
  for (let i = 0; i < arrays.length; i++) {
    arrays[i].fill(0);
  }
}
function byteSwap(word) {
  return word << 24 & 4278190080 | word << 8 & 16711680 | word >>> 8 & 65280 | word >>> 24 & 255;
}
function byteSwap32(arr) {
  for (let i = 0; i < arr.length; i++) {
    arr[i] = byteSwap(arr[i]);
  }
  return arr;
}
function createHasher(hashCons, info = {}) {
  const hashC = (msg, opts) => hashCons(opts).update(msg).digest();
  const tmp = hashCons(void 0);
  hashC.outputLen = tmp.outputLen;
  hashC.blockLen = tmp.blockLen;
  hashC.canXOF = tmp.canXOF;
  hashC.create = (opts) => hashCons(opts);
  Object.assign(hashC, info);
  return Object.freeze(hashC);
}
var isLE, swap8IfBE, swap32IfBE;
var init_utils = __esm({
  "node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/utils.js"() {
    isLE = /* @__PURE__ */ (() => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
    swap8IfBE = isLE ? (n) => n : (n) => byteSwap(n) >>> 0;
    swap32IfBE = isLE ? (u) => u : byteSwap32;
  }
});

// node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_blake.js
var BSIGMA;
var init_blake = __esm({
  "node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_blake.js"() {
    BSIGMA = /* @__PURE__ */ Uint8Array.from([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9,
      12,
      5,
      1,
      15,
      14,
      13,
      4,
      10,
      0,
      7,
      6,
      3,
      9,
      2,
      8,
      11,
      13,
      11,
      7,
      14,
      12,
      1,
      3,
      9,
      5,
      0,
      15,
      4,
      8,
      6,
      2,
      10,
      6,
      15,
      14,
      9,
      11,
      3,
      0,
      8,
      12,
      2,
      13,
      7,
      1,
      4,
      10,
      5,
      10,
      2,
      8,
      4,
      7,
      6,
      1,
      5,
      15,
      11,
      9,
      14,
      3,
      12,
      13,
      0,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      // Blake1, unused in others
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9
    ]);
  }
});

// node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_u64.js
function fromBig(n, le = false) {
  if (le)
    return { h: Number(n & U32_MASK64), l: Number(n >> _32n & U32_MASK64) };
  return { h: Number(n >> _32n & U32_MASK64) | 0, l: Number(n & U32_MASK64) | 0 };
}
function add(Ah, Al, Bh, Bl) {
  const l = (Al >>> 0) + (Bl >>> 0);
  return { h: Ah + Bh + (l / 2 ** 32 | 0) | 0, l: l | 0 };
}
var U32_MASK64, _32n, rotrSH, rotrSL, rotrBH, rotrBL, rotr32H, rotr32L, add3L, add3H;
var init_u64 = __esm({
  "node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/_u64.js"() {
    U32_MASK64 = /* @__PURE__ */ BigInt(2 ** 32 - 1);
    _32n = /* @__PURE__ */ BigInt(32);
    rotrSH = (h, l, s) => h >>> s | l << 32 - s;
    rotrSL = (h, l, s) => h << 32 - s | l >>> s;
    rotrBH = (h, l, s) => h << 64 - s | l >>> s - 32;
    rotrBL = (h, l, s) => h >>> s - 32 | l << 64 - s;
    rotr32H = (_h, l) => l;
    rotr32L = (h, _l) => h;
    add3L = (Al, Bl, Cl) => (Al >>> 0) + (Bl >>> 0) + (Cl >>> 0);
    add3H = (low, Ah, Bh, Ch) => Ah + Bh + Ch + (low / 2 ** 32 | 0) | 0;
  }
});

// node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/blake2.js
function G1b(a, b, c, d, msg, x) {
  const Xl = msg[x], Xh = msg[x + 1];
  let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
  let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
  let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
  let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
  let ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotr32H(Dh, Dl), Dl: rotr32L(Dh, Dl) });
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrSH(Bh, Bl, 24), Bl: rotrSL(Bh, Bl, 24) });
  BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
  BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
  BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
  BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}
function G2b(a, b, c, d, msg, x) {
  const Xl = msg[x], Xh = msg[x + 1];
  let Al = BBUF[2 * a], Ah = BBUF[2 * a + 1];
  let Bl = BBUF[2 * b], Bh = BBUF[2 * b + 1];
  let Cl = BBUF[2 * c], Ch = BBUF[2 * c + 1];
  let Dl = BBUF[2 * d], Dh = BBUF[2 * d + 1];
  let ll = add3L(Al, Bl, Xl);
  Ah = add3H(ll, Ah, Bh, Xh);
  Al = ll | 0;
  ({ Dh, Dl } = { Dh: Dh ^ Ah, Dl: Dl ^ Al });
  ({ Dh, Dl } = { Dh: rotrSH(Dh, Dl, 16), Dl: rotrSL(Dh, Dl, 16) });
  ({ h: Ch, l: Cl } = add(Ch, Cl, Dh, Dl));
  ({ Bh, Bl } = { Bh: Bh ^ Ch, Bl: Bl ^ Cl });
  ({ Bh, Bl } = { Bh: rotrBH(Bh, Bl, 63), Bl: rotrBL(Bh, Bl, 63) });
  BBUF[2 * a] = Al, BBUF[2 * a + 1] = Ah;
  BBUF[2 * b] = Bl, BBUF[2 * b + 1] = Bh;
  BBUF[2 * c] = Cl, BBUF[2 * c + 1] = Ch;
  BBUF[2 * d] = Dl, BBUF[2 * d + 1] = Dh;
}
function checkBlake2Opts(outputLen, opts = {}, keyLen, saltLen, persLen) {
  anumber(keyLen);
  if (outputLen <= 0 || outputLen > keyLen)
    throw new Error("outputLen bigger than keyLen");
  const { key, salt, personalization } = opts;
  if (key !== void 0 && (key.length < 1 || key.length > keyLen))
    throw new Error('"key" expected to be undefined or of length=1..' + keyLen);
  if (salt !== void 0)
    abytes(salt, saltLen, "salt");
  if (personalization !== void 0)
    abytes(personalization, persLen, "personalization");
}
var B2B_IV, BBUF, _BLAKE2, _BLAKE2b, blake2b;
var init_blake2 = __esm({
  "node_modules/.pnpm/@noble+hashes@2.2.0/node_modules/@noble/hashes/blake2.js"() {
    init_blake();
    init_u64();
    init_utils();
    B2B_IV = /* @__PURE__ */ Uint32Array.from([
      4089235720,
      1779033703,
      2227873595,
      3144134277,
      4271175723,
      1013904242,
      1595750129,
      2773480762,
      2917565137,
      1359893119,
      725511199,
      2600822924,
      4215389547,
      528734635,
      327033209,
      1541459225
    ]);
    BBUF = /* @__PURE__ */ new Uint32Array(32);
    _BLAKE2 = class {
      constructor(blockLen, outputLen) {
        __publicField(this, "buffer");
        __publicField(this, "buffer32");
        __publicField(this, "finished", false);
        __publicField(this, "destroyed", false);
        __publicField(this, "length", 0);
        __publicField(this, "pos", 0);
        __publicField(this, "blockLen");
        __publicField(this, "outputLen");
        __publicField(this, "canXOF", false);
        anumber(blockLen);
        anumber(outputLen);
        this.blockLen = blockLen;
        this.outputLen = outputLen;
        this.buffer = new Uint8Array(blockLen);
        this.buffer32 = u32(this.buffer);
      }
      update(data) {
        aexists(this);
        abytes(data);
        const { blockLen, buffer, buffer32 } = this;
        const len = data.length;
        const offset = data.byteOffset;
        const buf = data.buffer;
        for (let pos = 0; pos < len; ) {
          if (this.pos === blockLen) {
            swap32IfBE(buffer32);
            this.compress(buffer32, 0, false);
            swap32IfBE(buffer32);
            this.pos = 0;
          }
          const take = Math.min(blockLen - this.pos, len - pos);
          const dataOffset = offset + pos;
          if (take === blockLen && !(dataOffset % 4) && pos + take < len) {
            const data32 = new Uint32Array(buf, dataOffset, Math.floor((len - pos) / 4));
            swap32IfBE(data32);
            for (let pos32 = 0; pos + blockLen < len; pos32 += buffer32.length, pos += blockLen) {
              this.length += blockLen;
              this.compress(data32, pos32, false);
            }
            swap32IfBE(data32);
            continue;
          }
          buffer.set(data.subarray(pos, pos + take), this.pos);
          this.pos += take;
          this.length += take;
          pos += take;
        }
        return this;
      }
      digestInto(out) {
        aexists(this);
        aoutput(out, this);
        const { pos, buffer32 } = this;
        this.finished = true;
        clean(this.buffer.subarray(pos));
        swap32IfBE(buffer32);
        this.compress(buffer32, 0, true);
        swap32IfBE(buffer32);
        if (out.byteOffset & 3)
          throw new RangeError('"digestInto() output" expected 4-byte aligned byteOffset, got ' + out.byteOffset);
        const state = this.get();
        const out32 = u32(out);
        const full = Math.floor(this.outputLen / 4);
        for (let i = 0; i < full; i++)
          out32[i] = swap8IfBE(state[i]);
        const tail = this.outputLen % 4;
        if (!tail)
          return;
        const off = full * 4;
        const word = state[full];
        for (let i = 0; i < tail; i++)
          out[off + i] = word >>> 8 * i;
      }
      digest() {
        const { buffer, outputLen } = this;
        this.digestInto(buffer);
        const res = buffer.slice(0, outputLen);
        this.destroy();
        return res;
      }
      _cloneInto(to) {
        const { buffer, length, finished, destroyed, outputLen, pos } = this;
        to ||= new this.constructor({ dkLen: outputLen });
        to.set(...this.get());
        to.buffer.set(buffer);
        to.destroyed = destroyed;
        to.finished = finished;
        to.length = length;
        to.pos = pos;
        to.outputLen = outputLen;
        return to;
      }
      clone() {
        return this._cloneInto();
      }
    };
    _BLAKE2b = class extends _BLAKE2 {
      constructor(opts = {}) {
        const olen = opts.dkLen === void 0 ? 64 : opts.dkLen;
        super(128, olen);
        // Same IV words as SHA-512 / BLAKE2b, encoded as LE u32 low/high halves.
        __publicField(this, "v0l", B2B_IV[0] | 0);
        __publicField(this, "v0h", B2B_IV[1] | 0);
        __publicField(this, "v1l", B2B_IV[2] | 0);
        __publicField(this, "v1h", B2B_IV[3] | 0);
        __publicField(this, "v2l", B2B_IV[4] | 0);
        __publicField(this, "v2h", B2B_IV[5] | 0);
        __publicField(this, "v3l", B2B_IV[6] | 0);
        __publicField(this, "v3h", B2B_IV[7] | 0);
        __publicField(this, "v4l", B2B_IV[8] | 0);
        __publicField(this, "v4h", B2B_IV[9] | 0);
        __publicField(this, "v5l", B2B_IV[10] | 0);
        __publicField(this, "v5h", B2B_IV[11] | 0);
        __publicField(this, "v6l", B2B_IV[12] | 0);
        __publicField(this, "v6h", B2B_IV[13] | 0);
        __publicField(this, "v7l", B2B_IV[14] | 0);
        __publicField(this, "v7h", B2B_IV[15] | 0);
        checkBlake2Opts(olen, opts, 64, 16, 16);
        let { key, personalization, salt } = opts;
        let keyLength = 0;
        if (key !== void 0) {
          abytes(key, void 0, "key");
          keyLength = key.length;
        }
        this.v0l ^= this.outputLen | keyLength << 8 | 1 << 16 | 1 << 24;
        if (salt !== void 0) {
          abytes(salt, void 0, "salt");
          const slt = u32(salt);
          this.v4l ^= swap8IfBE(slt[0]);
          this.v4h ^= swap8IfBE(slt[1]);
          this.v5l ^= swap8IfBE(slt[2]);
          this.v5h ^= swap8IfBE(slt[3]);
        }
        if (personalization !== void 0) {
          abytes(personalization, void 0, "personalization");
          const pers = u32(personalization);
          this.v6l ^= swap8IfBE(pers[0]);
          this.v6h ^= swap8IfBE(pers[1]);
          this.v7l ^= swap8IfBE(pers[2]);
          this.v7h ^= swap8IfBE(pers[3]);
        }
        if (key !== void 0) {
          const tmp = new Uint8Array(this.blockLen);
          tmp.set(key);
          this.update(tmp);
        }
      }
      // prettier-ignore
      get() {
        let { v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h } = this;
        return [v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h];
      }
      // prettier-ignore
      set(v0l, v0h, v1l, v1h, v2l, v2h, v3l, v3h, v4l, v4h, v5l, v5h, v6l, v6h, v7l, v7h) {
        this.v0l = v0l | 0;
        this.v0h = v0h | 0;
        this.v1l = v1l | 0;
        this.v1h = v1h | 0;
        this.v2l = v2l | 0;
        this.v2h = v2h | 0;
        this.v3l = v3l | 0;
        this.v3h = v3h | 0;
        this.v4l = v4l | 0;
        this.v4h = v4h | 0;
        this.v5l = v5l | 0;
        this.v5h = v5h | 0;
        this.v6l = v6l | 0;
        this.v6h = v6h | 0;
        this.v7l = v7l | 0;
        this.v7h = v7h | 0;
      }
      compress(msg, offset, isLast) {
        this.get().forEach((v, i) => BBUF[i] = v);
        BBUF.set(B2B_IV, 16);
        let { h, l } = fromBig(BigInt(this.length));
        BBUF[24] = B2B_IV[8] ^ l;
        BBUF[25] = B2B_IV[9] ^ h;
        if (isLast) {
          BBUF[28] = ~BBUF[28];
          BBUF[29] = ~BBUF[29];
        }
        let j = 0;
        const s = BSIGMA;
        for (let i = 0; i < 12; i++) {
          G1b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
          G2b(0, 4, 8, 12, msg, offset + 2 * s[j++]);
          G1b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
          G2b(1, 5, 9, 13, msg, offset + 2 * s[j++]);
          G1b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
          G2b(2, 6, 10, 14, msg, offset + 2 * s[j++]);
          G1b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
          G2b(3, 7, 11, 15, msg, offset + 2 * s[j++]);
          G1b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
          G2b(0, 5, 10, 15, msg, offset + 2 * s[j++]);
          G1b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
          G2b(1, 6, 11, 12, msg, offset + 2 * s[j++]);
          G1b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
          G2b(2, 7, 8, 13, msg, offset + 2 * s[j++]);
          G1b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
          G2b(3, 4, 9, 14, msg, offset + 2 * s[j++]);
        }
        this.v0l ^= BBUF[0] ^ BBUF[16];
        this.v0h ^= BBUF[1] ^ BBUF[17];
        this.v1l ^= BBUF[2] ^ BBUF[18];
        this.v1h ^= BBUF[3] ^ BBUF[19];
        this.v2l ^= BBUF[4] ^ BBUF[20];
        this.v2h ^= BBUF[5] ^ BBUF[21];
        this.v3l ^= BBUF[6] ^ BBUF[22];
        this.v3h ^= BBUF[7] ^ BBUF[23];
        this.v4l ^= BBUF[8] ^ BBUF[24];
        this.v4h ^= BBUF[9] ^ BBUF[25];
        this.v5l ^= BBUF[10] ^ BBUF[26];
        this.v5h ^= BBUF[11] ^ BBUF[27];
        this.v6l ^= BBUF[12] ^ BBUF[28];
        this.v6h ^= BBUF[13] ^ BBUF[29];
        this.v7l ^= BBUF[14] ^ BBUF[30];
        this.v7h ^= BBUF[15] ^ BBUF[31];
        clean(BBUF);
      }
      destroy() {
        this.destroyed = true;
        clean(this.buffer32);
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
      }
    };
    blake2b = /* @__PURE__ */ createHasher((opts) => new _BLAKE2b(opts));
  }
});

// src/utils/secret.ts
var secret_exports = {};
__export(secret_exports, {
  encryptGitHubSecret: () => encryptGitHubSecret
});
function encryptGitHubSecret(value, publicKey) {
  if (!value) {
    throw new Error("A GitHub Actions secret cannot be empty.");
  }
  const recipient = base64ToBytes(publicKey);
  const ephemeral = import_tweetnacl.default.box.keyPair();
  const material = new Uint8Array(64);
  material.set(ephemeral.publicKey);
  material.set(recipient, 32);
  const nonce = blake2b(material, { dkLen: 24 });
  const message = new TextEncoder().encode(value);
  const ciphertext = import_tweetnacl.default.box(message, nonce, recipient, ephemeral.secretKey);
  const sealed = new Uint8Array(ephemeral.publicKey.length + ciphertext.length);
  sealed.set(ephemeral.publicKey);
  sealed.set(ciphertext, ephemeral.publicKey.length);
  return bytesToBase64(sealed);
}
function base64ToBytes(input) {
  const binary2 = atob(input);
  const bytes = new Uint8Array(binary2.length);
  for (let index = 0; index < binary2.length; index += 1) {
    bytes[index] = binary2.charCodeAt(index);
  }
  return bytes;
}
function bytesToBase64(content) {
  const bytes = content instanceof Uint8Array ? content : new Uint8Array(content);
  let binary2 = "";
  const chunkSize = 32768;
  for (let offset = 0; offset < bytes.byteLength; offset += chunkSize) {
    binary2 += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
  }
  return btoa(binary2);
}
var import_tweetnacl;
var init_secret = __esm({
  "src/utils/secret.ts"() {
    "use strict";
    import_tweetnacl = __toESM(require_nacl_fast());
    init_blake2();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => VitePressButterflyPublisher
});
module.exports = __toCommonJS(main_exports);
var import_obsidian9 = require("obsidian");

// src/settings.ts
var DEFAULT_SETTINGS = {
  pat: "",
  repoName: "",
  blogRepoName: "",
  pendingArticleRepo: "",
  pendingBlogRepo: "",
  vercelToken: "",
  vercelOrgId: "",
  vercelProjectId: "",
  githubConnection: null,
  initialization: null,
  lastDeploy: null,
  lastGitSyncAt: null
};

// src/services/blog.ts
var import_obsidian3 = require("obsidian");

// src/services/github.ts
var import_obsidian = require("obsidian");
var API_URL = "https://api.github.com";
var API_VERSION = "2022-11-28";
var REQUEST_TIMEOUT_MS = 15e3;
var GitHubApiError = class extends Error {
  constructor(message, status, url) {
    super(message);
    this.status = status;
    this.url = url;
    this.name = "GitHubApiError";
  }
};
var GitHubRequestTimeoutError = class extends Error {
  constructor(timeoutMs, url) {
    super(`\u8FDE\u63A5 GitHub \u8D85\u65F6\uFF08${Math.round(timeoutMs / 1e3)} \u79D2\uFF09\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\u3002`);
    this.timeoutMs = timeoutMs;
    this.url = url;
    this.name = "GitHubRequestTimeoutError";
  }
};
var GitHubClient = class {
  constructor(token) {
    this.token = token.trim();
    if (!this.token) {
      throw new Error("\u8BF7\u5148\u586B\u5199 GitHub PAT\u3002");
    }
  }
  getAuthenticatedUser() {
    if (!this.authenticatedUser) {
      this.authenticatedUser = this.loadAuthenticatedUser().catch((error) => {
        this.authenticatedUser = void 0;
        throw error;
      });
    }
    return this.authenticatedUser;
  }
  async loadAuthenticatedUser() {
    const user = await this.request("/user");
    return {
      login: user.login,
      avatarUrl: user.avatar_url,
      htmlUrl: user.html_url
    };
  }
  async getRepository(repository) {
    const result = await this.request(this.repositoryPath(repository));
    return this.toRepository(result);
  }
  /**
   * Lists workflow runs, optionally filtered to one workflow path (for
   * example the Deploy Site workflow). The blog repository also runs a
   * Setup Blog workflow, so path filtering is required to avoid treating
   * unrelated CI runs as deployments.
   */
  async getWorkflowRuns(repository, options = {}) {
    const result = await this.request(
      `${this.repositoryPath(repository)}/actions/runs`,
      { query: { branch: options.branch, per_page: options.perPage } }
    );
    const runs = (result.workflow_runs ?? []).filter((run) => !options.path || run.path === options.path).map((run) => ({
      id: run.id,
      name: run.name,
      path: run.path,
      status: run.status,
      conclusion: run.conclusion,
      htmlUrl: run.html_url,
      createdAt: run.created_at,
      updatedAt: run.updated_at
    }));
    return runs;
  }
  /** Latest commit of a branch, including its tree for theme updates. */
  async getBranchHead(repository, branch) {
    const result = await this.request(
      `${this.repositoryPath(repository)}/commits/${encodeURIComponent(branch)}`
    );
    return { sha: result.sha, treeSha: result.commit.tree.sha };
  }
  /** Reads a file from the default branch; contents API returns base64. */
  async getFileContent(repository, path) {
    return this.request(
      `${this.repositoryPath(repository)}/contents/${encodeURIComponent(path)}`
    );
  }
  /** Finds a workflow id by its file path, or null when missing. */
  /** Triggers a workflow_dispatch run on the given branch. */
  /** Creates or updates a file via the contents API; pass sha to update. */
  async writeFileContent(repository, path, content, message, sha) {
    await this.request(
      `${this.repositoryPath(repository)}/contents/${encodeURIComponent(path)}`,
      {
        method: "PUT",
        body: {
          message,
          content: btoa(content),
          ...sha ? { sha } : {}
        }
      }
    );
  }
  /** Force-updates an existing branch or creates it when the repository is empty. */
  async forceUpdateBranch(repository, branch, sha) {
    try {
      await this.request(this.branchRefsPath(repository, branch), {
        method: "PATCH",
        body: { sha, force: true }
      });
    } catch (error) {
      if (!(error instanceof GitHubApiError && error.status === 404)) {
        throw error;
      }
      await this.request(`${this.repositoryPath(repository)}/git/refs`, {
        method: "POST",
        body: { ref: `refs/heads/${branch}`, sha }
      });
    }
  }
  async deleteBranch(repository, branch) {
    await this.request(this.branchRefsPath(repository, branch), { method: "DELETE" });
  }
  async createRepository(options) {
    const result = await this.request("/user/repos", {
      method: "POST",
      body: {
        name: options.name,
        private: options.private,
        auto_init: options.autoInit ?? true
      }
    });
    return this.toRepository(result);
  }
  /** Writes all secrets using one public-key request; retries are safe. */
  async setActionsSecrets(repository, secrets) {
    const key = await this.request(
      `${this.repositoryPath(repository)}/actions/secrets/public-key`
    );
    const { encryptGitHubSecret: encryptGitHubSecret2 } = await Promise.resolve().then(() => (init_secret(), secret_exports));
    await Promise.all(
      Object.entries(secrets).map(async ([name, value]) => {
        const encryptedValue = encryptGitHubSecret2(value, key.key);
        await this.request(
          `${this.repositoryPath(repository)}/actions/secrets/${encodeURIComponent(name)}`,
          {
            method: "PUT",
            body: {
              encrypted_value: encryptedValue,
              key_id: key.key_id
            }
          }
        );
      })
    );
  }
  /** Creates the Pages site when missing and selects GitHub Actions. */
  async configurePages(repository) {
    const path = `${this.repositoryPath(repository)}/pages`;
    try {
      await this.request(path);
      await this.request(path, {
        method: "PUT",
        body: { build_type: "workflow" }
      });
    } catch (error) {
      if (error instanceof GitHubApiError && error.status === 404) {
        await this.request(path, {
          method: "POST",
          body: { build_type: "workflow" }
        });
        return;
      }
      throw error;
    }
  }
  async dispatchRepositoryEvent(repository, eventType) {
    await this.request(`${this.repositoryPath(repository)}/dispatches`, {
      method: "POST",
      body: { event_type: eventType }
    });
  }
  repositoryPath(repository) {
    if (!repository.owner || !repository.name) {
      throw new Error("GitHub \u4ED3\u5E93\u5FC5\u987B\u5305\u542B\u7528\u6237\u540D\u548C\u4ED3\u5E93\u540D\u3002");
    }
    return `/repos/${encodeURIComponent(repository.owner)}/${encodeURIComponent(repository.name)}`;
  }
  branchRefsPath(repository, branch) {
    return `${this.repositoryPath(repository)}/git/refs/heads/${encodeURIComponent(branch)}`;
  }
  /** Latest release metadata and its asset names with browser download URLs. */
  async getLatestRelease(repository) {
    const result = await this.request(
      `${this.repositoryPath(repository)}/releases/latest`
    );
    return {
      tagName: result.tag_name,
      assets: result.assets.map((asset) => ({
        name: asset.name,
        downloadUrl: asset.browser_download_url
      }))
    };
  }
  /**
   * Downloads a public release asset (text) by its browser download URL.
   * Uses Obsidian's requestUrl: the asset redirects to object storage which
   * has no CORS headers, so a renderer-process fetch would be blocked.
   */
  async downloadReleaseAsset(url) {
    try {
      const response = await (0, import_obsidian.requestUrl)({ url, throw: false });
      if (response.status < 200 || response.status >= 300) {
        throw new GitHubApiError(`\u4E0B\u8F7D\u63D2\u4EF6\u6587\u4EF6\u5931\u8D25\uFF08HTTP ${response.status}\uFF09\u3002`, response.status, url);
      }
      return response.text;
    } catch (error) {
      if (error instanceof GitHubApiError) {
        throw error;
      }
      const timeout = error instanceof Error && /timeout|abort/i.test(error.message);
      if (timeout) {
        throw new GitHubRequestTimeoutError(REQUEST_TIMEOUT_MS, url);
      }
      const networkError = new Error("\u65E0\u6CD5\u4E0B\u8F7D\u63D2\u4EF6\u6587\u4EF6\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u540E\u91CD\u8BD5\u3002");
      networkError.cause = error;
      throw networkError;
    }
  }
  async request(path, options = {}) {
    const url = this.url(path, options.query);
    const controller = new AbortController();
    let timedOut = false;
    const timeout = window.setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, REQUEST_TIMEOUT_MS);
    try {
      const response = await fetch(url, {
        method: options.method ?? "GET",
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${this.token}`,
          "Content-Type": "application/json",
          "X-GitHub-Api-Version": API_VERSION
        },
        body: options.body === void 0 ? void 0 : JSON.stringify(options.body),
        signal: controller.signal
      });
      const text = await response.text();
      if (!response.ok) {
        throw new GitHubApiError(apiMessage(text, response.status), response.status, url);
      }
      if (response.status === 204 || text.length === 0) {
        return void 0;
      }
      try {
        return JSON.parse(text);
      } catch {
        throw new GitHubApiError("GitHub \u8FD4\u56DE\u4E86\u65E0\u6CD5\u89E3\u6790\u7684\u54CD\u5E94\u3002", response.status, url);
      }
    } catch (error) {
      if (error instanceof GitHubApiError) {
        throw error;
      }
      if (timedOut || isAbortError(error)) {
        throw new GitHubRequestTimeoutError(REQUEST_TIMEOUT_MS, url);
      }
      const networkError = new Error("\u65E0\u6CD5\u8FDE\u63A5 GitHub\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u3001\u4EE3\u7406\u6216 DNS \u540E\u91CD\u8BD5\u3002");
      networkError.cause = error;
      throw networkError;
    } finally {
      window.clearTimeout(timeout);
    }
  }
  url(path, query) {
    const url = new URL(path, API_URL);
    for (const [key, value] of Object.entries(query ?? {})) {
      if (value !== void 0) {
        url.searchParams.set(key, String(value));
      }
    }
    return url.toString();
  }
  toRepository(result) {
    return {
      id: result.id,
      name: result.name,
      fullName: result.full_name,
      private: result.private,
      defaultBranch: result.default_branch,
      htmlUrl: result.html_url
    };
  }
};
function isAbortError(error) {
  return error instanceof DOMException && error.name === "AbortError";
}
function apiMessage(body, status) {
  if (status === 401) {
    return "PAT \u65E0\u6548\u3001\u5DF2\u8FC7\u671F\u6216\u6743\u9650\u4E0D\u8DB3\u3002";
  }
  if (status === 403) {
    return "GitHub \u62D2\u7EDD\u8BBF\u95EE\uFF1B\u8BF7\u4F7F\u7528\u5177\u6709 repo + workflow \u6743\u9650\u7684 Classic PAT\u3002";
  }
  if (status === 404) {
    return "GitHub \u8D44\u6E90\u4E0D\u5B58\u5728\uFF0C\u6216\u5F53\u524D PAT \u65E0\u6743\u8BBF\u95EE\u3002";
  }
  if (status === 409) {
    return "\u5408\u5E76\u51B2\u7A81\uFF1A\u535A\u5BA2\u4ED3\u5E93\u4E0E\u4E3B\u9898\u5B58\u5728\u51B2\u7A81\uFF0C\u8BF7\u68C0\u67E5\u535A\u5BA2\u4ED3\u5E93\u662F\u5426\u6709\u81EA\u5B9A\u4E49\u4FEE\u6539\u3002";
  }
  if (status === 422) {
    return "\u4ED3\u5E93\u540D\u5DF2\u88AB\u5360\u7528\u6216\u8BF7\u6C42\u65E0\u6CD5\u5904\u7406\uFF0C\u8BF7\u68C0\u67E5\u4ED3\u5E93\u540D\u540E\u91CD\u8BD5\u3002";
  }
  try {
    const payload = JSON.parse(body);
    if (payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string") {
      return `GitHub \u8BF7\u6C42\u5931\u8D25\uFF1A${payload.message}`;
    }
  } catch {
  }
  return `GitHub \u8BF7\u6C42\u5931\u8D25\uFF08HTTP ${status}\uFF09\u3002`;
}

// src/services/vault-git.ts
var ObsidianGitVaultGit = class _ObsidianGitVaultGit {
  constructor(plugin, manager) {
    this.plugin = plugin;
    this.manager = manager;
  }
  static fromApp(app) {
    const plugin = app.plugins?.getPlugin("obsidian-git");
    if (!plugin) return null;
    return new _ObsidianGitVaultGit(plugin, plugin.gitManager);
  }
  get backend() {
    return this.manager?.git ? "native" : this.manager ? "isomorphic" : "unknown";
  }
  get isReady() {
    return Boolean(this.manager);
  }
  async ensureReady() {
    if (!this.plugin.localStorage) {
      throw new Error("obsidian-git \u5C1A\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u5148\u6253\u5F00\u4E00\u6B21 Git \u63D2\u4EF6\u8BBE\u7F6E\u6216\u91CD\u542F Obsidian\u3002");
    }
    if (!this.plugin.gitManager) {
      await this.plugin.init({ fromReload: true });
    }
    this.manager = this.plugin.gitManager;
    if (!this.manager) {
      throw new Error("\u65E0\u6CD5\u521D\u59CB\u5316 obsidian-git\uFF0C\u8BF7\u91CD\u542F Obsidian \u540E\u91CD\u8BD5\u3002");
    }
  }
  setCredentials(username, password) {
    this.plugin.localStorage?.setUsername(username);
    this.plugin.localStorage?.setPassword(password);
  }
  async init() {
    await this.requireManager().init();
  }
  async status() {
    return this.requireManager().status();
  }
  async commitAll(message) {
    await this.requireManager().commitAll({ message });
  }
  async pull() {
    await this.requireManager().pull();
  }
  async getUnpushedCommits() {
    return this.requireManager().getUnpushedCommits();
  }
  async fetch(remote) {
    await this.requireManager().fetch(remote);
  }
  /** Checks out a remote-tracking branch into the working tree. */
  async checkoutRemote(branch, remote) {
    await this.requireManager().checkout(branch, remote);
  }
  /** Switches to an existing local branch. */
  async checkout(branch) {
    await this.requireManager().checkout(branch);
  }
  async pushCurrent() {
    await this.requireManager().push();
  }
  async push(remote, localBranch, remoteBranch) {
    const manager = this.requireManager();
    if (manager.git) {
      await manager.git.push(remote, `${localBranch}:${remoteBranch}`);
      return;
    }
    await manager.updateUpstreamBranch(`${remote}/${remoteBranch}`);
  }
  async setRemote(remote, url) {
    await this.requireManager().setRemote(remote, url);
  }
  async setConfig(path, value) {
    await this.requireManager().setConfig(path, value);
  }
  async branchInfo() {
    return this.requireManager().branchInfo();
  }
  async createBranch(name) {
    await this.requireManager().createBranch(name);
  }
  async updateUpstreamBranch(tracking) {
    await this.requireManager().updateUpstreamBranch(tracking);
  }
  async resolveHead() {
    const manager = this.requireManager();
    const head = manager.resolveRef ? await manager.resolveRef("HEAD") : manager.git ? await manager.git.revparse(["--verify", "HEAD"]) : "";
    const normalized = head.trim();
    if (/^[0-9a-f]{40}$/i.test(normalized)) return normalized;
    throw new Error("\u65E0\u6CD5\u8BFB\u53D6\u672C\u5730 Git \u63D0\u4EA4\uFF0C\u8BF7\u91CD\u542F Obsidian \u540E\u91CD\u8BD5\u3002");
  }
  async hasCommit() {
    try {
      await this.resolveHead();
      return true;
    } catch {
      return false;
    }
  }
  async reload() {
    this.plugin.unloadPlugin?.();
    await this.plugin.init({ fromReload: true });
    this.manager = this.plugin.gitManager;
  }
  requireManager() {
    if (!this.manager) {
      throw new Error("Git \u5F15\u64CE\u5C1A\u672A\u5C31\u7EEA\uFF0C\u8BF7\u5148\u5728\u7B2C\u4E09\u65B9\u63D2\u4EF6\u4E2D\u542F\u7528 Git \u63D2\u4EF6\u3002");
    }
    return this.manager;
  }
};

// src/services/template.ts
var import_obsidian2 = require("obsidian");
var SITE_CONFIG_PATH = "site_config.yml";
var PUBLIC_DIR = "public";
var TRIGGER_WORKFLOW_PATH = ".github/workflows/trigger.yml";
var TRIGGER_WORKFLOW_YAML = `# Place this workflow in your content/wiki repository (not the blog repo).
name: Trigger Blog Rebuild

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  trigger:
    runs-on: ubuntu-latest
    steps:
      - name: Check blog repository is ready
        id: check
        env:
          PAT: \${{ secrets.PAT }}
          BLOG_REPO: \${{ secrets.BLOG_REPO }}
        run: |
          if [ -z "$PAT" ] || [ -z "$BLOG_REPO" ]; then
            echo "::notice::\u5C1A\u672A\u5B8C\u6210\u535A\u5BA2\u914D\u7F6E\uFF0C\u672C\u6B21\u63A8\u9001\u4E0D\u89E6\u53D1\u6784\u5EFA\u3002"
            exit 0
          fi

          if [[ ! "$BLOG_REPO" =~ ^[A-Za-z0-9_.-]+/[A-Za-z0-9_.-]+$ ]]; then
            echo "::warning::BLOG_REPO \u683C\u5F0F\u65E0\u6548\uFF0C\u672C\u6B21\u63A8\u9001\u4E0D\u89E6\u53D1\u6784\u5EFA\u3002"
            exit 0
          fi

          status="$(curl --silent --show-error --connect-timeout 5 --max-time 15 \\
            --output /dev/null --write-out '%{http_code}' \\
            --header 'Accept: application/vnd.github+json' \\
            --header "Authorization: Bearer $PAT" \\
            --header 'X-GitHub-Api-Version: 2022-11-28' \\
            "https://api.github.com/repos/$BLOG_REPO" || true)"
          if [ "$status" != "200" ]; then
            if [ "$status" = "404" ]; then
              echo "::notice::\u535A\u5BA2\u4ED3\u5E93\u5C1A\u672A\u5C31\u7EEA\uFF0C\u672C\u6B21\u63A8\u9001\u4E0D\u89E6\u53D1\u6784\u5EFA\u3002"
            else
              echo "::warning::\u65E0\u6CD5\u9A8C\u8BC1\u535A\u5BA2\u4ED3\u5E93\uFF08HTTP \${status:-network error}\uFF09\uFF0C\u8BF7\u68C0\u67E5 PAT \u6743\u9650\u6216\u7F51\u7EDC\u3002"
            fi
            exit 0
          fi

          echo "ready=true" >> "$GITHUB_OUTPUT"

      - name: Dispatch event to blog repo
        if: steps.check.outputs.ready == 'true'
        env:
          PAT: \${{ secrets.PAT }}
          BLOG_REPO: \${{ secrets.BLOG_REPO }}
        run: |
          status="$(curl --silent --show-error --connect-timeout 5 --max-time 15 \\
            --output /dev/null --write-out '%{http_code}' \\
            --request POST \\
            --header 'Accept: application/vnd.github+json' \\
            --header "Authorization: Bearer $PAT" \\
            --header 'Content-Type: application/json' \\
            --header 'X-GitHub-Api-Version: 2022-11-28' \\
            --data '{"event_type":"contents-updated"}' \\
            "https://api.github.com/repos/$BLOG_REPO/dispatches" || true)"

          if [ "$status" != "204" ]; then
            echo "::error::\u89E6\u53D1\u535A\u5BA2\u91CD\u5EFA\u5931\u8D25\uFF08HTTP \${status:-network error}\uFF09\uFF0C\u8BF7\u68C0\u67E5 PAT \u6743\u9650\u6216\u7F51\u7EDC\u3002"
            exit 1
          fi
`;
function defaultSiteConfigYaml(siteName) {
  const safeName = JSON.stringify(siteName);
  return `# Site information
site_name: ${safeName}
site_description: "\u8FD9\u662F\u4E00\u4E2A\u4F7F\u7528 VitePress \u6784\u5EFA\u7684\u535A\u5BA2\u7AD9\u70B9\u3002"
site_url: ""
lang: "zh-CN"
author: ""

# Visual experience
# Leave background empty for the built-in adaptive gradient, or use a HEX color or public asset path.
background: ""
bg_rainfall: false

# Home page
home:
  mainTitle: ${safeName}
  subTitles:
    - "\u5199 Markdown"
    - "\u63A8\u9001\u6587\u7AE0"
    - "\u81EA\u52A8\u4E0A\u7EBF"

# Post list
# sortMethod: "date" or "lastUpdated".
pageSize: 8
sortMethod: "date"

# Last updated display
lastUpdated:
  use: true

# Profile card
avatar: ""
name: ""
signature: ""
introduction: ""
socialLinks: []

# Navbar menu
# link uses site paths such as "/FriendLink/" or external URLs such as "https://example.com".
menuItems: []

# Navigation music player
# volume range: 0 ~ 1.
musicPlayer:
  enabled: false
  url: ""
  name: ""
  artist: ""
  cover: ""
  autoplay: false
  volume: 0.6

# Friend links page
friendlink: []

# Footer
footer:
  message: "Hello World!"
  copyright: "Powered by VitePress-Butterfly"
  createdTime: ""

# Comments powered by giscus.
# Fill these values from https://giscus.app.
comments:
  enabled: false
  host: "https://giscus.app"
  repo: ""
  repoId: ""
  category: "Announcements"
  categoryId: ""
  mapping: "title"
  strict: "0"
  reactionsEnabled: "1"
  emitMetadata: "0"
  inputPosition: "top"
  theme: "preferred_color_scheme"
  lang: "zh-CN"
  loading: "lazy"
`;
}
async function ensureTemplateFiles(app) {
  const vault = app.vault;
  const adapter = vault.adapter;
  const created = [];
  if (!await adapter.exists(SITE_CONFIG_PATH)) {
    const siteName = vault.getName().trim() || "My Blog";
    await vault.create(SITE_CONFIG_PATH, defaultSiteConfigYaml(siteName));
    created.push(SITE_CONFIG_PATH);
  }
  if (!await adapter.exists(`${PUBLIC_DIR}/.gitkeep`)) {
    if (!await adapter.exists(PUBLIC_DIR)) {
      await vault.createFolder(PUBLIC_DIR).catch(() => void 0);
    }
    await vault.create(`${PUBLIC_DIR}/.gitkeep`, "");
    created.push(`${PUBLIC_DIR}/.gitkeep`);
  }
  const workflowDir = ".github/workflows";
  if (!await adapter.exists(TRIGGER_WORKFLOW_PATH)) {
    if (!await adapter.exists(workflowDir)) {
      await vault.createFolder(workflowDir).catch(() => void 0);
    }
    await vault.create(TRIGGER_WORKFLOW_PATH, TRIGGER_WORKFLOW_YAML);
    created.push(TRIGGER_WORKFLOW_PATH);
  }
  if (created.length > 0) {
    new import_obsidian2.Notice(`\u5DF2\u521B\u5EFA\u6A21\u677F\u6587\u4EF6\uFF1A${created.join("\u3001")}`, 6e3);
  }
  return created;
}

// src/services/blog.ts
var PLUGIN_DIR = ".obsidian/plugins/vitepress-butterfly-publisher";
var PLUGIN_FILES = ["main.js", "manifest.json", "styles.css"];
var THEME_SOURCE_REPO = {
  owner: "57Darling02",
  name: "VitePress_butterfly"
};
var DEFAULT_BRANCH = "main";
var DEPLOY_WORKFLOW_PATH = ".github/workflows/deploy.yml";
var THEME_REF_PLACEHOLDER = "THEME_REF_PLACEHOLDER";
var BLOG_WORKFLOW_YAML = `name: Deploy Site
on:
  push:
    branches: [main]
  workflow_dispatch:
  repository_dispatch:
    types: [contents-updated]
permissions:
  contents: read
  pages: write
  id-token: write
concurrency:
  group: site-deploy
  cancel-in-progress: true
env:
  VERCEL_ORG_ID: \${ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: \${ secrets.VERCEL_PROJECT_ID }}
jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: \${ steps.deployment.outputs.page_url }}
    steps:
      - name: Check readiness
        id: readiness
        env:
          WIKI_URL: \${ secrets.WIKI_URL }}
          PAT: \${ secrets.PAT }}
        run: |
          if [ -z "$WIKI_URL" ] || [ -z "$PAT" ]; then
            echo "ready=false" >> "$GITHUB_OUTPUT"
            exit 0
          fi
          wiki_url="\${WIKI_URL%/}"
          if [[ ! "$wiki_url" =~ ^https://github\\.com/([A-Za-z0-9_.-]+)/([A-Za-z0-9_.-]+)(\\.git)?$ ]]; then
            echo "ready=false" >> "$GITHUB_OUTPUT"
            exit 0
          fi
          owner="\${BASH_REMATCH[1]}"
          repository="\${BASH_REMATCH[2]%.git}"
          status="000"
          for attempt in {1..5}; do
            status="$(curl --silent --show-error --connect-timeout 5 --max-time 15               --output /dev/null --write-out '%{http_code}'               --header 'Accept: application/vnd.github+json'               --header "Authorization: Bearer $PAT"               "https://api.github.com/repos/$owner/$repository/git/ref/heads/main" || true)"
            if [ "$status" = "200" ]; then
              echo "ready=true" >> "$GITHUB_OUTPUT"
              exit 0
            fi
            if [ "$attempt" -lt 5 ]; then
              sleep 2
            fi
          done
          echo "ready=false" >> "$GITHUB_OUTPUT"
      - name: Checkout theme
        if: steps.readiness.outputs.ready == 'true'
        uses: actions/checkout@v4
        with:
          repository: 57Darling02/VitePress_butterfly
          ref: ${THEME_REF_PLACEHOLDER}
          path: theme
      - name: Install pnpm
        if: steps.readiness.outputs.ready == 'true'
        uses: pnpm/action-setup@v3
        with:
          version: 9.15.0
      - name: Setup Node
        if: steps.readiness.outputs.ready == 'true'
        uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: pnpm
          cache-dependency-path: theme/pnpm-lock.yaml
      - name: Install dependencies
        if: steps.readiness.outputs.ready == 'true'
        run: pnpm --dir theme install --frozen-lockfile
      - name: Build with VitePress
        if: steps.readiness.outputs.ready == 'true'
        env:
          WIKI_URL: \${ secrets.WIKI_URL }}
          PAT: \${ secrets.PAT }}
        run: pnpm --dir theme docs:build
      - name: Upload Pages artifact
        if: steps.readiness.outputs.ready == 'true'
        uses: actions/upload-pages-artifact@v3
        with:
          path: theme/.vitepress/dist
      - name: Deploy to GitHub Pages
        id: deployment
        if: steps.readiness.outputs.ready == 'true'
        uses: actions/deploy-pages@v4
      - name: Upload site artifact
        if: steps.readiness.outputs.ready == 'true'
        uses: actions/upload-artifact@v4
        with:
          name: site-dist
          path: theme/.vitepress/dist
          retention-days: 7
      - name: Check Vercel config
        if: steps.readiness.outputs.ready == 'true'
        id: vercel
        env:
          VERCEL_TOKEN: \${ secrets.VERCEL_TOKEN }}
          VERCEL_ORG_ID: \${ secrets.VERCEL_ORG_ID }}
          VERCEL_PROJECT_ID: \${ secrets.VERCEL_PROJECT_ID }}
        run: |
          if [ -n "$VERCEL_TOKEN" ] && [ -n "$VERCEL_ORG_ID" ] && [ -n "$VERCEL_PROJECT_ID" ]; then
            echo "enabled=true" >> "$GITHUB_OUTPUT"
          else
            echo "enabled=false" >> "$GITHUB_OUTPUT"
          fi
      - name: Deploy to Vercel (optional)
        if: steps.readiness.outputs.ready == 'true' && steps.vercel.outputs.enabled == 'true'
        run: |
          npx vercel deploy --prod --yes --token=\${ secrets.VERCEL_TOKEN }} theme/.vitepress/dist
`;
var BlogService = class {
  constructor(deps) {
    this.deps = deps;
    this.verifiedPat = "";
  }
  /** Validates the PAT, persists the GitHub connection and syncs credentials. */
  async checkPat() {
    const settings = this.requirePat("\u68C0\u6D4B\u8FDE\u901A\u6027");
    const pat = settings.pat.trim();
    this.verifiedPat = "";
    const client = this.client(true);
    const user = await client.getAuthenticatedUser();
    if (this.deps.getSettings().pat.trim() !== pat) {
      throw new Error("PAT \u5DF2\u5728\u68C0\u6D4B\u8FC7\u7A0B\u4E2D\u4FEE\u6539\uFF0C\u8BF7\u91CD\u65B0\u68C0\u6D4B\u3002");
    }
    this.verifiedPat = pat;
    await this.deps.saveSettings({
      githubConnection: { login: user.login, verifiedAt: Date.now() }
    });
    this.getGitEngine()?.setCredentials(user.login, pat);
    return {
      login: user.login,
      suggestedArticleRepoName: sanitizeRepoName(this.deps.app.vault.getName(), "my-blog-wiki"),
      suggestedBlogRepoName: `${user.login}.github.io`
    };
  }
  invalidatePat() {
    this.verifiedPat = "";
    this.cachedClient = void 0;
  }
  // ------------------------------------------------------------------
  // Repository checks (read-only).
  // ------------------------------------------------------------------
  async checkArticleRepository() {
    const settings = this.requireConnectedRepositoryNames("\u68C0\u6D4B\u6587\u7AE0\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const article = { owner: user.login, name: validateRepoName(settings.repoName, "\u6587\u7AE0\u4ED3\u5E93") };
    return this.probeRepository(client, article, settings.pendingArticleRepo);
  }
  async checkBlogRepository() {
    const settings = this.requireConnectedRepositoryNames("\u68C0\u6D4B\u535A\u5BA2\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const blog = { owner: user.login, name: validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93") };
    return this.probeRepository(client, blog, settings.pendingBlogRepo);
  }
  async probeRepository(client, repository, pendingMarker) {
    try {
      const info = await client.getRepository(repository);
      return {
        exists: true,
        repository,
        private: info.private,
        pendingResume: pendingMarker === repositoryFullName(repository)
      };
    } catch (error) {
      if (error instanceof GitHubApiError && error.status === 404) {
        return { exists: false, repository, private: false, pendingResume: false };
      }
      throw error;
    }
  }
  // ------------------------------------------------------------------
  // Article repository.
  // ------------------------------------------------------------------
  /** Existing article repository: overwrite its main branch and configure it. */
  async configureArticleRepository() {
    return this.syncArticleRepository();
  }
  /**
   * Compares the local plugin version with the version published in the
   * theme repository's latest release (the plugin's distribution source).
   */
  async checkPluginUpdate() {
    const settings = this.requirePat("\u66F4\u65B0\u63D2\u4EF6");
    const client = this.client();
    const release = await client.getLatestRelease(THEME_SOURCE_REPO);
    const manifestAsset = release.assets.find((asset) => asset.name === "manifest.json");
    if (!manifestAsset) {
      throw new Error("\u4E3B\u9898\u4ED3\u5E93\u6700\u65B0 Release \u7F3A\u5C11 manifest.json \u8D44\u4EA7\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002");
    }
    const manifestText = await client.downloadReleaseAsset(manifestAsset.downloadUrl);
    const remoteVersion = parseManifestVersion(manifestText);
    return {
      latest: remoteVersion === this.deps.pluginVersion,
      current: this.deps.pluginVersion,
      latestVersion: remoteVersion
    };
  }
  /**
   * Downloads the plugin runtime files (main.js / manifest.json / styles.css)
   * from the article repository and writes them into the plugin directory.
   * data.json is never touched, so local settings survive.
   */
  /**
   * True when the configured blog repository IS the theme source repo
   * (demo-site mode): theme updates must stay disabled, because they would
   * rewrite the demo site's full deploy workflow into the shell template
   * (its GitHub Pages is not enabled).
   */
  isBlogThemeSource() {
    const settings = this.deps.getSettings();
    const login = settings.githubConnection?.login ?? "";
    return settings.blogRepoName.trim().toLowerCase() === THEME_SOURCE_REPO.name.toLowerCase() && (login === "" || login.toLowerCase() === THEME_SOURCE_REPO.owner.toLowerCase());
  }
  async updatePlugin() {
    const settings = this.requirePat("\u66F4\u65B0\u63D2\u4EF6");
    const client = this.client();
    const release = await client.getLatestRelease(THEME_SOURCE_REPO);
    for (const file of PLUGIN_FILES) {
      const asset = release.assets.find((candidate) => candidate.name === file);
      if (!asset) {
        throw new Error(`\u4E3B\u9898\u4ED3\u5E93\u6700\u65B0 Release \u7F3A\u5C11 ${file} \u8D44\u4EA7\uFF0C\u8BF7\u7A0D\u540E\u91CD\u8BD5\u3002`);
      }
      const text = await client.downloadReleaseAsset(asset.downloadUrl);
      await this.deps.app.vault.adapter.write(`${PLUGIN_DIR}/${file}`, text);
    }
  }
  /**
   * Creates the template files (site_config.yml, public/, trigger workflow)
   * so a fresh vault can publish without the template repository. Idempotent.
   */
  async ensureTemplateFiles() {
    return ensureTemplateFiles(this.deps.app);
  }
  /**
   * Reports whether the local article repository already has commit history.
   * A vault opened from a ZIP download has no Git history at all.
   */
  async checkLocalArticleGit() {
    const settings = this.requireConnectedRepositoryNames("\u68C0\u6D4B\u672C\u5730 Git");
    const user = await this.client().getAuthenticatedUser();
    const article = { owner: user.login, name: validateRepoName(settings.repoName, "\u6587\u7AE0\u4ED3\u5E93") };
    const git = this.getGitEngine();
    if (!git) {
      return { hasHistory: false };
    }
    try {
      await git.ensureReady();
      return { hasHistory: await git.hasCommit() };
    } catch {
      return { hasHistory: false };
    }
  }
  /**
   * Pulls an existing article repository into a vault that has no Git
   * history (for example after unzipping the template). It initializes Git,
   * pins origin to the authenticated URL, fetches and checks out the remote
   * main branch: files that exist locally are replaced by the remote
   * version, while files that only exist locally stay untouched.
   */
  async syncArticleFromRemote() {
    const settings = this.requireConnectedRepositoryNames("\u4ECE\u8FDC\u7AEF\u540C\u6B65\u6587\u7AE0\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const article = { owner: user.login, name: validateRepoName(settings.repoName, "\u6587\u7AE0\u4ED3\u5E93") };
    const git = await this.requireGitEngine(article, settings.pat);
    await git.init();
    await git.setRemote("origin", authenticatedGitHubUrl(article, settings.pat));
    await git.fetch("origin");
    await git.checkoutRemote(DEFAULT_BRANCH, "origin");
    await git.setConfig("branch.main.remote", "origin");
    await git.setConfig("branch.main.merge", `refs/heads/${DEFAULT_BRANCH}`);
    return { repository: article, created: false, initialized: true };
  }
  /** Existing article repository: update BLOG_REPO and PAT only. */
  async configureArticleSecretsOnly() {
    const settings = this.requireConnectedRepositoryNames("\u914D\u7F6E\u6587\u7AE0\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const article = { owner: user.login, name: validateRepoName(settings.repoName, "\u6587\u7AE0\u4ED3\u5E93") };
    const blogName = validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93");
    await this.ensureLocalRepository(article, settings.pat);
    await this.writeArticleSecrets(client, article, user.login, blogName, settings.pat);
    if (settings.pendingArticleRepo) {
      await this.deps.saveSettings({ pendingArticleRepo: "" });
    }
    return { repository: article, created: false, initialized: false };
  }
  /** Creates or force-syncs the article repository from the current Vault. */
  async createArticleRepository() {
    return this.syncArticleRepository();
  }
  /**
   * Prepares the local Git repository, writes secrets, then uploads or
   * force-syncs the current Vault to the target branch.
   */
  async syncArticleRepository() {
    const settings = this.requireConnectedRepositoryNames("\u914D\u7F6E\u6587\u7AE0\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const article = { owner: user.login, name: validateRepoName(settings.repoName, "\u6587\u7AE0\u4ED3\u5E93") };
    const blogName = validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93");
    const fullName = repositoryFullName(article);
    const pending = settings.pendingArticleRepo === fullName;
    const exists = await this.repositoryExists(client, article);
    const overwrite = exists && !pending;
    const git = await this.prepareLocalRepository(article, settings.pat);
    let created = false;
    if (!exists) {
      await this.deps.saveSettings({ pendingArticleRepo: fullName });
      try {
        await client.createRepository({
          name: article.name,
          private: true,
          autoInit: false
        });
        created = true;
      } catch (error) {
        if (!await this.createdDespiteError(client, article, error, pending)) {
          throw error;
        }
        created = true;
      }
    }
    await this.writeArticleSecrets(client, article, user.login, blogName, settings.pat);
    await this.pushPreparedLocalRepository(git, article, settings.pat, overwrite);
    await this.deps.saveSettings({ pendingArticleRepo: "" });
    return {
      repository: article,
      created,
      initialized: true
    };
  }
  async writeArticleSecrets(client, article, owner, blogName, pat) {
    try {
      await client.setActionsSecrets(article, {
        BLOG_REPO: `${owner}/${blogName}`,
        PAT: pat
      });
    } catch (error) {
      if (error instanceof GitHubApiError && error.status === 404) {
        throw new Error("\u6587\u7AE0\u4ED3\u5E93\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u8BBF\u95EE\uFF0C\u8BF7\u91CD\u65B0\u68C0\u6D4B\u540E\u518D\u8BD5\u3002");
      }
      throw error;
    }
  }
  // ------------------------------------------------------------------
  // Blog repository.
  // ------------------------------------------------------------------
  /** Existing blog repository: update WIKI_URL and PAT only. */
  /**
   * Existing blog repository, "follow" mode: rewrite its deploy workflow to
   * the latest shell template pinned to the current theme head (the blog is
   * a pure shell, so this is the whole content), then configure secrets,
   * Pages and dispatch a build. Old full-copy blogs are migrated in place.
   */
  async configureBlogRepository() {
    const settings = this.requireConnectedRepositoryNames("\u914D\u7F6E\u535A\u5BA2\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const articleName = validateRepoName(settings.repoName, "\u6587\u7AE0\u4ED3\u5E93");
    const blog = { owner: user.login, name: validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93") };
    const themeHead = await client.getBranchHead(THEME_SOURCE_REPO, DEFAULT_BRANCH);
    const shell = BLOG_WORKFLOW_YAML.replace(THEME_REF_PLACEHOLDER, themeHead.sha);
    const existing = await client.getFileContent(blog, DEPLOY_WORKFLOW_PATH).catch(() => null);
    if (!existing || decodeBase64(existing.content) !== shell) {
      await client.writeFileContent(
        blog,
        DEPLOY_WORKFLOW_PATH,
        shell,
        `chore: \u5BF9\u9F50\u58F3\u535A\u5BA2\uFF08\u9489\u5B9A\u4E3B\u9898 ${themeHead.sha.slice(0, 7)}\uFF09`,
        existing?.sha
      );
    }
    const vercel = this.readVercelSecrets(settings);
    const vercelConfigured = await this.writeBlogSecrets(
      client,
      blog,
      user.login,
      articleName,
      settings.pat,
      vercel
    );
    let warning;
    try {
      await client.configurePages(blog);
    } catch (error) {
      warning = `Pages \u672A\u80FD\u81EA\u52A8\u914D\u7F6E\uFF1A${errorMessage(error)}\u3002\u53EF\u7A0D\u540E\u5728 GitHub \u4ED3\u5E93 Settings \u2192 Pages \u4E2D\u9009\u62E9 GitHub Actions\u3002`;
    }
    return { repository: blog, created: false, initialized: true, warning, vercelConfigured };
  }
  /** Existing blog repository, "secrets only" mode: never touch content. */
  async configureBlogSecretsOnly() {
    const settings = this.requireConnectedRepositoryNames("\u914D\u7F6E\u535A\u5BA2\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const articleName = validateRepoName(settings.repoName, "\u6587\u7AE0\u4ED3\u5E93");
    const blog = { owner: user.login, name: validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93") };
    const vercel = this.readVercelSecrets(settings);
    const vercelConfigured = await this.writeBlogSecrets(
      client,
      blog,
      user.login,
      articleName,
      settings.pat,
      vercel
    );
    if (settings.pendingBlogRepo) {
      await this.deps.saveSettings({ pendingBlogRepo: "" });
    }
    return { repository: blog, created: false, initialized: false, warning: void 0, vercelConfigured };
  }
  /**
   * Missing blog repository: create it once from the official GitHub
   * template, then configure secrets, Pages and the first build. A previous
   * interrupted creation is resumed instead of duplicated.
   */
  async createBlogRepository() {
    const settings = this.requireConnectedRepositoryNames("\u521B\u5EFA\u535A\u5BA2\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const articleName = validateRepoName(settings.repoName, "\u6587\u7AE0\u4ED3\u5E93");
    const blog = { owner: user.login, name: validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93") };
    const fullName = repositoryFullName(blog);
    const pending = settings.pendingBlogRepo === fullName;
    let exists = await this.repositoryExists(client, blog);
    let created = false;
    if (exists && !pending) {
      throw new Error("\u535A\u5BA2\u4ED3\u5E93\u5DF2\u5B58\u5728\u3002\u8BF7\u91CD\u65B0\u68C0\u6D4B\uFF0C\u5E76\u9009\u62E9\u300C\u4EC5\u914D\u7F6E\u53D8\u91CF\u300D\uFF08\u4E0D\u4F1A\u4FEE\u6539\u4ED3\u5E93\u5185\u5BB9\uFF09\u3002");
    }
    if (!exists) {
      await this.deps.saveSettings({ pendingBlogRepo: fullName });
      try {
        await client.createRepository({ name: blog.name, private: false, autoInit: true });
        created = true;
      } catch (error) {
        if (!await this.createdDespiteError(client, blog, error, pending)) {
          throw error;
        }
        created = true;
      }
      const themeHead = await client.getBranchHead(THEME_SOURCE_REPO, DEFAULT_BRANCH);
      await client.writeFileContent(
        blog,
        DEPLOY_WORKFLOW_PATH,
        BLOG_WORKFLOW_YAML.replace(THEME_REF_PLACEHOLDER, themeHead.sha),
        `chore: \u521D\u59CB\u5316\u535A\u5BA2\u58F3\uFF08\u9489\u5B9A\u4E3B\u9898 ${themeHead.sha.slice(0, 7)}\uFF09`
      );
      exists = true;
    }
    const vercel = this.readVercelSecrets(settings);
    const vercelConfigured = await this.writeBlogSecrets(
      client,
      blog,
      user.login,
      articleName,
      settings.pat,
      vercel
    );
    let warning;
    if (created || pending) {
      try {
        await client.configurePages(blog);
      } catch (error) {
        warning = `Pages \u672A\u80FD\u81EA\u52A8\u914D\u7F6E\uFF1A${errorMessage(error)}\u3002\u53EF\u7A0D\u540E\u5728 GitHub \u4ED3\u5E93 Settings \u2192 Pages \u4E2D\u9009\u62E9 GitHub Actions\u3002`;
      }
      await this.deps.saveSettings({ pendingBlogRepo: "" });
    }
    return {
      repository: blog,
      created,
      initialized: created || pending,
      warning,
      vercelConfigured
    };
  }
  async writeBlogSecrets(client, blog, owner, articleName, pat, vercel) {
    const secrets = {
      WIKI_URL: `https://github.com/${owner}/${articleName}.git`,
      PAT: pat
    };
    if (vercel.token && vercel.orgId && vercel.projectId) {
      secrets.VERCEL_TOKEN = vercel.token;
      secrets.VERCEL_ORG_ID = vercel.orgId;
      secrets.VERCEL_PROJECT_ID = vercel.projectId;
    }
    try {
      await client.setActionsSecrets(blog, secrets);
    } catch (error) {
      if (error instanceof GitHubApiError && error.status === 404) {
        throw new Error("\u535A\u5BA2\u4ED3\u5E93\u4E0D\u5B58\u5728\u6216\u65E0\u6743\u8BBF\u95EE\uFF0C\u8BF7\u91CD\u65B0\u68C0\u6D4B\u540E\u518D\u8BD5\u3002");
      }
      throw error;
    }
    return Boolean(vercel.token && vercel.orgId && vercel.projectId);
  }
  readVercelSecrets(settings) {
    return {
      token: settings.vercelToken.trim(),
      orgId: settings.vercelOrgId.trim(),
      projectId: settings.vercelProjectId.trim()
    };
  }
  // ------------------------------------------------------------------
  // Shared helpers.
  // ------------------------------------------------------------------
  /**
   * Updates the blog to the current theme head by aligning its deploy
   * workflow with the latest shell template (the blog repository's only
   * file, pinned to the latest theme commit). Same implementation as the
   * "follow" mode during initialization; the contents-API push triggers the
   * deployment automatically. Pass an explicit ref to roll back to a
   * previous theme version.
   */
  async updateTheme(ref) {
    const settings = this.requireConnectedRepositoryNames("\u66F4\u65B0\u4E3B\u9898");
    if (this.isBlogThemeSource()) {
      throw new Error("\u5F53\u524D\u535A\u5BA2\u4ED3\u5E93\u5C31\u662F\u4E3B\u9898\u4ED3\u5E93\uFF08\u6F14\u793A\u7AD9\u6A21\u5F0F\uFF09\uFF0C\u4E3B\u9898\u66F4\u65B0\u5DF2\u7981\u7528\u3002");
    }
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const blog = { owner: user.login, name: validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93") };
    const themeHead = await client.getBranchHead(THEME_SOURCE_REPO, DEFAULT_BRANCH);
    const target = ref ?? themeHead.sha;
    const existing = await client.getFileContent(blog, DEPLOY_WORKFLOW_PATH).catch(() => null);
    if (!existing) {
      throw new Error("\u535A\u5BA2\u4ED3\u5E93\u7F3A\u5C11 .github/workflows/deploy.yml\uFF0C\u8BF7\u5148\u521D\u59CB\u5316\u535A\u5BA2\u4ED3\u5E93\u3002");
    }
    const content = decodeBase64(existing.content);
    if (!/ref:\s+[0-9a-f]{40}/.test(content)) {
      const shell = BLOG_WORKFLOW_YAML.replace(THEME_REF_PLACEHOLDER, target);
      await client.writeFileContent(
        blog,
        DEPLOY_WORKFLOW_PATH,
        shell,
        `chore: \u8FC1\u79FB\u4E3A\u58F3\u535A\u5BA2\uFF08\u9489\u5B9A\u4E3B\u9898 ${target.slice(0, 7)}\uFF09`,
        existing.sha
      );
      return { themeSha: target };
    }
    const updated = content.replace(/ref:\s+[0-9a-f]{40}/, `ref: ${target}`);
    if (updated === content) {
      throw new Error(`\u535A\u5BA2\u5DF2\u9489\u5728\u8BE5\u4E3B\u9898\u7248\u672C\uFF08${target.slice(0, 7)}\uFF09\uFF0C\u65E0\u9700\u66F4\u65B0\u3002`);
    }
    await client.writeFileContent(
      blog,
      DEPLOY_WORKFLOW_PATH,
      updated,
      `chore: \u66F4\u65B0\u4E3B\u9898\u5230 ${target.slice(0, 7)}`,
      existing.sha
    );
    return { themeSha: target };
  }
  /**
   * Dispatches a rebuild to the blog repository and returns the trigger
   * timestamp so the console can match the resulting workflow run.
   */
  async triggerDeploy() {
    const settings = this.requireConnectedPat("\u89E6\u53D1\u90E8\u7F72");
    const blogName = validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    await client.dispatchRepositoryEvent(
      { owner: user.login, name: blogName },
      "contents-updated"
    );
    return Date.now();
  }
  /** True when the console has finished repository initialization. */
  isInitialized() {
    const init = this.deps.getSettings().initialization;
    return Boolean(init && init.articleReady && init.blogReady && init.pagesReady && init.completedAt);
  }
  /** Lists recent Deploy Site runs from the blog repository. */
  async getDeploymentRuns() {
    const settings = this.requirePat("\u8BFB\u53D6\u90E8\u7F72\u72B6\u6001");
    const blogName = validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    return client.getWorkflowRuns(
      { owner: user.login, name: blogName },
      { branch: DEFAULT_BRANCH, path: DEPLOY_WORKFLOW_PATH, perPage: 20 }
    );
  }
  /** Ensures the blog repository serves GitHub Pages from GitHub Actions. */
  async ensurePagesConfigured() {
    const settings = this.requireConnectedRepositoryNames("\u914D\u7F6E Pages");
    const client = this.client();
    const user = await client.getAuthenticatedUser();
    const blog = { owner: user.login, name: validateRepoName(settings.blogRepoName, "\u535A\u5BA2\u4ED3\u5E93") };
    await client.configurePages(blog);
  }
  /**
   * Exposes the obsidian-git engine to the console. The returned adapter is
   * lazy and may still require `ensureReady()` before use.
   */
  getGitEngine() {
    if (!this.gitEngine) {
      this.gitEngine = ObsidianGitVaultGit.fromApp(this.deps.app);
    }
    return this.gitEngine;
  }
  async requireGitEngine(repository, pat) {
    const git = this.getGitEngine();
    if (!git) {
      throw new Error("\u672A\u68C0\u6D4B\u5230\u5DF2\u542F\u7528\u7684 obsidian-git\uFF0C\u8BF7\u5148\u5728\u7B2C\u4E09\u65B9\u63D2\u4EF6\u4E2D\u542F\u7528 Git \u63D2\u4EF6\u3002");
    }
    git.setCredentials(repository.owner, pat);
    await git.ensureReady();
    return git;
  }
  /**
   * Prepares the local Git repository without touching the remote content:
   * initializes Git, writes the committer identity, and pins the origin URL
   * to the authenticated PAT URL. Idempotent, safe on any device.
   */
  async ensureLocalRepository(repository, pat) {
    const git = await this.requireGitEngine(repository, pat);
    await git.init();
    await git.setConfig("user.name", repository.owner);
    await git.setConfig("user.email", `${repository.owner}@users.noreply.github.com`);
    await git.setRemote("origin", authenticatedGitHubUrl(repository, pat));
    if (!await git.hasCommit()) {
      throw new Error(
        "\u672C\u5730 Git \u8FD8\u6CA1\u6709\u63D0\u4EA4\u5386\u53F2\uFF1A\u8BF7\u5148 git clone \u6587\u7AE0\u4ED3\u5E93\u540E\u7528 Obsidian \u6253\u5F00\uFF0C\u6216\u5728\u521D\u59CB\u5316\u65B9\u6848\u4E2D\u52FE\u9009\u8986\u76D6\u540E\u91CD\u8BD5\u3002"
      );
    }
    const branch = await git.branchInfo();
    if (!branch.current) {
      throw new Error("\u672C\u5730 Git \u672A\u751F\u6210\u6709\u6548\u5206\u652F\uFF0C\u8BF7\u91CD\u542F Obsidian \u540E\u91CD\u8BD5\u3002");
    }
    return git;
  }
  async prepareLocalRepository(repository, pat) {
    const git = await this.requireGitEngine(repository, pat);
    await git.init();
    await git.setConfig("user.name", repository.owner);
    await git.setConfig("user.email", `${repository.owner}@users.noreply.github.com`);
    if (await git.hasCommit()) {
      const status = await git.status();
      if (status.all.length > 0) {
        await git.commitAll("Initialize article repository");
      }
    } else {
      try {
        await git.commitAll("Initialize article repository");
      } catch {
      }
    }
    if (!await git.hasCommit()) {
      throw new Error("\u5F53\u524D Vault \u6CA1\u6709\u53EF\u4E0A\u4F20\u7684\u6587\u4EF6\uFF0C\u8BF7\u81F3\u5C11\u4FDD\u7559\u4E00\u4E2A\u672A\u88AB .gitignore \u6392\u9664\u7684\u6587\u4EF6\u3002");
    }
    const branch = await git.branchInfo();
    if (!branch.current) {
      throw new Error("\u672C\u5730 Git \u672A\u751F\u6210\u6709\u6548\u5206\u652F\uFF0C\u8BF7\u91CD\u542F Obsidian \u540E\u91CD\u8BD5\u3002");
    }
    if (branch.current !== DEFAULT_BRANCH) {
      if (branch.branches.includes(DEFAULT_BRANCH)) {
        throw new Error(
          `\u5F53\u524D\u4F4D\u4E8E ${branch.current} \u5206\u652F\uFF0C\u4F46\u672C\u5730\u5DF2\u5B58\u5728 main \u5206\u652F\uFF1B\u8BF7\u5148\u5728 obsidian-git \u4E2D\u5207\u6362\u5230 main \u540E\u91CD\u8BD5\u3002`
        );
      }
      await git.createBranch(DEFAULT_BRANCH);
      await git.checkout(DEFAULT_BRANCH);
    }
    return git;
  }
  async pushPreparedLocalRepository(git, repository, pat, force) {
    try {
      await git.setRemote("origin", authenticatedGitHubUrl(repository, pat));
      if (force) {
        await this.forcePushPreparedLocalRepository(git, repository);
      } else {
        await git.updateUpstreamBranch(`origin/${DEFAULT_BRANCH}`);
      }
    } catch (error) {
      throw new Error(`\u6587\u7AE0\u4ED3\u5E93\u914D\u7F6E\u4E2D\u65AD\uFF1A${errorMessage(error)}\u3002\u8BF7\u76F4\u63A5\u91CD\u65B0\u70B9\u51FB\u914D\u7F6E\u6309\u94AE\u91CD\u8BD5\u3002`);
    }
    try {
      await git.reload();
    } catch {
      new import_obsidian3.Notice("\u6587\u7AE0\u5DF2\u4E0A\u4F20\uFF1Bobsidian-git \u5237\u65B0\u5931\u8D25\uFF0C\u8BF7\u7A0D\u540E\u91CD\u542F Obsidian\u3002", 8e3);
    }
  }
  /**
   * Uploads the local commit to a temporary branch, then force-updates main
   * through the GitHub ref API. This works with both obsidian-git's desktop
   * and mobile engines without bundling another Git implementation.
   */
  async forcePushPreparedLocalRepository(git, repository) {
    const localSha = await git.resolveHead();
    const temporaryBranch = `vpb-sync-${DEFAULT_BRANCH}-${localSha.slice(0, 12)}`;
    const client = this.client();
    try {
      await client.deleteBranch(repository, temporaryBranch).catch((error) => {
        if (!(error instanceof GitHubApiError && error.status === 404)) {
          throw error;
        }
      });
      await git.push("origin", DEFAULT_BRANCH, temporaryBranch);
      await client.forceUpdateBranch(repository, DEFAULT_BRANCH, localSha);
      await git.setConfig("branch.main.remote", "origin");
      await git.setConfig("branch.main.merge", `refs/heads/${DEFAULT_BRANCH}`);
    } finally {
      await client.deleteBranch(repository, temporaryBranch).catch(() => void 0);
    }
  }
  async createdDespiteError(client, repository, error, pending) {
    if (error instanceof GitHubApiError && error.status !== 422) {
      return false;
    }
    if (!pending) {
      return false;
    }
    await wait(600);
    try {
      return await this.repositoryExists(client, repository);
    } catch {
      return false;
    }
  }
  async repositoryExists(client, repository) {
    try {
      await client.getRepository(repository);
      return true;
    } catch (error) {
      if (error instanceof GitHubApiError && error.status === 404) {
        return false;
      }
      throw error;
    }
  }
  client(forceNew = false) {
    const { pat } = this.requirePat("\u64CD\u4F5C");
    const normalized = pat.trim();
    if (forceNew || !this.cachedClient || this.cachedClient.pat !== normalized) {
      this.cachedClient = { pat: normalized, client: new GitHubClient(normalized) };
    }
    return this.cachedClient.client;
  }
  requirePat(action) {
    const settings = this.deps.getSettings();
    if (!settings.pat.trim()) {
      throw new Error(`\u8BF7\u5148\u586B\u5199 GitHub PAT\uFF0C\u518D${action}\u3002`);
    }
    return settings;
  }
  requireConnectedPat(action) {
    const settings = this.requirePat(action);
    if (!settings.githubConnection) {
      throw new Error(`\u8BF7\u5148\u8FDE\u63A5 GitHub\uFF0C\u518D${action}\u3002`);
    }
    return settings;
  }
  requireConnectedRepositoryNames(action) {
    const settings = this.requireConnectedPat(action);
    if (!settings.repoName.trim()) {
      throw new Error("\u8BF7\u5148\u586B\u5199\u6587\u7AE0\u4ED3\u5E93\u540D\u3002");
    }
    if (!settings.blogRepoName.trim()) {
      throw new Error("\u8BF7\u5148\u586B\u5199\u535A\u5BA2\u4ED3\u5E93\u540D\u3002");
    }
    return settings;
  }
};
function validateRepoName(value, label) {
  const name = value.trim();
  if (!name) {
    throw new Error(`\u8BF7\u5148\u586B\u5199${label}\u540D\u3002`);
  }
  if (!/^[A-Za-z0-9._-]+$/.test(name)) {
    throw new Error(`${label}\u540D\u53EA\u80FD\u5305\u542B\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u70B9\u3001\u4E0B\u5212\u7EBF\u548C\u8FDE\u5B57\u7B26\u3002`);
  }
  return name;
}
function sanitizeRepoName(value, fallback) {
  const cleaned = value.trim().replace(/[^A-Za-z0-9._-]/g, "-").replace(/^-+|-+$/g, "");
  return cleaned || fallback;
}
function repositoryFullName(repository) {
  return `${repository.owner}/${repository.name}`;
}
function authenticatedGitHubUrl(repository, pat) {
  const owner = encodeURIComponent(repository.owner);
  const token = encodeURIComponent(pat);
  return `https://${owner}:${token}@github.com/${repository.owner}/${repository.name}.git`;
}
function errorMessage(error) {
  return error instanceof Error && error.message ? error.message : String(error);
}
function decodeBase64(value) {
  return atob(value.replace(/\s+/g, ""));
}
function parseManifestVersion(source) {
  try {
    const parsed = JSON.parse(source);
    return typeof parsed.version === "string" ? parsed.version : "";
  } catch {
    return "";
  }
}
function wait(durationMs) {
  return new Promise((resolve) => window.setTimeout(resolve, durationMs));
}

// src/ui/ConsoleView.ts
var import_obsidian8 = require("obsidian");

// src/services/deployment.ts
var DEPLOY_WORKFLOW_PATH2 = ".github/workflows/deploy.yml";
var ACTIVE_RUN_STATUSES = /* @__PURE__ */ new Set(["queued", "pending", "in_progress", "waiting", "requested"]);
var DeploymentMonitor = class {
  constructor(deps) {
    this.deps = deps;
  }
  getSnapshot() {
    const settings = this.deps.getSettings();
    if (!settings.githubConnection) {
      return {
        phase: "disconnected",
        title: "\u672A\u8FDE\u63A5 GitHub",
        detail: "\u8FDE\u63A5 GitHub \u540E\u5373\u53EF\u521B\u5EFA\u5E76\u914D\u7F6E\u6587\u7AE0\u4E0E\u535A\u5BA2\u4ED3\u5E93\u3002"
      };
    }
    const init = settings.initialization;
    if (!init) {
      return {
        phase: "uninitialized",
        title: "\u672A\u521D\u59CB\u5316",
        detail: "\u521D\u59CB\u5316\u535A\u5BA2\uFF0C\u5C06\u81EA\u52A8\u521B\u5EFA\u6216\u8FDE\u63A5\u6587\u7AE0\u4E0E\u535A\u5BA2\u4ED3\u5E93\u5E76\u89E6\u53D1\u9996\u6B21\u90E8\u7F72\u3002"
      };
    }
    if (!init.completedAt) {
      const done = [init.articleReady, init.blogReady, init.pagesReady, Boolean(init.deploymentTriggeredAt)].filter(Boolean).length;
      return {
        phase: "initializing",
        title: "\u521D\u59CB\u5316\u672A\u5B8C\u6210",
        detail: init.lastError ? `\u4E0A\u6B21\u4E2D\u65AD\uFF1A${init.lastError}` : `\u5DF2\u5B8C\u6210 ${done}/4 \u6B65\uFF0C\u70B9\u51FB\u7EE7\u7EED\u5B8C\u6210\u5269\u4F59\u6B65\u9AA4\u3002`,
        updatedAt: init.updatedAt
      };
    }
    const last = settings.lastDeploy;
    if (!last) {
      return {
        phase: "ready",
        title: "\u5DF2\u5C31\u7EEA",
        detail: "\u535A\u5BA2\u5DF2\u521D\u59CB\u5316\u3002\u63D0\u4EA4\u5E76\u63A8\u9001\u6587\u7AE0\uFF0C\u6216\u70B9\u51FB\u91CD\u65B0\u6784\u5EFA\u3002"
      };
    }
    return this.toSnapshot(last);
  }
  /** Records that a rebuild was requested (push or manual dispatch). */
  async recordTrigger(message, triggeredAt = Date.now()) {
    const settings = this.deps.getSettings();
    const login = settings.githubConnection?.login ?? "";
    const record = {
      repository: login ? `${login}/${settings.blogRepoName.trim()}` : settings.blogRepoName.trim(),
      workflow: DEPLOY_WORKFLOW_PATH2,
      status: "waiting",
      triggeredAt,
      updatedAt: Date.now(),
      message
    };
    await this.deps.saveSettings({ lastDeploy: record });
    return this.toSnapshot(record);
  }
  /**
   * Fetches the latest deployment run. Terminal states skip the network
   * unless `force` is set, so polling only queries GitHub while a build is
   * actually pending or running.
   */
  async refresh(force = false) {
    const settings = this.deps.getSettings();
    if (!settings.githubConnection || !this.deps.getBlog().isInitialized()) {
      return this.getSnapshot();
    }
    const last = settings.lastDeploy;
    if (!force && last && last.status !== "waiting" && last.status !== "building") {
      return this.getSnapshot();
    }
    try {
      const runs = await this.deps.getBlog().getDeploymentRuns();
      const since = last?.triggeredAt ?? 0;
      const run = since > 0 ? runs.find((candidate) => Date.parse(candidate.createdAt) >= since) ?? null : runs[0] ?? null;
      if (!run) {
        return this.getSnapshot();
      }
      const record = this.fromWorkflowRun(run, last);
      await this.deps.saveSettings({ lastDeploy: record });
      return this.toSnapshot(record);
    } catch (error) {
      if (last && (last.status === "waiting" || last.status === "building")) {
        return {
          ...this.toSnapshot(last),
          detail: `\u90E8\u7F72\u72B6\u6001\u6682\u65F6\u65E0\u6CD5\u83B7\u53D6\uFF1A${error instanceof Error ? error.message : String(error)}`
        };
      }
      return this.getSnapshot();
    }
  }
  fromWorkflowRun(run, last) {
    const settings = this.deps.getSettings();
    const login = settings.githubConnection?.login ?? "";
    const updatedAt = Date.parse(run.updatedAt) || Date.now();
    const base = {
      repository: login ? `${login}/${settings.blogRepoName.trim()}` : settings.blogRepoName.trim(),
      workflow: DEPLOY_WORKFLOW_PATH2,
      triggeredAt: last?.triggeredAt ?? updatedAt,
      updatedAt,
      runId: run.id,
      runUrl: run.htmlUrl,
      message: run.name
    };
    let status;
    if (ACTIVE_RUN_STATUSES.has(run.status)) {
      status = "building";
    } else if (run.status === "completed" && run.conclusion === "success") {
      status = "success";
    } else if (run.status === "completed" && run.conclusion === "cancelled") {
      status = "cancelled";
    } else if (run.status === "completed") {
      status = "failure";
    } else {
      status = "building";
    }
    return { ...base, status };
  }
  toSnapshot(record) {
    const common = {
      updatedAt: record.updatedAt,
      runId: record.runId,
      runUrl: record.runUrl
    };
    switch (record.status) {
      case "waiting":
        return {
          ...common,
          phase: "waiting",
          title: "\u7B49\u5F85\u6784\u5EFA",
          detail: record.message ? `\u5DF2\u8BF7\u6C42\u6784\u5EFA\uFF1A${record.message}` : "\u5DF2\u8BF7\u6C42\u6784\u5EFA\uFF0C\u7B49\u5F85 GitHub Actions \u5F00\u59CB\u3002"
        };
      case "building":
        return {
          ...common,
          phase: "building",
          title: "\u90E8\u7F72\u4E2D",
          detail: record.message ? `\u6B63\u5728\u6784\u5EFA\uFF1A${record.message}` : "GitHub Actions \u6B63\u5728\u6784\u5EFA\u7AD9\u70B9\u3002"
        };
      case "success":
        return {
          ...common,
          phase: "success",
          title: "\u5DF2\u90E8\u7F72",
          detail: record.message ? `\u6700\u8FD1\u90E8\u7F72\u6210\u529F\uFF1A${record.message}` : "\u6700\u8FD1\u4E00\u6B21\u90E8\u7F72\u6210\u529F\u3002"
        };
      case "failure":
        return {
          ...common,
          phase: "failure",
          title: "\u90E8\u7F72\u5931\u8D25",
          detail: record.message ? `\u6700\u8FD1\u90E8\u7F72\u5931\u8D25\uFF1A${record.message}` : "\u6700\u8FD1\u4E00\u6B21\u90E8\u7F72\u5931\u8D25\uFF0C\u8BF7\u67E5\u770B\u64CD\u4F5C\u8BB0\u5F55\u3002"
        };
      case "cancelled":
        return {
          ...common,
          phase: "cancelled",
          title: "\u6784\u5EFA\u5DF2\u53D6\u6D88",
          detail: record.message ? `\u6784\u5EFA\u88AB\u65B0\u8BF7\u6C42\u53D6\u4EE3\uFF1A${record.message}` : "\u8BE5\u6B21\u6784\u5EFA\u5DF2\u88AB\u53D6\u6D88\uFF08\u901A\u5E38\u56E0\u89E6\u53D1\u65B0\u6784\u5EFA\uFF09\u3002"
        };
    }
  }
};

// src/ui/OverviewSection.ts
var import_obsidian7 = require("obsidian");

// src/ui/NewArticleModal.ts
var import_obsidian4 = require("obsidian");
var NewArticleModal = class extends import_obsidian4.Modal {
  constructor(app, onSubmit) {
    super(app);
    this.onSubmit = onSubmit;
    this.title = "";
    this.directory = "";
    this.author = "";
    this.cover = "";
    this.tagsText = "";
    this.description = "";
    this.isSubmitting = false;
  }
  onOpen() {
    this.title = "";
    this.directory = "";
    this.author = "";
    this.cover = "";
    this.tagsText = "";
    this.description = "";
    this.isSubmitting = false;
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h2", { text: "\u65B0\u5EFA\u6587\u7AE0" });
    const formEl = contentEl.createEl("form");
    formEl.addEventListener("submit", (event) => {
      event.preventDefault();
      void this.submit();
    });
    let titleInput;
    new import_obsidian4.Setting(formEl).setName("\u6807\u9898").setDesc("\u6587\u7AE0\u6587\u4EF6\u540D\u5C06\u7531\u6807\u9898\u751F\u6210\u3002").addText((text) => {
      text.setPlaceholder("\u8F93\u5165\u6587\u7AE0\u6807\u9898");
      text.onChange((value) => {
        this.title = value;
      });
      titleInput = text.inputEl;
    });
    new import_obsidian4.Setting(formEl).setName("\u76EE\u5F55").setDesc("\u9009\u62E9\u6587\u7AE0\u6240\u5728\u6587\u4EF6\u5939\uFF1B\u7559\u7A7A\u4E3A Vault \u6839\u76EE\u5F55\u3002").addDropdown((dropdown) => {
      dropdown.addOption("", "Vault \u6839\u76EE\u5F55");
      for (const folder of listContentFolders(this.app)) {
        dropdown.addOption(folder, folder);
      }
      dropdown.onChange((value) => {
        this.directory = value;
      });
    });
    const advanced = formEl.createEl("details", { cls: "vpb-advanced" });
    advanced.createEl("summary", { text: "\u9AD8\u7EA7\u8BBE\u7F6E\uFF08\u53EF\u9009\uFF09" });
    const box = advanced.createDiv({ cls: "vpb-advanced-body" });
    new import_obsidian4.Setting(box).setName("\u4F5C\u8005").setDesc("\u7559\u7A7A\u5219\u4F7F\u7528\u7AD9\u70B9\u9ED8\u8BA4\u4F5C\u8005\u3002").addText((text) => {
      text.onChange((value) => {
        this.author = value;
      });
    });
    const coverSetting = new import_obsidian4.Setting(box).setName("\u5C01\u9762").setDesc("\u53EF\u9009\u62E9 public/ \u4E2D\u7684\u56FE\u7247\uFF0C\u6216\u586B\u5199\u5916\u94FE\u5730\u5740\u3002").addText((text) => {
      text.setPlaceholder("/image/cover.webp \u6216 https://...");
      text.onChange((value) => {
        this.cover = value;
      });
    }).addExtraButton((button) => {
      button.setIcon("image");
      button.setTooltip("\u4ECE public/ \u9009\u62E9\u56FE\u7247");
      button.onClick(() => {
        void this.choosePublicImage((asset) => {
          this.cover = asset;
          const input = coverSetting.controlEl.querySelector("input");
          if (input) input.value = asset;
        });
      });
    });
    new import_obsidian4.Setting(box).setName("\u6807\u7B7E").setDesc("\u591A\u4E2A\u6807\u7B7E\u7528\u9017\u53F7\u5206\u9694\uFF0C\u4F8B\u5982\uFF1A\u65E5\u8BB0, \u751F\u6D3B\u3002").addText((text) => {
      text.setPlaceholder("\u6807\u7B7E1, \u6807\u7B7E2");
      text.onChange((value) => {
        this.tagsText = value;
      });
    });
    new import_obsidian4.Setting(box).setName("\u63CF\u8FF0").setDesc("\u7528\u4E8E SEO \u6458\u8981\uFF1B\u7559\u7A7A\u5219\u4ECE\u6B63\u6587\u81EA\u52A8\u622A\u53D6\u3002").addTextArea((text) => {
      text.inputEl.rows = 3;
      text.onChange((value) => {
        this.description = value;
      });
    });
    const actionsEl = formEl.createDiv({ cls: "modal-button-container" });
    const cancelButton = actionsEl.createEl("button", { text: "\u53D6\u6D88", type: "button" });
    cancelButton.addEventListener("click", () => this.close());
    actionsEl.createEl("button", {
      text: "\u521B\u5EFA\u6587\u7AE0",
      cls: "mod-cta",
      type: "submit"
    });
    window.setTimeout(() => titleInput?.focus(), 0);
  }
  onClose() {
    this.contentEl.empty();
  }
  async choosePublicImage(onChoose) {
    const images = this.app.vault.getFiles().filter((file) => file.path.startsWith("public/") && /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(file.path)).map((file) => `/${file.path.slice("public/".length)}`).sort((left, right) => left.localeCompare(right));
    if (images.length === 0) {
      new import_obsidian4.Notice("public/ \u76EE\u5F55\u4E2D\u6CA1\u6709\u53EF\u9009\u56FE\u7247\u3002", 5e3);
      return;
    }
    new PublicImageSuggestModal(this.app, images, onChoose).open();
  }
  async submit() {
    if (this.isSubmitting) {
      return;
    }
    const title = this.title.trim();
    if (!title) {
      new import_obsidian4.Notice("\u8BF7\u8F93\u5165\u6587\u7AE0\u6807\u9898");
      return;
    }
    this.isSubmitting = true;
    try {
      const input = { title };
      const directory = this.directory.trim();
      if (directory) input.directory = directory;
      const author = this.author.trim();
      if (author) input.author = author;
      const cover = this.cover.trim();
      if (cover) input.cover = cover;
      const tags = this.tagsText.split(/[,，\s]+/).filter(Boolean);
      if (tags.length) input.tags = tags;
      const description = this.description.trim();
      if (description) input.description = description;
      await this.onSubmit(input);
      this.close();
    } catch (error) {
      new import_obsidian4.Notice(error instanceof Error && error.message ? error.message : "\u521B\u5EFA\u6587\u7AE0\u5931\u8D25");
    } finally {
      this.isSubmitting = false;
    }
  }
};
function listContentFolders(app) {
  return app.vault.getAllLoadedFiles().filter((file) => file instanceof import_obsidian4.TFolder).map((folder) => folder.path).filter((path) => !path.split("/").some((segment) => segment.startsWith(".") || segment === "node_modules")).sort((left, right) => left.localeCompare(right));
}
var PublicImageSuggestModal = class extends import_obsidian4.FuzzySuggestModal {
  constructor(app, images, onChoose) {
    super(app);
    this.images = images;
    this.onChoose = onChoose;
    this.setPlaceholder("\u641C\u7D22 public/ \u4E2D\u7684\u56FE\u7247");
  }
  getItems() {
    return this.images;
  }
  getItemText(item) {
    return item;
  }
  onChooseItem(item) {
    this.onChoose(item);
  }
};

// src/ui/SiteConfigModal.ts
var import_obsidian5 = require("obsidian");

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/identity.js
var ALIAS = Symbol.for("yaml.alias");
var DOC = Symbol.for("yaml.document");
var MAP = Symbol.for("yaml.map");
var PAIR = Symbol.for("yaml.pair");
var SCALAR = Symbol.for("yaml.scalar");
var SEQ = Symbol.for("yaml.seq");
var NODE_TYPE = Symbol.for("yaml.node.type");
var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
function isCollection(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case MAP:
      case SEQ:
        return true;
    }
  return false;
}
function isNode(node) {
  if (node && typeof node === "object")
    switch (node[NODE_TYPE]) {
      case ALIAS:
      case MAP:
      case SCALAR:
      case SEQ:
        return true;
    }
  return false;
}
var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/visit.js
var BREAK = Symbol("break visit");
var SKIP = Symbol("skip children");
var REMOVE = Symbol("remove node");
function visit(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE)
      node.contents = null;
  } else
    visit_(null, node, visitor_, Object.freeze([]));
}
visit.BREAK = BREAK;
visit.SKIP = SKIP;
visit.REMOVE = REMOVE;
function visit_(key, node, visitor, path) {
  const ctrl = callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visit_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = visit_(i, node.items[i], visitor, path);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK)
          return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = visit_("key", node.key, visitor, path);
      if (ck === BREAK)
        return BREAK;
      else if (ck === REMOVE)
        node.key = null;
      const cv = visit_("value", node.value, visitor, path);
      if (cv === BREAK)
        return BREAK;
      else if (cv === REMOVE)
        node.value = null;
    }
  }
  return ctrl;
}
async function visitAsync(node, visitor) {
  const visitor_ = initVisitor(visitor);
  if (isDocument(node)) {
    const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
    if (cd === REMOVE)
      node.contents = null;
  } else
    await visitAsync_(null, node, visitor_, Object.freeze([]));
}
visitAsync.BREAK = BREAK;
visitAsync.SKIP = SKIP;
visitAsync.REMOVE = REMOVE;
async function visitAsync_(key, node, visitor, path) {
  const ctrl = await callVisitor(key, node, visitor, path);
  if (isNode(ctrl) || isPair(ctrl)) {
    replaceNode(key, path, ctrl);
    return visitAsync_(key, ctrl, visitor, path);
  }
  if (typeof ctrl !== "symbol") {
    if (isCollection(node)) {
      path = Object.freeze(path.concat(node));
      for (let i = 0; i < node.items.length; ++i) {
        const ci = await visitAsync_(i, node.items[i], visitor, path);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK)
          return BREAK;
        else if (ci === REMOVE) {
          node.items.splice(i, 1);
          i -= 1;
        }
      }
    } else if (isPair(node)) {
      path = Object.freeze(path.concat(node));
      const ck = await visitAsync_("key", node.key, visitor, path);
      if (ck === BREAK)
        return BREAK;
      else if (ck === REMOVE)
        node.key = null;
      const cv = await visitAsync_("value", node.value, visitor, path);
      if (cv === BREAK)
        return BREAK;
      else if (cv === REMOVE)
        node.value = null;
    }
  }
  return ctrl;
}
function initVisitor(visitor) {
  if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
    return Object.assign({
      Alias: visitor.Node,
      Map: visitor.Node,
      Scalar: visitor.Node,
      Seq: visitor.Node
    }, visitor.Value && {
      Map: visitor.Value,
      Scalar: visitor.Value,
      Seq: visitor.Value
    }, visitor.Collection && {
      Map: visitor.Collection,
      Seq: visitor.Collection
    }, visitor);
  }
  return visitor;
}
function callVisitor(key, node, visitor, path) {
  if (typeof visitor === "function")
    return visitor(key, node, path);
  if (isMap(node))
    return visitor.Map?.(key, node, path);
  if (isSeq(node))
    return visitor.Seq?.(key, node, path);
  if (isPair(node))
    return visitor.Pair?.(key, node, path);
  if (isScalar(node))
    return visitor.Scalar?.(key, node, path);
  if (isAlias(node))
    return visitor.Alias?.(key, node, path);
  return void 0;
}
function replaceNode(key, path, node) {
  const parent = path[path.length - 1];
  if (isCollection(parent)) {
    parent.items[key] = node;
  } else if (isPair(parent)) {
    if (key === "key")
      parent.key = node;
    else
      parent.value = node;
  } else if (isDocument(parent)) {
    parent.contents = node;
  } else {
    const pt = isAlias(parent) ? "alias" : "scalar";
    throw new Error(`Cannot replace node with ${pt} parent`);
  }
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/directives.js
var escapeChars = {
  "!": "%21",
  ",": "%2C",
  "[": "%5B",
  "]": "%5D",
  "{": "%7B",
  "}": "%7D"
};
var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
var Directives = class _Directives {
  constructor(yaml, tags) {
    this.docStart = null;
    this.docEnd = false;
    this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
    this.tags = Object.assign({}, _Directives.defaultTags, tags);
  }
  clone() {
    const copy = new _Directives(this.yaml, this.tags);
    copy.docStart = this.docStart;
    return copy;
  }
  /**
   * During parsing, get a Directives instance for the current document and
   * update the stream state according to the current version's spec.
   */
  atDocument() {
    const res = new _Directives(this.yaml, this.tags);
    switch (this.yaml.version) {
      case "1.1":
        this.atNextDocument = true;
        break;
      case "1.2":
        this.atNextDocument = false;
        this.yaml = {
          explicit: _Directives.defaultYaml.explicit,
          version: "1.2"
        };
        this.tags = Object.assign({}, _Directives.defaultTags);
        break;
    }
    return res;
  }
  /**
   * @param onError - May be called even if the action was successful
   * @returns `true` on success
   */
  add(line, onError) {
    if (this.atNextDocument) {
      this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
      this.tags = Object.assign({}, _Directives.defaultTags);
      this.atNextDocument = false;
    }
    const parts = line.trim().split(/[ \t]+/);
    const name = parts.shift();
    switch (name) {
      case "%TAG": {
        if (parts.length !== 2) {
          onError(0, "%TAG directive should contain exactly two parts");
          if (parts.length < 2)
            return false;
        }
        const [handle, prefix] = parts;
        this.tags[handle] = prefix;
        return true;
      }
      case "%YAML": {
        this.yaml.explicit = true;
        if (parts.length !== 1) {
          onError(0, "%YAML directive should contain exactly one part");
          return false;
        }
        const [version] = parts;
        if (version === "1.1" || version === "1.2") {
          this.yaml.version = version;
          return true;
        } else {
          const isValid = /^\d+\.\d+$/.test(version);
          onError(6, `Unsupported YAML version ${version}`, isValid);
          return false;
        }
      }
      default:
        onError(0, `Unknown directive ${name}`, true);
        return false;
    }
  }
  /**
   * Resolves a tag, matching handles to those defined in %TAG directives.
   *
   * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
   *   `'!local'` tag, or `null` if unresolvable.
   */
  tagName(source, onError) {
    if (source === "!")
      return "!";
    if (source[0] !== "!") {
      onError(`Not a valid tag: ${source}`);
      return null;
    }
    if (source[1] === "<") {
      const verbatim = source.slice(2, -1);
      if (verbatim === "!" || verbatim === "!!") {
        onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
        return null;
      }
      if (source[source.length - 1] !== ">")
        onError("Verbatim tags must end with a >");
      return verbatim;
    }
    const [, handle, suffix] = source.match(/^(.*!)([^!]*)$/s);
    if (!suffix)
      onError(`The ${source} tag has no suffix`);
    const prefix = this.tags[handle];
    if (prefix) {
      try {
        return prefix + decodeURIComponent(suffix);
      } catch (error) {
        onError(String(error));
        return null;
      }
    }
    if (handle === "!")
      return source;
    onError(`Could not resolve tag: ${source}`);
    return null;
  }
  /**
   * Given a fully resolved tag, returns its printable string form,
   * taking into account current tag prefixes and defaults.
   */
  tagString(tag) {
    for (const [handle, prefix] of Object.entries(this.tags)) {
      if (tag.startsWith(prefix))
        return handle + escapeTagName(tag.substring(prefix.length));
    }
    return tag[0] === "!" ? tag : `!<${tag}>`;
  }
  toString(doc) {
    const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
    const tagEntries = Object.entries(this.tags);
    let tagNames;
    if (doc && tagEntries.length > 0 && isNode(doc.contents)) {
      const tags = {};
      visit(doc.contents, (_key, node) => {
        if (isNode(node) && node.tag)
          tags[node.tag] = true;
      });
      tagNames = Object.keys(tags);
    } else
      tagNames = [];
    for (const [handle, prefix] of tagEntries) {
      if (handle === "!!" && prefix === "tag:yaml.org,2002:")
        continue;
      if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
        lines.push(`%TAG ${handle} ${prefix}`);
    }
    return lines.join("\n");
  }
};
Directives.defaultYaml = { explicit: false, version: "1.2" };
Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/anchors.js
function anchorIsValid(anchor) {
  if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
    const sa = JSON.stringify(anchor);
    const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
    throw new Error(msg);
  }
  return true;
}
function anchorNames(root) {
  const anchors = /* @__PURE__ */ new Set();
  visit(root, {
    Value(_key, node) {
      if (node.anchor)
        anchors.add(node.anchor);
    }
  });
  return anchors;
}
function findNewAnchor(prefix, exclude) {
  for (let i = 1; true; ++i) {
    const name = `${prefix}${i}`;
    if (!exclude.has(name))
      return name;
  }
}
function createNodeAnchors(doc, prefix) {
  const aliasObjects = [];
  const sourceObjects = /* @__PURE__ */ new Map();
  let prevAnchors = null;
  return {
    onAnchor: (source) => {
      aliasObjects.push(source);
      prevAnchors ?? (prevAnchors = anchorNames(doc));
      const anchor = findNewAnchor(prefix, prevAnchors);
      prevAnchors.add(anchor);
      return anchor;
    },
    /**
     * With circular references, the source node is only resolved after all
     * of its child nodes are. This is why anchors are set only after all of
     * the nodes have been created.
     */
    setAnchors: () => {
      for (const source of aliasObjects) {
        const ref = sourceObjects.get(source);
        if (typeof ref === "object" && ref.anchor && (isScalar(ref.node) || isCollection(ref.node))) {
          ref.node.anchor = ref.anchor;
        } else {
          const error = new Error("Failed to resolve repeated object (this should not happen)");
          error.source = source;
          throw error;
        }
      }
    },
    sourceObjects
  };
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/applyReviver.js
function applyReviver(reviver, obj, key, val) {
  if (val && typeof val === "object") {
    if (Array.isArray(val)) {
      for (let i = 0, len = val.length; i < len; ++i) {
        const v0 = val[i];
        const v1 = applyReviver(reviver, val, String(i), v0);
        if (v1 === void 0)
          delete val[i];
        else if (v1 !== v0)
          val[i] = v1;
      }
    } else if (val instanceof Map) {
      for (const k of Array.from(val.keys())) {
        const v0 = val.get(k);
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0)
          val.delete(k);
        else if (v1 !== v0)
          val.set(k, v1);
      }
    } else if (val instanceof Set) {
      for (const v0 of Array.from(val)) {
        const v1 = applyReviver(reviver, val, v0, v0);
        if (v1 === void 0)
          val.delete(v0);
        else if (v1 !== v0) {
          val.delete(v0);
          val.add(v1);
        }
      }
    } else {
      for (const [k, v0] of Object.entries(val)) {
        const v1 = applyReviver(reviver, val, k, v0);
        if (v1 === void 0)
          delete val[k];
        else if (v1 !== v0)
          val[k] = v1;
      }
    }
  }
  return reviver.call(obj, key, val);
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/toJS.js
function toJS(value, arg, ctx) {
  if (Array.isArray(value))
    return value.map((v, i) => toJS(v, String(i), ctx));
  if (value && typeof value.toJSON === "function") {
    if (!ctx || !hasAnchor(value))
      return value.toJSON(arg, ctx);
    const data = { aliasCount: 0, count: 1, res: void 0 };
    ctx.anchors.set(value, data);
    ctx.onCreate = (res2) => {
      data.res = res2;
      delete ctx.onCreate;
    };
    const res = value.toJSON(arg, ctx);
    if (ctx.onCreate)
      ctx.onCreate(res);
    return res;
  }
  if (typeof value === "bigint" && !ctx?.keep)
    return Number(value);
  return value;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Node.js
var NodeBase = class {
  constructor(type) {
    Object.defineProperty(this, NODE_TYPE, { value: type });
  }
  /** Create a copy of this node.  */
  clone() {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /** A plain JavaScript representation of this node. */
  toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    if (!isDocument(doc))
      throw new TypeError("A document argument is required");
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc,
      keep: true,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
    };
    const res = toJS(this, "", ctx);
    if (typeof onAnchor === "function")
      for (const { count, res: res2 } of ctx.anchors.values())
        onAnchor(res2, count);
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Alias.js
var Alias = class extends NodeBase {
  constructor(source) {
    super(ALIAS);
    this.source = source;
    Object.defineProperty(this, "tag", {
      set() {
        throw new Error("Alias nodes cannot have tags");
      }
    });
  }
  /**
   * Resolve the value of this alias within `doc`, finding the last
   * instance of the `source` anchor before this node.
   */
  resolve(doc, ctx) {
    if (ctx?.maxAliasCount === 0)
      throw new ReferenceError("Alias resolution is disabled");
    let nodes;
    if (ctx?.aliasResolveCache) {
      nodes = ctx.aliasResolveCache;
    } else {
      nodes = [];
      visit(doc, {
        Node: (_key, node) => {
          if (isAlias(node) || hasAnchor(node))
            nodes.push(node);
        }
      });
      if (ctx)
        ctx.aliasResolveCache = nodes;
    }
    let found = void 0;
    for (const node of nodes) {
      if (node === this)
        break;
      if (node.anchor === this.source)
        found = node;
    }
    return found;
  }
  toJSON(_arg, ctx) {
    if (!ctx)
      return { source: this.source };
    const { anchors, doc, maxAliasCount } = ctx;
    const source = this.resolve(doc, ctx);
    if (!source) {
      const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
      throw new ReferenceError(msg);
    }
    let data = anchors.get(source);
    if (!data) {
      toJS(source, null, ctx);
      data = anchors.get(source);
    }
    if (data?.res === void 0) {
      const msg = "This should not happen: Alias anchor was not resolved?";
      throw new ReferenceError(msg);
    }
    if (maxAliasCount >= 0) {
      data.count += 1;
      if (data.aliasCount === 0)
        data.aliasCount = getAliasCount(doc, source, anchors);
      if (data.count * data.aliasCount > maxAliasCount) {
        const msg = "Excessive alias count indicates a resource exhaustion attack";
        throw new ReferenceError(msg);
      }
    }
    return data.res;
  }
  toString(ctx, _onComment, _onChompKeep) {
    const src = `*${this.source}`;
    if (ctx) {
      anchorIsValid(this.source);
      if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
        const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
        throw new Error(msg);
      }
      if (ctx.implicitKey)
        return `${src} `;
    }
    return src;
  }
};
function getAliasCount(doc, node, anchors) {
  if (isAlias(node)) {
    const source = node.resolve(doc);
    const anchor = anchors && source && anchors.get(source);
    return anchor ? anchor.count * anchor.aliasCount : 0;
  } else if (isCollection(node)) {
    let count = 0;
    for (const item of node.items) {
      const c = getAliasCount(doc, item, anchors);
      if (c > count)
        count = c;
    }
    return count;
  } else if (isPair(node)) {
    const kc = getAliasCount(doc, node.key, anchors);
    const vc = getAliasCount(doc, node.value, anchors);
    return Math.max(kc, vc);
  }
  return 1;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Scalar.js
var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
var Scalar = class extends NodeBase {
  constructor(value) {
    super(SCALAR);
    this.value = value;
  }
  toJSON(arg, ctx) {
    return ctx?.keep ? this.value : toJS(this.value, arg, ctx);
  }
  toString() {
    return String(this.value);
  }
};
Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
Scalar.PLAIN = "PLAIN";
Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/createNode.js
var defaultTagPrefix = "tag:yaml.org,2002:";
function findTagObject(value, tagName, tags) {
  if (tagName) {
    const match = tags.filter((t) => t.tag === tagName);
    const tagObj = match.find((t) => !t.format) ?? match[0];
    if (!tagObj)
      throw new Error(`Tag ${tagName} not found`);
    return tagObj;
  }
  return tags.find((t) => t.identify?.(value) && !t.format);
}
function createNode(value, tagName, ctx) {
  if (isDocument(value))
    value = value.contents;
  if (isNode(value))
    return value;
  if (isPair(value)) {
    const map2 = ctx.schema[MAP].createNode?.(ctx.schema, null, ctx);
    map2.items.push(value);
    return map2;
  }
  if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
    value = value.valueOf();
  }
  const { aliasDuplicateObjects, onAnchor, onTagObj, schema: schema4, sourceObjects } = ctx;
  let ref = void 0;
  if (aliasDuplicateObjects && value && typeof value === "object") {
    ref = sourceObjects.get(value);
    if (ref) {
      ref.anchor ?? (ref.anchor = onAnchor(value));
      return new Alias(ref.anchor);
    } else {
      ref = { anchor: null, node: null };
      sourceObjects.set(value, ref);
    }
  }
  if (tagName?.startsWith("!!"))
    tagName = defaultTagPrefix + tagName.slice(2);
  let tagObj = findTagObject(value, tagName, schema4.tags);
  if (!tagObj) {
    if (value && typeof value.toJSON === "function") {
      value = value.toJSON();
    }
    if (!value || typeof value !== "object") {
      const node2 = new Scalar(value);
      if (ref)
        ref.node = node2;
      return node2;
    }
    tagObj = value instanceof Map ? schema4[MAP] : Symbol.iterator in Object(value) ? schema4[SEQ] : schema4[MAP];
  }
  if (onTagObj) {
    onTagObj(tagObj);
    delete ctx.onTagObj;
  }
  const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar(value);
  if (tagName)
    node.tag = tagName;
  else if (!tagObj.default)
    node.tag = tagObj.tag;
  if (ref)
    ref.node = node;
  return node;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Collection.js
function collectionFromPath(schema4, path, value) {
  let v = value;
  for (let i = path.length - 1; i >= 0; --i) {
    const k = path[i];
    if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
      const a = [];
      a[k] = v;
      v = a;
    } else {
      v = /* @__PURE__ */ new Map([[k, v]]);
    }
  }
  return createNode(v, void 0, {
    aliasDuplicateObjects: false,
    keepUndefined: false,
    onAnchor: () => {
      throw new Error("This should not happen, please report a bug.");
    },
    schema: schema4,
    sourceObjects: /* @__PURE__ */ new Map()
  });
}
var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
var Collection = class extends NodeBase {
  constructor(type, schema4) {
    super(type);
    Object.defineProperty(this, "schema", {
      value: schema4,
      configurable: true,
      enumerable: false,
      writable: true
    });
  }
  /**
   * Create a copy of this collection.
   *
   * @param schema - If defined, overwrites the original's schema
   */
  clone(schema4) {
    const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
    if (schema4)
      copy.schema = schema4;
    copy.items = copy.items.map((it) => isNode(it) || isPair(it) ? it.clone(schema4) : it);
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /**
   * Adds a value to the collection. For `!!map` and `!!omap` the value must
   * be a Pair instance or a `{ key, value }` object, which may not have a key
   * that already exists in the map.
   */
  addIn(path, value) {
    if (isEmptyPath(path))
      this.add(value);
    else {
      const [key, ...rest] = path;
      const node = this.get(key, true);
      if (isCollection(node))
        node.addIn(rest, value);
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value));
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
  /**
   * Removes a value from the collection.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0)
      return this.delete(key);
    const node = this.get(key, true);
    if (isCollection(node))
      return node.deleteIn(rest);
    else
      throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    const [key, ...rest] = path;
    const node = this.get(key, true);
    if (rest.length === 0)
      return !keepScalar && isScalar(node) ? node.value : node;
    else
      return isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
  }
  hasAllNullValues(allowScalar) {
    return this.items.every((node) => {
      if (!isPair(node))
        return false;
      const n = node.value;
      return n == null || allowScalar && isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
    });
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   */
  hasIn(path) {
    const [key, ...rest] = path;
    if (rest.length === 0)
      return this.has(key);
    const node = this.get(key, true);
    return isCollection(node) ? node.hasIn(rest) : false;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    const [key, ...rest] = path;
    if (rest.length === 0) {
      this.set(key, value);
    } else {
      const node = this.get(key, true);
      if (isCollection(node))
        node.setIn(rest, value);
      else if (node === void 0 && this.schema)
        this.set(key, collectionFromPath(this.schema, rest, value));
      else
        throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
    }
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyComment.js
var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
function indentComment(comment, indent) {
  if (/^\n+$/.test(comment))
    return comment.substring(1);
  return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
}
var lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/foldFlowLines.js
var FOLD_FLOW = "flow";
var FOLD_BLOCK = "block";
var FOLD_QUOTED = "quoted";
function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
  if (!lineWidth || lineWidth < 0)
    return text;
  if (lineWidth < minContentWidth)
    minContentWidth = 0;
  const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
  if (text.length <= endStep)
    return text;
  const folds = [];
  const escapedFolds = {};
  let end = lineWidth - indent.length;
  if (typeof indentAtStart === "number") {
    if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
      folds.push(0);
    else
      end = lineWidth - indentAtStart;
  }
  let split = void 0;
  let prev = void 0;
  let overflow = false;
  let i = -1;
  let escStart = -1;
  let escEnd = -1;
  if (mode === FOLD_BLOCK) {
    i = consumeMoreIndentedLines(text, i, indent.length);
    if (i !== -1)
      end = i + endStep;
  }
  for (let ch; ch = text[i += 1]; ) {
    if (mode === FOLD_QUOTED && ch === "\\") {
      escStart = i;
      switch (text[i + 1]) {
        case "x":
          i += 3;
          break;
        case "u":
          i += 5;
          break;
        case "U":
          i += 9;
          break;
        default:
          i += 1;
      }
      escEnd = i;
    }
    if (ch === "\n") {
      if (mode === FOLD_BLOCK)
        i = consumeMoreIndentedLines(text, i, indent.length);
      end = i + indent.length + endStep;
      split = void 0;
    } else {
      if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
        const next = text[i + 1];
        if (next && next !== " " && next !== "\n" && next !== "	")
          split = i;
      }
      if (i >= end) {
        if (split) {
          folds.push(split);
          end = split + endStep;
          split = void 0;
        } else if (mode === FOLD_QUOTED) {
          while (prev === " " || prev === "	") {
            prev = ch;
            ch = text[i += 1];
            overflow = true;
          }
          const j = i > escEnd + 1 ? i - 2 : escStart - 1;
          if (escapedFolds[j])
            return text;
          folds.push(j);
          escapedFolds[j] = true;
          end = j + endStep;
          split = void 0;
        } else {
          overflow = true;
        }
      }
    }
    prev = ch;
  }
  if (overflow && onOverflow)
    onOverflow();
  if (folds.length === 0)
    return text;
  if (onFold)
    onFold();
  let res = text.slice(0, folds[0]);
  for (let i2 = 0; i2 < folds.length; ++i2) {
    const fold = folds[i2];
    const end2 = folds[i2 + 1] || text.length;
    if (fold === 0)
      res = `
${indent}${text.slice(0, end2)}`;
    else {
      if (mode === FOLD_QUOTED && escapedFolds[fold])
        res += `${text[fold]}\\`;
      res += `
${indent}${text.slice(fold + 1, end2)}`;
    }
  }
  return res;
}
function consumeMoreIndentedLines(text, i, indent) {
  let end = i;
  let start = i + 1;
  let ch = text[start];
  while (ch === " " || ch === "	") {
    if (i < start + indent) {
      ch = text[++i];
    } else {
      do {
        ch = text[++i];
      } while (ch && ch !== "\n");
      end = i;
      start = i + 1;
      ch = text[start];
    }
  }
  return end;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyString.js
var getFoldOptions = (ctx, isBlock2) => ({
  indentAtStart: isBlock2 ? ctx.indent.length : ctx.indentAtStart,
  lineWidth: ctx.options.lineWidth,
  minContentWidth: ctx.options.minContentWidth
});
var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
function lineLengthOverLimit(str, lineWidth, indentLength) {
  if (!lineWidth || lineWidth < 0)
    return false;
  const limit = lineWidth - indentLength;
  const strLen = str.length;
  if (strLen <= limit)
    return false;
  for (let i = 0, start = 0; i < strLen; ++i) {
    if (str[i] === "\n") {
      if (i - start > limit)
        return true;
      start = i + 1;
      if (strLen - start <= limit)
        return false;
    }
  }
  return true;
}
function doubleQuotedString(value, ctx) {
  const json = JSON.stringify(value);
  if (ctx.options.doubleQuotedAsJSON)
    return json;
  const { implicitKey } = ctx;
  const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  let str = "";
  let start = 0;
  for (let i = 0, ch = json[i]; ch; ch = json[++i]) {
    if (ch === " " && json[i + 1] === "\\" && json[i + 2] === "n") {
      str += json.slice(start, i) + "\\ ";
      i += 1;
      start = i;
      ch = "\\";
    }
    if (ch === "\\")
      switch (json[i + 1]) {
        case "u":
          {
            str += json.slice(start, i);
            const code = json.substr(i + 2, 4);
            switch (code) {
              case "0000":
                str += "\\0";
                break;
              case "0007":
                str += "\\a";
                break;
              case "000b":
                str += "\\v";
                break;
              case "001b":
                str += "\\e";
                break;
              case "0085":
                str += "\\N";
                break;
              case "00a0":
                str += "\\_";
                break;
              case "2028":
                str += "\\L";
                break;
              case "2029":
                str += "\\P";
                break;
              default:
                if (code.substr(0, 2) === "00")
                  str += "\\x" + code.substr(2);
                else
                  str += json.substr(i, 6);
            }
            i += 5;
            start = i + 1;
          }
          break;
        case "n":
          if (implicitKey || json[i + 2] === '"' || json.length < minMultiLineLength) {
            i += 1;
          } else {
            str += json.slice(start, i) + "\n\n";
            while (json[i + 2] === "\\" && json[i + 3] === "n" && json[i + 4] !== '"') {
              str += "\n";
              i += 2;
            }
            str += indent;
            if (json[i + 2] === " ")
              str += "\\";
            i += 1;
            start = i + 1;
          }
          break;
        default:
          i += 1;
      }
  }
  str = start ? str + json.slice(start) : json;
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_QUOTED, getFoldOptions(ctx, false));
}
function singleQuotedString(value, ctx) {
  if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
    return doubleQuotedString(value, ctx);
  const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
  const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
  return ctx.implicitKey ? res : foldFlowLines(res, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function quotedString(value, ctx) {
  const { singleQuote } = ctx.options;
  let qs;
  if (singleQuote === false)
    qs = doubleQuotedString;
  else {
    const hasDouble = value.includes('"');
    const hasSingle = value.includes("'");
    if (hasDouble && !hasSingle)
      qs = singleQuotedString;
    else if (hasSingle && !hasDouble)
      qs = doubleQuotedString;
    else
      qs = singleQuote ? singleQuotedString : doubleQuotedString;
  }
  return qs(value, ctx);
}
var blockEndNewlines;
try {
  blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
} catch {
  blockEndNewlines = /\n+(?!\n|$)/g;
}
function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
  const { blockQuote, commentString, lineWidth } = ctx.options;
  if (!blockQuote || /\n[\t ]+$/.test(value)) {
    return quotedString(value, ctx);
  }
  const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
  const literal = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.BLOCK_FOLDED ? false : type === Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
  if (!value)
    return literal ? "|\n" : ">\n";
  let chomp;
  let endStart;
  for (endStart = value.length; endStart > 0; --endStart) {
    const ch = value[endStart - 1];
    if (ch !== "\n" && ch !== "	" && ch !== " ")
      break;
  }
  let end = value.substring(endStart);
  const endNlPos = end.indexOf("\n");
  if (endNlPos === -1) {
    chomp = "-";
  } else if (value === end || endNlPos !== end.length - 1) {
    chomp = "+";
    if (onChompKeep)
      onChompKeep();
  } else {
    chomp = "";
  }
  if (end) {
    value = value.slice(0, -end.length);
    if (end[end.length - 1] === "\n")
      end = end.slice(0, -1);
    end = end.replace(blockEndNewlines, `$&${indent}`);
  }
  let startWithSpace = false;
  let startEnd;
  let startNlPos = -1;
  for (startEnd = 0; startEnd < value.length; ++startEnd) {
    const ch = value[startEnd];
    if (ch === " ")
      startWithSpace = true;
    else if (ch === "\n")
      startNlPos = startEnd;
    else
      break;
  }
  let start = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
  if (start) {
    value = value.substring(start.length);
    start = start.replace(/\n+/g, `$&${indent}`);
  }
  const indentSize = indent ? "2" : "1";
  let header = (startWithSpace ? indentSize : "") + chomp;
  if (comment) {
    header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
    if (onComment)
      onComment();
  }
  if (!literal) {
    const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
    let literalFallback = false;
    const foldOptions = getFoldOptions(ctx, true);
    if (blockQuote !== "folded" && type !== Scalar.BLOCK_FOLDED) {
      foldOptions.onOverflow = () => {
        literalFallback = true;
      };
    }
    const body = foldFlowLines(`${start}${foldedValue}${end}`, indent, FOLD_BLOCK, foldOptions);
    if (!literalFallback)
      return `>${header}
${indent}${body}`;
  }
  value = value.replace(/\n+/g, `$&${indent}`);
  return `|${header}
${indent}${start}${value}${end}`;
}
function plainString(item, ctx, onComment, onChompKeep) {
  const { type, value } = item;
  const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
  if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
    return quotedString(value, ctx);
  }
  if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
    return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
  }
  if (!implicitKey && !inFlow && type !== Scalar.PLAIN && value.includes("\n")) {
    return blockString(item, ctx, onComment, onChompKeep);
  }
  if (containsDocumentMarker(value)) {
    if (indent === "") {
      ctx.forceBlockIndent = true;
      return blockString(item, ctx, onComment, onChompKeep);
    } else if (implicitKey && indent === indentStep) {
      return quotedString(value, ctx);
    }
  }
  const str = value.replace(/\n+/g, `$&
${indent}`);
  if (actualString) {
    const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
    const { compat, tags } = ctx.doc.schema;
    if (tags.some(test) || compat?.some(test))
      return quotedString(value, ctx);
  }
  return implicitKey ? str : foldFlowLines(str, indent, FOLD_FLOW, getFoldOptions(ctx, false));
}
function stringifyString(item, ctx, onComment, onChompKeep) {
  const { implicitKey, inFlow } = ctx;
  const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
  let { type } = item;
  if (type !== Scalar.QUOTE_DOUBLE) {
    if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
      type = Scalar.QUOTE_DOUBLE;
  }
  const _stringify = (_type) => {
    switch (_type) {
      case Scalar.BLOCK_FOLDED:
      case Scalar.BLOCK_LITERAL:
        return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
      case Scalar.QUOTE_DOUBLE:
        return doubleQuotedString(ss.value, ctx);
      case Scalar.QUOTE_SINGLE:
        return singleQuotedString(ss.value, ctx);
      case Scalar.PLAIN:
        return plainString(ss, ctx, onComment, onChompKeep);
      default:
        return null;
    }
  };
  let res = _stringify(type);
  if (res === null) {
    const { defaultKeyType, defaultStringType } = ctx.options;
    const t = implicitKey && defaultKeyType || defaultStringType;
    res = _stringify(t);
    if (res === null)
      throw new Error(`Unsupported default string type ${t}`);
  }
  return res;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringify.js
function createStringifyContext(doc, options) {
  const opt = Object.assign({
    blockQuote: true,
    commentString: stringifyComment,
    defaultKeyType: null,
    defaultStringType: "PLAIN",
    directives: null,
    doubleQuotedAsJSON: false,
    doubleQuotedMinMultiLineLength: 40,
    falseStr: "false",
    flowCollectionPadding: true,
    indentSeq: true,
    lineWidth: 80,
    minContentWidth: 20,
    nullStr: "null",
    simpleKeys: false,
    singleQuote: null,
    trailingComma: false,
    trueStr: "true",
    verifyAliasOrder: true
  }, doc.schema.toStringOptions, options);
  let inFlow;
  switch (opt.collectionStyle) {
    case "block":
      inFlow = false;
      break;
    case "flow":
      inFlow = true;
      break;
    default:
      inFlow = null;
  }
  return {
    anchors: /* @__PURE__ */ new Set(),
    doc,
    flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
    indent: "",
    indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
    inFlow,
    options: opt
  };
}
function getTagObject(tags, item) {
  if (item.tag) {
    const match = tags.filter((t) => t.tag === item.tag);
    if (match.length > 0)
      return match.find((t) => t.format === item.format) ?? match[0];
  }
  let tagObj = void 0;
  let obj;
  if (isScalar(item)) {
    obj = item.value;
    let match = tags.filter((t) => t.identify?.(obj));
    if (match.length > 1) {
      const testMatch = match.filter((t) => t.test);
      if (testMatch.length > 0)
        match = testMatch;
    }
    tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
  } else {
    obj = item;
    tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
  }
  if (!tagObj) {
    const name = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
    throw new Error(`Tag not resolved for ${name} value`);
  }
  return tagObj;
}
function stringifyProps(node, tagObj, { anchors, doc }) {
  if (!doc.directives)
    return "";
  const props = [];
  const anchor = (isScalar(node) || isCollection(node)) && node.anchor;
  if (anchor && anchorIsValid(anchor)) {
    anchors.add(anchor);
    props.push(`&${anchor}`);
  }
  const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
  if (tag)
    props.push(doc.directives.tagString(tag));
  return props.join(" ");
}
function stringify(item, ctx, onComment, onChompKeep) {
  if (isPair(item))
    return item.toString(ctx, onComment, onChompKeep);
  if (isAlias(item)) {
    if (ctx.doc.directives)
      return item.toString(ctx);
    if (ctx.resolvedAliases?.has(item)) {
      throw new TypeError(`Cannot stringify circular structure without alias nodes`);
    } else {
      if (ctx.resolvedAliases)
        ctx.resolvedAliases.add(item);
      else
        ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
      item = item.resolve(ctx.doc);
    }
  }
  let tagObj = void 0;
  const node = isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
  tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
  const props = stringifyProps(node, tagObj, ctx);
  if (props.length > 0)
    ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
  const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : isScalar(node) ? stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
  if (!props)
    return str;
  return isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyPair.js
function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
  const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
  let keyComment = isNode(key) && key.comment || null;
  if (simpleKeys) {
    if (keyComment) {
      throw new Error("With simple keys, key nodes cannot have comments");
    }
    if (isCollection(key) || !isNode(key) && typeof key === "object") {
      const msg = "With simple keys, collection cannot be used as a key value";
      throw new Error(msg);
    }
  }
  let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || isCollection(key) || (isScalar(key) ? key.type === Scalar.BLOCK_FOLDED || key.type === Scalar.BLOCK_LITERAL : typeof key === "object"));
  ctx = Object.assign({}, ctx, {
    allNullValues: false,
    implicitKey: !explicitKey && (simpleKeys || !allNullValues),
    indent: indent + indentStep
  });
  let keyCommentDone = false;
  let chompKeep = false;
  let str = stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
  if (!explicitKey && !ctx.inFlow && str.length > 1024) {
    if (simpleKeys)
      throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
    explicitKey = true;
  }
  if (ctx.inFlow) {
    if (allNullValues || value == null) {
      if (keyCommentDone && onComment)
        onComment();
      return str === "" ? "?" : explicitKey ? `? ${str}` : str;
    }
  } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
    str = `? ${str}`;
    if (keyComment && !keyCommentDone) {
      str += lineComment(str, ctx.indent, commentString(keyComment));
    } else if (chompKeep && onChompKeep)
      onChompKeep();
    return str;
  }
  if (keyCommentDone)
    keyComment = null;
  if (explicitKey) {
    if (keyComment)
      str += lineComment(str, ctx.indent, commentString(keyComment));
    str = `? ${str}
${indent}:`;
  } else {
    str = `${str}:`;
    if (keyComment)
      str += lineComment(str, ctx.indent, commentString(keyComment));
  }
  let vsb, vcb, valueComment;
  if (isNode(value)) {
    vsb = !!value.spaceBefore;
    vcb = value.commentBefore;
    valueComment = value.comment;
  } else {
    vsb = false;
    vcb = null;
    valueComment = null;
    if (value && typeof value === "object")
      value = doc.createNode(value);
  }
  ctx.implicitKey = false;
  if (!explicitKey && !keyComment && isScalar(value))
    ctx.indentAtStart = str.length + 1;
  chompKeep = false;
  if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && isSeq(value) && !value.flow && !value.tag && !value.anchor) {
    ctx.indent = ctx.indent.substring(2);
  }
  let valueCommentDone = false;
  const valueStr = stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
  let ws = " ";
  if (keyComment || vsb || vcb) {
    ws = vsb ? "\n" : "";
    if (vcb) {
      const cs = commentString(vcb);
      ws += `
${indentComment(cs, ctx.indent)}`;
    }
    if (valueStr === "" && !ctx.inFlow) {
      if (ws === "\n" && valueComment)
        ws = "\n\n";
    } else {
      ws += `
${ctx.indent}`;
    }
  } else if (!explicitKey && isCollection(value)) {
    const vs0 = valueStr[0];
    const nl0 = valueStr.indexOf("\n");
    const hasNewline = nl0 !== -1;
    const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
    if (hasNewline || !flow) {
      let hasPropsLine = false;
      if (hasNewline && (vs0 === "&" || vs0 === "!")) {
        let sp0 = valueStr.indexOf(" ");
        if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
          sp0 = valueStr.indexOf(" ", sp0 + 1);
        }
        if (sp0 === -1 || nl0 < sp0)
          hasPropsLine = true;
      }
      if (!hasPropsLine)
        ws = `
${ctx.indent}`;
    }
  } else if (valueStr === "" || valueStr[0] === "\n") {
    ws = "";
  }
  str += ws + valueStr;
  if (ctx.inFlow) {
    if (valueCommentDone && onComment)
      onComment();
  } else if (valueComment && !valueCommentDone) {
    str += lineComment(str, ctx.indent, commentString(valueComment));
  } else if (chompKeep && onChompKeep) {
    onChompKeep();
  }
  return str;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/log.js
function warn(logLevel, warning) {
  if (logLevel === "debug" || logLevel === "warn") {
    console.warn(warning);
  }
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/merge.js
var MERGE_KEY = "<<";
var merge = {
  identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
  default: "key",
  tag: "tag:yaml.org,2002:merge",
  test: /^<<$/,
  resolve: () => Object.assign(new Scalar(Symbol(MERGE_KEY)), {
    addToJSMap: addMergeToJSMap
  }),
  stringify: () => MERGE_KEY
};
var isMergeKey = (ctx, key) => (merge.identify(key) || isScalar(key) && (!key.type || key.type === Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
function addMergeToJSMap(ctx, map2, value) {
  const source = resolveAliasValue(ctx, value);
  if (isSeq(source))
    for (const it of source.items)
      mergeValue(ctx, map2, it);
  else if (Array.isArray(source))
    for (const it of source)
      mergeValue(ctx, map2, it);
  else
    mergeValue(ctx, map2, source);
}
function mergeValue(ctx, map2, value) {
  const source = resolveAliasValue(ctx, value);
  if (!isMap(source))
    throw new Error("Merge sources must be maps or map aliases");
  const srcMap = source.toJSON(null, ctx, Map);
  for (const [key, value2] of srcMap) {
    if (map2 instanceof Map) {
      if (!map2.has(key))
        map2.set(key, value2);
    } else if (map2 instanceof Set) {
      map2.add(key);
    } else if (!Object.prototype.hasOwnProperty.call(map2, key)) {
      Object.defineProperty(map2, key, {
        value: value2,
        writable: true,
        enumerable: true,
        configurable: true
      });
    }
  }
  return map2;
}
function resolveAliasValue(ctx, value) {
  return ctx && isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/addPairToJSMap.js
function addPairToJSMap(ctx, map2, { key, value }) {
  if (isNode(key) && key.addToJSMap)
    key.addToJSMap(ctx, map2, value);
  else if (isMergeKey(ctx, key))
    addMergeToJSMap(ctx, map2, value);
  else {
    const jsKey = toJS(key, "", ctx);
    if (map2 instanceof Map) {
      map2.set(jsKey, toJS(value, jsKey, ctx));
    } else if (map2 instanceof Set) {
      map2.add(jsKey);
    } else {
      const stringKey = stringifyKey(key, jsKey, ctx);
      const jsValue = toJS(value, stringKey, ctx);
      if (stringKey in map2)
        Object.defineProperty(map2, stringKey, {
          value: jsValue,
          writable: true,
          enumerable: true,
          configurable: true
        });
      else
        map2[stringKey] = jsValue;
    }
  }
  return map2;
}
function stringifyKey(key, jsKey, ctx) {
  if (jsKey === null)
    return "";
  if (typeof jsKey !== "object")
    return String(jsKey);
  if (isNode(key) && ctx?.doc) {
    const strCtx = createStringifyContext(ctx.doc, {});
    strCtx.anchors = /* @__PURE__ */ new Set();
    for (const node of ctx.anchors.keys())
      strCtx.anchors.add(node.anchor);
    strCtx.inFlow = true;
    strCtx.inStringifyKey = true;
    const strKey = key.toString(strCtx);
    if (!ctx.mapKeyWarned) {
      let jsonStr = JSON.stringify(strKey);
      if (jsonStr.length > 40)
        jsonStr = jsonStr.substring(0, 36) + '..."';
      warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
      ctx.mapKeyWarned = true;
    }
    return strKey;
  }
  return JSON.stringify(jsKey);
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/Pair.js
function createPair(key, value, ctx) {
  const k = createNode(key, void 0, ctx);
  const v = createNode(value, void 0, ctx);
  return new Pair(k, v);
}
var Pair = class _Pair {
  constructor(key, value = null) {
    Object.defineProperty(this, NODE_TYPE, { value: PAIR });
    this.key = key;
    this.value = value;
  }
  clone(schema4) {
    let { key, value } = this;
    if (isNode(key))
      key = key.clone(schema4);
    if (isNode(value))
      value = value.clone(schema4);
    return new _Pair(key, value);
  }
  toJSON(_, ctx) {
    const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    return addPairToJSMap(ctx, pair, this);
  }
  toString(ctx, onComment, onChompKeep) {
    return ctx?.doc ? stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyCollection.js
function stringifyCollection(collection, ctx, options) {
  const flow = ctx.inFlow ?? collection.flow;
  const stringify4 = flow ? stringifyFlowCollection : stringifyBlockCollection;
  return stringify4(collection, ctx, options);
}
function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
  const { indent, options: { commentString } } = ctx;
  const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
  let chompKeep = false;
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment2 = null;
    if (isNode(item)) {
      if (!chompKeep && item.spaceBefore)
        lines.push("");
      addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
      if (item.comment)
        comment2 = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (!chompKeep && ik.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
      }
    }
    chompKeep = false;
    let str2 = stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
    if (comment2)
      str2 += lineComment(str2, itemIndent, commentString(comment2));
    if (chompKeep && comment2)
      chompKeep = false;
    lines.push(blockItemPrefix + str2);
  }
  let str;
  if (lines.length === 0) {
    str = flowChars.start + flowChars.end;
  } else {
    str = lines[0];
    for (let i = 1; i < lines.length; ++i) {
      const line = lines[i];
      str += line ? `
${indent}${line}` : "\n";
    }
  }
  if (comment) {
    str += "\n" + indentComment(commentString(comment), indent);
    if (onComment)
      onComment();
  } else if (chompKeep && onChompKeep)
    onChompKeep();
  return str;
}
function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
  const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
  itemIndent += indentStep;
  const itemCtx = Object.assign({}, ctx, {
    indent: itemIndent,
    inFlow: true,
    type: null
  });
  let reqNewline = false;
  let linesAtValue = 0;
  const lines = [];
  for (let i = 0; i < items.length; ++i) {
    const item = items[i];
    let comment = null;
    if (isNode(item)) {
      if (item.spaceBefore)
        lines.push("");
      addCommentBefore(ctx, lines, item.commentBefore, false);
      if (item.comment)
        comment = item.comment;
    } else if (isPair(item)) {
      const ik = isNode(item.key) ? item.key : null;
      if (ik) {
        if (ik.spaceBefore)
          lines.push("");
        addCommentBefore(ctx, lines, ik.commentBefore, false);
        if (ik.comment)
          reqNewline = true;
      }
      const iv = isNode(item.value) ? item.value : null;
      if (iv) {
        if (iv.comment)
          comment = iv.comment;
        if (iv.commentBefore)
          reqNewline = true;
      } else if (item.value == null && ik?.comment) {
        comment = ik.comment;
      }
    }
    if (comment)
      reqNewline = true;
    let str = stringify(item, itemCtx, () => comment = null);
    reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"));
    if (i < items.length - 1) {
      str += ",";
    } else if (ctx.options.trailingComma) {
      if (ctx.options.lineWidth > 0) {
        reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) > ctx.options.lineWidth);
      }
      if (reqNewline) {
        str += ",";
      }
    }
    if (comment)
      str += lineComment(str, itemIndent, commentString(comment));
    lines.push(str);
    linesAtValue = lines.length;
  }
  const { start, end } = flowChars;
  if (lines.length === 0) {
    return start + end;
  } else {
    if (!reqNewline) {
      const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
      reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
    }
    if (reqNewline) {
      let str = start;
      for (const line of lines)
        str += line ? `
${indentStep}${indent}${line}` : "\n";
      return `${str}
${indent}${end}`;
    } else {
      return `${start}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
    }
  }
}
function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
  if (comment && chompKeep)
    comment = comment.replace(/^\n+/, "");
  if (comment) {
    const ic = indentComment(commentString(comment), indent);
    lines.push(ic.trimStart());
  }
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/YAMLMap.js
function findPair(items, key) {
  const k = isScalar(key) ? key.value : key;
  for (const it of items) {
    if (isPair(it)) {
      if (it.key === key || it.key === k)
        return it;
      if (isScalar(it.key) && it.key.value === k)
        return it;
    }
  }
  return void 0;
}
var YAMLMap = class extends Collection {
  static get tagName() {
    return "tag:yaml.org,2002:map";
  }
  constructor(schema4) {
    super(MAP, schema4);
    this.items = [];
  }
  /**
   * A generic collection parsing method that can be extended
   * to other node classes that inherit from YAMLMap
   */
  static from(schema4, obj, ctx) {
    const { keepUndefined, replacer } = ctx;
    const map2 = new this(schema4);
    const add2 = (key, value) => {
      if (typeof replacer === "function")
        value = replacer.call(obj, key, value);
      else if (Array.isArray(replacer) && !replacer.includes(key))
        return;
      if (value !== void 0 || keepUndefined)
        map2.items.push(createPair(key, value, ctx));
    };
    if (obj instanceof Map) {
      for (const [key, value] of obj)
        add2(key, value);
    } else if (obj && typeof obj === "object") {
      for (const key of Object.keys(obj))
        add2(key, obj[key]);
    }
    if (typeof schema4.sortMapEntries === "function") {
      map2.items.sort(schema4.sortMapEntries);
    }
    return map2;
  }
  /**
   * Adds a value to the collection.
   *
   * @param overwrite - If not set `true`, using a key that is already in the
   *   collection will throw. Otherwise, overwrites the previous value.
   */
  add(pair, overwrite) {
    let _pair;
    if (isPair(pair))
      _pair = pair;
    else if (!pair || typeof pair !== "object" || !("key" in pair)) {
      _pair = new Pair(pair, pair?.value);
    } else
      _pair = new Pair(pair.key, pair.value);
    const prev = findPair(this.items, _pair.key);
    const sortEntries = this.schema?.sortMapEntries;
    if (prev) {
      if (!overwrite)
        throw new Error(`Key ${_pair.key} already set`);
      if (isScalar(prev.value) && isScalarValue(_pair.value))
        prev.value.value = _pair.value;
      else
        prev.value = _pair.value;
    } else if (sortEntries) {
      const i = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
      if (i === -1)
        this.items.push(_pair);
      else
        this.items.splice(i, 0, _pair);
    } else {
      this.items.push(_pair);
    }
  }
  delete(key) {
    const it = findPair(this.items, key);
    if (!it)
      return false;
    const del = this.items.splice(this.items.indexOf(it), 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const it = findPair(this.items, key);
    const node = it?.value;
    return (!keepScalar && isScalar(node) ? node.value : node) ?? void 0;
  }
  has(key) {
    return !!findPair(this.items, key);
  }
  set(key, value) {
    this.add(new Pair(key, value), true);
  }
  /**
   * @param ctx - Conversion context, originally set in Document#toJS()
   * @param {Class} Type - If set, forces the returned collection type
   * @returns Instance of Type, Map, or Object
   */
  toJSON(_, ctx, Type) {
    const map2 = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
    if (ctx?.onCreate)
      ctx.onCreate(map2);
    for (const item of this.items)
      addPairToJSMap(ctx, map2, item);
    return map2;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    for (const item of this.items) {
      if (!isPair(item))
        throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
    }
    if (!ctx.allNullValues && this.hasAllNullValues(false))
      ctx = Object.assign({}, ctx, { allNullValues: true });
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "",
      flowChars: { start: "{", end: "}" },
      itemIndent: ctx.indent || "",
      onChompKeep,
      onComment
    });
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/common/map.js
var map = {
  collection: "map",
  default: true,
  nodeClass: YAMLMap,
  tag: "tag:yaml.org,2002:map",
  resolve(map2, onError) {
    if (!isMap(map2))
      onError("Expected a mapping for this tag");
    return map2;
  },
  createNode: (schema4, obj, ctx) => YAMLMap.from(schema4, obj, ctx)
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/nodes/YAMLSeq.js
var YAMLSeq = class extends Collection {
  static get tagName() {
    return "tag:yaml.org,2002:seq";
  }
  constructor(schema4) {
    super(SEQ, schema4);
    this.items = [];
  }
  add(value) {
    this.items.push(value);
  }
  /**
   * Removes a value from the collection.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   *
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      return false;
    const del = this.items.splice(idx, 1);
    return del.length > 0;
  }
  get(key, keepScalar) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      return void 0;
    const it = this.items[idx];
    return !keepScalar && isScalar(it) ? it.value : it;
  }
  /**
   * Checks if the collection includes a value with the key `key`.
   *
   * `key` must contain a representation of an integer for this to succeed.
   * It may be wrapped in a `Scalar`.
   */
  has(key) {
    const idx = asItemIndex(key);
    return typeof idx === "number" && idx < this.items.length;
  }
  /**
   * Sets a value in this collection. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   *
   * If `key` does not contain a representation of an integer, this will throw.
   * It may be wrapped in a `Scalar`.
   */
  set(key, value) {
    const idx = asItemIndex(key);
    if (typeof idx !== "number")
      throw new Error(`Expected a valid index, not ${key}.`);
    const prev = this.items[idx];
    if (isScalar(prev) && isScalarValue(value))
      prev.value = value;
    else
      this.items[idx] = value;
  }
  toJSON(_, ctx) {
    const seq2 = [];
    if (ctx?.onCreate)
      ctx.onCreate(seq2);
    let i = 0;
    for (const item of this.items)
      seq2.push(toJS(item, String(i++), ctx));
    return seq2;
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    return stringifyCollection(this, ctx, {
      blockItemPrefix: "- ",
      flowChars: { start: "[", end: "]" },
      itemIndent: (ctx.indent || "") + "  ",
      onChompKeep,
      onComment
    });
  }
  static from(schema4, obj, ctx) {
    const { replacer } = ctx;
    const seq2 = new this(schema4);
    if (obj && Symbol.iterator in Object(obj)) {
      let i = 0;
      for (let it of obj) {
        if (typeof replacer === "function") {
          const key = obj instanceof Set ? it : String(i++);
          it = replacer.call(obj, key, it);
        }
        seq2.items.push(createNode(it, void 0, ctx));
      }
    }
    return seq2;
  }
};
function asItemIndex(key) {
  let idx = isScalar(key) ? key.value : key;
  if (idx && typeof idx === "string")
    idx = Number(idx);
  return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/common/seq.js
var seq = {
  collection: "seq",
  default: true,
  nodeClass: YAMLSeq,
  tag: "tag:yaml.org,2002:seq",
  resolve(seq2, onError) {
    if (!isSeq(seq2))
      onError("Expected a sequence for this tag");
    return seq2;
  },
  createNode: (schema4, obj, ctx) => YAMLSeq.from(schema4, obj, ctx)
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/common/string.js
var string = {
  identify: (value) => typeof value === "string",
  default: true,
  tag: "tag:yaml.org,2002:str",
  resolve: (str) => str,
  stringify(item, ctx, onComment, onChompKeep) {
    ctx = Object.assign({ actualString: true }, ctx);
    return stringifyString(item, ctx, onComment, onChompKeep);
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/common/null.js
var nullTag = {
  identify: (value) => value == null,
  createNode: () => new Scalar(null),
  default: true,
  tag: "tag:yaml.org,2002:null",
  test: /^(?:~|[Nn]ull|NULL)?$/,
  resolve: () => new Scalar(null),
  stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/core/bool.js
var boolTag = {
  identify: (value) => typeof value === "boolean",
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
  resolve: (str) => new Scalar(str[0] === "t" || str[0] === "T"),
  stringify({ source, value }, ctx) {
    if (source && boolTag.test.test(source)) {
      const sv = source[0] === "t" || source[0] === "T";
      if (value === sv)
        return source;
    }
    return value ? ctx.options.trueStr : ctx.options.falseStr;
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyNumber.js
function stringifyNumber({ format, minFractionDigits, tag, value }) {
  if (typeof value === "bigint")
    return String(value);
  const num = typeof value === "number" ? value : Number(value);
  if (!isFinite(num))
    return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
  let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
  if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^-?\d/.test(n) && !n.includes("e")) {
    let i = n.indexOf(".");
    if (i < 0) {
      i = n.length;
      n += ".";
    }
    let d = minFractionDigits - (n.length - i - 1);
    while (d-- > 0)
      n += "0";
  }
  return n;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/core/float.js
var floatNaN = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber
};
var floatExp = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
  resolve: (str) => parseFloat(str),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
var float = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str));
    const dot = str.indexOf(".");
    if (dot !== -1 && str[str.length - 1] === "0")
      node.minFractionDigits = str.length - dot - 1;
    return node;
  },
  stringify: stringifyNumber
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/core/int.js
var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
function intStringify(node, radix, prefix) {
  const { value } = node;
  if (intIdentify(value) && value >= 0)
    return prefix + value.toString(radix);
  return stringifyNumber(node);
}
var intOct = {
  identify: (value) => intIdentify(value) && value >= 0,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^0o[0-7]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
  stringify: (node) => intStringify(node, 8, "0o")
};
var int = {
  identify: intIdentify,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
  stringify: stringifyNumber
};
var intHex = {
  identify: (value) => intIdentify(value) && value >= 0,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^0x[0-9a-fA-F]+$/,
  resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
  stringify: (node) => intStringify(node, 16, "0x")
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/core/schema.js
var schema = [
  map,
  seq,
  string,
  nullTag,
  boolTag,
  intOct,
  int,
  intHex,
  floatNaN,
  floatExp,
  float
];

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/json/schema.js
function intIdentify2(value) {
  return typeof value === "bigint" || Number.isInteger(value);
}
var stringifyJSON = ({ value }) => JSON.stringify(value);
var jsonScalars = [
  {
    identify: (value) => typeof value === "string",
    default: true,
    tag: "tag:yaml.org,2002:str",
    resolve: (str) => str,
    stringify: stringifyJSON
  },
  {
    identify: (value) => value == null,
    createNode: () => new Scalar(null),
    default: true,
    tag: "tag:yaml.org,2002:null",
    test: /^null$/,
    resolve: () => null,
    stringify: stringifyJSON
  },
  {
    identify: (value) => typeof value === "boolean",
    default: true,
    tag: "tag:yaml.org,2002:bool",
    test: /^true$|^false$/,
    resolve: (str) => str === "true",
    stringify: stringifyJSON
  },
  {
    identify: intIdentify2,
    default: true,
    tag: "tag:yaml.org,2002:int",
    test: /^-?(?:0|[1-9][0-9]*)$/,
    resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
    stringify: ({ value }) => intIdentify2(value) ? value.toString() : JSON.stringify(value)
  },
  {
    identify: (value) => typeof value === "number",
    default: true,
    tag: "tag:yaml.org,2002:float",
    test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
    resolve: (str) => parseFloat(str),
    stringify: stringifyJSON
  }
];
var jsonError = {
  default: true,
  tag: "",
  test: /^/,
  resolve(str, onError) {
    onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
    return str;
  }
};
var schema2 = [map, seq].concat(jsonScalars, jsonError);

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/binary.js
var binary = {
  identify: (value) => value instanceof Uint8Array,
  // Buffer inherits from Uint8Array
  default: false,
  tag: "tag:yaml.org,2002:binary",
  /**
   * Returns a Buffer in node and an Uint8Array in browsers
   *
   * To use the resulting buffer as an image, you'll want to do something like:
   *
   *   const blob = new Blob([buffer], { type: 'image/jpeg' })
   *   document.querySelector('#photo').src = URL.createObjectURL(blob)
   */
  resolve(src, onError) {
    if (typeof atob === "function") {
      const str = atob(src.replace(/[\n\r]/g, ""));
      const buffer = new Uint8Array(str.length);
      for (let i = 0; i < str.length; ++i)
        buffer[i] = str.charCodeAt(i);
      return buffer;
    } else {
      onError("This environment does not support reading binary tags; either Buffer or atob is required");
      return src;
    }
  },
  stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
    if (!value)
      return "";
    const buf = value;
    let str;
    if (typeof btoa === "function") {
      let s = "";
      for (let i = 0; i < buf.length; ++i)
        s += String.fromCharCode(buf[i]);
      str = btoa(s);
    } else {
      throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
    }
    type ?? (type = Scalar.BLOCK_LITERAL);
    if (type !== Scalar.QUOTE_DOUBLE) {
      const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
      const n = Math.ceil(str.length / lineWidth);
      const lines = new Array(n);
      for (let i = 0, o = 0; i < n; ++i, o += lineWidth) {
        lines[i] = str.substr(o, lineWidth);
      }
      str = lines.join(type === Scalar.BLOCK_LITERAL ? "\n" : " ");
    }
    return stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/pairs.js
function resolvePairs(seq2, onError) {
  if (isSeq(seq2)) {
    for (let i = 0; i < seq2.items.length; ++i) {
      let item = seq2.items[i];
      if (isPair(item))
        continue;
      else if (isMap(item)) {
        if (item.items.length > 1)
          onError("Each pair must have its own sequence indicator");
        const pair = item.items[0] || new Pair(new Scalar(null));
        if (item.commentBefore)
          pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
        if (item.comment) {
          const cn = pair.value ?? pair.key;
          cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
        }
        item = pair;
      }
      seq2.items[i] = isPair(item) ? item : new Pair(item);
    }
  } else
    onError("Expected a sequence for this tag");
  return seq2;
}
function createPairs(schema4, iterable, ctx) {
  const { replacer } = ctx;
  const pairs2 = new YAMLSeq(schema4);
  pairs2.tag = "tag:yaml.org,2002:pairs";
  let i = 0;
  if (iterable && Symbol.iterator in Object(iterable))
    for (let it of iterable) {
      if (typeof replacer === "function")
        it = replacer.call(iterable, String(i++), it);
      let key, value;
      if (Array.isArray(it)) {
        if (it.length === 2) {
          key = it[0];
          value = it[1];
        } else
          throw new TypeError(`Expected [key, value] tuple: ${it}`);
      } else if (it && it instanceof Object) {
        const keys = Object.keys(it);
        if (keys.length === 1) {
          key = keys[0];
          value = it[key];
        } else {
          throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
        }
      } else {
        key = it;
      }
      pairs2.items.push(createPair(key, value, ctx));
    }
  return pairs2;
}
var pairs = {
  collection: "seq",
  default: false,
  tag: "tag:yaml.org,2002:pairs",
  resolve: resolvePairs,
  createNode: createPairs
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/omap.js
var YAMLOMap = class _YAMLOMap extends YAMLSeq {
  constructor() {
    super();
    this.add = YAMLMap.prototype.add.bind(this);
    this.delete = YAMLMap.prototype.delete.bind(this);
    this.get = YAMLMap.prototype.get.bind(this);
    this.has = YAMLMap.prototype.has.bind(this);
    this.set = YAMLMap.prototype.set.bind(this);
    this.tag = _YAMLOMap.tag;
  }
  /**
   * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
   * but TypeScript won't allow widening the signature of a child method.
   */
  toJSON(_, ctx) {
    if (!ctx)
      return super.toJSON(_);
    const map2 = /* @__PURE__ */ new Map();
    if (ctx?.onCreate)
      ctx.onCreate(map2);
    for (const pair of this.items) {
      let key, value;
      if (isPair(pair)) {
        key = toJS(pair.key, "", ctx);
        value = toJS(pair.value, key, ctx);
      } else {
        key = toJS(pair, "", ctx);
      }
      if (map2.has(key))
        throw new Error("Ordered maps must not include duplicate keys");
      map2.set(key, value);
    }
    return map2;
  }
  static from(schema4, iterable, ctx) {
    const pairs2 = createPairs(schema4, iterable, ctx);
    const omap2 = new this();
    omap2.items = pairs2.items;
    return omap2;
  }
};
YAMLOMap.tag = "tag:yaml.org,2002:omap";
var omap = {
  collection: "seq",
  identify: (value) => value instanceof Map,
  nodeClass: YAMLOMap,
  default: false,
  tag: "tag:yaml.org,2002:omap",
  resolve(seq2, onError) {
    const pairs2 = resolvePairs(seq2, onError);
    const seenKeys = [];
    for (const { key } of pairs2.items) {
      if (isScalar(key)) {
        if (seenKeys.includes(key.value)) {
          onError(`Ordered maps must not include duplicate keys: ${key.value}`);
        } else {
          seenKeys.push(key.value);
        }
      }
    }
    return Object.assign(new YAMLOMap(), pairs2);
  },
  createNode: (schema4, iterable, ctx) => YAMLOMap.from(schema4, iterable, ctx)
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/bool.js
function boolStringify({ value, source }, ctx) {
  const boolObj = value ? trueTag : falseTag;
  if (source && boolObj.test.test(source))
    return source;
  return value ? ctx.options.trueStr : ctx.options.falseStr;
}
var trueTag = {
  identify: (value) => value === true,
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
  resolve: () => new Scalar(true),
  stringify: boolStringify
};
var falseTag = {
  identify: (value) => value === false,
  default: true,
  tag: "tag:yaml.org,2002:bool",
  test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
  resolve: () => new Scalar(false),
  stringify: boolStringify
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/float.js
var floatNaN2 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
  resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
  stringify: stringifyNumber
};
var floatExp2 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "EXP",
  test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
  resolve: (str) => parseFloat(str.replace(/_/g, "")),
  stringify(node) {
    const num = Number(node.value);
    return isFinite(num) ? num.toExponential() : stringifyNumber(node);
  }
};
var float2 = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
  resolve(str) {
    const node = new Scalar(parseFloat(str.replace(/_/g, "")));
    const dot = str.indexOf(".");
    if (dot !== -1) {
      const f = str.substring(dot + 1).replace(/_/g, "");
      if (f[f.length - 1] === "0")
        node.minFractionDigits = f.length;
    }
    return node;
  },
  stringify: stringifyNumber
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/int.js
var intIdentify3 = (value) => typeof value === "bigint" || Number.isInteger(value);
function intResolve2(str, offset, radix, { intAsBigInt }) {
  const sign = str[0];
  if (sign === "-" || sign === "+")
    offset += 1;
  str = str.substring(offset).replace(/_/g, "");
  if (intAsBigInt) {
    switch (radix) {
      case 2:
        str = `0b${str}`;
        break;
      case 8:
        str = `0o${str}`;
        break;
      case 16:
        str = `0x${str}`;
        break;
    }
    const n2 = BigInt(str);
    return sign === "-" ? BigInt(-1) * n2 : n2;
  }
  const n = parseInt(str, radix);
  return sign === "-" ? -1 * n : n;
}
function intStringify2(node, radix, prefix) {
  const { value } = node;
  if (intIdentify3(value)) {
    const str = value.toString(radix);
    return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
  }
  return stringifyNumber(node);
}
var intBin = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "BIN",
  test: /^[-+]?0b[0-1_]+$/,
  resolve: (str, _onError, opt) => intResolve2(str, 2, 2, opt),
  stringify: (node) => intStringify2(node, 2, "0b")
};
var intOct2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "OCT",
  test: /^[-+]?0[0-7_]+$/,
  resolve: (str, _onError, opt) => intResolve2(str, 1, 8, opt),
  stringify: (node) => intStringify2(node, 8, "0")
};
var int2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  test: /^[-+]?[0-9][0-9_]*$/,
  resolve: (str, _onError, opt) => intResolve2(str, 0, 10, opt),
  stringify: stringifyNumber
};
var intHex2 = {
  identify: intIdentify3,
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "HEX",
  test: /^[-+]?0x[0-9a-fA-F_]+$/,
  resolve: (str, _onError, opt) => intResolve2(str, 2, 16, opt),
  stringify: (node) => intStringify2(node, 16, "0x")
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/set.js
var YAMLSet = class _YAMLSet extends YAMLMap {
  constructor(schema4) {
    super(schema4);
    this.tag = _YAMLSet.tag;
  }
  add(key) {
    let pair;
    if (isPair(key))
      pair = key;
    else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
      pair = new Pair(key.key, null);
    else
      pair = new Pair(key, null);
    const prev = findPair(this.items, pair.key);
    if (!prev)
      this.items.push(pair);
  }
  /**
   * If `keepPair` is `true`, returns the Pair matching `key`.
   * Otherwise, returns the value of that Pair's key.
   */
  get(key, keepPair) {
    const pair = findPair(this.items, key);
    return !keepPair && isPair(pair) ? isScalar(pair.key) ? pair.key.value : pair.key : pair;
  }
  set(key, value) {
    if (typeof value !== "boolean")
      throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
    const prev = findPair(this.items, key);
    if (prev && !value) {
      this.items.splice(this.items.indexOf(prev), 1);
    } else if (!prev && value) {
      this.items.push(new Pair(key));
    }
  }
  toJSON(_, ctx) {
    return super.toJSON(_, ctx, Set);
  }
  toString(ctx, onComment, onChompKeep) {
    if (!ctx)
      return JSON.stringify(this);
    if (this.hasAllNullValues(true))
      return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
    else
      throw new Error("Set items must all have null values");
  }
  static from(schema4, iterable, ctx) {
    const { replacer } = ctx;
    const set2 = new this(schema4);
    if (iterable && Symbol.iterator in Object(iterable))
      for (let value of iterable) {
        if (typeof replacer === "function")
          value = replacer.call(iterable, value, value);
        set2.items.push(createPair(value, null, ctx));
      }
    return set2;
  }
};
YAMLSet.tag = "tag:yaml.org,2002:set";
var set = {
  collection: "map",
  identify: (value) => value instanceof Set,
  nodeClass: YAMLSet,
  default: false,
  tag: "tag:yaml.org,2002:set",
  createNode: (schema4, iterable, ctx) => YAMLSet.from(schema4, iterable, ctx),
  resolve(map2, onError) {
    if (isMap(map2)) {
      if (map2.hasAllNullValues(true))
        return Object.assign(new YAMLSet(), map2);
      else
        onError("Set items must all have null values");
    } else
      onError("Expected a mapping for this tag");
    return map2;
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/timestamp.js
function parseSexagesimal(str, asBigInt) {
  const sign = str[0];
  const parts = sign === "-" || sign === "+" ? str.substring(1) : str;
  const num = (n) => asBigInt ? BigInt(n) : Number(n);
  const res = parts.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
  return sign === "-" ? num(-1) * res : res;
}
function stringifySexagesimal(node) {
  let { value } = node;
  let num = (n) => n;
  if (typeof value === "bigint")
    num = (n) => BigInt(n);
  else if (isNaN(value) || !isFinite(value))
    return stringifyNumber(node);
  let sign = "";
  if (value < 0) {
    sign = "-";
    value *= num(-1);
  }
  const _60 = num(60);
  const parts = [value % _60];
  if (value < 60) {
    parts.unshift(0);
  } else {
    value = (value - parts[0]) / _60;
    parts.unshift(value % _60);
    if (value >= 60) {
      value = (value - parts[0]) / _60;
      parts.unshift(value);
    }
  }
  return sign + parts.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
}
var intTime = {
  identify: (value) => typeof value === "bigint" || Number.isInteger(value),
  default: true,
  tag: "tag:yaml.org,2002:int",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
  resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
  stringify: stringifySexagesimal
};
var floatTime = {
  identify: (value) => typeof value === "number",
  default: true,
  tag: "tag:yaml.org,2002:float",
  format: "TIME",
  test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
  resolve: (str) => parseSexagesimal(str, false),
  stringify: stringifySexagesimal
};
var timestamp = {
  identify: (value) => value instanceof Date,
  default: true,
  tag: "tag:yaml.org,2002:timestamp",
  // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
  // may be omitted altogether, resulting in a date format. In such a case, the time part is
  // assumed to be 00:00:00Z (start of day, UTC).
  test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
  resolve(str) {
    const match = str.match(timestamp.test);
    if (!match)
      throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
    const [, year, month, day, hour, minute, second] = match.map(Number);
    const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
    let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
    const tz = match[8];
    if (tz && tz !== "Z") {
      let d = parseSexagesimal(tz, false);
      if (Math.abs(d) < 30)
        d *= 60;
      date -= 6e4 * d;
    }
    return new Date(date);
  },
  stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/yaml-1.1/schema.js
var schema3 = [
  map,
  seq,
  string,
  nullTag,
  trueTag,
  falseTag,
  intBin,
  intOct2,
  int2,
  intHex2,
  floatNaN2,
  floatExp2,
  float2,
  binary,
  merge,
  omap,
  pairs,
  set,
  intTime,
  floatTime,
  timestamp
];

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/tags.js
var schemas = /* @__PURE__ */ new Map([
  ["core", schema],
  ["failsafe", [map, seq, string]],
  ["json", schema2],
  ["yaml11", schema3],
  ["yaml-1.1", schema3]
]);
var tagsByName = {
  binary,
  bool: boolTag,
  float,
  floatExp,
  floatNaN,
  floatTime,
  int,
  intHex,
  intOct,
  intTime,
  map,
  merge,
  null: nullTag,
  omap,
  pairs,
  seq,
  set,
  timestamp
};
var coreKnownTags = {
  "tag:yaml.org,2002:binary": binary,
  "tag:yaml.org,2002:merge": merge,
  "tag:yaml.org,2002:omap": omap,
  "tag:yaml.org,2002:pairs": pairs,
  "tag:yaml.org,2002:set": set,
  "tag:yaml.org,2002:timestamp": timestamp
};
function getTags(customTags, schemaName, addMergeTag) {
  const schemaTags = schemas.get(schemaName);
  if (schemaTags && !customTags) {
    return addMergeTag && !schemaTags.includes(merge) ? schemaTags.concat(merge) : schemaTags.slice();
  }
  let tags = schemaTags;
  if (!tags) {
    if (Array.isArray(customTags))
      tags = [];
    else {
      const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
    }
  }
  if (Array.isArray(customTags)) {
    for (const tag of customTags)
      tags = tags.concat(tag);
  } else if (typeof customTags === "function") {
    tags = customTags(tags.slice());
  }
  if (addMergeTag)
    tags = tags.concat(merge);
  return tags.reduce((tags2, tag) => {
    const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
    if (!tagObj) {
      const tagName = JSON.stringify(tag);
      const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
      throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
    }
    if (!tags2.includes(tagObj))
      tags2.push(tagObj);
    return tags2;
  }, []);
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/schema/Schema.js
var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
var Schema = class _Schema {
  constructor({ compat, customTags, merge: merge2, resolveKnownTags, schema: schema4, sortMapEntries, toStringDefaults }) {
    this.compat = Array.isArray(compat) ? getTags(compat, "compat") : compat ? getTags(null, compat) : null;
    this.name = typeof schema4 === "string" && schema4 || "core";
    this.knownTags = resolveKnownTags ? coreKnownTags : {};
    this.tags = getTags(customTags, this.name, merge2);
    this.toStringOptions = toStringDefaults ?? null;
    Object.defineProperty(this, MAP, { value: map });
    Object.defineProperty(this, SCALAR, { value: string });
    Object.defineProperty(this, SEQ, { value: seq });
    this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
  }
  clone() {
    const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
    copy.tags = this.tags.slice();
    return copy;
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/stringify/stringifyDocument.js
function stringifyDocument(doc, options) {
  const lines = [];
  let hasDirectives = options.directives === true;
  if (options.directives !== false && doc.directives) {
    const dir = doc.directives.toString(doc);
    if (dir) {
      lines.push(dir);
      hasDirectives = true;
    } else if (doc.directives.docStart)
      hasDirectives = true;
  }
  if (hasDirectives)
    lines.push("---");
  const ctx = createStringifyContext(doc, options);
  const { commentString } = ctx.options;
  if (doc.commentBefore) {
    if (lines.length !== 1)
      lines.unshift("");
    const cs = commentString(doc.commentBefore);
    lines.unshift(indentComment(cs, ""));
  }
  let chompKeep = false;
  let contentComment = null;
  if (doc.contents) {
    if (isNode(doc.contents)) {
      if (doc.contents.spaceBefore && hasDirectives)
        lines.push("");
      if (doc.contents.commentBefore) {
        const cs = commentString(doc.contents.commentBefore);
        lines.push(indentComment(cs, ""));
      }
      ctx.forceBlockIndent = !!doc.comment;
      contentComment = doc.contents.comment;
    }
    const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
    let body = stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
    if (contentComment)
      body += lineComment(body, "", commentString(contentComment));
    if ((body[0] === "|" || body[0] === ">") && lines[lines.length - 1] === "---") {
      lines[lines.length - 1] = `--- ${body}`;
    } else
      lines.push(body);
  } else {
    lines.push(stringify(doc.contents, ctx));
  }
  if (doc.directives?.docEnd) {
    if (doc.comment) {
      const cs = commentString(doc.comment);
      if (cs.includes("\n")) {
        lines.push("...");
        lines.push(indentComment(cs, ""));
      } else {
        lines.push(`... ${cs}`);
      }
    } else {
      lines.push("...");
    }
  } else {
    let dc = doc.comment;
    if (dc && chompKeep)
      dc = dc.replace(/^\n+/, "");
    if (dc) {
      if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
        lines.push("");
      lines.push(indentComment(commentString(dc), ""));
    }
  }
  return lines.join("\n") + "\n";
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/doc/Document.js
var Document = class _Document {
  constructor(value, replacer, options) {
    this.commentBefore = null;
    this.comment = null;
    this.errors = [];
    this.warnings = [];
    Object.defineProperty(this, NODE_TYPE, { value: DOC });
    let _replacer = null;
    if (typeof replacer === "function" || Array.isArray(replacer)) {
      _replacer = replacer;
    } else if (options === void 0 && replacer) {
      options = replacer;
      replacer = void 0;
    }
    const opt = Object.assign({
      intAsBigInt: false,
      keepSourceTokens: false,
      logLevel: "warn",
      prettyErrors: true,
      strict: true,
      stringKeys: false,
      uniqueKeys: true,
      version: "1.2"
    }, options);
    this.options = opt;
    let { version } = opt;
    if (options?._directives) {
      this.directives = options._directives.atDocument();
      if (this.directives.yaml.explicit)
        version = this.directives.yaml.version;
    } else
      this.directives = new Directives({ version });
    this.setSchema(version, options);
    this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
  }
  /**
   * Create a deep copy of this Document and its contents.
   *
   * Custom Node values that inherit from `Object` still refer to their original instances.
   */
  clone() {
    const copy = Object.create(_Document.prototype, {
      [NODE_TYPE]: { value: DOC }
    });
    copy.commentBefore = this.commentBefore;
    copy.comment = this.comment;
    copy.errors = this.errors.slice();
    copy.warnings = this.warnings.slice();
    copy.options = Object.assign({}, this.options);
    if (this.directives)
      copy.directives = this.directives.clone();
    copy.schema = this.schema.clone();
    copy.contents = isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
    if (this.range)
      copy.range = this.range.slice();
    return copy;
  }
  /** Adds a value to the document. */
  add(value) {
    if (assertCollection(this.contents))
      this.contents.add(value);
  }
  /** Adds a value to the document. */
  addIn(path, value) {
    if (assertCollection(this.contents))
      this.contents.addIn(path, value);
  }
  /**
   * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
   *
   * If `node` already has an anchor, `name` is ignored.
   * Otherwise, the `node.anchor` value will be set to `name`,
   * or if an anchor with that name is already present in the document,
   * `name` will be used as a prefix for a new unique anchor.
   * If `name` is undefined, the generated anchor will use 'a' as a prefix.
   */
  createAlias(node, name) {
    if (!node.anchor) {
      const prev = anchorNames(this);
      node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      !name || prev.has(name) ? findNewAnchor(name || "a", prev) : name;
    }
    return new Alias(node.anchor);
  }
  createNode(value, replacer, options) {
    let _replacer = void 0;
    if (typeof replacer === "function") {
      value = replacer.call({ "": value }, "", value);
      _replacer = replacer;
    } else if (Array.isArray(replacer)) {
      const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
      const asStr = replacer.filter(keyToStr).map(String);
      if (asStr.length > 0)
        replacer = replacer.concat(asStr);
      _replacer = replacer;
    } else if (options === void 0 && replacer) {
      options = replacer;
      replacer = void 0;
    }
    const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
    const { onAnchor, setAnchors, sourceObjects } = createNodeAnchors(
      this,
      // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      anchorPrefix || "a"
    );
    const ctx = {
      aliasDuplicateObjects: aliasDuplicateObjects ?? true,
      keepUndefined: keepUndefined ?? false,
      onAnchor,
      onTagObj,
      replacer: _replacer,
      schema: this.schema,
      sourceObjects
    };
    const node = createNode(value, tag, ctx);
    if (flow && isCollection(node))
      node.flow = true;
    setAnchors();
    return node;
  }
  /**
   * Convert a key and a value into a `Pair` using the current schema,
   * recursively wrapping all values as `Scalar` or `Collection` nodes.
   */
  createPair(key, value, options = {}) {
    const k = this.createNode(key, null, options);
    const v = this.createNode(value, null, options);
    return new Pair(k, v);
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  delete(key) {
    return assertCollection(this.contents) ? this.contents.delete(key) : false;
  }
  /**
   * Removes a value from the document.
   * @returns `true` if the item was found and removed.
   */
  deleteIn(path) {
    if (isEmptyPath(path)) {
      if (this.contents == null)
        return false;
      this.contents = null;
      return true;
    }
    return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
  }
  /**
   * Returns item at `key`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  get(key, keepScalar) {
    return isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
  }
  /**
   * Returns item at `path`, or `undefined` if not found. By default unwraps
   * scalar values from their surrounding node; to disable set `keepScalar` to
   * `true` (collections are always returned intact).
   */
  getIn(path, keepScalar) {
    if (isEmptyPath(path))
      return !keepScalar && isScalar(this.contents) ? this.contents.value : this.contents;
    return isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
  }
  /**
   * Checks if the document includes a value with the key `key`.
   */
  has(key) {
    return isCollection(this.contents) ? this.contents.has(key) : false;
  }
  /**
   * Checks if the document includes a value at `path`.
   */
  hasIn(path) {
    if (isEmptyPath(path))
      return this.contents !== void 0;
    return isCollection(this.contents) ? this.contents.hasIn(path) : false;
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  set(key, value) {
    if (this.contents == null) {
      this.contents = collectionFromPath(this.schema, [key], value);
    } else if (assertCollection(this.contents)) {
      this.contents.set(key, value);
    }
  }
  /**
   * Sets a value in this document. For `!!set`, `value` needs to be a
   * boolean to add/remove the item from the set.
   */
  setIn(path, value) {
    if (isEmptyPath(path)) {
      this.contents = value;
    } else if (this.contents == null) {
      this.contents = collectionFromPath(this.schema, Array.from(path), value);
    } else if (assertCollection(this.contents)) {
      this.contents.setIn(path, value);
    }
  }
  /**
   * Change the YAML version and schema used by the document.
   * A `null` version disables support for directives, explicit tags, anchors, and aliases.
   * It also requires the `schema` option to be given as a `Schema` instance value.
   *
   * Overrides all previously set schema options.
   */
  setSchema(version, options = {}) {
    if (typeof version === "number")
      version = String(version);
    let opt;
    switch (version) {
      case "1.1":
        if (this.directives)
          this.directives.yaml.version = "1.1";
        else
          this.directives = new Directives({ version: "1.1" });
        opt = { resolveKnownTags: false, schema: "yaml-1.1" };
        break;
      case "1.2":
      case "next":
        if (this.directives)
          this.directives.yaml.version = version;
        else
          this.directives = new Directives({ version });
        opt = { resolveKnownTags: true, schema: "core" };
        break;
      case null:
        if (this.directives)
          delete this.directives;
        opt = null;
        break;
      default: {
        const sv = JSON.stringify(version);
        throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
      }
    }
    if (options.schema instanceof Object)
      this.schema = options.schema;
    else if (opt)
      this.schema = new Schema(Object.assign(opt, options));
    else
      throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
  }
  // json & jsonArg are only used from toJSON()
  toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
    const ctx = {
      anchors: /* @__PURE__ */ new Map(),
      doc: this,
      keep: !json,
      mapAsMap: mapAsMap === true,
      mapKeyWarned: false,
      maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
    };
    const res = toJS(this.contents, jsonArg ?? "", ctx);
    if (typeof onAnchor === "function")
      for (const { count, res: res2 } of ctx.anchors.values())
        onAnchor(res2, count);
    return typeof reviver === "function" ? applyReviver(reviver, { "": res }, "", res) : res;
  }
  /**
   * A JSON representation of the document `contents`.
   *
   * @param jsonArg Used by `JSON.stringify` to indicate the array index or
   *   property name.
   */
  toJSON(jsonArg, onAnchor) {
    return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
  }
  /** A YAML representation of the document. */
  toString(options = {}) {
    if (this.errors.length > 0)
      throw new Error("Document with errors cannot be stringified");
    if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
      const s = JSON.stringify(options.indent);
      throw new Error(`"indent" option must be a positive integer, not ${s}`);
    }
    return stringifyDocument(this, options);
  }
};
function assertCollection(contents) {
  if (isCollection(contents))
    return true;
  throw new Error("Expected a YAML collection as document contents");
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/errors.js
var YAMLError = class extends Error {
  constructor(name, pos, code, message) {
    super();
    this.name = name;
    this.code = code;
    this.message = message;
    this.pos = pos;
  }
};
var YAMLParseError = class extends YAMLError {
  constructor(pos, code, message) {
    super("YAMLParseError", pos, code, message);
  }
};
var YAMLWarning = class extends YAMLError {
  constructor(pos, code, message) {
    super("YAMLWarning", pos, code, message);
  }
};
var prettifyError = (src, lc) => (error) => {
  if (error.pos[0] === -1)
    return;
  error.linePos = error.pos.map((pos) => lc.linePos(pos));
  const { line, col } = error.linePos[0];
  error.message += ` at line ${line}, column ${col}`;
  let ci = col - 1;
  let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
  if (ci >= 60 && lineStr.length > 80) {
    const trimStart = Math.min(ci - 39, lineStr.length - 79);
    lineStr = "\u2026" + lineStr.substring(trimStart);
    ci -= trimStart - 1;
  }
  if (lineStr.length > 80)
    lineStr = lineStr.substring(0, 79) + "\u2026";
  if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
    let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
    if (prev.length > 80)
      prev = prev.substring(0, 79) + "\u2026\n";
    lineStr = prev + lineStr;
  }
  if (/[^ ]/.test(lineStr)) {
    let count = 1;
    const end = error.linePos[1];
    if (end?.line === line && end.col > col) {
      count = Math.max(1, Math.min(end.col - col, 80 - ci));
    }
    const pointer = " ".repeat(ci) + "^".repeat(count);
    error.message += `:

${lineStr}
${pointer}
`;
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-props.js
function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
  let spaceBefore = false;
  let atNewline = startOnNewline;
  let hasSpace = startOnNewline;
  let comment = "";
  let commentSep = "";
  let hasNewline = false;
  let reqSpace = false;
  let tab = null;
  let anchor = null;
  let tag = null;
  let newlineAfterProp = null;
  let comma = null;
  let found = null;
  let start = null;
  for (const token of tokens) {
    if (reqSpace) {
      if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
        onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      reqSpace = false;
    }
    if (tab) {
      if (atNewline && token.type !== "comment" && token.type !== "newline") {
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      }
      tab = null;
    }
    switch (token.type) {
      case "space":
        if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
          tab = token;
        }
        hasSpace = true;
        break;
      case "comment": {
        if (!hasSpace)
          onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
        const cb = token.source.substring(1) || " ";
        if (!comment)
          comment = cb;
        else
          comment += commentSep + cb;
        commentSep = "";
        atNewline = false;
        break;
      }
      case "newline":
        if (atNewline) {
          if (comment)
            comment += token.source;
          else if (!found || indicator !== "seq-item-ind")
            spaceBefore = true;
        } else
          commentSep += token.source;
        atNewline = true;
        hasNewline = true;
        if (anchor || tag)
          newlineAfterProp = token;
        hasSpace = true;
        break;
      case "anchor":
        if (anchor)
          onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
        if (token.source.endsWith(":"))
          onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
        anchor = token;
        start ?? (start = token.offset);
        atNewline = false;
        hasSpace = false;
        reqSpace = true;
        break;
      case "tag": {
        if (tag)
          onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
        tag = token;
        start ?? (start = token.offset);
        atNewline = false;
        hasSpace = false;
        reqSpace = true;
        break;
      }
      case indicator:
        if (anchor || tag)
          onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
        if (found)
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
        found = token;
        atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
        hasSpace = false;
        break;
      case "comma":
        if (flow) {
          if (comma)
            onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
          comma = token;
          atNewline = false;
          hasSpace = false;
          break;
        }
      // else fallthrough
      default:
        onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
        atNewline = false;
        hasSpace = false;
    }
  }
  const last = tokens[tokens.length - 1];
  const end = last ? last.offset + last.source.length : offset;
  if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
    onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
  }
  if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq"))
    onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
  return {
    comma,
    found,
    spaceBefore,
    comment,
    hasNewline,
    anchor,
    tag,
    newlineAfterProp,
    end,
    start: start ?? end
  };
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/util-contains-newline.js
function containsNewline(key) {
  if (!key)
    return null;
  switch (key.type) {
    case "alias":
    case "scalar":
    case "double-quoted-scalar":
    case "single-quoted-scalar":
      if (key.source.includes("\n"))
        return true;
      if (key.end) {
        for (const st of key.end)
          if (st.type === "newline")
            return true;
      }
      return false;
    case "flow-collection":
      for (const it of key.items) {
        for (const st of it.start)
          if (st.type === "newline")
            return true;
        if (it.sep) {
          for (const st of it.sep)
            if (st.type === "newline")
              return true;
        }
        if (containsNewline(it.key) || containsNewline(it.value))
          return true;
      }
      return false;
    default:
      return true;
  }
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/util-flow-indent-check.js
function flowIndentCheck(indent, fc, onError) {
  if (fc?.type === "flow-collection") {
    const end = fc.end[0];
    if (end.indent === indent && (end.source === "]" || end.source === "}") && containsNewline(fc)) {
      const msg = "Flow end indicator should be more indented than parent";
      onError(end, "BAD_INDENT", msg, true);
    }
  }
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/util-map-includes.js
function mapIncludes(ctx, items, search) {
  const { uniqueKeys } = ctx.options;
  if (uniqueKeys === false)
    return false;
  const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || isScalar(a) && isScalar(b) && a.value === b.value;
  return items.some((pair) => isEqual(pair.key, search));
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-block-map.js
var startColMsg = "All mapping items must start at the same column";
function resolveBlockMap({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bm, onError, tag) {
  const NodeClass = tag?.nodeClass ?? YAMLMap;
  const map2 = new NodeClass(ctx.schema);
  if (ctx.atRoot)
    ctx.atRoot = false;
  let offset = bm.offset;
  let commentEnd = null;
  for (const collItem of bm.items) {
    const { start, key, sep, value } = collItem;
    const keyProps = resolveProps(start, {
      indicator: "explicit-key-ind",
      next: key ?? sep?.[0],
      offset,
      onError,
      parentIndent: bm.indent,
      startOnNewline: true
    });
    const implicitKey = !keyProps.found;
    if (implicitKey) {
      if (key) {
        if (key.type === "block-seq")
          onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
        else if ("indent" in key && key.indent !== bm.indent)
          onError(offset, "BAD_INDENT", startColMsg);
      }
      if (!keyProps.anchor && !keyProps.tag && !sep) {
        commentEnd = keyProps.end;
        if (keyProps.comment) {
          if (map2.comment)
            map2.comment += "\n" + keyProps.comment;
          else
            map2.comment = keyProps.comment;
        }
        continue;
      }
      if (keyProps.newlineAfterProp || containsNewline(key)) {
        onError(key ?? start[start.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
      }
    } else if (keyProps.found?.indent !== bm.indent) {
      onError(offset, "BAD_INDENT", startColMsg);
    }
    ctx.atKey = true;
    const keyStart = keyProps.end;
    const keyNode = key ? composeNode2(ctx, key, keyProps, onError) : composeEmptyNode2(ctx, keyStart, start, null, keyProps, onError);
    if (ctx.schema.compat)
      flowIndentCheck(bm.indent, key, onError);
    ctx.atKey = false;
    if (mapIncludes(ctx, map2.items, keyNode))
      onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
    const valueProps = resolveProps(sep ?? [], {
      indicator: "map-value-ind",
      next: value,
      offset: keyNode.range[2],
      onError,
      parentIndent: bm.indent,
      startOnNewline: !key || key.type === "block-scalar"
    });
    offset = valueProps.end;
    if (valueProps.found) {
      if (implicitKey) {
        if (value?.type === "block-map" && !valueProps.hasNewline)
          onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
        if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
          onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
      }
      const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : composeEmptyNode2(ctx, offset, sep, null, valueProps, onError);
      if (ctx.schema.compat)
        flowIndentCheck(bm.indent, value, onError);
      offset = valueNode.range[2];
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens)
        pair.srcToken = collItem;
      map2.items.push(pair);
    } else {
      if (implicitKey)
        onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
      if (valueProps.comment) {
        if (keyNode.comment)
          keyNode.comment += "\n" + valueProps.comment;
        else
          keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode);
      if (ctx.options.keepSourceTokens)
        pair.srcToken = collItem;
      map2.items.push(pair);
    }
  }
  if (commentEnd && commentEnd < offset)
    onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
  map2.range = [bm.offset, offset, commentEnd ?? offset];
  return map2;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-block-seq.js
function resolveBlockSeq({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, bs, onError, tag) {
  const NodeClass = tag?.nodeClass ?? YAMLSeq;
  const seq2 = new NodeClass(ctx.schema);
  if (ctx.atRoot)
    ctx.atRoot = false;
  if (ctx.atKey)
    ctx.atKey = false;
  let offset = bs.offset;
  let commentEnd = null;
  for (const { start, value } of bs.items) {
    const props = resolveProps(start, {
      indicator: "seq-item-ind",
      next: value,
      offset,
      onError,
      parentIndent: bs.indent,
      startOnNewline: true
    });
    if (!props.found) {
      if (props.anchor || props.tag || value) {
        if (value?.type === "block-seq")
          onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
        else
          onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
      } else {
        commentEnd = props.end;
        if (props.comment)
          seq2.comment = props.comment;
        continue;
      }
    }
    const node = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, start, null, props, onError);
    if (ctx.schema.compat)
      flowIndentCheck(bs.indent, value, onError);
    offset = node.range[2];
    seq2.items.push(node);
  }
  seq2.range = [bs.offset, offset, commentEnd ?? offset];
  return seq2;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-end.js
function resolveEnd(end, offset, reqSpace, onError) {
  let comment = "";
  if (end) {
    let hasSpace = false;
    let sep = "";
    for (const token of end) {
      const { source, type } = token;
      switch (type) {
        case "space":
          hasSpace = true;
          break;
        case "comment": {
          if (reqSpace && !hasSpace)
            onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
          const cb = source.substring(1) || " ";
          if (!comment)
            comment = cb;
          else
            comment += sep + cb;
          sep = "";
          break;
        }
        case "newline":
          if (comment)
            sep += source;
          hasSpace = true;
          break;
        default:
          onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
      }
      offset += source.length;
    }
  }
  return { comment, offset };
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-flow-collection.js
var blockMsg = "Block collections are not allowed within flow collections";
var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
function resolveFlowCollection({ composeNode: composeNode2, composeEmptyNode: composeEmptyNode2 }, ctx, fc, onError, tag) {
  const isMap2 = fc.start.source === "{";
  const fcName = isMap2 ? "flow map" : "flow sequence";
  const NodeClass = tag?.nodeClass ?? (isMap2 ? YAMLMap : YAMLSeq);
  const coll = new NodeClass(ctx.schema);
  coll.flow = true;
  const atRoot = ctx.atRoot;
  if (atRoot)
    ctx.atRoot = false;
  if (ctx.atKey)
    ctx.atKey = false;
  let offset = fc.offset + fc.start.source.length;
  for (let i = 0; i < fc.items.length; ++i) {
    const collItem = fc.items[i];
    const { start, key, sep, value } = collItem;
    const props = resolveProps(start, {
      flow: fcName,
      indicator: "explicit-key-ind",
      next: key ?? sep?.[0],
      offset,
      onError,
      parentIndent: fc.indent,
      startOnNewline: false
    });
    if (!props.found) {
      if (!props.anchor && !props.tag && !sep && !value) {
        if (i === 0 && props.comma)
          onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        else if (i < fc.items.length - 1)
          onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
        if (props.comment) {
          if (coll.comment)
            coll.comment += "\n" + props.comment;
          else
            coll.comment = props.comment;
        }
        offset = props.end;
        continue;
      }
      if (!isMap2 && ctx.options.strict && containsNewline(key))
        onError(
          key,
          // checked by containsNewline()
          "MULTILINE_IMPLICIT_KEY",
          "Implicit keys of flow sequence pairs need to be on a single line"
        );
    }
    if (i === 0) {
      if (props.comma)
        onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
    } else {
      if (!props.comma)
        onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
      if (props.comment) {
        let prevItemComment = "";
        loop: for (const st of start) {
          switch (st.type) {
            case "comma":
            case "space":
              break;
            case "comment":
              prevItemComment = st.source.substring(1);
              break loop;
            default:
              break loop;
          }
        }
        if (prevItemComment) {
          let prev = coll.items[coll.items.length - 1];
          if (isPair(prev))
            prev = prev.value ?? prev.key;
          if (prev.comment)
            prev.comment += "\n" + prevItemComment;
          else
            prev.comment = prevItemComment;
          props.comment = props.comment.substring(prevItemComment.length + 1);
        }
      }
    }
    if (!isMap2 && !sep && !props.found) {
      const valueNode = value ? composeNode2(ctx, value, props, onError) : composeEmptyNode2(ctx, props.end, sep, null, props, onError);
      coll.items.push(valueNode);
      offset = valueNode.range[2];
      if (isBlock(value))
        onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
    } else {
      ctx.atKey = true;
      const keyStart = props.end;
      const keyNode = key ? composeNode2(ctx, key, props, onError) : composeEmptyNode2(ctx, keyStart, start, null, props, onError);
      if (isBlock(key))
        onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
      ctx.atKey = false;
      const valueProps = resolveProps(sep ?? [], {
        flow: fcName,
        indicator: "map-value-ind",
        next: value,
        offset: keyNode.range[2],
        onError,
        parentIndent: fc.indent,
        startOnNewline: false
      });
      if (valueProps.found) {
        if (!isMap2 && !props.found && ctx.options.strict) {
          if (sep)
            for (const st of sep) {
              if (st === valueProps.found)
                break;
              if (st.type === "newline") {
                onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                break;
              }
            }
          if (props.start < valueProps.found.offset - 1024)
            onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
        }
      } else if (value) {
        if ("source" in value && value.source?.[0] === ":")
          onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
        else
          onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
      }
      const valueNode = value ? composeNode2(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode2(ctx, valueProps.end, sep, null, valueProps, onError) : null;
      if (valueNode) {
        if (isBlock(value))
          onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
      } else if (valueProps.comment) {
        if (keyNode.comment)
          keyNode.comment += "\n" + valueProps.comment;
        else
          keyNode.comment = valueProps.comment;
      }
      const pair = new Pair(keyNode, valueNode);
      if (ctx.options.keepSourceTokens)
        pair.srcToken = collItem;
      if (isMap2) {
        const map2 = coll;
        if (mapIncludes(ctx, map2.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        map2.items.push(pair);
      } else {
        const map2 = new YAMLMap(ctx.schema);
        map2.flow = true;
        map2.items.push(pair);
        const endRange = (valueNode ?? keyNode).range;
        map2.range = [keyNode.range[0], endRange[1], endRange[2]];
        coll.items.push(map2);
      }
      offset = valueNode ? valueNode.range[2] : valueProps.end;
    }
  }
  const expectedEnd = isMap2 ? "}" : "]";
  const [ce, ...ee] = fc.end;
  let cePos = offset;
  if (ce?.source === expectedEnd)
    cePos = ce.offset + ce.source.length;
  else {
    const name = fcName[0].toUpperCase() + fcName.substring(1);
    const msg = atRoot ? `${name} must end with a ${expectedEnd}` : `${name} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
    onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
    if (ce && ce.source.length !== 1)
      ee.unshift(ce);
  }
  if (ee.length > 0) {
    const end = resolveEnd(ee, cePos, ctx.options.strict, onError);
    if (end.comment) {
      if (coll.comment)
        coll.comment += "\n" + end.comment;
      else
        coll.comment = end.comment;
    }
    coll.range = [fc.offset, cePos, end.offset];
  } else {
    coll.range = [fc.offset, cePos, cePos];
  }
  return coll;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/compose-collection.js
function resolveCollection(CN2, ctx, token, onError, tagName, tag) {
  const coll = token.type === "block-map" ? resolveBlockMap(CN2, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq(CN2, ctx, token, onError, tag) : resolveFlowCollection(CN2, ctx, token, onError, tag);
  const Coll = coll.constructor;
  if (tagName === "!" || tagName === Coll.tagName) {
    coll.tag = Coll.tagName;
    return coll;
  }
  if (tagName)
    coll.tag = tagName;
  return coll;
}
function composeCollection(CN2, ctx, token, props, onError) {
  const tagToken = props.tag;
  const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
  if (token.type === "block-seq") {
    const { anchor, newlineAfterProp: nl } = props;
    const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
    if (lastProp && (!nl || nl.offset < lastProp.offset)) {
      const message = "Missing newline after block sequence props";
      onError(lastProp, "MISSING_CHAR", message);
    }
  }
  const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
  if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.tagName && expType === "seq") {
    return resolveCollection(CN2, ctx, token, onError, tagName);
  }
  let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
  if (!tag) {
    const kt = ctx.schema.knownTags[tagName];
    if (kt?.collection === expType) {
      ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
      tag = kt;
    } else {
      if (kt) {
        onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
      } else {
        onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
      }
      return resolveCollection(CN2, ctx, token, onError, tagName);
    }
  }
  const coll = resolveCollection(CN2, ctx, token, onError, tagName, tag);
  const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
  const node = isNode(res) ? res : new Scalar(res);
  node.range = coll.range;
  node.tag = tagName;
  if (tag?.format)
    node.format = tag.format;
  return node;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-block-scalar.js
function resolveBlockScalar(ctx, scalar, onError) {
  const start = scalar.offset;
  const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
  if (!header)
    return { value: "", type: null, comment: "", range: [start, start, start] };
  const type = header.mode === ">" ? Scalar.BLOCK_FOLDED : Scalar.BLOCK_LITERAL;
  const lines = scalar.source ? splitLines(scalar.source) : [];
  let chompStart = lines.length;
  for (let i = lines.length - 1; i >= 0; --i) {
    const content = lines[i][1];
    if (content === "" || content === "\r")
      chompStart = i;
    else
      break;
  }
  if (chompStart === 0) {
    const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
    let end2 = start + header.length;
    if (scalar.source)
      end2 += scalar.source.length;
    return { value: value2, type, comment: header.comment, range: [start, end2, end2] };
  }
  let trimIndent = scalar.indent + header.indent;
  let offset = scalar.offset + header.length;
  let contentStart = 0;
  for (let i = 0; i < chompStart; ++i) {
    const [indent, content] = lines[i];
    if (content === "" || content === "\r") {
      if (header.indent === 0 && indent.length > trimIndent)
        trimIndent = indent.length;
    } else {
      if (indent.length < trimIndent) {
        const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
        onError(offset + indent.length, "MISSING_CHAR", message);
      }
      if (header.indent === 0)
        trimIndent = indent.length;
      contentStart = i;
      if (trimIndent === 0 && !ctx.atRoot) {
        const message = "Block scalar values in collections must be indented";
        onError(offset, "BAD_INDENT", message);
      }
      break;
    }
    offset += indent.length + content.length + 1;
  }
  for (let i = lines.length - 1; i >= chompStart; --i) {
    if (lines[i][0].length > trimIndent)
      chompStart = i + 1;
  }
  let value = "";
  let sep = "";
  let prevMoreIndented = false;
  for (let i = 0; i < contentStart; ++i)
    value += lines[i][0].slice(trimIndent) + "\n";
  for (let i = contentStart; i < chompStart; ++i) {
    let [indent, content] = lines[i];
    offset += indent.length + content.length + 1;
    const crlf = content[content.length - 1] === "\r";
    if (crlf)
      content = content.slice(0, -1);
    if (content && indent.length < trimIndent) {
      const src = header.indent ? "explicit indentation indicator" : "first line";
      const message = `Block scalar lines must not be less indented than their ${src}`;
      onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
      indent = "";
    }
    if (type === Scalar.BLOCK_LITERAL) {
      value += sep + indent.slice(trimIndent) + content;
      sep = "\n";
    } else if (indent.length > trimIndent || content[0] === "	") {
      if (sep === " ")
        sep = "\n";
      else if (!prevMoreIndented && sep === "\n")
        sep = "\n\n";
      value += sep + indent.slice(trimIndent) + content;
      sep = "\n";
      prevMoreIndented = true;
    } else if (content === "") {
      if (sep === "\n")
        value += "\n";
      else
        sep = "\n";
    } else {
      value += sep + content;
      sep = " ";
      prevMoreIndented = false;
    }
  }
  switch (header.chomp) {
    case "-":
      break;
    case "+":
      for (let i = chompStart; i < lines.length; ++i)
        value += "\n" + lines[i][0].slice(trimIndent);
      if (value[value.length - 1] !== "\n")
        value += "\n";
      break;
    default:
      value += "\n";
  }
  const end = start + header.length + scalar.source.length;
  return { value, type, comment: header.comment, range: [start, end, end] };
}
function parseBlockScalarHeader({ offset, props }, strict, onError) {
  if (props[0].type !== "block-scalar-header") {
    onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
    return null;
  }
  const { source } = props[0];
  const mode = source[0];
  let indent = 0;
  let chomp = "";
  let error = -1;
  for (let i = 1; i < source.length; ++i) {
    const ch = source[i];
    if (!chomp && (ch === "-" || ch === "+"))
      chomp = ch;
    else {
      const n = Number(ch);
      if (!indent && n)
        indent = n;
      else if (error === -1)
        error = offset + i;
    }
  }
  if (error !== -1)
    onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
  let hasSpace = false;
  let comment = "";
  let length = source.length;
  for (let i = 1; i < props.length; ++i) {
    const token = props[i];
    switch (token.type) {
      case "space":
        hasSpace = true;
      // fallthrough
      case "newline":
        length += token.source.length;
        break;
      case "comment":
        if (strict && !hasSpace) {
          const message = "Comments must be separated from other tokens by white space characters";
          onError(token, "MISSING_CHAR", message);
        }
        length += token.source.length;
        comment = token.source.substring(1);
        break;
      case "error":
        onError(token, "UNEXPECTED_TOKEN", token.message);
        length += token.source.length;
        break;
      /* istanbul ignore next should not happen */
      default: {
        const message = `Unexpected token in block scalar header: ${token.type}`;
        onError(token, "UNEXPECTED_TOKEN", message);
        const ts = token.source;
        if (ts && typeof ts === "string")
          length += ts.length;
      }
    }
  }
  return { mode, indent, chomp, comment, length };
}
function splitLines(source) {
  const split = source.split(/\n( *)/);
  const first = split[0];
  const m = first.match(/^( *)/);
  const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
  const lines = [line0];
  for (let i = 1; i < split.length; i += 2)
    lines.push([split[i], split[i + 1]]);
  return lines;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/resolve-flow-scalar.js
function resolveFlowScalar(scalar, strict, onError) {
  const { offset, type, source, end } = scalar;
  let _type;
  let value;
  const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
  switch (type) {
    case "scalar":
      _type = Scalar.PLAIN;
      value = plainValue(source, _onError);
      break;
    case "single-quoted-scalar":
      _type = Scalar.QUOTE_SINGLE;
      value = singleQuotedValue(source, _onError);
      break;
    case "double-quoted-scalar":
      _type = Scalar.QUOTE_DOUBLE;
      value = doubleQuotedValue(source, _onError);
      break;
    /* istanbul ignore next should not happen */
    default:
      onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
      return {
        value: "",
        type: null,
        comment: "",
        range: [offset, offset + source.length, offset + source.length]
      };
  }
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, strict, onError);
  return {
    value,
    type: _type,
    comment: re.comment,
    range: [offset, valueEnd, re.offset]
  };
}
function plainValue(source, onError) {
  let badChar = "";
  switch (source[0]) {
    /* istanbul ignore next should not happen */
    case "	":
      badChar = "a tab character";
      break;
    case ",":
      badChar = "flow indicator character ,";
      break;
    case "%":
      badChar = "directive indicator character %";
      break;
    case "|":
    case ">": {
      badChar = `block scalar indicator ${source[0]}`;
      break;
    }
    case "@":
    case "`": {
      badChar = `reserved character ${source[0]}`;
      break;
    }
  }
  if (badChar)
    onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
  return foldLines(source);
}
function singleQuotedValue(source, onError) {
  if (source[source.length - 1] !== "'" || source.length === 1)
    onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
  return foldLines(source.slice(1, -1)).replace(/''/g, "'");
}
function foldLines(source) {
  let first, line;
  try {
    first = new RegExp("(.*?)(?<![ 	])[ 	]*\r?\n", "sy");
    line = new RegExp("[ 	]*(.*?)(?:(?<![ 	])[ 	]*)?\r?\n", "sy");
  } catch {
    first = /(.*?)[ \t]*\r?\n/sy;
    line = /[ \t]*(.*?)[ \t]*\r?\n/sy;
  }
  let match = first.exec(source);
  if (!match)
    return source;
  let res = match[1];
  let sep = " ";
  let pos = first.lastIndex;
  line.lastIndex = pos;
  while (match = line.exec(source)) {
    if (match[1] === "") {
      if (sep === "\n")
        res += sep;
      else
        sep = "\n";
    } else {
      res += sep + match[1];
      sep = " ";
    }
    pos = line.lastIndex;
  }
  const last = /[ \t]*(.*)/sy;
  last.lastIndex = pos;
  match = last.exec(source);
  return res + sep + (match?.[1] ?? "");
}
function doubleQuotedValue(source, onError) {
  let res = "";
  for (let i = 1; i < source.length - 1; ++i) {
    const ch = source[i];
    if (ch === "\r" && source[i + 1] === "\n")
      continue;
    if (ch === "\n") {
      const { fold, offset } = foldNewline(source, i);
      res += fold;
      i = offset;
    } else if (ch === "\\") {
      let next = source[++i];
      const cc = escapeCodes[next];
      if (cc)
        res += cc;
      else if (next === "\n") {
        next = source[i + 1];
        while (next === " " || next === "	")
          next = source[++i + 1];
      } else if (next === "\r" && source[i + 1] === "\n") {
        next = source[++i + 1];
        while (next === " " || next === "	")
          next = source[++i + 1];
      } else if (next === "x" || next === "u" || next === "U") {
        const length = next === "x" ? 2 : next === "u" ? 4 : 8;
        res += parseCharCode(source, i + 1, length, onError);
        i += length;
      } else {
        const raw = source.substr(i - 1, 2);
        onError(i - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        res += raw;
      }
    } else if (ch === " " || ch === "	") {
      const wsStart = i;
      let next = source[i + 1];
      while (next === " " || next === "	")
        next = source[++i + 1];
      if (next !== "\n" && !(next === "\r" && source[i + 2] === "\n"))
        res += i > wsStart ? source.slice(wsStart, i + 1) : ch;
    } else {
      res += ch;
    }
  }
  if (source[source.length - 1] !== '"' || source.length === 1)
    onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
  return res;
}
function foldNewline(source, offset) {
  let fold = "";
  let ch = source[offset + 1];
  while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
    if (ch === "\r" && source[offset + 2] !== "\n")
      break;
    if (ch === "\n")
      fold += "\n";
    offset += 1;
    ch = source[offset + 1];
  }
  if (!fold)
    fold = " ";
  return { fold, offset };
}
var escapeCodes = {
  "0": "\0",
  // null character
  a: "\x07",
  // bell character
  b: "\b",
  // backspace
  e: "\x1B",
  // escape character
  f: "\f",
  // form feed
  n: "\n",
  // line feed
  r: "\r",
  // carriage return
  t: "	",
  // horizontal tab
  v: "\v",
  // vertical tab
  N: "\x85",
  // Unicode next line
  _: "\xA0",
  // Unicode non-breaking space
  L: "\u2028",
  // Unicode line separator
  P: "\u2029",
  // Unicode paragraph separator
  " ": " ",
  '"': '"',
  "/": "/",
  "\\": "\\",
  "	": "	"
};
function parseCharCode(source, offset, length, onError) {
  const cc = source.substr(offset, length);
  const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
  const code = ok ? parseInt(cc, 16) : NaN;
  try {
    return String.fromCodePoint(code);
  } catch {
    const raw = source.substr(offset - 2, length + 2);
    onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
    return raw;
  }
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/compose-scalar.js
function composeScalar(ctx, token, tagToken, onError) {
  const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar(ctx, token, onError) : resolveFlowScalar(token, ctx.options.strict, onError);
  const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
  let tag;
  if (ctx.options.stringKeys && ctx.atKey) {
    tag = ctx.schema[SCALAR];
  } else if (tagName)
    tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
  else if (token.type === "scalar")
    tag = findScalarTagByTest(ctx, value, token, onError);
  else
    tag = ctx.schema[SCALAR];
  let scalar;
  try {
    const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
    scalar = isScalar(res) ? res : new Scalar(res);
  } catch (error) {
    const msg = error instanceof Error ? error.message : String(error);
    onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
    scalar = new Scalar(value);
  }
  scalar.range = range;
  scalar.source = value;
  if (type)
    scalar.type = type;
  if (tagName)
    scalar.tag = tagName;
  if (tag.format)
    scalar.format = tag.format;
  if (comment)
    scalar.comment = comment;
  return scalar;
}
function findScalarTagByName(schema4, value, tagName, tagToken, onError) {
  if (tagName === "!")
    return schema4[SCALAR];
  const matchWithTest = [];
  for (const tag of schema4.tags) {
    if (!tag.collection && tag.tag === tagName) {
      if (tag.default && tag.test)
        matchWithTest.push(tag);
      else
        return tag;
    }
  }
  for (const tag of matchWithTest)
    if (tag.test?.test(value))
      return tag;
  const kt = schema4.knownTags[tagName];
  if (kt && !kt.collection) {
    schema4.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
    return kt;
  }
  onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
  return schema4[SCALAR];
}
function findScalarTagByTest({ atKey, directives, schema: schema4 }, value, token, onError) {
  const tag = schema4.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema4[SCALAR];
  if (schema4.compat) {
    const compat = schema4.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema4[SCALAR];
    if (tag.tag !== compat.tag) {
      const ts = directives.tagString(tag.tag);
      const cs = directives.tagString(compat.tag);
      const msg = `Value may be parsed as either ${ts} or ${cs}`;
      onError(token, "TAG_RESOLVE_FAILED", msg, true);
    }
  }
  return tag;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/util-empty-scalar-position.js
function emptyScalarPosition(offset, before, pos) {
  if (before) {
    pos ?? (pos = before.length);
    for (let i = pos - 1; i >= 0; --i) {
      let st = before[i];
      switch (st.type) {
        case "space":
        case "comment":
        case "newline":
          offset -= st.source.length;
          continue;
      }
      st = before[++i];
      while (st?.type === "space") {
        offset += st.source.length;
        st = before[++i];
      }
      break;
    }
  }
  return offset;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/compose-node.js
var CN = { composeNode, composeEmptyNode };
function composeNode(ctx, token, props, onError) {
  const atKey = ctx.atKey;
  const { spaceBefore, comment, anchor, tag } = props;
  let node;
  let isSrcToken = true;
  switch (token.type) {
    case "alias":
      node = composeAlias(ctx, token, onError);
      if (anchor || tag)
        onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
      break;
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "block-scalar":
      node = composeScalar(ctx, token, tag, onError);
      if (anchor)
        node.anchor = anchor.source.substring(1);
      break;
    case "block-map":
    case "block-seq":
    case "flow-collection":
      try {
        node = composeCollection(CN, ctx, token, props, onError);
        if (anchor)
          node.anchor = anchor.source.substring(1);
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        onError(token, "RESOURCE_EXHAUSTION", message);
      }
      break;
    default: {
      const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
      onError(token, "UNEXPECTED_TOKEN", message);
      isSrcToken = false;
    }
  }
  node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError));
  if (anchor && node.anchor === "")
    onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
  if (atKey && ctx.options.stringKeys && (!isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
    const msg = "With stringKeys, all keys must be strings";
    onError(tag ?? token, "NON_STRING_KEY", msg);
  }
  if (spaceBefore)
    node.spaceBefore = true;
  if (comment) {
    if (token.type === "scalar" && token.source === "")
      node.comment = comment;
    else
      node.commentBefore = comment;
  }
  if (ctx.options.keepSourceTokens && isSrcToken)
    node.srcToken = token;
  return node;
}
function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
  const token = {
    type: "scalar",
    offset: emptyScalarPosition(offset, before, pos),
    indent: -1,
    source: ""
  };
  const node = composeScalar(ctx, token, tag, onError);
  if (anchor) {
    node.anchor = anchor.source.substring(1);
    if (node.anchor === "")
      onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
  }
  if (spaceBefore)
    node.spaceBefore = true;
  if (comment) {
    node.comment = comment;
    node.range[2] = end;
  }
  return node;
}
function composeAlias({ options }, { offset, source, end }, onError) {
  const alias = new Alias(source.substring(1));
  if (alias.source === "")
    onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
  if (alias.source.endsWith(":"))
    onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
  const valueEnd = offset + source.length;
  const re = resolveEnd(end, valueEnd, options.strict, onError);
  alias.range = [offset, valueEnd, re.offset];
  if (re.comment)
    alias.comment = re.comment;
  return alias;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/compose-doc.js
function composeDoc(options, directives, { offset, start, value, end }, onError) {
  const opts = Object.assign({ _directives: directives }, options);
  const doc = new Document(void 0, opts);
  const ctx = {
    atKey: false,
    atRoot: true,
    directives: doc.directives,
    options: doc.options,
    schema: doc.schema
  };
  const props = resolveProps(start, {
    indicator: "doc-start",
    next: value ?? end?.[0],
    offset,
    onError,
    parentIndent: 0,
    startOnNewline: true
  });
  if (props.found) {
    doc.directives.docStart = true;
    if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
      onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
  }
  doc.contents = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start, null, props, onError);
  const contentEnd = doc.contents.range[2];
  const re = resolveEnd(end, contentEnd, false, onError);
  if (re.comment)
    doc.comment = re.comment;
  doc.range = [offset, contentEnd, re.offset];
  return doc;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/compose/composer.js
function getErrorPos(src) {
  if (typeof src === "number")
    return [src, src + 1];
  if (Array.isArray(src))
    return src.length === 2 ? src : [src[0], src[1]];
  const { offset, source } = src;
  return [offset, offset + (typeof source === "string" ? source.length : 1)];
}
function parsePrelude(prelude) {
  let comment = "";
  let atComment = false;
  let afterEmptyLine = false;
  for (let i = 0; i < prelude.length; ++i) {
    const source = prelude[i];
    switch (source[0]) {
      case "#":
        comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
        atComment = true;
        afterEmptyLine = false;
        break;
      case "%":
        if (prelude[i + 1]?.[0] !== "#")
          i += 1;
        atComment = false;
        break;
      default:
        if (!atComment)
          afterEmptyLine = true;
        atComment = false;
    }
  }
  return { comment, afterEmptyLine };
}
var Composer = class {
  constructor(options = {}) {
    this.doc = null;
    this.atDirectives = false;
    this.prelude = [];
    this.errors = [];
    this.warnings = [];
    this.onError = (source, code, message, warning) => {
      const pos = getErrorPos(source);
      if (warning)
        this.warnings.push(new YAMLWarning(pos, code, message));
      else
        this.errors.push(new YAMLParseError(pos, code, message));
    };
    this.directives = new Directives({ version: options.version || "1.2" });
    this.options = options;
  }
  decorate(doc, afterDoc) {
    const { comment, afterEmptyLine } = parsePrelude(this.prelude);
    if (comment) {
      const dc = doc.contents;
      if (afterDoc) {
        doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
      } else if (afterEmptyLine || doc.directives.docStart || !dc) {
        doc.commentBefore = comment;
      } else if (isCollection(dc) && !dc.flow && dc.items.length > 0) {
        let it = dc.items[0];
        if (isPair(it))
          it = it.key;
        const cb = it.commentBefore;
        it.commentBefore = cb ? `${comment}
${cb}` : comment;
      } else {
        const cb = dc.commentBefore;
        dc.commentBefore = cb ? `${comment}
${cb}` : comment;
      }
    }
    if (afterDoc) {
      for (let i = 0; i < this.errors.length; ++i)
        doc.errors.push(this.errors[i]);
      for (let i = 0; i < this.warnings.length; ++i)
        doc.warnings.push(this.warnings[i]);
    } else {
      doc.errors = this.errors;
      doc.warnings = this.warnings;
    }
    this.prelude = [];
    this.errors = [];
    this.warnings = [];
  }
  /**
   * Current stream status information.
   *
   * Mostly useful at the end of input for an empty stream.
   */
  streamInfo() {
    return {
      comment: parsePrelude(this.prelude).comment,
      directives: this.directives,
      errors: this.errors,
      warnings: this.warnings
    };
  }
  /**
   * Compose tokens into documents.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *compose(tokens, forceDoc = false, endOffset = -1) {
    for (const token of tokens)
      yield* this.next(token);
    yield* this.end(forceDoc, endOffset);
  }
  /** Advance the composer by one CST token. */
  *next(token) {
    switch (token.type) {
      case "directive":
        this.directives.add(token.source, (offset, message, warning) => {
          const pos = getErrorPos(token);
          pos[0] += offset;
          this.onError(pos, "BAD_DIRECTIVE", message, warning);
        });
        this.prelude.push(token.source);
        this.atDirectives = true;
        break;
      case "document": {
        const doc = composeDoc(this.options, this.directives, token, this.onError);
        if (this.atDirectives && !doc.directives.docStart)
          this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
        this.decorate(doc, false);
        if (this.doc)
          yield this.doc;
        this.doc = doc;
        this.atDirectives = false;
        break;
      }
      case "byte-order-mark":
      case "space":
        break;
      case "comment":
      case "newline":
        this.prelude.push(token.source);
        break;
      case "error": {
        const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
        const error = new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
        if (this.atDirectives || !this.doc)
          this.errors.push(error);
        else
          this.doc.errors.push(error);
        break;
      }
      case "doc-end": {
        if (!this.doc) {
          const msg = "Unexpected doc-end without preceding document";
          this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
          break;
        }
        this.doc.directives.docEnd = true;
        const end = resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
        this.decorate(this.doc, true);
        if (end.comment) {
          const dc = this.doc.comment;
          this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
        }
        this.doc.range[2] = end.offset;
        break;
      }
      default:
        this.errors.push(new YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
    }
  }
  /**
   * Call at end of input to yield any remaining document.
   *
   * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
   * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
   */
  *end(forceDoc = false, endOffset = -1) {
    if (this.doc) {
      this.decorate(this.doc, true);
      yield this.doc;
      this.doc = null;
    } else if (forceDoc) {
      const opts = Object.assign({ _directives: this.directives }, this.options);
      const doc = new Document(void 0, opts);
      if (this.atDirectives)
        this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
      doc.range = [0, endOffset, endOffset];
      this.decorate(doc, false);
      yield doc;
    }
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/parse/cst-visit.js
var BREAK2 = Symbol("break visit");
var SKIP2 = Symbol("skip children");
var REMOVE2 = Symbol("remove item");
function visit2(cst, visitor) {
  if ("type" in cst && cst.type === "document")
    cst = { start: cst.start, value: cst.value };
  _visit(Object.freeze([]), cst, visitor);
}
visit2.BREAK = BREAK2;
visit2.SKIP = SKIP2;
visit2.REMOVE = REMOVE2;
visit2.itemAtPath = (cst, path) => {
  let item = cst;
  for (const [field, index] of path) {
    const tok = item?.[field];
    if (tok && "items" in tok) {
      item = tok.items[index];
    } else
      return void 0;
  }
  return item;
};
visit2.parentCollection = (cst, path) => {
  const parent = visit2.itemAtPath(cst, path.slice(0, -1));
  const field = path[path.length - 1][0];
  const coll = parent?.[field];
  if (coll && "items" in coll)
    return coll;
  throw new Error("Parent collection not found");
};
function _visit(path, item, visitor) {
  let ctrl = visitor(item, path);
  if (typeof ctrl === "symbol")
    return ctrl;
  for (const field of ["key", "value"]) {
    const token = item[field];
    if (token && "items" in token) {
      for (let i = 0; i < token.items.length; ++i) {
        const ci = _visit(Object.freeze(path.concat([[field, i]])), token.items[i], visitor);
        if (typeof ci === "number")
          i = ci - 1;
        else if (ci === BREAK2)
          return BREAK2;
        else if (ci === REMOVE2) {
          token.items.splice(i, 1);
          i -= 1;
        }
      }
      if (typeof ctrl === "function" && field === "key")
        ctrl = ctrl(item, path);
    }
  }
  return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/parse/cst.js
var BOM = "\uFEFF";
var DOCUMENT = "";
var FLOW_END = "";
var SCALAR2 = "";
function tokenType(source) {
  switch (source) {
    case BOM:
      return "byte-order-mark";
    case DOCUMENT:
      return "doc-mode";
    case FLOW_END:
      return "flow-error-end";
    case SCALAR2:
      return "scalar";
    case "---":
      return "doc-start";
    case "...":
      return "doc-end";
    case "":
    case "\n":
    case "\r\n":
      return "newline";
    case "-":
      return "seq-item-ind";
    case "?":
      return "explicit-key-ind";
    case ":":
      return "map-value-ind";
    case "{":
      return "flow-map-start";
    case "}":
      return "flow-map-end";
    case "[":
      return "flow-seq-start";
    case "]":
      return "flow-seq-end";
    case ",":
      return "comma";
  }
  switch (source[0]) {
    case " ":
    case "	":
      return "space";
    case "#":
      return "comment";
    case "%":
      return "directive-line";
    case "*":
      return "alias";
    case "&":
      return "anchor";
    case "!":
      return "tag";
    case "'":
      return "single-quoted-scalar";
    case '"':
      return "double-quoted-scalar";
    case "|":
    case ">":
      return "block-scalar-header";
  }
  return null;
}

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/parse/lexer.js
function isEmpty(ch) {
  switch (ch) {
    case void 0:
    case " ":
    case "\n":
    case "\r":
    case "	":
      return true;
    default:
      return false;
  }
}
var hexDigits = new Set("0123456789ABCDEFabcdef");
var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
var flowIndicatorChars = new Set(",[]{}");
var invalidAnchorChars = new Set(" ,[]{}\n\r	");
var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
var Lexer = class {
  constructor() {
    this.atEnd = false;
    this.blockScalarIndent = -1;
    this.blockScalarKeep = false;
    this.buffer = "";
    this.flowKey = false;
    this.flowLevel = 0;
    this.indentNext = 0;
    this.indentValue = 0;
    this.lineEndPos = null;
    this.next = null;
    this.pos = 0;
  }
  /**
   * Generate YAML tokens from the `source` string. If `incomplete`,
   * a part of the last line may be left as a buffer for the next call.
   *
   * @returns A generator of lexical tokens
   */
  *lex(source, incomplete = false) {
    if (source) {
      if (typeof source !== "string")
        throw TypeError("source is not a string");
      this.buffer = this.buffer ? this.buffer + source : source;
      this.lineEndPos = null;
    }
    this.atEnd = !incomplete;
    let next = this.next ?? "stream";
    while (next && (incomplete || this.hasChars(1)))
      next = yield* this.parseNext(next);
  }
  atLineEnd() {
    let i = this.pos;
    let ch = this.buffer[i];
    while (ch === " " || ch === "	")
      ch = this.buffer[++i];
    if (!ch || ch === "#" || ch === "\n")
      return true;
    if (ch === "\r")
      return this.buffer[i + 1] === "\n";
    return false;
  }
  charAt(n) {
    return this.buffer[this.pos + n];
  }
  continueScalar(offset) {
    let ch = this.buffer[offset];
    if (this.indentNext > 0) {
      let indent = 0;
      while (ch === " ")
        ch = this.buffer[++indent + offset];
      if (ch === "\r") {
        const next = this.buffer[indent + offset + 1];
        if (next === "\n" || !next && !this.atEnd)
          return offset + indent + 1;
      }
      return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
    }
    if (ch === "-" || ch === ".") {
      const dt = this.buffer.substr(offset, 3);
      if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
        return -1;
    }
    return offset;
  }
  getLine() {
    let end = this.lineEndPos;
    if (typeof end !== "number" || end !== -1 && end < this.pos) {
      end = this.buffer.indexOf("\n", this.pos);
      this.lineEndPos = end;
    }
    if (end === -1)
      return this.atEnd ? this.buffer.substring(this.pos) : null;
    if (this.buffer[end - 1] === "\r")
      end -= 1;
    return this.buffer.substring(this.pos, end);
  }
  hasChars(n) {
    return this.pos + n <= this.buffer.length;
  }
  setNext(state) {
    this.buffer = this.buffer.substring(this.pos);
    this.pos = 0;
    this.lineEndPos = null;
    this.next = state;
    return null;
  }
  peek(n) {
    return this.buffer.substr(this.pos, n);
  }
  *parseNext(next) {
    switch (next) {
      case "stream":
        return yield* this.parseStream();
      case "line-start":
        return yield* this.parseLineStart();
      case "block-start":
        return yield* this.parseBlockStart();
      case "doc":
        return yield* this.parseDocument();
      case "flow":
        return yield* this.parseFlowCollection();
      case "quoted-scalar":
        return yield* this.parseQuotedScalar();
      case "block-scalar":
        return yield* this.parseBlockScalar();
      case "plain-scalar":
        return yield* this.parsePlainScalar();
    }
  }
  *parseStream() {
    let line = this.getLine();
    if (line === null)
      return this.setNext("stream");
    if (line[0] === BOM) {
      yield* this.pushCount(1);
      line = line.substring(1);
    }
    if (line[0] === "%") {
      let dirEnd = line.length;
      let cs = line.indexOf("#");
      while (cs !== -1) {
        const ch = line[cs - 1];
        if (ch === " " || ch === "	") {
          dirEnd = cs - 1;
          break;
        } else {
          cs = line.indexOf("#", cs + 1);
        }
      }
      while (true) {
        const ch = line[dirEnd - 1];
        if (ch === " " || ch === "	")
          dirEnd -= 1;
        else
          break;
      }
      const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
      yield* this.pushCount(line.length - n);
      this.pushNewline();
      return "stream";
    }
    if (this.atLineEnd()) {
      const sp = yield* this.pushSpaces(true);
      yield* this.pushCount(line.length - sp);
      yield* this.pushNewline();
      return "stream";
    }
    yield DOCUMENT;
    return yield* this.parseLineStart();
  }
  *parseLineStart() {
    const ch = this.charAt(0);
    if (!ch && !this.atEnd)
      return this.setNext("line-start");
    if (ch === "-" || ch === ".") {
      if (!this.atEnd && !this.hasChars(4))
        return this.setNext("line-start");
      const s = this.peek(3);
      if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
        yield* this.pushCount(3);
        this.indentValue = 0;
        this.indentNext = 0;
        return s === "---" ? "doc" : "stream";
      }
    }
    this.indentValue = yield* this.pushSpaces(false);
    if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
      this.indentNext = this.indentValue;
    return yield* this.parseBlockStart();
  }
  *parseBlockStart() {
    const [ch0, ch1] = this.peek(2);
    if (!ch1 && !this.atEnd)
      return this.setNext("block-start");
    if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
      const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
      this.indentNext = this.indentValue + 1;
      this.indentValue += n;
      return "block-start";
    }
    return "doc";
  }
  *parseDocument() {
    yield* this.pushSpaces(true);
    const line = this.getLine();
    if (line === null)
      return this.setNext("doc");
    let n = yield* this.pushIndicators();
    switch (line[n]) {
      case "#":
        yield* this.pushCount(line.length - n);
      // fallthrough
      case void 0:
        yield* this.pushNewline();
        return yield* this.parseLineStart();
      case "{":
      case "[":
        yield* this.pushCount(1);
        this.flowKey = false;
        this.flowLevel = 1;
        return "flow";
      case "}":
      case "]":
        yield* this.pushCount(1);
        return "doc";
      case "*":
        yield* this.pushUntil(isNotAnchorChar);
        return "doc";
      case '"':
      case "'":
        return yield* this.parseQuotedScalar();
      case "|":
      case ">":
        n += yield* this.parseBlockScalarHeader();
        n += yield* this.pushSpaces(true);
        yield* this.pushCount(line.length - n);
        yield* this.pushNewline();
        return yield* this.parseBlockScalar();
      default:
        return yield* this.parsePlainScalar();
    }
  }
  *parseFlowCollection() {
    let nl, sp;
    let indent = -1;
    do {
      nl = yield* this.pushNewline();
      if (nl > 0) {
        sp = yield* this.pushSpaces(false);
        this.indentValue = indent = sp;
      } else {
        sp = 0;
      }
      sp += yield* this.pushSpaces(true);
    } while (nl + sp > 0);
    const line = this.getLine();
    if (line === null)
      return this.setNext("flow");
    if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
      const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
      if (!atFlowEndMarker) {
        this.flowLevel = 0;
        yield FLOW_END;
        return yield* this.parseLineStart();
      }
    }
    let n = 0;
    while (line[n] === ",") {
      n += yield* this.pushCount(1);
      n += yield* this.pushSpaces(true);
      this.flowKey = false;
    }
    n += yield* this.pushIndicators();
    switch (line[n]) {
      case void 0:
        return "flow";
      case "#":
        yield* this.pushCount(line.length - n);
        return "flow";
      case "{":
      case "[":
        yield* this.pushCount(1);
        this.flowKey = false;
        this.flowLevel += 1;
        return "flow";
      case "}":
      case "]":
        yield* this.pushCount(1);
        this.flowKey = true;
        this.flowLevel -= 1;
        return this.flowLevel ? "flow" : "doc";
      case "*":
        yield* this.pushUntil(isNotAnchorChar);
        return "flow";
      case '"':
      case "'":
        this.flowKey = true;
        return yield* this.parseQuotedScalar();
      case ":": {
        const next = this.charAt(1);
        if (this.flowKey || isEmpty(next) || next === ",") {
          this.flowKey = false;
          yield* this.pushCount(1);
          yield* this.pushSpaces(true);
          return "flow";
        }
      }
      // fallthrough
      default:
        this.flowKey = false;
        return yield* this.parsePlainScalar();
    }
  }
  *parseQuotedScalar() {
    const quote = this.charAt(0);
    let end = this.buffer.indexOf(quote, this.pos + 1);
    if (quote === "'") {
      while (end !== -1 && this.buffer[end + 1] === "'")
        end = this.buffer.indexOf("'", end + 2);
    } else {
      while (end !== -1) {
        let n = 0;
        while (this.buffer[end - 1 - n] === "\\")
          n += 1;
        if (n % 2 === 0)
          break;
        end = this.buffer.indexOf('"', end + 1);
      }
    }
    const qb = this.buffer.substring(0, end);
    let nl = qb.indexOf("\n", this.pos);
    if (nl !== -1) {
      while (nl !== -1) {
        const cs = this.continueScalar(nl + 1);
        if (cs === -1)
          break;
        nl = qb.indexOf("\n", cs);
      }
      if (nl !== -1) {
        end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
      }
    }
    if (end === -1) {
      if (!this.atEnd)
        return this.setNext("quoted-scalar");
      end = this.buffer.length;
    }
    yield* this.pushToIndex(end + 1, false);
    return this.flowLevel ? "flow" : "doc";
  }
  *parseBlockScalarHeader() {
    this.blockScalarIndent = -1;
    this.blockScalarKeep = false;
    let i = this.pos;
    while (true) {
      const ch = this.buffer[++i];
      if (ch === "+")
        this.blockScalarKeep = true;
      else if (ch > "0" && ch <= "9")
        this.blockScalarIndent = Number(ch) - 1;
      else if (ch !== "-")
        break;
    }
    return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
  }
  *parseBlockScalar() {
    let nl = this.pos - 1;
    let indent = 0;
    let ch;
    loop: for (let i2 = this.pos; ch = this.buffer[i2]; ++i2) {
      switch (ch) {
        case " ":
          indent += 1;
          break;
        case "\n":
          nl = i2;
          indent = 0;
          break;
        case "\r": {
          const next = this.buffer[i2 + 1];
          if (!next && !this.atEnd)
            return this.setNext("block-scalar");
          if (next === "\n")
            break;
        }
        // fallthrough
        default:
          break loop;
      }
    }
    if (!ch && !this.atEnd)
      return this.setNext("block-scalar");
    if (indent >= this.indentNext) {
      if (this.blockScalarIndent === -1)
        this.indentNext = indent;
      else {
        this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
      }
      do {
        const cs = this.continueScalar(nl + 1);
        if (cs === -1)
          break;
        nl = this.buffer.indexOf("\n", cs);
      } while (nl !== -1);
      if (nl === -1) {
        if (!this.atEnd)
          return this.setNext("block-scalar");
        nl = this.buffer.length;
      }
    }
    let i = nl + 1;
    ch = this.buffer[i];
    while (ch === " ")
      ch = this.buffer[++i];
    if (ch === "	") {
      while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
        ch = this.buffer[++i];
      nl = i - 1;
    } else if (!this.blockScalarKeep) {
      do {
        let i2 = nl - 1;
        let ch2 = this.buffer[i2];
        if (ch2 === "\r")
          ch2 = this.buffer[--i2];
        const lastChar = i2;
        while (ch2 === " ")
          ch2 = this.buffer[--i2];
        if (ch2 === "\n" && i2 >= this.pos && i2 + 1 + indent > lastChar)
          nl = i2;
        else
          break;
      } while (true);
    }
    yield SCALAR2;
    yield* this.pushToIndex(nl + 1, true);
    return yield* this.parseLineStart();
  }
  *parsePlainScalar() {
    const inFlow = this.flowLevel > 0;
    let end = this.pos - 1;
    let i = this.pos - 1;
    let ch;
    while (ch = this.buffer[++i]) {
      if (ch === ":") {
        const next = this.buffer[i + 1];
        if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
          break;
        end = i;
      } else if (isEmpty(ch)) {
        let next = this.buffer[i + 1];
        if (ch === "\r") {
          if (next === "\n") {
            i += 1;
            ch = "\n";
            next = this.buffer[i + 1];
          } else
            end = i;
        }
        if (next === "#" || inFlow && flowIndicatorChars.has(next))
          break;
        if (ch === "\n") {
          const cs = this.continueScalar(i + 1);
          if (cs === -1)
            break;
          i = Math.max(i, cs - 2);
        }
      } else {
        if (inFlow && flowIndicatorChars.has(ch))
          break;
        end = i;
      }
    }
    if (!ch && !this.atEnd)
      return this.setNext("plain-scalar");
    yield SCALAR2;
    yield* this.pushToIndex(end + 1, true);
    return inFlow ? "flow" : "doc";
  }
  *pushCount(n) {
    if (n > 0) {
      yield this.buffer.substr(this.pos, n);
      this.pos += n;
      return n;
    }
    return 0;
  }
  *pushToIndex(i, allowEmpty) {
    const s = this.buffer.slice(this.pos, i);
    if (s) {
      yield s;
      this.pos += s.length;
      return s.length;
    } else if (allowEmpty)
      yield "";
    return 0;
  }
  *pushIndicators() {
    let n = 0;
    loop: while (true) {
      switch (this.charAt(0)) {
        case "!":
          n += yield* this.pushTag();
          n += yield* this.pushSpaces(true);
          continue loop;
        case "&":
          n += yield* this.pushUntil(isNotAnchorChar);
          n += yield* this.pushSpaces(true);
          continue loop;
        case "-":
        // this is an error
        case "?":
        // this is an error outside flow collections
        case ":": {
          const inFlow = this.flowLevel > 0;
          const ch1 = this.charAt(1);
          if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
            if (!inFlow)
              this.indentNext = this.indentValue + 1;
            else if (this.flowKey)
              this.flowKey = false;
            n += yield* this.pushCount(1);
            n += yield* this.pushSpaces(true);
            continue loop;
          }
        }
      }
      break loop;
    }
    return n;
  }
  *pushTag() {
    if (this.charAt(1) === "<") {
      let i = this.pos + 2;
      let ch = this.buffer[i];
      while (!isEmpty(ch) && ch !== ">")
        ch = this.buffer[++i];
      return yield* this.pushToIndex(ch === ">" ? i + 1 : i, false);
    } else {
      let i = this.pos + 1;
      let ch = this.buffer[i];
      while (ch) {
        if (tagChars.has(ch))
          ch = this.buffer[++i];
        else if (ch === "%" && hexDigits.has(this.buffer[i + 1]) && hexDigits.has(this.buffer[i + 2])) {
          ch = this.buffer[i += 3];
        } else
          break;
      }
      return yield* this.pushToIndex(i, false);
    }
  }
  *pushNewline() {
    const ch = this.buffer[this.pos];
    if (ch === "\n")
      return yield* this.pushCount(1);
    else if (ch === "\r" && this.charAt(1) === "\n")
      return yield* this.pushCount(2);
    else
      return 0;
  }
  *pushSpaces(allowTabs) {
    let i = this.pos - 1;
    let ch;
    do {
      ch = this.buffer[++i];
    } while (ch === " " || allowTabs && ch === "	");
    const n = i - this.pos;
    if (n > 0) {
      yield this.buffer.substr(this.pos, n);
      this.pos = i;
    }
    return n;
  }
  *pushUntil(test) {
    let i = this.pos;
    let ch = this.buffer[i];
    while (!test(ch))
      ch = this.buffer[++i];
    return yield* this.pushToIndex(i, false);
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/parse/line-counter.js
var LineCounter = class {
  constructor() {
    this.lineStarts = [];
    this.addNewLine = (offset) => this.lineStarts.push(offset);
    this.linePos = (offset) => {
      let low = 0;
      let high = this.lineStarts.length;
      while (low < high) {
        const mid = low + high >> 1;
        if (this.lineStarts[mid] < offset)
          low = mid + 1;
        else
          high = mid;
      }
      if (this.lineStarts[low] === offset)
        return { line: low + 1, col: 1 };
      if (low === 0)
        return { line: 0, col: offset };
      const start = this.lineStarts[low - 1];
      return { line: low, col: offset - start + 1 };
    };
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/parse/parser.js
function includesToken(list, type) {
  for (let i = 0; i < list.length; ++i)
    if (list[i].type === type)
      return true;
  return false;
}
function findNonEmptyIndex(list) {
  for (let i = 0; i < list.length; ++i) {
    switch (list[i].type) {
      case "space":
      case "comment":
      case "newline":
        break;
      default:
        return i;
    }
  }
  return -1;
}
function isFlowToken(token) {
  switch (token?.type) {
    case "alias":
    case "scalar":
    case "single-quoted-scalar":
    case "double-quoted-scalar":
    case "flow-collection":
      return true;
    default:
      return false;
  }
}
function getPrevProps(parent) {
  switch (parent.type) {
    case "document":
      return parent.start;
    case "block-map": {
      const it = parent.items[parent.items.length - 1];
      return it.sep ?? it.start;
    }
    case "block-seq":
      return parent.items[parent.items.length - 1].start;
    /* istanbul ignore next should not happen */
    default:
      return [];
  }
}
function getFirstKeyStartProps(prev) {
  if (prev.length === 0)
    return [];
  let i = prev.length;
  loop: while (--i >= 0) {
    switch (prev[i].type) {
      case "doc-start":
      case "explicit-key-ind":
      case "map-value-ind":
      case "seq-item-ind":
      case "newline":
        break loop;
    }
  }
  while (prev[++i]?.type === "space") {
  }
  return prev.splice(i, prev.length);
}
function arrayPushArray(target, source) {
  if (source.length < 1e5)
    Array.prototype.push.apply(target, source);
  else
    for (let i = 0; i < source.length; ++i)
      target.push(source[i]);
}
function fixFlowSeqItems(fc) {
  if (fc.start.type === "flow-seq-start") {
    for (const it of fc.items) {
      if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
        if (it.key)
          it.value = it.key;
        delete it.key;
        if (isFlowToken(it.value)) {
          if (it.value.end)
            arrayPushArray(it.value.end, it.sep);
          else
            it.value.end = it.sep;
        } else
          arrayPushArray(it.start, it.sep);
        delete it.sep;
      }
    }
  }
}
var Parser = class {
  /**
   * @param onNewLine - If defined, called separately with the start position of
   *   each new line (in `parse()`, including the start of input).
   */
  constructor(onNewLine) {
    this.atNewLine = true;
    this.atScalar = false;
    this.indent = 0;
    this.offset = 0;
    this.onKeyLine = false;
    this.stack = [];
    this.source = "";
    this.type = "";
    this.lexer = new Lexer();
    this.onNewLine = onNewLine;
  }
  /**
   * Parse `source` as a YAML stream.
   * If `incomplete`, a part of the last line may be left as a buffer for the next call.
   *
   * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
   *
   * @returns A generator of tokens representing each directive, document, and other structure.
   */
  *parse(source, incomplete = false) {
    if (this.onNewLine && this.offset === 0)
      this.onNewLine(0);
    for (const lexeme of this.lexer.lex(source, incomplete))
      yield* this.next(lexeme);
    if (!incomplete)
      yield* this.end();
  }
  /**
   * Advance the parser by the `source` of one lexical token.
   */
  *next(source) {
    this.source = source;
    if (this.atScalar) {
      this.atScalar = false;
      yield* this.step();
      this.offset += source.length;
      return;
    }
    const type = tokenType(source);
    if (!type) {
      const message = `Not a YAML token: ${source}`;
      yield* this.pop({ type: "error", offset: this.offset, message, source });
      this.offset += source.length;
    } else if (type === "scalar") {
      this.atNewLine = false;
      this.atScalar = true;
      this.type = "scalar";
    } else {
      this.type = type;
      yield* this.step();
      switch (type) {
        case "newline":
          this.atNewLine = true;
          this.indent = 0;
          if (this.onNewLine)
            this.onNewLine(this.offset + source.length);
          break;
        case "space":
          if (this.atNewLine && source[0] === " ")
            this.indent += source.length;
          break;
        case "explicit-key-ind":
        case "map-value-ind":
        case "seq-item-ind":
          if (this.atNewLine)
            this.indent += source.length;
          break;
        case "doc-mode":
        case "flow-error-end":
          return;
        default:
          this.atNewLine = false;
      }
      this.offset += source.length;
    }
  }
  /** Call at end of input to push out any remaining constructions */
  *end() {
    while (this.stack.length > 0)
      yield* this.pop();
  }
  get sourceToken() {
    const st = {
      type: this.type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
    return st;
  }
  *step() {
    const top = this.peek(1);
    if (this.type === "doc-end" && top?.type !== "doc-end") {
      while (this.stack.length > 0)
        yield* this.pop();
      this.stack.push({
        type: "doc-end",
        offset: this.offset,
        source: this.source
      });
      return;
    }
    if (!top)
      return yield* this.stream();
    switch (top.type) {
      case "document":
        return yield* this.document(top);
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return yield* this.scalar(top);
      case "block-scalar":
        return yield* this.blockScalar(top);
      case "block-map":
        return yield* this.blockMap(top);
      case "block-seq":
        return yield* this.blockSequence(top);
      case "flow-collection":
        return yield* this.flowCollection(top);
      case "doc-end":
        return yield* this.documentEnd(top);
    }
    yield* this.pop();
  }
  peek(n) {
    return this.stack[this.stack.length - n];
  }
  *pop(error) {
    const token = error ?? this.stack.pop();
    if (!token) {
      const message = "Tried to pop an empty stack";
      yield { type: "error", offset: this.offset, source: "", message };
    } else if (this.stack.length === 0) {
      yield token;
    } else {
      const top = this.peek(1);
      if (token.type === "block-scalar") {
        token.indent = "indent" in top ? top.indent : 0;
      } else if (token.type === "flow-collection" && top.type === "document") {
        token.indent = 0;
      }
      if (token.type === "flow-collection")
        fixFlowSeqItems(token);
      switch (top.type) {
        case "document":
          top.value = token;
          break;
        case "block-scalar":
          top.props.push(token);
          break;
        case "block-map": {
          const it = top.items[top.items.length - 1];
          if (it.value) {
            top.items.push({ start: [], key: token, sep: [] });
            this.onKeyLine = true;
            return;
          } else if (it.sep) {
            it.value = token;
          } else {
            Object.assign(it, { key: token, sep: [] });
            this.onKeyLine = !it.explicitKey;
            return;
          }
          break;
        }
        case "block-seq": {
          const it = top.items[top.items.length - 1];
          if (it.value)
            top.items.push({ start: [], value: token });
          else
            it.value = token;
          break;
        }
        case "flow-collection": {
          const it = top.items[top.items.length - 1];
          if (!it || it.value)
            top.items.push({ start: [], key: token, sep: [] });
          else if (it.sep)
            it.value = token;
          else
            Object.assign(it, { key: token, sep: [] });
          return;
        }
        /* istanbul ignore next should not happen */
        default:
          yield* this.pop();
          yield* this.pop(token);
      }
      if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
        const last = token.items[token.items.length - 1];
        if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
          if (top.type === "document")
            top.end = last.start;
          else
            top.items.push({ start: last.start });
          token.items.splice(-1, 1);
        }
      }
    }
  }
  *stream() {
    switch (this.type) {
      case "directive-line":
        yield { type: "directive", offset: this.offset, source: this.source };
        return;
      case "byte-order-mark":
      case "space":
      case "comment":
      case "newline":
        yield this.sourceToken;
        return;
      case "doc-mode":
      case "doc-start": {
        const doc = {
          type: "document",
          offset: this.offset,
          start: []
        };
        if (this.type === "doc-start")
          doc.start.push(this.sourceToken);
        this.stack.push(doc);
        return;
      }
    }
    yield {
      type: "error",
      offset: this.offset,
      message: `Unexpected ${this.type} token in YAML stream`,
      source: this.source
    };
  }
  *document(doc) {
    if (doc.value)
      return yield* this.lineEnd(doc);
    switch (this.type) {
      case "doc-start": {
        if (findNonEmptyIndex(doc.start) !== -1) {
          yield* this.pop();
          yield* this.step();
        } else
          doc.start.push(this.sourceToken);
        return;
      }
      case "anchor":
      case "tag":
      case "space":
      case "comment":
      case "newline":
        doc.start.push(this.sourceToken);
        return;
    }
    const bv = this.startBlockValue(doc);
    if (bv)
      this.stack.push(bv);
    else {
      yield {
        type: "error",
        offset: this.offset,
        message: `Unexpected ${this.type} token in YAML document`,
        source: this.source
      };
    }
  }
  *scalar(scalar) {
    if (this.type === "map-value-ind") {
      const prev = getPrevProps(this.peek(2));
      const start = getFirstKeyStartProps(prev);
      let sep;
      if (scalar.end) {
        sep = scalar.end;
        sep.push(this.sourceToken);
        delete scalar.end;
      } else
        sep = [this.sourceToken];
      const map2 = {
        type: "block-map",
        offset: scalar.offset,
        indent: scalar.indent,
        items: [{ start, key: scalar, sep }]
      };
      this.onKeyLine = true;
      this.stack[this.stack.length - 1] = map2;
    } else
      yield* this.lineEnd(scalar);
  }
  *blockScalar(scalar) {
    switch (this.type) {
      case "space":
      case "comment":
      case "newline":
        scalar.props.push(this.sourceToken);
        return;
      case "scalar":
        scalar.source = this.source;
        this.atNewLine = true;
        this.indent = 0;
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        yield* this.pop();
        break;
      /* istanbul ignore next should not happen */
      default:
        yield* this.pop();
        yield* this.step();
    }
  }
  *blockMap(map2) {
    const it = map2.items[map2.items.length - 1];
    switch (this.type) {
      case "newline":
        this.onKeyLine = false;
        if (it.value) {
          const end = "end" in it.value ? it.value.end : void 0;
          const last = Array.isArray(end) ? end[end.length - 1] : void 0;
          if (last?.type === "comment")
            end?.push(this.sourceToken);
          else
            map2.items.push({ start: [this.sourceToken] });
        } else if (it.sep) {
          it.sep.push(this.sourceToken);
        } else {
          it.start.push(this.sourceToken);
        }
        return;
      case "space":
      case "comment":
        if (it.value) {
          map2.items.push({ start: [this.sourceToken] });
        } else if (it.sep) {
          it.sep.push(this.sourceToken);
        } else {
          if (this.atIndentedComment(it.start, map2.indent)) {
            const prev = map2.items[map2.items.length - 2];
            const end = prev?.value?.end;
            if (Array.isArray(end)) {
              arrayPushArray(end, it.start);
              end.push(this.sourceToken);
              map2.items.pop();
              return;
            }
          }
          it.start.push(this.sourceToken);
        }
        return;
    }
    if (this.indent >= map2.indent) {
      const atMapIndent = !this.onKeyLine && this.indent === map2.indent;
      const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
      let start = [];
      if (atNextItem && it.sep && !it.value) {
        const nl = [];
        for (let i = 0; i < it.sep.length; ++i) {
          const st = it.sep[i];
          switch (st.type) {
            case "newline":
              nl.push(i);
              break;
            case "space":
              break;
            case "comment":
              if (st.indent > map2.indent)
                nl.length = 0;
              break;
            default:
              nl.length = 0;
          }
        }
        if (nl.length >= 2)
          start = it.sep.splice(nl[1]);
      }
      switch (this.type) {
        case "anchor":
        case "tag":
          if (atNextItem || it.value) {
            start.push(this.sourceToken);
            map2.items.push({ start });
            this.onKeyLine = true;
          } else if (it.sep) {
            it.sep.push(this.sourceToken);
          } else {
            it.start.push(this.sourceToken);
          }
          return;
        case "explicit-key-ind":
          if (!it.sep && !it.explicitKey) {
            it.start.push(this.sourceToken);
            it.explicitKey = true;
          } else if (atNextItem || it.value) {
            start.push(this.sourceToken);
            map2.items.push({ start, explicitKey: true });
          } else {
            this.stack.push({
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken], explicitKey: true }]
            });
          }
          this.onKeyLine = true;
          return;
        case "map-value-ind":
          if (it.explicitKey) {
            if (!it.sep) {
              if (includesToken(it.start, "newline")) {
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              } else {
                const start2 = getFirstKeyStartProps(it.start);
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                });
              }
            } else if (it.value) {
              map2.items.push({ start: [], key: null, sep: [this.sourceToken] });
            } else if (includesToken(it.sep, "map-value-ind")) {
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start, key: null, sep: [this.sourceToken] }]
              });
            } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
              const start2 = getFirstKeyStartProps(it.start);
              const key = it.key;
              const sep = it.sep;
              sep.push(this.sourceToken);
              delete it.key;
              delete it.sep;
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: start2, key, sep }]
              });
            } else if (start.length > 0) {
              it.sep = it.sep.concat(start, this.sourceToken);
            } else {
              it.sep.push(this.sourceToken);
            }
          } else {
            if (!it.sep) {
              Object.assign(it, { key: null, sep: [this.sourceToken] });
            } else if (it.value || atNextItem) {
              map2.items.push({ start, key: null, sep: [this.sourceToken] });
            } else if (includesToken(it.sep, "map-value-ind")) {
              this.stack.push({
                type: "block-map",
                offset: this.offset,
                indent: this.indent,
                items: [{ start: [], key: null, sep: [this.sourceToken] }]
              });
            } else {
              it.sep.push(this.sourceToken);
            }
          }
          this.onKeyLine = true;
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const fs = this.flowScalar(this.type);
          if (atNextItem || it.value) {
            map2.items.push({ start, key: fs, sep: [] });
            this.onKeyLine = true;
          } else if (it.sep) {
            this.stack.push(fs);
          } else {
            Object.assign(it, { key: fs, sep: [] });
            this.onKeyLine = true;
          }
          return;
        }
        default: {
          const bv = this.startBlockValue(map2);
          if (bv) {
            if (bv.type === "block-seq") {
              if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                yield* this.pop({
                  type: "error",
                  offset: this.offset,
                  message: "Unexpected block-seq-ind on same line with key",
                  source: this.source
                });
                return;
              }
            } else if (atMapIndent) {
              map2.items.push({ start });
            }
            this.stack.push(bv);
            return;
          }
        }
      }
    }
    yield* this.pop();
    yield* this.step();
  }
  *blockSequence(seq2) {
    const it = seq2.items[seq2.items.length - 1];
    switch (this.type) {
      case "newline":
        if (it.value) {
          const end = "end" in it.value ? it.value.end : void 0;
          const last = Array.isArray(end) ? end[end.length - 1] : void 0;
          if (last?.type === "comment")
            end?.push(this.sourceToken);
          else
            seq2.items.push({ start: [this.sourceToken] });
        } else
          it.start.push(this.sourceToken);
        return;
      case "space":
      case "comment":
        if (it.value)
          seq2.items.push({ start: [this.sourceToken] });
        else {
          if (this.atIndentedComment(it.start, seq2.indent)) {
            const prev = seq2.items[seq2.items.length - 2];
            const end = prev?.value?.end;
            if (Array.isArray(end)) {
              arrayPushArray(end, it.start);
              end.push(this.sourceToken);
              seq2.items.pop();
              return;
            }
          }
          it.start.push(this.sourceToken);
        }
        return;
      case "anchor":
      case "tag":
        if (it.value || this.indent <= seq2.indent)
          break;
        it.start.push(this.sourceToken);
        return;
      case "seq-item-ind":
        if (this.indent !== seq2.indent)
          break;
        if (it.value || includesToken(it.start, "seq-item-ind"))
          seq2.items.push({ start: [this.sourceToken] });
        else
          it.start.push(this.sourceToken);
        return;
    }
    if (this.indent > seq2.indent) {
      const bv = this.startBlockValue(seq2);
      if (bv) {
        this.stack.push(bv);
        return;
      }
    }
    yield* this.pop();
    yield* this.step();
  }
  *flowCollection(fc) {
    const it = fc.items[fc.items.length - 1];
    if (this.type === "flow-error-end") {
      let top;
      do {
        yield* this.pop();
        top = this.peek(1);
      } while (top?.type === "flow-collection");
    } else if (fc.end.length === 0) {
      switch (this.type) {
        case "comma":
        case "explicit-key-ind":
          if (!it || it.sep)
            fc.items.push({ start: [this.sourceToken] });
          else
            it.start.push(this.sourceToken);
          return;
        case "map-value-ind":
          if (!it || it.value)
            fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
          else if (it.sep)
            it.sep.push(this.sourceToken);
          else
            Object.assign(it, { key: null, sep: [this.sourceToken] });
          return;
        case "space":
        case "comment":
        case "newline":
        case "anchor":
        case "tag":
          if (!it || it.value)
            fc.items.push({ start: [this.sourceToken] });
          else if (it.sep)
            it.sep.push(this.sourceToken);
          else
            it.start.push(this.sourceToken);
          return;
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar": {
          const fs = this.flowScalar(this.type);
          if (!it || it.value)
            fc.items.push({ start: [], key: fs, sep: [] });
          else if (it.sep)
            this.stack.push(fs);
          else
            Object.assign(it, { key: fs, sep: [] });
          return;
        }
        case "flow-map-end":
        case "flow-seq-end":
          fc.end.push(this.sourceToken);
          return;
      }
      const bv = this.startBlockValue(fc);
      if (bv)
        this.stack.push(bv);
      else {
        yield* this.pop();
        yield* this.step();
      }
    } else {
      const parent = this.peek(2);
      if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
        yield* this.pop();
        yield* this.step();
      } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        fixFlowSeqItems(fc);
        const sep = fc.end.splice(1, fc.end.length);
        sep.push(this.sourceToken);
        const map2 = {
          type: "block-map",
          offset: fc.offset,
          indent: fc.indent,
          items: [{ start, key: fc, sep }]
        };
        this.onKeyLine = true;
        this.stack[this.stack.length - 1] = map2;
      } else {
        yield* this.lineEnd(fc);
      }
    }
  }
  flowScalar(type) {
    if (this.onNewLine) {
      let nl = this.source.indexOf("\n") + 1;
      while (nl !== 0) {
        this.onNewLine(this.offset + nl);
        nl = this.source.indexOf("\n", nl) + 1;
      }
    }
    return {
      type,
      offset: this.offset,
      indent: this.indent,
      source: this.source
    };
  }
  startBlockValue(parent) {
    switch (this.type) {
      case "alias":
      case "scalar":
      case "single-quoted-scalar":
      case "double-quoted-scalar":
        return this.flowScalar(this.type);
      case "block-scalar-header":
        return {
          type: "block-scalar",
          offset: this.offset,
          indent: this.indent,
          props: [this.sourceToken],
          source: ""
        };
      case "flow-map-start":
      case "flow-seq-start":
        return {
          type: "flow-collection",
          offset: this.offset,
          indent: this.indent,
          start: this.sourceToken,
          items: [],
          end: []
        };
      case "seq-item-ind":
        return {
          type: "block-seq",
          offset: this.offset,
          indent: this.indent,
          items: [{ start: [this.sourceToken] }]
        };
      case "explicit-key-ind": {
        this.onKeyLine = true;
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        start.push(this.sourceToken);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start, explicitKey: true }]
        };
      }
      case "map-value-ind": {
        this.onKeyLine = true;
        const prev = getPrevProps(parent);
        const start = getFirstKeyStartProps(prev);
        return {
          type: "block-map",
          offset: this.offset,
          indent: this.indent,
          items: [{ start, key: null, sep: [this.sourceToken] }]
        };
      }
    }
    return null;
  }
  atIndentedComment(start, indent) {
    if (this.type !== "comment")
      return false;
    if (this.indent <= indent)
      return false;
    return start.every((st) => st.type === "newline" || st.type === "space");
  }
  *documentEnd(docEnd) {
    if (this.type !== "doc-mode") {
      if (docEnd.end)
        docEnd.end.push(this.sourceToken);
      else
        docEnd.end = [this.sourceToken];
      if (this.type === "newline")
        yield* this.pop();
    }
  }
  *lineEnd(token) {
    switch (this.type) {
      case "comma":
      case "doc-start":
      case "doc-end":
      case "flow-seq-end":
      case "flow-map-end":
      case "map-value-ind":
        yield* this.pop();
        yield* this.step();
        break;
      case "newline":
        this.onKeyLine = false;
      // fallthrough
      case "space":
      case "comment":
      default:
        if (token.end)
          token.end.push(this.sourceToken);
        else
          token.end = [this.sourceToken];
        if (this.type === "newline")
          yield* this.pop();
    }
  }
};

// node_modules/.pnpm/yaml@2.9.0/node_modules/yaml/browser/dist/public-api.js
function parseOptions(options) {
  const prettyErrors = options.prettyErrors !== false;
  const lineCounter = options.lineCounter || prettyErrors && new LineCounter() || null;
  return { lineCounter, prettyErrors };
}
function parseDocument(source, options = {}) {
  const { lineCounter, prettyErrors } = parseOptions(options);
  const parser = new Parser(lineCounter?.addNewLine);
  const composer = new Composer(options);
  let doc = null;
  for (const _doc of composer.compose(parser.parse(source), true, source.length)) {
    if (!doc)
      doc = _doc;
    else if (doc.options.logLevel !== "silent") {
      doc.errors.push(new YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
      break;
    }
  }
  if (prettyErrors && lineCounter) {
    doc.errors.forEach(prettifyError(source, lineCounter));
    doc.warnings.forEach(prettifyError(source, lineCounter));
  }
  return doc;
}

// src/services/site-config.ts
var SITE_CONFIG_PATH2 = "site_config.yml";
var SiteConfigConflictError = class extends Error {
  constructor() {
    super("site_config.yml \u5DF2\u88AB\u5176\u4ED6\u7F16\u8F91\u5668\u4FEE\u6539\u3002\u8BF7\u5173\u95ED\u914D\u7F6E\u7A97\u53E3\u540E\u91CD\u65B0\u6253\u5F00\uFF0C\u907F\u514D\u8986\u76D6\u5916\u90E8\u6539\u52A8\u3002");
    this.name = "SiteConfigConflictError";
  }
};
var DEFAULT_SITE_CONFIG = {
  site_name: "VitePress-Butterfly",
  site_description: "\u8FD9\u662F\u4E00\u4E2A\u4F7F\u7528 VitePress \u6784\u5EFA\u7684\u535A\u5BA2\u7AD9\u70B9\u3002",
  site_url: "",
  lang: "zh-CN",
  author: "",
  background: "",
  bg_rainfall: false,
  home: {
    mainTitle: "VitePress-Butterfly",
    subTitles: []
  },
  pageSize: 8,
  sortMethod: "date",
  lastUpdated: {
    use: true
  },
  avatar: "",
  name: "",
  signature: "",
  introduction: "",
  socialLinks: [],
  menuItems: [],
  musicPlayer: {
    enabled: false,
    url: "",
    name: "",
    artist: "",
    cover: "",
    autoplay: false,
    volume: 0.6
  },
  friendlink: [],
  footer: {
    message: "",
    copyright: "",
    createdTime: ""
  },
  comments: {
    enabled: false,
    host: "https://giscus.app",
    repo: "",
    repoId: "",
    category: "Announcements",
    categoryId: "",
    mapping: "title",
    strict: "0",
    reactionsEnabled: "1",
    emitMetadata: "0",
    inputPosition: "top",
    theme: "preferred_color_scheme",
    lang: "zh-CN",
    loading: "lazy"
  }
};
var MANAGED_KEYS = [
  "site_name",
  "site_description",
  "site_url",
  "lang",
  "author",
  "background",
  "bg_rainfall",
  "home",
  "pageSize",
  "sortMethod",
  "lastUpdated",
  "avatar",
  "name",
  "signature",
  "introduction",
  "socialLinks",
  "menuItems",
  "musicPlayer",
  "friendlink",
  "footer",
  "comments"
];
var SiteConfigService = class {
  constructor(app) {
    this.app = app;
  }
  async load() {
    const adapter = this.app.vault.adapter;
    const source = await adapter.exists(SITE_CONFIG_PATH2) ? await adapter.read(SITE_CONFIG_PATH2) : "";
    return { config: this.parse(source), source };
  }
  async save(config, expectedSource) {
    validateSiteConfig(config);
    const adapter = this.app.vault.adapter;
    const current = await adapter.exists(SITE_CONFIG_PATH2) ? await adapter.read(SITE_CONFIG_PATH2) : "";
    if (current !== expectedSource) {
      throw new SiteConfigConflictError();
    }
    const document = parseDocument(current || "{}", { prettyErrors: true });
    if (document.errors.length > 0) {
      throw new Error(`site_config.yml \u683C\u5F0F\u9519\u8BEF\uFF1A${document.errors[0].message}`);
    }
    const root = document.toJS();
    if (!isRecord(root)) {
      throw new Error("site_config.yml \u6839\u8282\u70B9\u5FC5\u987B\u662F YAML \u5BF9\u8C61\u3002");
    }
    const existing = root;
    for (const key of MANAGED_KEYS) {
      updateKnownValue(document, [key], existing[key], config[key]);
    }
    const source = document.toString({ lineWidth: 0 });
    await adapter.write(SITE_CONFIG_PATH2, source);
    return { config: clone(config), source };
  }
  async listPublicAssets(kind = "image") {
    const files = this.app.vault.getFiles();
    return files.filter((file) => file.path.startsWith("public/") && (kind === "image" ? isImage(file.path) : isAudio(file.path))).map((file) => `/${file.path.slice("public/".length)}`).sort((left, right) => left.localeCompare(right));
  }
  parse(source) {
    if (!source.trim()) {
      return clone(DEFAULT_SITE_CONFIG);
    }
    const document = parseDocument(source, { prettyErrors: true });
    if (document.errors.length > 0) {
      throw new Error(`site_config.yml \u683C\u5F0F\u9519\u8BEF\uFF1A${document.errors[0].message}`);
    }
    const root = document.toJS();
    if (!isRecord(root)) {
      throw new Error("site_config.yml \u6839\u8282\u70B9\u5FC5\u987B\u662F YAML \u5BF9\u8C61\u3002");
    }
    return normalizeSiteConfig(root);
  }
};
function normalizeSiteConfig(raw) {
  const defaults = DEFAULT_SITE_CONFIG;
  const home = asRecord(raw.home);
  const lastUpdated = asRecord(raw.lastUpdated);
  const music = asRecord(raw.musicPlayer);
  const footer = asRecord(raw.footer);
  const comments = asRecord(raw.comments);
  return {
    site_name: stringValue(raw.site_name, defaults.site_name),
    site_description: stringValue(raw.site_description, defaults.site_description),
    site_url: stringValue(raw.site_url, defaults.site_url),
    lang: stringValue(raw.lang, defaults.lang),
    author: stringValue(raw.author, defaults.author),
    background: stringValue(raw.background, defaults.background),
    bg_rainfall: booleanValue(raw.bg_rainfall, defaults.bg_rainfall),
    home: {
      mainTitle: stringValue(home.mainTitle, defaults.home.mainTitle),
      subTitles: stringList(home.subTitles)
    },
    pageSize: clampInteger(raw.pageSize, defaults.pageSize, 1, 100),
    sortMethod: raw.sortMethod === "lastUpdated" ? "lastUpdated" : "date",
    lastUpdated: {
      use: booleanValue(lastUpdated.use, defaults.lastUpdated.use)
    },
    avatar: stringValue(raw.avatar, defaults.avatar),
    name: stringValue(raw.name, defaults.name),
    signature: stringValue(raw.signature, defaults.signature),
    introduction: stringValue(raw.introduction, defaults.introduction),
    socialLinks: socialLinks(raw.socialLinks),
    menuItems: menuItems(raw.menuItems),
    musicPlayer: {
      enabled: booleanValue(music.enabled, defaults.musicPlayer.enabled),
      url: stringValue(music.url, defaults.musicPlayer.url),
      name: stringValue(music.name, defaults.musicPlayer.name),
      artist: stringValue(music.artist, defaults.musicPlayer.artist),
      cover: stringValue(music.cover, defaults.musicPlayer.cover),
      autoplay: booleanValue(music.autoplay, defaults.musicPlayer.autoplay),
      volume: clampNumber(music.volume, defaults.musicPlayer.volume, 0, 1)
    },
    friendlink: friendLinks(raw.friendlink),
    footer: {
      message: stringValue(footer.message, defaults.footer.message),
      copyright: stringValue(footer.copyright, defaults.footer.copyright),
      createdTime: stringValue(footer.createdTime, defaults.footer.createdTime)
    },
    comments: {
      enabled: booleanValue(comments.enabled, defaults.comments.enabled),
      host: stringValue(comments.host, defaults.comments.host),
      repo: stringValue(comments.repo, defaults.comments.repo),
      repoId: stringValue(comments.repoId, defaults.comments.repoId),
      category: stringValue(comments.category, defaults.comments.category),
      categoryId: stringValue(comments.categoryId, defaults.comments.categoryId),
      mapping: stringValue(comments.mapping, defaults.comments.mapping),
      strict: stringValue(comments.strict, defaults.comments.strict),
      reactionsEnabled: stringValue(comments.reactionsEnabled, defaults.comments.reactionsEnabled),
      emitMetadata: stringValue(comments.emitMetadata, defaults.comments.emitMetadata),
      inputPosition: stringValue(comments.inputPosition, defaults.comments.inputPosition),
      theme: stringValue(comments.theme, defaults.comments.theme),
      lang: stringValue(comments.lang, defaults.comments.lang),
      loading: stringValue(comments.loading, defaults.comments.loading)
    }
  };
}
function socialLinks(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const entry = asRecord(item);
    return {
      name: stringValue(entry.name, ""),
      icon: stringValue(entry.icon, "link"),
      iconUrl: optionalString(entry.iconUrl),
      url: stringValue(entry.url, "")
    };
  });
}
function menuItems(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item, index) => normalizeMenuItem(item, index));
}
function normalizeMenuItem(value, index) {
  const item = asRecord(value);
  const children = menuItems(item.children);
  return {
    key: stringValue(item.key, `menu-${index + 1}`),
    label: stringValue(item.label, "\u672A\u547D\u540D\u83DC\u5355"),
    icon: optionalString(item.icon),
    link: optionalString(item.link),
    children: children.length ? children : void 0
  };
}
function friendLinks(value) {
  if (!Array.isArray(value)) return [];
  return value.map((item) => {
    const entry = asRecord(item);
    return {
      Name: stringValue(entry.Name, ""),
      Url: stringValue(entry.Url, ""),
      Avatar: stringValue(entry.Avatar, ""),
      Desc: stringValue(entry.Desc, "")
    };
  });
}
function validateSiteConfig(config) {
  if (!config.site_name.trim()) {
    throw new Error("\u7AD9\u70B9\u540D\u79F0\u4E0D\u80FD\u4E3A\u7A7A\u3002");
  }
  if (config.site_url.trim() && !isHttpUrl(config.site_url)) {
    throw new Error("\u7AD9\u70B9\u57DF\u540D\u5FC5\u987B\u662F\u4EE5 http:// \u6216 https:// \u5F00\u5934\u7684 URL\u3002");
  }
  if (!Number.isInteger(config.pageSize) || config.pageSize < 1 || config.pageSize > 100) {
    throw new Error("\u6BCF\u9875\u6587\u7AE0\u6570\u5FC5\u987B\u662F 1 \u5230 100 \u7684\u6574\u6570\u3002");
  }
  if (config.musicPlayer.volume < 0 || config.musicPlayer.volume > 1) {
    throw new Error("\u97F3\u4E50\u97F3\u91CF\u5FC5\u987B\u5728 0 \u5230 1 \u4E4B\u95F4\u3002");
  }
  for (const link of config.socialLinks) {
    if (!link.name.trim() || !link.url.trim()) {
      throw new Error("\u6BCF\u6761\u793E\u4EA4\u94FE\u63A5\u90FD\u9700\u8981\u540D\u79F0\u548C\u94FE\u63A5\u5730\u5740\u3002");
    }
    if (!isHttpUrl(link.url)) {
      throw new Error(`\u793E\u4EA4\u94FE\u63A5\u300C${link.name}\u300D\u4E0D\u662F\u6709\u6548 URL\u3002`);
    }
  }
  for (const link of config.friendlink) {
    if (!link.Name.trim() || !link.Url.trim()) {
      throw new Error("\u6BCF\u6761\u53CB\u94FE\u90FD\u9700\u8981\u540D\u79F0\u548C\u94FE\u63A5\u5730\u5740\u3002");
    }
    if (!isHttpUrl(link.Url)) {
      throw new Error(`\u53CB\u94FE\u300C${link.Name}\u300D\u4E0D\u662F\u6709\u6548 URL\u3002`);
    }
  }
  validateMenuItems(config.menuItems, /* @__PURE__ */ new Set());
  if (config.comments.enabled) {
    const required = [
      ["\u4ED3\u5E93", config.comments.repo],
      ["\u4ED3\u5E93 ID", config.comments.repoId],
      ["\u5206\u7C7B ID", config.comments.categoryId]
    ];
    for (const [label, value] of required) {
      if (!value.trim()) {
        throw new Error(`\u542F\u7528\u8BC4\u8BBA\u65F6\u5FC5\u987B\u586B\u5199 Giscus ${label}\u3002`);
      }
    }
  }
}
function validateMenuItems(items, keys, depth = 0) {
  if (depth === 0 && items.length > 1) {
    throw new Error("\u5BFC\u822A\u83DC\u5355\u6700\u4E0A\u5C42\u53EA\u80FD\u6709\u4E00\u4E2A\u83DC\u5355\u5165\u53E3\u3002");
  }
  for (const item of items) {
    if (!item.key.trim() || !item.label.trim()) {
      throw new Error("\u6BCF\u4E2A\u5BFC\u822A\u9879\u90FD\u9700\u8981 key \u548C\u540D\u79F0\u3002");
    }
    if (keys.has(item.key)) {
      throw new Error(`\u5BFC\u822A key\u300C${item.key}\u300D\u91CD\u590D\u3002`);
    }
    keys.add(item.key);
    if (item.children?.length) {
      if (depth >= 1) {
        throw new Error("\u5BFC\u822A\u83DC\u5355\u53EA\u652F\u6301\u4E24\u5C42\uFF1A\u9876\u5C42\u83DC\u5355\u548C\u5B50\u83DC\u5355\u9879\u3002");
      }
      validateMenuItems(item.children, keys, depth + 1);
      continue;
    }
    if (!item.link) {
      throw new Error(`\u5BFC\u822A\u300C${item.label}\u300D\u9700\u8981\u586B\u5199\u94FE\u63A5\u3002`);
    }
    if (!isMenuLink(item.link)) {
      throw new Error(`\u5BFC\u822A\u300C${item.label}\u300D\u7684\u94FE\u63A5\u683C\u5F0F\u65E0\u6548\u3002`);
    }
  }
}
function asRecord(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function stringValue(value, fallback) {
  return typeof value === "string" ? value : fallback;
}
function optionalString(value) {
  return typeof value === "string" && value.trim() ? value : void 0;
}
function booleanValue(value, fallback) {
  return typeof value === "boolean" ? value : fallback;
}
function stringList(value) {
  return Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
}
function clampInteger(value, fallback, minimum, maximum) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isInteger(number) ? Math.min(maximum, Math.max(minimum, number)) : fallback;
}
function clampNumber(value, fallback, minimum, maximum) {
  const number = typeof value === "number" ? value : Number(value);
  return Number.isFinite(number) ? Math.min(maximum, Math.max(minimum, number)) : fallback;
}
function isHttpUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}
function isMenuLink(value) {
  return value.startsWith("/") || isHttpUrl(value);
}
function isImage(path) {
  return /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(path);
}
function isAudio(path) {
  return /\.(aac|flac|m4a|mp3|ogg|wav|webm)$/i.test(path);
}
function updateKnownValue(document, path, existing, next) {
  if (isRecord(next)) {
    const source = asRecord(existing);
    for (const [key, value] of Object.entries(next)) {
      updateKnownValue(document, [...path, key], source[key], value);
    }
    return;
  }
  if (Array.isArray(next)) {
    document.setIn(path, mergeArrayExtras(existing, next, path[path.length - 1]));
    return;
  }
  document.setIn(path, clone(next));
}
function mergeArrayExtras(existing, next, key) {
  const source = Array.isArray(existing) ? sourceRecords(existing) : [];
  const keyed = /* @__PURE__ */ new Map();
  for (const item of source) {
    const identity = arrayIdentity(key, item);
    if (identity) keyed.set(identity, item);
  }
  return next.map((item, index) => {
    const identity = isRecord(item) ? arrayIdentity(key, item) : "";
    const previous = identity ? keyed.get(identity) ?? source[index] : source[index];
    return mergeExtras(previous, item, key);
  });
}
function sourceRecords(value) {
  return value.filter(isRecord);
}
function arrayIdentity(key, item) {
  if (key === "menuItems" || key === "children") {
    return typeof item.key === "string" ? item.key : "";
  }
  if (key === "socialLinks") {
    return `${typeof item.name === "string" ? item.name : ""}\0${typeof item.url === "string" ? item.url : ""}`;
  }
  if (key === "friendlink") {
    return `${typeof item.Name === "string" ? item.Name : ""}\0${typeof item.Url === "string" ? item.Url : ""}`;
  }
  return "";
}
function mergeExtras(existing, next, key = "") {
  if (next === void 0) return void 0;
  if (Array.isArray(next)) {
    return mergeArrayExtras(existing, next, key);
  }
  if (isRecord(next)) {
    const result = { ...asRecord(existing) };
    for (const [field, value] of Object.entries(next)) {
      if (value === void 0) {
        delete result[field];
      } else {
        result[field] = mergeExtras(result[field], value, field);
      }
    }
    return result;
  }
  return clone(next);
}
function isRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
function clone(value) {
  if (value === void 0) return value;
  return JSON.parse(JSON.stringify(value));
}

// src/ui/SiteConfigModal.ts
var TABS = [
  { id: "general", label: "\u57FA\u7840", icon: "settings-2" },
  { id: "home", label: "\u9996\u9875", icon: "layout-template" },
  { id: "profile", label: "\u8D44\u6599", icon: "contact-round" },
  { id: "navigation", label: "\u5BFC\u822A", icon: "menu" },
  { id: "media", label: "\u5A92\u4F53", icon: "music-2" },
  { id: "community", label: "\u793E\u533A", icon: "messages-square" }
];
function errorText(error) {
  return error instanceof Error && error.message ? error.message : String(error);
}
var LUCIDE_ICON_NAMES = [
  "activity",
  "arrow-right",
  "book",
  "book-open",
  "calendar-clock",
  "chevron-down",
  "chevron-right",
  "chevron-up",
  "circle-alert",
  "circle-check",
  "circle-help",
  "compass",
  "crosshair",
  "disc-3",
  "eye",
  "file-text",
  "folder",
  "folder-open",
  "folder-tree",
  "hash",
  "heart",
  "home",
  "house",
  "info",
  "link",
  "mail",
  "map-pin",
  "moon",
  "panel-left-close",
  "panel-left-open",
  "pen-line",
  "rss",
  "search",
  "settings",
  "share-2",
  "star",
  "sun",
  "sun-moon",
  "tags",
  "upload",
  "user",
  "users"
];
var FONT_AWESOME_ICON_NAMES = [
  "fa-brands fa-github",
  "fa-brands fa-bilibili",
  "fa-brands fa-weixin",
  "fa-brands fa-qq",
  "fa-brands fa-x-twitter",
  "fa-brands fa-youtube",
  "fa-brands fa-telegram",
  "fa-brands fa-discord",
  "fa-brands fa-linkedin",
  "fa-brands fa-instagram",
  "fa-brands fa-weibo",
  "fa-solid fa-envelope",
  "fa-solid fa-rss"
];
var FA_BRAND_ICONS = {
  "fa-brands fa-github": {
    viewBox: "0 0 496 512",
    path: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
  },
  "fa-brands fa-bilibili": {
    viewBox: "0 0 512 512",
    path: "M488.6 104.1C505.3 122.2 513 143.8 511.9 169.8V372.2C511.5 398.6 502.7 420.3 485.4 437.3C468.2 454.3 446.3 463.2 419.9 464H92.02C65.57 463.2 43.81 454.2 26.74 436.8C9.682 419.4 .7667 396.5 0 368.2V169.8C.7667 143.8 9.682 122.2 26.74 104.1C43.81 87.75 65.57 78.77 92.02 78H121.4L96.05 52.19C90.3 46.46 87.42 39.19 87.42 30.4C87.42 21.6 90.3 14.34 96.05 8.603C101.8 2.868 109.1 0 117.9 0C126.7 0 134 2.868 139.8 8.603L213.1 78H301.1L375.6 8.603C381.7 2.868 389.2 0 398 0C406.8 0 414.1 2.868 419.9 8.603C425.6 14.34 428.5 21.6 428.5 30.4C428.5 39.19 425.6 46.46 419.9 52.19L394.6 78L423.9 78C450.3 78.77 471.9 87.75 488.6 104.1H488.6zM449.8 173.8C449.4 164.2 446.1 156.4 439.1 150.3C433.9 144.2 425.1 140.9 416.4 140.5H96.05C86.46 140.9 78.6 144.2 72.47 150.3C66.33 156.4 63.07 164.2 62.69 173.8V368.2C62.69 377.4 65.95 385.2 72.47 391.7C78.99 398.2 86.85 401.5 96.05 401.5H416.4C425.6 401.5 433.4 398.2 439.7 391.7C446 385.2 449.4 377.4 449.8 368.2L449.8 173.8zM185.5 216.5C191.8 222.8 195.2 230.6 195.6 239.7V273C195.2 282.2 191.9 289.9 185.8 296.2C179.6 302.5 171.8 305.7 162.2 305.7C152.6 305.7 144.7 302.5 138.6 296.2C132.5 289.9 129.2 282.2 128.8 273V239.7C129.2 230.6 132.6 222.8 138.9 216.5C145.2 210.2 152.1 206.9 162.2 206.5C171.4 206.9 179.2 210.2 185.5 216.5H185.5zM377 216.5C383.3 222.8 386.7 230.6 387.1 239.7V273C386.7 282.2 383.4 289.9 377.3 296.2C371.2 302.5 363.3 305.7 353.7 305.7C344.1 305.7 336.3 302.5 330.1 296.2C323.1 289.9 320.7 282.2 320.4 273V239.7C320.7 230.6 324.1 222.8 330.4 216.5C336.7 210.2 344.5 206.9 353.7 206.5C362.9 206.9 370.7 210.2 377 216.5H377z"
  },
  "fa-brands fa-weixin": {
    viewBox: "0 0 576 512",
    path: "M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z"
  },
  "fa-brands fa-qq": {
    viewBox: "0 0 448 512",
    path: "M433.754 420.445c-11.526 1.393-44.86-52.741-44.86-52.741 0 31.345-16.136 72.247-51.051 101.786 16.842 5.192 54.843 19.167 45.803 34.421-7.316 12.343-125.51 7.881-159.632 4.037-34.122 3.844-152.316 8.306-159.632-4.037-9.045-15.25 28.918-29.214 45.783-34.415-34.92-29.539-51.059-70.445-51.059-101.792 0 0-33.334 54.134-44.859 52.741-5.37-.65-12.424-29.644 9.347-99.704 10.261-33.024 21.995-60.478 40.144-105.779C60.683 98.063 108.982.006 224 0c113.737.006 163.156 96.133 160.264 214.963 18.118 45.223 29.912 72.85 40.144 105.778 21.768 70.06 14.716 99.053 9.346 99.704z"
  },
  "fa-brands fa-x-twitter": {
    viewBox: "0 0 512 512",
    path: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"
  },
  "fa-brands fa-youtube": {
    viewBox: "0 0 576 512",
    path: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
  },
  "fa-brands fa-telegram": {
    viewBox: "0 0 496 512",
    path: "M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z"
  },
  "fa-brands fa-discord": {
    viewBox: "0 0 640 512",
    path: "M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z"
  },
  "fa-brands fa-linkedin": {
    viewBox: "0 0 448 512",
    path: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"
  },
  "fa-brands fa-instagram": {
    viewBox: "0 0 448 512",
    path: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 74.7 33.5 74.7 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
  },
  "fa-brands fa-weibo": {
    viewBox: "0 0 512 512",
    path: "M407 177.6c7.6-24-13.4-46.8-37.4-41.7-22 4.8-28.8-28.1-7.1-32.8 50.1-10.9 92.3 37.1 76.5 84.8-6.8 21.2-38.8 10.8-32-10.3zM214.8 446.7C108.5 446.7 0 395.3 0 310.4c0-44.3 28-95.4 76.3-143.7C176 67 279.5 65.8 249.9 161c-4 13.1 12.3 5.7 12.3 6 79.5-33.6 140.5-16.8 114 51.4-3.7 9.4 1.1 10.9 8.3 13.1 135.7 42.3 34.8 215.2-169.7 215.2zm143.7-146.3c-5.4-55.7-78.5-94-163.4-85.7-84.8 8.6-148.8 60.3-143.4 116s78.5 94 163.4 85.7c84.8-8.6 148.8-60.3 143.4-116zM347.9 35.1c-25.9 5.6-16.8 43.7 8.3 38.3 72.3-15.2 134.8 52.8 111.7 124-7.4 24.2 29.1 37 37.4 12 31.9-99.8-55.1-195.9-157.4-174.3zm-78.5 311c-17.1 38.8-66.8 60-109.1 46.3-40.8-13.1-58-53.4-40.3-89.7 17.7-35.4 63.1-55.4 103.4-45.1 42 10.8 63.1 50.2 46 88.5zm-86.3-30c-12.9-5.4-30 .3-38 12.9-8.3 12.9-4.3 28 8.6 34 13.1 6 30.8.3 39.1-12.9 8-13.1 3.7-28.3-9.7-34zm32.6-13.4c-5.1-1.7-11.4.6-14.3 5.4-2.9 5.1-1.4 10.6 3.7 12.9 5.1 2 11.7-.3 14.6-5.4 2.8-5.2 1.1-10.9-4-12.9z"
  },
  "fa-solid fa-rss": {
    viewBox: "0 0 448 512",
    path: "M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM0 416a64 64 0 1 1 128 0A64 64 0 1 1 0 416zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z"
  },
  "fa-solid fa-envelope": {
    viewBox: "0 0 512 512",
    path: "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
  }
};
function renderFaIcon(parent, icon) {
  const brand = FA_BRAND_ICONS[icon];
  if (!brand) return;
  const svg = parent.createSvg("svg", { cls: "vpb-fa-icon", attr: { viewBox: brand.viewBox } });
  svg.createSvg("path", { attr: { d: brand.path, fill: "currentColor" } });
}
var SiteConfigModal = class extends import_obsidian5.Modal {
  constructor(app, onSaved) {
    super(app);
    this.onSaved = onSaved;
    this.activeTab = "general";
    this.source = "";
    this.error = null;
    this.loading = true;
    this.saving = false;
    this.service = new SiteConfigService(app);
  }
  onOpen() {
    this.modalEl.addClass("vpb-site-config-modal");
    this.render();
    void this.load();
  }
  onClose() {
    this.modalEl.removeClass("vpb-site-config-modal");
    this.contentEl.empty();
  }
  // ------------------------------------------------------------------
  // Lifecycle
  // ------------------------------------------------------------------
  async load() {
    try {
      const snapshot = await this.service.load();
      this.config = snapshot.config;
      this.source = snapshot.source;
      this.error = null;
    } catch (error) {
      this.error = errorText(error);
    } finally {
      this.loading = false;
      this.render();
    }
  }
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("vpb-site-config");
    if (this.loading) {
      const loading = this.contentEl.createDiv({ cls: "vpb-config-loading" });
      const icon = loading.createSpan();
      (0, import_obsidian5.setIcon)(icon, "loader-2");
      loading.createSpan({ text: "\u6B63\u5728\u8BFB\u53D6\u7AD9\u70B9\u914D\u7F6E\u2026" });
      return;
    }
    if (!this.config) {
      this.renderFatalError();
      return;
    }
    this.renderHeader();
    this.renderTabs();
    const content = this.contentEl.createDiv({ cls: "vpb-config-content" });
    switch (this.activeTab) {
      case "general":
        this.renderGeneral(content);
        break;
      case "home":
        this.renderHome(content);
        break;
      case "profile":
        this.renderProfile(content);
        break;
      case "navigation":
        this.renderNavigation(content);
        break;
      case "media":
        this.renderMedia(content);
        break;
      case "community":
        this.renderCommunity(content);
        break;
    }
    this.renderFooter();
  }
  renderHeader() {
    const header = this.contentEl.createDiv({ cls: "vpb-config-header" });
    const copy = header.createDiv();
    copy.createEl("h3", { text: "\u914D\u7F6E\u7AD9\u70B9" });
    copy.createEl("p", { text: "\u4FDD\u5B58\u540E\u4F1A\u5199\u5165 site_config.yml\uFF0C\u53D1\u5E03\u7531 Git \u540C\u6B65\u5B8C\u6210\u3002" });
    const raw = header.createEl("button", {
      cls: "vpb-icon-button",
      attr: { "aria-label": "\u6253\u5F00\u539F\u59CB YAML" }
    });
    (0, import_obsidian5.setIcon)(raw, "file-code-2");
    raw.addEventListener("click", () => {
      void this.openRawConfig();
    });
  }
  renderTabs() {
    const tabs = this.contentEl.createDiv({ cls: "vpb-config-tabs" });
    for (const tab of TABS) {
      const button = tabs.createEl("button", {
        cls: `vpb-config-tab${tab.id === this.activeTab ? " is-active" : ""}`,
        attr: { "aria-label": tab.label }
      });
      (0, import_obsidian5.setIcon)(button, tab.icon);
      button.createSpan({ text: tab.label });
      button.addEventListener("click", () => {
        if (this.activeTab === tab.id) return;
        this.activeTab = tab.id;
        this.error = null;
        this.render();
      });
    }
  }
  renderFatalError() {
    this.contentEl.createEl("h3", { text: "\u65E0\u6CD5\u8BFB\u53D6\u7AD9\u70B9\u914D\u7F6E" });
    this.contentEl.createEl("div", { text: this.error ?? "\u672A\u77E5\u9519\u8BEF\u3002", cls: "vpb-modal-error" });
    const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
    footer.createEl("button", { text: "\u91CD\u8BD5", cls: "mod-cta" }).addEventListener("click", () => {
      this.loading = true;
      this.render();
      void this.load();
    });
    footer.createEl("button", { text: "\u5173\u95ED" }).addEventListener("click", () => this.close());
  }
  renderFooter() {
    if (this.error) {
      this.contentEl.createEl("div", { text: this.error, cls: "vpb-modal-error" });
    }
    const footer = this.contentEl.createDiv({ cls: "modal-button-container vpb-config-footer" });
    footer.createEl("button", { text: "\u53D6\u6D88", type: "button" }).addEventListener("click", () => this.close());
    const save = footer.createEl("button", { text: "\u4FDD\u5B58\u8BBE\u7F6E", cls: "mod-cta" });
    save.addEventListener("click", () => {
      void this.save(save);
    });
  }
  async save(button) {
    if (!this.config || this.saving) return;
    this.saving = true;
    button.disabled = true;
    button.classList.add("is-pending");
    const loader = button.createSpan({ cls: "vpb-btn-loader" });
    button.insertBefore(loader, button.firstChild);
    (0, import_obsidian5.setIcon)(loader, "loader-2");
    try {
      const snapshot = await this.service.save(this.config, this.source);
      this.source = snapshot.source;
      this.error = null;
      this.onSaved();
      new import_obsidian5.Notice("\u7AD9\u70B9\u914D\u7F6E\u5DF2\u4FDD\u5B58\u3002", 4e3);
      this.close();
    } catch (error) {
      this.error = errorText(error);
      this.saving = false;
      this.render();
      return;
    }
    this.saving = false;
  }
  async openRawConfig() {
    const file = this.app.vault.getFileByPath("site_config.yml");
    if (!file) {
      new import_obsidian5.Notice("\u8BF7\u5148\u4FDD\u5B58\u4E00\u6B21\u7AD9\u70B9\u914D\u7F6E\u4EE5\u521B\u5EFA site_config.yml\u3002", 6e3);
      return;
    }
    await this.app.workspace.getLeaf(false).openFile(file);
  }
  // ------------------------------------------------------------------
  // General / home
  // ------------------------------------------------------------------
  renderGeneral(container) {
    const config = this.requireConfig();
    this.heading(container, "\u7AD9\u70B9\u4FE1\u606F");
    this.textSetting(container, "\u7AD9\u70B9\u540D\u79F0", "\u6D4F\u89C8\u5668\u6807\u9898\u548C\u7AD9\u70B9\u4E3B\u540D\u79F0\u3002", config.site_name, (value) => {
      config.site_name = value;
    });
    this.textAreaSetting(container, "\u7AD9\u70B9\u63CF\u8FF0", "\u7528\u4E8E SEO \u63CF\u8FF0\u548C\u5206\u4EAB\u6458\u8981\u3002", config.site_description, (value) => {
      config.site_description = value;
    });
    this.textSetting(container, "\u7AD9\u70B9\u57DF\u540D", "\u7528\u4E8E canonical URL \u548C sitemap\uFF0C\u4F8B\u5982 https://example.com\u3002", config.site_url, (value) => {
      config.site_url = value;
    }, "https://example.com");
    this.dropdownSetting(container, "\u8BED\u8A00", "\u9875\u9762\u8BED\u8A00\u548C\u8BC4\u8BBA\u9ED8\u8BA4\u8BED\u8A00\u3002", config.lang, {
      "zh-CN": "\u7B80\u4F53\u4E2D\u6587",
      "zh-TW": "\u7E41\u9AD4\u4E2D\u6587",
      en: "English"
    }, (value) => {
      config.lang = value;
    });
    this.textSetting(container, "\u4F5C\u8005", "\u6587\u7AE0\u4E0E\u7AD9\u70B9\u7684\u9ED8\u8BA4\u4F5C\u8005\u540D\u3002", config.author, (value) => {
      config.author = value;
    });
    this.heading(container, "\u6587\u7AE0\u5217\u8868");
    this.numberSetting(container, "\u6BCF\u9875\u6587\u7AE0\u6570", "\u9996\u9875\u6587\u7AE0\u6D41\u6BCF\u9875\u663E\u793A\u7684\u6587\u7AE0\u6570\u91CF\u3002", config.pageSize, 1, 100, (value) => {
      config.pageSize = value;
    });
    this.segmentedSetting(container, "\u6392\u5E8F\u65B9\u5F0F", "\u9996\u9875\u6587\u7AE0\u5217\u8868\u7684\u9ED8\u8BA4\u6392\u5E8F\u3002", config.sortMethod, [
      { value: "date", label: "\u53D1\u5E03\u65E5\u671F" },
      { value: "lastUpdated", label: "\u6700\u540E\u66F4\u65B0" }
    ], (value) => {
      config.sortMethod = value;
    });
    this.toggleSetting(container, "\u663E\u793A\u6700\u540E\u66F4\u65B0\u65F6\u95F4", "\u5728\u6587\u7AE0\u9875\u9762\u663E\u793A\u66F4\u65B0\u65F6\u95F4\u3002", config.lastUpdated.use, (value) => {
      config.lastUpdated.use = value;
    });
    this.heading(container, "\u9875\u811A");
    this.textSetting(container, "\u9875\u811A\u6587\u6848", "\u9875\u811A\u7B2C\u4E00\u884C\u6587\u672C\u3002", config.footer.message, (value) => {
      config.footer.message = value;
    });
    this.textSetting(container, "\u7248\u6743\u6587\u6848", "\u9875\u811A\u7B2C\u4E8C\u884C\u6587\u672C\u3002", config.footer.copyright, (value) => {
      config.footer.copyright = value;
    });
    this.textSetting(container, "\u5EFA\u7AD9\u65E5\u671F", "\u4F8B\u5982 2025-01-01\u3002", config.footer.createdTime, (value) => {
      config.footer.createdTime = value;
    });
  }
  renderHome(container) {
    const config = this.requireConfig();
    this.heading(container, "\u89C6\u89C9\u4F53\u9A8C");
    this.assetSetting(container, "\u80CC\u666F", "\u7559\u7A7A\u4F7F\u7528\u4E3B\u9898\u81EA\u9002\u5E94\u80CC\u666F\uFF1B\u4E5F\u53EF\u586B\u5199 HEX \u8272\u503C\u6216 public/ \u8D44\u6E90\u8DEF\u5F84\u3002", config.background, (value) => {
      config.background = value;
    }, true);
    this.toggleSetting(container, "\u96E8\u6EF4\u6548\u679C", "\u5728\u80CC\u666F\u4E0A\u663E\u793A\u8F7B\u91CF\u96E8\u6EF4\u52A8\u753B\u3002", config.bg_rainfall, (value) => {
      config.bg_rainfall = value;
    });
    this.heading(container, "\u9996\u9875\u6807\u9898");
    this.textSetting(container, "\u4E3B\u6807\u9898", "\u9996\u9875\u4E2D\u592E\u4E3B\u6807\u9898\u3002", config.home.mainTitle, (value) => {
      config.home.mainTitle = value;
    });
    this.stringListSetting(container, "\u526F\u6807\u9898", "\u9996\u9875\u8F6E\u6362\u663E\u793A\u7684\u77ED\u53E5\u3002", config.home.subTitles, (items) => {
      config.home.subTitles = items;
    }, "\u65B0\u589E\u526F\u6807\u9898");
  }
  // ------------------------------------------------------------------
  // Profile / navigation
  // ------------------------------------------------------------------
  renderProfile(container) {
    const config = this.requireConfig();
    this.heading(container, "\u4E2A\u4EBA\u8D44\u6599");
    this.assetSetting(container, "\u5934\u50CF", "\u5EFA\u8BAE\u4F7F\u7528 public/ \u4E2D\u7684\u56FE\u7247\uFF0C\u4F8B\u5982 /Avatar.png\u3002", config.avatar, (value) => {
      config.avatar = value;
    });
    this.textSetting(container, "\u663E\u793A\u540D\u79F0", "\u4FA7\u680F\u4E2A\u4EBA\u8D44\u6599\u5361\u6807\u9898\u3002", config.name, (value) => {
      config.name = value;
    });
    this.textSetting(container, "\u7B7E\u540D", "\u663E\u793A\u5728\u4E2A\u4EBA\u540D\u79F0\u4E0B\u65B9\u3002", config.signature, (value) => {
      config.signature = value;
    });
    this.textAreaSetting(container, "\u7B80\u4ECB", "\u4FA7\u680F\u4E2A\u4EBA\u4ECB\u7ECD\u3002", config.introduction, (value) => {
      config.introduction = value;
    });
    this.heading(container, "\u793E\u4EA4\u94FE\u63A5");
    this.socialLinksSetting(container, config.socialLinks, (items) => {
      config.socialLinks = items;
    });
  }
  renderNavigation(container) {
    const config = this.requireConfig();
    this.heading(container, "\u5BFC\u822A\u83DC\u5355");
    container.createEl("p", {
      cls: "vpb-config-hint",
      text: "\u5BFC\u822A\u680F\u663E\u793A\u4E00\u4E2A\u9876\u5C42\u83DC\u5355\u5165\u53E3\uFF08\u56FE\u6807 + \u6587\u5B57\uFF09\uFF0C\u70B9\u51FB\u5C55\u5F00\u5B50\u83DC\u5355\uFF1B\u5B50\u83DC\u5355\u9879\u624D\u662F\u5B9E\u9645\u5BFC\u822A\u94FE\u63A5\u3002"
    });
    this.menuItemsSetting(container, config.menuItems, (items) => {
      config.menuItems = items;
    });
  }
  // ------------------------------------------------------------------
  // Media / community
  // ------------------------------------------------------------------
  renderMedia(container) {
    const config = this.requireConfig();
    this.heading(container, "\u5BFC\u822A\u97F3\u4E50");
    this.toggleSetting(container, "\u542F\u7528\u97F3\u4E50\u64AD\u653E\u5668", "\u5728\u5BFC\u822A\u680F\u663E\u793A\u64AD\u653E\u5668\u3002", config.musicPlayer.enabled, (value) => {
      config.musicPlayer.enabled = value;
    });
    this.assetSetting(container, "\u97F3\u9891\u5730\u5740", "\u652F\u6301\u5916\u94FE\u97F3\u9891\u5730\u5740\uFF0C\u6216\u4ECE public/ \u4E2D\u9009\u62E9\u97F3\u9891\u3002", config.musicPlayer.url, (value) => {
      config.musicPlayer.url = value;
    }, false, "audio");
    this.textSetting(container, "\u6B4C\u66F2\u540D\u79F0", "\u64AD\u653E\u5668\u663E\u793A\u540D\u79F0\u3002", config.musicPlayer.name, (value) => {
      config.musicPlayer.name = value;
    });
    this.textSetting(container, "\u827A\u672F\u5BB6", "\u64AD\u653E\u5668\u526F\u6807\u9898\u3002", config.musicPlayer.artist, (value) => {
      config.musicPlayer.artist = value;
    });
    this.assetSetting(container, "\u5C01\u9762", "\u53EF\u9009\u62E9 public/ \u4E2D\u56FE\u7247\u6216\u586B\u5199\u5916\u94FE\u3002", config.musicPlayer.cover, (value) => {
      config.musicPlayer.cover = value;
    });
    this.toggleSetting(container, "\u81EA\u52A8\u64AD\u653E", "\u7531\u6D4F\u89C8\u5668\u7B56\u7565\u51B3\u5B9A\u662F\u5426\u5B9E\u9645\u81EA\u52A8\u64AD\u653E\u3002", config.musicPlayer.autoplay, (value) => {
      config.musicPlayer.autoplay = value;
    });
    this.sliderSetting(container, "\u97F3\u91CF", "\u9ED8\u8BA4\u64AD\u653E\u97F3\u91CF\u3002", config.musicPlayer.volume, (value) => {
      config.musicPlayer.volume = value;
    });
  }
  renderCommunity(container) {
    const config = this.requireConfig();
    this.heading(container, "\u53CB\u94FE");
    this.friendLinksSetting(container, config.friendlink, (items) => {
      config.friendlink = items;
    });
    this.heading(container, "Giscus \u8BC4\u8BBA");
    this.toggleSetting(container, "\u542F\u7528\u8BC4\u8BBA", "\u9700\u8981\u5148\u5728 giscus.app \u83B7\u53D6\u4ED3\u5E93\u548C\u5206\u7C7B\u6807\u8BC6\u3002", config.comments.enabled, (value) => {
      config.comments.enabled = value;
    });
    this.textSetting(container, "\u670D\u52A1\u5730\u5740", "\u901A\u5E38\u4FDD\u6301 https://giscus.app\u3002", config.comments.host, (value) => {
      config.comments.host = value;
    }, "https://giscus.app");
    this.textSetting(container, "\u4ED3\u5E93", "\u683C\u5F0F\uFF1Aowner/repository\u3002", config.comments.repo, (value) => {
      config.comments.repo = value;
    });
    this.textSetting(container, "\u4ED3\u5E93 ID", "Giscus repo-id\u3002", config.comments.repoId, (value) => {
      config.comments.repoId = value;
    });
    this.textSetting(container, "\u5206\u7C7B", "\u4F8B\u5982 Announcements\u3002", config.comments.category, (value) => {
      config.comments.category = value;
    });
    this.textSetting(container, "\u5206\u7C7B ID", "Giscus category-id\u3002", config.comments.categoryId, (value) => {
      config.comments.categoryId = value;
    });
    this.dropdownSetting(container, "\u6620\u5C04\u65B9\u5F0F", "\u9875\u9762\u4E0E\u8BA8\u8BBA\u4E32\u7684\u6620\u5C04\u7B56\u7565\u3002", config.comments.mapping, {
      title: "\u6807\u9898",
      pathname: "\u8DEF\u5F84",
      url: "\u5B8C\u6574 URL",
      ogTitle: "OG \u6807\u9898"
    }, (value) => {
      config.comments.mapping = value;
    });
    this.toggleSetting(container, "\u4E25\u683C\u6620\u5C04", "\u53EA\u5339\u914D\u5B8C\u5168\u4E00\u81F4\u7684\u9875\u9762\u6620\u5C04\u3002", config.comments.strict === "1", (value) => {
      config.comments.strict = value ? "1" : "0";
    });
    this.toggleSetting(container, "\u663E\u793A\u53CD\u5E94", "\u5728\u8BC4\u8BBA\u533A\u663E\u793A GitHub \u53CD\u5E94\u3002", config.comments.reactionsEnabled === "1", (value) => {
      config.comments.reactionsEnabled = value ? "1" : "0";
    });
    this.toggleSetting(container, "\u8F93\u51FA\u5143\u6570\u636E", "\u8BA9 Giscus \u5411\u9875\u9762\u53D1\u9001 discussion metadata\u3002", config.comments.emitMetadata === "1", (value) => {
      config.comments.emitMetadata = value ? "1" : "0";
    });
    this.dropdownSetting(container, "\u8F93\u5165\u6846\u4F4D\u7F6E", "\u65B0\u8BC4\u8BBA\u8F93\u5165\u6846\u663E\u793A\u7684\u4F4D\u7F6E\u3002", config.comments.inputPosition, {
      top: "\u9876\u90E8",
      bottom: "\u5E95\u90E8"
    }, (value) => {
      config.comments.inputPosition = value;
    });
    this.dropdownSetting(container, "\u8BC4\u8BBA\u4E3B\u9898", "\u8DDF\u968F\u7AD9\u70B9\u6216\u56FA\u5B9A\u8BC4\u8BBA\u533A\u4E3B\u9898\u3002", config.comments.theme, {
      preferred_color_scheme: "\u8DDF\u968F\u7CFB\u7EDF",
      light: "\u6D45\u8272",
      dark: "\u6DF1\u8272"
    }, (value) => {
      config.comments.theme = value;
    });
    this.dropdownSetting(container, "\u8BC4\u8BBA\u8BED\u8A00", "Giscus \u754C\u9762\u8BED\u8A00\u3002", config.comments.lang, {
      "zh-CN": "\u7B80\u4F53\u4E2D\u6587",
      "zh-TW": "\u7E41\u9AD4\u4E2D\u6587",
      en: "English"
    }, (value) => {
      config.comments.lang = value;
    });
    this.dropdownSetting(container, "\u52A0\u8F7D\u65B9\u5F0F", "lazy \u53EF\u5EF6\u540E\u52A0\u8F7D\u8BC4\u8BBA\u533A\u3002", config.comments.loading, {
      lazy: "\u5EF6\u540E\u52A0\u8F7D",
      eager: "\u7ACB\u5373\u52A0\u8F7D"
    }, (value) => {
      config.comments.loading = value;
    });
  }
  // ------------------------------------------------------------------
  // Field helpers
  // ------------------------------------------------------------------
  heading(container, text) {
    container.createEl("h4", { text, cls: "vpb-config-heading" });
  }
  textSetting(container, name, desc, value, onChange, placeholder = "") {
    new import_obsidian5.Setting(container).setName(name).setDesc(desc).addText((text) => {
      text.setValue(value);
      if (placeholder) text.setPlaceholder(placeholder);
      text.onChange(onChange);
    });
  }
  textAreaSetting(container, name, desc, value, onChange) {
    new import_obsidian5.Setting(container).setName(name).setDesc(desc).addTextArea((text) => {
      text.setValue(value);
      text.inputEl.rows = 3;
      text.onChange(onChange);
    });
  }
  numberSetting(container, name, desc, value, minimum, maximum, onChange) {
    new import_obsidian5.Setting(container).setName(name).setDesc(desc).addText((text) => {
      text.inputEl.type = "number";
      text.inputEl.min = String(minimum);
      text.inputEl.max = String(maximum);
      text.setValue(String(value));
      text.onChange((next) => {
        const number = Number(next);
        if (Number.isInteger(number) && number >= minimum && number <= maximum) {
          onChange(number);
        }
      });
    });
  }
  toggleSetting(container, name, desc, value, onChange) {
    new import_obsidian5.Setting(container).setName(name).setDesc(desc).addToggle((toggle) => {
      toggle.setValue(value);
      toggle.onChange(onChange);
    });
  }
  dropdownSetting(container, name, desc, value, options, onChange) {
    new import_obsidian5.Setting(container).setName(name).setDesc(desc).addDropdown((dropdown) => {
      dropdown.addOptions(options);
      dropdown.setValue(value in options ? value : Object.keys(options)[0]);
      dropdown.onChange(onChange);
    });
  }
  segmentedSetting(container, name, desc, value, options, onChange) {
    const setting = new import_obsidian5.Setting(container).setName(name).setDesc(desc);
    const segment = setting.controlEl.createDiv({ cls: "vpb-segmented" });
    for (const option of options) {
      const button = segment.createEl("button", {
        text: option.label,
        cls: option.value === value ? "is-active" : ""
      });
      button.addEventListener("click", () => {
        onChange(option.value);
        segment.querySelectorAll("button").forEach((item) => {
          item.classList.toggle("is-active", item === button);
        });
      });
    }
  }
  sliderSetting(container, name, desc, value, onChange) {
    new import_obsidian5.Setting(container).setName(name).setDesc(desc).addSlider((slider) => {
      slider.setLimits(0, 1, 0.1);
      slider.setDisplayFormat((next) => `${Math.round(next * 100)}%`);
      slider.setValue(value);
      slider.onChange(onChange);
    });
  }
  assetSetting(container, name, desc, value, onChange, allowColor = false, kind = "image") {
    const setting = new import_obsidian5.Setting(container).setName(name).setDesc(desc).addText((text) => {
      text.setValue(value);
      text.setPlaceholder(kind === "image" ? allowColor ? "#1e293b \u6216 /image/background.webp" : "/image/avatar.png" : "/music/song.mp3");
      text.onChange(onChange);
    }).addExtraButton((button) => {
      button.setIcon(kind === "image" ? "image" : "music");
      button.setTooltip(kind === "image" ? "\u4ECE public/ \u9009\u62E9\u56FE\u7247" : "\u4ECE public/ \u9009\u62E9\u97F3\u9891");
      button.onClick(() => {
        void this.chooseAsset(kind, (asset) => {
          onChange(asset);
          const input = setting.controlEl.querySelector("input");
          if (input) input.value = asset;
        });
      });
    });
  }
  // ------------------------------------------------------------------
  // Editable lists
  // ------------------------------------------------------------------
  stringListSetting(container, name, desc, items, onChange, addLabel) {
    const section = this.listSection(container, name, desc);
    const list = section.createDiv({ cls: "vpb-config-list" });
    const render = () => {
      list.empty();
      items.forEach((item, index) => {
        const row = list.createDiv({ cls: "vpb-list-row" });
        const input = row.createEl("input", { type: "text", value: item });
        input.addEventListener("input", () => {
          items[index] = input.value;
          onChange([...items]);
        });
        this.rowButtons(row, index, items.length, () => {
          items.splice(index, 1);
          onChange([...items]);
          render();
        }, () => {
          move(items, index, -1);
          onChange([...items]);
          render();
        }, () => {
          move(items, index, 1);
          onChange([...items]);
          render();
        });
      });
    };
    render();
    this.addListButton(section, addLabel, () => {
      items.push("");
      onChange([...items]);
      render();
    });
  }
  socialLinksSetting(container, items, onChange) {
    const section = this.listSection(container, "\u793E\u4EA4\u94FE\u63A5", "\u663E\u793A\u5728\u4FA7\u680F\u8D44\u6599\u5361\u4E2D\u7684\u5916\u90E8\u94FE\u63A5\u3002");
    const list = section.createDiv({ cls: "vpb-config-list" });
    const render = () => {
      list.empty();
      items.forEach((item, index) => {
        const row = list.createDiv({ cls: "vpb-config-record" });
        this.recordText(row, "\u540D\u79F0", item.name, (value) => {
          item.name = value;
          onChange([...items]);
        });
        this.recordIcon(row, "\u56FE\u6807", item.icon, (value) => {
          item.icon = value || "link";
          onChange([...items]);
        });
        this.recordText(row, "\u81EA\u5B9A\u4E49\u56FE\u6807", item.iconUrl ?? "", (value) => {
          item.iconUrl = value || void 0;
          onChange([...items]);
        }, "/image/github.svg");
        this.recordText(row, "\u94FE\u63A5", item.url, (value) => {
          item.url = value;
          onChange([...items]);
        }, "https://...");
        this.rowButtons(row, index, items.length, () => {
          items.splice(index, 1);
          onChange([...items]);
          render();
        }, () => {
          move(items, index, -1);
          onChange([...items]);
          render();
        }, () => {
          move(items, index, 1);
          onChange([...items]);
          render();
        });
      });
    };
    render();
    this.addListButton(section, "\u65B0\u589E\u793E\u4EA4\u94FE\u63A5", () => {
      items.push({ name: "", icon: "link", url: "" });
      onChange([...items]);
      render();
    });
  }
  friendLinksSetting(container, items, onChange) {
    const section = this.listSection(container, "\u53CB\u94FE\u5217\u8868", "\u53CB\u94FE\u9875\u9762\u8BFB\u53D6\u8FD9\u7EC4\u6570\u636E\u3002", "vpb-config-list-section");
    const list = section.createDiv({ cls: "vpb-config-list" });
    const render = () => {
      list.empty();
      items.forEach((item, index) => {
        const row = list.createDiv({ cls: "vpb-config-record" });
        this.recordText(row, "\u540D\u79F0", item.Name, (value) => {
          item.Name = value;
          onChange([...items]);
        });
        this.recordText(row, "\u94FE\u63A5", item.Url, (value) => {
          item.Url = value;
          onChange([...items]);
        }, "https://...");
        this.recordText(row, "\u5934\u50CF", item.Avatar, (value) => {
          item.Avatar = value;
          onChange([...items]);
        });
        this.recordText(row, "\u7B80\u4ECB", item.Desc, (value) => {
          item.Desc = value;
          onChange([...items]);
        });
        this.rowButtons(row, index, items.length, () => {
          items.splice(index, 1);
          onChange([...items]);
          render();
        }, () => {
          move(items, index, -1);
          onChange([...items]);
          render();
        }, () => {
          move(items, index, 1);
          onChange([...items]);
          render();
        });
      });
    };
    render();
    this.addListButton(section, "\u65B0\u589E\u53CB\u94FE", () => {
      items.push({ Name: "", Url: "", Avatar: "", Desc: "" });
      onChange([...items]);
      render();
    });
  }
  menuItemsSetting(container, items, onChange) {
    const notify = () => onChange([...items]);
    const render = () => {
      container.empty();
      const topSection = this.listSection(
        container,
        "\u9876\u5C42\u83DC\u5355",
        "\u6700\u4E0A\u5C42\u53EA\u80FD\u6709\u4E00\u4E2A\u83DC\u5355\u5165\u53E3\uFF0C\u4E0D\u914D\u7F6E\u94FE\u63A5\u3002"
      );
      if (items.length === 0) {
        this.addListButton(topSection, "\u65B0\u589E\u5BFC\u822A\u83DC\u5355", () => {
          items.push(newMenuItem(items, true));
          notify();
          render();
        });
        return;
      }
      const item = items[0];
      const topRow = topSection.createDiv({ cls: "vpb-config-record" });
      this.recordText(topRow, "\u540D\u79F0", item.label, (value) => {
        item.label = value;
        notify();
      });
      this.recordIcon(topRow, "\u56FE\u6807", item.icon ?? "", (value) => {
        item.icon = value || void 0;
        notify();
      });
      const topActions = topRow.createDiv({ cls: "vpb-record-actions" });
      this.smallButton(topActions, "\u5220\u9664\u9876\u5C42\u83DC\u5355", "trash-2", () => {
        items.splice(0, 1);
        notify();
        render();
      }, false, true);
      const children = item.children ??= [];
      const listSection = this.listSection(
        container,
        "\u5B50\u83DC\u5355\u9879",
        "\u70B9\u51FB\u9876\u5C42\u83DC\u5355\u540E\u5C55\u5F00\u7684\u5BFC\u822A\u94FE\u63A5\uFF0C\u6BCF\u9879\u914D\u7F6E\u56FE\u6807\u3001\u6587\u5B57\u548C\u94FE\u63A5\u3002"
      );
      const list = listSection.createDiv({ cls: "vpb-config-list" });
      const renderChildren = () => {
        list.empty();
        children.forEach((child, index) => {
          const row = list.createDiv({ cls: "vpb-config-record" });
          this.recordText(row, "\u540D\u79F0", child.label, (value) => {
            child.label = value;
            notify();
          });
          this.recordIcon(row, "\u56FE\u6807", child.icon ?? "", (value) => {
            child.icon = value || void 0;
            notify();
          });
          this.recordText(row, "\u94FE\u63A5", child.link ?? "", (value) => {
            child.link = value || void 0;
            notify();
          }, "/FriendLink/ \u6216 https://...");
          this.rowButtons(row, index, children.length, () => {
            children.splice(index, 1);
            notify();
            renderChildren();
          }, () => {
            move(children, index, -1);
            notify();
            renderChildren();
          }, () => {
            move(children, index, 1);
            notify();
            renderChildren();
          });
        });
      };
      renderChildren();
      this.addListButton(listSection, "\u65B0\u589E\u5BFC\u822A\u9879", () => {
        children.push(newMenuItem(items));
        notify();
        renderChildren();
      });
    };
    render();
  }
  listSection(container, name, desc, cls = "") {
    const section = container.createDiv({ cls: `vpb-list-section ${cls}`.trim() });
    section.createEl("h5", { text: name });
    section.createEl("p", { text: desc, cls: "vpb-config-hint" });
    return section;
  }
  addListButton(container, label, onClick) {
    const button = container.createEl("button", { text: label, cls: "vpb-list-add" });
    button.addEventListener("click", onClick);
  }
  rowButtons(container, index, length, onRemove, onUp, onDown) {
    const actions = container.createDiv({ cls: "vpb-record-actions" });
    this.smallButton(actions, "\u4E0A\u79FB", "arrow-up", onUp, index === 0);
    this.smallButton(actions, "\u4E0B\u79FB", "arrow-down", onDown, index === length - 1);
    this.smallButton(actions, "\u5220\u9664", "trash-2", onRemove, false, true);
  }
  smallButton(container, label, icon, onClick, disabled = false, warning = false) {
    const button = container.createEl("button", {
      cls: `vpb-icon-button${warning ? " is-warning" : ""}`,
      attr: { "aria-label": label }
    });
    button.disabled = disabled;
    (0, import_obsidian5.setIcon)(button, icon);
    button.addEventListener("click", onClick);
  }
  recordIcon(container, label, value, onChange) {
    const field = container.createDiv({ cls: "vpb-record-field" });
    field.createEl("label", { text: label });
    const picker = field.createDiv({ cls: "vpb-icon-picker" });
    const preview = picker.createEl("button", {
      cls: "vpb-icon-preview",
      attr: { "aria-label": "\u9009\u62E9\u56FE\u6807" }
    });
    const render = () => {
      preview.empty();
      if (!value) {
        preview.setText("\u9009\u62E9\u56FE\u6807");
      } else if (value.startsWith("fa-")) {
        renderFaIcon(preview, value);
      } else {
        (0, import_obsidian5.setIcon)(preview, value);
      }
    };
    render();
    preview.addEventListener("click", () => {
      void this.chooseIcon((icon) => {
        value = icon;
        onChange(icon);
        render();
      });
    });
    const clear = picker.createEl("button", {
      cls: "vpb-icon-clear",
      attr: { "aria-label": "\u6E05\u9664\u56FE\u6807" }
    });
    (0, import_obsidian5.setIcon)(clear, "trash-2");
    clear.addEventListener("click", () => {
      value = "";
      onChange("");
      render();
    });
  }
  chooseIcon(onChoose) {
    new IconSuggestModal(this.app, onChoose).open();
  }
  recordText(container, label, value, onChange, placeholder = "") {
    const field = container.createDiv({ cls: "vpb-record-field" });
    field.createEl("label", { text: label });
    const input = field.createEl("input", { type: "text", value });
    if (placeholder) input.placeholder = placeholder;
    input.addEventListener("input", () => onChange(input.value));
  }
  async chooseAsset(kind, onChoose) {
    const assets = await this.service.listPublicAssets(kind);
    if (assets.length === 0) {
      new import_obsidian5.Notice(kind === "image" ? "public/ \u76EE\u5F55\u4E2D\u6CA1\u6709\u53EF\u9009\u56FE\u7247\u3002" : "public/ \u76EE\u5F55\u4E2D\u6CA1\u6709\u53EF\u9009\u97F3\u9891\u3002", 5e3);
      return;
    }
    new AssetSuggestModal(this.app, assets, onChoose).open();
  }
  requireConfig() {
    if (!this.config) throw new Error("\u7AD9\u70B9\u914D\u7F6E\u5C1A\u672A\u52A0\u8F7D\u3002");
    return this.config;
  }
};
var AssetSuggestModal = class extends import_obsidian5.FuzzySuggestModal {
  constructor(app, assets, onChoose) {
    super(app);
    this.assets = assets;
    this.onChoose = onChoose;
    this.setPlaceholder("\u641C\u7D22 public/ \u4E2D\u7684\u56FE\u7247");
  }
  getItems() {
    return this.assets;
  }
  getItemText(item) {
    return item;
  }
  onChooseItem(item) {
    this.onChoose(item);
  }
};
var IconSuggestModal = class extends import_obsidian5.Modal {
  constructor(app, onChoose) {
    super(app);
    this.onChoose = onChoose;
  }
  onOpen() {
    this.modalEl.addClass("vpb-icon-modal");
    this.contentEl.empty();
    this.contentEl.createEl("h3", { text: "\u9009\u62E9\u56FE\u6807" });
    const search = this.contentEl.createEl("input", {
      type: "text",
      attr: { placeholder: "\u641C\u7D22\u56FE\u6807\u540D\u79F0\u2026" }
    });
    search.addEventListener("input", () => this.renderGrid());
    this.searchInput = search;
    const custom = this.contentEl.createDiv({ cls: "vpb-icon-custom" });
    const customInput = custom.createEl("input", {
      type: "text",
      attr: { placeholder: "\u6216\u8F93\u5165\u81EA\u5B9A\u4E49\u56FE\u6807\u540D\u79F0" }
    });
    const ok = custom.createEl("button", { text: "\u786E\u5B9A", cls: "mod-cta" });
    ok.addEventListener("click", () => {
      const value = customInput.value.trim();
      if (value) {
        this.onChoose(value);
        this.close();
      }
    });
    this.renderGrid();
    window.setTimeout(() => search.focus(), 0);
  }
  onClose() {
    this.modalEl.removeClass("vpb-icon-modal");
    this.contentEl.empty();
  }
  renderGrid() {
    const query = (this.searchInput?.value ?? "").trim().toLowerCase();
    this.contentEl.querySelector(".vpb-icon-grid")?.remove();
    const grid = this.contentEl.createDiv({ cls: "vpb-icon-grid" });
    const addSection = (title, icons) => {
      const filtered = query ? icons.filter((name) => name.toLowerCase().includes(query)) : icons;
      if (filtered.length === 0) return;
      grid.createEl("h5", { text: title });
      const row = grid.createDiv({ cls: "vpb-icon-grid-row" });
      for (const icon of filtered) {
        const button = row.createEl("button", {
          cls: "vpb-icon-item",
          attr: { "aria-label": icon }
        });
        if (icon.startsWith("fa-")) {
          renderFaIcon(button, icon);
        } else {
          (0, import_obsidian5.setIcon)(button, icon);
        }
        button.addEventListener("click", () => {
          this.onChoose(icon);
          this.close();
        });
      }
    };
    addSection("Lucide", LUCIDE_ICON_NAMES);
    addSection("Font Awesome", FONT_AWESOME_ICON_NAMES);
  }
};
function move(items, from, direction) {
  const to = from + direction;
  if (to < 0 || to >= items.length) return;
  [items[from], items[to]] = [items[to], items[from]];
}
function newMenuItem(tree, isContainer = false) {
  const keys = collectMenuKeys(tree);
  const base = "menu";
  let index = 1;
  let key = `${base}-${index}`;
  while (keys.has(key)) {
    index += 1;
    key = `${base}-${index}`;
  }
  return isContainer ? { key, label: "\u65B0\u83DC\u5355", icon: "circle", children: [] } : { key, label: "\u65B0\u5BFC\u822A", icon: "link", link: "/" };
}
function collectMenuKeys(items) {
  const keys = /* @__PURE__ */ new Set();
  const visit3 = (list) => {
    for (const item of list) {
      keys.add(item.key);
      if (item.children?.length) {
        visit3(item.children);
      }
    }
  };
  visit3(items);
  return keys;
}

// src/ui/StatusModal.ts
var import_obsidian6 = require("obsidian");
var INIT_STEPS = [
  "\u6587\u7AE0\u4ED3\u5E93\uFF1A\u521B\u5EFA\u6216\u8FDE\u63A5\uFF0C\u5199\u5165 BLOG_REPO \u4E0E PAT",
  "\u535A\u5BA2\u4ED3\u5E93\uFF1A\u4ECE\u6A21\u677F\u521B\u5EFA\u6216\u4EC5\u66F4\u65B0\u53D8\u91CF",
  "GitHub Pages\uFF1A\u5207\u6362\u4E3A GitHub Actions \u6784\u5EFA",
  "\u89E6\u53D1\u9996\u6B21\u6784\u5EFA"
];
function errorText2(error) {
  return error instanceof Error && error.message ? error.message : String(error);
}
var StatusModal = class extends import_obsidian6.Modal {
  constructor(deps, mode) {
    super(deps.app);
    this.deps = deps;
    this.initPhase = "form";
    this.busy = false;
    this.error = null;
    this.articleInputValue = "";
    this.blogInputValue = "";
    this.articleOverwrite = false;
    this.articleSync = "secrets";
    this.articleExists = null;
    this.blogExists = null;
    this.blogSync = "follow";
    this.localGitHasHistory = true;
    this.initRecord = null;
    this.stepIndex = 0;
    this.mode = mode;
  }
  onOpen() {
    this.render();
  }
  // ------------------------------------------------------------------
  // Entry point
  // ------------------------------------------------------------------
  render() {
    this.contentEl.empty();
    this.contentEl.addClass("vpb-modal");
    switch (this.mode) {
      case "connect":
        this.renderConnect();
        break;
      case "initialize":
        this.renderInitialize();
        break;
      case "deployment":
        this.renderDeployment();
        break;
      case "vercel":
        this.renderVercel();
        break;
    }
  }
  // ------------------------------------------------------------------
  // Connect GitHub
  // ------------------------------------------------------------------
  renderConnect() {
    this.contentEl.createEl("h3", { text: "\u8FDE\u63A5 GitHub" });
    this.contentEl.createEl("p", {
      cls: "vpb-modal-hint",
      text: "\u4F7F\u7528\u5177\u6709 repo + workflow \u6743\u9650\u7684 Tokens (classic)\u3002PAT \u53EA\u4FDD\u5B58\u5728\u672C\u673A\u8BBE\u7F6E\u548C GitHub \u52A0\u5BC6 secrets \u4E2D\u3002"
    });
    let patInput;
    new import_obsidian6.Setting(this.contentEl).setName("GitHub PAT").addText((text) => {
      patInput = text.inputEl;
      text.inputEl.type = "password";
      text.inputEl.autocomplete = "off";
      text.inputEl.spellcheck = false;
      text.setPlaceholder("ghp_...");
      text.setValue(this.deps.getSettings().pat);
    });
    this.renderError();
    const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
    footer.createEl("button", { text: "\u53D6\u6D88", type: "button" }).addEventListener("click", () => this.close());
    const connect = footer.createEl("button", { text: "\u68C0\u6D4B\u5E76\u8FDE\u63A5", cls: "mod-cta" });
    connect.addEventListener("click", () => {
      void this.runConnect(patInput?.value ?? "");
    });
  }
  async runConnect(pat) {
    if (this.busy) return;
    if (!pat.trim()) {
      this.setError("\u8BF7\u8F93\u5165 GitHub PAT\u3002");
      return;
    }
    this.setBusy(true);
    try {
      await this.deps.saveSettings({ pat: pat.trim() });
      const result = await this.deps.blog.checkPat();
      this.clearError();
      const changes = {};
      const settings = this.deps.getSettings();
      if (!settings.repoName.trim()) {
        changes.repoName = result.suggestedArticleRepoName;
      }
      if (!settings.blogRepoName.trim()) {
        changes.blogRepoName = result.suggestedBlogRepoName;
      }
      if (Object.keys(changes).length > 0) {
        await this.deps.saveSettings(changes);
      }
      this.deps.onChanged();
      if (this.deps.blog.isInitialized()) {
        this.close();
        return;
      }
      this.mode = "initialize";
      this.initPhase = "form";
      this.render();
    } catch (error) {
      this.setError(errorText2(error));
    } finally {
      this.setBusy(false);
    }
  }
  // ------------------------------------------------------------------
  // Initialize wizard
  // ------------------------------------------------------------------
  renderInitialize() {
    if (!this.deps.getSettings().githubConnection) {
      this.mode = "connect";
      this.render();
      return;
    }
    switch (this.initPhase) {
      case "form":
        this.renderInitForm();
        break;
      case "confirm":
        this.renderInitConfirm();
        break;
      case "running":
        this.renderInitRunning();
        break;
      case "done":
        this.renderInitDone();
        break;
    }
  }
  renderInitForm() {
    this.contentEl.createEl("h3", { text: "\u521D\u59CB\u5316\u535A\u5BA2" });
    this.contentEl.createEl("p", {
      cls: "vpb-modal-hint",
      text: "\u586B\u5199\u4ED3\u5E93\u540D\u540E\u5F00\u59CB\u68C0\u6D4B\u3002\u68C0\u6D4B\u53EA\u8BFB\u3001\u53EF\u968F\u65F6\u91CD\u8BD5\uFF0C\u4E0D\u4F1A\u4FEE\u6539\u4EFB\u4F55\u4ED3\u5E93\u3002"
    });
    const settings = this.deps.getSettings();
    this.articleInputValue = settings.repoName;
    this.blogInputValue = settings.blogRepoName;
    new import_obsidian6.Setting(this.contentEl).setName("\u6587\u7AE0\u4ED3\u5E93").setDesc("\u4FDD\u5B58\u6587\u7AE0\u548C\u7AD9\u70B9\u914D\u7F6E\u7684\u79C1\u5BC6\u4ED3\u5E93\u3002").addText((text) => {
      text.setPlaceholder("my-blog-wiki");
      text.setValue(this.articleInputValue);
      text.onChange((value) => {
        this.articleInputValue = value.trim();
      });
    });
    new import_obsidian6.Setting(this.contentEl).setName("\u535A\u5BA2\u4ED3\u5E93").setDesc("\u516C\u5F00\u7684\u535A\u5BA2\u4E3B\u9898\u4ED3\u5E93\uFF1B\u4E0D\u5B58\u5728\u65F6\u4ECE\u5B98\u65B9\u6A21\u677F\u521B\u5EFA\u3002").addText((text) => {
      text.setPlaceholder("yourname.github.io");
      text.setValue(this.blogInputValue);
      text.onChange((value) => {
        this.blogInputValue = value.trim();
      });
    });
    this.renderError();
    const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
    footer.createEl("button", { text: "\u53D6\u6D88", type: "button" }).addEventListener("click", () => this.close());
    const check = footer.createEl("button", { text: "\u5F00\u59CB\u68C0\u6D4B", cls: "mod-cta" });
    check.addEventListener("click", () => {
      void this.runDetect();
    });
  }
  async runDetect() {
    if (this.busy) return;
    if (!this.articleInputValue || !this.blogInputValue) {
      this.setError("\u8BF7\u5148\u586B\u5199\u6587\u7AE0\u4ED3\u5E93\u540D\u548C\u535A\u5BA2\u4ED3\u5E93\u540D\u3002");
      return;
    }
    this.setBusy(true);
    try {
      await this.deps.saveSettings({
        repoName: this.articleInputValue,
        blogRepoName: this.blogInputValue
      });
      const [article, blog, local] = await Promise.all([
        this.deps.blog.checkArticleRepository(),
        this.deps.blog.checkBlogRepository(),
        this.deps.blog.checkLocalArticleGit()
      ]);
      this.articleExists = article.exists;
      this.blogExists = blog.exists;
      this.localGitHasHistory = local.hasHistory;
      this.articleSync = "secrets";
      this.blogSync = "follow";
      this.clearError();
      this.initPhase = "confirm";
      this.render();
    } catch (error) {
      this.setError(errorText2(error));
    } finally {
      this.setBusy(false);
    }
  }
  renderInitConfirm() {
    this.contentEl.createEl("h3", { text: "\u786E\u8BA4\u521D\u59CB\u5316\u65B9\u6848" });
    const settings = this.deps.getSettings();
    const plan = this.contentEl.createDiv({ cls: "vpb-plan" });
    plan.createEl("strong", { text: "\u6587\u7AE0\u4ED3\u5E93" });
    plan.createEl("div", {
      text: this.articleExists ? `\u5DF2\u5B58\u5728 ${settings.repoName}\uFF1A\u672C\u5730 Git \u5386\u53F2${this.localGitHasHistory ? "\u6B63\u5E38\uFF0C\u53EA\u66F4\u65B0\u8FDE\u63A5\u914D\u7F6E\uFF0C\u4E0D\u4FEE\u6539\u5185\u5BB9\u3002" : "\u4E3A\u7A7A\uFF08ZIP \u89E3\u538B\u573A\u666F\uFF09\uFF0C\u9700\u8981\u5148\u786E\u5B9A\u540C\u6B65\u65B9\u5411\u3002"}` : `\u4E0D\u5B58\u5728\uFF1A\u5C06\u521B\u5EFA\u79C1\u5BC6\u4ED3\u5E93 ${settings.repoName}\uFF0C\u5E76\u4E0A\u4F20\u5F53\u524D Vault \u5185\u5BB9\u3002`,
      cls: "vpb-plan-item"
    });
    if (this.articleExists && this.localGitHasHistory) {
      const label = plan.createEl("label", { cls: "vpb-check-row" });
      label.createEl("input", { attr: { type: "checkbox" } }).addEventListener("change", (event) => {
        this.articleOverwrite = event.target.checked;
        this.articleSync = this.articleOverwrite ? "overwrite" : "secrets";
      });
      label.createEl("span", { text: "\u4F7F\u7528\u5F53\u524D Vault \u5185\u5BB9\u8986\u76D6 main\uFF08\u5371\u9669\u64CD\u4F5C\uFF0C\u4F1A\u66FF\u6362\u8FDC\u7AEF\u5168\u90E8\u5185\u5BB9\uFF09" });
    } else if (this.articleExists && !this.localGitHasHistory) {
      const group = plan.createDiv({ cls: "vpb-radio-group" });
      group.createEl("div", { text: "\u9009\u62E9\u540C\u6B65\u65B9\u5411\uFF1A", cls: "vpb-plan-item" });
      const choices = [
        { value: "remote", label: "\u4ECE\u8FDC\u7AEF\u540C\u6B65\u5230\u672C\u5730\uFF08\u63A8\u8350\uFF09\uFF1A\u4E0B\u8F7D\u8FDC\u7AEF\u5185\u5BB9\uFF0C\u672C\u5730\u540C\u540D\u6587\u4EF6\u4F1A\u88AB\u66FF\u6362\uFF0C\u672C\u5730\u72EC\u6709\u7684\u6587\u4EF6\u4FDD\u7559" },
        { value: "overwrite", label: "\u4EE5\u672C\u5730\u5185\u5BB9\u8986\u76D6\u8FDC\u7AEF\uFF1A\u672C\u5730\u4E3A\u51C6\uFF0C\u4F1A\u66FF\u6362\u8FDC\u7AEF main \u5168\u90E8\u5185\u5BB9" }
      ];
      for (const choice of choices) {
        const row = group.createEl("label", { cls: "vpb-check-row" });
        const input = row.createEl("input", { attr: { type: "radio", name: "vpb-article-sync" } });
        if (choice.value === "remote") input.checked = true;
        input.addEventListener("change", () => {
          this.articleSync = choice.value;
        });
        row.createEl("span", { text: choice.label });
      }
      this.articleSync = "remote";
    }
    plan.createEl("strong", { text: "\u535A\u5BA2\u4ED3\u5E93" });
    plan.createEl("div", {
      text: this.blogExists ? `\u5DF2\u5B58\u5728 ${settings.blogRepoName}\uFF1A\u9009\u62E9\u300C\u66F4\u65B0\u4E3B\u9898\u300D\u5C06\u5347\u7EA7\u5230\u6700\u65B0\u4E3B\u9898\u5E76\u89E6\u53D1\u6784\u5EFA\uFF08\u535A\u5BA2\u4ED3\u5E93\u4EC5\u4E00\u4E2A deploy.yml\uFF0C\u8986\u76D6\u65E0\u98CE\u9669\uFF09\uFF1B\u300C\u4EC5\u914D\u7F6E\u53D8\u91CF\u300D\u53EA\u66F4\u65B0 WIKI_URL \u4E0E PAT\uFF0C\u4E0D\u6539\u5185\u5BB9\u3002` : `\u4E0D\u5B58\u5728\uFF1A\u5C06\u521B\u5EFA\u516C\u5F00\u58F3\u4ED3\u5E93 ${settings.blogRepoName}\uFF08\u4EC5 .github/workflows/deploy.yml\uFF0C\u9489\u5B9A\u6700\u65B0\u4E3B\u9898\uFF09\uFF0C\u5E76\u914D\u7F6E Pages \u4E0E\u9996\u6B21\u6784\u5EFA\u3002`,
      cls: "vpb-plan-item"
    });
    if (this.blogExists) {
      const group = plan.createDiv({ cls: "vpb-radio-group" });
      const choices = [
        { value: "follow", label: "\u66F4\u65B0\u4E3B\u9898\uFF08\u63A8\u8350\uFF09\uFF1A\u5C06\u535A\u5BA2\u5347\u7EA7\u5230\u6700\u65B0\u4E3B\u9898\u7248\u672C\uFF08\u91CD\u5199 deploy.yml \u9489\u5B9A\u6700\u65B0 commit\uFF0C\u81EA\u52A8\u89E6\u53D1\u6784\u5EFA\uFF09" },
        { value: "secrets", label: "\u4EC5\u914D\u7F6E\u53D8\u91CF\uFF1A\u53EA\u66F4\u65B0 WIKI_URL \u4E0E PAT \u7B49\u53D8\u91CF\uFF0C\u4E0D\u4FEE\u6539\u4ED3\u5E93\u5185\u5BB9" }
      ];
      for (const choice of choices) {
        const row = group.createEl("label", { cls: "vpb-check-row" });
        const input = row.createEl("input", { attr: { type: "radio", name: "vpb-blog-sync" } });
        if (choice.value === "follow") input.checked = true;
        input.addEventListener("change", () => {
          this.blogSync = choice.value;
        });
        row.createEl("span", { text: choice.label });
      }
    }
    this.renderError();
    const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
    const back = footer.createEl("button", { text: "\u8FD4\u56DE\u4FEE\u6539", type: "button" });
    back.addEventListener("click", () => {
      this.initPhase = "form";
      this.render();
    });
    footer.createEl("button", { text: "\u53D6\u6D88", type: "button" }).addEventListener("click", () => this.close());
    const start = footer.createEl("button", { text: "\u5F00\u59CB\u521D\u59CB\u5316", cls: "mod-cta" });
    start.addEventListener("click", () => {
      void this.startInitialization();
    });
  }
  async startInitialization() {
    if (this.busy) return;
    const settings = this.deps.getSettings();
    const record = {
      articleRepo: settings.repoName.trim(),
      blogRepo: settings.blogRepoName.trim(),
      articleReady: false,
      blogReady: false,
      pagesReady: false,
      updatedAt: Date.now()
    };
    this.initRecord = record;
    await this.deps.saveSettings({ initialization: record });
    this.deps.onChanged();
    this.initPhase = "running";
    this.stepIndex = 0;
    this.render();
    void this.runAllSteps();
  }
  renderInitRunning() {
    this.contentEl.createEl("h3", { text: "\u6B63\u5728\u521D\u59CB\u5316" });
    const list = this.contentEl.createDiv({ cls: "vpb-steps" });
    INIT_STEPS.forEach((label, index) => {
      const item = list.createDiv({ cls: "vpb-step" });
      const done = index < this.stepIndex;
      const current = index === this.stepIndex;
      if (done) {
        item.addClass("is-done");
        (0, import_obsidian6.setIcon)(item.createSpan({ cls: "vpb-step-icon" }), "check");
      } else if (current) {
        item.addClass("is-current");
        (0, import_obsidian6.setIcon)(item.createSpan({ cls: "vpb-step-icon" }), "loader-2");
      } else {
        (0, import_obsidian6.setIcon)(item.createSpan({ cls: "vpb-step-icon" }), "circle");
      }
      item.createEl("span", { text: label });
    });
    this.renderError();
    if (this.error) {
      const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
      footer.createEl("button", { text: "\u53D6\u6D88", type: "button" }).addEventListener("click", () => this.close());
      const retry = footer.createEl("button", { text: "\u91CD\u8BD5\uFF08\u4ECE\u5931\u8D25\u6B65\u9AA4\u7EE7\u7EED\uFF09", cls: "mod-cta" });
      retry.addEventListener("click", () => {
        this.clearError();
        this.render();
        void this.runAllSteps();
      });
    }
  }
  async runAllSteps() {
    if (this.busy) return;
    this.setBusy(true);
    const record = this.initRecord;
    if (!record) {
      this.setBusy(false);
      return;
    }
    try {
      for (let index = 0; index < INIT_STEPS.length; index += 1) {
        if (this.stepIndex !== index) {
          continue;
        }
        const ok = await this.runStep(index, record);
        if (!ok) {
          return;
        }
        this.stepIndex = index + 1;
        this.render();
      }
      record.completedAt = Date.now();
      record.updatedAt = Date.now();
      record.lastError = void 0;
      await this.deps.saveSettings({ initialization: record });
      this.initPhase = "done";
      this.render();
      this.deps.onChanged();
    } finally {
      this.setBusy(false);
    }
  }
  /** True when the article step pushes content (trigger.yml auto-dispatches the blog build). */
  articlePushHappened(articleExists) {
    return !articleExists || this.articleSync === "overwrite";
  }
  /**
   * Executes one wizard step and persists its completion immediately, so a
   * crash or network failure never requires redoing finished work.
   */
  async runStep(index, record) {
    try {
      switch (index) {
        case 0:
          if (!record.articleReady) {
            await this.deps.blog.ensureTemplateFiles();
            const check = await this.deps.blog.checkArticleRepository();
            if (check.exists) {
              if (this.articleSync === "overwrite") {
                await this.deps.blog.configureArticleRepository();
              } else if (this.articleSync === "remote") {
                await this.deps.blog.syncArticleFromRemote();
              } else {
                await this.deps.blog.configureArticleSecretsOnly();
              }
            } else {
              await this.deps.blog.createArticleRepository();
            }
            record.articleReady = true;
          }
          break;
        case 1:
          if (!record.blogReady) {
            const check = await this.deps.blog.checkBlogRepository();
            if (check.exists) {
              if (this.blogSync === "follow") {
                await this.deps.blog.configureBlogRepository();
              } else {
                await this.deps.blog.configureBlogSecretsOnly();
              }
            } else {
              await this.deps.blog.createBlogRepository();
            }
            record.blogReady = true;
          }
          break;
        case 2:
          if (!record.pagesReady) {
            await this.deps.blog.ensurePagesConfigured();
            record.pagesReady = true;
          }
          break;
        case 3:
          if (!record.deploymentTriggeredAt) {
            const triggeredAt = await this.deps.blog.triggerDeploy();
            record.deploymentTriggeredAt = triggeredAt;
            await this.deps.monitor.recordTrigger("\u9996\u6B21\u90E8\u7F72", triggeredAt);
          }
          break;
      }
      record.updatedAt = Date.now();
      record.lastError = void 0;
      await this.deps.saveSettings({ initialization: record });
      this.deps.onChanged();
      return true;
    } catch (error) {
      record.updatedAt = Date.now();
      record.lastError = errorText2(error);
      await this.deps.saveSettings({ initialization: record });
      this.setError(errorText2(error));
      this.deps.onChanged();
      this.render();
      return false;
    }
  }
  renderInitDone() {
    this.contentEl.createEl("h3", { text: "\u521D\u59CB\u5316\u5B8C\u6210" });
    this.contentEl.createEl("p", {
      cls: "vpb-modal-hint",
      text: "\u535A\u5BA2\u5DF2\u5C31\u7EEA\u3002\u4E4B\u540E\u5199\u6587\u7AE0\u540E\u70B9\u51FB\u63A7\u5236\u53F0\u7684\u300C\u63D0\u4EA4\u5E76\u63A8\u9001\u300D\uFF0C\u7AD9\u70B9\u4F1A\u81EA\u52A8\u91CD\u65B0\u6784\u5EFA\u3002"
    });
    const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
    const done = footer.createEl("button", { text: "\u5B8C\u6210", cls: "mod-cta" });
    done.addEventListener("click", () => this.close());
  }
  // ------------------------------------------------------------------
  // Deployment detail
  // ------------------------------------------------------------------
  renderDeployment() {
    this.contentEl.createEl("h3", { text: "\u90E8\u7F72\u8BE6\u60C5" });
    const snapshot = this.deps.monitor.getSnapshot();
    this.renderSnapshot(snapshot);
    this.renderError();
    const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
    const refresh = footer.createEl("button", { text: "\u5237\u65B0\u72B6\u6001" });
    refresh.addEventListener("click", () => {
      void this.refreshDeployment();
    });
    if (snapshot.runUrl) {
      const view = footer.createEl("button", { text: "\u5728 GitHub \u67E5\u770B" });
      view.addEventListener("click", () => {
        window.open(snapshot.runUrl, "_blank");
      });
    }
    const rebuild = footer.createEl("button", {
      text: snapshot.phase === "failure" ? "\u91CD\u8BD5\u6784\u5EFA" : "\u91CD\u65B0\u6784\u5EFA",
      // Only failures deserve the prominent CTA; otherwise a plain button
      // avoids accidental rebuilds.
      cls: snapshot.phase === "failure" ? "mod-cta" : ""
    });
    rebuild.addEventListener("click", () => {
      void this.rebuild();
    });
    footer.createEl("button", { text: "\u5173\u95ED", type: "button" }).addEventListener("click", () => this.close());
  }
  renderSnapshot(snapshot) {
    const box = this.contentEl.createDiv({ cls: "vpb-deploy-detail" });
    box.createEl("strong", { text: snapshot.title });
    box.createEl("div", { text: snapshot.detail, cls: "vpb-muted" });
    if (snapshot.updatedAt) {
      box.createEl("div", {
        text: `\u66F4\u65B0\u4E8E ${new Date(snapshot.updatedAt).toLocaleString("zh-CN")}`,
        cls: "vpb-muted"
      });
    }
  }
  async refreshDeployment() {
    if (this.busy) return;
    this.setBusy(true);
    try {
      await this.deps.monitor.refresh(true);
      this.deps.onChanged();
      this.render();
    } catch (error) {
      this.setError(errorText2(error));
    } finally {
      this.setBusy(false);
    }
  }
  async rebuild() {
    if (this.busy) return;
    this.setBusy(true);
    try {
      const triggeredAt = await this.deps.blog.triggerDeploy();
      await this.deps.monitor.recordTrigger("\u624B\u52A8\u89E6\u53D1\u6784\u5EFA", triggeredAt);
      this.clearError();
      this.deps.onChanged();
      this.render();
    } catch (error) {
      this.setError(errorText2(error));
    } finally {
      this.setBusy(false);
    }
  }
  // ------------------------------------------------------------------
  // Vercel options
  // ------------------------------------------------------------------
  renderVercel() {
    this.contentEl.createEl("h3", { text: "Vercel \u90E8\u7F72\u9009\u9879" });
    this.contentEl.createEl("p", {
      cls: "vpb-modal-hint",
      text: "\u4E09\u9879\u90FD\u586B\u5199\u540E\uFF0C\u4E0B\u6B21\u521D\u59CB\u5316\u6216\u91CD\u65B0\u6784\u5EFA\u65F6\u4F1A\u5199\u5165 VERCEL_* secrets\uFF1B\u7559\u7A7A\u5219\u8DF3\u8FC7 Vercel\u3002"
    });
    const fields = [
      { key: "vercelToken", name: "Vercel Token", placeholder: "vercel_token" },
      { key: "vercelOrgId", name: "Vercel Org ID", placeholder: "team_xxx" },
      { key: "vercelProjectId", name: "Vercel Project ID", placeholder: "prj_xxx" }
    ];
    for (const field of fields) {
      new import_obsidian6.Setting(this.contentEl).setName(field.name).addText((text) => {
        text.inputEl.type = "password";
        text.inputEl.autocomplete = "off";
        text.inputEl.spellcheck = false;
        text.setPlaceholder(field.placeholder);
        text.setValue(this.deps.getSettings()[field.key]);
        text.onChange((value) => {
          void this.deps.saveSettings({ [field.key]: value.trim() }).catch((error) => {
            new import_obsidian6.Notice(errorText2(error));
          });
        });
      });
    }
    this.renderError();
    const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
    const done = footer.createEl("button", { text: "\u5B8C\u6210", cls: "mod-cta" });
    done.addEventListener("click", () => this.close());
  }
  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------
  setError(message) {
    this.error = message;
    this.renderError();
  }
  clearError() {
    this.error = null;
  }
  renderError() {
    const existing = this.contentEl.querySelector(".vpb-modal-error");
    existing?.remove();
    if (!this.error) return;
    this.contentEl.createEl("div", { text: this.error, cls: "vpb-modal-error" });
  }
  setBusy(busy) {
    this.busy = busy;
    this.contentEl.querySelectorAll("button").forEach((button) => {
      if (button.textContent === "\u53D6\u6D88" || button.textContent === "\u5173\u95ED") return;
      button.disabled = busy;
    });
  }
};

// src/ui/OverviewSection.ts
var OverviewSection = class {
  constructor(deps) {
    this.deps = deps;
  }
  render(container) {
    container.empty();
    this.renderStatus(container);
    this.renderWriting(container);
    if (this.deps.blog.isInitialized()) {
      this.renderGitSync(container);
    }
    this.renderContentOverview(container);
  }
  // ------------------------------------------------------------------
  // Status
  // ------------------------------------------------------------------
  renderStatus(container) {
    const snapshot = this.deps.monitor.getSnapshot();
    const hero = container.createDiv({ cls: `vpb-status-hero is-${snapshot.phase}` });
    const top = hero.createDiv({ cls: "vpb-card-header" });
    const title = top.createDiv({ cls: "vpb-status-title" });
    title.createSpan({ cls: "vpb-status-dot" });
    title.createEl("strong", { text: snapshot.title });
    const actions = top.createDiv({ cls: "vpb-card-actions" });
    this.createRefreshButton(actions, "\u5237\u65B0\u72B6\u6001", () => this.refreshConsoleStatus());
    const more = this.createIconButton(actions, "\u66F4\u591A\u64CD\u4F5C", "more-horizontal");
    more.addEventListener("click", (event) => {
      this.openMoreMenu(event);
    });
    hero.createEl("div", { text: snapshot.detail, cls: "vpb-status-detail" });
    if (snapshot.updatedAt) {
      hero.createEl("div", {
        text: `\u66F4\u65B0\u4E8E ${new Date(snapshot.updatedAt).toLocaleString("zh-CN", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit"
        })}`,
        cls: "vpb-status-time"
      });
    }
    const primary = hero.createEl("button", {
      text: this.primaryActionLabel(snapshot.phase),
      cls: "vpb-status-primary"
    });
    primary.addEventListener("click", () => {
      this.openStatusModal(this.primaryActionMode(snapshot.phase));
    });
  }
  primaryActionLabel(phase) {
    switch (phase) {
      case "disconnected":
        return "\u8FDE\u63A5 GitHub";
      case "uninitialized":
        return "\u521D\u59CB\u5316\u535A\u5BA2";
      case "initializing":
        return "\u7EE7\u7EED\u521D\u59CB\u5316";
      case "cancelled":
        return "\u91CD\u65B0\u6784\u5EFA";
      default:
        return "\u67E5\u770B\u90E8\u7F72";
    }
  }
  primaryActionMode(phase) {
    switch (phase) {
      case "disconnected":
        return "connect";
      case "uninitialized":
      case "initializing":
        return "initialize";
      default:
        return "deployment";
    }
  }
  async refreshConsoleStatus() {
    await this.deps.monitor.refresh(true);
    this.deps.onChanged();
  }
  openStatusModal(mode) {
    new StatusModal(
      {
        app: this.deps.app,
        getSettings: this.deps.getSettings,
        saveSettings: this.deps.saveSettings,
        blog: this.deps.blog,
        monitor: this.deps.monitor,
        onChanged: () => this.deps.onChanged()
      },
      mode
    ).open();
  }
  openMoreMenu(event) {
    const menu = new import_obsidian7.Menu();
    menu.addItem((item) => {
      item.setTitle("\u91CD\u65B0\u8FDE\u63A5 GitHub").setIcon("plug").onClick(() => this.openStatusModal("connect"));
    });
    menu.addItem((item) => {
      item.setTitle("\u91CD\u65B0\u521D\u59CB\u5316\u535A\u5BA2").setIcon("refresh-cw").onClick(() => this.openStatusModal("initialize"));
    });
    menu.addItem((item) => {
      item.setTitle("Vercel \u90E8\u7F72\u9009\u9879").setIcon("cloud").onClick(() => this.openStatusModal("vercel"));
    });
    menu.addItem((item) => {
      item.setTitle("\u624B\u52A8\u89E6\u53D1\u6784\u5EFA").setIcon("zap").onClick(() => {
        void this.triggerRebuild();
      });
    });
    menu.addItem((item) => {
      item.setTitle("\u68C0\u67E5\u66F4\u65B0").setIcon("download").onClick(() => {
        new UpdateModal(this.deps.app, {
          blog: this.deps.blog,
          monitor: this.deps.monitor,
          blogRepo: this.deps.getSettings().blogRepoName.trim(),
          onChanged: () => this.deps.onChanged()
        }).open();
      });
    });
    const login = this.deps.getSettings().githubConnection?.login;
    if (login) {
      menu.addSeparator();
      const { repoName, blogRepoName } = this.deps.getSettings();
      if (repoName.trim()) {
        menu.addItem((item) => {
          item.setTitle("\u6253\u5F00\u6587\u7AE0\u4ED3\u5E93").setIcon("book-open").onClick(() => window.open(`https://github.com/${login}/${repoName.trim()}`, "_blank"));
        });
      }
      if (blogRepoName.trim()) {
        menu.addItem((item) => {
          item.setTitle("\u6253\u5F00\u535A\u5BA2\u4ED3\u5E93").setIcon("globe").onClick(() => window.open(`https://github.com/${login}/${blogRepoName.trim()}`, "_blank"));
        });
      }
    }
    menu.showAtMouseEvent(event);
  }
  async triggerRebuild() {
    try {
      const triggeredAt = await this.deps.blog.triggerDeploy();
      await this.deps.monitor.recordTrigger("\u624B\u52A8\u89E6\u53D1\u6784\u5EFA", triggeredAt);
      new import_obsidian7.Notice("\u5DF2\u89E6\u53D1\u535A\u5BA2\u91CD\u65B0\u6784\u5EFA\u3002", 4e3);
      this.deps.onChanged();
      void this.deps.monitor.refresh();
    } catch (error) {
      new import_obsidian7.Notice(`\u89E6\u53D1\u6784\u5EFA\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`, 8e3);
    }
  }
  // ------------------------------------------------------------------
  // Writing
  // ------------------------------------------------------------------
  renderWriting(container) {
    const section = container.createDiv({ cls: "vpb-section" });
    section.createEl("h3", { text: "\u5199\u4F5C" });
    const buttons = section.createDiv({ cls: "vpb-button-row" });
    this.actionButton(buttons, "\u65B0\u5EFA\u6587\u7AE0", async () => {
      new NewArticleModal(this.deps.app, async (input) => {
        await this.deps.createArticle(input);
      }).open();
    });
    this.actionButton(buttons, "\u914D\u7F6E\u7AD9\u70B9", async () => {
      new SiteConfigModal(this.deps.app, () => this.deps.onChanged()).open();
    });
  }
  // ------------------------------------------------------------------
  // Git sync
  // ------------------------------------------------------------------
  renderGitSync(container) {
    const section = container.createDiv({ cls: "vpb-section" });
    const header = section.createDiv({ cls: "vpb-card-header" });
    header.createEl("h3", { text: "Git \u540C\u6B65" });
    const actions = header.createDiv({ cls: "vpb-card-actions" });
    this.createRefreshButton(actions, "\u5237\u65B0 Git \u72B6\u6001", () => this.refreshGitStatus());
    this.gitStatusEl = section.createDiv({ cls: "vpb-git-status" });
    this.gitStatusEl.setText("\u6B63\u5728\u8BFB\u53D6 Git \u72B6\u6001\u2026");
    const buttons = section.createDiv({ cls: "vpb-button-row" });
    this.actionButton(buttons, "\u62C9\u53D6", async () => {
      const git = await this.readyGit();
      await git.pull();
      await this.deps.saveSettings({ lastGitSyncAt: Date.now() });
      await this.refreshGitStatus();
    });
    this.actionButton(buttons, "\u63D0\u4EA4\u5E76\u63A8\u9001", async () => {
      const git = await this.readyGit();
      const status = await git.status();
      if (status.all.length === 0) {
        throw new Error("\u6CA1\u6709\u9700\u8981\u63D0\u4EA4\u7684\u5185\u5BB9\u3002");
      }
      const modal = new CommitMessageModal(this.deps.app);
      modal.open();
      const message = await modal.waitForClose();
      if (message === null) {
        return;
      }
      await git.commitAll(message);
      await git.pushCurrent();
      await this.deps.saveSettings({ lastGitSyncAt: Date.now() });
      await this.deps.monitor.recordTrigger(`\u63D0\u4EA4\uFF1A${message}`);
      await this.refreshGitStatus();
      this.deps.onChanged();
      void this.deps.monitor.refresh();
    });
    void this.refreshGitStatus();
  }
  async readyGit() {
    const git = this.deps.blog.getGitEngine();
    if (!git) {
      throw new Error("\u672A\u68C0\u6D4B\u5230 obsidian-git\uFF0C\u8BF7\u5148\u5728\u7B2C\u4E09\u65B9\u63D2\u4EF6\u4E2D\u542F\u7528 Git \u63D2\u4EF6\u3002");
    }
    const settings = this.deps.getSettings();
    const login = settings.githubConnection?.login ?? "";
    const pat = settings.pat.trim();
    const repoName = settings.repoName.trim();
    if (!login || !pat) {
      throw new Error("\u8BF7\u5148\u5728\u9876\u90E8\u72B6\u6001\u5361\u4E2D\u8FDE\u63A5 GitHub\uFF0C\u518D\u4F7F\u7528 Git \u540C\u6B65\u3002");
    }
    if (!repoName) {
      throw new Error("\u8BF7\u5148\u5B8C\u6210\u521D\u59CB\u5316\uFF0C\u518D\u4F7F\u7528 Git \u540C\u6B65\u3002");
    }
    git.setCredentials(login, pat);
    await git.ensureReady();
    const repository = { owner: login, name: repoName };
    await git.setRemote("origin", authenticatedGitHubUrl(repository, pat));
    return git;
  }
  /**
   * Refreshes the local Git status banner. Called on render, on demand, and
   * periodically by the console poll timer. All operations are local.
   */
  async refreshGitStatus() {
    const el = this.gitStatusEl;
    if (!el) return;
    const git = this.deps.blog.getGitEngine();
    if (!git) {
      el.setText("Git \u5F15\u64CE\u672A\u5C31\u7EEA\uFF1A\u8BF7\u542F\u7528 obsidian-git \u63D2\u4EF6\u3002");
      return;
    }
    try {
      await git.ensureReady();
      const [status, branch, unpushed] = await Promise.all([
        git.status(),
        git.branchInfo(),
        git.getUnpushedCommits().catch(() => 0)
      ]);
      el.empty();
      const banner = el.createDiv({ cls: "vpb-git-banner" });
      banner.createSpan({ cls: "vpb-status-dot" });
      if (status.conflicted.length > 0) {
        banner.addClass("is-conflict");
        banner.createSpan({ text: `\u5B58\u5728 ${status.conflicted.length} \u9879\u51B2\u7A81\uFF0C\u8BF7\u5148\u89E3\u51B3\u518D\u63D0\u4EA4` });
      } else if (status.changed.length > 0) {
        banner.addClass("is-changes");
        banner.createSpan({ text: `\u6709 ${status.changed.length} \u9879\u6539\u52A8\u5F85\u63D0\u4EA4` });
      } else if (unpushed > 0) {
        banner.addClass("is-unpushed");
        banner.createSpan({ text: `\u6709 ${unpushed} \u4E2A\u63D0\u4EA4\u5F85\u63A8\u9001` });
      } else {
        banner.addClass("is-clean");
        banner.createSpan({ text: "\u5DF2\u540C\u6B65\uFF0C\u5DE5\u4F5C\u533A\u5E72\u51C0" });
      }
      const syncAt = this.deps.getSettings().lastGitSyncAt;
      const syncText = syncAt ? ` \xB7 \u4E0A\u6B21\u540C\u6B65 ${new Date(syncAt).toLocaleString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit"
      })}` : "";
      el.createEl("div", {
        text: `\u5206\u652F\uFF1A${branch.current || "\u672A\u77E5"} \xB7 \u540E\u7AEF\uFF1A${git.backend}${syncText}`,
        cls: "vpb-muted"
      });
    } catch (error) {
      el.setText(`Git \u72B6\u6001\u8BFB\u53D6\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`);
    }
  }
  // ------------------------------------------------------------------
  // Content overview
  // ------------------------------------------------------------------
  renderContentOverview(container) {
    const section = container.createDiv({ cls: "vpb-section" });
    section.createEl("h3", { text: "\u5185\u5BB9\u6982\u89C8" });
    const files = this.deps.app.vault.getMarkdownFiles();
    const tags = /* @__PURE__ */ new Set();
    let articleCount = 0;
    for (const file of files) {
      const frontmatter = this.deps.app.metadataCache.getFileCache(file)?.frontmatter;
      if (frontmatter?.layout === "doc") articleCount += 1;
      if (Array.isArray(frontmatter?.tags)) {
        for (const tag of frontmatter.tags) {
          if (typeof tag === "string") tags.add(tag);
        }
      } else if (typeof frontmatter?.tags === "string") {
        frontmatter.tags.split(/[,\s]+/).filter(Boolean).forEach((tag) => tags.add(tag));
      }
    }
    const grid = section.createDiv({ cls: "vpb-stat-grid" });
    this.stat(grid, `${files.length}`, "Markdown \u6587\u4EF6");
    this.stat(grid, `${articleCount}`, "\u5DF2\u53D1\u5E03\u6587\u7AE0");
    this.stat(grid, `${tags.size}`, "\u6807\u7B7E");
  }
  // ------------------------------------------------------------------
  // Helpers
  // ------------------------------------------------------------------
  stat(container, value, label) {
    const item = container.createDiv({ cls: "vpb-stat" });
    item.createEl("strong", { text: value });
    item.createEl("span", { text: label });
  }
  createIconButton(container, label, icon) {
    const button = container.createEl("button", {
      cls: "vpb-icon-button",
      attr: { "aria-label": label }
    });
    (0, import_obsidian7.setIcon)(button, icon);
    return button;
  }
  createRefreshButton(container, label, action) {
    const button = this.createIconButton(container, label, "refresh-cw");
    button.addEventListener("click", () => {
      void this.runRefresh(button, label, action);
    });
  }
  async runRefresh(button, label, action) {
    if (button.disabled) return;
    button.disabled = true;
    button.setAttribute("aria-busy", "true");
    button.classList.add("is-pending");
    (0, import_obsidian7.setIcon)(button, "loader-2");
    try {
      await action();
    } catch (error) {
      new import_obsidian7.Notice(`${label}\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`);
    } finally {
      button.disabled = false;
      button.removeAttribute("aria-busy");
      button.classList.remove("is-pending");
      (0, import_obsidian7.setIcon)(button, "refresh-cw");
    }
  }
  actionButton(container, label, action) {
    const button = container.createEl("button", { text: label, cls: "mod-cta" });
    button.addEventListener("click", () => {
      void this.run(button, action);
    });
  }
  async run(button, action) {
    if (button.disabled) return;
    const label = button.textContent ?? "";
    this.setButtonPending(button, true);
    try {
      await action();
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      new import_obsidian7.Notice(`VitePress Butterfly\uFF1A${message}`, 8e3);
    } finally {
      button.textContent = label;
      this.setButtonPending(button, false);
    }
  }
  /**
   * Uniform pending indicator: a spinning loader icon prepended to the
   * label, keeping the button width stable. No "…" text mutations.
   */
  setButtonPending(button, pending) {
    button.disabled = pending;
    button.classList.toggle("is-pending", pending);
    const existing = button.querySelector(".vpb-btn-loader");
    if (pending && !existing) {
      const loader = button.createSpan({ cls: "vpb-btn-loader" });
      button.insertBefore(loader, button.firstChild);
      (0, import_obsidian7.setIcon)(loader, "loader-2");
    } else if (!pending && existing) {
      existing.remove();
    }
  }
};
var UpdateModal = class extends import_obsidian7.Modal {
  constructor(app, deps) {
    super(app);
    this.deps = deps;
    this.checking = true;
    this.plugin = null;
    this.error = null;
    this.updating = null;
  }
  onOpen() {
    this.render();
    void this.check();
  }
  onClose() {
    this.contentEl.empty();
  }
  async check() {
    this.checking = true;
    this.error = null;
    this.render();
    try {
      this.plugin = await this.deps.blog.checkPluginUpdate();
    } catch (error) {
      this.error = error instanceof Error ? error.message : String(error);
    } finally {
      this.checking = false;
      this.render();
    }
  }
  render() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", { text: "\u68C0\u67E5\u66F4\u65B0" });
    if (this.checking) {
      const loading = contentEl.createDiv({ cls: "vpb-config-loading" });
      const icon = loading.createSpan();
      (0, import_obsidian7.setIcon)(icon, "loader-2");
      loading.createSpan({ text: "\u6B63\u5728\u68C0\u67E5\u63D2\u4EF6\u4E0E\u4E3B\u9898\u66F4\u65B0\u2026" });
      return;
    }
    if (this.error) {
      contentEl.createEl("div", { text: this.error, cls: "vpb-modal-error" });
      const footer2 = contentEl.createDiv({ cls: "modal-button-container" });
      footer2.createEl("button", { text: "\u91CD\u8BD5" }).addEventListener("click", () => {
        void this.check();
      });
      footer2.createEl("button", { text: "\u5173\u95ED" }).addEventListener("click", () => this.close());
      return;
    }
    const pluginSection = contentEl.createDiv({ cls: "vpb-update-item" });
    pluginSection.createEl("strong", { text: "\u63D2\u4EF6" });
    if (this.plugin?.latest) {
      pluginSection.createEl("div", { text: `\u5DF2\u662F\u6700\u65B0\u7248\u672C\uFF08v${this.plugin.current}\uFF09\u3002`, cls: "vpb-update-ok" });
    } else {
      pluginSection.createEl("div", {
        text: `\u68C0\u6D4B\u5230\u65B0\u7248\u672C\uFF1Av${this.plugin?.current ?? "?"} \u2192 v${this.plugin?.latestVersion ?? "?"}\uFF08\u4ECE\u6A21\u677F\u4ED3\u5E93\u4E0B\u8F7D\uFF0C\u672C\u673A\u8BBE\u7F6E\u4E0D\u53D7\u5F71\u54CD\uFF09\u3002`,
        cls: "vpb-modal-hint"
      });
      const update = pluginSection.createEl("button", { text: "\u66F4\u65B0\u63D2\u4EF6", cls: "mod-cta" });
      update.addEventListener("click", () => {
        void this.doUpdatePlugin(update);
      });
    }
    const themeSection = contentEl.createDiv({ cls: "vpb-update-item" });
    themeSection.createEl("strong", { text: "\u535A\u5BA2\u4E3B\u9898" });
    if (this.deps.blog.isBlogThemeSource()) {
      themeSection.createEl("div", {
        text: "\u5F53\u524D\u535A\u5BA2\u4ED3\u5E93\u662F\u4E3B\u9898\u4ED3\u5E93\uFF08\u6F14\u793A\u7AD9\u6A21\u5F0F\uFF09\uFF1A\u4E3B\u9898\u66F4\u65B0\u5DF2\u7981\u7528\u3002\u53D1\u5E03\u5185\u5BB9\u4ECD\u4F1A\u6B63\u5E38\u6784\u5EFA\u6F14\u793A\u7AD9\u3002",
        cls: "vpb-update-ok"
      });
    } else {
      themeSection.createEl("div", {
        text: `\u5C06\u628A\u535A\u5BA2\u4ED3\u5E93 ${this.deps.blogRepo} \u9489\u5B9A\u5230\u6700\u65B0\u4E3B\u9898\u7248\u672C\uFF1A\u66F4\u65B0 .github/workflows/deploy.yml \u4E2D\u7684\u4E3B\u9898 commit\uFF08\u535A\u5BA2\u4ED3\u5E93\u7684\u552F\u4E00\u6587\u4EF6\uFF09\uFF0C\u63A8\u9001\u540E\u81EA\u52A8\u89E6\u53D1\u6784\u5EFA\u3002\u65E0\u9700\u5220\u9664\u6216\u91CD\u5EFA\u4ED3\u5E93\u3002`,
        cls: "vpb-modal-hint"
      });
      const update = themeSection.createEl("button", { text: "\u66F4\u65B0\u4E3B\u9898", cls: "mod-cta" });
      update.addEventListener("click", () => {
        void this.doUpdateTheme(update);
      });
    }
    const footer = contentEl.createDiv({ cls: "modal-button-container" });
    footer.createEl("button", { text: "\u5173\u95ED", cls: "mod-cta" }).addEventListener("click", () => this.close());
  }
  async doUpdatePlugin(button) {
    if (this.updating) return;
    this.updating = "plugin";
    this.setPending(button);
    try {
      await this.deps.blog.updatePlugin();
      new import_obsidian7.Notice("\u63D2\u4EF6\u5DF2\u66F4\u65B0\uFF0C\u8BF7\u91CD\u8F7D\u63D2\u4EF6\uFF08\u8BBE\u7F6E \u2192 \u7B2C\u4E09\u65B9\u63D2\u4EF6 \u2192 \u5173\u95ED\u518D\u542F\u7528\uFF09\u751F\u6548\u3002", 8e3);
      this.close();
    } catch (error) {
      this.error = error instanceof Error ? error.message : String(error);
      this.render();
    } finally {
      this.updating = null;
    }
  }
  async doUpdateTheme(button) {
    if (this.updating) return;
    this.updating = "theme";
    this.setPending(button);
    try {
      const result = await this.deps.blog.updateTheme();
      await this.deps.monitor.recordTrigger(`\u66F4\u65B0\u4E3B\u9898\uFF08${result.themeSha.slice(0, 7)}\uFF09`);
      this.deps.onChanged();
      new import_obsidian7.Notice("\u535A\u5BA2\u4ED3\u5E93\u5DF2\u91CD\u5EFA\uFF0C\u6B63\u5728\u6784\u5EFA\u6700\u65B0\u4E3B\u9898\u3002", 6e3);
      this.close();
    } catch (error) {
      this.error = error instanceof Error ? error.message : String(error);
      this.render();
    } finally {
      this.updating = null;
    }
  }
  setPending(button) {
    button.disabled = true;
    button.classList.add("is-pending");
    const loader = button.createSpan({ cls: "vpb-btn-loader" });
    button.insertBefore(loader, button.firstChild);
    (0, import_obsidian7.setIcon)(loader, "loader-2");
  }
};
var CommitMessageModal = class extends import_obsidian7.Modal {
  constructor() {
    super(...arguments);
    this.message = "";
    this.resolve = null;
  }
  waitForClose() {
    return new Promise((resolve) => {
      this.resolve = resolve;
    });
  }
  onOpen() {
    const { contentEl } = this;
    contentEl.empty();
    contentEl.createEl("h3", { text: "\u63D0\u4EA4\u5E76\u53D1\u5E03" });
    new import_obsidian7.Setting(contentEl).setName("\u63D0\u4EA4\u8BF4\u660E").setDesc("\u8FD9\u6BB5\u6587\u5B57\u4F1A\u4F5C\u4E3A Git commit message\uFF1B\u7559\u7A7A\u4F7F\u7528\u9ED8\u8BA4\u503C\u3002").addText((text) => {
      text.setPlaceholder("Update blog content");
      text.inputEl.addEventListener("input", () => {
        this.message = text.getValue();
      });
      window.setTimeout(() => text.inputEl.focus(), 0);
    });
    const footer = contentEl.createDiv({ cls: "modal-button-container" });
    footer.createEl("button", { text: "\u53D6\u6D88" }).addEventListener("click", () => {
      this.settle(null);
      this.close();
    });
    footer.createEl("button", { text: "\u63D0\u4EA4\u5E76\u63A8\u9001", cls: "mod-cta" }).addEventListener("click", () => {
      this.settle(this.message.trim() || "Update blog content");
      this.close();
    });
  }
  onClose() {
    this.settle(null);
    this.contentEl.empty();
  }
  settle(message) {
    this.resolve?.(message);
    this.resolve = null;
  }
};

// src/ui/ConsoleView.ts
var CONSOLE_VIEW_TYPE = "vitepress-butterfly-console";
var DEPLOYMENT_POLL_INTERVAL = 2e4;
var ConsoleView = class extends import_obsidian8.ItemView {
  constructor(leaf, deps) {
    super(leaf);
    this.deps = deps;
  }
  getViewType() {
    return CONSOLE_VIEW_TYPE;
  }
  getDisplayText() {
    return "VitePress Butterfly";
  }
  getIcon() {
    return "rocket";
  }
  async onOpen() {
    await this.render();
    this.scheduleDeploymentPolling();
  }
  async onClose() {
    if (this.pollTimer !== void 0) {
      window.clearInterval(this.pollTimer);
      this.pollTimer = void 0;
    }
  }
  // ------------------------------------------------------------------
  // Shell
  // ------------------------------------------------------------------
  async render() {
    const container = this.containerEl;
    container.empty();
    container.addClass("vpb-console");
    const header = container.createDiv({ cls: "vpb-console-header" });
    header.createEl("h2", { text: "VitePress Butterfly" });
    header.createEl("p", { text: "\u5199\u4F5C\u3001\u914D\u7F6E\u3001\u53D1\u5E03\u4E0E\u90E8\u7F72\u72B6\u6001\u90FD\u5728\u8FD9\u91CC\u3002", cls: "vpb-muted" });
    const content = container.createDiv({ cls: "vpb-console-content" });
    this.section = new OverviewSection({
      app: this.deps.app,
      blog: this.deps.blog,
      monitor: this.getMonitor(),
      getSettings: this.deps.getSettings,
      saveSettings: this.deps.saveSettings,
      createArticle: this.deps.createArticle,
      onChanged: () => {
        void this.render();
      }
    });
    this.section.render(content);
  }
  // ------------------------------------------------------------------
  // Deployment state
  // ------------------------------------------------------------------
  getMonitor() {
    if (!this.monitor) {
      this.monitor = new DeploymentMonitor({
        getSettings: this.deps.getSettings,
        saveSettings: this.deps.saveSettings,
        getBlog: () => this.deps.blog
      });
    }
    return this.monitor;
  }
  scheduleDeploymentPolling() {
    if (this.pollTimer !== void 0) return;
    this.pollTimer = window.setInterval(() => {
      void this.pollDeployment();
    }, DEPLOYMENT_POLL_INTERVAL);
  }
  async pollDeployment() {
    void this.section?.refreshGitStatus();
    const previous = this.getMonitor().getSnapshot().phase;
    const next = await this.getMonitor().refresh();
    if (next.phase !== previous) {
      await this.render();
    }
  }
};

// src/main.ts
var VitePressButterflyPublisher = class extends import_obsidian9.Plugin {
  async onload() {
    await this.loadSettings();
    this.blog = new BlogService({
      app: this.app,
      getSettings: () => this.settings,
      saveSettings: async (changes) => {
        this.settings = { ...this.settings, ...changes };
        await this.saveData(this.settings);
      },
      pluginVersion: this.manifest.version
    });
    this.registerView(
      CONSOLE_VIEW_TYPE,
      (leaf) => new ConsoleView(leaf, {
        app: this.app,
        blog: this.blog,
        getSettings: () => this.settings,
        saveSettings: (changes) => this.updateSettings(changes),
        createArticle: (input) => this.createArticle(input)
      })
    );
    this.addRibbonIcon("rocket", "\u6253\u5F00 VitePress Butterfly \u63A7\u5236\u53F0", () => {
      void this.openConsole();
    });
    this.addCommand({
      id: "open-console",
      name: "\u6253\u5F00\u535A\u5BA2\u63A7\u5236\u53F0",
      callback: () => this.openConsole()
    });
    this.addCommand({
      id: "trigger-deploy",
      name: "\u89E6\u53D1\u535A\u5BA2\u91CD\u5EFA",
      callback: () => this.runWithFeedback("\u89E6\u53D1\u90E8\u7F72", () => this.blog.triggerDeploy())
    });
    this.addCommand({
      id: "new-article",
      name: "\u65B0\u5EFA\u535A\u5BA2\u6587\u7AE0",
      callback: () => {
        new NewArticleModal(this.app, async (input) => {
          await this.createArticle(input);
        }).open();
      }
    });
    this.addCommand({
      id: "configure-site",
      name: "\u914D\u7F6E\u7AD9\u70B9",
      callback: () => {
        new SiteConfigModal(this.app, () => void 0).open();
      }
    });
  }
  async openConsole() {
    const existing = this.app.workspace.getLeavesOfType(CONSOLE_VIEW_TYPE)[0];
    if (existing) {
      await this.app.workspace.revealLeaf(existing);
      return;
    }
    const leaf = this.app.workspace.getRightLeaf(false) ?? this.app.workspace.getLeaf(false);
    await leaf.setViewState({ type: CONSOLE_VIEW_TYPE, active: true });
    await this.app.workspace.revealLeaf(leaf);
  }
  onunload() {
  }
  async loadSettings() {
    const saved = await this.loadData();
    this.settings = {
      ...DEFAULT_SETTINGS,
      pat: saved?.pat ?? "",
      repoName: saved?.repoName ?? "",
      blogRepoName: saved?.blogRepoName ?? "",
      pendingArticleRepo: saved?.pendingArticleRepo ?? "",
      pendingBlogRepo: saved?.pendingBlogRepo ?? "",
      vercelToken: saved?.vercelToken ?? "",
      vercelOrgId: saved?.vercelOrgId ?? "",
      vercelProjectId: saved?.vercelProjectId ?? "",
      githubConnection: saved?.githubConnection ?? null,
      initialization: saved?.initialization ?? null,
      lastDeploy: saved?.lastDeploy ?? null,
      lastGitSyncAt: saved?.lastGitSyncAt ?? null
    };
  }
  async updateSettings(changes) {
    let merged = { ...this.settings, ...changes };
    if (changes.pat !== void 0 && changes.pat.trim() !== this.settings.pat.trim()) {
      this.blog.invalidatePat();
      merged = {
        ...merged,
        githubConnection: null,
        initialization: null,
        lastDeploy: null
      };
    }
    this.settings = merged;
    await this.saveData(this.settings);
  }
  async createArticle(input) {
    const safeTitle = input.title.trim();
    const safeName = sanitizePathSegment(safeTitle);
    if (!safeName) {
      throw new Error("\u65E0\u6CD5\u4ECE\u6807\u9898\u751F\u6210\u6587\u4EF6\u540D\u3002");
    }
    const folder = (input.directory ?? "").split("/").map(sanitizePathSegment).filter((segment) => segment && segment !== "." && segment !== "..").join("/");
    const path = folder ? `${folder}/${safeName}.md` : `${safeName}.md`;
    if (this.app.vault.getFileByPath(path)) {
      throw new Error(`\u6587\u4EF6\u5DF2\u5B58\u5728\uFF1A${path}`);
    }
    const lines = [
      "---",
      `title: ${JSON.stringify(safeTitle)}`,
      `date: ${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`,
      "layout: doc"
    ];
    const author = input.author?.trim();
    if (author) lines.push(`author: ${JSON.stringify(author)}`);
    const cover = input.cover?.trim();
    if (cover) lines.push(`cover: ${JSON.stringify(cover)}`);
    if (input.tags?.length) {
      lines.push("tags:");
      for (const tag of input.tags) {
        lines.push(`  - ${JSON.stringify(tag)}`);
      }
    }
    const description = input.description?.trim();
    if (description) lines.push(`description: ${JSON.stringify(description)}`);
    lines.push("---", "", `# ${safeTitle}`, "");
    if (folder) {
      await this.app.vault.createFolder(folder).catch(() => void 0);
    }
    const file = await this.app.vault.create(path, lines.join("\n"));
    this.app.workspace.getLeaf(false).openFile(file);
  }
  async runWithFeedback(name, action) {
    try {
      await action();
    } catch (error) {
      new import_obsidian9.Notice(`${name}\u5931\u8D25\uFF1A${error instanceof Error ? error.message : String(error)}`);
    }
  }
};
function sanitizePathSegment(value) {
  return value.trim().replace(/[\\/:*?"<>|#^[\]]/g, "-").replace(/\s+/g, "-").replace(/^-+|-+$/g, "");
}
