import React, { Component } from "react";
import axios from 'axios';
import "../styles/searchbar.css";
import Metaphor from "../parts/Metaphor";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      formdata: {
        query: "",
        type: "all",
        domain: "source",
      },
      countState: false,
      loading: false,
      OutDetails: null,
    };
  }

  setValues = (type, e) => {
    if (type === "query") {
        this.setState({
          formdata: { ...this.state.formdata, query: e.target.value },
        });
      }

      else if (type === "domain") {
        this.setState({
          formdata: { ...this.state.formdata, domain: e.target.value },
        });
      }

      
  };

  getSearchResults = () => {

    //this.state.OutDetails = [];

    this.setState({ loading: true });

    const in_type=this.state.formdata.type;
    const in_domain=this.state.formdata.domain;

    //console.log(this.state.formdata.query,in_type,in_domain)
    
    if (in_domain=="source"){
      axios.post("http://localhost:3001/srcsearchmetaphor",this.state.formdata)
        .then((response) => {
        this.setState({ OutDetails: response.data.data });
        //console.log(response.data.data.hits.hits);
        }, (error) => {
        console.log(error);
        });

    }
    else if(in_domain=="target"){
      axios.post("http://localhost:3001/tgtsearchmetaphor",this.state.formdata)
        .then((response) => {
        this.setState({ OutDetails: response.data.data });
        console.log(response.data);
        }, (error) => {
        console.log(error);
        });
    }

  };

  
  render() {
    
    return (
      <div style={{ overflow: "hidden" }}>
        <div className="relative flex flex-col h-full">
          <div
            className="flex flex-wrap content-center justify-center "
          >
            <div className="flex-container">
            <form >
            <label>
          <input type="text" placeholder="Type here to search" className="search-bar" value={this.state.query} onChange={(e) => this.setValues("query", e)} />
        </label>
              </form>
        

          <form>

      <select
          value={this.state.type}
          onChange={(e) => this.setValues("domain", e)}
          className="metaphor-domain"
        >
           <option  value="source">Source </option>
           <option value="target">Target </option>
        </select>

          </form>




            <button className="search-button"
            onClick={this.getSearchResults}>
            Search
          </button>
              
            </div>
          </div>



          {this.state.OutDetails == null  ? null : (
          
          

          <Metaphor
          data={this.state.OutDetails}
          count={this.state.OutDetails.hits.total.value}
        />
        )}

        </div>
      </div>
    );
  }
}

export default SearchBar;