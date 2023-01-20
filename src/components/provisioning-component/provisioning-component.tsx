import './provisioning-component.css';
import { useEffect, useState } from "react";


const restEndpoint = "http://localhost:3006/stations?limit=10&offset=1";

let stationName = 'none selected';

interface IStationData {
    _id: string;
    label: string;
}

const callRestApi = async () => {
    const response = await fetch(restEndpoint);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const arrayOfLists = jsonResponse.map(
      (record: IStationData) => <li onClick={()=>{ emitClickEvent(record) }} key={record._id}><b>{record.label}</b></li>
    )
    return arrayOfLists;
};

function ProvisioningComponent() {

    const eventHandler =(ev: any)=> {
        stationName = ev.detail;
            setStationSelected(stationName);
    }

    document.addEventListener('customEvent', eventHandler);

    const [apiResponse, setApiResponse] = useState("*** now loading ***");

    const [station, setStationSelected] = useState("*** not selected ***");

    useEffect(() => {
        callRestApi().then(
            result => setApiResponse(result));
    },[]);
    
    return (
        <div className="container">
            <div className='left'>
            <div className='note'>Provisioning</div>
            <ul className="station-list">{apiResponse}</ul>
            </div>
            
            <div className='right'>
                <div className='title'>
                    {station}
                </div>
                <div className='description'>
                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
                </div>
            </div>
        </div>
    );

}

function emitClickEvent(record: IStationData) {
    setTimeout(() => {
        document.dispatchEvent(new CustomEvent('customEvent', { detail: record.label }))
    },200); 
}

export default ProvisioningComponent;