/* ======================================================
   ELEMENTOS DA PÁGINA
   ====================================================== */
const torreSelect = document.getElementById("torre");
const aptoSelect  = document.getElementById("apto");
const form        = document.getElementById("consultaForm");
const resultado   = document.getElementById("resultado");

const formVaga    = document.getElementById("consultaVagaForm");
const inputVaga   = document.getElementById("numeroVaga");
const resultadoVaga = document.getElementById("resultadoVaga");

const cardLocalizacao = document.getElementById("cardLocalizacao");

// 👉 elementos do mapa
const mapaImg    = document.getElementById("mapaImg");
const mapaCanvas = document.getElementById("mapaCanvas");

let ctx = null;
let vagaAtual = null;
let scrollTimeout = null;

if (mapaCanvas) {
  ctx = mapaCanvas.getContext("2d");
}

/* ======================================================
   DIMENSÃO ORIGINAL DO MAPA
   ====================================================== */
const MAPA_ORIGINAL = {
  width: 1900,
  height: 4000
};

/* ======================================================
   REFERÊNCIA DE CONVERSÃO (ILLUSTRATOR → MAPA)
   ====================================================== */
   
/*   
const REFERENCIA_ILLUSTRATOR = {
  vaga: 335,
  x: 620,
  y: -53,
  w: 71,
  h: 35
};

const REFERENCIA_MAPA = {
  x: 1236,
  y: 2438
};
*/

/*ver valores das constantes abaixo no console*/
const X_SCALE = 1236 / 620;
const Y_OFFSET = 2438 - -53;

/* ======================================================
   COORDENADAS DAS VAGAS (PADRÃO ILLUSTRATOR)
   ====================================================== */
