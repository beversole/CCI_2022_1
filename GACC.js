let GACC = {}

GACC.artists = [];
GACC.tourGuides = [];
GACC.tours = [];
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

class GACC_Tour {
        constructor(name, tourGuide, dates) {
        this.name = name;
        this.tourGuide = tourGuide;
        this.dates = dates;
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

GACC.getTourGuideByName = function(tourGuideName){
    var results = []
    results = GACC.tourGuides.filter(tg => tg.name.toUpperCase() == tourGuideName.toUpperCase());
    return results;
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
GACC.tourGuides.push(new GACC_Artist('Michael',21,'tourGuide','https://grayarea.org/community-entry/michael-meisel/'));

GACC.tagAlongs.push(new GACC_Artist('Ivan',0,'tagAlong','https://ivanmendozaportfolio.com/'));
GACC.tagAlongs.push(new GACC_Artist('Brandon',9,'tagAlong','https://www.instagram.com/_brandoneversole/'));

GACC.artists.forEach(element => GACC.fullCohort.push(element));
GACC.tourGuides.forEach(element => GACC.fullCohort.push(element));
GACC.tagAlongs.forEach(element => GACC.fullCohort.push(element));

GACC.artists.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
GACC.tourGuides.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
GACC.tagAlongs.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));
GACC.fullCohort.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0));


GACC.tours.push(new GACC_Tour(
    'Web Skills',
    GACC.getTourGuideByName('David') ,
    [new Date('4/5/2022'),new Date('4/7/2022'),new Date('4/9/2022')]
    )
);

GACC.tours.push(new GACC_Tour(
    'Javascript I',
    GACC.getTourGuideByName('Shawn') ,
    [new Date('4/12/2022'),new Date('4/14/2022'),new Date('4/16/2022')]		
    )
);

GACC.tours.push(new GACC_Tour(
    'P5.js',
    GACC.getTourGuideByName('Niki') ,
    [new Date('4/19/2022'),new Date('4/21/2022'),new Date('4/23/2022')]		
    )
);

GACC.tours.push(new GACC_Tour(
    'Physical Computing I',
    GACC.getTourGuideByName('Alex') ,
    [new Date('4/26/2022'),new Date('4/28/2022'),new Date('4/30/2022')]	
    )
);

GACC.tours.push(new GACC_Tour(
    'Node.js',
    GACC.getTourGuideByName('Stephanie') ,
    [new Date('5/3/2022'),new Date('5/5/2022'),new Date('5/7/2022')]	
    )
);
	
GACC.tours.push(new GACC_Tour(
    '3D for the Web',
    GACC.getTourGuideByName('Coley') ,
    [new Date('5/10/2022'),new Date('5/12/2022'),new Date('5/14/2022')]	
    )
);

GACC.tours.push(new GACC_Tour(
    'Web Audio (Sound Art)',
    GACC.getTourGuideByName('Marc') ,
    [new Date('5/17/2022'),new Date('5/19/2022'),new Date('5/21/2022')]	
    )
);

GACC.tours.push(new GACC_Tour(
    'Projection Mapping',
    GACC.getTourGuideByName('Ayse') ,
    [new Date('5/24/2022'),new Date('5/26/2022'),new Date('5/28/2022')]	
    )
);

GACC.tours.push(new GACC_Tour(
    'Physical Computing II',
    GACC.getTourGuideByName('Michael') ,
    [new Date('5/31/2022'),new Date('6/2/2022'),new Date('6/4/2022')]	
    )
);

GACC.tours.push(new GACC_Tour(
    'Interactive Environments',
    GACC.getTourGuideByName('Niki') ,
    [new Date('6/7/2022'),new Date('6/9/2022'),new Date('6/11/2022')]
    )
);

Date.prototype.formatMMDDYYYY = function(){
    return (this.getMonth() + 1) + 
    "/" +  this.getDate() +
    "/" +  this.getFullYear();
}