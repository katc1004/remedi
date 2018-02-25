import React, { Component } from 'react'
import { Button, Input, Card, Form, Grid, Header, Image, Message, Segment, Panel } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import superagent from 'superagent'
import styles from './Register.scss'
import * as _CONFIG from '../_config/Config.js'


class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                name: '',
                password: '',
                provider: '',
                zipcode: '',
                email: ''
            },
            inputList: [],
            buttonDisabled: false,
            message: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeProvider = this.onChangeProvider.bind(this);
        this.onChangeZipcode = this.onChangeZipcode.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({ buttonDisabled: true });
        let formData = new FormData();
        const files = this.filesInput.files;
        for (var key in files) {
          // check if this is a file:
          if (files.hasOwnProperty(key) && files[key] instanceof File) {
            formData.append(key, files[key]);
            }
        }
        console.log("data here")
        console.log(formData);
        superagent.post(_CONFIG.devURL + '/bill')
        .send(formData)
        .end((err, response) => {
            if(err) {
                //there was an error, handle it here
            } else if(response.ok) {
                //this was successful, handle it here
                console.log(response);
            }
        });
        

        axios.post(_CONFIG.devURL + '/register', {
        name: this.state.user.name,
        email: this.state.user.email,
        password: this.state.user.password,
      })
      .then(function (response) {
        console.log(response);
        // location.href = '/login';
      })
      .catch(function (error) {
        console.log(error);
        this.setState({
            message: 'Unable to register '
        })
      });
      location.href = '/analyze';

    }
    
    componentDidMount(){
        if(this.props.location.state !== undefined){
            console.log(this.props);
        }
    }
    onChangeName(e) {
        const user = this.state.user;
        user.name = e.target.value;
        this.setState({
            user
        })
    }

    onChangeProvider(e) {
        const user = this.state.user;
        user.provider = e.target.value;
        this.setState({
            user
        })
    }

    onChangeZipcode(e) {
        const user = this.state.user;
        user.zipcode = e.target.value;
        this.setState({
            user
        })
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

    render() {
        return(
            <div className="wrapper-register">
              <div className="ui vertical masthead center aligned segment landing-image-register">
                <div className="ui container">
                  <div className="ui large inverted secondary network menu">
                    <Link to="/" className="item" id="logo">Remedi</Link>
                    <div className="right item">
                        <Link to="/login" className="item">
                      <Button className="ui button">Log in</Button>
                      </Link>
                        <Link to="/register" className="item">
                      <Button className="ui primary button" id="theme-blue">Sign Up</Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <style>{`
                  body > div,
                  body > div > div,
                  body > div > div > div.register_form {
                    height: 100%;
                  }
                `}</style>
                <form className="register_form" action="/" onSubmit={this.onSubmit}>
                    <Grid
                      textAlign='center'
                      style={{ height: '100%' }}
                      verticalAlign='middle'
                    >
                      <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' textAlign='center'>
                          Register
                        </Header>
                        <Form size='large'>
                          <Segment stacked>
                            <Form.Input
                              fluid
                              placeholder='Name'
                              onChange={this.onChangeName}
                            />
                            <Form.Input
                              fluid
                              placeholder='Email'
                              onChange={this.onChangeEmail} 
                            />
                            <Form.Input
                              fluid
                              placeholder='Insurance Provider'
                              onChange={this.onChangeProvider} 
                            />
                            <Form.Input
                              fluid
                              placeholder='Zip code'
                              onChange={this.onChangeZipcode} 
                            />
                            <Form.Input
                              fluid
                              placeholder='Password'
                              type='password'
                              onChange={this.onChangePassword} 
                            />
                            <div>
                            <input 
                                type="file" 
                                ref={(input) => { this.filesInput = input; }}
                                name="file"/>
                            </div>
                            <Button fluid size='large' type="submit" id="theme-blue">Register</Button>
                          </Segment>
                        </Form>
                        <Message>
                          Already have an account? <Link to="/login">Sign In</Link>
                        </Message>
                      </Grid.Column>
                    </Grid>
                </form>
              </div>
            </div>
        )
    }
}
export default Register
