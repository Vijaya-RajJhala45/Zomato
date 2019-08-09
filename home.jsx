import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const config = {
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    "user-key": "9baae484ab637c1086e1f994e04b5715"
  }
};

const data_arr = [
  {
    Res_ID: "",
    Res_Name: "",
    Res_Image: "",
    Res_Timming: "",
    res_Hightlight: [],
    Zomato_Event: "",
    address: "",
    city: "",
    city_id: "",
    country_id: "",
    latitude: "",
    locality: "",
    locality_verbose: "",
    longitude: ""
  }
];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lengthtotoal: "",
      restorants: [],
      std: []
    };
  }

  componentWillMount() {
    axios
      .get("https://developers.zomato.com/api/v2.1/search", config)
      .then(response => {
        console.log("data", response.data);
        let length = response.data.restaurants.length;

        //alert(length);
        // console.log(length);
        for (var i = 0; i < length; i++) {
          data_arr.push({
            Res_Id: response.data.restaurants[i].restaurant.id,
            Res_Name: response.data.restaurants[i].restaurant.name,
            Res_Timming: response.data.restaurants[i].restaurant.timings,
            res_Hightlight: response.data.restaurants[i].restaurant.highlights,
            address: response.data.restaurants[i].restaurant.location.address,
            city: response.data.restaurants[i].restaurant.location.city,
            city_id: response.data.restaurants[i].restaurant.location.city_id,
            country_id:
              response.data.restaurants[i].restaurant.location.country_id,
            latitude: response.data.restaurants[i].restaurant.location.latitude,
            locality: response.data.restaurants[i].restaurant.location.locality,
            locality_verbose:
              response.data.restaurants[i].restaurant.location.locality_verbose,
            longitude:
              response.data.restaurants[i].restaurant.location.longitude,
            Res_Image:
              response.data.restaurants[i].restaurant.photos[0].photo.url
          });

          // alert(JSON.stringify(response.data.restaurants[i]))
        }

        //  console.log("data_arr", data_arr);
        this.setState({
          restorants: response.data.restaurants,
          lengthtotoal: length
        });
      });
    // console.log(this.state.restorants);
  }
  visit(s) {
    let id = parseInt(s);
    window.location.href = "/visit?id=" + id;
  }

  render() {
    const restro = data_arr.map((s, index) => {
      return (
        <div>
          <Card key={s.index}>
            <CardBody>
              <img src={s.Res_Image} height="200px" width="150px" />
              <CardTitle>
                <strong>{s.Res_Name}</strong>
              </CardTitle>
              <CardSubtitle>Timing - {s.Res_Timming}</CardSubtitle>
              <CardText>
                Highlights -{" "}
                {s.res_Hightlight.map(r => {
                  return <h6 className="badge badge-secondary"> {r} </h6>;
                })}
              </CardText>
              <Button
                color="danger"
                onClick={this.visit.bind(this, s["Res_Id"])}
              >
                Visit
              </Button>
            </CardBody>
          </Card>
        </div>
      );
    });
    return (
      <div className="container">{restro}</div>
      // <div className="container">
      //     {restro}
      // </div>
    );
  }
}

export default Home;
