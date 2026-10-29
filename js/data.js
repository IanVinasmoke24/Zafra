// ==========================================================================
// ZAFRA · Datos Iniciales & Almacenamiento Local (LocalStorage)
// ==========================================================================

const INITIAL_PRODUCERS = [
  {
    id: "prod-1",
    name: "Don Vicente 'Chente' Gómez",
    ranchName: "Rancho El Fresno",
    municipality: "Tlayacapan",
    region: "Altos de Morelos",
    yearsFarming: 28,
    avatar: "assets/img/familia_productora.jpg",
    verified: true,
    bio: "Familia de tercera generación en Tlayacapan. Cultivamos con agua de manantial y abonos orgánicos, sin pesticidas químicos agresivos.",
    harvestDays: "Lunes y Jueves",
    followersCount: 184,
    rating: 4.9,
    reviewsCount: 52,
    reviews: [
      { user: "María Elena R.", comment: "El jitomate tiene sabor de verdad, nada que ver con el supermercado.", rating: 5 },
      { user: "Chef Gerardo (Cuernavaca)", comment: "Calidad de restaurante. Siempre fresco y puntual.", rating: 5 }
    ]
  },
  {
    id: "prod-2",
    name: "Doña Lupita Salgado",
    ranchName: "Huerta Santa Inés",
    municipality: "Yecapixtla",
    region: "Oriente",
    yearsFarming: 22,
    avatar: "assets/img/familia_productora.jpg",
    verified: true,
    bio: "Especialistas en árboles frutales nativos de Morelos: mangos criollos, jocotes y cítricos cosechados al punto óptimo de madurez.",
    harvestDays: "Martes y Viernes",
    followersCount: 230,
    rating: 4.95,
    reviewsCount: 68,
    reviews: [
      { user: "Carlos V.", comment: "Los mangos dulces y aromáticos, llegaron perfectos.", rating: 5 }
    ]
  },
  {
    id: "prod-3",
    name: "Cooperativa Semilla Viva",
    ranchName: "Tierras del Volcán",
    municipality: "Tetela del Volcán",
    region: "Faldas del Popocatépetl",
    yearsFarming: 15,
    avatar: "assets/img/hero_campo.jpg",
    verified: true,
    bio: "12 familias unidas para rescatar el cultivo milenario del amaranto con semilla nativa, miel de monte y transformación artesanal.",
    harvestDays: "Miércoles",
    followersCount: 312,
    rating: 5.0,
    reviewsCount: 89,
    reviews: [
      { user: "Ana Sofía M.", comment: "Las alegrías sin exceso de azúcar son una delicia.", rating: 5 }
    ]
  },
  {
    id: "prod-4",
    name: "Familia Flores Ayala",
    ranchName: "La Milpa Dorada",
    municipality: "Ayala",
    region: "Valles Históricos",
    yearsFarming: 35,
    avatar: "assets/img/familia_productora.jpg",
    verified: true,
    bio: "Maíz blanco y elotes tiernos en las tierras fértiles de Anenecuilco. Cosechamos de madrugada para entregar en su punto de azúcar.",
    harvestDays: "Lunes a Sábado",
    followersCount: 145,
    rating: 4.85,
    reviewsCount: 41,
    reviews: [
      { user: "Braulio T.", comment: "Elotes de verdad tiernos y jugosos.", rating: 5 }
    ]
  },
  {
    id: "prod-5",
    name: "Floricultores del Río Yautepec",
    ranchName: "Flores del Paraíso",
    municipality: "Cuautla",
    region: "Centro Oriente",
    yearsFarming: 19,
    avatar: "assets/img/prod_flores.jpg",
    verified: true,
    bio: "Invernaderos de flor de corte con uso eficiente de agua. Llevamos color y aroma morelense directo a los hogares.",
    harvestDays: "Viernes y Sábado",
    followersCount: 98,
    rating: 4.9,
    reviewsCount: 27,
    reviews: [
      { user: "Claudia D.", comment: "Las flores duraron frescas más de 12 días.", rating: 5 }
    ]
  },
  {
    id: "prod-6",
    name: "Molino Artesanal San José",
    ranchName: "Campos del Arrozal",
    municipality: "Cuautla",
    region: "Oriente",
    yearsFarming: 40,
    avatar: "assets/img/prod_arroz.jpg",
    verified: true,
    bio: "Auténtico Arroz del Estado de Morelos con Denominación de Origen protegida. Grano largo, esponjado insuperable y sin químicos blanqueadores.",
    harvestDays: "Permanente",
    followersCount: 420,
    rating: 5.0,
    reviewsCount: 110,
    reviews: [
      { user: "Doña Tere", comment: "No hay otro arroz en el mundo que rinda y esponje como este.", rating: 5 }
    ]
  }
];

