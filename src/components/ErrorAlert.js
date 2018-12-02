import React from "react";
import {Alert} from "react-bootstrap";

export default ({message, type})=>{
    return (
        message &&
        <Alert bsStyle={type || 'warning'}>
            <p>{message}</p>
        </Alert>
    );
}