import React from 'react';
import './App.css';
import axios from 'axios';

// AA051245445454552117989;false
// LT647044001231465456;true
// LT517044077788877777;true
// LT227044077788877777;false
// CC051245445454552117989;false


class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ibans: [],
      iban: '',
      valid: '',
      fileInputRef: React.createRef,
      fileData: '',
      fileName: '',
      resultFileData: "",
      fileOutput: ''
    }


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.acceptFile = this.acceptFile.bind(this);
    this.downloadOutIbansFile = this.downloadOutIbansFile.bind(this);
    this.validateIbans = this.validateIbans.bind(this);
  }
  handleChange(event) {
    this.setState({iban: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    this.validateIban(this.state.iban)
    
  }


  acceptFile(event) {
    var file = event.target.files[0];
    var filename = file.name;

    filename = filename.substr(0,filename.indexOf('.'))

    this.setState({
      fileName: filename
    })
    
    var reader = new FileReader();
    reader.readAsText(file);
    const data = this;
    reader.onloadend = function() {
      data.setState({
        fileData: reader.result.split('\n')
      })
    }
  }

  downloadOutIbansFile () {
    
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(this.state.fileOutput));
    element.setAttribute('download', this.state.fileName + '.out');
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click(); 
  
    document.body.removeChild(element);

  }

  validateIbans() {
    var ibans = this.state.fileData;
    var output = "";

    if(ibans.length > 0) {
      Promise.all(
        ibans.map(iban => 
          axios.get(`http://localhost:8080/iban/${iban}`).then(res => 
            res.data === true ? 'True' : 'False'
          ))
      ).then(data => {
        output = ibans.map((iban, i) => 
        `${iban.replace('\r','')};${data[i]}`).join('\n')
      
        this.setState({
          fileOutput: output
        })
        this.downloadOutIbansFile();
      })
    }
    else {
      alert('Choose txt file first')
    }

  }


  validateIban(iban){
    if(iban.length > 0) {
      try{
        axios.get(`http://localhost:8080/iban/${iban}`).then(res => {
          if(res.data===true) {
            this.setState({
              valid: 'True'
            })
          }
          else {
            this.setState({
              valid: 'False'
            })
          }
        })
      }catch(e){
        console.log(e);
      }

    } 
    else {
      alert('Write iban in to the input field')
    }
    

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="App-body">
            <form style={{padding: 100}} onSubmit={this.handleSubmit}>
              <label >
                Iban
                <input style={{width: 200}} type="text" value={this.state.iban} onChange={this.handleChange} />
              </label>
              <input  type="submit" value="Validate"/>
              <div>
                <label>
                  {this.state.valid}
                </label>
              </div>

            </form>

          </div>

        <div>
          <input 
            type="file"
            ref={this.state.fileInputRef}
            onChange={this.acceptFile}
            accept=".txt"
          />
        </div>

        <div>
          <button onClick={this.validateIbans}>Download output file</button>
        </div>

        </header>

      </div>
    )
  }

}

export default App;
