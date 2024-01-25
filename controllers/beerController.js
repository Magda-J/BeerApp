const createError = require('http-errors')
const uuid = require('uuid');
const beers = []
require('dotenv').config()

const jokeAPIKEY = process.env.JOKES_KEY;
console.log(jokeAPIKEY)

// code for database
const Beer = require("../models/beer")
// code for database




//API code
const axios = require('axios');

const options = {
  method: 'GET',
  url: 'https://random-words5.p.rapidapi.com/getMultipleRandom',
  params: { count: '5' },
  headers: {
    'X-RapidAPI-Key': jokeAPIKEY,
    'X-RapidAPI-Host': 'random-words5.p.rapidapi.com'
  }
};

async function getRandomWords() {
  try {
    const response = await axios.request(options);
    
    // Assuming the response is an array of words
    const words = response.data;

    // Access each word in the array
    // words.forEach((word, index) => {
    //   console.log(`Word ${index + 1}: ${word}`);
    // });

    return words;
  } catch (error) {
    throw error;
  }
}

// Call the function
getRandomWords();


//End of API code


exports.getAllBeers = async function (req, res) {
  try {
    const beerItems = await Beer.find();
    res.send(beerItems);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

exports.createBeer = async function (req, res, next) {
  try {
    if (!req.body.name || !req.body.type || !req.body.alcohol || !req.body.origin || !req.body.rating) {
      return next(createError(400, "All fields required"));
    }

     // Get random words
     const words = await getRandomWords();

     // Use the first word as a property for the new beer
     const randomWord = words[0];
     

    const beerItem = new Beer({
      name: req.body.name,
      type: req.body.type,
      origin: req.body.origin,
      alcohol: req.body.alcohol,
      rating: req.body.rating,
      description: randomWord
    });

  
    await beerItem.save();

    res.send(beerItem);
  } catch (err) {
    return next(createError(500, err.message));
  }
};

exports.deleteBeer = async function (req, res, next) {
  try {
    const beerItemToDelete = await Beer.findByIdAndDelete(req.params.id);
    if (!beerItemToDelete) {
      return next(createError(404, "No beer with that id."));
    }
    res.send({ result: true });
  } catch (err) {
    return next(createError(500, err.message));
  }
};


exports.editBeer = async function (req, res, next) {
  try {
    const updatedBeerItem = await Beer.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedBeerItem) {
      return next(createError(404, "No beer with that id"));
    }

    res.send({ result: true, updatedBeerItem });
  } catch (err) {
    return next(createError(500, err.message));
  }
};


exports.findBeer = async function (req, res, next) {
  try {
    const searchTerm = req.params.query.toLowerCase();
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(searchTerm);

    const query = {
      $or: [
        isObjectId ? { _id: searchTerm } : null,
        { name: { $regex: new RegExp(searchTerm, 'i') } },
        { type: { $regex: new RegExp(searchTerm, 'i') } },
        { alcohol: { $regex: new RegExp(searchTerm, 'i') } },
        { rating: { $regex: new RegExp(searchTerm, 'i') } },
        { origin: { $regex: new RegExp(searchTerm, 'i') } }
      ].filter(Boolean)
    };

    // when searching for alcohol %, for example '3%' you must write '3%25' so that the URL reads it as a % sign.

    const beerItems = await Beer.find(query);

    if (!beerItems || beerItems.length === 0) {
      return next(createError(404, 'No beer found with the specified criteria.'));
    }

    res.send(beerItems);
  } catch (err) {
    return next(createError(500, err.message));
  }
};




// exports.findBeer = async function (req, res, next) {
//   try {
//     const query = {};

//     // Check if request parameters exist and add them to the query
//     if (req.params.name) {
//       query = req.params.name;
//     }

//     if (req.params.rating) {
//       query = req.params.rating;
//     }

//     if (req.params.origin) {
//       query = req.params.origin;
//     }

//     if (req.params.alcohol) {
//       query = req.params.alcohol;
//     }

//     // Use findOne with the constructed query
//     const beerItem = await Beer.find(query);

//     if (!beerItem) {
//       return next(createError(404, "No beer found with the specified criteria"));
//     }

//     res.send(beerItem);
//   } catch (err) {
//     return next(createError(500, err.message));
//   }
// };



// exports.getAllBeers =(req, res, next) => {
    
//     res.send(beers)
// }

// exports.createBeer = async (req, res, next) => {
//     const isMissingInformation = !req.body.name || !req.body.type || !req.body.alcohol || !req.body.origin || !req.body.rating;
//     if (isMissingInformation) return next(createError(400, 'Please fill out all of the fields.'));
  
//     const beerId = uuid.v4();
//     req.body.id = beerId;
  
//     try {
//       // Call the getRandom function to get a random beer
//       const randomBeer = await getRandom();
  
//       // Add the random beer data to the beers array
//       beers.push({ ...req.body, random_joke: randomBeer });
  
//       // Send the updated beers array in the response
//       res.send(beers);
//     } catch (error) {
//       next(createError(500, 'Error creating beer.'));
//     }
//   };


// alfies code



// alfies cpde



// exports.deleteBeer = (req, res, next) => {
//     const beerId = String(req.params.id);
//     const beerIndex = beers.findIndex(beer => beer.id === beerId)
//     console.log(beerIndex)
//     if (beerIndex === -1) return next(createError(404, 'Beer not found.'))
//     beers.splice(beerIndex, 1),
//     res.send(beers)
// }

// alfies version


// exports.editBeer = (req, res, next) => {
//     const beerId = String(req.params.id);
//     const beerIndex = beers.findIndex(beer => beer.id === beerId)
   
//     if (beerIndex === -1) return next(createError(404, 'Beer not found.'))

//     const updatedBeer = {
//         name: req.body.name || beers[beerIndex].name,
//         type: req.body.type || beers[beerIndex].type,
//         alcohol: req.body.alcohol || beers[beerIndex].alcohol,
//         origin: req.body.origin || beers[beerIndex].origin,
//         rating: req.body.rating || beers[beerIndex].rating,
//         id: beerId,
        
//     };
//     beers[beerIndex] = updatedBeer;
//     res.send(beers)
// }



// exports.findBeer = (req, res, next) => {
//     const beerId = String(req.params.id);
//     const beerIndex = beers.findIndex(beer => beer.id === beerId);

//     const beerName = String(req.params.name).toLowerCase();
//     const beerN = beers.find(beer => beer.name.toLowerCase() === beerName);

//     const beerType = String(req.params.type).toLowerCase();
//     const beerT = beers.find(beer => beer.type.toLowerCase() === beerType);

//     const beerOrigin = String(req.params.origin).toLowerCase();
//     const beerO = beers.find(beer => beer.origin.toLowerCase() === beerOrigin);
    
//     const beerAlcohol = String(req.params.alcohol).toLowerCase();
//     const beerA = beers.find(beer => beer.alcohol.toLowerCase() === beerAlcohol)

//     const beerRating = String(req.params.rating).toLowerCase();
//     const beerR = beers.find(beer => beer.rating.toLowerCase() === beerRating)
    
//     const filteredBeers = beers.filter (beer => {
//         return (
//             beer.name.toLowerCase() === beerName || beer.type.toLowerCase() === beerType || beer.origin.toLowerCase() === beerOrigin || beer.alcohol.toLowerCase() === beerAlcohol || beer.rating.toLowerCase() === beerRating)});

    
//     if (filteredBeers.length === 0) {
//         return next(createError(404, 'Cannot find the beer.'));
//     }


//     res.send(filteredBeers)
// };


// find by ID working version 

// exports.findBeer = async function (req, res, next) {
//   try {
//     const beerItem = await Beer.findById(req.params.id);
//     if (!beerItem) {
//       return next(createError(404, "no todo with that id"));
//     }
//     res.send(beerItem);
//   } catch (err) {
//     return next(createError(500, err.message));
//   }
// };