const coordenadasVagas = {
  217: { x: 367, y: -2061, w: 33, h: 33 },
  218: { x: 367, y: -2095, w: 33, h: 33 },
	
  219: { x: 367, y: -2128, w: 33, h: 33 },
  220: { x: 367, y: -2160, w: 33, h: 33 },
  221: { x: 367, y: -2192, w: 33, h: 33 },
  222: { x: 399, y: -2358, w: 17, h: 66 },
  223: { x: 415, y: -2358, w: 17, h: 66 },
  224: { x: 432, y: -2358, w: 17, h: 66 },
  225: { x: 449, y: -2358, w: 17, h: 66 },
  226: { x: 465, y: -2358, w: 17, h: 66 },
  227: { x: 481, y: -2358, w: 17, h: 66 },
  228: { x: 497, y: -2358, w: 17, h: 66 },
  229: { x: 514, y: -2358, w: 17, h: 66 },
  230: { x: 531, y: -2358, w: 17, h: 66 },
  231: { x: 546, y: -2358, w: 17, h: 66 },
  232: { x: 563, y: -2358, w: 17, h: 66 },
  233: { x: 579, y: -2358, w: 17, h: 66 },
  234: { x: 596, y: -2358, w: 17, h: 66 },
  235: { x: 612, y: -2358, w: 17, h: 66 },
  236: { x: 629, y: -2358, w: 17, h: 66 },
  237: { x: 645, y: -2358, w: 17, h: 66 },
  238: { x: 662, y: -2358, w: 17, h: 66 },
  239: { x: 678, y: -2358, w: 17, h: 66 },
  240: { x: 694, y: -2358, w: 17, h: 66 }, 
  241: { x: 711, y: -2358, w: 17, h: 66 },
  242: { x: 728, y: -2206, w: 18, h: 71 },
  243: { x: 710, y: -2206, w: 18, h: 71 },
  244: { x: 692, y: -2206, w: 18, h: 71 },
  245: { x: 674, y: -2206, w: 18, h: 71 },
  246: { x: 656, y: -2206, w: 18, h: 71 },
  247: { x: 638, y: -2206, w: 18, h: 71 },
  248: { x: 620, y: -2206, w: 18, h: 71 },
  249: { x: 602, y: -2206, w: 18, h: 71 },
  250: { x: 585, y: -2206, w: 18, h: 71 },
  251: { x: 585, y: -2137, w: 32, h: 33 },
  252: { x: 585, y: -2103, w: 32, h: 33 },
  253: { x: 585, y: -2071, w: 32, h: 33 },
  254: { x: 585, y: -2038, w: 32, h: 33 },
  255: { x: 585, y: -2005, w: 32, h: 33 },
  256: { x: 585, y: -1974, w: 32, h: 33 },
  257: { x: 585, y: -1941, w: 32, h: 33 },
  258: { x: 585, y: -1907, w: 32, h: 33 },
  259: { x: 585, y: -1875, w: 32, h: 33 },
  260: { x: 585, y: -1842, w: 32, h: 33 },
  261: { x: 585, y: -1808, w: 32, h: 33 },
  262: { x: 585, y: -1777, w: 32, h: 33 },
  263: { x: 585, y: -1744, w: 32, h: 33 },
  264: { x: 585, y: -1713, w: 32, h: 33 },
  265: { x: 585, y: -1679, w: 32, h: 33 },
  266: { x: 585, y: -1645, w: 32, h: 33 },
  267: { x: 585, y: -1599, w: 32, h: 33 },
  268: { x: 585, y: -1565, w: 32, h: 33 },
  269: { x: 585, y: -1512, w: 32, h: 33 },
  270: { x: 585, y: -1478, w: 32, h: 33 },
  271: { x: 629, y: -1517, w: 18, h: 71 },
  272: { x: 655, y: -1517, w: 18, h: 71 },
  273: { x: 681, y: -1517, w: 18, h: 71 },
  274: { x: 699, y: -1517, w: 18, h: 71 },
  275: { x: 725, y: -1517, w: 18, h: 71 },
  276: { x: 743, y: -1517, w: 18, h: 71 },
  277: { x: 769, y: -1517, w: 18, h: 71 },
  278: { x: 778, y: -1361, w: 18, h: 71 },
  279: { x: 752, y: -1361, w: 18, h: 71 },
  280: { x: 734, y: -1361, w: 18, h: 71 },
  281: { x: 708, y: -1360, w: 18, h: 71 },
  282: { x: 690, y: -1360, w: 18, h: 71 },
  283: { x: 664, y: -1360, w: 18, h: 71 },
  284: { x: 637, y: -1360, w: 18, h: 71 },
  285: { x: 594, y: -1361, w: 32, h: 33 },
  286: { x: 594, y: -1329, w: 32, h: 33 },
  287: { x: 594, y: -1295, w: 32, h: 33 },
  288: { x: 594, y: -1262, w: 32, h: 33 },
  289: { x: 594, y: -1230, w: 32, h: 33 },
  290: { x: 594, y: -1197, w: 32, h: 33 },
  291: { x: 594, y: -1165, w: 32, h: 33 },
  292: { x: 594, y: -1133, w: 32, h: 33 },
  293: { x: 594, y: -1084, w: 32, h: 33 },
  294: { x: 594, y: -1052, w: 32, h: 33 },
  295: { x: 594, y: -1019, w: 32, h: 33 },
  296: { x: 594, y: -986, w: 32, h: 33 },
  297: { x: 594, y: -953, w: 32, h: 33 },
  298: { x: 594, y: -921, w: 32, h: 33 },
  299: { x: 594, y: -889, w: 32, h: 33 },
  300: { x: 594, y: -855, w: 32, h: 33 },
  301: { x: 594, y: -823, w: 32, h: 33 },
  302: { x: 594, y: -790, w: 32, h: 33 },
  303: { x: 594, y: -757, w: 32, h: 33 },
  304: { x: 594, y: -725, w: 32, h: 33 },
  305: { x: 601, y: -671, w: 18, h: 71 },
  306: { x: 619, y: -671, w: 18, h: 71 },
  307: { x: 637, y: -671, w: 18, h: 71 },
  308: { x: 655, y: -671, w: 18, h: 71 },
  309: { x: 673, y: -671, w: 18, h: 71 },
  310: { x: 691, y: -671, w: 18, h: 71 },
  311: { x: 709, y: -671, w: 18, h: 71 },
  312: { x: 726, y: -671, w: 18, h: 71 },
  313: { x: 744, y: -671, w: 18, h: 71 },
  314: { x: 762, y: -671, w: 18, h: 71 },
  315: { x: 762, y: -515, w: 18, h: 71 },
  316: { x: 744, y: -515, w: 18, h: 71 },
  317: { x: 727, y: -515, w: 18, h: 71 },
  318: { x: 709, y: -515, w: 18, h: 71 },
  319: { x: 691, y: -515, w: 18, h: 71 },
  320: { x: 673, y: -515, w: 18, h: 71 },
  321: { x: 655, y: -515, w: 18, h: 71 },
  322: { x: 620, y: -515, w: 35, h: 35 },
  323: { x: 620, y: -478, w: 35, h: 35 },
  324: { x: 620, y: -444, w: 35, h: 35 },
  325: { x: 620, y: -408, w: 35, h: 35 },
  326: { x: 620, y: -372, w: 35, h: 35 },
  327: { x: 620, y: -337, w: 35, h: 35 },
  328: { x: 620, y: -301, w: 35, h: 35 },
  329: { x: 620, y: -265, w: 35, h: 35 },
  330: { x: 620, y: -230, w: 35, h: 35 },
  331: { x: 620, y: -196, w: 35, h: 35 },
  332: { x: 620, y: -159, w: 35, h: 35 },
  333: { x: 620, y: -123, w: 35, h: 35 },
  334: { x: 620, y: -89, w: 35, h: 35 },
  335: { x: 620, y: -53, w: 35, h: 35 },
  336: { x: 620, y: -17, w: 35, h: 35 },
  337: { x: 620, y: 19, w: 35, h: 35 },
  338: { x: 620, y: 54, w: 35, h: 35 },
  339: { x: 620, y: 90, w: 35, h: 35 } 
  
};