const INITIAL_PRODUCTS = [
  {
    id: "p-1",
    name: "Jitomate Riñón Criollo",
    producerId: "prod-1",
    producerName: "Don Chente Gómez",
    municipality: "Tlayacapan",
    price: 32,
    unit: "kg",
    image: "assets/img/prod_jitomate.jpg",
    isPreventa: true,
    harvestDate: "Cosecha este Jueves (en 2 días)",
    stock: 80,
    category: "Hortalizas",
    tags: ["Sin agroquímicos", "De temporada", "Sabor dulce nativo"],
    description: "Jitomate de piel firme, pulpa carnosa y gran aroma. Ideal para ensaladas frescas y salsas de molcajete."
  },
  {
    id: "p-2",
    name: "Mango Criollo y Manila Dulce",
    producerId: "prod-2",
    producerName: "Doña Lupita Salgado",
    municipality: "Yecapixtla",
    price: 38,
    unit: "kg",
    image: "assets/img/prod_mango.jpg",
    isPreventa: true,
    harvestDate: "Corte el Viernes temprano",
    stock: 120,
    category: "Frutas",
    tags: ["De temporada", "Madurado en árbol", "Dulce natural"],
    description: "Cosechado cuando el fruto pide corte natural, sin cámaras de gas ni carburo."
  },
  {
    id: "p-3",
    name: "Elote Blanco Tiernito (Docena)",
    producerId: "prod-4",
    producerName: "Familia Flores Ayala",
    municipality: "Ayala",
    price: 65,
    unit: "docena (12 pzas)",
    image: "assets/img/prod_elote.jpg",
    isPreventa: false,
    harvestDate: "Corte diario por encargo",
    stock: 50,
    category: "Granos y Maíces",
    tags: ["Tierra zapatista", "Recién cortado", "Dulce"],
    description: "Mazorcas tiernas ideales para hervir con epazote o asar al carbón."
  },
  {
    id: "p-4",
    name: "Nopal Cambray Desespinado",
    producerId: "prod-1",
    producerName: "Don Chente Gómez",
    municipality: "Tlayacapan",
    price: 25,
    unit: "bolsa (1 kg / 10 pzas)",
    image: "assets/img/prod_nopal.jpg",
    isPreventa: false,
    harvestDate: "Corte de hoy",
    stock: 45,
    category: "Hortalizas",
    tags: ["Sin espinas", "Fibra alta", "Agroecológico"],
    description: "Penca pequeña, tierna y con poca baba. Listo para el comal o ensalada de nopales."
  },
  {
    id: "p-5",
    name: "Amaranto y Alegrías Artesanales con Miel",
    producerId: "prod-3",
    producerName: "Cooperativa Semilla Viva",
    municipality: "Tetela del Volcán",
    price: 45,
    unit: "paquete (6 barras surtidas)",
    image: "assets/img/prod_amaranto.jpg",
    isPreventa: false,
    harvestDate: "Empacado fresco",
    stock: 75,
    category: "Granos y Transformados",
    tags: ["Superalimento", "Miel pura", "Tradicional"],
    description: "Endulzadas con miel de monte y pepitas tostadas. Alimento prehispánico de alta energía."
  },
  {
    id: "p-6",
    name: "Arroz Morelos D.O. Extra Fino",
    producerId: "prod-6",
    producerName: "Molino Artesanal San José",
    municipality: "Cuautla",
    price: 52,
    unit: "kg",
    image: "assets/img/prod_arroz.jpg",
    isPreventa: false,
    harvestDate: "Cosecha reciente 2026",
    stock: 200,
    category: "Granos y Transformados",
    tags: ["Denominación de Origen", "Calidad Gourmet", "Morelos"],
    description: "El mejor arroz de México. Absorbe el triple de caldo y no se bate jamás."
  },
  {
    id: "p-7",
    name: "Ciruela Jocote de Temporada",
    producerId: "prod-2",
    producerName: "Doña Lupita Salgado",
    municipality: "Yecapixtla",
    price: 40,
    unit: "kg",
    image: "assets/img/prod_ciruela.jpg",
    isPreventa: true,
    harvestDate: "Cosecha fin de semana",
    stock: 35,
    category: "Frutas",
    tags: ["De temporada", "Dulce y acidita", "Recolección a mano"],
    description: "Jocote rojo y amarillo tradicional de Morelos, jugoso y refrescante."
  },
  {
    id: "p-8",
    name: "Ramo Fresco de Flores del Campo",
    producerId: "prod-5",
    producerName: "Floricultores del Río",
    municipality: "Cuautla",
    price: 110,
    unit: "ramo artesanal",
    image: "assets/img/prod_flores.jpg",
    isPreventa: false,
    harvestDate: "Corte matutino",
    stock: 25,
    category: "Flores y Plantas",
    tags: ["Larga duración", "Aroma natural", "Empaque kraft"],
    description: "Arreglo con gerberas, follaje fino y flores de campo morelense envuelto en papel craft."
  },
  {
    id: "p-9",
    name: "Ejote Criollo Tierno",
    producerId: "prod-1",
    producerName: "Don Chente Gómez",
    municipality: "Tlayacapan",
    price: 30,
    unit: "kg",
    image: "assets/img/prod_ejote.jpg",
    isPreventa: true,
    harvestDate: "Corte este Jueves",
    stock: 40,
    category: "Hortalizas",
    tags: ["Tierno sin hebra", "Bioinsumos", "Rico en hierro"],
    description: "Vaina crocante, sin hebras duras, cosechado a mano en milpa asociada."
  }
];

