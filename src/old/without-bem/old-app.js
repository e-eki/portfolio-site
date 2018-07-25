
var page = document.querySelector('.wrapper');
var matrixBackground = null; 
var innerWrapper = null; 
var showPageClock = null; //??
var isStartPage = true;


showMatrix();  

// показать пустую страницу с матрицей
function showMatrix(event) {

    matrixBackground = document.createElement('div');
    matrixBackground.className = 'matrix-wrapper';
    matrixBackground.classList.add('matrix-wrapper-for-start-page');
    page.appendChild(matrixBackground);
    fillMatrix();         
    drawMatrix(isStartPage);

    // для IE9 (нельзя выделить элементы матрицы мышью, но можно через Ctrl+A), для остальных прописано в стилях
    matrixBackground.onmousedown = matrixBackground.onselectstart = function() {
        return false;
    };
    window.scrollTo(0,0);

    // по нажатию любой кнопки клавиатуры появляется страница с инфой (матрица остается на фоне)
    addEventListener("keydown", showPage);
    // или по клику мыши
    matrixBackground.addEventListener("click", showPage);
    // или по скроллу
    addEventListener("scroll", showPage);
    // или если ничего не происходит, то по таймауту
    //showPageClock = setTimeout(showPage, 10000);     //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
};

// первый скролл при загрузке начальной страницы происходит автоматически (не всегда, но часто)
var autoScroll = true;

function showPage(event) {
    console.log('showPage', event);
    //if (event) event.preventDefault();   //??? будет ли корректно?

     // проверка на случай, если несколько событий одновременно, не добавилось несколько раз
    if (innerWrapper) return; 

    // первый скролл автоматический, поэтому ничего не делаем
    if (event && event.type == "scroll" && autoScroll) {
        console.log('autoscroll', autoScroll);
        autoScroll = false;
        return;
    }

    removeEventListener("keydown", showPage);
    matrixBackground.removeEventListener("click", showPage);
    removeEventListener("scroll", showPage);
    if (showPageClock) clearTimeout(showPageClock);

    innerWrapper = document.createElement('div');  
    innerWrapper.className = 'inner-wrapper'; 
    innerWrapper.height = window.innerHeight; 
    var page = document.querySelector('.page');
    page.style.display = 'block';
    innerWrapper.appendChild(page);
    page.appendChild(innerWrapper);   

    isStartPage = false;
    drawMatrix(isStartPage);
    window.scrollTo(0,0);

    //autoScrollTimes = 0;
    addPageFunctionality();
}

