import React from 'react';
import Particles from 'react-particles-js';
import Navigation from '../components/Navigation/Navigation';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import Logo from '../components/Logo/Logo';
import UserInfo from '../components/UserInfo/UserInfo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';

import './App.css';

const particlesOptions = {
  particles: {
    value: 30,
    density:{
      enable: true,
      value_area: 800
    },
    line_linked: {
      shadow: {
        enable: true,
        color: '#000033'
      }
    }
  }
}

const initialState = {
  input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
}

class App extends React.Component {
  constructor(){
    super();
    this.state= {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const facesData = data.outputs[0].data.regions;
    const boxes = [];
    
    const image = document.getElementById('inputImage')
    const width = Number(image.width);
    const height = Number(image.height);

    for(var i = 0; i < facesData.length; i++){
      const faceBoundaries = facesData[i].region_info.bounding_box;
      const box = {
        leftCol: faceBoundaries.left_col * width,
        topRow: faceBoundaries.top_row * height,
        rightCol: width - (faceBoundaries.right_col * width),
        bottomRow: height - (faceBoundaries.bottom_row * height)
      }
      boxes.push(box);
    }
    return boxes;
  }

  displayFaceBox = (boxes) => {
    this.setState({boxes: boxes});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onRouteChange = (route) => {
    if(route === 'signout'){
      this.setState(initialState)
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
      fetch('https://blooming-shelf-58829.herokuapp.com/image', {
        method: 'post',
        headers: {'Content-type':'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then( response => {
        if(response){
          fetch('https://blooming-shelf-58829.herokuapp.com/image', {
            method: 'put',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(
                Object.assign(this.state.user,{entries: count})
              )
            }
          ).catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err))      
  }

  routeFunction  = () => {
    switch(this.state.route){
      case 'signin':
        return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
      case 'register':
        return <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
      case 'home':
          return <div>
            <Logo />
            <UserInfo name={this.state.user.name} entries={this.state.user.entries}/>
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}  
            />
            <FaceRecognition boxes={this.state.boxes} imageUrl={this.state.imageUrl}/>
          </div>;
      default:
        return <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />;
    }
  }


  render(){
    return (
      <div className="App">
        
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        {this.routeFunction()}
      </div>
    );
  }
  
}

export default App;
