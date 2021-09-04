require("dotenv").config();
const { Sequelize } = require("sequelize");
const fs = require("fs");
const path = require("path");
const { DB_USER, DB_PASSWORD, DB_HOST } = process.env;

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/ecommerce`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    timestamps: false,
  }
);
const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => {
  if (typeof model === "function") {
    model(sequelize);
  }
});
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  User,
  Clothe,
  Category,
  Order,
  Media,
  Direction,
  Payment,
  Order_clothes,
} = sequelize.models;

// Aca vendrian las relaciones

User.belongsToMany(Direction, { through: "user_directions" });

// Ropa y Categorias
Category.belongsToMany(Clothe, { through: "clothe_category" });
Clothe.belongsToMany(Category, { through: "clothe_category" });
Clothe.belongsToMany(Media, { through: "clothe_media" });

//Orden y ropa
User.belongsToMany(Order, { through: "user_orders" });
Clothe.belongsToMany(Order, { through: Order_clothes });

// Orden y direccion
Direction.belongsToMany(Order, { through: "order_directions" });
Order.belongsTo(Direction, { through: "order_directions" });

// Orden y Pago
Payment.belongsToMany(Order, { through: "order_payment" });
Order.belongsTo(Payment, { through: "order_payment" });

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
};