const INITIAL_EVENTS = [
  {
    id: "ev-1",
    type: "feria",
    title: "Gran Feria 'Del Campo a Tu Mesa'",
    date: "Próximo Domingo 15 de Noviembre · 9:00 a 16:00 hrs",
    location: "Zócalo de Cuautla, Morelos (Frente al Palacio Municipal)",
    municipality: "Cuautla",
    description: "Más de 35 productores de todo Morelos. Conoce a quien siembra tus alimentos, prueba cosechas frescas, degusta comida típica y recoge tus pedidos sin costo de envío.",
    image: "assets/img/feria.jpg",
    attendeesCount: 420,
    pickupAvailable: true
  },
  {
    id: "ev-2",
    type: "taller",
    title: "Taller Práctico: Huerto Biointensivo en Casa",
    date: "Sábado 21 de Noviembre · 10:00 a 13:00 hrs",
    location: "Huerto Comunitario El Caracol, Yautepec",
    municipality: "Yautepec",
    instructor: "Valeria Soto (Joven estudiante de Agronomía UAEM)",
    price: 180,
    capacity: 20,
    bookedCount: 14,
    description: "Aprende a germinar, preparar sustratos vivos y asociar cultivos para tener tus propias hortalizas en azotea o jardín. Incluye kit de semillas criollas y constancia.",
    image: "assets/img/taller_huerto.jpg",
    pickupAvailable: false
  },
  {
    id: "ev-3",
    type: "campamento",
    title: "Campamento 'Pequeños Cosechadores' (Para niños y familias)",
    date: "28 y 29 de Noviembre · Fin de semana en el campo",
    location: "Rancho El Fresno, Tlayacapan",
    municipality: "Tlayacapan",
    instructor: "Don Chente Gómez y Jóvenes Promotores",
    price: 450,
    capacity: 25,
    bookedCount: 19,
    description: "Fin de semana en el campo: pizca de jitomates, noche de fogata, historias del volcán y taller de tortillas de maíz nixtamalizado.",
    image: "assets/img/familia_productora.jpg",
    pickupAvailable: false
  }
];

const INITIAL_ZAFRA_ROUTES = [
  {
    id: "ruta-1",
    name: "Ruta 1. Cuautla–Yautepec",
    shortName: "Cuautla–Yautepec",
    color: "#10b981",
    locations: ["Cuautla", "Yautepec", "Ayala", "Yecapixtla"],
    workshops: [
      "Cultivo de hortalizas",
      "Fotografía de productos",
      "Comercialización digital",
      "Preparación de alimentos regionales",
      "Empaquetado de productos agrícolas"
    ],
    products: [
      "Arroz", "Maíz", "Sorgo", "Cebolla", "Jitomate", "Ejote", "Elote", "Hortalizas", "Aguacate", "Quesos artesanales"
    ],
    description: "Conexión estratégica entre el valle arrocero de Cuautla, hortalizas de Yautepec y la tradición gastronómica de Yecapixtla y Ayala."
  },
  {
    id: "ruta-2",
    name: "Ruta 2. Altos de Morelos",
    shortName: "Altos de Morelos",
    color: "#38bdf8",
    locations: ["Tlalnepantla", "Tlayacapan", "Totolapan", "Ocuituco", "Tetela del Volcán", "Hueyapan"],
    workshops: [
      "Cultivo y aprovechamiento del nopal",
      "Cosecha de aguacate",
      "Preparación de conservas",
      "Elaboración de platillos regionales",
      "Cultivo de árboles frutales"
    ],
    products: [
      "Nopal", "Aguacate", "Durazno", "Miel", "Hortalizas", "Quesos artesanales"
    ],
    description: "Tierras altas volcánicas caracterizadas por microclimas templados, nopales de exportación, aguacate hass y huertos frutales."
  },
  {
    id: "ruta-3",
    name: "Ruta 3. Oriente de Morelos",
    shortName: "Oriente de Morelos",
    color: "#f59e0b",
    locations: ["Temoac", "Axochiapan", "Tepalcingo", "Jantetelco", "Jonacatepec"],
    workshops: [
      "Elaboración de dulces de amaranto",
      "Empaquetado y etiquetado",
      "Transformación de frutas",
      "Preparación de conservas",
      "Emprendimiento agroalimentario"
    ],
    products: [
      "Amaranto", "Alegrías", "Obleas", "Palanquetas", "Higo", "Maíz", "Sorgo", "Miel", "Frutas de temporada"
    ],
    description: "Cuna milenaria del amaranto nativo, dulces tradicionales, higo de temporal y granos básicos en los valles del sureste."
  },
  {
    id: "ruta-4",
    name: "Ruta 4. Sur de Morelos",
    shortName: "Sur de Morelos",
    color: "#ec4899",
    locations: ["Jojutla", "Zacatepec", "Tlaltizapán", "Tlaquiltenango", "Puente de Ixtla", "Mazatepec"],
    workshops: [
      "Cocina con arroz morelense",
      "Elaboración de salsas",
      "Preparación de conservas",
      "Transformación de productos agrícolas",
      "Visitas educativas a productores"
    ],
    products: [
      "Arroz", "Caña de azúcar", "Limón", "Naranja", "Mango", "Agave", "Quesos artesanales"
    ],
    description: "Valle cálido y cañero por excelencia, bañado por ríos y manantiales, con denominación de origen de arroz y cítricos."
  },
  {
    id: "ruta-5",
    name: "Ruta 5. Flores y viveros",
    shortName: "Flores y viveros",
    color: "#a855f7",
    locations: ["Cuernavaca", "Jiutepec", "Temixco", "Emiliano Zapata", "Xochitepec", "Tepoztlán", "Yautepec"],
    workshops: [
      "Elaboración de arreglos florales",
      "Propagación de plantas",
      "Creación de huertos urbanos",
      "Diseño de jardines",
      "Compostaje"
    ],
    products: [
      "Nochebuena", "Cempasúchil", "Rosas", "Gladiolas", "Crisantemos", "Plantas ornamentales", "Plantas aromáticas", "Kits de cultivo"
    ],
    description: "El cinturón florícola y viverista más importante del estado, capital botánica con producción de flor de corte y ornato."
  },
  {
    id: "ruta-6",
    name: "Ruta 6. Acuicultura y producción de granja",
    shortName: "Acuicultura y granja",
    color: "#06b6d4",
    locations: ["Cuautla", "Ayala", "Temixco"],
    workshops: [
      "Introducción a la acuicultura",
      "Cuidado del agua",
      "Producción de alimentos",
      "Cocina con pescado"
    ],
    products: [
      "Tilapia", "Otros pescados de granja", "Huevo de libre pastoreo", "Carne de ave", "Carne de cerdo", "Carne de res"
    ],
    description: "Zonas con unidades productivas confirmadas de estanques acuícolas, granjas avícolas y pecuarias sustentables."
  }
];

