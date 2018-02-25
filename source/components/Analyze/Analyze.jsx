import React, { Component } from 'react'
import { Button, Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Analyze.scss'

class Home extends Component {
    constructor(props) {
      super(props);
      this.state ={
        image:null
      }
      this.formSubmit = this.formSubmit.bind(this)
      this.onFileInput = this.onFileInput.bind(this)
    }
    formSubmit(e){

    }
    onChange(e) {
      
    }
    fileUpload(file){
      
    }

    render() {
        return(
            <div className="wrapper-home">
              <div className="ui vertical masthead center aligned segment landing-image">
                <div className="ui container">
                  <div className="ui large inverted secondary network menu">
                    <Link to="/" className="item" id="logo">Remedi</Link>
                    <div className="right item">
                        <Link to="/login" className="item">
                      <Button className="ui button">Log Out</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="Home">
                  <div className="ui segment" id="Analyze-container">
                    <h2 className="ui header" id="title-remedi">
                      Analyze My Bill
                    </h2>
                    <form className="ui action input" onSubmit={this.formSubmit}>
                      <input className="fileInput" type="file" onChange={this.onFileInput} />
                      <button className="ui button" type="submit">Upload My Bill</button>
                      </form>
                  </div>
                </div>
              </div>
            </div>
        )
    }
}

export default Home


