'use strict';

import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import MatrixColumn from './matrixColumn';
import MatrixLetter from './matrixLetter';
import Content from './content';

export default class Matrix extends Component {

    constructor(props) {
        super(props);

        this.fontSize = 10.5;   // !было 10
        this.height = this.props.height;
        this.width = this.props.width;

        // количество столбцов
        this.columns = this.width/this.fontSize; 
        // количество строк
        this.rows = this.height/this.fontSize;
        // сверху обрезанные символы при указанной высоте, возможно лучше заполнять this.rows-1, но не факт,
        // поэтому вводим переменную firstRow
        this.firstRow = 1;  
        // массив счетчиков координаты y текущего (самого яркого) символа для каждого столбца
        this.counters = [];
        // символы для матрицы
        //this.letters = "0123456789qwertyuiopasdfghjklzxcvbnm";
        this.letters = "01";
        this.letters = this.letters.split("");

        // this.lettersDataContainer - нужен для this.setState и последующей перерисовки (?),
        // пишем значения в него, а берем из this.state.lettersDataContainer
        //массив со значениями, определяющими отрисовку, для каждого символа в матрице
        this.lettersDataContainer = [];

        for (let x = 0; x < this.columns; x++) {
            this.lettersDataContainer[x] = [];
            // чтобы не по всем столбцам сбегали символы - выбираем некоторые по Math.random()
            if (Math.random() > 0.7) {
                this.counters.push(null);   // данный столбец будет пустой
            }
            else {
                // рандомная координата У или null для каждого столбца - для текущего символа в столбце
                this.counters.push(Math.floor(Math.random()*this.rows)); 

                for (let y = 0; y < this.rows; y++) {
                    // значение символа
                    const letterContent = this.letters[Math.floor(Math.random()*this.letters.length)];

                    // сохраняем в массив информацию о символе
                    this.lettersDataContainer[x].push(
                        {
                            letterContent: letterContent,  // значение символа
                            opacity: 0, // начальное значения прозрачности
                            class: 'matrix__letter_color-main',  // начальное значения цвета
                            mouseTrack: false  // входит ли символ в область следа от мыши
                        }
                    );
                }  
            }
        }

        // кладем массив в состояние, чтобы его потом менять, вызывая перерисовку
        this.state = {
            counters: this.counters,
            isStartPage: true,  // флаг, является ли страница стартовой (или домашней)
            lettersDataContainer: this.lettersDataContainer
        };

        //минимальная величина, на которую будет изменяться прозрачность символов
        this.opacityUnit = 0.9 * 1.5/this.rows;

        // для подсчета времени между вызовами перерисовки
        this.prevTime = null;

        this.showContentClock = null;

        this.fillMatrix = this.fillMatrix.bind(this);
        this.drawMatrix = this.drawMatrix.bind(this);
        this.drawMouseTrackForStartPage = this.drawMouseTrackForStartPage.bind(this);
        this.drawMouseTrackForHomePage = this.drawMouseTrackForHomePage.bind(this);
        this.showContent = this.showContent.bind(this);

        this.content = <Content className = 'content_hidden'/>;
    }

    //заполнение страницы символами
    fillMatrix() {
        ////console.log('fillMatrix');
        const matrixContent = [];
        // уникальный ключ для каждого символа
        let letterKey = 0;

        // заполнение столбцами
        for (let x = 0; x < this.columns; x++) {  
            const columnContent = [];

            // если это не пустой столбец
            if (this.state.counters[x] !== null) {
                // заполнение столбца символами
                for (let y = this.firstRow; y < this.rows; y++) {
                    columnContent.push(
                        <MatrixLetter
                            key={letterKey}
                            letterContent={this.state.lettersDataContainer[x][y].letterContent}
                            opacity={this.state.lettersDataContainer[x][y].opacity}
                            class={this.state.lettersDataContainer[x][y].class}
                        />
                    );

                    letterKey++;
                }
            }             
            matrixContent.push(<MatrixColumn key={x} columnContent={columnContent}></MatrixColumn>);
        }

        return matrixContent;
    };

