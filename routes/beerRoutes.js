const express = require("express");
const router = express.Router();
const { getAllBeers, createBeer, deleteBeer, editBeer, findBeer} = require("../controllers/beerController")
router.get("/beers", getAllBeers);
router.post("/create", createBeer);
router.delete("/delete/:id", deleteBeer);    
router.patch("/edit/:id", editBeer);
router.get("/find/id/:id", findBeer);
router.get("/find/name/:name", findBeer);
router.get("/find/origin/:origin", findBeer);
router.get("/find/rating/:rating", findBeer);
router.get("/find/alcohol/:alcohol", findBeer);
router.get("/find/type/:type", findBeer);

module.exports = router;