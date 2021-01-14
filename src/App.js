import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import React from 'react';


const app = new Clarifai.App({
  apiKey: '45eb83266af14460987ef3544bc663d2'
});


const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 500
      }
    }
  }
}


class App extends React.Component {

  constructor() {
    super();
    this.state = { 
      input:'',
      imageUrl: '', 
    };
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input})
    app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input).then(
    function(response){
      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);

    },
    function(err) {

    }
    );
  }

  render() {
  return (
    <div className="App">
      <Particles className='particles'
              params={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm 
      onInputChange={this.onInputChange} 
      onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl} />
    </div>
  );
  };
}

export default App;
