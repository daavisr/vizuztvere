Survey
    .StylesManager
    .applyTheme("default");

var intro = {
   "name": "introPage",
   "firstPageIsStarted": true,
   "elements": [
    {
     "type": "html",
     "name": "descr",
     "html": "<strong> Eksperimenta gaita:</strong><br/> \n\nUz īsu mirkli tiks parādīta kāda krāsa; pēc tam būs jāizvēlas tai līdzīgākā krāsa no 6 variantiem. Šādi tiks atkārtots 20 krāsām.\n<br/> Vēlams eksperimenta laikā nemainīt ekrāna spilgtuma līmeni. <br/>Aptuvenais eksperimenta ilgums: ~5min.\n"
    }
   ],
   "description": "Šī aptauja ir paredzēta LU DF kursa \"Vizuālā uztvere: metodoloģijas un pieejas\" pētījumam par krāsu īstermiņa atmiņu. Pētījuma mērķis ir noskaidrot, vai īstermiņa atmiņā palikušās krāsas īpašības ir atkarīgas no parādītās krāsas."
}

var lastPage = {
   "name": "lastPage",
   "elements": [
    {
     "type": "dropdown",
     "name": "age",
     "title": "Lūdzu, norādiet savu vecuma grupu:",
     "choices": [
      {
       "value": "0-11",
       "text": "0-11"
      },
      {
       "value": "12-17",
       "text": "12-17"
      },
      {
       "value": "18-24",
       "text": "18-24"
      },
      {
       "value": "25-34",
       "text": "25-34"
      },
      {
       "value": "35-44",
       "text": "35-44"
      },
      {
       "value": "45-54",
       "text": "45-54"
      },
      {
       "value": "55-64",
       "text": "55-64"
      },
      {
       "value": "64-75",
       "text": "64-75"
      },
      {
       "value": "75+",
       "text": "75+"
      }
     ]
    },
    {
     "type": "dropdown",
     "name": "gender",
     "title": "Lūdzu, norādiet savu dzimumu:",
     "choices": [
      {
       "value": "male",
       "text": "Vīrietis"
      },
      {
       "value": "female",
       "text": "Sieviete"
      }
     ]
    },
    {
     "type": "text",
     "name": "job",
     "title": "Lūdzu, norādiet savu nodarbošanās jomu:"
    }
   ],
   "title": "Demogrāfiskie jautājumi"
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}


var pages = new Array(intro)
pages.push(...shuffle(generatePages()))
pages.push(lastPage)

var json = {
 "title": "Krāsu īstermiņa atmiņa",
 "description": "Pētījums LU DF kursā \"Vizuālā uztvere: metodoloģijas un pieejas\"",
 "logoPosition": "right",
 "showQuestionNumbers": "off",
 "pageNextText": "Turpināt",
 "completeText": "Pabeigt",
 "showPrevButton": false,
 "goNextPageAutomatic": true,
 "showProgressBar": "top",
 "pages": pages,
 "completedHtml": `<h3>Paldies!</h3><br/><p>Rezultāti ir saglabāti</p>`
};

window.survey = new Survey.Model(json);

//Survey.Helpers.randomizeArray(survey.pages);
//survey.currentPage = survey.pages[0];

