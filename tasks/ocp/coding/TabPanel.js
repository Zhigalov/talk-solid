function TabPanel () {
    this._tabs = [];
    if (location.hash !== "") {
        // Десериализация
    }

    this.addTab = function (tab) {
        this._tabs.push(tab);
        this.serialize();
    }

    this.render = function () {
        this._tabs.forEach(function (tab) {
           console.log(tab.render());
        });
    }

    this.serialize  = function () {
        location.hash = this._tabs.map(function (tab) {
            JSON.stringify(tab.getState());
        }).join(',');
    }
};

/**
 * Базовый таб.
 * @param {String} text
 * @constructor
 */
function DefaultTab(text) {
    /**
     * Отрисовка таба.
     */
    this.render = function () {
        return 'text: ' + text;
    }

    this.getState = function () {
        return {text: text};
    }
}

/**
 * Таб статьи.
 * @constructor
 */
function ArticleTab(text, icon) {
    ArticleTab.superclass.constructor.call(this, text);
    var superRender = this.render;

    /**
     * Отрисовка таба статьи.
     * @returns {string}
     */
    this.render = function () {
        var result = superRender.call(this);
        return result + '; icon: ' + icon;
    }
}
extend(ArticleTab, DefaultTab);

/**
 * Таб списка.
 * @constructor
 */
function ListTab(text, list) {
    ListTab.superclass.constructor.call(this, text);
    var superRender = this.render;

    /**
     * Отрисовка таба списка.
     * @returns {string}
     */
    this.render = function () {
        var result = superRender.call(this);
        return result + '; count: ' + (list && list.length) || 0;
    }
}
extend(ListTab, DefaultTab);

/**
 * Таб загрузчика.
 * @constructor
 */
function LoaderTab(text, list) {
    LoaderTab.superclass.constructor.call(this, text);
    var superRender = this.render;

    /**
     * Отрисовка таба загрузчика.
     * @returns {string}
     */
    this.render = function () {
        var result = superRender.call(this);
        return result + '; isLoad: ' + !!(Math.random() > 0.5);
    }
}
extend(LoaderTab, DefaultTab);

var articleTab = new ArticleTab('ArticleTabText', 'ArticleTabIcon');
var listTab = new ListTab('ListTabText', [1, 2, 3]);
var loaderTab = new LoaderTab('LoaderTabText');

var tabPanel = new TabPanel();

tabPanel.addTab(articleTab);
tabPanel.addTab(listTab);
tabPanel.addTab(loaderTab);

tabPanel.render();

/**
 * Наследование
 */
function extend(Child, Parent) {
    var F = function () {
    }
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.superclass = Parent.prototype
}
