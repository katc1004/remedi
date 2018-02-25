import React, { Component } from 'react'
import { Button, Input, Card, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'

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
                email: '',
                courses: []
            },
            inputList: [],
            showStudent: false,
            showInstructor: false,
            message: ''
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangeName = this.onChangeName.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onChangeCourses = this.onChangeCourses.bind(this);
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
    }

    onSubmit(e) {
        e.preventDefault();

        if(this.state.showInstructor===true){
            axios.post(_CONFIG.devURL + '/register', {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password,
            is_instructor: this.state.showInstructor
          })
          .then(function (response) {
            console.log(response);
            location.href = '/login';
          })
          .catch(function (error) {
            console.log(error);
            this.setState({
                     message: 'Unable to register'
                 })
          });
        }
        // else{
        //     var id = 0;
        //     for(id = 1; id < this.state.user.courses.length; id++){
        //         axios.put(_CONFIG.devURL + '/add-class', {
        //             course: this.state.user.courses[id]
        //           })
        //           .then(function (response) {
        //             console.log(response);
        //           })
        //           .catch(function (error) {
        //             console.log(error);
        //             this.setState({
        //                      message: 'Unable to register class'
        //                  })
        //           });
        //     }

            axios.post(_CONFIG.devURL + '/register', {
            name: this.state.user.name,
            email: this.state.user.email,
            password: this.state.user.password,
            is_instructor: this.state.showInstructor
          })
          .then(function (response) {
            console.log(response);
            location.href = '/login';
          })
          .catch(function (error) {
            console.log(error);
            this.setState({
                     message: 'Unable to register '
                 })
          });
        }
    
    componentDidMount(){
        if(this.props.location.state !== undefined){
            console.log(this.props);
            if(this.props.location.state.teacher==true){
                this.ChangeToInstructor();
            }
            else if(this.props.location.state.student==true){
                this.ChangeToStudent();
            }
        }

    }
    ChangeToStudent() {
        this.setState({
            showStudent: true,
            showInstructor: false
        });
    }
    ChangeToInstructor() {
        this.setState({
            showStudent: false,
            showInstructor: true
        });
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
    onChangeCourses(e) {
        const user = this.state.user;
        user.courses = e.target.value;
        this.setState({
            user
        })
    }
    onAddBtnClick(event) {
        const inputList = this.state.inputList;
        this.setState({
            inputList: inputList.concat(<Input label="Course Code" className="pad" onChange={this.onChangeCourses} />)
        });
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
                        <Header as='h2' color='#30BDDB' textAlign='center'>
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
