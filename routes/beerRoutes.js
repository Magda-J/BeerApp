const express = require("express");
const router = express.Router();
const { getAllBeers, createBeer, deleteBeer, editBeer, findBeer} = require("../controllers/beerController")
router.get("/beers", getAllBeers);
router.post("/create", createBeer);
router.delete("/delete/:id", deleteBeer);    
router.patch("/edit/:id", editBeer);
router.get("/find/:query?", findBeer);
// router.get("/find/name/:name", findBeer);
// router.get("/find/beer/:beer", findBeer);

module.exports = router;