const INITIAL_MAP_MUNICIPALITIES = [
  // 15 Municipios exactos de la imagen de referencia (Tabla y Mapa)
  {
    num: 1,
    name: "Ayala",
    rating: 4.2,
    lat: 18.7667,
    lng: -98.9833,
    productsSummary: "Caña de azúcar, sorgo, maíz y otros cultivos agrícolas.",
    routeIds: ["ruta-1", "ruta-6"]
  },
  {
    num: 2,
    name: "Cuautla",
    rating: 4.5,
    lat: 18.8122,
    lng: -98.9556,
    productsSummary: "Arroz morelense, caña de azúcar, hortalizas, cebolla y granos.",
    routeIds: ["ruta-1", "ruta-6"]
  },
  {
    num: 3,
    name: "Yecapixtla",
    rating: 4.5,
    lat: 18.8847,
    lng: -98.8631,
    productsSummary: "Aguacate, quesos artesanales, miel y cultivos agrícolas.",
    routeIds: ["ruta-1"]
  },
  {
    num: 4,
    name: "Tlalnepantla",
    rating: 4.3,
    lat: 19.0083,
    lng: -98.9972,
    productsSummary: "Nopal verdura y aguacate.",
    routeIds: ["ruta-2"]
  },
  {
    num: 5,
    name: "Ocuituco",
    rating: 4.4,
    lat: 18.8789,
    lng: -98.7758,
    productsSummary: "Aguacate, durazno y miel.",
    routeIds: ["ruta-2"]
  },
  {
    num: 6,
    name: "Jojutla",
    rating: 4.6,
    lat: 18.6167,
    lng: -99.1833,
    productsSummary: "Arroz, caña de azúcar y quesos artesanales de Tehuixtla.",
    routeIds: ["ruta-4"]
  },
  {
    num: 7,
    name: "Puente de Ixtla",
    rating: 4.1,
    lat: 18.6167,
    lng: -99.3167,
    productsSummary: "Mango, arroz, agave y quesos artesanales de Tilzapotla.",
    routeIds: ["ruta-4"]
  },
  {
    num: 8,
    name: "Temoac",
    rating: 4.0,
    lat: 18.7733,
    lng: -98.7767,
    productsSummary: "Amaranto, alegrías, obleas y palanquetas artesanales.",
    routeIds: ["ruta-3"]
  },
  {
    num: 9,
    name: "Axochiapan",
    rating: 4.2,
    lat: 18.5028,
    lng: -98.7514,
    productsSummary: "Higo y otros cultivos agrícolas de la región oriental.",
    routeIds: ["ruta-3"]
  },
  {
    num: 10,
    name: "Huitzilac",
    rating: 4.5,
    lat: 19.0306,
    lng: -99.2689,
    productsSummary: "Quesos artesanales y productos lácteos.",
    routeIds: ["ruta-5"]
  },
  {
    num: 11,
    name: "Yautepec",
    rating: 4.4,
    lat: 18.8822,
    lng: -99.0664,
    productsSummary: "Caña de azúcar, arroz y plantas ornamentales, incluida la nochebuena.",
    routeIds: ["ruta-1", "ruta-5"]
  },
  {
    num: 12,
    name: "Temixco",
    rating: 4.2,
    lat: 18.8547,
    lng: -99.2269,
    productsSummary: "Rosas de corte y otros productos ornamentales.",
    routeIds: ["ruta-5", "ruta-6"]
  },
  {
    num: 13,
    name: "Jiutepec",
    rating: 4.3,
    lat: 18.8803,
    lng: -99.1764,
    productsSummary: "Rosas, nochebuena y plantas ornamentales.",
    routeIds: ["ruta-5"]
  },
  {
    num: 14,
    name: "Tepoztlán",
    rating: 4.7,
    lat: 18.9864,
    lng: -99.1008,
    productsSummary: "Nopal, flores de temporada y plantas ornamentales.",
    routeIds: ["ruta-5"]
  },
  {
    num: 15,
    name: "Tlayacapan",
    rating: 4.6,
    lat: 18.9567,
    lng: -98.9819,
    productsSummary: "Nopal verdura y productos agrícolas de temporada.",
    routeIds: ["ruta-2"]
  },
  // Municipios y sedes complementarias de las 6 Rutas de Zafra
  {
    num: 16,
    name: "Cuernavaca",
    rating: 4.8,
    lat: 18.9242,
    lng: -99.2216,
    productsSummary: "Centro de distribución estatal, viveros y hortalizas urbanas.",
    routeIds: ["ruta-5"]
  },
  {
    num: 17,
    name: "Tetela del Volcán",
    rating: 5.0,
    lat: 18.8925,
    lng: -98.7292,
    productsSummary: "Aguacate hass de altura, durazno criollo, ciruela y amaranto.",
    routeIds: ["ruta-2"]
  },
  {
    num: 18,
    name: "Totolapan",
    rating: 4.4,
    lat: 18.9861,
    lng: -98.9208,
    productsSummary: "Cultivo de nopal verdura, aguacate y hortalizas de temporal.",
    routeIds: ["ruta-2"]
  },
  {
    num: 19,
    name: "Hueyapan",
    rating: 4.8,
    lat: 18.8833,
    lng: -98.6917,
    productsSummary: "Frutales de clima frío, hierbas medicinales, aguacate y quesos.",
    routeIds: ["ruta-2"]
  },
  {
    num: 20,
    name: "Tepalcingo",
    rating: 4.3,
    lat: 18.5994,
    lng: -98.8475,
    productsSummary: "Dulces tradicionales, sorgo, maíz y empaque artesanal.",
    routeIds: ["ruta-3"]
  },
  {
    num: 21,
    name: "Jantetelco",
    rating: 4.2,
    lat: 18.7167,
    lng: -98.7733,
    productsSummary: "Dulces de amaranto, higo y granos básicos de la región.",
    routeIds: ["ruta-3"]
  },
  {
    num: 22,
    name: "Jonacatepec",
    rating: 4.4,
    lat: 18.6833,
    lng: -98.8000,
    productsSummary: "Cebolla, arroz, maíz y frutas de temporada.",
    routeIds: ["ruta-3"]
  },
  {
    num: 23,
    name: "Zacatepec",
    rating: 4.5,
    lat: 18.6583,
    lng: -99.1950,
    productsSummary: "Caña de azúcar, melaza y productos del ingenio Emiliano Zapata.",
    routeIds: ["ruta-4"]
  },
  {
    num: 24,
    name: "Tlaltizapán",
    rating: 4.3,
    lat: 18.6861,
    lng: -99.1194,
    productsSummary: "Arroz morelense, cítricos, caña y hortalizas de riego.",
    routeIds: ["ruta-4"]
  },
  {
    num: 25,
    name: "Tlaquiltenango",
    rating: 4.2,
    lat: 18.6292,
    lng: -99.1600,
    productsSummary: "Agave mezcalero, quesos de cincho, caña de azúcar y miel.",
    routeIds: ["ruta-4"]
  },
  {
    num: 26,
    name: "Mazatepec",
    rating: 4.1,
    lat: 18.7183,
    lng: -99.3667,
    productsSummary: "Mango, cítricos, cacahuate y quesos artesanales.",
    routeIds: ["ruta-4"]
  },
  {
    num: 27,
    name: "Emiliano Zapata",
    rating: 4.4,
    lat: 18.8333,
    lng: -99.1833,
    productsSummary: "Viveros ornamentales, plantas aromáticas y huertos.",
    routeIds: ["ruta-5"]
  },
  {
    num: 28,
    name: "Xochitepec",
    rating: 4.3,
    lat: 18.7833,
    lng: -99.2333,
    productsSummary: "Viveros botánicos, nochebuenas, rosas y flor de corte.",
    routeIds: ["ruta-5"]
  }
];

