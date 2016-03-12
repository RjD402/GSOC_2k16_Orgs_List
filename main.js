//// JavaScript
var orgs = document.getElementsByClassName('org__logo');

var GLOBALS = {
    idea: 0,
    tech: 0,
    img: 0
}

/*
    TODO
    Rename specific array names like orgNames, ideasPage etc. etc. to just collection.
    Make peoper use of inheritance, it's really awesome :D
    Who said JavaScript is not Object Oriented Language :P
*/

function Scrapers(name){
    // Usage example: 
    // var orgNames = new Scrapers(OrgNames);
    // OR EVEN
    // var orgNames = Scrapers(OrgNames);
    if(name){
        return new name();
    }
}

Scrapers.prototype.print = function(joiner, cb) {
    if(!joiner){
        for (var i = 0; i < this.collection.length; i++) {
            console.log(this.collection[i]);
        }
    }
    else{
        for (var i = 0; i < this.collection.length; i++) {
            console.log(this.collection[i].join(joiner));
        }
    }
    if(cb){
        cb(this.collection);
    }
};

function OrgNames() {
    "use strict";

    var _this = this;

    _this.collection = [];

    Object.defineProperty(_this, 'index', {
        get: function(){
            return _this.collection.length;
        }
    });

    _this.extract = function(cb){
        var a = document.getElementsByClassName('organization-card__container flex-sm-100 flex-md-50 flex-33');
        for (var i = _this.index; i < a.length; i++) {
            var text = a[i].getAttribute('aria-label').replace('Show details for ', '');
            _this.collection.push(text.trim());
        }
        console.log("Done extracting");
        if(cb){cb(_this.collection);};
    }
    /* Save this in orgs.txt */
}
OrgNames.prototype = new Scrapers();
OrgNames.prototype.constructor = OrgNames;

function IdeasPage(){
    "use strict";
    
    var _this = this;

    _this.collection = [];

    Object.defineProperty(_this, 'index', {
        get: function(){
            return _this.collection.length;
        }
    });

    _this.extract = function(cb){
        var i = _this.index;
        GLOBALS.idea = setInterval(function(){
            if(i >= orgs.length){
                clearInterval(GLOBALS.idea);
                console.log("Done extracting");
                if(cb){cb(_this.collection);};
            }
            else{
                orgs[i].click();
                var b = document.getElementsByClassName('md-primary md-button md-soc-theme md-ink-ripple');
                _this.collection.push(b[0].href.trim());
            }
            i++;
        }, 75);
    }
    /* Save this in ideas.txt */
}
IdeasPage.prototype = new Scrapers();
IdeasPage.prototype.constructor = OrgNames;

function Technologies(){
    "use strict";
    
    var _this = this;

    _this.collection = [];

    Object.defineProperty(_this, 'index', {
        get: function(){
            return _this.collection.length;
        }
    });

    _this.extract = function(cb){
        var i = _this.collection.length;
        GLOBALS.tech = setInterval(function(){
            if (i >= orgNamess.length) {
                clearInterval(GLOBALS.tech);
                console.log("Done extracting");
                if(cb){cb(_this.collection);};
            }
            else{
                orgs[i].click();
                _this.collection.push([]);
                var c = document.getElementsByClassName('organization__tag organization__tag--technology');
                for (var j = 0; j < c.length; j++) {
                    _this.collection[i].push(c[j].innerHTML.trim());
                }
            }
            i++;
        }, 75);
    }
    /* Save this in technologies.txt, join with ', ' while printing */
}
Technologies.prototype = new Scrapers();
Technologies.prototype.constructor = OrgNames;

function ImageLinks(){
    "use strict";

    var _this = this;
    _this.collection = [];

    Object.defineProperty(_this, 'index', {
        get: function(){
            return _this.collection.length;
        }
    });

    _this.extract = function(cb){
        var i = _this.index;
        GLOBALS.img = setInterval(function(){
            if (i >= orgs.length) {
                clearInterval(GLOBALS.img);
                console.log("Done extracting");
                if(cb){cb(_this.collection);};
            }
            else{
                var rawImageUrl = orgs[i].style.getPropertyValue('background-image');
                imageUrl = rawImageUrl.replace('url("', 'http:').replace('")', '');
                _this.collection.push(imageUrl);
            }
            i++;
        }, 25);
    };
    /* Save this in images.txt */
}
ImageLinks.prototype = new Scrapers();
ImageLinks.prototype.constructor = OrgNames;


/* 
At this stage of code we have
    var t = new Scrapers(Technologies);
    t instanceof Scrapers;
    // true
    t instanceof Technologies;
    // true
*/


var scroller = function(cb){
    var disabled = false;

    var temp = setInterval(function(){
        if(!disabled){
            var loadMoreButton = document.getElementsByClassName('table-pagination__button md-button md-soc-theme md-ink-ripple')[0];
            loadMoreButton.click();
            setTimeout(function(){
                try{
                    disable = document.getElementsByClassName('table-pagination__button md-button md-soc-theme md-ink-ripple')[0].getAttribute('disabled').trim();
                    disabled = true;
                    console.log("Scrolling done");
                }
                catch(e){
                    // disabled = false;
                }
            }, 2500);
        }
        else{
            clearInterval(temp);
            // window.scrollTo(0, document.body.scrollHeight);
            if(cb){cb();};
        }
    }, 4000);
}