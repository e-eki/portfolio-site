'use strict';

import React, { Component } from 'react';
import scrollToComponent from 'react-scroll-to-component';
import MenuItem from './menuItem';
import Section from './section';

export default class Main extends Component {

    constructor(props) {
        super(props);

        // массив строк для отрисовки текста в заголовках секций
        this.sectionsHeadings = [];

        // конструкция для setState
        this.state = {
            sectionsHeadings : this.sectionsHeadings, 
        }

        // вся инфа 
        this.info = [
            {
                itemName: 'js-item-about',
                itemText: 'Обо мне',
                blockName: 'js-block-about main__block_active',
                sections: [
                    {
                        hiddenText: {
                            text:'Hello World!',
                            num: null,
                        },
                        shownDescription:
                            <div>
                                <p>Здравствуйте, меня зовут Виктория Дрёмина.</p>
                                <p>Я занимаюсь веб-разработкой (front&#8209;end и back&#8209;end), пишу на языках JavaScript, C#, Python.</p>
                                <p>Здесь вы сможете найти краткое описание моей деятельности и примеры моих работ.</p>
                            </div>
                        ,
                        hiddenDescription: 
                            <div>
                                <p>Стек используемых мною технологий:</p>
                                <p>Пишу back-end и front-end на JavaScript/TypeScript и C# (ASP.NET).</p>
                                <p>Для front-end'a применяю ReactJS / Angular 7, препроцессор LESS, владею секретами адаптивной/responsive кроссбраузерной верстки. Для организации стилей применяю принципы БЭМ-методологии. Для сборки использую Webpack. </p> 
                                <p>Для back-end'a применяю NodeJS / ASP.NET. Работаю с базами данных: реляционными (PostgreSQL, MySQL) и нереляционными (MongoDB). При разработке API использую принципы REST-архитектуры. Знаю и имею опыт применения на практике принципов Flux / Redux - архитектуры. Для контроля версий использую Git.</p>  
                                
                                <p>Также знаю Python и имею некоторое представление о применении его в сфере Machine Learning.</p>

                                <p>В далеком прошлом писала desktop&#8209;приложения под Windows на С# с использованием: библиотек Windows Forms / WPF, языка разметки XAML. Работаю с платформой .Net Framework 4.7.</p>                 
                                <p>К своей работе отношусь с большой ответственностью, вниманием и вдохновением. Легко обучаюсь, постоянно совершенствую свой профессиональный уровень.</p>
                            </div>
                    }
                ]
            },
            {

                itemName: 'js-item-summary',
                itemText: 'Резюме',
                blockName: 'js-block-summary main__block_hidden',
                sections: [
                    {
                        hiddenText: {
                            text: 'Образование',
                            num: null,
                        },
                        hiddenDescription: 
                            <div>
                                <p>Московский государственный технический университет им. Н.Э. Баумана, Москва, 2015г.</p>
                                <p>Приборостроительный факультет, кафедра «Приборы и системы ориентации, стабилизации и навигации» (ИУ2-ПС1)</p>
                                <p>Квалификация - магистр.</p>
                            </div>
                    },
                    {
                        hiddenText: {
                            text: 'Повышение квалификации, курсы',
                            num: null,
                        },
                        hiddenDescription: 
                            <div>
                                <p>Учебный центр при МГТУ им. Н.Э.Баумана "Специалист", Курсы Microsoft, 2016г.</p>
                                <p>Курс М20483: Программирование на C#.</p>
                            </div>
                    },
                    {
                        hiddenText: {
                            text: 'Подробное резюме',
                            num: null,
                        },
                        hiddenDescription:
                            <div>
                                <p>Размещено <a href="https://hh.ru/applicant/resumes/view?resume=4aed935fff03baf1970039ed1f637630675066">на HeadHunter</a>.</p>
                            </div>
                    }
                ]
            },
            {
                itemName: 'js-item-works',
                itemText: 'Портфолио',
                blockName: 'js-block-works main__block_hidden',
                sections: [
                    {
                        hiddenText: {
                            text: 'Портфолио',
                            num: null,
                        },
                        hiddenDescription: 
                            <div>
                                <p>Здесь представлены мои работы:</p>

                                <div className = 'section__description-heading'>НА JS</div>

                                <div className = 'section__description-inner'>

                                    <div className = 'picture-block'>
                                        <div className = 'picture-block__heading'>Сайт-портфолио</div>

                                        <div className = 'picture-block__picture'>
                                            <a href = "https://github.com/e-eki/portfolio-site">
                                                <div
                                                    className = 'image image_site' 
                                                    alt = 'сайт-визитка'
                                                >
                                                </div>
                                            </a>
                                        </div>
                                        
                                        <p>Репозиторий тут: <a href = "https://github.com/e-eki/portfolio-site">https://github.com/e-eki/portfolio-site</a></p>
                                        <p>Опубликован тут: <a href = "https://e-eki.github.io/">https://e-eki.github.io/</a></p>
                                    </div>

                                    <div className = 'picture-block'>
                                        <div className = 'picture-block__heading'>Форум с системой оповещений в реальном времени (гибрид форума и мессенджера)</div>

                                        {/* <div className = 'picture-block__picture'>
                                            <a href = "https://github.com/e-eki/forum-api">
                                                <div
                                                    className = 'image image_checkers' 
                                                    alt = 'сферический форум в вакууме'
                                                >
                                                </div>
                                            </a>
                                        </div> */}

                                        <p>Репозитории тут: бэкенд <a href = "https://github.com/e-eki/forum-api">https://github.com/e-eki/forum-api</a> ,</p>
                                        <p>фронтенд <a href = "https://github.com/e-eki/forum-app">https://github.com/e-eki/forum-app</a></p>
                                        {/* <p>Опубликован тут: <a href = "https://checkers-game0.herokuapp.com/">https://checkers-game0.herokuapp.com/</a></p> */}
                                    </div>

                                    <div className = 'picture-block'>
                                        <div className = 'picture-block__heading'>Игра в шашки онлайн</div>

                                        <div className = 'picture-block__picture'>
                                            <a href = "https://github.com/e-eki/checkers-project">
                                                <div
                                                    className = 'image image_checkers' 
                                                    alt = 'игра в шашки'
                                                >
                                                </div>
                                            </a>
                                        </div>

                                        <p>Репозитории тут: бэкенд <a href = "https://github.com/e-eki/checkers-project">https://github.com/e-eki/checkers-project</a> ,</p>
                                        <p>фронтенд <a href = "https://github.com/e-eki/checkers-app">https://github.com/e-eki/checkers-app</a></p>
                                        <p>Опубликован тут: <a href = "https://checkers-game0.herokuapp.com/">https://checkers-game0.herokuapp.com/</a></p>
                                    </div>

                                </div>

                                <div className = 'section__description-heading'>НА C#</div>

                                <div className = 'section__description-inner'>

                                    <div className = 'picture-block'>
                                        <div className = 'picture-block__heading'>Программа подсчета времени наработки контрольно-проверочной аппаратуры (КПА) и приборов</div>

                                        <div className = 'picture-block__picture'>
                                            <a href = "https://github.com/e-eki/time_counting_app">
                                                <div
                                                    className = 'image image_timer' 
                                                    alt = 'программа подсчета времени наработки'
                                                >
                                                </div>
                                            </a>
                                        </div>
                                    
                                        <p>Репозиторий тут: <a href = "https://github.com/e-eki/time_counting_app">https://github.com/e-eki/time_counting_app</a></p>
                                    </div>

                                </div>

                                <div className = 'section__description-heading'>НА PYTHON</div>

                                <div className = 'section__description-inner'>

                                    <div className = 'picture-block'>
                                        <div className = 'picture-block__heading'>Десктопное приложение - файловый менеджер</div>

                                        <div className = 'picture-block__picture'>
                                            <a href = "https://github.com/e-eki/file-manager">
                                                <div
                                                    className = 'image image_file-manager' 
                                                    alt = 'файловый менеджер'
                                                    >
                                                </div>
                                            </a>
                                        </div>
                                    
                                        <p>Репозиторий тут: <a href = "https://github.com/e-eki/file-manager">https://github.com/e-eki/file-manager</a></p>
                                    </div>

                                    <div className = 'picture-block'>
                                        <div className = 'picture-block__heading'>Краткосрочное прогнозирование курса биткоина (к доллару США)</div>

                                        <div className = 'picture-block__picture'>
                                            <a href = "https://gist.github.com/e-eki/7f11840bd1255f72fee92d776d592f2c">
                                                <div
                                                    className = 'image image_bitkoin' 
                                                    alt = 'краткосрочное прогнозирование курса биткоина'
                                                    >
                                                </div>
                                            </a>
                                        </div>
                                    
                                        <p>Репозиторий тут: <a href = "https://gist.github.com/e-eki/7f11840bd1255f72fee92d776d592f2c">https://gist.github.com/e-eki/7f11840bd1255f72fee92d776d592f2c</a></p>
                                    </div>

                                </div>

                            </div>
                    }
                ]
                
            },
            {
                itemName: 'js-item-contacts',
                itemText: 'Контакты',
                blockName: 'js-block-contacts main__block_hidden',
                sections: [
                    {
                        hiddenText: {
                            text: 'Контактная информация',
                            num: null,
                        },
                        hiddenDescription: 
                            <div>
                                <p>Телефон: <a href="tel:+79629750419">+7 (962) 975 04 19</a></p>
                                <p>E-mail: <a href="mailto:ifirtree@gmail.com">ifirtree@gmail.com</a></p>
                                <p>Skype: <a href="skype:live:ifirtree"> live:ifirtree</a></p>
                                <p>Я <a href="https://github.com/e-eki">на GitHub</a></p>
                                <p>Я <a href="https://ru.stackoverflow.com/users/301638/eeki">на Stack Overflow</a> :)</p>
                            </div>
                    }
                ]               
            }
        ];

        // устанавливаем соответствие hiddenText каждой секции - элементу массива sectionsHeadings
        this.info.forEach(function(infoItem) {
            infoItem.sections.forEach(function(sectionItem) {
                // num нужен для соответствия строке массива sectionsHeadings
                sectionItem.hiddenText.num = this.state.sectionsHeadings.length; 
                // добавляем новый элемент массива для этого hiddenText  
                this.sectionsHeadings.push(''); 
            }.bind(this));            
        }.bind(this));

        // массив соответствий пунктов меню секциям
        this.elements = [];

        this.showActiveSection = this.showActiveSection.bind(this);
        this.showActiveBlock = this.showActiveBlock.bind(this);
        this.setDrawHeadingTimer = this.setDrawHeadingTimer.bind(this);
    }