const INITIAL_ZAFRA_FAIRS = [
  { id: "f-1", name: "Feria de la Tierra", type: "Feria General", date: "8 de Noviembre", location: "Zócalo de Tepoztlán", focus: "Sustentabilidad, semillas criollas y cuidado del suelo." },
  { id: "f-2", name: "Feria de Sabores de Morelos", type: "Gastronómica", date: "15 de Noviembre", location: "Zócalo de Cuautla", focus: "Platillos tradicionales, degustaciones y cocina campesina." },
  { id: "f-3", name: "Feria Joven del Campo", type: "Juventudes", date: "22 de Noviembre", location: "Campus Chamilpa UAEM, Cuernavaca", focus: "Encuentro de brigadistas universitarios y jóvenes productores." },
  { id: "f-4", name: "Feria de Flores y Huertos", type: "Ornamental", date: "29 de Noviembre", location: "Parque Acuático Oaxtepec / Yautepec", focus: "Venta de ornatos, nochebuenas, rosas y talleres de huerto." },
  { id: "f-5", name: "Feria Itinerante de Productores", type: "Itinerante", date: "6 de Diciembre", location: "Plaza Cívica de Ayala", focus: "Comercio directo a pie de comunidad sin intermediarios." },
  { id: "f-6", name: "Feria del Arroz Morelense", type: "Especializada", date: "13 de Diciembre", location: "Molino San José, Jojutla", focus: "Celebración del grano con Denominación de Origen Morelos." },
  { id: "f-7", name: "Feria del Amaranto y los Dulces Regionales", type: "Especializada", date: "20 de Diciembre", location: "Centro Comunitario Temoac", focus: "Alegrías, obleas, palanquetas y dulces tradicionales." },
  { id: "f-8", name: "Feria del Nopal y el Aguacate", type: "Especializada", date: "10 de Enero", location: "Plaza Principal Tlalnepantla", focus: "Variedades de nopal verdura, aguacate hass y conservas." },
  { id: "f-9", name: "Feria de Quesos Artesanales y Miel", type: "Especializada", date: "17 de Enero", location: "Tehuixtla / Puente de Ixtla", focus: "Quesos de cincho, panela artesanal y mieles multiflorales." },
  { id: "f-10", name: "Feria de Frutas de Temporada", type: "Cosecha", date: "24 de Enero", location: "Huerta Colectiva Yecapixtla", focus: "Ciruela jocote, mango criollo, higo, durazno y mermeladas." },
  { id: "f-11", name: "Mercado de Productores Locales", type: "Mercado", date: "Cada Sábado", location: "Explanada Municipal Yautepec", focus: "Venta continua de despensas frescas de temporada." },
  { id: "f-12", name: "Exposición de Emprendimientos Agroalimentarios Juveniles", type: "Emprendimiento", date: "7 de Febrero", location: "Centro de Congresos Cuernavaca", focus: "Muestra de innovación de estudiantes de servicio social." }
];

