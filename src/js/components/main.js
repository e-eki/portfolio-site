
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
                        hiddenText: {text:'Hello World!'},
                        shownDescription:
                            <div>
                                <p>Здравствуйте, меня зовут Виктория Дрёмина.</p>
                                <p>Я занимаюсь веб-разработкой (front&#8209;end и back&#8209;end), а также пишу Desktop&#8209;приложения на C#.</p>
                                <p>Здесь вы сможете найти краткое описание моей деятельности и примеры моих работ.</p>
                            </div>
                        ,
                        hiddenDescription: 
                            <div>
                                <p>В своей работе я использую следующие инструменты разработки сайта: Javascript / HTML(5) / CSS(3) / SQL. На стороне фронтэнда применяю препроцессор LESS, библиотеку React.js, владею секретами адаптивной/отзывчивой кроссбраузерной верстки. В части бэкэнда применяю платформу Node.js, СУБД MySQL.'</p>  
                                <p>При создании десктопных приложений под Windows на языке С# использую: библиотеки Windows Forms / WPF, язык разметки XAML, технологию LINQ. Крепко дружу с платформой .Net Framework 4.6.</p>                 
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
                        hiddenText: {text: 'Образование'},
                        hiddenDescription: 
                            <div>
                                <p>Московский государственный технический университет им. Н.Э. Баумана, Москва, 2015г.</p>
                                <p>Приборостроительный факультет, кафедра «Приборы и системы ориентации, стабилизации и навигации» (ИУ2-ПС1)</p>
                                <p>Квалификация - магистр.</p>
                            </div>
                    },
                    {
                        hiddenText: {text: 'Повышение квалификации, курсы'},
                        hiddenDescription: 
                            <div>
                                <p>Учебный центр при МГТУ им. Н.Э.Баумана "Специалист", Курсы Microsoft, 2016г.</p>
                                <p>Курс М20483: Программирование на C#.</p>
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
                        hiddenText: {text: 'Портфолио'},
                        hiddenDescription: 
                            <div>
                                <p>Здесь представлены мои работы:</p>
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
                        hiddenText: {text: 'Контактная информация'},
                        hiddenDescription: 
                            <div>
                                <p>Телефон: <a href="tel:+79629750419">+7 (962) 975 04 19</a></p>
                                <p>E-mail: <a href="mailto:ifirtree@gmail.com">ifirtree@gmail.com</a></p>
                                <p>Skype: <a href="skype:live:ifirtree"> live:ifirtree</a></p>
                            </div>
                    }
                ]
                
            }
        ];

        // устанавливаем соответствие hiddenText каждой секции - элементу массива sectionsHeadings
        this.info.forEach(function(infoElt) {

            infoElt.sections.forEach(function(sectionElt) {

                // num нужен для соответствия строке массива sectionsHeadings
                sectionElt.hiddenText.num = this.state.sectionsHeadings.length; 
                // добавляем новй жлемент массива для этого hiddenText  
                this.sectionsHeadings.push(''); 
            }.bind(this));
            
        }.bind(this));

        // массив соответствий пунктов меню секциям
        this.elements = [];

        this.showActiveBlock = this.showActiveBlock.bind(this);
        this.setDrawHeadingTimer = this.setDrawHeadingTimer.bind(this);
    }

    // обработчик события клика по пункту меню - показываем соответствующий блок
    // и отрисовываем заголовок (если еще не отрисован)
    showActiveBlock(event) {

        var showActiveSection = function(section) {

            // в каждой секции ищем заголовок и описание
            for (var i = 0; i < section.childNodes.length; i++) {                  
                var elt = section.childNodes[i];

                    // отрисовываем заголовок
                if (elt.classList && elt.classList.contains("section__heading") &&
                    !elt.classList.contains("section__heading_shown")) {

                        this.setDrawHeadingTimer(elt); 
                }

                // отображаем описание
                else if (elt.classList && elt.classList.contains("section__description")
                    && elt.classList.contains("section__description_hidden")) {

                        elt.classList.remove("section__description_hidden");
                        elt.classList.add("section__description_shown");
                }
            }
        }.bind(this);

        if (event.target.classList.contains('menu__item_active')) return;  //если кликают по активной ссылке

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

                // отскролливаем меню вверх
                scrollToComponent(this.menu, {align: 'top'});

                //ищем секции в активном блоке
                for (var i = 0; i < element.block.childNodes.length; i++) {                   
                    var elt = element.block.childNodes[i];

                    if (elt.classList && elt.classList.contains("section")) 
                        showActiveSection(elt);
                }
            }
        }.bind(this));
    }

    // отрисовка заголовка активной секции
    setDrawHeadingTimer(element) { 
        
        var num = element.getAttribute("num");
        var header = element.getAttribute("hidden-text");                     
        var counter = 0;

        var drawHeading = function() {
            counter++;

            if (counter > header.length) {
                cancelAnimationFrame(drawHeadingRequest);
                return;
            }

            // устанавливаем новое значение текста для перерисовки соответствующей секции
            this.sectionsHeadings[num] = header.slice(0, counter);
            this.setState({sectionsHeadings: this.sectionsHeadings});
            
            requestAnimationFrame(drawHeading);
            
        }.bind(this);

        // добавляем смену цвета заголовка
        element.classList.add('section__heading_shown');
        var drawHeadingRequest = requestAnimationFrame(drawHeading);
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
        console.log('render main');
        const mainClass = 'main ' + (this.props.className ? this.props.className : '');

        var items = [];
        //var sections = [];
        var blocks = [];

        this.info.forEach(function(infoElt) {    

            var item = <MenuItem className = {infoElt.itemName} text = {infoElt.itemText}/>;           
            var sections = [];

            infoElt.sections.forEach(function(sectionElt) {

                var section = <Section num = {sectionElt.hiddenText.num} hiddenText = {sectionElt.hiddenText.text} heading = {this.state.sectionsHeadings[sectionElt.hiddenText.num]} shownDescription = {sectionElt.shownDescription} hiddenDescription = {sectionElt.hiddenDescription}/>;                
                sections.push(section);
            }.bind(this));

            var block = <div className = {"main__block " + infoElt.blockName}>
                            {sections}
                        </div>;

            items.push(item);
            blocks.push(block);
            //sections.push(section);
        }.bind(this));
        
        return (
            <div className = {mainClass}>
                <div  ref={elem => this.menu = elem} className = 'menu'>
                    {items}
                </div>
                <div className = 'main__inner'>         
                    {blocks}
                </div>
            </div>
        )
    }
}