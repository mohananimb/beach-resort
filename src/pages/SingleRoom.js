import React, { Component } from "react";
import rooma from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { RoomContext } from "../Context";
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
  constructor(props) {
    super(props);

    this.state = {
      slug: this.props.match.params.slug,
      rooma
    };
  }

  static contextType = RoomContext;
  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    // console.log(room);
    if (!room) {
      return (
        <div className="errp">
          <h3>No Such Room Could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            Back To Rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      breakfast,
      pets,
      images
    } = room;
    return (
      <React.Fragment>
        <StyledHero img={images[0] || this.state.rooma}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              Back to Rooms
            </Link>
          </Banner>
        </StyledHero>
        ;
        <section className="single-room">
          <div className="single-room-images">
            {images.map((item, i) => {
              return <img key={i} src={item} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p className="">{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price: ${price}</h6>
              <h6>size: {size} SQFT</h6>
              <h6>
                max capacity :{" "}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? `pets alowed` : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast include"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
        <h6>extras</h6>
        <ul className="extras">
        {extras.map((item,i)=>{
          return <li key={i}>{item}</li>
        })}
        </ul>
        </section>
      </React.Fragment>
    );
  }
}
