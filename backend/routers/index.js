import express from "express";
import Auth from "../middleware/auth";
import UserController from "../controllers/UserController";
import ContractorController from "../controllers/ContractorController";
import SupplierController from "../controllers/SupplierController";

const userController = new UserController();
const contractorController = new ContractorController();
const supplierController = new SupplierController();
const router = express.Router();

router.post('/users', userController.register);

router.post('/users/login', userController.login);

router.get('/users/me', Auth, userController.me);

router.post('/users/me/logout', Auth, userController.logout);

router.post('/contractors/requests', Auth, contractorController.placeRequest);

router.get('/contractors/me/requests', Auth, contractorController.getMyRequests);

router.get('/contractors/requests', Auth, contractorController.getAllRequests);

router.post('/suppliers/bidding/requests/:id', Auth, supplierController.bidOnRequest);

export default router
