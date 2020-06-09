"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOne = exports.updateOne = exports.getById = exports.getAllTravelers = exports.createNewTraveler = void 0;
const models_1 = require("../database/models");
const travelerNotifier_1 = __importDefault(require("../notify/travelerNotifier"));
const createOrUpdateTraveler_1 = __importDefault(require("../useCase/createOrUpdateTraveler"));
const twilio_controller_1 = require("../twilio/twilio.controller");
exports.createNewTraveler = (req, res, next) => {
    const travelerDetails = req.body;
    const travelerNotifier = new travelerNotifier_1.default();
    createOrUpdateTraveler_1.default({
        repository: models_1.Repository,
        travelerDetails,
        callbacks: {
            onSuccess: (traveler) => {
                return traveler;
            }
        },
        travelerNotifier
    })
        .then((traveler) => {
        return twilio_controller_1.notifyAdminOfNewTravelerSignUp(traveler);
    })
        .then((traveler) => {
        return res.status(201).json(traveler);
    })
        .catch(next);
};
function getAllTravelers(req, res, next) {
    return models_1.Traveler.orderByArrival()
        .then(allTravelers => {
        res.status(200).json(allTravelers);
    })
        .catch(next);
}
exports.getAllTravelers = getAllTravelers;
function getById(req, res, next) {
    return models_1.Traveler.findById(req.params.id, { include: [{ all: true }] })
        .then(traveler => {
        res.status(200).json(traveler);
    })
        .catch(next);
}
exports.getById = getById;
function updateOne(req, res, next) {
    const travelerDetails = req.body;
    travelerDetails.id = req.params.id;
    travelerDetails.connectivity = (travelerDetails.connectivity == 'true');
    travelerDetails.requireInterpreter = (travelerDetails.requireInterpreter == 'true');
    createOrUpdateTraveler_1.default({
        repository: models_1.Repository,
        travelerDetails,
        callbacks: {
            onSuccess: (traveler) => {
                res.status(201).json(traveler);
            }
        }
    })
        .catch(next);
}
exports.updateOne = updateOne;
function deleteOne(req, res, next) {
    return models_1.Traveler.destroy({ where: { id: req.params.id } })
        .then(() => {
        res.sendStatus(204);
    })
        .catch(next);
}
exports.deleteOne = deleteOne;
//# sourceMappingURL=traveler.controller.js.map