const INITIAL_REGIONS = INITIAL_ZAFRA_ROUTES;

const INITIAL_YOUTH_ROUTES = [
  {
    id: "route-1",
    youthName: "Valeria Soto Díaz",
    university: "UAEM - Fac. de Ciencias Agropecuarias (Agronomía)",
    matricula: "UAEM-2022-7819",
    totalHoursNeeded: 480,
    hoursCompleted: 342,
    stops: [
      {
        id: "stop-101",
        orderId: "PED-2026-081",
        clientName: "Laura Patricia Romero",
        address: "Av. Insurgentes #45, Col. Emiliano Zapata, Cuautla",
        phone: "735-123-4567",
        window: "10:00 - 11:30 hrs",
        status: "completed",
        itemsSummary: "2 kg Jitomate, 1 docena Elote blanco, 1 kg Arroz Morelos",
        total: 181,
        paymentMethod: "Pagado SPEI",
        deliveryType: "Domicilio (Bicicleta de reparto)"
      },
      {
        id: "stop-102",
        orderId: "PED-2026-084",
        clientName: "Rodrigo Morales V.",
        address: "Calle Galeana #12, Yautepec Centro",
        phone: "735-987-6543",
        window: "12:00 - 13:00 hrs",
        status: "pending",
        itemsSummary: "1 Canasta semanal sorpresa, 1 kg Mango criollo",
        total: 288,
        paymentMethod: "Efectivo contra entrega",
        deliveryType: "Punto de acopio regional Yautepec"
      },
      {
        id: "stop-103",
        orderId: "PED-2026-087",
        clientName: "Familia Cárdenas",
        address: "Zócalo de Cuautla (Stand 4 Feria Campesina)",
        phone: "735-444-2211",
        window: "14:00 - 15:30 hrs",
        status: "pending",
        itemsSummary: "2 paquetes Alegrías amaranto, 1 ramo Flores",
        total: 200,
        paymentMethod: "Tarjeta en línea",
        deliveryType: "Recoger en la Feria"
      }
    ]
  }
];

const INITIAL_ADMIN_KPIS = {
  activeProducers: 34,
  extraIncomeGenerated: 142800, // En pesos mexicanos directos al productor
  totalOrders: 1240,
  repeatCustomerRate: 74, // %
  youthTrained: 28,
  socialServiceHours: 8960,
  foodWasteAvoidedKg: 3420, // Kg de mermas evitadas por preventa
  commissionRate: 10 // % para sostener logística y seguro estudiantil
};