function addPageFunctionality() {
    var aboutLink = document.getElementById('about');
    var summaryLink = document.getElementById('summary');
    var worksLink = document.getElementById('works');
    var contactsLink = document.getElementById('contacts');

    var aboutLayer = document.querySelector('.about');
    var summaryLayer = document.querySelector('.summary');
    var worksLayer = document.querySelector('.works');
    var contactsLayer = document.querySelector('.contacts');

    var logoWrapper = document.querySelector('.logo-wrapper');
    var activeLink = null;

    var elements = [];
    elements.push({ 
        link: aboutLink,
        layer: aboutLayer
    });
    elements.push({ 
        link: summaryLink,
        layer: summaryLayer
    });
    elements.push({ 
        link: worksLink,
        layer: worksLayer
    });
    elements.push({ 
        link: contactsLink,
        layer: contactsLayer
    });

    aboutLink.addEventListener("click", changeVisibleContent);
    summaryLink.addEventListener("click", changeVisibleContent);
    worksLink.addEventListener("click", changeVisibleContent);
    contactsLink.addEventListener("click", changeVisibleContent);

    //aboutLink.classList.add('active-link');   //сразу после загрузки страницы активным будет раздел "Обо мне"

    /*var currentScrollTop = window.pageYOffset;
    var userScroll = true;    //является ли скролл автоматическим или пользователя
    var bottomScrollingLimit = false;  //прокручена ли страница до самого низа
    var topScrollingLimit = true;   //прокручена ли страница до самого верха - сразу после загрузки страницы прокручена 

    addEventListener("scroll", function(event) {
        console.log('scroll page', event);             
        //console.log('userScroll', userScroll);
        
        var newScrollTop = window.pageYOffset;
        if (newScrollTop > currentScrollTop)
            console.log('newScrollTop > currentScrollTop - вниз');
        else if (newScrollTop < currentScrollTop)
        console.log('newScrollTop < currentScrollTop - вверх');

        //первые два скролла автоматические
        console.log('autoScrollTimes', autoScrollTimes);
        while (autoScrollTimes !== 2) {
            autoScrollTimes++;
            return;
        }
        
        if (userScroll) {
            var newActiveElement = null;
            //console.log('-----------top', topScrollingLimit, 'bottom', bottomScrollingLimit);

            elements.forEach(function(element) {
                if (element.link.classList.contains('active-link')) {
                    var n = elements.indexOf(element);
                    //console.log('active', elements[n]);

                    //если прокрутка вниз
                    if (newScrollTop > currentScrollTop) {
                        //если до этого было проскроллено до самого верха, то не на раздел ниже, а на текущий
                        if (topScrollingLimit) {
                            newActiveElement = element;
                            topScrollingLimit = false;
                        }
                        //если в массиве есть раздел ниже текущего
                        else if ((n+1) < elements.length) newActiveElement = elements[n+1];
                        //если раздел самый нижний
                        else bottomScrollingLimit = true;
                    }
                    //если прокрутка вверх 
                    else if (newScrollTop < currentScrollTop) {
                        //если до этого было проскроллено до самого низа, то не на раздел выше, а на текущий
                        if (bottomScrollingLimit) {
                            newActiveElement = element;
                            bottomScrollingLimit = false;
                        }
                        //если в массиве есть раздел выше текущего
                        else if ((n-1) >= 0) newActiveElement = elements[n-1];
                        //если раздел самый верхний
                        else topScrollingLimit = true;
                    } 
                }
            });

            if (!newActiveElement) console.log('no active');

            //если среди элементов нет активного, значит мы на начальной странице, и активным станет раздел "Обо мне"
            //if (!newActiveElement) newActiveElement = elements[0];
            console.log(newActiveElement);

            if (newActiveElement) {
                showActiveLayer(newActiveElement.link); 
                newActiveElement.layer.scrollIntoView();
            }  
        }

        userScroll = !userScroll;
        currentScrollTop = newScrollTop;
    })*/

    function changeVisibleContent(event) {
        console.log('click: ', event.target, event);
        //event.preventDefault();  ===!!!!!!!
        
        if (event.target.classList.contains('active-link')) return;  //если кликают по активной ссылке

        //если лого еще не скрылся (от скролла), то скрыть его
        //if (!logoWrapper.classList.contains('logo-wrapper-disappear'))
            //logoWrapper.classList.add('logo-wrapper-disappear');

        //showActiveLayer(event.target.parentNode);

        elements.forEach(function(element) {
            element.link.classList.remove('active-link');
            element.layer.style.display = 'none';

            if (element.link == event.target.parentNode) {
                element.link.classList.add('active-link');
                activeLink = element.link;
                element.layer.style.display = 'block';
                element.layer.scrollIntoView();

                for (var i = 0; i < element.layer.childNodes.length; i++) {
                   
                    var elem = element.layer.childNodes[i];

                    if (elem.nodeName == "H2" && 
                        elem.getAttribute("hidden-text") !== "") {
                        setDrawHeaderTimer(elem); 
                    }

                    if (elem.classList && elem.classList.contains("description")) {
                        elem.style.display = 'block';
                        elem.classList.add("description-appear");
                    }
                }
            }
        }) 
    }

    /*function showActiveLayer(link) {
        
        elements.forEach(function(element) {
            element.link.classList.remove('active-link');
            element.layer.style.display = 'none';

            if (element.link == link) {
                element.link.classList.add('active-link');
                activeLink = element.link;
                element.layer.style.display = 'block';
                element.layer.scrollIntoView();

                for (var i = 0; i < element.layer.childNodes.length; i++) {
                    
                    if (element.layer.childNodes[i].nodeName == "H2" && 
                        element.layer.childNodes[i].getAttribute("hidden-text") !== "") {

                        setDrawHeaderTimer(element.layer.childNodes[i]); 
                    }
                }
            }
        }) 
    }*/

    /*function setDrawHeaderTimer(elem) {                                  
        var header = elem.getAttribute("hidden-text");                     
        var counter = 0;

        function drawHeader() {
            if (counter == header.length) {
                clearInterval(drawHeaderClock);
                //elem.classList.add('black-color-animate');
                elem.setAttribute("hidden-text", "");
            }

            elem.innerHTML = header.slice(0, counter) + '<span>_</span>';
            counter++;
        };

        var drawHeaderClock = setInterval(drawHeader, 100);

        elem.classList.add('black-color-animate');
    }*/

    function setDrawHeaderTimer(elem) {                                  
        var header = elem.getAttribute("hidden-text");                     
        var counter = 0;

        function drawHeader() {
            elem.classList.add('black-color-animate');

            if (counter > header.length) {
                elem.setAttribute("hidden-text", "");
                //elem.classList.add('black-color-animate');
                cancelAnimationFrame(drawHeaderRequest);
            }
            else {
                elem.innerHTML = header.slice(0, counter) + '<span>_</span>';
                counter++;
                requestAnimationFrame(drawHeader);
            }
        };
        var drawHeaderRequest = requestAnimationFrame(drawHeader);
    }
}

