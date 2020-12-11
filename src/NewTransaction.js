import React from 'react';
import './App.css';

const NewTransaction = ( props ) => {

    return (
        <div className="NewTran" >
           <tr>
            <th>Name</th>
            <input  onChange={props.changeName} value={props.name} />
            </tr>
            <tr><th>Description</th><input onChange={props.changeDescription} value={props.description} /></tr>
            <tr><th>Transaction Date</th><input type="date" onChange={props.changeTranDate} value={props.transactionDate} /></tr>
            <tr><th>Amount</th><input onChange={props.changeAmount} value={props.amount} /></tr>
            <tr><th></th><button onClick={props.addRow}> Save
            </button><button onClick={props.clickClose}>Close</button></tr>
            
        </div>
    )
};

export default NewTransaction;