survey
    .onComplete
    .add(function (result) {
		console.log(result.data)
		var xhr = new XMLHttpRequest();
		xhr.open("POST", "https://2q9zy.mocklab.io/submit", true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(JSON.stringify(result.data));
    });

function showColors() {
	var page = survey.pages[survey.currentPageNo]
	page.elements[0].title="Lūdzu, izvēlieties līdzīgāko krāsu iepriekš redzētajai!";
	page.elements[0].readOnly=false
	page.elements[0].choices = page.elements[1].choices
}

function hideColor() {
	var page = survey.pages[survey.currentPageNo]
	page.elements[0].choices=[];
	setTimeout(showColors, 3000)
	page.elements[0].title="4";
	showIndicator()
}

function showIndicator() {
	var page = survey.pages[survey.currentPageNo]
	if (page.elements[0].choices.length == 0) {
		page.elements[0].title = (parseInt(page.elements[0].title) - 1).toString();
		setTimeout(showIndicator, 1000)	
	}
}

function generatePage(hexList, index) {
	var urlPart1 = "https://github.com/daavisr/vizuztvere/blob/master/color_images/%23"
	var urlPart2 = ".png?raw=true"
	var pageId = "page" + (index+1)
	var shuffledColors =(hexList.slice(1)).sort((a, b) => 0.5 - Math.random());
	return {
	"name": pageId,
    "navigationButtonsVisibility": "hide",
	"elements": [
		{
		 "type": "imagepicker",
		 "name": "question1_" + pageId + "_" + hexList[0],
		 "title": "Lūdzu, iegaumējiet redzamo krāsu!",
		 "readOnly": true,
		 "imageFit": "fill",
		 //"colCount": 2,
		 //"imageWidth": 400,
		 "choices": [{
		 "value": "lion",
		 "imageLink": urlPart1 + hexList[0].substring(1) + urlPart2
		 }]
		},
		{
		 "type": "imagepicker",
		 "name": "question2_" + pageId + "_" + hexList[0],
		 "visible": false,
		 "choicesOrder": "random",
		 "imageFit": "fill",
		 //"colCount": 2,
		 //"imageWidth": 400,
		 "choices": [
		  {
		   "value": shuffledColors[0],
		   "imageLink": urlPart1 + shuffledColors[0].substring(1) + urlPart2
		  },
		  {
		   "value": shuffledColors[1],
		   "imageLink": urlPart1 + shuffledColors[1].substring(1) + urlPart2
		  },
		  {
		   "value": shuffledColors[2],
		   "imageLink": urlPart1 + shuffledColors[2].substring(1) + urlPart2
		  },
		  {
		   "value": shuffledColors[3],
		   "imageLink": urlPart1 + shuffledColors[3].substring(1) + urlPart2
		  },
		  {
		   "value":shuffledColors[4],
		   "imageLink": urlPart1 + shuffledColors[4].substring(1) + urlPart2
		  },
		  {
		   "value": shuffledColors[5],
		   "imageLink": urlPart1 + shuffledColors[5].substring(1) + urlPart2
		  }
		 ]
		},
		]
	}
}

function generatePages() {
	var hexList = [
		["#789a28", "#9a9a28", "#559a28", "#6e8240", "#81b210", "#6e8141", "#728b37"],
		["#80a163", "#93a163", "#6da163", "#828282", "#7ec144", "#739358", "#8dab73"],
		["#ceae3b", "#ce823b", "#c2ce3b", "#af9d5a", "#edc01d", "#c0a130", "#d3b750"],
		["#173c64", "#175364", "#172564", "#263c54", "#073b73", "#122f4f", "#1b4879"],
		["#b285e0", "#85cce0", "#8596e0", "#b298cd", "#b272f3", "#a671da", "#bf9ae5"],
		["#e9d6f5","#dfd6f5","#f2d6f5","#e8ddee","#ead0fb","#dec1f0","#f4eafa"],
		["#d3d83b","#d8ae3b","#a4d83b","#bba158","#f6bc1e","#cbd129","#d8dc50"],
		["#4a66d3","#4a8fd3","#584ad3","#6677b7","#2e55ef","#3654ce","#5f77d8"],
		["#5dcb8d","#5dcb6c","#5dcbad","#78b090","#43e589","#4ac47f","#71d19a"],
		["#bfd8b6","#c9d8b6","#b6d8b7","#c6cac4","#b9e6a8","#b1cfa5","#cee1c7"],
		["#878421","#876521","#6c8721","#727036","#9d980c","#73701c","#9c9826"],
		["#565397","#536597","#6a5397","#71717a","#3a36b5","#4d4a87","#615ea6"],
		["#242716","#272516","#1f2716","#1f1f1e","#2f2a0f","#15170d","#33371f"],
		["#4d9424","#6e9424","#2b9424","#537d3b","#47ab0d","#427f1f","#58a829"],
		["#b4a1ed","#a1a5ed","#cba1ed","#bbafdf","#ad93fb","#a38be9","#c5b6f1"],
		["#2a521e","#3a521e","#1e5222","#32442c","#236010","#213f17","#346525"],
		["#5da27c","#5da267","#5da291","#7d827f","#3dc279","#549270","#6dab89"],
		["#f1cff2","#e6cff2","#f2cfe9","#ead7ea","#f8c7f9","#ebbbec","#f7e3f7"],
		["#adb6d1","#adc1d1","#afadd1","#bdbec1","#9daee1","#9da8c8","#bec5da"],
		["#db4433","#db3355","#db7633","#bd5c51","#f92c15","#d03625","#df5849"]
	]
	var pages = []
	for (let i = 0; i < hexList.length; i++) {
		pages.push(generatePage(hexList[i], i))
	}
	return pages
}

survey
    .onAfterRenderQuestion
    .add(function (survey, options) {
		if (survey.currentPageNo > 0 && survey.currentPageNo < survey.pages.length - 1) {
			var img = document.querySelector('img')
			if (img.complete) {
			  imgLoaded()
			} else {
			  img.addEventListener('load', imgLoaded)
			}
		} else if (survey.currentPageNo == survey.pages.length - 1) {
			survey.goNextPageAutomatic = false
		}			
    });

$("#surveyElement").Survey({model: survey});



function imgLoaded() {
	setTimeout(hideColor, 3000)
}


