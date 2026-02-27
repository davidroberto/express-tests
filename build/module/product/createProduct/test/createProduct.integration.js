"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var postgresql_1 = require("@testcontainers/postgresql");
var typeorm_1 = require("typeorm");
var Product_1 = require("../../Product");
var createProductTypeOrmRepository_1 = require("../createProductTypeOrmRepository");
var db_config_1 = __importDefault(require("../../../../config/db.config"));
(0, globals_1.describe)('CreateProductTypeOrmRepository - Integration', function () {
    var container;
    var dataSource;
    (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new postgresql_1.PostgreSqlContainer('postgres:16')
                        .withExposedPorts(5432)
                        .start()];
                case 1:
                    container = _a.sent();
                    dataSource = new typeorm_1.DataSource({
                        type: 'postgres',
                        host: container.getHost(),
                        port: container.getPort(),
                        username: container.getUsername(),
                        password: container.getPassword(),
                        database: container.getDatabase(),
                        logging: false,
                        entities: [Product_1.Product],
                        synchronize: true,
                        entitySkipConstructor: true,
                    });
                    return [4 /*yield*/, dataSource.initialize()];
                case 2:
                    _a.sent();
                    Object.assign(db_config_1.default, dataSource);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.afterAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(dataSource === null || dataSource === void 0 ? void 0 : dataSource.isInitialized)) return [3 /*break*/, 2];
                    return [4 /*yield*/, dataSource.destroy()];
                case 1:
                    _a.sent();
                    _a.label = 2;
                case 2:
                    if (!container) return [3 /*break*/, 4];
                    return [4 /*yield*/, container.stop()];
                case 3:
                    _a.sent();
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)('devrait sauvegarder un produit en base de données', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repository, product, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repository = new createProductTypeOrmRepository_1.CreateProductTypeOrmRepository();
                    product = new Product_1.Product({
                        title: 'switch 2',
                        description: 'nouvelle console',
                        price: 500,
                    });
                    return [4 /*yield*/, repository.save(product)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, dataSource.getRepository(Product_1.Product).find()];
                case 2:
                    products = _a.sent();
                    (0, globals_1.expect)(products).toHaveLength(1);
                    (0, globals_1.expect)(products[0].title).toBe('switch 2');
                    (0, globals_1.expect)(products[0].description).toBe('nouvelle console');
                    (0, globals_1.expect)(products[0].price).toBe(500);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)('devrait sauvegarder plusieurs produits en base de données', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repository, product1, product2, products;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, dataSource.getRepository(Product_1.Product).clear()];
                case 1:
                    _a.sent();
                    repository = new createProductTypeOrmRepository_1.CreateProductTypeOrmRepository();
                    product1 = new Product_1.Product({
                        title: 'switch 2',
                        description: 'nouvelle console',
                        price: 500,
                    });
                    product2 = new Product_1.Product({
                        title: 'playstation 6',
                        description: 'console next gen',
                        price: 700,
                    });
                    return [4 /*yield*/, repository.save(product1)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, repository.save(product2)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, dataSource.getRepository(Product_1.Product).find()];
                case 4:
                    products = _a.sent();
                    (0, globals_1.expect)(products).toHaveLength(2);
                    return [2 /*return*/];
            }
        });
    }); });
});
