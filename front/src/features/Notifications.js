import React from 'react';
import {Alert} from 'react-bootstrap'

const AlertContext = React.createContext(null);
AlertContext.displayName = 'AlertContext';


function AlertProvider({ children }){
    const [alertHeader, setAlertHeader] = React.useState('header');
    const [alertText, setAlertText] = React.useState('text');
    const [alertVariant, setAlertVariant] = React.useState('success');
    const [display, setDisplay] = React.useState(false);

    return <AlertContext.Provider
    value={{
        alertHeader,
        alertText,
        alertVariant,
        show: (alertHeader, alertText, alertVariant='success')=>{
            setAlertHeader(alertHeader);
            setAlertText(alertText);
            setAlertVariant(alertVariant);
            setDisplay(true);
        }
    }}>
        {display &&
        <Alert variant={alertVariant} onClose={() => setDisplay(false)} dismissible>
            <Alert.Heading>{alertHeader}</Alert.Heading>
            <hr/>
            <p>{alertText}</p>
        </Alert> }
        { children }
    </AlertContext.Provider>
}

export { AlertProvider };
export default AlertContext;