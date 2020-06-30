const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);

require("./models/Propierty");

require("./models/User");

const requireToken = require("./middleware/requireToken");
const authRoutes = require("./routes/authRoutes");
app.use(bodyParser.json());
app.use(authRoutes);

app.use(bodyParser.json());

const Propierty = mongoose.model("propierty");

// Url de mi conexión al cluster de Mongo Atlas. (API)
const mongoUri =
  "mongodb+srv://bgm:5SepA1DP4GKW38V2@cluster0-m5l3c.mongodb.net/<dbname>?retryWrites=true&w=majority";

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("connected to mongo OK");
});

mongoose.connection.on("error", (err) => {
  console.log("error", err);
});

/// **********************REACT*******************************************

// Página de inicio cuándo el usuario inregse a la aplicación.
app.get("/allpropierties", (req, res) => {
  Propierty.find({})
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Página de inicio requiriendo Token. (Obtener email en la aplicación)
app.get("/allpropierties_token", requireToken, (req, res) => {
  res.send({ email: req.user.email });
});

//Guardar propiedades
app.post("/save", (req, res) => {
  const propierty = new Propierty({
    title: req.body.title,
    type_: req.body.type_,
    address: req.body.address,
    rooms: req.body.rooms,
    price: req.body.price,
    area: req.body.area,
    picture: req.body.picture,
  });
  propierty
    .save()
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Actualizar propiedades con verbo POST -- Creado para la aplicación.
app.post("/update", (req, res) => {
  Propierty.findByIdAndUpdate(req.body.id, {
    title: req.body.title,
    type_: req.body.type_,
    address: req.body.address,
    rooms: req.body.rooms,
    price: req.body.price,
    area: req.body.area,
    picture: req.body.picture,
  })
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

// Eliminar propiedades con verbo POST -- Creado para la aplicación.
app.post("/delete", (req, res) => {
  Propierty.findByIdAndRemove(req.body.id)
    .then((data) => {
      console.log(data);
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

/// **********************FLASK*******************************************

// Traer propiedades por Id.  -- Nota: Creada para flask.
app.get("/:propiertyId", (req, res) => {
  let propiertyId = req.params.propiertyId;
  Propierty.findById(propiertyId, (error, propierty) => {
    if (error)
      return res
        .status(500)
        .send({ message: `Error ${error}` });
    if (!propierty)
      return res.status(404).send({ message: "The property does not exist" });

    res.status(200).send({ propierty });
  });
});

// Eliminar propiedades con el verbo DELETE.
app.delete("/delete/:propiertyId", (req, res) => {
  let propiertyId = req.params.propiertyId;

  Propierty.findById(propiertyId, (err, propierty) => {
    if (err)
      res
        .status(500)
        .send({ message: `Failed to delete property ${err}` });

    propierty.remove((err) => {
      if (err)
        res
          .status(500)
          .send({ message: `Failed to delete property ${err}` });
      res.status(200).send({ message: "Property has been removed" });
    });
  });
});

// Actualizar propiedades con PUT se debe enviar el ID en la URL
/* app.put("/update/:propiertyId", (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Los datos a actualizar no pueden estar vacíos",
      });
    }
  
    let propiertyId = req.params.propiertyId;
  
    Propierty.findByIdAndUpdate(propiertyId, req.body, { useFindAndModify: false })
      .then((data) => {
        if (!data) {
          res.status(404).send({
            message: `No se puede actualizar producto con id=${propiertyId}`,
          });
        } else res.send({ message: "Producto fue actualizado correctamente" });
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error actualizando producto con id=" + propiertyId,
        });
      });
  });
 */

/**
       "title":"Apartamento Villa del sol",
       "type": "house",  --   house, room, hostel
       "address":"Calle 13",
       "rooms":"2",
       "price":"100",
       "area":"300"
       **/

app.listen(3000, () => {
  console.log("server running");
});
