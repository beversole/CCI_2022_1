let GACC = {}

GACC.Artists = [];
GACC.TourGuides = [];
GACC.TagAlongs = [];
GACC.imageFullCohort = null;

class GACC_Artist {
        constructor(name, site) {
        this.name = name;
        this.site = site;
    }
}

GACC.loadImages = function(callBack){
    GACC.imageFullCohort = document.createElement("img");
    GACC.imageFullCohort.style.cssText = 'display:none;';
    GACC.imageFullCohort.addEventListener('load', e => { callBack(); });
    GACC.imageFullCohort.src = "https://github.com/beversole/tags-CCI-2022-1/raw/main/fullCohort.jpg";
    document.body.appendChild(GACC.imageFullCohort);
}

GACC.Artists.push(new GACC_Artist('Joy','https://grayarea.org/community-entry/joy-ding/'));
GACC.Artists.push(new GACC_Artist('Nathan','https://nathan.design/'));
GACC.Artists.push(new GACC_Artist('Connie',null));
GACC.Artists.push(new GACC_Artist('Hayden','https://haydencarey.com/'));
GACC.Artists.push(new GACC_Artist('Natalie','https://www.natalieabbott.com/'));
GACC.Artists.push(new GACC_Artist('Steph','https://stephmarisa.github.io/'));
GACC.Artists.push(new GACC_Artist('Simren','https://www.instagram.com/inky.bois/'));
GACC.Artists.push(new GACC_Artist('William',null));
GACC.Artists.push(new GACC_Artist('Elizabeth','https://www.elizabethleister.com/'));
GACC.Artists.push(new GACC_Artist('Danishta','http://www.danishtarivero.com/'));
GACC.Artists.push(new GACC_Artist('Clayton','https://www.instagram.com/claytonnorriss'));

GACC.TagAlongs.push(new GACC_Artist('Ivan','https://ivanmendozaportfolio.com/'));
GACC.TagAlongs.push(new GACC_Artist('Brandon','https://www.instagram.com/_brandoneversole/'));

GACC.TourGuides.push(new GACC_Artist('David','https://dsasson.com/'));
GACC.TourGuides.push(new GACC_Artist('Shawn','https://grayarea.org/community-entry/shawn-jackson/'));
GACC.TourGuides.push(new GACC_Artist('Niki','https://nikiselken.com/'));

GACC.TourGuides.push(new GACC_Artist('Alex','https://grayarea.org/community-entry/alexander-abalos/'));
GACC.TourGuides.push(new GACC_Artist('Stephanie','https://www.jellomoat.com/'));
GACC.TourGuides.push(new GACC_Artist('Coley','https://grayarea.org/community-entry/coley-mixan/'));
GACC.TourGuides.push(new GACC_Artist('Stephanie','https://www.jellomoat.com/'));
GACC.TourGuides.push(new GACC_Artist('Marc','https://grayarea.org/community-entry/marc-schroeder-2/'));
GACC.TourGuides.push(new GACC_Artist('Ayse','https://aysenurdemir.com/'));

//Start loading image 
/*

*/