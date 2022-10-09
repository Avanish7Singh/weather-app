import {
    Accordion, AccordionItem, AccordionItemButton,
    AccordionItemHeading, AccordionItemPanel
}
    from "react-accessible-accordion";
import "./Forecast.css"    


const Forecast = ({ data }) => {
    const WEEK_DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THUSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']

    const dayInWeek = new Date().getDay();
    const forecastWeek = WEEK_DAYS.splice(dayInWeek, WEEK_DAYS.length).concat(WEEK_DAYS.splice(0, dayInWeek))
    // console.log(forecastWeek)
    return (
        <>
            <label className="title">Forecast for upcoming 7 days</label>
            <Accordion allowZeroExpanded>
                {data.list.splice(0, 7).map((item, idx) => {
                    return (<AccordionItem key={idx}>
                        <AccordionItemHeading>
                            <AccordionItemButton>
                                <div className="daily-item">
                                    <img
                                        alt="weather"
                                        className="daily-day-icon"
                                        src={`icons/${item.weather[0].icon}.png`}
                                    />
                                    <label className="day">{forecastWeek[idx]}</label>
                                    <label className="description">{item.weather[0].description}</label>
                                    <label className="min-max">{Math.round(item.main.temp_min)}°C / {Math.round(item.main.temp_max)}°C</label>
                                </div>
                            </AccordionItemButton>
                        </AccordionItemHeading>
                        <AccordionItemPanel>
                             <div className="daily-detail-grid">
                                <div className="daily-detail-grid-item">
                                    <label className="first-child"> Pressure:</label>
                                    <label className="last-child"> {item.main.pressure}hPa</label>
                                </div>
                                <div className="daily-detail-grid-item">
                                    <label className="first-child"> Humidity:</label>
                                    <label className="last-child" > {item.main.humidity}%</label>
                                </div>
                                <div className="daily-detail-grid-item">
                                    <label className="first-child"> Wind speed:</label>
                                    <label className="last-child"> {item.wind.speed}m/s</label>
                                </div>
                                <div className="daily-detail-grid-item">
                                    <label className="first-child"> Clouds:</label>
                                    <label className="last-child"> {item.clouds.all}%</label>
                                </div>
                                <div className="daily-detail-grid-item">
                                    <label className="first-child"> Sea level:</label>
                                    <label className="last-child"> {item.main.sea_level}m</label>
                                </div>
                                <div className="daily-detail-grid-item">
                                    <label className="first-child"> Feels like:</label>
                                    <label className="last-child"> {item.main.feels_like}°C</label>
                                </div>
                             </div>
                        </AccordionItemPanel>
                    </AccordionItem>)
                })}
            </Accordion>
        </>
    )
}
export default Forecast; 