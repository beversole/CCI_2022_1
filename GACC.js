let GACC = {}

GACC.artists = [];
GACC.tourGuides = [];
GACC.tagAlongs = [];
GACC.fullCohort = [];
GACC.iconNativeSize = [435,435];

GACC.imageFullCohort = null;

class GACC_Artist {
        constructor(name, imagePos, type, site) {
        this.name = name;
        this.site = site;
        this.type = type;
        this.imagePos = imagePos;
    }
}

GACC.loadImages = function(callBack){
    GACC.imageFullCohort = document.createElement("img");
    GACC.imageFullCohort.style.cssText = 'display:none;';
    GACC.imageFullCohort.addEventListener('load', e => { 
        callBack(); 
    });
    GACC.imageFullCohort.src = "https://github.com/beversole/tags-CCI-2022-1/raw/main/fullCohort.jpg";
    document.body.appendChild(GACC.imageFullCohort);
}

GACC.artists.push(new GACC_Artist('Joy',7,'artist','https://grayarea.org/community-entry/joy-ding/'));
GACC.artists.push(new GACC_Artist('Nathan',2,'artist','https://nathan.design/'));
GACC.artists.push(new GACC_Artist('Connie',18,'artist',null));
GACC.artists.push(new GACC_Artist('Hayden',15,'artist','https://haydencarey.com/'));
GACC.artists.push(new GACC_Artist('Natalie',12,'artist','https://www.natalieabbott.com/'));
GACC.artists.push(new GACC_Artist('Steph',5,'artist','https://stephmarisa.github.io/'));
GACC.artists.push(new GACC_Artist('Simren',4,'artist','https://www.instagram.com/inky.bois/'));
GACC.artists.push(new GACC_Artist('William',8,'artist',null));
GACC.artists.push(new GACC_Artist('Elizabeth',16,'artist','https://www.elizabethleister.com/'));
GACC.artists.push(new GACC_Artist('Danishta',3,'artist','http://www.danishtarivero.com/'));
GACC.artists.push(new GACC_Artist('Clayton',19,'artist','https://www.instagram.com/claytonnorriss'));

GACC.tourGuides.push(new GACC_Artist('David',17,'tourGuide','https://dsasson.com/'));
GACC.tourGuides.push(new GACC_Artist('Shawn',11,'tourGuide','https://grayarea.org/community-entry/shawn-jackson/'));
GACC.tourGuides.push(new GACC_Artist('Niki',10,'tourGuide','https://nikiselken.com/'));
GACC.tourGuides.push(new GACC_Artist('Alex',20,'tourGuide','https://grayarea.org/community-entry/alexander-abalos/'));
GACC.tourGuides.push(new GACC_Artist('Coley',13,'tourGuide','https://grayarea.org/community-entry/coley-mixan/'));
GACC.tourGuides.push(new GACC_Artist('Stephanie',1,'tourGuide','https://www.jellomoat.com/'));
GACC.tourGuides.push(new GACC_Artist('Marc',14,'tourGuide','https://grayarea.org/community-entry/marc-schroeder-2/'));
GACC.tourGuides.push(new GACC_Artist('Ayse',6,'tourGuide','https://aysenurdemir.com/'));

GACC.tagAlongs.push(new GACC_Artist('Ivan',0,'tagAlong','https://ivanmendozaportfolio.com/'));
GACC.tagAlongs.push(new GACC_Artist('Brandon',9,'tagAlong','https://www.instagram.com/_brandoneversole/'));

GACC.artists.forEach(element => GACC.fullCohort.push(element));
GACC.tourGuides.forEach(element => GACC.fullCohort.push(element));
GACC.tagAlongs.forEach(element => GACC.fullCohort.push(element));