import React, { Component } from "react";
import { Jumbotron,ListGroup, ListGroupItem,Badge } from 'reactstrap';
import Axios from "axios";
let params = window.location.href;
let params_FIND_ID = params.split("=");
let res_id = params_FIND_ID[1];

const config = {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "user-key": "9baae484ab637c1086e1f994e04b5715"
    }
  };


class Visit extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            data_arr:{
                Rest_ID:'',Rest_Name:'',Rest_Image:'',Rest_Timming:'',Rest_Hightlight:[],Res_Rating:'',Rest_address: '',cuisines:'',
                Rest_city: '',Rest_city_id: '',Rest_country_id: '',latitude: '',locality: '',locality_verbose:'',longitude: '' }
        }
    }
    componentWillMount(){
        let url = 'https://developers.zomato.com/api/v2.1/restaurant?res_id=' + res_id;
        Axios.get(url ,config ).then(restro_detail=>{
            this.setState({data_arr:{
                Rest_ID:restro_detail.data.id,
                Rest_Name:restro_detail.data.name,
                Rest_Timming:restro_detail.data.timing,
                locality:restro_detail.data.location.locality_verbose,
                cuisines:restro_detail.data.cuisines,
                cuisiRest_Hightlightnes:restro_detail.data.highlights,
                Res_Rating:restro_detail.data.user_rating.aggregate_rating,
            }
            });
        })
    }

    render() { 
        return (
           <Jumbotron>
               <ListGroup >
               <ListGroupItem color="danger">
               <div className="container">
               <div className="res-header-overlay brbot">
                    <div className="row ">
                        <div className="col-sm-12">
                    <div  className="col-sm-6" >
                         <h1>
                             <a >{this.state.data_arr.Rest_Name}<Badge pill>{this.state.data_arr.Res_Rating}</Badge></a></h1>
                             <div className="mb5 pt5 clear">
                                 <a  className="left grey-text fontsize3">{this.state.data_arr.locality}</a>
                                 <span className="middot grey-text">&nbsp;&nbsp;·&nbsp;</span>
                                     <span className="res-info-estabs grey-text fontsize3">
                                         <a className="grey-text fontsize3" title="View all Quick Bites in " >{this.state.data_arr.Rest_Timming}</a>,
                                             <a className="grey-text fontsize3" title="View all Casual Dining in " >{this.state.data_arr.cuisines}</a></span>
                                 </div>
                         <div className="clear"></div>
                      </div>
                      </div>
                    </div>
                </div>
            </div>
            </ListGroupItem>
            </ListGroup>
           </Jumbotron>
           
         );
    }
}
 
export default Visit;

 