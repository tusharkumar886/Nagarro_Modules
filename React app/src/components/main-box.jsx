import React from "react";


//expects two attributes :title and url
export default class MainBox extends React.Component{
    render(){

        var breath = {align:"horizontal-center"};
        return(
            <img
                className="img-thumbnail"
                style =  {breath}
                src={this.props.url}
                alt={this.props.title}
            />
        )
    }
}