    // обработчик события клика по пункту меню - показываем соответствующий блок
    // и отрисовываем заголовок (если еще не отрисован)
    showActiveBlock(event) {
        //если кликают по активной ссылке
        if (event.target.classList.contains('menu__item_active')) {
            return; 
        }

        this.elements.forEach(function(element) {
            // прячем все блоки
            element.item.classList.remove('menu__item_active');
            element.block.classList.remove('main__block_active');
            element.block.classList.add('main__block_hidden');

            // отображаем активный блок
            if (element.item == event.target.parentNode) {
                element.item.classList.add('menu__item_active');
                element.block.classList.remove('main__block_hidden');
                element.block.classList.add('main__block_active');

                // проскролливаем меню вверх
                scrollToComponent(this.menuRef, {align: 'top'});

                // ищем секции в активном блоке
                for (var i = 0; i < element.block.childNodes.length; i++) {                   
                    var item = element.block.childNodes[i];

                    if (item.classList && item.classList.contains("section")) 
                        this.showActiveSection(item);
                }
            }
        }.bind(this));
    }

    // отобразить секцию активного блока
    showActiveSection(section) {
        // в секции ищем заголовок и описание
        for (let i = 0; i < section.childNodes.length; i++) {                  
            const item = section.childNodes[i];

            // отрисовываем заголовок
            if (item.classList && item.classList.contains("section__heading") &&
                !item.classList.contains("section__heading_shown")) {
                    this.setDrawHeadingTimer(item); 
            }

            // отображаем описание
            else if (item.classList && item.classList.contains("section__description")
                && item.classList.contains("section__description_hidden")) {

                    item.classList.remove("section__description_hidden");
                    item.classList.add("section__description_shown");
            }
        }
    }

