Вам нужно создать объект который описывает новостную рассылку:

const newsFeed = {
   _articles: [],
   _isBusy: false,
   init(articles) {},
   addArticle(article, cb) {},
   removeArticle(article, cb) {},
   find(functor, cb) {},
   query(queryString) {}
};

_articles - это массив из объектов;

const article = {
   title: 'required',
   content: 'required'
}

Поля title и content обязательные и должны быть не пустыми строками;

_isBusy хранит в себе состояние рассылки, устанавливается следующими методами:
   addArticle,
   removeArticle,
   find;

То есть все методы которые имеют в списке аргументов коллбек.
_isBusy - получает значение true в начале работы метода и false в конце работы;

addArticle добавляет новую статью. Коллбек не принимает аргументов.

removeArticle удаляет статью по ссылке. Коллбек выполняется с удаленной записью или с null если запись не была найдена.

find - В случаи если функтор возвращает true да какой либо статьи то find выполняет коллбек с найденной статьей.
   В случае если функтор возвращает false для всех статей, то find выполняет коллбек с null.


query - Производит поиск по статьям, и возвращает отсортированные статьи.

Принцип поиска следующий, нужно подсчитать количество совпавших слов в title и в content. Статья в которой количество совпадений наибольшее всплывает,
статья с наименьшим количеством совпадений тонет. Статьи с одинаковым количеством совпадений тестироваться не будут.
Использовать только уникальные слова из запроса, то есть из строки 'hello hello friend' использовать только hello и friend.
Поиск производить без учета регистра.

Все методы должны проверять флаг _isBusy и в случаи если он установлен в true возвращать false.



Задание высылать на почту тренеру: sergey.zotenko@dev-pro.net
Тема письма: OpenJS KhNURE - Exam3 - <Name Surname>
Deadline: 23 ноября (четверг) 9:00 AM



const CounterModule = (function() {
    let _counter;
    return {
        getCounter: function() {
            let seconds = 0;
            if (!_counter) {
                _counter = function() {
                    seconds += 1;
                    return seconds;
                }
            }
            return _counter;
        }
    }
})();
let counter1 = CounterModule.getCounter();
let counter2 = CounterModule.getCounter();
console.log(counter1 === counter2);
console.log(counter1(), counter1(), counter1());
console.log(counter2(), counter2(), counter2());