var columns;
var rows;
var drops;
var counters;

//заполнение страницы столбцами с символами
function fillMatrix() {

    // символы для матрицы
    //var letters = "0123456789qwertyuiopasdfghjklzxcvbnm";
    var letters = "01";
    //converting the string into an array of single characters
    letters = letters.split("");
    
    matrixBackground.height = document.documentElement.clientHeight;
    matrixBackground.width = document.documentElement.clientHeight;
    var fontSize = 10;  //???   
    matrixBackground.style.fontSize = fontSize + 'px';  

    // количество столбцов
    columns = matrixBackground.width/fontSize; 
    // количество строк
    rows = matrixBackground.height/fontSize;
    //an array of drops - one per column
    drops = [];
    // массив счетчиков координаты y для каждой "капли" - тоже по одному на столбец
    counters = [];
    
    // заполнение экрана символами
    for (var x = 0; x < columns; x++) {
        var column = document.createElement('div');
        column.className = 'column';
        //инициализируем массив символов для каждого столбца
        drops[x] = [];
        // рандомная координата У или null для каждого столбца - для текущего подсвеченного символа в столбце
        // чтобы не по всем столбцам сбегали символы - выбираем некоторые по Math.random() > 0.5
        counters[x] = Math.random() > 0 ? Math.floor(Math.random()*rows) : null;
    
        // заполнение столбца символами
        for (var y = 0; y < rows; y++) {
            var letter = document.createElement('div');
            letter.className = 'letter';
            letter.x = x;
            letter.y = y;
            letter.mouseMove = false;
            // случайный символ из массива символов
            letter.textContent = letters[Math.floor(Math.random()*letters.length)];
            column.appendChild(letter);
            drops[x].push(letter);
        }
        matrixBackground.appendChild(column);
    }
}

var drawLettersRequest = null;

// величина, на которую будем уменьшать прозрачность символов при каждом проходе
// вообще она равна 0.9/rows, но так слишком медленно происходит затухание
var opacityUnit = 0.9 * 1.5/rows; 