    // установка таймера отрисовки заголовка активной секции
    setDrawHeadingTimer(element) {         
        const num = element.getAttribute("num");
        const header = element.getAttribute("hidden-text");                     
        let counter = 0;

        // отрисовка заголовка активной секции
        const drawHeading = function() {
            counter++;

            if (counter > header.length) {
                cancelAnimationFrame(drawHeadingRequest);
                return;
            }

            // устанавливаем новое значение текста для следующей перерисовки заголовка
            this.sectionsHeadings[num] = header.slice(0, counter);
            this.setState({sectionsHeadings: this.sectionsHeadings});
            
            requestAnimationFrame(drawHeading);            
        }.bind(this);

        // добавляем смену цвета заголовка
        element.classList.add('section__heading_shown');
        const drawHeadingRequest = requestAnimationFrame(drawHeading);
    }

    componentDidMount() {
        var aboutItem = document.querySelector('.js-item-about');
        var summaryItem = document.querySelector('.js-item-summary');
        var worksItem = document.querySelector('.js-item-works');
        var contactsItem = document.querySelector('.js-item-contacts');

        var aboutBlock = document.querySelector('.js-block-about');
        var summaryBlock = document.querySelector('.js-block-summary');
        var worksBlock = document.querySelector('.js-block-works');
        var contactsBlock = document.querySelector('.js-block-contacts');

        this.elements.push({ 
            item: aboutItem,
            block: aboutBlock
        });
        this.elements.push({ 
            item: summaryItem,
            block: summaryBlock
        });
        this.elements.push({ 
            item: worksItem,
            block: worksBlock
        });
        this.elements.push({ 
            item: contactsItem,
            block: contactsBlock
        });

        // добавляем обработчик события клика каждому пункту меню
        this.elements.forEach(function(element) {
            element.item.addEventListener('click', this.showActiveBlock);
        }.bind(this))
    }

