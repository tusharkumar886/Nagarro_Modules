import React from "react";

//PropTypes
//this.props
//title -> this.props.title


export default class MainBox extends React.Component{

    onThumbnailClickEventHandler(event){
        this.props.setCurrent(this.props.title,this.props.url);
    }
    render(){

        var breath = { marginLeft:"10px" };
        return(
            <button className="btn btn-default" style={breath} onClick={this.onThumbnailClickEventHandler.bind(this)}>
                {this.props.title}
            </button>
        )
    }
}


// this : this.handler :to refer to handler method of this class