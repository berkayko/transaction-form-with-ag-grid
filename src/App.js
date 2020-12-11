import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import ButtonCellRenderer from './ButtonCellRenderer';
import NewTransaction from './NewTransaction';
import Modal from './Modal';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inc :0,
      showNewTran:false,
      showModal:false,
      addInfo:false,
      disableAdd:false,
      row: {id:1,name:'',description:'',transactionDate:'',amount:''},
      columnDefs: [
        {
          headerName: "ID", field: "id"
        },{
        headerName: "Name", field: "name"
      }, {
        headerName: "Description", field: "description"
      }, {
        headerName: "Transaction Date", field: "transactionDate"
      }, {
        headerName: "Amount", field: "amount"
      }
    ,  {
      
      cellRenderer: 'buttonCellRenderer',
      cellRendererParams: {
        clicked: this.toggleEditTran,
        deleteClick:this.toggleModal
      },
      minWidth: 150,
    }],
      rowData: [],
      frameworkComponents: {
        buttonCellRenderer: ButtonCellRenderer,
      },
      rowSelection: 'single',
    };
    
  }
  toggleModal=()=>{
    const doesShow = this.state.showModal;
    const doesAdd=this.state.disableAdd;
    this.setState({showModal:!doesShow,disableAdd:!doesAdd,showNewTran:false,addInfo:false})
  }
  toggleNewTran = () => {
    const doesShow = this.state.showNewTran;
    const doesAdd=this.state.addInfo
    this.setState( { showNewTran: !doesShow,row:{id:0,name:'',description:'',transactionDate:'',amount:''},addInfo:!doesAdd} );
  

  }
  toggleEditTran = () => {
    const doesShow = this.state.showNewTran;
    let rowTemp=this.gridApi.getSelectedRows()[0];
    this.setState( { showNewTran: !doesShow,row:rowTemp,disableAdd:true} );

  }
  onChangeDescription=(event)=>{
    const rowTemp = {...this.state.row};
    rowTemp.description=event.target.value;
    this.setState({row:rowTemp});
  }
  onChangeTranDate=(event)=>{
    const rowTemp = {...this.state.row};
    rowTemp.transactionDate=event.target.value;
    this.setState({row:rowTemp});
  }
  onChangeAmount=(event)=>{
    const rowTemp = {...this.state.row};
    rowTemp.amount=event.target.value;
    this.setState({row:rowTemp});
  }
  onChangeName=(event)=>{
    const rowTemp = {...this.state.row};
    rowTemp.name=event.target.value;
    this.setState({row:rowTemp});
  }
  handleAdd=()=>{
    const rowTemp = {...this.state.row};
    const rowDataTemp=[...this.state.rowData];
    let index=this.state.inc;
    let edit=!this.state.addInfo
    if(edit){
      const rowIndex = rowDataTemp.findIndex(p => {
        return p.id === rowTemp.id;
      });
  
        rowDataTemp[rowIndex]={...rowTemp}
   
    }

    else{      
      if(rowDataTemp.length>=index){
        index++;
      }  rowTemp.id=index;
        rowDataTemp.push(rowTemp);
        edit=true;
    }
    if(rowTemp.name==""||rowTemp.description==""||rowTemp.transactionDate==""||rowTemp.amount==""){
      alert('Please fill the form');
      return;
    }
    this.setState({rowData:rowDataTemp,inc:index,addInfo:edit, row:{id:0,name:'',description:'',transactionDate:'',amount:''},disableAdd:false});
    this.toggleNewTran();
  }
  deleteRow=()=>{
    let rowTemp=this.gridApi.getSelectedRows()[0];
    let index=this.state.index
    const rowDataTemp=[...this.state.rowData];
    const rowIndex = rowDataTemp.findIndex(p => {
      return p.id === rowTemp.id;
    });
    
    rowDataTemp.splice(rowIndex,1);
    rowDataTemp.forEach(p=>{
      if(p.id>rowIndex){
        p.id=p.id-1;
      }
    });
    index--;
    this.setState({rowData:rowDataTemp,index:index});
    this.toggleModal();
  }
  onGridReady = params => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };
  

  render() {
    let newTranDiv=null;
    let ModalDiv=null;
   
    if(this.state.showNewTran){
      newTranDiv=(
       
        <div>
          <NewTransaction changeName={(event)=>this.onChangeName(event)} 
          changeDescription={(event)=>this.onChangeDescription(event)} 
          changeTranDate={(event)=>this.onChangeTranDate(event)} 
          changeAmount={(event)=>this.onChangeAmount(event)} 
          addRow={this.handleAdd}
          clickClose={this.toggleNewTran}
          name={this.state.row.name}
          description={this.state.row.description} 
          transactionDate={this.state.row.transactionDate}
          amount={this.state.row.amount}
           ></NewTransaction>
        </div>
      )
    }
    if(this.state.showModal){
      ModalDiv=(<div><Modal clickedYes={this.deleteRow} clickedNo={this.toggleModal}></Modal></div>)
      
    }
    return (
      
<div className="App" >

      <div
        className="ag-theme-alpine"
        style={{
        height: '500px',
        width: '900px' }}
      >
        <button disabled={this.state.disableAdd}  className="btn_NewTran" onClick={this.toggleNewTran}>New Transaction</button>

        {ModalDiv}
        {newTranDiv}
        <AgGridReact
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          frameworkComponents={this.state.frameworkComponents}
          rowSelection={this.state.rowSelection}
          onGridReady={this.onGridReady}>
        </AgGridReact>
      </div>
      </div>
    );
  }
}

export default App;