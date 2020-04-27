//@prepros-prepend jquery-2.1.1.min.js
//@prepros-prepend jq.cooki.js
//@prepros-prepend herd.js
//@prepros-prepend owl.carousel.min.js

var isIE = false || !!document.documentMode;

if (isIE) {
    var head = document.getElementsByTagName("head")[0];
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "../css/special-offer-ie.min.css";
    head.appendChild(link);
}

$(document).ready(function () {
    $(function () {
        $('header').clone().addClass('header-stick').appendTo('body');
        $(window).scroll(function () {
            if ($(this).scrollTop() >= 50) {
                $(".header-stick").slideDown(500);

            } else {
                $(".header-stick").hide();

            }
        })
    })
    $(function () {
        var dateNow = new Date();
        var Day = dateNow.getDate();
        var Month = dateNow.getMonth();
        var monthNow;
        switch (Month) {
            case 0:
                monthNow = 'января';
                break;
            case 1:
                monthNow = 'февраля';
                break;
            case 2:
                monthNow = 'марта';
                break;
            case 3:
                monthNow = 'Апреля';
                break;
            case 4:
                monthNow = 'мая';
                break;
            case 5:
                monthNow = 'июня';
                break;
            case 6:
                monthNow = 'июля';
                break;
            case 7:
                monthNow = 'августа';
                break;
            case 8:
                monthNow = 'сентября';
                break;
            case 9:
                monthNow = 'октября';
                break;
            case 10:
                monthNow = 'ноября';
                break;
            case 11:
                monthNow = 'декабря';
                break;
        }

        $('.today').html(Day + ' ' + monthNow);
    });
    $(function () {
        /* Таймер */
        var houres = document.querySelector('.count-houres'),
            minutes = document.querySelector('.count-minutes'),
            seconds = document.querySelector('.count-seconds'),
            currDate = new Date(),
            // switchTimeString = String(currDate.getFullYear()) + '-' + String(currDate.getMonth() + 1) + '-' + String(currDate.getDate()) + ' 17:55:55 UTC+3',
            // switchTimeStringLate = String(currDate.getFullYear()) + '-' + String(currDate.getMonth() + 1) + '-' + String(currDate.getDate()) + ' 23:55:00 UTC+3',
            // switchDeadline = new Date(switchTimeString.replace(/-/g, '/')),
            // switchDeadlineLate = new Date(switchTimeStringLate.replace(/-/g, '/')),
            timeString = String(currDate.getFullYear()) + '-' + String(currDate.getMonth() + 1) + '-' + String(currDate.getDate()) + ' 23:59:59 UTC+3',
            deadline = new Date(timeString.replace(/-/g, '/')),
            diff = deadline - currDate,
            diffSecondes = Math.floor((diff / 1000) % 60),
            diffMinutes = Math.floor((diff / 1000 / 60) % 60),
            diffHoures = Math.floor((diff / (1000 * 60 * 60)) % 24);

        (function timer() {
            houres.innerHTML = diffHoures;
            minutes.innerHTML = diffMinutes;
            seconds.innerText = diffSecondes;
            if (diffHoures < 10) {
                houres.innerHTML = '0' + diffHoures;
            }

            if (diffMinutes < 10) {
                minutes.innerHTML = '0' + diffMinutes;
            }
            if (diffMinutes < 0) {
                diffMinutes = 59;
                minutes.innerHTML = diffMinutes;
            }
            if (diffSecondes < 10) {
                seconds.innerHTML = '0' + diffSecondes
            }
            if (deadline < currDate) {
                clearTimeout(timeCount);
                houres.innerHTML = '00';
                minutes.innerHTML = '00';
                seconds.innerText = '00';
            }
            var timeCount = setTimeout(function () {
                    diffSecondes--;
                    seconds.innerHTML = diffSecondes;
                    if (diffSecondes < 10) {
                        seconds.innerHTML = '0' + diffSecondes
                    }
                    if (diffSecondes < 0) {
                        diffSecondes = 59,
                            seconds.innerHTML = diffSecondes;
                        diffMinutes--;
                        minutes.innerHTML = diffMinutes;
                        if (diffMinutes < 10) {
                            minutes.innerHTML = '0' + diffMinutes;
                        }
                        if (diffMinutes < 0) {
                            minutes.innerHTML = '59';
                            diffHoures--
                            houres.innerHTML = diffHoures;
                        }
                        if (diffHoures < 0) {
                            diffHoures = 23;
                            houres.innerHTML = diffHoures
                        }
                    }
                    timer();
                },
                1000);
        })();
    });
    /*Отзывы*/
    $(function () {
        $('#video-revs').owlCarousel({
            slideSpeed: 200,
            paginationSpeed: 200,
            items: 3,
            loop: true,
            margin: 20,
            nav: true,
            navText: ["‹", "›"],
            dots: false,
            autoHeightClass: 'owl-height',
            autoHeight: true,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 2
                },
                767: {
                    items: 3
                }
            }
        });
    });
    /* Видео */
    $(".video-wrapper-rev img, .video-wrapper-rev-item img").click(function () {
        var a = $(this).parent().attr("data-youtube");
        $(this).parent().html('<iframe src="https://www.youtube.com/embed/' + a + '?mute=1&autoplay=1&rel=0" allowfullscreen></iframe>')
    });
    $(function () {
        $('#video-revs .owl-prev, #video-revs .owl-next').click(function () {
            $('.video-wrapper-rev iframe').each(function () {
                var l = $(this).parent().attr('data-img');
                $(this).parent().html('<img src="' + l + '" alt="Видео отзыв">');
            });
            $(".video-wrapper-rev img").click(function () {
                var a = $(this).parent().attr("data-youtube");
                $(this).parent().html('<iframe src="https://www.youtube.com/embed/' + a + '?mute=1&autoplay=1&rel=0" allowfullscreen></iframe>')
            });
        });
    })

    /*Конец документа*/
});