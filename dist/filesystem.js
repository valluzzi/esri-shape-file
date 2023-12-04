"use strict";

/**
 * normpath
 */
function normpath(pathname) {
  if (!pathname) return "";
  return pathname.replace(/\\/gi, "/").replace(/\/\//gi, "/").replace(/\/\.\//gi, "/").replace(/http:\//gi, "http://").replace(/https:\//gi, "https://");
}

/**
 * juststem
 */
function juststem(pathname) {
  var fname = justfname(pathname);
  var arr = fname.indexOf(".") >= 0 ? fname.split(".") : [fname, ""];
  return arr.slice(0, arr.length - 1).join(".");
}

/**
 *  justfname
 */
function justfname(filename) {
  return ("" + filename).replace(/\\/g, '/').replace(/.*\//, '');
}

/**
 * justpath
 */
function justpath(pathname) {
  var arr = normpath(pathname).split("/");
  return arr.slice(0, arr.length - 1).join("/");
}

/**
 *  justext
 */
function justext(filename) {
  if (!filename) return "";
  //return (""+filename).substr((~-filename.lastIndexOf(".") >>> 0) + 2);
  return ("" + filename).replace(/\\/g, '/').replace(/.*\./, '');
}

/**
 *  justdomain
 */
function justdomain(filename) {
  if (!filename) return "";
  var regex = /(?:^https?:\/\/([^/]+)(?:[/,]|$)|^(.*)$)/g;
  var found = filename.match(regex);
  return found.length ? found[0] : "";
}
/**
 *  forceext
 */
function forceext(filename, ext) {
  filename = !filename ? "" : filename;
  if (justext(filename) === "") return filename + "." + ext;
  var re = /(?:\.([^.]+))?$/;
  return filename.replace(re, ext ? "." + ext : "");
}
module.exports = {
  normpath: normpath,
  juststem: juststem,
  justfname: justfname,
  justpath: justpath,
  justext: justext,
  justdomain: justdomain,
  forceext: forceext
};