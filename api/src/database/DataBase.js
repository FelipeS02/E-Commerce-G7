const dataBase = [
    {
        name:"REMERA RETRO O'NEILL Y",
        size:"XS",
        price:2138,
        color:"blanco",
        stock:39,
        genre:"Femenino",
        categories:["Camperas", 'Clasico'],
        ditail:"- Remera manga corta, escote redondo con ribb a tono, Estampa 1 color en frente.\n- Calce: Clasica Oversize\n\nMaterial\nAlgodon / Viscosa"
    },
    {
        name:"REMERA RETRO O'NEILL",
        size:"M",
        price:2138,
        color:"blanco",
        stock:39,
        genre:'Femenino',
        categories:['Remeras', 'Clasico'],
        ditail:"- Remera manga corta, escote redondo con ribb a tono, Estampa 1 color en frente.\n- Calce: Clasica Oversize\n\nMaterial\nAlgodon / Viscosa"
    },
    {
        name:"REMERA OK STAR O'NEILL",
        size:"L",
        price:2990,
        color:"negro",
        stock:35,
        genre:'Masculino',
        categories:['Remeras'],
        ditail:"Remera manga corta, escote redondo con ribb a tono.\nEstampa en el pecho y en la espalda.\nCalce regular."
    },
    {
        name:"REMERA LEFT COAST O'NEILL",
        size:"M",
        price:2138,
        color:"negro",
        stock:50,
        genre:'Masculino',
        categories:['Remeras'],
        ditail:"Remera manga corta, escote redondo con ribb a tono. Estampa en el frente.\nMaterial\n100% algodón.\nCalce regular"
    },
    {
        name:"PANTALÓN CORD O'NEILL",
        size:"L",
        price:7300,
        color:"negro",
        stock:15,
        genre:'Masculino',
        categories:['Pantalones'],
        ditail:"Pantalón tipo jogger con 2 bolsillos laterales.\nCintura elastizada, cordón para ajustar.\nPuños elastizados.\nCalce regular"
    },
    {
        name:"MOCHILA EASY RIDER O'NEILL",
        size:"Unico",
        price:1500,
        color:"gris",
        stock:25,
        genre:'Masculino',
        categories:['Mochilas'],
        ditail:"- Compartimiento interno para laptop.\n- Tiras de hombros acolchonadas.\n- Bolsillo lateral de mesh.\n- Logo reflectivo.\n- Bolsillo externo frontal.\n-Dimensiones: 48 x 31 x 21.\n- Capacidad 30 L."
    },
    {
        name:"JOGGER ELENA PRINTED O'NEIL",
        size:"S",
        price:4200,
        color:"azul marino",
        stock:36,
        genre:'Femenino',
        categories:['Pantalones'],
        ditail:"Jogger con bolsillos, cintura ajustable y puños elastizados.\nEstampa en pierna.\nMaterial\n60 % Algodón - 40 % Poliester."
    },
    {
        name:"PANTALÓN LAVIN O'NEILL",
        size:"36",
        price:1500,
        color:"bordo",
        stock:42,
        genre:'Masculino',
        categories:['Pantalones'],
        ditail:"Pantalón de jean 5 bolsillos con lavado stonewash.\nCalce Regular\nmateriales\n97% Algodón - 3% Elastano."
    },
    {
        name:"GORRO BRIX BEANIE O'NEILL",
        size:"Unico",
        price:1500,
        color:"azul marino",
        stock:26,
        genre:'Femenino',
        categories:['Gorros'],
        ditail:"Gorro tejido largo, con lurex.\nCalce relajado.\nMaterial\n100% Acrílico."
    },
    {
        name:"GORRO BLOKE II O'NEILL",
        size:"Unico",
        price:1500,
        color:"bordo",
        stock:30,
        genre:'Masculino',
        categories:['Gorros'],
        ditail:"- Gorro tejido con doblez.\n- Etiqueta externa\n- Calce Relaxed.\n- Talle Unico."
    },
    {
        name:"CAP STOWELL II O'NEILL",
        size:"Unico",
        price:279,
        color:"beige",
        stock:123,
        genre:'Masculino',
        categories:['Caps', ''],
        ditail:"- Cap O'Neill 6 paneles de corderoy\n- Vicera curva.\n- Parche de PU.\n- Ajuste de tela.\n- Calce regular.\nMaterial \n100% Algodon."
    },
    {
        name:"CAMPERA ONTARIO O'NEILL",
        size:"M",
        price:14400,
        color:"amarillo",
        stock:6,
        genre:'Femenino',
        categories:['Camperas', 'Urbano'],
        ditail:"Campera urbana femenina con canelones y capucha.\nAbertura cierre plástico.\nCintura y puños con elástico.\nCalce: regular a la cadera.\nMaterial\n100% Poliester."
    },
    {
        name:"CAMPERA KENAI O'NEILL",
        size:"XL",
        price:15200,
        color:"verde",
        stock:35,
        genre:'Masculino',
        categories:['Camperas'],
        ditail:"Campera tipo parka con capucha forrada en micropolar y piel sintética.\n4 bolsillos.\nInterior acanalado con cordón para ajustar.\nMangas con puños y velcro."
    },
    {
        name:"CAMPERA GALA O'NEILL",
        size:"XXL",
        price:11600,
        color:"azul marino",
        stock:8,
        genre:'Masculino',
        categories:['Camperas'],
        ditail:"Campera con capucha ajustable.\nCanelones anchos y cierre central plástico.\nDos bolsillos con botones a presión y puños regulables con velcro.\nMATERIALES\nRelleno 100% Silicona."
    },
    {
        name:"CAMPERA BANDALE O'NEILL",
        size:"S",
        price:1200,
        color:"rojo",
        stock:5,
        genre:'Femenino',
        categories:['Camperas'],
        ditail:"-Campera clásica larga, con relleno y canelones.\n-Cierre frontal, bolsillos laterales y cuello alto.\n-Interior de frente, espalda y capucha forrado en piel sintética.\n-Calce: Regular\nMaterial\n100% Poliester."
    },
    {
        name:"CAMISA LUMBER O'NEILL",
        size:"L",
        price:7499,
        color:"ladrillo gris",
        stock:10,
        genre:'Masculino',
        categories:['Camisas'],
        ditail:"Camisa manga larga, tipo leñadora, de viyela peinada.\nMATERIALES\n100% Algodón"
    },
    {
        name:"CAMISA HAMPTON O'NEILL",
        size:"M",
        price:4320,
        color:"azul",
        stock:2,
        genre:'Femenino',
        categories:['Camisas'],
        ditail:"Camisa de mujer manga larga de fibrana rayada.\nBolsillos en el pecho y cartera con botones.\nCalce: Overzise."
    },
    {
        name:"CAMISA DORY O'NEILL",
        size:"XS",
        price:6999,
        color:"azul",
        stock:10,
        genre:'Masculino',
        categories:['Camisas'],
        ditail:"Camisa manga larga tipo leñadora de viyela\nMATERIALES\n100% Algodón"
    },
    {
        name:"BUZO CANGURO COAST",
        size:"XXL",
        price:4830,
        color:"lila",
        stock:89,
        genre:'Masculino',
        categories:['Buzos'],
        ditail:"Buzo canguro con capucha. estampa en el frente. Cordón redondo con ojalillos y puntera metálicos."
    },
]
module.exports = {dataBase}