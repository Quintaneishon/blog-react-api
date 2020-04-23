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
Object.defineProperty(exports, "__esModule", { value: true });
var sql = require("mssql");
function connect() {
    return __awaiter(this, void 0, void 0, function* () {
        var config = {
            user: 'test123',
            password: 'test',
            server: 'localhost',
            database: 'node_db'
        };
        yield sql.connect(config, function (err) {
            if (err)
                console.log(err);
        });
        var request = new sql.Request();
        return request;
    });
}
exports.connect = connect;