//отрисовка символов
function drawMatrix() {
    console.log('вызов', isStartPage);
    var prevTime = null;

    if (!drawLettersRequest) drawLettersRequest = requestAnimationFrame(drawLetters);

    //если рисуем матрицу не для заставки, а для фона домашней страницы, то удаляем сначала предыдущую отрисовку
    if (!isStartPage) {
        console.log('---------');
        //cancelAnimationFrame(drawLettersRequest);
        matrixBackground.removeEventListener("mousemove", drawMouseTrackForStartPage);
    }

    function drawLetters(time) {  
        /*if (!isStartPage) {            
            cancelAnimationFrame(drawLettersRequest);
            return;
        } */

        // через интервал времени проходим по всем столбцам и в каждом столбце
        // каждому символу меняем прозрачность по принципу: символ, 
        // соответствующий значению из counters для данного столбца - 1,
        // всем остальным уменьшаем прозрачность на величину opacityUnit
        for (var i = 0; i < columns; i++) {
            var c = counters[i];

            // если шибко виснет, то можно выключить несколько столбцов с бегущими символами
            // Math.random() нужен здесь потому, что иначе выключает вообще все столбцы
            if ((time - prevTime) > 100 && Math.random() > 0.6) {
                c = null;
            }

            /*if (isStartPage) {  //??????????!!!!!!!!!!!!!
                // чтобы иногда появлялись новые столбцы с бегущими символами
                if (c == null && Math.random() > 0.99) {
                    c = 0;
                }
            }*/

            if (c !== null && c > rows) {
                //когда матрица является заставкой - если счетчик для текущего столбца дошел до низа, переходим наверх
                if (isStartPage) c = 0;

                //когда матрица становится фоном домашней страницы, то бегущие символы постепенно затухают
                //поэтому выключаем активный столбец, когда счетчик дошел до низа
                else c = null;
            }
            
            if (c !== null) {
                //максимальная яркость у символа, соответствующего значению счетчика для данного столбца
                drops[i][c].style.opacity = 1;

                // инкрементим координату текущего символа для данного столбца
                c++;
                counters[i] = c;
            } 

            // проходим по всем символам столбца и уменьшаем прозрачность на величину opacityUnit
            for (var j = drops[i].length-1; j >= 0; j--) {
                if (c !== null && j == c) continue;
                
                var newOpacity;
                // если стартовая страница и символ попадает в след от мыши, то прозрачность уменьшается быстрее
                if (isStartPage && drops[i][j].mouseMove == true) {
                    newOpacity = drops[i][j].style.opacity - 5*opacityUnit;
                    
                }
                // во всех остальных случаях прозрачность уменьшается на opacityUnit
                else {
                    newOpacity = drops[i][j].style.opacity - opacityUnit;  
                    
                    // если мы не на стартовой странице, ли символ попадает в след мыши, то при достижении прозрачности 0.5
                    // меняем ему цвет на обычный для эффекта плавной смены цвета
                    if (!isStartPage && drops[i][j].mouseMove == true && newOpacity <= 0.5)
                        drops[i][j].style.color = '#0F0';
                }
                // когда прозрачность становится = 0, т.е. символ исчезает, возращаем ему обычный цвет и убираем флаг mouseMove  
                if (newOpacity <= 0) {
                    drops[i][j].style.color = '#0F0';
                    drops[i][j].mouseMove = false;
                }
                
                drops[i][j].style.opacity = newOpacity > 0 ? newOpacity : 0;
            }
        }
        prevTime = time;

        requestAnimationFrame(drawLetters);
    }

    // добавляем след от движения мыши - на стартовой странице 
    // при движении мыши окружающие символы становятся светлыми, а потом быстро исчезают
    if (isStartPage) matrixBackground.addEventListener("mousemove", drawMouseTrackForStartPage);  
    // на фоне для домашней страницы символы появляются, и, доходя до низа страницы, исчезают.
    // при этом их цвет сменяется со светлого на обычный
    else addEventListener("mousemove", drawMouseTrackForHomePage);  
}

function drawMouseTrackForStartPage(event) {
    // ширина и высота следа мыши
    for (var i = event.target.x - 10; i < event.target.x + 10; i++) {
        for (var j = event.target.y - 15; j < event.target.y + 15; j++) {
            //если есть символ с такими координатами, и если он виден (opacity > 0)
            if (drops[i] && drops[i][j] && drops[i][j].style.opacity > 0 &&
                // и если он еще не попал в след мыши (флаг mouseMove) - иначе будет след мерцать
                // и не все символы, но многие (Math.random() > 0.45)
                drops[i][j].mouseMove == false && Math.random() > 0.45) {
                    // то меняем цвет, прозрачность и ставим флаг
                    drops[i][j].style.color = 'palegreen';
                    drops[i][j].style.opacity = 1;
                    drops[i][j].mouseMove = true;
            }           
        }
    }
}

