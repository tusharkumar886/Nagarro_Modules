import React from "react";
import ReactDOM from "react-dom";

import MainBox from "./components/main-box.jsx";
import Thumbnail from "./components/thumbnail.jsx";
import data from "./data.js";

class App extends React.Component{

    constructor(props){
        super(props);
        //Initialising a state
        //this is only place where you will use the
        //this.state = something
        this.state = {
            current_title: data[0].title,
            current_url: data[0].url
        };
        this.setCurrent = this.setCurrent.bind(this);
    }

    setCurrent(title,url){
        //Modify the state
        //this.state = new parameters; Don't use
        var new_state = {current_title:title,current_url:url};
        //Pass the new state
        this.setState(new_state);
    }

    render(){
        return(
            <div>
                <div className="jumbotron">
                <MainBox
                    title={this.state.current_title}
                    url={this.state.current_url}
                />

                </div>

                {
                    data.map(function(item){
                      return (
                          <Thumbnail
                              key={item.title}
                              title={item.title}
                              url={item.url}
                              setCurrent={this.setCurrent}
                          />
                      )
                    }.bind(this)
                )}

                {/*<Thumbnail title="Agra" url="/images/agra.jpg"/>*/}
                {/*<Thumbnail title="Delhi" url="/images/delhi.jpg"/>*/}
            </div>

        )
    }
}

var app = <App/>;

var node = document.getElementById("app");

ReactDOM.render(app,node);