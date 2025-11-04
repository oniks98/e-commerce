'use strict';
/**
 * Script to upload all category images to Cloudinary
 * Run with: node scripts/upload-category-images.js
 */
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === 'function' ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g['throw'] = verb(1)),
      (g['return'] = verb(2)),
      typeof Symbol === 'function' &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError('Generator is already executing.');
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y['return']
                  : op[0]
                    ? y['throw'] || ((t = y['return']) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, '__esModule', { value: true });
var fs = require('fs');
var path = require('path');
var url_1 = require('url');

var cloudinary_1 = require('cloudinary');
var __filename = (0, url_1.fileURLToPath)(import.meta.url);
var __dirname = path.dirname(__filename);
// Configure Cloudinary (add your credentials)
cloudinary_1.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
var CATEGORIES_PATH = path.join(
  __dirname,
  '..',
  'public',
  'images',
  'categories',
);
var CLOUDINARY_FOLDER = 'e-commerce/categories';
function uploadImage(filePath, slug) {
  return __awaiter(this, void 0, void 0, function () {
    var result, error_1;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          _a.trys.push([0, 2, , 3]);
          return [
            4 /*yield*/,
            cloudinary_1.v2.uploader.upload(filePath, {
              folder: CLOUDINARY_FOLDER,
              public_id: slug,
              overwrite: true,
            }),
          ];
        case 1:
          result = _a.sent();
          console.log('\u2705 Uploaded: '.concat(slug));
          return [
            2 /*return*/,
            {
              slug: slug,
              url: result.secure_url,
              success: true,
            },
          ];
        case 2:
          error_1 = _a.sent();
          console.error('\u274C Failed to upload '.concat(slug, ':'), error_1);
          return [
            2 /*return*/,
            {
              slug: slug,
              url: null,
              success: false,
            },
          ];
        case 3:
          return [2 /*return*/];
      }
    });
  });
}
function main() {
  return __awaiter(this, void 0, void 0, function () {
    var files,
      imageFiles,
      results,
      _i,
      imageFiles_1,
      file,
      filePath,
      slug,
      result;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          console.log('🚀 Starting category images upload to Cloudinary...\n');
          files = fs.readdirSync(CATEGORIES_PATH);
          imageFiles = files.filter(function (file) {
            return file.endsWith('.png');
          });
          console.log(
            '\uD83D\uDCC1 Found '.concat(
              imageFiles.length,
              ' images to upload\n',
            ),
          );
          results = [];
          ((_i = 0), (imageFiles_1 = imageFiles));
          _a.label = 1;
        case 1:
          if (!(_i < imageFiles_1.length)) return [3 /*break*/, 5];
          file = imageFiles_1[_i];
          filePath = path.join(CATEGORIES_PATH, file);
          slug = file.replace('.png', '');
          return [4 /*yield*/, uploadImage(filePath, slug)];
        case 2:
          result = _a.sent();
          results.push(result);
          // Add a small delay to avoid rate limiting
          return [
            4 /*yield*/,
            new Promise(function (resolve) {
              return setTimeout(resolve, 500);
            }),
          ];
        case 3:
          // Add a small delay to avoid rate limiting
          _a.sent();
          _a.label = 4;
        case 4:
          _i++;
          return [3 /*break*/, 1];
        case 5:
          console.log('\n📊 Upload Summary:');
          console.log('Total: '.concat(results.length));
          console.log(
            'Success: '.concat(
              results.filter(function (r) {
                return r.success;
              }).length,
            ),
          );
          console.log(
            'Failed: '.concat(
              results.filter(function (r) {
                return !r.success;
              }).length,
            ),
          );
          // Generate SQL update statements
          console.log('\n📝 SQL Update Statements:\n');
          results
            .filter(function (r) {
              return r.success && r.url;
            })
            .forEach(function (r) {
              console.log(
                "UPDATE categories SET image_url = '"
                  .concat(r.url, "' WHERE slug = '")
                  .concat(r.slug, "';"),
              );
            });
          return [2 /*return*/];
      }
    });
  });
}
main().catch(console.error);