function drawMouseTrackForHomePage(event) {
    // ширина и высота следа мыши
    var currentRow = (event.target.parentNode.className == 'column') ? event.target.y : Math.floor(event.clientY * 0.09);
        
        for (var i = 0; i < columns; i++) {
            for (var j = currentRow - 5; j < currentRow + 5; j++) {
            //если есть символ с такими координатами
            if (drops[i] && drops[i][j] &&
                // и если он еще не попал в след мыши (флаг mouseMove) - иначе будет след мерцать
                // и не все символы, но многие (Math.random() > 0.45)
                drops[i][j].mouseMove == false && Math.random() > 0.975) {
                    // то меняем цвет, прозрачность и ставим флаг
                    drops[i][j].style.color = 'palegreen';
                    drops[i][j].style.opacity = 1;
                    drops[i][j].mouseMove = true;

                    if (counters[i] !== null)
                        counters[i] = j;
            }                  
        }
    }
}



//-----------------СТАРОЕ------------------------------------------------------
// Вариант отрисовки символов в матрице с помощью CSS-анимации (адово тормозит)
var drawLettersClock;

function drawMatrix1() {

    //если рисуем матрицу не для заставки, а для фона домашней страницы, то удаляем сначала предыдущую отрисовку
    if (!isStartPage) {
        //if (drawLettersClock) clearInterval(drawLettersClock);
        matrixBackground.removeEventListener("mousemove", drawMouseTrackForStartPage);
    }

    var drawLettersRequest = requestAnimationFrame(drawLetters);

    function drawLetters(time) {

        // через интервал времени проходим по всем столбцам и в каждом столбце
        // символу, соответствующему значению у в counters добавляем класс с анимацией подсветки/затухания
        // удаляем класс (если уже есть) с анимацией осветления/затухания от движения мыши
        for (var i = 0; i < columns; i++) {
            var c = counters[i];
            if (!c) continue;
            //if (i == (counters.length - 1) && c == (lastDropCount-1)) clearInterval(drawLettersClock); 
            
            // если дошли до низа, переходим наверх
            //if (c > rows && Math.random() > 0.975) c = 0;
            if (c > rows) c = 0;

            if (isStartPage)
                drops[i][c].classList.add('letter-backlight-first');   
            else {
                //drops[i][c].classList.remove('letter-backlight-first');
                drops[i][c].classList.add('letter-backlight-second');
            }             
                
            if (drops[i][c].classList.contains('letter-mouse-trace'))
                drops[i][c].classList.remove('letter-mouse-trace');

            // инкрементим координату текущего символа
            c++;
            counters[i] = c;
        }
        requestAnimationFrame(drawLetters);
    }
    
    //drawLettersClock = setInterval(drawLetters, 100);

    // добавляем след от движения мыши
    if (isStartPage) matrixBackground.addEventListener("mousemove", drawMouseTrackForStartPage);
    else addEventListener("mousemove", drawMouseTrackForHomePage);   

    function drawMouseTrackForStartPage(event) {

        for (var i = event.target.x - 8; i < event.target.x + 8; i++) {
            for (var j = event.target.y - 10; j < event.target.y + 10; j++) {
                if (drops[i] && drops[i][j] && Math.random() > 0.4) {
                    if (drops[i][j].classList.contains('letter-backlight-first'))
                        drops[i][j].classList.add('letter-mouse-trace');
                        drops[i][j].classList.remove('letter-backlight-first');
                }                   
            }
        }
    }

    function drawMouseTrackForHomePage(event) {
 
        var currentRow = (event.target.parentNode.className == 'column') ? event.target.y : Math.floor(event.clientY * 0.09);
        
        for (var i = 0; i < columns; i++) {
            for (var j = currentRow - 5; j < currentRow + 5; j++) {
                if (drops[i] && drops[i][j] && Math.random() > 0.85) {
                    if (drops[i][j].classList.contains('letter-backlight-second'))
                        drops[i][j].classList.add('letter-mouse-trace');
                        drops[i][j].classList.remove('letter-backlight-second');
                }   
            }
        }
    }
}
//-------------------------------------------------------------------------------------







