const express = require("express");
const router = express.Router();
const { getAllBeers, createBeer, deleteBeer, editBeer, findBeer} = require("../controllers/beerController")
router.get("/beers", getAllBeers);
router.post("/create", createBeer);
router.delete("/delete/:id", deleteBeer);    
router.patch("/edit/:id", editBeer);
router.get("/find/:id", findBeer);

module.exports = router;