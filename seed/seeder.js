import { exit } from "process";
import categorias from "./categoria.js";
import precios from "./precios.js";
import db from "../config/db.js";
import {Categoria, Precio} from '../models/index.js'


const importarDatos = async () => {
  try {
    await db.authenticate();
    await db.sync();

    // Insertar los datos
    // de esta forma primero inserto categorias y dsp precios. Con Promise.all inserto ambas en simultaneo
    // await Categoria.bulkCreate(categorias)
    // await Precio.bulkCreate(precios)

    await Promise.all([
      Categoria.bulkCreate(categorias),
      Precio.bulkCreate(precios),
    ]);

    console.log("Datos importados correctamente en Categoria");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

const eliminarDatos = async () => {
  try {
    // await Promise.all([
    //   Categoria.destroy({ where: {}, truncate: true }),
    //   Precio.destroy({ where: {}, truncate: true }),
    // ]);

    await db.sync({ force: true });

    console.log("Datos eliminados correctamente");
    exit();
  } catch (error) {
    console.log(error);
    exit(1);
  }
};

if (process.argv[2] === "-i") {
  importarDatos();
}

if (process.argv[2] === "-e") {
  eliminarDatos();
}

// exit() solo o con un 0 queire decir que finalizo el codigo pero finalizo bien, cuando se pone exit(1) significa que finalizo pero con un error
