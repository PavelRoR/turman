
// Cookie scripts
var Cookie =
{
    set: function (name, value, days) {
        var domain, domainParts, date, expires, host;

        if (days) {
            date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toGMTString();
        }
        else {
            expires = "";
        }

        host = location.host;
        if (host.split('.').length === 1) {
            // no "." in a domain - it's localhost or something similar
            document.cookie = name + "=" + value + expires + "; path=/";
        }
        else {
            // Remember the cookie on all subdomains.
            //
            // Start with trying to set cookie to the top domain.
            // (example: if user is on foo.com, try to set
            //  cookie to domain ".com")
            //
            // If the cookie will not be set, it means ".com"
            // is a top level domain and we need to
            // set the cookie to ".foo.com"
            domainParts = host.split('.');
            domainParts.shift();
            domain = '.' + domainParts.join('.');

            document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;

            // check if cookie was successfuly set to the given domain
            // (otherwise it was a Top-Level Domain)
            if (Cookie.get(name) == null || Cookie.get(name) != value) {
                // append "." to current domain
                domain = '.' + host;
                document.cookie = name + "=" + value + expires + "; path=/; domain=" + domain;
            }
        }
    },

    get: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }

            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },

    erase: function (name) {
        Cookie.set(name, '', -1);
    }

};

widget_herd_instinct([10, 10, 30, 50, 40, 70, 80]);


function widget_herd_instinct(data) {
    // SET PEOPLE LIST
    var peopleList = [
        ['Михаил Водолазко', 'Москва'],
        ['Раиса Овчаренко', 'Санкт-Петербург'],
        ['Сергей Шевченко', 'Пермь'],
        ['Виктория Кубрицкая', 'Москва'],
        ['Федив Татьяна', 'Москва'],
        ['Азамат Тулей', 'Краснодар'],
        ['Алексей Стецюк', 'Москва'],
        ['Анастасия Малежик', 'Санкт-Петербург'],
        ['Зубатюк Артем', 'Красноярск'],
        ['Бершадский Егор', 'Тюмень'],
        ['Валентин Москаленко', 'Владивосток'],
        ['Валерия Лавренюк', 'Москва'],
        ['Владимир Бондаренко', 'Краснодар'],
        ['Денис Сучак', 'Сургут'],
        ['Кожурин Екатерина', 'Н.Новгород'],
        ['Теличко Вадим', 'Обнинск'],
        ['Александр Бобровский', 'Москва'],
        ['Евгения Колесник', 'Санкт-Петербург'],
        ['Светлана Фисюк', 'Чебаркуль'],
        ['Даниил Иванченко', 'Челябинск'],
        ['Жук Илья', 'Москва'],
        ['Иван Поплавский', 'Санкт-Петербург'],
        ['Антон Малецкий', 'Пермь'],
        ['Инна Алексенко', 'Краснодар'],
        ['Надежда Смирнова', 'Калуга'],
        ['Анна Мошко', 'Архангельск'],
        ['Корнеев Михаил', 'Москва'],
        ['Крыця Алина', 'Москва'],
        ['Ксения Иващенко', 'Санкт-Петербург'],
        ['Виолетта Ласкун', 'Мурманск'],
        ['Лариса Левченко', 'Казань'],
        ['Леонид Самойлов', 'Казань'],
        ['Сергей Тихонов', 'Казань'],
        ['Мария Мельник', 'Уфа'],
        ['Мирослав Дорошевич', 'Уфа'],
        ['Николай Подолян', 'Москва'],
        ['Оксана Ливчук', 'Санкт-Петербург'],
        ['Олег Завадский', 'Пермь'],
        ['Яна Сочинская', 'Адыгейск'],
        ['Анастасия Дехтяренко', 'Грозный'],
        ['Тамара Плахотина', 'Долгопрудный'],
        ['Моисеенко Кирил', 'Екатеринбург'],
        ['Тимур Ткаченко', 'Екатеринбург'],
        ['Анна Чех', 'Москва'],
        ['Эдуард Егоров', 'Краснодар'],
        ['Мартынюк Виктория', 'Железногорск'],
        ['Юрий Жайворонок', 'Н.Новгород'],
        ['Ярослав Заяц', 'Пермь'],
        ['Ангелина Ешанова', 'Москва'],
        ['Омельченко Лилия', 'Иркутск']
    ];

    var timeList = ['только что', '1 мин. назад', '5 мин. назад', '3 мин. назад', '10 мин. назад', '4 мин. назад'];
    function show_widget() {
        if ($.cookie("push")) {
            var delpeople = $.cookie("push").split(',');
            if (delpeople.length < peopleList.length) {
                delpeople.sort(compareNumeric);
                for (var i = 0; i < peopleList.length; i++) {
                    peopleList[i].push(String(i));
                }
                for (var i = 0; i < delpeople.length; i++) {
                    peopleList.splice((Number(delpeople[i]) + 1), 1);
                    // console.log('i: ' + (Number(delpeople[i])) + ' el: ' + peopleList.splice((Number(delpeople[i])), 1));
                }
                var r = getRandomInt(0, peopleList.length - 1);
                $.cookie("push", $.cookie("push") + ',' + peopleList[r][2], { expires: null });
                var rt = getRandomInt(0, timeList.length - 1);
            }
        } else {
            var r = getRandomInt(0, peopleList.length - 1);
            $.cookie("push", r, { expires: null });
        }

        // $('.hidden-audio-button').on('click', function () {
        //     var snd = new Audio("../audio/light.mp3");
        //     snd.play();
        // })

        if (peopleList !== []) {
            // $('.hidden-audio-button').click();
            $('.widget_herd_instinct span.res_name').html(peopleList[r][0] + '&nbsp;');
            $('.widget_herd_instinct span.res_city').html(peopleList[r][1]);
            $('.widget_herd_instinct span.time').html(timeList[rt]);
            $('.widget_herd_instinct').addClass('open_widget');
            setTimeout(hide_widget, 10000);

        }
    }

    function hide_widget() {
        $('.widget_herd_instinct').removeClass('open_widget');

    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function compareNumeric(a, b) {
        if (Number(a) < Number(b)) return 1;
        if (Number(a) > Number(b)) return -1;
    }



    // ADD HTML MODAL WINDOW
    $('body').append("<div class='widget_herd_instinct'><div class='cross-button'>+</div><div class='ticket'></div><p class='reserv'><span class='res_name'>" + data.name + "</span> из г. <span class='res_city'>" + data.city + "</span> <br>Купил(а) спецпредложение от В.Турмана<span class='time'>" + data.time + "</span></p><button class='hidden-audio-button'></button></div>");

    // SET COOKIE DATA

    $('.widget_herd_instinct .cross-button').on('click', function () {
        hide_widget();
    })

    for (var i = 0; i < data.length; i++) {
        setTimeout(show_widget, (data[i] * 1000))
    }
}