/* ======================================================
   FUNÇÕES DO MAPA
   ====================================================== */
function ajustarCanvas() {
  if (!mapaImg || !mapaCanvas || !ctx) return;

  mapaCanvas.width  = mapaImg.clientWidth;
  mapaCanvas.height = mapaImg.clientHeight;

  ctx.clearRect(0, 0, mapaCanvas.width, mapaCanvas.height);
}

function converterCoordenadasIllustrator({ x, y, w, h }) {
  return {
    x: x * X_SCALE,
    y: y + Y_OFFSET,
    w: w * X_SCALE,
    h: h
  };
}

function redesenharMapa() {
  ajustarCanvas();

  if (vagaAtual) {
    destacarVaga(vagaAtual);
  }
}

function destacarVaga(numeroVaga) {
  if (!ctx || !mapaCanvas) return;

  const vagaIllustrator = coordenadasVagas[numeroVaga];
  if (!vagaIllustrator) return;

  const vagaMapa = converterCoordenadasIllustrator(vagaIllustrator);

  const scaleX = mapaCanvas.width  / MAPA_ORIGINAL.width;
  const scaleY = mapaCanvas.height / MAPA_ORIGINAL.height;

  ctx.fillStyle = "rgba(255, 0, 0, 0.6)";
  ctx.fillRect(
    vagaMapa.x * scaleX,
    vagaMapa.y * scaleY,
    vagaMapa.w * scaleX,
    vagaMapa.h * scaleY
  );
}

/* ======================================================
   EVENTOS DO MAPA
   ====================================================== */
if (mapaImg) {
  mapaImg.addEventListener("load", () => {
    requestAnimationFrame(redesenharMapa);
  });
}

window.addEventListener("resize", () => {
  requestAnimationFrame(redesenharMapa);
});

window.addEventListener("scroll", () => {
  // redesenha enquanto está rolando
  requestAnimationFrame(redesenharMapa);

  // limpa qualquer timer anterior
  if (scrollTimeout) {
    clearTimeout(scrollTimeout);
  }

  // força redesenho FINAL após o scroll terminar
  scrollTimeout = setTimeout(() => {
    requestAnimationFrame(redesenharMapa);
  }, 150);
});

/* ======================================================
   REGRAS DO CONDOMÍNIO
   ====================================================== */
function gerarApartamentos() {
  const lista = [];

  for (let i = 1; i <= 8; i++) lista.push(i.toString());

  for (let andar = 1; andar <= 17; andar++) {
    for (let f = 1; f <= 8; f++) {
      lista.push(`${andar}${f.toString().padStart(2, "0")}`);
    }
  }

  return lista;
}

const apartamentos = gerarApartamentos();

/* ======================================================
   VAGAS POR TORRE / APARTAMENTO
   ====================================================== */
