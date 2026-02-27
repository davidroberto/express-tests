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
Object.defineProperty(exports, "__esModule", { value: true });
var globals_1 = require("@jest/globals");
var createProductUseCase_1 = require("../createProductUseCase");
var CreateProductDummyRepository = /** @class */ (function () {
    function CreateProductDummyRepository() {
    }
    CreateProductDummyRepository.prototype.save = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return CreateProductDummyRepository;
}());
var CreateProductMockFailRepository = /** @class */ (function () {
    function CreateProductMockFailRepository() {
    }
    CreateProductMockFailRepository.prototype.save = function (product) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error('fail gtredeapkdzepnip ');
            });
        });
    };
    return CreateProductMockFailRepository;
}());
(0, globals_1.describe)('US-1 : Créer un produit', function () {
    (0, globals_1.test)('Scénario 1 : création réussie', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createProductRepository, createProductUseCase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createProductRepository = new CreateProductDummyRepository();
                    createProductUseCase = new createProductUseCase_1.CreateProductUseCase(createProductRepository);
                    return [4 /*yield*/, (0, globals_1.expect)(
                        // Quand je créé un produit avec en titre «switch 2», description «nouvelle console» et un prix à 500
                        createProductUseCase.execute({
                            title: 'switch 2',
                            description: 'nouvelle console',
                            price: 500
                        })
                        // Alors le produit doit être créé
                        ).resolves.not.toThrow()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)('Scénario 2 : echec, titre trop court', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createProductRepository, createProductUseCase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createProductRepository = new CreateProductDummyRepository();
                    createProductUseCase = new createProductUseCase_1.CreateProductUseCase(createProductRepository);
                    return [4 /*yield*/, (0, globals_1.expect)(
                        // Quand je créé un produit avec en titre «sw»
                        createProductUseCase.execute({
                            title: 'sw',
                            description: 'nouvelle console',
                            price: 500
                        })
                        // Alors une erreur doit être envoyée "titre trop court»
                        ).rejects.toThrow('titre trop court')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)('Scénario 3 : echec, prix négatif', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createProductRepository, createProductUseCase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createProductRepository = new CreateProductDummyRepository();
                    createProductUseCase = new createProductUseCase_1.CreateProductUseCase(createProductRepository);
                    return [4 /*yield*/, (0, globals_1.expect)(
                        // Quand je créé un produit avec en prix -10
                        createProductUseCase.execute({
                            title: 'switch 2',
                            description: 'nouvelle console',
                            price: -10
                        })
                        // Alors une erreur doit être envoyée "le prix doit être supérieur à 0»
                        ).rejects.toThrow('le prix doit être supérieur à 0')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    (0, globals_1.test)('Scénario 4 : création échouée, prix supérieur à 10000', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createProductRepository, createProductUseCase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createProductRepository = new CreateProductDummyRepository();
                    createProductUseCase = new createProductUseCase_1.CreateProductUseCase(createProductRepository);
                    return [4 /*yield*/, (0, globals_1.expect)(
                        // Quand je créé un produit avec en prix 11000
                        createProductUseCase.execute({
                            title: 'switch 2',
                            description: 'nouvelle console',
                            price: 11000
                        })
                        // Alors une erreur doit être envoyée "le prix doit être inférieur à 10000»
                        ).rejects.toThrow('le prix doit être inférieur à 10000')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    //    - Exemple 5/ Scénario 5 : création échouée, échec de sauvegarde non prévue
    //       - Étant donné qu'il n'y a pas de produit enregistré
    //       - Quand je créé un produit, si la sauvegarde échoue
    //       - Alors une erreur doit être envoyée «erreur lors de la création du produit»
    (0, globals_1.test)('Scénario 5 : création échouée, échec de sauvegarde non prévue', function () { return __awaiter(void 0, void 0, void 0, function () {
        var createProductRepository, createProductUseCase;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    createProductRepository = new CreateProductMockFailRepository();
                    createProductUseCase = new createProductUseCase_1.CreateProductUseCase(createProductRepository);
                    return [4 /*yield*/, (0, globals_1.expect)(
                        // Quand je créé un produit
                        createProductUseCase.execute({
                            title: 'switch 2',
                            description: 'nouvelle console',
                            price: 500
                        })
                        // Alors une erreur doit être envoyée «erreur lors de la création du produit»
                        ).rejects.toThrow('erreur lors de la création du produit')];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
});