const INITIAL_ORDERS = [
  {
    id: "PED-2026-081",
    date: "Hoy, 10:15 am",
    status: "en_camino", // confirmado -> en_cosecha -> en_camino -> entregado
    deliveryType: "domicilio",
    deliveryAddress: "Av. Insurgentes #45, Col. Emiliano Zapata, Cuautla",
    assignedYouth: "Valeria Soto (Agronomía UAEM)",
    youthPhone: "735-123-4567",
    paymentMethod: "SPEI Transferencia",
    items: [
      { name: "Jitomate Riñón Criollo", qty: 2, price: 32, unit: "kg", producer: "Don Chente Gómez" },
      { name: "Elote Blanco Tiernito", qty: 1, price: 65, unit: "docena", producer: "Familia Flores" },
      { name: "Arroz Morelos D.O.", qty: 1, price: 52, unit: "kg", producer: "Molino San José" }
    ],
    subtotal: 181,
    shippingCost: 25,
    total: 206
  }
];

const INITIAL_CHAT = [
  { id: 1, sender: "Valeria (Repartidora)", role: "joven", text: "¡Hola doña Laura! Ya pasé a recoger los jitomates al rancho de don Chente. Voy en camino en mi bici hacia su domicilio.", time: "10:30 am" },
  { id: 2, sender: "Laura Romero (Tú)", role: "consumidor", text: "¡Muchas gracias Valeria! Aquí te espero, tocar el zaguán negro por favor.", time: "10:32 am" },
  { id: 3, sender: "Don Chente (Productor)", role: "productor", text: "Van bien frescos de la mata cortados hoy a las 6:30 am. ¡Que los disfruten!", time: "10:34 am" }
];

const INITIAL_USER_PROFILE = {
  name: "Laura Patricia Romero",
  email: "laura.romero@morelos.mx",
  phone: "735-123-4567",
  address: "Av. Insurgentes #45, Col. Emiliano Zapata",
  municipality: "Cuautla",
  references: "Casa de dos pisos con zaguán negro junto a la farmacia",
  preferredTime: "Matutino (10:00 - 13:00 hrs)",
  purchasesThisMonth: 3,
  goalPurchases: 4,
  loyaltyPoints: 340,
  rewardActive: true,
  rewardCoupon: "ENVIO-GRATIS-ZAFRA"
};

// Store Wrapper con tolerancia a fallos
class DataStore {
  constructor() {
    this.init();
  }

  init() {
    try {
      const DATA_VERSION = "zafra_v4_prod_clean";
      if (localStorage.getItem("rm_zafra_version") !== DATA_VERSION) {
        localStorage.setItem("rm_zafra_routes", JSON.stringify(INITIAL_ZAFRA_ROUTES));
        localStorage.setItem("rm_map_municipalities", JSON.stringify(INITIAL_MAP_MUNICIPALITIES));
        localStorage.setItem("rm_zafra_fairs", JSON.stringify(INITIAL_ZAFRA_FAIRS));
        localStorage.setItem("rm_regions", JSON.stringify(INITIAL_ZAFRA_ROUTES));
        localStorage.setItem("rm_producers", JSON.stringify(INITIAL_PRODUCERS));
        localStorage.setItem("rm_products", JSON.stringify(INITIAL_PRODUCTS));
        localStorage.setItem("rm_events", JSON.stringify(INITIAL_EVENTS));
        localStorage.setItem("rm_youth", JSON.stringify(INITIAL_YOUTH_ROUTES));
        localStorage.setItem("rm_admin_kpis", JSON.stringify(INITIAL_ADMIN_KPIS));
        localStorage.setItem("rm_user_profile", JSON.stringify(INITIAL_USER_PROFILE));
        localStorage.setItem("rm_zafra_version", DATA_VERSION);
      }

      if (!localStorage.getItem("rm_producers")) {
        localStorage.setItem("rm_producers", JSON.stringify(INITIAL_PRODUCERS));
      }
      if (!localStorage.getItem("rm_products")) {
        localStorage.setItem("rm_products", JSON.stringify(INITIAL_PRODUCTS));
      }
      if (!localStorage.getItem("rm_events")) {
        localStorage.setItem("rm_events", JSON.stringify(INITIAL_EVENTS));
      }
      if (!localStorage.getItem("rm_youth")) {
        localStorage.setItem("rm_youth", JSON.stringify(INITIAL_YOUTH_ROUTES));
      }
      if (!localStorage.getItem("rm_admin_kpis")) {
        localStorage.setItem("rm_admin_kpis", JSON.stringify(INITIAL_ADMIN_KPIS));
      }
      if (!localStorage.getItem("rm_cart")) {
        localStorage.setItem("rm_cart", JSON.stringify([]));
      }
      if (!localStorage.getItem("rm_consumer_orders")) {
        localStorage.setItem("rm_consumer_orders", JSON.stringify(INITIAL_ORDERS));
      }
      if (!localStorage.getItem("rm_chat")) {
        localStorage.setItem("rm_chat", JSON.stringify(INITIAL_CHAT));
      }
      if (!localStorage.getItem("rm_user_profile")) {
        localStorage.setItem("rm_user_profile", JSON.stringify(INITIAL_USER_PROFILE));
      }
    } catch (e) {
      console.warn("Storage warning in DataStore init:", e);
    }
  }