    //отрисовка символов
    drawMatrix(time) {
        // интервал времени отрисовки матрицы
        const requestInterval = time - this.prevTime;
        this.prevTime = time;

        // через интервал времени проходим по всем столбцам и в каждом столбце символам меняем 
        // прозрачность по принципу: символ, соответствующий значению из counters для данного столбца - 1,
        // всем остальным уменьшаем прозрачность на величину opacityUnit
        for (let i = 0; i < this.columns; i++) {

            let currentRow = this.state.counters[i];

            // если шибко виснет, то можно выключить несколько столбцов с бегущими символами
            // Math.random() нужен здесь потому, что иначе выключает вообще все столбцы
            if (/*this.state.isStartPage &&*/ requestInterval > 150 && Math.random() > 0.9) {   // >300
                this.counters[i] = currentRow = null;
                //c = null;
            }

            // чтобы иногда появлялись новые столбцы с бегущими символами
            if (
                !this.state.isStartPage &&
                currentRow == null &&
                this.state.lettersDataContainer[i].length &&
                Math.random() > 0.9998
            ) {
                this.counters[i] = currentRow = 0;
            }

            if (currentRow !== null && currentRow > this.rows) {
                //когда матрица является заставкой - если счетчик для текущего столбца дошел до низа, переходим наверх
                if (this.state.isStartPage) {
                    currentRow = 0;
                }
                //когда матрица становится фоном домашней страницы, то бегущие символы постепенно затухают
                //поэтому выключаем активный столбец, когда счетчик дошел до низа
                else {
                    currentRow = null;
                }
            }

            //если столбец пустой
            //if (c == null) continue;
            
            if (currentRow !== null) {
                //максимальная яркость у символа, соответствующего значению счетчика для данного столбца
                this.lettersDataContainer[i][currentRow].opacity = 1;

                // инкрементим координату текущего символа для данного столбца
                this.counters[i] = currentRow + 1;
            }

            // проходим по всем символам столбца и уменьшаем прозрачность на величину opacityUnit
            for (let j = this.state.lettersDataContainer[i].length-1; j >= 0; j--) {
                if (currentRow !== null && j == currentRow) {
                    continue;
                }
                
                let newOpacity; 
                
                // если стартовая страница и символ попадает в след от мыши, то прозрачность уменьшается быстрее
                if (this.state.isStartPage && this.state.lettersDataContainer[i][j].mouseTrack) {
                    newOpacity = this.state.lettersDataContainer[i][j].opacity - 7 * this.opacityUnit;
                } 
                
                // во всех остальных случаях прозрачность уменьшается на opacityUnit               
                else {
                    newOpacity = this.state.lettersDataContainer[i][j].opacity - this.opacityUnit;  
                }

                // если символ попадает в след от мыши, то при достижении прозрачности 0.5
                // меняем ему цвет на обычный для эффекта плавной смены цвета
                if (this.state.lettersDataContainer[i][j].mouseTrack && newOpacity <= 0.5) {
                    this.lettersDataContainer[i][j].class = 'matrix__letter_color-main';

                    // когда прозрачность становится = 0, т.е. символ исчезает, убираем флаг mouseTrack
                    if (newOpacity <= 0) {
                        this.lettersDataContainer[i][j].mouseTrack = false;
                    }
                } 

                this.lettersDataContainer[i][j].opacity = newOpacity > 0 ? newOpacity : 0;
            }
        }

        this.setState({
            counters: this.counters,
            lettersDataContainer: this.lettersDataContainer
        });
    };

    // след от движения мыши - на стартовой странице (заставке)
    // при движении мыши окружающие символы становятся светлыми, а потом, сменяя цвет на обычный, исчезают быстрее прочих
    drawMouseTrackForStartPage(event) {
        // ширина и высота следа мыши
        const currentRow = Math.floor(event.clientY * 0.1);
        const currentColumn = Math.floor(event.clientX * 0.105);

        for (let i = currentColumn - 15; i < currentColumn + 15; i++) {
            for (let j = currentRow - 15; j < currentRow + 15; j++) {
                //если есть символ с такими координатами
                if (
                    this.state.lettersDataContainer[i] && this.state.lettersDataContainer[i][j] && 
                    // и если он виден (opacity > 0)
                    this.state.lettersDataContainer[i][j].opacity > 0 &&
                    // и если он еще не попал в след мыши (флаг mouseTrack) - иначе будет след мерцать
                    this.state.lettersDataContainer[i][j].mouseTrack == false &&
                    // и не все символы, но многие (Math.random())
                    Math.random() > 0.4
                )   {
                        // то меняем цвет, прозрачность и ставим флаг 
                        //пишем сразу в state, потому что setState и перерисовка прямо здесь не нужна (будет в drawMatrix)             
                        this.state.lettersDataContainer[i][j].class = 'matrix__letter_color-lighter';      
                        this.state.lettersDataContainer[i][j].opacity = 1;
                        this.state.lettersDataContainer[i][j].mouseTrack = true;
                }           
            }
        }
    }

