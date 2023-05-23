'use strict';
var __awaiter = this && this.__awaiter || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
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
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = this && this.__importDefault || function (mod) {
    return mod && mod.__esModule ? mod : { 'default': mod };
};
Object.defineProperty(exports, '__esModule', { value: true });
exports.deleteAccount = exports.cleanAccount = exports.logout = exports.updateUser = exports.updatePhoto = exports.loginUser = exports.createUser = exports._getAllUsers = void 0;
const DataUser_1 = require('..\\entitys\\DataUser');
const Semanas_1 = require('..\\entitys\\Semanas');
const User_1 = require('..\\entitys\\User');
const bcrypt_1 = __importDefault(require('bcrypt'));
const jsonwebtoken_1 = __importDefault(require('jsonwebtoken'));
const config_1 = require('..\\config\\config');
const helpers_1 = require('..\\utils\\helpers');
const helpers_2 = require('..\\utils\\types\\helpers');
const _getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.find({
            relations: {
                dataUser: true,
                semanas: { days: { diarios: true } },
                frecuentes: true,
                ingresos: true
            }
        });
        return res.send(users);
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error interno ' });
    }
});
exports._getAllUsers = _getAllUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const {correo, contrasena, nombre, contrasenaConfirmada} = req.body;
        console.log('req.body ->', {
            correo,
            contrasena,
            nombre,
            contrasenaConfirmada
        });
        if (!correo || !contrasena || !nombre || !contrasenaConfirmada) {
            return res.status(400).json({ message: 'Faltan datos' });
        }
        if (contrasena.length > 32 || correo.length < 8) {
            return res.status(400).json({ message: 'Datos inválidos' });
        }
        if (!correo.includes('@') || !correo.includes('.') || correo.length > 50) {
            return res.status(400).json({ message: 'Correo inválido' });
        }
        if (nombre.length > 70 || nombre.length < 3) {
            return res.status(400).json({ message: 'Nombre inválido' });
        }
        if (contrasena != contrasenaConfirmada) {
            return res.status(400).json({ message: 'Las contrasenas deben coincidir' });
        }
        // if (!req.file) {
        //   return res.status(400).json({ message: 'No hay archivo' })
        // }
        // const { filename } = req.file
        const filename = 'default.png';
        const encryptedPassword = yield bcrypt_1.default.hash(contrasena, 10);
        const dataUser = DataUser_1.DataUser.create({
            datName: nombre,
            datPhoto: filename
        });
        yield dataUser.save();
        const user = User_1.User.create({
            usuEmail: correo,
            usuPassword: encryptedPassword,
            dataUser: dataUser
        });
        yield user.save();
        const token = jsonwebtoken_1.default.sign(Object.assign({}, user), config_1.SECRET);
        return res.send({
            message: 'Usuario creado correctamente',
            user,
            token
        });
    } catch (error) {
        console.log('error ->', error);
        if ((0, helpers_2.queryFailedGuard)(error)) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'El correo ya está en uso' });
            }
            return res.status(400).json({ message: 'Datos inválidos' });
        }
        return res.status(500).send({ message: 'Error interno ' });
    }
});
exports.createUser = createUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const {correo, contraseña} = req.body;
        if (!correo || !contraseña) {
            return res.status(400).json({ message: 'Faltan datos' });
        }
        if (contraseña.length > 32 || correo.length < 8) {
            return res.status(400).json({ message: 'Datos inválidos' });
        }
        if (!correo.includes('@') || !correo.includes('.') || correo.length > 50) {
            return res.status(400).json({ message: 'Correo inválido' });
        }
        const user = yield User_1.User.findOne({
            where: { usuEmail: correo },
            relations: { dataUser: true }
        });
        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }
        const match = yield bcrypt_1.default.compare(contraseña, user.usuPassword);
        if (!match) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }
        const token = jsonwebtoken_1.default.sign(Object.assign({}, user), config_1.SECRET);
        return res.send({
            message: 'Usuario logueado correctamente',
            user,
            token
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error interno ' });
    }
});
exports.loginUser = loginUser;
const updatePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No hay archivo' });
        }
        const {filename} = req.file;
        const token = req.get('token');
        if (!token) {
            (0, helpers_1.delFile)(filename);
            return res.status(400).json({ message: 'No hay sesión iniciada' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decoded.usuId) {
            (0, helpers_1.delFile)(filename);
            return res.status(400).json({ message: 'Sesión invalida' });
        }
        const userUpdated = yield User_1.User.findOne({
            where: { usuId: decoded.usuId },
            relations: { dataUser: true }
        });
        if (!userUpdated) {
            (0, helpers_1.delFile)(filename);
            return res.status(400).json({ message: 'Sesión invalida' });
        }
        (0, helpers_1.delFile)(userUpdated.dataUser.datPhoto);
        userUpdated.dataUser.datPhoto = filename;
        yield userUpdated.dataUser.save();
        return res.send({
            message: 'Foto actualizada correctamente',
            filename
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error interno ' });
    }
});
exports.updatePhoto = updatePhoto;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const {name, newPassword, newPasswordConfirmed, email} = req.body;
        if (!name || !newPassword || !newPasswordConfirmed) {
            return res.status(400).json({ message: 'Faltan datos (name)' });
        }
        if (newPassword !== newPasswordConfirmed) {
            return res.status(400).json({ message: 'Las contraseñas no coinciden' });
        }
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'No hay sesión iniciada' });
        }
        const decodedUser = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decodedUser.usuId) {
            return res.status(400).json({ message: 'Sesión invalida' });
        }
        const newPasswordHashed = yield bcrypt_1.default.hash(newPassword, 10);
        const updated = yield DataUser_1.DataUser.update({ datId: decodedUser.dataUser.datId }, { datName: name });
        const updated2 = yield User_1.User.update({ usuId: decodedUser.usuId }, Object.assign({ usuPassword: newPasswordHashed }, email ? { usuEmail: email } : {}));
        const newUser = yield User_1.User.findOne({
            where: { usuId: decodedUser.usuId },
            relations: { dataUser: true }
        });
        console.log({
            updated,
            updated2
        });
        return res.send({
            message: 'Usuario actualizado correctamente',
            user: newUser
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: 'Error interno' });
    }
});
exports.updateUser = updateUser;
const logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.get('token')) {
            return res.status(400).json({ message: 'No hay sesión iniciada' });
        }
        res.clearCookie('token');
        return res.status(200).json({ message: 'Sesión cerrada' });
    } catch (e) {
        return res.status(400).json({
            message: 'Error al cerrar sesión',
            e
        });
    }
});
exports.logout = logout;
const cleanAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'No hay sesión iniciada' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decoded.usuId) {
            return res.status(400).json({ message: 'Sesión invalida' });
        }
        const semanas = yield Semanas_1.Semanas.find({ where: { user: { usuId: decoded.usuId } } });
        if (!semanas) {
            return res.status(400).json({ message: 'Sesión invalida' });
        }
        yield Semanas_1.Semanas.remove(semanas);
        return res.status(200).json({ message: 'Cuenta vaciada' });
    } catch (e) {
        return res.status(400).json({
            message: 'Error al vaciar la cuenta',
            e
        });
    }
});
exports.cleanAccount = cleanAccount;
const deleteAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const {password} = req.body;
        console.log({ password });
        if (!password) {
            return res.status(400).json({ message: 'Faltan datos' });
        }
        const token = req.get('token');
        if (!token) {
            return res.status(400).json({ message: 'No hay sesión iniciada' });
        }
        const decoded = jsonwebtoken_1.default.verify(token, config_1.SECRET);
        if (!decoded.usuId) {
            return res.status(400).json({ message: 'Sesión invalida' });
        }
        console.log({ usuId: decoded.usuId });
        const user = yield DataUser_1.DataUser.findOne({
            where: { user: { dataUser: { user: { usuId: decoded.usuId } } } },
            relations: { user: true }
        });
        if (!user) {
            return res.status(400).json({ message: 'Sesión invalida' });
        }
        const match = yield bcrypt_1.default.compare(password, user.user.usuPassword);
        if (!match) {
            return res.status(400).json({ message: 'Contraseña incorrecta' });
        }
        (0, helpers_1.delFile)(user.datPhoto || '');
        yield user.remove();
        return res.status(200).json({ message: 'Cuenta eliminada' });
    } catch (e) {
        console.log(e);
        return res.status(400).json({
            message: 'Error al eliminar la cuenta',
            e
        });
    }
});
exports.deleteAccount = deleteAccount;