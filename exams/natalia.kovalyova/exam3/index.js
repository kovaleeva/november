const ProjectModule = (() => {
    let instance;
    const newsFeed = {
        _articles: [],
        _isBusy: false,

        init(articles) {
            if (!articles) return false;

            let articleInside = articles.every((article) => {
                return typeof article === 'object' && article.hasOwnProperty('title') && article.hasOwnProperty('content');
            });

            if (!Array.isArray(articles) || !articleInside) return false;

            this._articles = articles;
            this._isBusy = false;
        },

        addArticle(article, cb) {
            if (!(typeof article === 'object' && article.hasOwnProperty('title') && article.hasOwnProperty('content'))) return false;

            this._isBusy ? false : (this._isBusy = true);

            setTimeout(() => {
                this._isBusy = false;

                if (article) {
                    this._articles.push(article);
                    cb();
                } else {
                    cb.call(this, article);
                }
            });
        },

        removeArticle(article, cb) {
            if (!(typeof article === 'object' && article.hasOwnProperty('title') && article.hasOwnProperty('content'))) return false;

            this._isBusy ? false : (this._isBusy = true);

            setTimeout(() => {
                let removedIndex = this._articles.indexOf(article);
                this._isBusy = false;
                (removedIndex === -1) ? cb(null) : cb(this._articles.splice(removedIndex)[0]);
            });
        },

        find(functor, cb) {
            if (typeof functor !== 'function') return false;

            this._isBusy ? false : (this._isBusy = true);

            setTimeout(() => {
                let result = this._articles.find(functor);
                this._isBusy = false;
                (result === undefined) ? cb(null) : cb(result);
            });
        },

        query(queryString) {
            if (queryString.trim() === '') return [];

            let querySplit = queryString.split(' '),
                notRepeat = {};

            querySplit.forEach(el => {
                if(el !== '') notRepeat[el] = true;
            });

            let regString = '(\\b|$)(' + Object.keys(notRepeat).join('|') + ')(\\b|$)';
            let reg = new RegExp(regString, 'ig');
            
            let arr = this._articles.filter(obj => {
                return !!(obj.title.match(reg) || obj.content.match(reg));
            });

            if (arr.length === 0) return arr;

            return arr.sort((a, b) => {
                    let titleA = (a.title.match(reg) === null) ? 0 : a.title.match(reg).length,
                        titleB = (b.title.match(reg) === null) ? 0 : b.title.match(reg).length;

                    let contentA = (a.content.match(reg) === null) ? 0 : a.content.match(reg).length,
                        contentB = (b.content.match(reg) === null) ? 0 : b.content.match(reg).length;

                    let x = titleA + contentA,
                        y = titleB + contentB;

                    if (x > y) return -1;
                    if (x < y) return 1;
                    return 0;
                }
            );
        }
    };

    const createInstance = () => newsFeed;

    return {
        getInstance() {
            if (!instance) instance = createInstance();
            return instance;
        },
    };
})();


module.exports = {
    firstName: 'Natalia',
    lastName: 'Kovalyova',
    task: ProjectModule
};