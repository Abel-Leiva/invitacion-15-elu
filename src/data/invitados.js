const invitados = [
  {
    id: 1,
    nombre: "Flia Rebollo - Cardozo",
    tipo: "familia",
    integrantes: [
      { nombre: "Carlos" },
      { nombre: "Raquel" },
      { nombre: "Agustina" },
      { nombre: "Lautaro" },
    ],
  },

  {
    id: 2,
    nombre: "Flia Figueroa - Cardozo",
    tipo: "familia",
    integrantes: [
      { nombre: "Ricardo" },
      { nombre: "Carolina" },
      { nombre: "Francisco" },
      { nombre: "Valentina" },
    ],
  },

  {
    id: 3,
    nombre: "Flia Cardozo - Rodríguez",
    tipo: "familia",
    integrantes: [
      { nombre: "Elizabeth" },
      { nombre: "Ricardo" },
      { nombre: "Lourdes" },
      { nombre: "Bruno" },
      { nombre: "Felipe" },
    ],
  },

  {
    id: 4,
    nombre: "Flia Bernachea - Cardozo",
    tipo: "familia",
    integrantes: [
      { nombre: "Daniela" },
      { nombre: "David" },
      { nombre: "Zoe" },
    ],
  },

  {
    id: 5,
    nombre: "Flia Mustafa - Tejerina",
    tipo: "familia",
    integrantes: [{ nombre: "Liliana" }, { nombre: "Jesús" }],
  },

  {
    id: 6,
    nombre: "Flia Cardozo - Cazón",
    tipo: "familia",
    integrantes: [{ nombre: "Osmar" }, { nombre: "Angelina" }],
  },

  {
    id: 7,
    nombre: "Flia Cardozo - Cazón",
    tipo: "familia",
    integrantes: [{ nombre: "Lionel" }, { nombre: "Lucila" }],
  },

  {
    id: 8,
    nombre: "Cardozo Romina y Flia",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Romina" }, { nombre: "Esteban" }],
  },

  {
    id: 9,
    nombre: "Flia Ortiz - Cardozo",
    tipo: "familia",
    integrantes: [
      { nombre: "Darío" },
      { nombre: "Erika" },
      { nombre: "Santiago" },
      { nombre: "Guadalupe" },
    ],
  },

  {
    id: 10,
    nombre: "Flia Castro - Cardozo",
    tipo: "familia",
    integrantes: [
      { nombre: "Axel" },
      { nombre: "Milagros" },
      { nombre: "Bautista" },
      { nombre: "Alma" },
    ],
  },

  {
    id: 11,
    nombre: "Cardozo Belén",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Belén" }],
  },

  {
    id: 12,
    nombre: "Cardozo Leila",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Leila" }, { nombre: "Invitado" }],
  },

  {
    id: 13,
    nombre: "Cardozo Gonzalo",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Gonzalo" }, { nombre: "Invitado" }],
  },

  {
    id: 14,
    nombre: "Cardozo Rodrigo",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Rodrigo" }, { nombre: "Invitado" }],
  },

  {
    id: 15,
    nombre: "Señor Cazón Antonio",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Antonio" }],
  },

  {
    id: 16,
    nombre: "Alejandro Farfán y familia",
    tipo: "familia",
    integrantes: [
      { nombre: "Alejandro" },
      { nombre: "Invitado" },
      { nombre: "Invitado" },
      { nombre: "Invitado" },
      { nombre: "Invitado" },
    ],
  },

  {
    id: 17,
    nombre: "Miranda Elizabeth",
    tipo: "individual",
    invitado: true,
    integrantes: [
      { nombre: "Elizabeth" },
      { nombre: "Invitado" },
      { nombre: "Invitado" },
      { nombre: "Invitado" },
    ],
  },

  {
    id: 18,
    nombre: "Flia Medrano - Mendoza",
    tipo: "familia",
    integrantes: [
      { nombre: "Pablo" },
      { nombre: "Rocío" },
      { nombre: "Maximiliano" },
    ],
  },

  {
    id: 19,
    nombre: "Mendoza Jennifer",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Jennifer" }, { nombre: "Invitado" }],
  },

  {
    id: 20,
    nombre: "Cardozo Jorge",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Jorge" }, { nombre: "Invitado" }],
  },

  {
    id: 21,
    nombre: "Jaime Javier",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Javier" }, { nombre: "Invitado" }],
  },

  {
    id: 22,
    nombre: "Nadia Arias y Flia",
    tipo: "familia",
    integrantes: [
      { nombre: "Nadia" },
      { nombre: "Isabela" },
      { nombre: "Gladys" },
    ],
  },

  {
    id: 23,
    nombre: "Cintia",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Cintia" }, { nombre: "Invitado" }],
  },

  {
    id: 24,
    nombre: "Leiva Hernán",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Hernán" }, { nombre: "Invitado" }],
  },

  {
    id: 25,
    nombre: "Leiva Mateo - Solís Florencia",
    tipo: "familia",
    integrantes: [{ nombre: "Mateo" }, { nombre: "Florencia" }],
  },

  {
    id: 26,
    nombre: "Leiva Paola y familia",
    tipo: "familia",
    integrantes: [
      { nombre: "Paola" },
      { nombre: "Ámbar" },
      { nombre: "Josefina" },
      { nombre: "Invitado" },
    ],
  },

  {
    id: 27,
    nombre: "Leiva Agustín",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Agustín" }, { nombre: "Invitado" }],
  },

  {
    id: 28,
    nombre: "Teiera Dana - Wolter ",
    tipo: "familia",
    invitado: true,
    integrantes: [{ nombre: "Dana" }, { nombre: "Wolter" }],
  },

  {
    id: 29,
    nombre: "Flia Del Bianco - Leiva",
    tipo: "familia",
    integrantes: [
      { nombre: "Victoria" },
      { nombre: "Uma" },
      { nombre: "Eluney" },
      { nombre: "Cataleya" },
      { nombre: "Bebé" },
    ],
  },

  {
    id: 30,
    nombre: "Leiva Tomás",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Tomás" }, { nombre: "Invitado" }],
  },

  {
    id: 31,
    nombre: "Argüello Carolina y familia",
    tipo: "familia",
    integrantes: [
      { nombre: "Carolina" },
      { nombre: "Kiara" },
      { nombre: "Invitado" },
    ],
  },

  {
    id: 32,
    nombre: "Jazmín",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Jazmín" }, { nombre: "Invitado" }],
  },

  {
    id: 33,
    nombre: "Leiva Sebastián",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Sebastián" }, { nombre: "Invitado" }],
  },

  {
    id: 34,
    nombre: "Teiera Salverina",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Salverina" }],
  },

  {
    id: 35,
    nombre: "Flia Torres - Farfán",
    tipo: "familia",
    integrantes: [
      { nombre: "Roxana" },
      { nombre: "Héctor" },
      { nombre: "Pedro" },
      { nombre: "Invitado" },
    ],
  },

  {
    id: 36,
    nombre: "Flia Cantero - Chaparro",
    tipo: "familia",
    integrantes: [{ nombre: "Cecilia" }, { nombre: "Ricardo" }],
  },

  {
    id: 37,
    nombre: "Flia Barraza - Reynoso",
    tipo: "familia",
    integrantes: [{ nombre: "Norma" }, { nombre: "Rafael" }],
  },

  {
    id: 38,
    nombre: "Flia Barraza - Barbosa",
    tipo: "familia",
    integrantes: [{ nombre: "Romina" }, { nombre: "Darío" }, { nombre: "Uma" }],
  },

  {
    id: 39,
    nombre: "Ayala Maia",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Maia" }],
  },

  {
    id: 40,
    nombre: "Torres Pilar",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Pilar" }],
  },

  {
    id: 41,
    nombre: "Barraza Priscila",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Priscila" }],
  },

  {
    id: 42,
    nombre: "García Dana",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Dana" }],
  },

  {
    id: 43,
    nombre: "Cantero Belén",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Belén" }],
  },

  {
    id: 44,
    nombre: "Romero Bárbara",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Bárbara" }],
  },

  {
    id: 45,
    nombre: "Benítez Iara",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Iara" }],
  },

  {
    id: 46,
    nombre: "Orte Caterín",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Caterín" }],
  },

  {
    id: 47,
    nombre: "Lagos Nicole",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Nicole" }],
  },

  {
    id: 48,
    nombre: "Lazarte Aarón",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Aarón" }],
  },

  {
    id: 49,
    nombre: "Ponce Tomás",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Tomás" }],
  },

  {
    id: 50,
    nombre: "Arévalo Lisandro",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Lisandro" }],
  },

  {
    id: 51,
    nombre: "Conca Juan",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Juan" }],
  },

  {
    id: 52,
    nombre: "Herrera David",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "David" }],
  },

  {
    id: 53,
    nombre: "Sánchez Tomás",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Tomás" }],
  },

  {
    id: 54,
    nombre: "Mereles Leandro",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Leandro" }],
  },

  {
    id: 55,
    nombre: "Bejer Tiziano",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Tiziano" }],
  },

  {
    id: 56,
    nombre: "Vallejos Benjamín",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Benjamín" }],
  },

  {
    id: 57,
    nombre: "Padula Francesca",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Francesca" }],
  },

  {
    id: 58,
    nombre: "Salto Victoria",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Victoria" }],
  },

  {
    id: 59,
    nombre: "Guardia Matías",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Matías" }],
  },

  {
    id: 60,
    nombre: "Asis Valentín",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Valentín" }],
  },

  {
    id: 61,
    nombre: "Sr. Vidal Cardozo",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Vidal Cardozo" }],
  },

  {
    id: 62,
    nombre: "Sra. Margarita Jaime",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Margarita Jaime" }],
  },

  {
    id: 63,
    nombre: "Gómez Hassan",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Hassan" }, { nombre: "Invitado" }],
  },

  {
    id: 64,
    nombre: "Gómez Kevin",
    tipo: "individual",
    invitado: true,
    integrantes: [{ nombre: "Kevin" }, { nombre: "Invitado" }],
  },

  {
    id: 65,
    nombre: "Hugo y Valeria y Flia.",
    tipo: "familia",
    integrantes: [{ nombre: "Hugo" }, { nombre: "Valeria" }],
  },

  {
    id: 66,
    nombre: "Farfán Marta",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Marta" }],
  },

  {
    id: 67,
    nombre: "Flia Urzagaste - Gutiérrez",
    tipo: "familia",
    integrantes: [
      { nombre: "Invitado" },
      { nombre: "Invitado" },
      { nombre: "Invitado" },
      { nombre: "Invitado" },
      { nombre: "Invitado" },
      { nombre: "Invitado" },
    ],
  },

  {
    id: 68,
    nombre: "Thiago Fleita ",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Valentín" }],
  },

  {
    id: 69,
    nombre: "Luz Martínez",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Valentín" }],
  },

  {
    id: 70,
    nombre: "Agustín Andrada",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Valentín" }],
  },

  {
    id: 71,
    nombre: "Francesca Padula",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Valentín" }],
  },

  {
    id: 72,
    nombre: "Jason Silva",
    tipo: "individual",
    invitado: false,
    integrantes: [{ nombre: "Valentín" }],
  },
];

export { invitados };
