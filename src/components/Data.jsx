import ExoplanetDataTable from "./ExoplanetDataTable.jsx";

function Placeholder() {
    return <div>
        <h2 id={'data_box'}>
            Exoplanets are planets outside the solar system. Here you can query <span className={'color_text'}>NASA's exoplanet's archive</span> and
            find the
            one you love the most
        </h2>
    </div>
}

export default function Data({queryResults, firstTime}) {
    return <div className={'data_table'}>
        {firstTime === true ? <Placeholder/> : queryResults.length > 0 ? <ExoplanetDataTable queryResults={queryResults}/> : <h2 id={'data_box'}>
            Ah! snap, no such exoplanet <span className={'color_text'}>exists</span>
        </h2> }
    </div>
}