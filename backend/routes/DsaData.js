import { Router } from "express";
import { getDsaList, updateDataDsaList } from "../controller/DSAData.js";

const routes = Router();

routes.get("/getData", getDsaList);
routes.put("/updateData", updateDataDsaList);

export default routes;