    render() {
        //console.log('render main');
        const mainClass = 'main ' + (this.props.className ? this.props.className : '');

        // массив элементов меню
        const menuItems = [];
        // массив блоков с информацией
        const blocks = [];

        let itemKey = 0;
        let sectionKey = 0;
        let blockKey = 0;

        this.info.forEach(function(infoItem) {
            const menuItem = <MenuItem
                                key={itemKey}
                                className = {infoItem.itemName}
                                text = {infoItem.itemText}
                            />; 
            itemKey++;
            menuItems.push(menuItem);

            // массив секций в блоке
            const sections = [];

            infoItem.sections.forEach(function(sectionItem) {
                const section = <Section
                                    key={sectionKey}
                                    num = {sectionItem.hiddenText.num}
                                    hiddenText = {sectionItem.hiddenText.text}
                                    heading = {this.state.sectionsHeadings[sectionItem.hiddenText.num]}
                                    shownDescription = {sectionItem.shownDescription}
                                    hiddenDescription = {sectionItem.hiddenDescription}
                                />;
                sectionKey++;

                sections.push(section);
            }.bind(this));

            var block = <div key={blockKey} className = {"main__block " + infoItem.blockName}>
                            {sections}
                        </div>;
            blockKey++;

            blocks.push(block);
        }.bind(this));
        
        return (
            <div className = {mainClass}>
                <div ref={elem => this.menuRef = elem} className = 'menu'>
                    {menuItems}
                </div>
                <div className = 'main__inner'>         
                    {blocks}
                </div>
            </div>
        )
    }
}