const commons = (file, credit, license) => ({
  src: `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=1600`,
  href: `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file.replace(/ /g, "_"))}`,
  credit,
  license,
  real: true,
});

const flickr = (src, href, credit, license) => ({
  src,
  href,
  credit,
  license,
  real: true,
});

export const realPhotos = {
  ema: [
    flickr(
      "https://live.staticflickr.com/4173/33498272433_132c758047_b.jpg",
      "https://www.flickr.com/photos/7831824@N04/33498272433",
      "Bex Walton",
      "CC BY 2.0",
    ),
    flickr(
      "https://live.staticflickr.com/65535/52657051325_32d41421c0_b.jpg",
      "https://www.flickr.com/photos/39423133@N04/52657051325",
      "Debarshi Ray",
      "CC BY-SA 2.0",
    ),
    flickr(
      "https://live.staticflickr.com/65535/52987266538_6706d903cf_b.jpg",
      "https://www.flickr.com/photos/39423133@N04/52987266538",
      "Debarshi Ray",
      "CC BY-SA 2.0",
    ),
  ],
  onesip: [
    flickr(
      "https://live.staticflickr.com/2821/34325286835_f6026490d0_b.jpg",
      "https://www.flickr.com/photos/7831824@N04/34325286835",
      "Bex Walton",
      "CC BY 2.0",
    ),
    flickr(
      "https://live.staticflickr.com/2828/33499228063_51d4093899_b.jpg",
      "https://www.flickr.com/photos/7831824@N04/33499228063",
      "Bex Walton",
      "CC BY 2.0",
    ),
    flickr(
      "https://live.staticflickr.com/2855/33941352200_363412f8b3_b.jpg",
      "https://www.flickr.com/photos/7831824@N04/33941352200",
      "Bex Walton",
      "CC BY 2.0",
    ),
  ],
  savoy: [
    flickr(
      "https://live.staticflickr.com/6071/6023673336_6ef70a455b_b.jpg",
      "https://www.flickr.com/photos/9304567@N08/6023673336",
      "orangemania",
      "CC BY 2.0",
    ),
    commons("Café Savoy (Prague).jpg", "Derbrauni", "CC BY 4.0"),
    commons("Vítězná - Zborovská, Café Savoy.jpg", "ŠJů", "CC BY-SA 3.0"),
  ],
  louvre: [
    commons("Prague Café Louvre Interior 2.jpg", "Ymblanter", "CC BY-SA 4.0"),
    commons("Prague Café Louvre Interior 3.jpg", "Ymblanter", "CC BY-SA 4.0"),
    commons("Praha Café Louvre.JPG", "VitVit", "CC BY-SA 4.0"),
  ],
  imperial: [
    commons("Café Imperial 01.jpg", "Derbrauni", "CC BY 4.0"),
    commons("Cafe Imperial in Prague interior.jpg", "DIMSFIKAS", "CC BY-SA 3.0"),
    commons("Cafe Imperial in Prague.jpg", "DIMSFIKAS", "CC BY-SA 3.0"),
  ],
  eska: [
    commons("Eska Restaurant Prague (34800991860).jpg", "Nan Palmero", "CC BY 2.0"),
  ],
  lfleur: [
    flickr(
      "https://live.staticflickr.com/2839/33499131563_a699ab628d_b.jpg",
      "https://www.flickr.com/photos/7831824@N04/33499131563",
      "Bex Walton",
      "CC BY 2.0",
    ),
    flickr(
      "https://live.staticflickr.com/4186/34151317712_2d0dd3fdb5_b.jpg",
      "https://www.flickr.com/photos/7831824@N04/34151317712",
      "Bex Walton",
      "CC BY 2.0",
    ),
    flickr(
      "https://live.staticflickr.com/2827/33924730460_1e3e6c3d64_b.jpg",
      "https://www.flickr.com/photos/7831824@N04/33924730460",
      "Bex Walton",
      "CC BY 2.0",
    ),
  ],
  tygra: [
    commons("Gospoda U Zlateho Tygra - Praga.jpg", "Mohylek", "CC BY-SA 3.0"),
    commons("U zlatého tygra (Staré Město)-2.jpg", "Yair-haklai", "CC BY-SA 4.0"),
  ],
  "lokal-kuzelka": [
    commons(
      "Měšťanský dům U bílé kuželky (Malá Strana), Praha 1, Míšeňská 12, Malá Strana.JPG",
      "Michal Kmínek",
      "CC BY-SA 3.0",
    ),
    commons(
      "Praha, Mala Strana, Misenska 12 - U bile kuzelky (portal).jpg",
      "Matěj Baťha",
      "CC BY-SA 3.0",
    ),
    commons(
      "Praha, Mala Strana, Misenska 12 - U bile kuzelky (na rohu Drazickeho namesti).jpg",
      "Matěj Baťha",
      "CC BY-SA 3.0",
    ),
  ],
  cross: [
    commons("Cross Club Prague, Praha 7 - Holešovice.jpg", "Fry72", "CC BY-SA 4.0"),
    commons("Cross Club Prague, Praha 7 - Holešovice 04.jpg", "Fry72", "CC BY-SA 4.0"),
    commons("Cross Club Prague, Praha 7 - Holešovice 03.jpg", "Fry72", "CC BY-SA 4.0"),
  ],
  akropolis: [
    commons("Palác Akropolis Praha.JPG", "VitVit", "CC BY-SA 3.0"),
    commons("Palác Akropolis (01).jpg", "ŠJů", "CC BY-SA 3.0"),
    commons("Palác Akropolis (02).jpg", "ŠJů", "CC BY-SA 3.0"),
  ],
  roxy: [commons("Roxy Prague 2007 01.jpg", "obeythegiant", "CC BY-SA 2.0")],
  meetfactory: [
    commons("MeetFactory, ulice Ke sklárně.jpg", "ŠJů", "CC BY-SA 3.0"),
    commons("MeetFactory Music Hall.jpg", "MeetFactory", "CC BY-SA 3.0"),
    commons("MeetFactory, stěna.jpg", "ŠJů", "CC BY-SA 3.0"),
  ],
  lucerna: [
    commons("Lucerna stage.jpg", "Lhcollins", "CC BY-SA 3.0"),
    commons("Lucerna Music box office.jpg", "Lhcollins", "CC BY-SA 3.0"),
  ],
  radost: [
    commons("Praha Vinohrady Belehradska 120 Radost FX.jpg", "JiriMatejicek", "CC BY-SA 4.0"),
    flickr(
      "https://live.staticflickr.com/3330/3244661944_35b42aa44a_b.jpg",
      "https://www.flickr.com/photos/17997014@N00/3244661944",
      "TijsB",
      "CC BY-SA 2.0",
    ),
  ],
};

export function asPhoto(photo) {
  if (!photo || typeof photo === "string") {
    return { src: photo || "", credit: "", license: "", href: "", real: false };
  }
  return photo;
}
