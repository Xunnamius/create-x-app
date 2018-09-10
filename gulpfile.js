import _regeneratorRuntime from "@babel/runtime/regenerator";

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// ! Be sure that tasks expected to run on npm install (marked @dependent) have
// ! all required packages listed under "dependencies" instead of
// ! "devDependencies" in this project's package.json
import { readFile } from 'fs';
import { promisify } from 'util';
import gulp from 'gulp';
import tap from 'gulp-tap';
import del from 'del';
import log from 'fancy-log';
import parseGitIgnore from 'parse-gitignore';
import { transformFileSync as babel } from '@babel/core';
var paths = {};
var readFileAsync = promisify(readFile);
paths.flowTypedGitIgnore = 'flow-typed/.gitignore';
paths.configs = 'config';
paths.regenTargets = ["".concat(paths.configs, "/next.config.js"), "".concat(paths.configs, "/gulpfile.js")];
var CLI_BANNER = "/**\n * !!! DO NOT EDIT THIS FILE DIRECTLY !!!\n * ! This file has been generated automatically. See the *.babel.js version of\n * ! this file to make permanent modifications\n */\n\n";

var regenerate = function regenerate() {
  log("Regenerating target configurations");
  process.env.BABEL_ENV = 'generator';
  return gulp.src(paths.regenTargets).pipe(tap(function (file) {
    return file.contents = Buffer.from(babel("".concat(CLI_BANNER).concat(file.contents.toString())));
  })).pipe(gulp.dest('.'));
};

regenerate.description = 'Invokes babel on the files in config, transpiling them into their project root versions';
export { regenerate }; // ! @dependent

var cleanTypes = function cleanTypes() {
  // eslint-disable-line camelcase
  return _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var targets;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = parseGitIgnore;
            _context.next = 3;
            return readFileAsync(paths.flowTypedGitIgnore);

          case 3:
            _context.t1 = _context.sent;
            targets = (0, _context.t0)(_context.t1);
            log("Deletion schedule: ".concat(targets.join('  ')));
            del(targets);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }))();
};

cleanTypes.description = 'Resets the flow-types/ directory to a pristine state';
gulp.task('clean-types', cleanTypes);