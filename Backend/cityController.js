const fs = require("fs");

const { cities } = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf-8")
);

function getAllCities(req, res) {
  console.log("requested");
  res.status(200).json({
    status: "success",
    data: cities,
  });
}

function checkBody(req, res, next) {
  if(!req.body.cityName && !req.body.date)return res.status(400).json({
    status:"invalid resource",
    message:"check the input fields"
  })
  next();
}
function postCity(req, res) {
  const newid = cities.length;
  const newCity = Object.assign({ id: newid }, req.body);
  cities.push(newCity);
  fs.writeFile(
    `${__dirname}/dev-data/data.json`,
    JSON.stringify({ cities }),
    (err) => {
      if (err)
        return res.status(404).json({
          status: "file not found",
        });
      res.status(201).json({
        status: "success",
        data: cities,
      });
    }
  );
}

function deleteCity(req, res) {
  const id = req.params.id * 1;
  const index = cities.findIndex((city) => city.id === id);
  cities.splice(index, 1);
  
  fs.writeFile(
    `${__dirname}/dev-data/data.json`,
    JSON.stringify({ cities }),
    (err) => {
      res.status(204).json({
        status: "deleted",
        data: null,
      });
    }
  );
}

function getCityById(req, res) {
  const id = req.params.id * 1;
  const city = cities.find((city) => city.id === id);
  res.status(200).json({
    status: "success",
    data: city,
  });
}

// function checkid(req, res, next, val) {
//   if (val >= cities.length)
//     return res.status(404).json({
//       status: "failed",
//       message: "invalid resource",
//     });
//   next();
// }

module.exports = {
  getAllCities,
  getCityById,
  postCity,
  deleteCity,
  // checkid,
  checkBody,
};