  getProducers() {
    try {
      const data = localStorage.getItem("rm_producers");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCERS;
    } catch (e) {
      return INITIAL_PRODUCERS;
    }
  }

  saveProducers(data) {
    try {
      localStorage.setItem("rm_producers", JSON.stringify(data));
    } catch (e) {}
  }

  getProducts() {
    try {
      const data = localStorage.getItem("rm_products");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  }

  saveProducts(data) {
    try {
      localStorage.setItem("rm_products", JSON.stringify(data));
    } catch (e) {}
  }

  getEvents() {
    try {
      const data = localStorage.getItem("rm_events");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_EVENTS;
    } catch (e) {
      return INITIAL_EVENTS;
    }
  }

  saveEvents(data) {
    try {
      localStorage.setItem("rm_events", JSON.stringify(data));
    } catch (e) {}
  }

  getRegions() {
    return this.getZafraRoutes();
  }

  getZafraRoutes() {
    try {
      const data = localStorage.getItem("rm_zafra_routes");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ZAFRA_ROUTES;
    } catch (e) {
      return INITIAL_ZAFRA_ROUTES;
    }
  }

  getMapMunicipalities() {
    try {
      const data = localStorage.getItem("rm_map_municipalities");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_MAP_MUNICIPALITIES;
    } catch (e) {
      return INITIAL_MAP_MUNICIPALITIES;
    }
  }

  getZafraFairs() {
    try {
      const data = localStorage.getItem("rm_zafra_fairs");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ZAFRA_FAIRS;
    } catch (e) {
      return INITIAL_ZAFRA_FAIRS;
    }
  }

  getYouth() {
    try {
      const data = localStorage.getItem("rm_youth");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_YOUTH_ROUTES;
    } catch (e) {
      return INITIAL_YOUTH_ROUTES;
    }
  }

  saveYouth(data) {
    try {
      localStorage.setItem("rm_youth", JSON.stringify(data));
    } catch (e) {}
  }

  getAdminKPIs() {
    try {
      const data = localStorage.getItem("rm_admin_kpis");
      const parsed = data ? JSON.parse(data) : null;
      return parsed && typeof parsed === "object" ? parsed : INITIAL_ADMIN_KPIS;
    } catch (e) {
      return INITIAL_ADMIN_KPIS;
    }
  }

  saveAdminKPIs(data) {
    try {
      localStorage.setItem("rm_admin_kpis", JSON.stringify(data));
    } catch (e) {}
  }

  getCart() {
    try {
      const data = localStorage.getItem("rm_cart");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) ? parsed : [];
    } catch (e) {
      return [];
    }
  }

  saveCart(data) {
    try {
      localStorage.setItem("rm_cart", JSON.stringify(data));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent("cart-updated", { detail: data }));
  }

  addToCart(productId, qty = 1) {
    const products = this.getProducts();
    const product = products.find(p => p.id === productId);
    if (!product) return;

    let cart = this.getCart();
    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        unit: product.unit,
        image: product.image,
        producerName: product.producerName,
        producerId: product.producerId,
        municipality: product.municipality,
        isPreventa: product.isPreventa,
        harvestDate: product.harvestDate,
        qty: qty
      });
    }
    this.saveCart(cart);
  }

  updateCartQty(productId, qty) {
    let cart = this.getCart();
    if (qty <= 0) {
      cart = cart.filter(item => item.id !== productId);
    } else {
      const item = cart.find(i => i.id === productId);
      if (item) item.qty = qty;
    }
    this.saveCart(cart);
  }

  clearCart() {
    this.saveCart([]);
  }

  getConsumerOrders() {
    try {
      const data = localStorage.getItem("rm_consumer_orders");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  }

  saveConsumerOrders(orders) {
    try {
      localStorage.setItem("rm_consumer_orders", JSON.stringify(orders));
    } catch (e) {}
  }

  getChat() {
    try {
      const data = localStorage.getItem("rm_chat");
      const parsed = data ? JSON.parse(data) : null;
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : INITIAL_CHAT;
    } catch (e) {
      return INITIAL_CHAT;
    }
  }

  addChatMessage(sender, role, text) {
    const chat = this.getChat();
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    chat.push({ id: Date.now(), sender, role, text, time });
    try {
      localStorage.setItem("rm_chat", JSON.stringify(chat));
    } catch (e) {}
    window.dispatchEvent(new CustomEvent("chat-updated", { detail: chat }));
  }

  getUserProfile() {
    try {
      const data = localStorage.getItem("rm_user_profile");
      const parsed = data ? JSON.parse(data) : null;
      return parsed && typeof parsed === "object" ? parsed : INITIAL_USER_PROFILE;
    } catch (e) {
      return INITIAL_USER_PROFILE;
    }
  }

  saveUserProfile(profile) {
    try {
      localStorage.setItem("rm_user_profile", JSON.stringify(profile));
    } catch (e) {}
  }
}

export const store = new DataStore();
