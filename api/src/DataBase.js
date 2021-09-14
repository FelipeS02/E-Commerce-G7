const path = require("path");
const BASE_URL = path.join(__dirname, "public/uploads/");

const categorySet = ["clasico", "casual"];
const dataBase = [
  {
    name: "REMERA RETRO O'NEILL Y",
    sizes: {
      XS: 28,
      XL: 11,
      S: 0,
    },
    price: "2138",
    color: "amarillo",
    genre: "Femenino",
    type: "camperas",
    categories: ["clasico"],
    detail:
      "- Remera manga corta, escote redondo con ribb a tono, Estampa 1 color en frente.\n- Calce: Clasica Oversize\nMaterial\nAlgodon / Viscosa",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-RETRO-ONEILL-Y-amarillo1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-RETRO-ONEILL-Y-amarillo2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-RETRO-ONEILL-Y-amarillo3.jpg",
      },
    ],
  },
  {
    name: "REMERA RETRO O'NEILL",
    sizes: {
      M: 1,
      L: 22,
    },
    price: "2138",
    color: "blanco",
    genre: "Femenino",
    type: "remeras",
    categories: ["clasico"],
    detail:
      "- Remera manga corta, escote redondo con ribb a tono, Estampa 1 color en frente.\n- Calce: Clasica Oversize\nMaterial\nAlgodon / Viscosa",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-RETRO-ONEILL-blanco1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-RETRO-ONEILL-blanco2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-RETRO-ONEILL-blanco3.jpg",
      },
    ],
  },
  {
    name: "REMERA OK STAR O'NEILL",
    sizes: {
      M: 20,
      XS: 10,
    },
    price: "2990",
    color: "rosado",
    genre: "Masculino",
    type: "remeras",
    categories: ["clasico"],
    detail:
      "Remera manga corta, escote redondo con ribb a tono.\nEstampa en el pecho y en la espalda.\nCalce regular.",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-OK-STAR-ONEILL-rosado1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-OK-STAR-ONEILL-rosado2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-OK-STAR-ONEILL-rosado3.jpg",
      },
    ],
  },
  {
    name: "REMERA LEFT COAST O'NEILL",
    sizes: {
      M: 5,
      XS: 15,
      L: 10,
    },
    price: 2138,
    color: "negro",
    genre: "Masculino",
    type: "remeras",
    categories: ["clasico"],
    detail:
      "Remera manga corta, escote redondo con ribb a tono. Estampa en el frente.\nMaterial\n100% algodón.\nCalce regular",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-LEFT-COAST-ONEILL-negro1.jpg",
        path: BASE_URL + "REMERA-LEFT-COAST-ONEILL-negro1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-LEFT-COAST-ONEILL-negro2.jpg",
        path: BASE_URL + "REMERA-LEFT-COAST-ONEILL-negro2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-LEFT-COAST-ONEILL-negro3.jpg",
        path: BASE_URL + "REMERA-LEFT-COAST-ONEILL-negro3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "REMERA-LEFT-COAST-ONEILL-negro4.jpg",
        path: BASE_URL + "REMERA-LEFT-COAST-ONEILL-negro4.jpg",
      },
    ],
  },
  {
    name: "PANTALÓN CORD O'NEILL",
    sizes: {
      L: 25,
      XS: 15,
    },
    price: 7300,
    color: "negro",
    genre: "Masculino",
    type: "pantalones",
    categories: ["casual"],
    detail:
      "Pantalón tipo jogger con 2 bolsillos laterales.\nCintura elastizada, cordón para ajustar.\nPuños elastizados.\nCalce regular",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "PANTALON-CORD-ONEILL-negro1.jpg",
        path: BASE_URL + "PANTALON-CORD-ONEILL-negro1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "PANTALON-CORD-ONEILL-negro2.jpg",
        path: BASE_URL + "PANTALON-CORD-ONEILL-negro2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "PANTALON-CORD-ONEILL-negro3.jpg",
        path: BASE_URL + "PANTALON-CORD-ONEILL-negro3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "PANTALON-CORD-ONEILL-negro4.jpg",
        path: BASE_URL + "PANTALON-CORD-ONEILL-negro4.jpg",
      },
    ],
  },
  // {
  //   name: "MOCHILA EASY RIDER O'NEILL",
  //   sizes: {
  //     UNICO: 25,
  //   },
  //   price: 1500,
  //   color: "gris",
  //   genre: "Masculino",
  //   type: "mochilas",
  //   categories: ["accesorio"],
  //   detail:
  //     "- Compartimiento interno para laptop.\n- Tiras de hombros acolchonadas.\n- Bolsillo lateral de mesh.\n- Logo reflectivo.\n- Bolsillo externo frontal.\n-Dimensiones: 48 x 31 x 21.\n- Capacidad 30 L.",
  //   files: [
  //     {
  //       mimetype: "image/jpeg",
  //       originalname: "MOCHILA-EASY-RIDER-ONEILL-gris1.jpg",
  //       path: BASE_URL+"MOCHILA-EASY-RIDER-ONEILL-gris1.jpg",
  //     },
  //     {
  //       mimetype: "image/jpeg",
  //       originalname: "MOCHILA-EASY-RIDER-ONEILL-gris2.jpg",
  //       path: BASE_URL+"MOCHILA-EASY-RIDER-ONEILL-gris2.jpg",
  //     }
  //   ],
  // },
  {
    name: "JOGGER ELENA PRINTED O'NEIL",
    sizes: {
      M: 22,
      S: 18,
    },
    price: 4200,
    color: "negro",
    genre: "Femenino",
    type: "pantalones",
    categories: ["casual"],
    detail:
      "Jogger con bolsillos, cintura ajustable y puños elastizados.\nEstampa en pierna.\nMaterial\n60 % Algodón - 40 % Poliester.",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "JOGGER-ELENA-PRINTED-ONEIL-negro1.jpg",
        path: BASE_URL + "JOGGER-ELENA-PRINTED-ONEIL-negro1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "JOGGER-ELENA-PRINTED-ONEIL-negro2.jpg",
        path: BASE_URL + "JOGGER-ELENA-PRINTED-ONEIL-negro2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "JOGGER-ELENA-PRINTED-ONEIL-negro3.jpg",
        path: BASE_URL + "JOGGER-ELENA-PRINTED-ONEIL-negro3.jpg",
      },
    ],
  },
  {
    name: "PANTALÓN LAVIN O'NEILL",
    sizes: {
      M: 15,
      XS: 10,
    },
    price: 1500,
    color: "bordo",
    genre: "Masculino",
    type: "pantalones",
    categories: ["casual"],
    detail:
      "Pantalón de jean 5 bolsillos con lavado stonewash.\nCalce Regular\nmateriales\n97% Algodón - 3% Elastano.",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "PANTALON-LAVIN-ONEILL-bordo1.jpg",
        path: BASE_URL + "PANTALON-LAVIN-ONEILL-bordo1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "PANTALON-LAVIN-ONEILL-bordo2.jpg",
        path: BASE_URL + "PANTALON-LAVIN-ONEILL-bordo2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "PANTALON-LAVIN-ONEILL-bordo3.jpg",
        path: BASE_URL + "PANTALON-LAVIN-ONEILL-bordo3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "PANTALON-LAVIN-ONEILL-bordo4.jpg",
        path: BASE_URL + "PANTALON-LAVIN-ONEILL-bordo4.jpg",
      },
    ],
  },
  // {
  //   name: "GORRO BRIX BEANIE O'NEILL",
  //   size: {
  //     UNICO: 26
  //   },
  //   price: 1500,
  //   color: "gris",
  //   genre: "Femenino",
  //   type: "gorros",
  //   categories: ["accesorio"],
  //   detail:
  //     "Gorro tejido largo, con lurex.\nCalce relajado.\nMaterial\n100% Acrílico.",
  //   files: [
  //     {
  //       mimetype: "image/jpeg",
  //       originalname: "GORRO-BRIX-BEANIE-ONEILL-gris1.jpg",
  //       path: BASE_URL+"GORRO-BRIX-BEANIE-ONEILL-gris1.jpg",
  //     }
  //   ]
  // },
  // {
  //   name: "GORRO BLOKE II O'NEILL",
  //   sizes: {
  //     UNICO: 30,
  //   },
  //   price: 1500,
  //   color: "bordo",
  //   genre: "Masculino",
  //   type: "gorros",
  //   categories: ["accesorio"],
  //   detail:
  //     "- Gorro tejido con doblez.\n- Etiqueta externa\n- Calce Relaxed.\n- Talle Unico.",
  //   files: [
  //     {
  //       mimetype: "image/jpeg",
  //       originalname: "GORRO-BLOKE-II-ONEILL-bordo1.jpg",
  //       path: BASE_URL+"GORRO-BLOKE-II-ONEILL-bordo1.jpg",
  //     }
  //   ]
  // },
  // {
  //   name: "CAP STOWELL II O'NEILL",
  //   sizes: {
  //     UNICO: 12,
  //   },
  //   price: 279,
  //   color: "beige",
  //   genre: "Masculino",
  //   type: "caps",
  //   categories: ["accesorio"],
  //   detail:
  //     "- Cap O'Neill 6 paneles de corderoy\n- Vicera curva.\n- Parche de PU.\n- Ajuste de tela.\n- Calce regular.\nMaterial \n100% Algodon.",
  //   files: [
  //     {
  //       mimetype: "image/jpeg",
  //       originalname: "CAP-STOWELL-II-ONEILL-beige1.jpg",
  //       path: BASE_URL+"CAP-STOWELL-II-ONEILL-beige1.jpg",
  //     },
  //     {
  //       mimetype: "image/jpeg",
  //       originalname: "CAP-STOWELL-II-ONEILL-beige2.jpg",
  //       path: BASE_URL+"CAP-STOWELL-II-ONEILL-beige2.jpg",
  //     }
  //   ],
  // },
  {
    name: "CAMPERA ONTARIO O'NEILL",
    sizes: {
      M: 6,
      XS: 1,
      S: 5,
    },
    price: 14400,
    color: "amarillo",
    genre: "Femenino",
    type: "camperas",
    categories: ["clasico"],
    detail:
      "Campera urbana femenina con canelones y capucha.\nAbertura cierre plástico.\nCintura y puños con elástico.\nCalce: regular a la cadera.\nMaterial\n100% Poliester.",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-ONTARIO-ONEILL-amarillo1.jpg",
        path: BASE_URL + "CAMPERA-ONTARIO-ONEILL-amarillo1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-ONTARIO-ONEILL-amarillo2.jpg",
        path: BASE_URL + "CAMPERA-ONTARIO-ONEILL-amarillo2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-ONTARIO-ONEILL-amarillo3.jpg",
        path: BASE_URL + "CAMPERA-ONTARIO-ONEILL-amarillo3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-ONTARIO-ONEILL-amarillo4.jpg",
        path: BASE_URL + "CAMPERA-ONTARIO-ONEILL-amarillo4.jpg",
      },
    ],
  },
  {
    name: "CAMPERA KENAI O'NEILL",
    sizes: {
      M: 21,
      XL: 35,
    },
    price: 15200,
    color: "verde",
    genre: "Masculino",
    type: "camperas",
    categories: ["clasico"],
    detail:
      "Campera tipo parka con capucha forrada en micropolar y piel sintética.\n4 bolsillos.\nInterior acanalado con cordón para ajustar.\nMangas con puños y velcro.",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-KENAI-ONEILL-verde1.jpg",
        path: BASE_URL + "CAMPERA-KENAI-ONEILL-verde1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-KENAI-ONEILL-verde2.jpg",
        path: BASE_URL + "CAMPERA-KENAI-ONEILL-verde2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-KENAI-ONEILL-verde3.jpg",
        path: BASE_URL + "CAMPERA-KENAI-ONEILL-verde3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-KENAI-ONEILL-verde4.jpg",
        path: BASE_URL + "CAMPERA-KENAI-ONEILL-verde4.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-KENAI-ONEILL-verde5.jpg",
        path: BASE_URL + "CAMPERA-KENAI-ONEILL-verde5.jpg",
      },
    ],
  },
  {
    name: "CAMPERA GALA O'NEILL",
    sizes: {
      M: 12,
      XXL: 8,
    },
    price: 11600,
    color: "azul marino",
    genre: "Masculino",
    type: "camperos",
    categories: ["clasico"],
    detail:
      "Campera con capucha ajustable.\nCanelones anchos y cierre central plástico.\nDos bolsillos con botones a presión y puños regulables con velcro.\nMATERIALES\nRelleno 100% Silicona.",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-GALA-ONEILL-azul1.jpg",
        path: BASE_URL + "CAMPERA-GALA-ONEILL-azul1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-GALA-ONEILL-azul2.jpg",
        path: BASE_URL + "CAMPERA-GALA-ONEILL-azul2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-GALA-ONEILL-azul3.jpg",
        path: BASE_URL + "CAMPERA-GALA-ONEILL-azul3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-GALA-ONEILL-azul4.jpg",
        path: BASE_URL + "CAMPERA-GALA-ONEILL-azul4.jpg",
      },
    ],
  },
  {
    name: "CAMPERA BANDALE O'NEILL",
    sizes: {
      M: 24,
      S: 17,
    },
    price: 1200,
    color: "rojo",
    genre: "Femenino",
    type: "camperas",
    categories: ["clasico"],
    detail:
      "-Campera clásica larga, con relleno y canelones.\n-Cierre frontal, bolsillos laterales y cuello alto.\n-Interior de frente, espalda y capucha forrado en piel sintética.\n-Calce: Regular\nMaterial\n100% Poliester.",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-BANDALE-ONEILL-rojo1.jpg",
        path: BASE_URL + "CAMPERA-BANDALE-ONEILL-rojo1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-BANDALE-ONEILL-rojo2.jpg",
        path: BASE_URL + "CAMPERA-BANDALE-ONEILL-rojo2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-BANDALE-ONEILL-rojo3.jpg",
        path: BASE_URL + "CAMPERA-BANDALE-ONEILL-rojo3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMPERA-BANDALE-ONEILL-rojo4.jpg",
        path: BASE_URL + "CAMPERA-BANDALE-ONEILL-rojo4.jpg",
      },
    ],
  },
  {
    name: "CAMISA LUMBER O'NEILL",
    sizes: {
      M: 2,
      L: 10,
    },
    price: 7499,
    color: "ladrillo gris",
    genre: "Masculino",
    type: "camisas",
    categories: ["clasico"],
    detail:
      "Camisa manga larga, tipo leñadora, de viyela peinada.\nMATERIALES\n100% Algodón",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-LUMBER-ONEILL-ladrillo1.jpg",
        path: BASE_URL + "CAMISA-LUMBER-ONEILL-ladrillo1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-LUMBER-ONEILL-ladrillo2.jpg",
        path: BASE_URL + "CAMISA-LUMBER-ONEILL-ladrillo2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-LUMBER-ONEILL-ladrillo3.jpg",
        path: BASE_URL + "CAMISA-LUMBER-ONEILL-ladrillo3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-LUMBER-ONEILL-ladrillo4.jpg",
        path: BASE_URL + "CAMISA-LUMBER-ONEILL-ladrillo4.jpg",
      },
    ],
  },
  {
    name: "CAMISA HAMPTON O'NEILL",
    sizes: {
      M: 2,
      XL: 12,
    },
    price: 4320,
    color: "azul",
    genre: "Femenino",
    type: "camisas",
    categories: ["casual"],
    detail:
      "Camisa de mujer manga larga de fibrana rayada.\nBolsillos en el pecho y cartera con botones.\nCalce: Overzise.",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-HAMPTON-ONEILL-azul1.jpg",
        path: BASE_URL + "CAMISA-HAMPTON-ONEILL-azul1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-HAMPTON-ONEILL-azul2.jpg",
        path: BASE_URL + "CAMISA-HAMPTON-ONEILL-azul2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-HAMPTON-ONEILL-azul3.jpg",
        path: BASE_URL + "CAMISA-HAMPTON-ONEILL-azul3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-HAMPTON-ONEILL-azul4.jpg",
        path: BASE_URL + "CAMISA-HAMPTON-ONEILL-azul4.jpg",
      },
    ],
  },
  {
    name: "CAMISA DORY O'NEILL",
    sizes: {
      M: 20,
      XS: 15,
    },
    price: 6999,
    color: "azul",
    genre: "Masculino",
    type: "camisas",
    categories: ["casual"],
    detail:
      "Camisa manga larga tipo leñadora de viyela\nMATERIALES\n100% Algodón",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-DORY-ONEILL-azul1.jpg",
        path: BASE_URL + "CAMISA-DORY-ONEILL-azul1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-DORY-ONEILL-azul2.jpg",
        path: BASE_URL + "CAMISA-DORY-ONEILL-azul2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "CAMISA-DORY-ONEILL-azul3.jpg",
        path: BASE_URL + "CAMISA-DORY-ONEILL-azul3.jpg",
      },
    ],
  },
  {
    name: "BUZO CANGURO COAST",
    sizes: {
      XXL: 10,
      M: 5,
    },
    price: 4830,
    color: "lila",
    stock: 89,
    genre: "Masculino",
    type: "buzos",
    categories: ["casual"],
    detail:
      "Buzo canguro con capucha. estampa en el frente. Cordón redondo con ojalillos y puntera metálicos.",
    files: [
      {
        mimetype: "image/jpeg",
        originalname: "BUZO-CANGURO-COAST-lila1.jpg",
        path: BASE_URL + "BUZO-CANGURO-COAST-lila1.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "BUZO-CANGURO-COAST-lila2.jpg",
        path: BASE_URL + "BUZO-CANGURO-COAST-lila2.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "BUZO-CANGURO-COAST-lila3.jpg",
        path: BASE_URL + "BUZO-CANGURO-COAST-lila3.jpg",
      },
      {
        mimetype: "image/jpeg",
        originalname: "BUZO-CANGURO-COAST-lila4.jpg",
        path: BASE_URL + "BUZO-CANGURO-COAST-lila4.jpg",
      },
    ],
  },
];
module.exports = { dataBase, categorySet };