const vagasPorApartamento = {
  "1": {
    "2":372,"3":384,"6":397,"7":424,
    "102":371,"103":383,"106":396,"107":423,
    "202":370,"203":382,"206":421,"207":422,
    "302":369,"303":381,"306":420,"307":395,
    "402":368,"403":380,"406":419,"407":394,
    "502":399,"503":379,"506":418,"507":393,
    "602":398,"603":378,"606":417,"607":392,
    "702":11,"703":377,"706":416,"707":391,
    "802":12,"803":376,"806":415,"807":390,
    "902":13,"903":375,"906":414,"907":389,
    "1002":14,"1003":374,"1006":413,"1007":388,"1008":347,
    "1102":15,"1103":373,"1106":412,"1107":340,"1108":348,
    "1202":16,"1203":339,"1206":411,"1207":341,"1208":349,
    "1302":17,"1303":338,"1306":410,"1307":342,"1308":350,
    "1402":18,"1403":337,"1406":409,"1407":343,"1408":364,
    "1502":19,"1503":336,"1506":387,"1507":344,"1508":365,
    "1602":20,"1603":335,"1606":386,"1607":345,"1608":366,
    "1702":21,"1703":334,"1706":385,"1707":346,"1708":367
  },

  "2": {
    "2":164,"3":302,"6":320,"7":333,
    "102":163,"103":301,"106":319,"107":332,
    "202":162,"203":300,"206":318,"207":331,
    "302":161,"303":299,"306":317,"307":330,
    "402":160,"403":298,"406":316,"407":329,
    "502":159,"503":297,"506":315,"507":328,
    "602":158,"603":296,"606":314,"607":327,
    "702":157,"703":295,"706":313,"707":326,
    "802":156,"803":294,"806":312,"807":325,
    "902":155,"903":293,"906":311,"907":324,
    "1002":154,"1003":292,"1006":310,"1007":323,
    "1102":153,"1103":291,"1106":309,"1107":322,"1108":278,
    "1202":152,"1203":290,"1206":308,"1207":321,"1208":279,
    "1302":151,"1303":289,"1306":307,"1307":169,"1308":280,
    "1402":150,"1403":288,"1406":306,"1407":168,"1408":281,
    "1502":149,"1503":287,"1506":305,"1507":167,"1508":282,
    "1602":148,"1603":286,"1606":304,"1607":166,"1608":283,
    "1702":147,"1703":285,"1706":303,"1707":165,"1708":284
  },

  "3": {
    "2":235,"3":124,"6":253,"7":129,
    "102":236,"103":125,"106":254,"107":130,
    "202":237,"203":126,"206":255,"207":131,
    "302":238,"303":127,"306":256,"307":132,
    "402":239,"403":128,"406":257,"407":133,
    "502":240,"503":222,"506":258,"507":134,
    "602":241,"603":223,"606":259,"607":135,
    "702":242,"703":224,"706":260,"707":136,
    "802":243,"803":225,"806":261,"807":137,
    "902":244,"903":226,"906":262,"907":138,
    "1002":245,"1003":227,"1006":263,"1007":139,
    "1102":246,"1103":228,"1106":264,"1107":140,"1108":271,
    "1202":247,"1203":229,"1206":265,"1207":141,"1208":272,
    "1302":248,"1303":230,"1306":266,"1307":142,"1308":273,
    "1402":249,"1403":231,"1406":267,"1407":143,"1408":274,
    "1502":250,"1503":232,"1506":268,"1507":144,"1508":275,
    "1602":251,"1603":233,"1606":269,"1607":145,"1608":276,
    "1702":252,"1703":234,"1706":270,"1707":146,"1708":277
  },

  "4": {
    "2":189,"3":79,"6":102,"7":207,
    "102":190,"103":80,"106":103,"107":208,
    "202":191,"203":81,"206":104,"207":209,
    "302":192,"303":82,"306":105,"307":210,
    "402":193,"403":83,"406":106,"407":211,
    "502":194,"503":84,"506":107,"507":212,
    "602":195,"603":85,"606":108,"607":213,
    "702":196,"703":86,"706":109,"707":214,
    "802":197,"803":87,"806":110,"807":215,
    "902":198,"903":88,"906":111,"907":216,
    "1002":199,"1003":95,"1006":112,"1007":217,
    "1102":200,"1103":96,"1106":113,"1107":218,"1108":89,
    "1202":201,"1203":97,"1206":114,"1207":219,"1208":90,
    "1302":202,"1303":98,"1306":115,"1307":220,"1308":91,
    "1402":203,"1403":99,"1406":117,"1407":221,"1408":92,
    "1502":204,"1503":100,"1506":118,"1507":121,"1508":93,
    "1602":205,"1603":101,"1606":119,"1607":122,"1608":94,
    "1702":206,"1703":188,"1706":120,"1707":123,"1708":116
  },

  "5": {
    "2":32,"3":36,"6":61,"7":170,
    "102":33,"103":37,"106":62,"107":171,
    "202":34,"203":38,"206":63,"207":172,
    "302":35,"303":39,"306":64,"307":173,
    "402":10,"403":40,"406":65,"407":174,
    "502":351,"503":41,"506":66,"507":175,
    "602":352,"603":42,"606":67,"607":176,
    "702":353,"703":43,"706":68,"707":177,
    "802":354,"803":44,"806":69,"807":178,
    "902":355,"903":45,"906":70,"907":179,
    "1002":356,"1003":46,"1006":71,"1007":180,
    "1102":357,"1103":47,"1106":72,"1107":181,"1108":54,
    "1202":358,"1203":48,"1206":73,"1207":182,"1208":55,
    "1302":359,"1303":49,"1306":74,"1307":183,"1308":56,
    "1402":360,"1403":50,"1406":75,"1407":184,"1408":57,
    "1502":361,"1503":51,"1506":76,"1507":185,"1508":58,
    "1602":362,"1603":52,"1606":77,"1607":186,"1608":59,
    "1702":363,"1703":53,"1706":78,"1707":187,"1708":60
  }
};

