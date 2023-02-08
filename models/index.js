import Propiedad from "./Propiedad.js";
import Precio from "./Precio.js";
import Categoria from "./Categoria.js";
import Usuario from "./Usuario.js";

Precio.hasOne(Propiedad, { foreignKey: "precioId" });
Categoria.hasOne(Propiedad, { foreignKey: "categoriaId" });
Usuario.hasMany(Propiedad, {foreignKey: 'usuarioId'})

export { Propiedad, Precio, Categoria, Usuario };
