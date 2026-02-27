"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var postgresql_1 = require("@testcontainers/postgresql");
var typeorm_1 = require("typeorm");
var typeorm_2 = require("typeorm");
var Product_1 = require("../Product");
// Entité V2 simulant l'évolution du schéma : ajout de la colonne "category"
var ProductV2 = /** @class */ (function () {
    function ProductV2() {
    }
    __decorate([
        (0, typeorm_2.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], ProductV2.prototype, "id", void 0);
    __decorate([
        (0, typeorm_2.Column)({ nullable: true, type: 'float' }),
        __metadata("design:type", Number)
    ], ProductV2.prototype, "price", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: 'varchar', length: 255 }),
        __metadata("design:type", String)
    ], ProductV2.prototype, "title", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: 'text', nullable: true }),
        __metadata("design:type", String)
    ], ProductV2.prototype, "description", void 0);
    __decorate([
        (0, typeorm_2.Column)({ type: 'varchar', length: 255, nullable: true, default: 'uncategorized' }),
        __metadata("design:type", String)
    ], ProductV2.prototype, "category", void 0);
    ProductV2 = __decorate([
        (0, typeorm_2.Entity)()
    ], ProductV2);
    return ProductV2;
}());
(0, globals_1.describe)('Migration de données - Ajout colonne category sur Product', function () {
    var container;
    var migratedDataSource;
    (0, globals_1.beforeAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
        var connectionOptions, initialDataSource;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, new postgresql_1.PostgreSqlContainer('postgres:16')
                        .withExposedPorts(5432)
                        .start()];
                case 1:
                    container = _a.sent();
                    connectionOptions = {
                        type: 'postgres',
                        host: container.getHost(),
                        port: container.getPort(),
                        username: container.getUsername(),
                        password: container.getPassword(),
                        database: container.getDatabase(),
                        logging: false,
                        entitySkipConstructor: true,
                    };
                    initialDataSource = new typeorm_1.DataSource(__assign(__assign({}, connectionOptions), { entities: [Product_1.Product], synchronize: true }));
                    return [4 /*yield*/, initialDataSource.initialize()];
                case 2:
                    _a.sent();
                    // Étape 2 : insérer des données avec l'ancien schéma
                    return [4 /*yield*/, initialDataSource.query("INSERT INTO product (title, description, price) VALUES ($1, $2, $3)", ['switch 2', 'nouvelle console', 500])];
                case 3:
                    // Étape 2 : insérer des données avec l'ancien schéma
                    _a.sent();
                    return [4 /*yield*/, initialDataSource.query("INSERT INTO product (title, description, price) VALUES ($1, $2, $3)", ['playstation 6', 'console next gen', 700])];
                case 4:
                    _a.sent();
                    // Étape 3 : fermer la connexion initiale
                    return [4 /*yield*/, initialDataSource.destroy()];
                case 5:
                    // Étape 3 : fermer la connexion initiale
                    _a.sent();
                    // Étape 4 : ouvrir une nouvelle connexion avec l'entité V2 (migration)
                    migratedDataSource = new typeorm_1.DataSource(__assign(__assign({}, connectionOptions), { entities: [ProductV2], synchronize: true }));
                    return [4 /*yield*/, migratedDataSource.initialize()];
                case 6:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.afterAll)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(migratedDataSource === null || migratedDataSource === void 0 ? void 0 : migratedDataSource.isInitialized)) return [3 /*break*/, 2];
                    return [4 /*yield*/, migratedDataSource.destroy()];
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
    (0, globals_1.test)('les données existantes survivent à la migration', function () { return __awaiter(void 0, void 0, void 0, function () {
        var products;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0: return [4 /*yield*/, migratedDataSource.getRepository(ProductV2).find()];
                case 1:
                    products = _c.sent();
                    (0, globals_1.expect)(products).toHaveLength(2);
                    (0, globals_1.expect)((_a = products.find(function (p) { return p.title === 'switch 2'; })) === null || _a === void 0 ? void 0 : _a.price).toBe(500);
                    (0, globals_1.expect)((_b = products.find(function (p) { return p.title === 'playstation 6'; })) === null || _b === void 0 ? void 0 : _b.price).toBe(700);
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)('la nouvelle colonne a la valeur par défaut pour les anciens produits', function () { return __awaiter(void 0, void 0, void 0, function () {
        var products, _i, products_1, product;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, migratedDataSource.getRepository(ProductV2).find()];
                case 1:
                    products = _a.sent();
                    for (_i = 0, products_1 = products; _i < products_1.length; _i++) {
                        product = products_1[_i];
                        (0, globals_1.expect)(product.category).toBe('uncategorized');
                    }
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)('un nouveau produit peut être créé avec une category', function () { return __awaiter(void 0, void 0, void 0, function () {
        var repo, newProduct, saved;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    repo = migratedDataSource.getRepository(ProductV2);
                    newProduct = repo.create({
                        title: 'xbox series x',
                        description: 'console microsoft',
                        price: 600,
                        category: 'gaming',
                    });
                    return [4 /*yield*/, repo.save(newProduct)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, repo.findOneBy({ title: 'xbox series x' })];
                case 2:
                    saved = _a.sent();
                    (0, globals_1.expect)(saved).not.toBeNull();
                    (0, globals_1.expect)(saved.category).toBe('gaming');
                    (0, globals_1.expect)(saved.price).toBe(600);
                    return [2 /*return*/];
            }
        });
    }); });
});
