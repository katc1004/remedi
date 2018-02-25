import React, { Component } from 'react'
import { Button, Card, Popup} from 'semantic-ui-react'
import { Link } from 'react-router-dom'

import styles from './Analyze.scss'

class Analyze extends Component {
    constructor() {
        super();

        this.state = {
            user: {
                password: '',
                email: ''
            },
            redirect: false,
            message: '',
            x: 0,
            y: 0,
            file: '',
            imagePreviewUrl: '',
            insuredCost: 0,
            uninsuredCost: 0,
            shortDescription: '',
            longDescription: '',
            hover: false
        }

        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._handleImageChange = this._handleImageChange.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        let component = this;
        const email = encodeURIComponent(this.state.user.email);
        const password = encodeURIComponent(this.state.user.password);
        const formData = `email=${email}&password=${password}`;
        axios.post(_CONFIG.devURL + '/login', formData)
          .then(function (response) {
            console.log(response);
//            location.href = '/dashboard';
            component.setState({
                redirect: true,
                userDetails: response.data
            })
          })
          .catch(function (error) {
            console.log(error);
            component.setState({
                    message: 'Incorrect name or password'
                })
          });
        }
    onMouseMove(e) {
      this.setState({
          x: e.nativeEvent.offsetX,
          y: e.nativeEvent.offsetY,
          hover: false
      });
      // for(int i = 0; i < list.length; i++){
      //   if(this.x > list[i][x]){
      //     this.setState({
      //       hover: true
      //     });
      //   }
      // }
      // if(this.x > 0){
      //   this.setState({
      //     hover: true
      //   });
      // }

      if(this.state.imagePreviewUrl != ''){
        this.setState({hover: true})
      }

      //console.log(hover)
    }

    onChangeEmail(e) {
        const user = this.state.user;
        user.email = e.target.value;
        this.setState({
            user
        })
    }

    onChangePassword(e) {
        const user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user
        })
    }


  _handleSubmit(e) {
    e.preventDefault();
    // TODO: do something with -> this.state.file
    console.log('handle uploading-', this.state.file);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
      console.log("start")
      console.log(reader.result)
      console.log("stop")
    }

    reader.readAsDataURL(file)
  }

    render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} />);
        } else {
          $imagePreview = (<div className="previewText">U DIDNT IMAGE </div>);
        }

      const { x, y } = this.state;
        return(
            <div className="wrapper-home">
              <div className="ui vertical masthead center aligned segment bill_blue">
                <div className="ui container">
                  <div className="ui large inverted secondary network menu">
                    <Link to="/" className="item" id="logo_analyze">Remedi</Link>
                    <div className="right item">
                      <Link to="/login" className="item">
                      <Button className="ui button">Log Out</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="Home">
                <div >
                  <div className="ui segment" id="Analyze-container">
                    <div className="ui header" id="title">
                    Analyze My Bill
                    </div>
                    <div className="previewComponent">
                    <form className="ui action input" onSubmit={(e)=>this._handleSubmit(e)}>
                      <input className="fileInput"
                          type="file"
                          onChange={(e)=>this._handleImageChange(e)} />
                      <button className="ui button" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload My Bill</button>
                    </form>
                    <div>Mouse coordinates: { x } { y } (remove later)</div>
                    <div className="imgPreview" onMouseMove={this.onMouseMove.bind(this)}>
                        {$imagePreview}
                        {this.state.hover && (<Popup
                          trigger={<div className="hoverplaceholder" style={{position:'absolute', top: 322, left: 108}}>......</div>}
                          //header={this.state.x + ', ' + this.state.y}
                          // content={}
                          header = {'Code 510120'}
                          on = 'hover'
                        /> )}
                    </div>
                  </div>
                </div>
                  </div>
                </div>
              </div>
            </div>

        )
    }
}

export default Analyze