    // след от движения мыши - на домашней странице 
    // всё то же самое, но символы исчезают с обычной скоростью
    drawMouseTrackForHomePage(event) {
        // ширина и высота следа мыши
        const currentRow = Math.floor(event.clientY * 0.105);
        //const currentColumn = Math.floor(event.clientX * 0.105);

        for (let i = 0; i < this.columns; i++) {
            for (let j = currentRow - 5; j < currentRow; j++) {
                //если есть символ с такими координатами
                if (
                    this.state.lettersDataContainer[i] && this.state.lettersDataContainer[i][j] &&
                    // и если он еще не попал в след мыши (флаг mouseTrack) - иначе будет след мерцать
                    this.state.lettersDataContainer[i][j].mouseTrack == false &&
                    // и не все символы, но многие (Math.random())
                    Math.random() > 0.9
                )   {  
                        // то меняем цвет, прозрачность и ставим флаг
                        //пишем сразу в state, потому что setState и перерисовка прямо здесь не нужна (будет в drawMatrix)              
                        this.state.lettersDataContainer[i][j].class = 'matrix__letter_color-lighter';      
                        this.state.lettersDataContainer[i][j].opacity = 1;
                        this.state.lettersDataContainer[i][j].mouseTrack = true;

                        //в каждом столбце должен быть только один текущий символ
                        if (this.state.counters[i] !== null && Math.random() > 0.75)    
                            this.state.counters[i] = j;    
                }           
            }
        }
    }

    // показать контент
    showContent(event) {
        // проверка на случай, если несколько событий одновременно
        if (!this.state.isStartPage) {
            return; 
        }

        // первые несколько скроллов бывают не юзера, а от scrollToComponent
        if (event && event.type == 'scroll' && event.timeStamp < 7000) {
            scrollToComponent(this.matrixRef, {align: 'top'});
            return;
        }
        //console.log(event);
        
        // отображаем контент
        this.content = <Content className = 'content_shown'/>;

        // меняем след от движения мыши
        this.matrixRef.removeEventListener("mousemove", this.drawMouseTrackForStartPage);
        this.matrixRef.addEventListener("mousemove", this.drawMouseTrackForHomePage);
        this.contentRef.addEventListener("mousemove", this.drawMouseTrackForHomePage);

        //удаляем обработчики
        removeEventListener("keydown", this.showContent);
        this.matrixRef.removeEventListener("click", this.showContent);
        removeEventListener("scroll", this.showContent);
        if (this.showContentClock) {
            clearTimeout(this.showContentClock);
        }

        this.setState({
            //counters: this.counters,
            isStartPage: false
        });
    }

    componentDidMount() {
        // добавляем след от движения мыши
        this.matrixRef.addEventListener("mousemove", this.drawMouseTrackForStartPage);
        scrollToComponent(this.matrixRef, {align: 'top'});
        
        // по нажатию любой кнопки клавиатуры появляется страница с инфой (матрица остается на фоне)
        addEventListener("keydown", this.showContent);
        // или по клику мыши
        this.matrixRef.addEventListener("click", this.showContent);
        // или по скроллу
        addEventListener("scroll", this.showContent);
        // или если ничего не происходит, то по таймауту
        this.showContentClock = setTimeout(this.showContent, 15000);  //todo!
    }

    componentDidUpdate(prevProps, prevState) {
        // при переходе с заставки на домашнюю страницу проскролливаем вверх
        if (prevState.isStartPage == true && this.state.isStartPage == false) {
            scrollToComponent(this.matrixRef, {align: 'top'});
        }
    }

    render() 
    {
        ////console.log('render matrix');
        const matrixContent = this.fillMatrix();  
        const matrixClass = 'matrix matrix-wrapper__matrix ' + (this.state.isStartPage ? 'matrix_start-page' : 'matrix_home-page');
        const matrixStyle = {fontSize: this.fontSize};

        /*const contentClass = (this.state.isStartPage ? 'content_hidden' : 'content_shown');
        const content = <Content className = {contentClass}/>;*/

        requestAnimationFrame(this.drawMatrix);

        return (  
            <div className = 'matrix-wrapper'>     
                <div ref={elem => this.matrixRef = elem} className={matrixClass} style={matrixStyle}>
                    {matrixContent}
                </div> 
                <div ref={elem => this.contentRef = elem} className='matrix-wrapper__content'>
                    {this.content}
                </div>
            </div>  
        );
    }
}