/* ======================================================
   EVENTOS – TORRE / APARTAMENTO
   ====================================================== */
torreSelect.addEventListener("change", () => {
  aptoSelect.innerHTML = '<option value="">Selecione</option>';
  aptoSelect.disabled = true;
  resultado.textContent = "";

  cardLocalizacao.classList.add("hidden");
  if (ctx && mapaCanvas) ctx.clearRect(0, 0, mapaCanvas.width, mapaCanvas.height);

  if (!torreSelect.value) return;

  apartamentos.forEach(apto => {
    const opt = document.createElement("option");
    opt.value = apto;
    opt.textContent = apto;
    aptoSelect.appendChild(opt);
  });

  aptoSelect.disabled = false;
});

form.addEventListener("submit", e => {
  e.preventDefault();

  const torre = torreSelect.value;
  const apto  = aptoSelect.value;

  resultadoVaga.innerHTML = "";

  cardLocalizacao.classList.add("hidden");
  if (ctx && mapaCanvas) ctx.clearRect(0, 0, mapaCanvas.width, mapaCanvas.height);

  if (!torre || !apto) {
    resultado.textContent = "Selecione a torre e o apartamento.";
    return;
  }

  const vaga = vagasPorApartamento[torre]?.[apto];

  if (vaga) {
    resultado.innerHTML = `
      <div class="feedback sucesso">
        <span class="icone">✔</span>
        <span>
          Torre ${torre} Apt. ${apto} possui a vaga de garagem nº <strong>${vaga}</strong>.
        </span>
      </div>
    `;

    vagaAtual = vaga;
    cardLocalizacao.classList.remove("hidden");

    ajustarCanvas();
    destacarVaga(vagaAtual);

  } else {
    resultado.innerHTML = `
      <div class="feedback erro">
        <span class="icone">✖</span>
        <span>
          Torre ${torre} Apt. ${apto} não possui vaga de garagem.
        </span>
      </div>
    `;
  }
});

/* ======================================================
   EVENTOS – CONSULTA POR NÚMERO DA VAGA
   ====================================================== */
formVaga.addEventListener("submit", e => {
  e.preventDefault();

  const numero = inputVaga.value.trim();
  resultado.innerHTML = "";

  cardLocalizacao.classList.add("hidden");
  if (ctx && mapaCanvas) ctx.clearRect(0, 0, mapaCanvas.width, mapaCanvas.height);

  if (!numero || !coordenadasVagas[numero]) {
    resultadoVaga.innerHTML = `
      <div class="feedback erro">
        <span class="icone">✖</span>
        <span>Vaga não encontrada.</span>
      </div>
    `;
    return;
  }

  resultadoVaga.innerHTML = `
    <div class="feedback sucesso">
      <span class="icone">✔</span>
      <span>Vaga nº <strong>${numero}</strong> localizada no mapa.</span>
    </div>
  `;

  vagaAtual = Number(numero);
  cardLocalizacao.classList.remove("hidden");

  ajustarCanvas();
  destacarVaga(vagaAtual);
});