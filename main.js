//// JavaScript
var orgs = document.getElementsByClassName('org__logo');

var GLOBALS = {
    idea: 0,
    tech: 0,
    img: 0
}

var OrgNames = function () {
    var _this = this;

    _this.orgNames = [];

    Object.defineProperty(_this, 'index', {
        get: function(){
            return _this.orgNames.length;
        }
    });

    _this.extract = function(cb){
        var a = document.getElementsByClassName('organization-card__container flex-sm-100 flex-md-50 flex-33');
        for (var i = _this.index; i < a.length; i++) {
            var text = a[i].getAttribute('aria-label').replace('Show details for ', '');
            _this.orgNames.push(text.trim());
        }
        console.log("Done extracting");
        if(cb){cb(_this.orgNames);};
    }

    _this.print = function(cb){
        /* Save this in orgs.txt */
        for (var i = 0; i < _this.orgNames.length; i++) {
            console.log(_this.orgNames[i]);
        }
        if(cb){cb();};
    }
}

var IdeasPage = function(){
    var _this = this;

    _this.ideasPage = [];

    Object.defineProperty(_this, 'index', {
        get: function(){
            return _this.ideasPage.length;
        }
    });

    _this.extract = function(cb){
        var i = _this.index;
        GLOBALS.idea = setInterval(function(){
            if(i >= orgs.length){
                clearInterval(GLOBALS.idea);
                console.log("Done extracting");
                if(cb){cb(_this.ideasPage);};
            }
            else{
                orgs[i].click();
                var b = document.getElementsByClassName('md-primary md-button md-soc-theme md-ink-ripple');
                _this.ideasPage.push(b[0].href.trim());
            }
            i++;
        }, 75);
    }

    _this.print = function(cb){
        /* Save this in ideas.txt */
        for (var i = 0; i < _this.ideasPage.length; i++) {
            console.log(_this.ideasPage[i]);
        }
    }
}

var Technologies = function(){
    var _this = this;

    _this.technologies = [];

    Object.defineProperty(_this, 'index', {
        get: function(){
            return _this.technologies.length;
        }
    });

    _this.extract = function(cb){
        var i = _this.technologies.length;
        GLOBALS.tech = setInterval(function(){
            if (i >= orgs.length) {
                clearInterval(GLOBALS.tech);
                console.log("Done extracting");
                if(cb){cb(_this.technologies);};
            }
            else{
                orgs[i].click();
                _this.technologies.push([]);
                var c = document.getElementsByClassName('organization__tag organization__tag--technology');
                for (var j = 0; j < c.length; j++) {
                    _this.technologies[i].push(c[j].innerHTML.trim());
                }
            }
            i++;
        }, 75);
    }

    _this.print = function(cb){
        /* Save this in technologies.txt */
        for (var i = 0; i < _this.technologies.length; i++) {
            console.log(_this.technologies[i].join(', '));
        }
        if(cb){cb();};
    }
}

var ImageLinks = function(){
    var _this = this;
    _this.imageLinks = [];

    Object.defineProperty(_this, 'index', {
        get: function(){
            return _this.imageLinks.length;
        }
    });

    _this.extract = function(cb){
        var i = _this.index;
        GLOBALS.img = setInterval(function(){
            if (i >= orgs.length) {
                clearInterval(GLOBALS.img);
                console.log("Done extracting");
                if(cb){cb(_this.imageLinks);};
            }
            else{
                var rawImageUrl = orgs[i].style.getPropertyValue('background-image');
                imageUrl = rawImageUrl.replace('url("', 'http:').replace('")', '');
                _this.imageLinks.push(imageUrl);
            }
            i++;
        }, 25);
    };

    _this.print = function(cb){
        /* Save this in images.txt */
        for (var i = 0; i < _this.imageLinks.length; i++) {
            console.log(_this.imageLinks[i]);
        }
        if(cb){cb();};
    };

}

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