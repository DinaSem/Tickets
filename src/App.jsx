import React, {useEffect, useState} from 'react';
import s from './App.module.css';

export const App = () => {
    const [flights, setFlights] = useState(null)
    const [visible, setVisible] = useState(1)
    const [radioSortValue, setRadioSortValue] = useState('1');
    const [checkboxFilterValue, setCheckboxFilterValue] = useState(null);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState();
    useEffect(() => {
        fetch('http://localhost:8000/result')
            .then(res => {
                return res.json()
            })
            .then(data => {
                setFlights(data)
            })
    }, [])

    const showMoreItems = () => {
        setVisible((val) => val + 1)
    }

    if (!flights) return <div className={s.loading} >loading...</div>


    let corridorPrice = flights.flights.filter(el => +el.flight.price.total.amount >= minPrice && +el.flight.price.total.amount <= maxPrice)

    let arrForRender = (arr, sortValue, filterValue) => {

        let res = arr;
        
        if (sortValue === '1') {
            res.sort((a, b) => +a.flight.price.total.amount - +b.flight.price.total.amount)
        }
        if (sortValue === '2') {
            res.sort((a, b) => +b.flight.price.total.amount - +a.flight.price.total.amount)
        }
        if (sortValue === '3') {
            res.sort((a, b) => +a.flight.legs.duration - +b.flight.legs.duration)
        }
        if (filterValue != null) {
            //debugger
            res = res.filter(el => filterValue === '1' ? +el.flight.legs[0].segments[0].length === 2 : +el.flight.legs[0].segments[0].length === 1);
            //res.sort((a, b) => a.flight.price.total.amount - b.flight.price.total.amount)
        }

        return res;
    }

    function changeValue(e) {
        setRadioSortValue(e.target.value);
    }


    return (<div>
            <div className={s.App}>

                <div className={s.container}>
                    <div className={s.wrapperForBoard}>
                        <p>Сортировать</p>
                        <div className={s.radioWrapper}>
                            <div>
                                <input type="radio"
                                       name="radio"
                                       value="1"
                                       checked={radioSortValue === '1' ? true : false}
                                       onChange={changeValue}/>
                                <span>- цена по возрастанию</span>
                            </div>
                            <div>
                                <input type="radio"
                                       name="radio"
                                       value="2"
                                       checked={radioSortValue === '2' ? true : false}
                                       onChange={changeValue}/>
                                <span>- цена по убыванию</span>
                            </div>
                            <div>
                                <input type="radio"
                                       name="radio"
                                       value="3"
                                       checked={radioSortValue === '3' ? true : false}
                                       onChange={changeValue}/>
                                <span>- по  времени полета</span>
                            </div>
                        </div>

                        <p>Фильтровать</p>
                        <div className={s.radioWrapper}>
                            <input type="checkbox"
                                   name="Value 1"
                                   checked={checkboxFilterValue === '1'}
                                   onChange={() => setCheckboxFilterValue('1')}
                            />
                            <span>- 1 пересадка</span>
                        </div>
                        <div className={s.radioWrapper}>
                            <input type="checkbox"
                                   name="Value 2"
                                   checked={checkboxFilterValue === '2'}
                                   onChange={() => setCheckboxFilterValue('2')}
                            />

                            <span>- без пересадок</span>
                        </div>
                        <p>Цена</p>
                        <div className={s.radioWrapper}>
                            <span> От  </span>
                            <input value={minPrice}
                                   onChange={event => setMinPrice(event.target.value)}
                            />

                        </div>
                        <div className={s.radioWrapper}>
                            <span> До  </span>
                            <input value={maxPrice}
                                   onChange={event => setMaxPrice(event.target.value)}
                            />

                        </div>
                    </div>

                    <div className={s.wrapperForTickets}>
                        {flights && arrForRender(corridorPrice, radioSortValue, checkboxFilterValue).slice(0, visible).map((el, i) => {
                            return <div className={s.card} key={i}>
                                <div className={s.plashka}>
                                    <span>{el.flight.carrier.caption} </span>
                                    <span>{el.flight.price.total.amount} &#8381;</span>

                                </div>
                                <div className={s.stroka}>
                              <span>
                              <span>{el.flight.legs[0].segments[0].departureCity.caption}, </span>
                              <span>{el.flight.legs[0].segments[0].departureAirport.caption} </span>
                              <span>({el.flight.legs[0].segments[0].departureAirport.uid}) </span>
                              </span>
                                    <span>---></span>


                                    <span>
                              <span>{el.flight.legs[0].segments[1].arrivalCity.caption}, </span>
                              <span>{el.flight.legs[0].segments[1].arrivalAirport.caption} </span>
                              <span>({el.flight.legs[0].segments[1].arrivalAirport.uid}) </span>
                              </span>

                                </div>
                                <div className={s.strokaDate}>
                              <span>
                                  <span>{new Date(el.flight.legs[0].segments[0].departureDate).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                  })} </span>
                                  <span> {new Date(el.flight.legs[0].segments[0].departureDate).getDate()} </span>
                                  <span> {new Date(el.flight.legs[0].segments[0].departureDate).toLocaleString('default', {month: 'short'})} </span>
                                  <span> {new Date(el.flight.legs[0].segments[0].departureDate).toLocaleString('default', {weekday: 'short'})} </span>
                              </span>
                                    <span> {Math.floor(el.flight.legs[0].duration / 60)} часов</span>
                                    <span>
                                  <span> {new Date(el.flight.legs[0].segments[1].departureDate).getDate()} </span>
                                  <span> {new Date(el.flight.legs[0].segments[1].departureDate).toLocaleString('default', {month: 'short'})} </span>
                                  <span> {new Date(el.flight.legs[0].segments[1].departureDate).toLocaleString('default', {weekday: 'short'})} </span>
                                  <span>{new Date(el.flight.legs[0].segments[1].departureDate).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                  })} </span>
                              </span>
                                </div>
                                <div
                                    className={s.stroka}>------------------- {el.flight.legs[0].segments.length === 2 ? 1 : 0} пересадка
                                    ----------------------
                                </div>

                                <div className={s.stroka}>
                               <span>
                              <span>{el.flight.legs[1].segments[0].departureCity.caption}, </span>
                              <span>{el.flight.legs[1].segments[0].departureAirport.caption} </span>
                              <span>({el.flight.legs[1].segments[0].departureAirport.uid}) </span>
                               </span>
                                    <span> --->   </span>
                                    <span>
                              <span>{el.flight.legs[1].segments[1].arrivalCity.caption}, </span>
                              <span>{el.flight.legs[1].segments[1].arrivalAirport.caption} </span>
                              <span>({el.flight.legs[1].segments[1].arrivalAirport.uid}) </span>
                              </span>

                                </div>
                                <div className={s.strokaDate}>
                              <span>
                                  <span>{new Date(el.flight.legs[1].segments[0].departureDate).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                  })} </span>
                                  <span> {new Date(el.flight.legs[1].segments[0].departureDate).getDate()} </span>
                                  <span> {new Date(el.flight.legs[1].segments[0].departureDate).toLocaleString('default', {month: 'short'})} </span>
                                  <span> {new Date(el.flight.legs[1].segments[0].departureDate).toLocaleString('default', {weekday: 'short'})} </span>
                              </span>
                                    <span> {Math.floor(el.flight.legs[1].duration / 60)} часов</span>
                                    <span>
                                  <span> {new Date(el.flight.legs[1].segments[1].departureDate).getDate()} </span>
                                  <span> {new Date(el.flight.legs[1].segments[1].departureDate).toLocaleString('default', {month: 'short'})} </span>
                                  <span> {new Date(el.flight.legs[1].segments[1].departureDate).toLocaleString('default', {weekday: 'short'})} </span>
                                  <span>{new Date(el.flight.legs[1].segments[1].departureDate).toLocaleTimeString([], {
                                      hour: '2-digit',
                                      minute: '2-digit'
                                  })} </span>
                              </span>
                                </div>
                                <div
                                    className={s.stroka}>------------------- {el.flight.legs[0].segments.length === 2 ? 1 : 0} пересадка
                                    ----------------------
                                </div>
                                <span> Рейс выполняет:{el.flight.carrier.caption} </span>
                                <div className={s.plashkaRed}>
                                    ВЫБРАТЬ
                                </div>
                            </div>
                        })}
                    </div>

                </div>
            </div>
            <div>
                <button className={s.buttons} onClick={showMoreItems}>Показать еще</button>
            </div>

        </div>
    )
}