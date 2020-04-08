import React, { Component } from "react";
import items from "./data";

const RoomContext = React.createContext();
export default class RoomProvider extends Component {
  state = {
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakFast: false,
    pets: false
  };

  //getData

  componentDidMount() {
    let rooms = this.formatData(items);
    // console.log(rooms);
    let featuredRooms = rooms.filter(room => room.featured === true);

    let maxPrice = Math.max(...rooms.map(item => item.price));
    let maxSize = Math.max(...rooms.map(item => item.size));

    this.setState({
      rooms,
      featuredRooms,
      sortedRooms: rooms,
      loading: false,
      price: maxPrice,
      maxSize,
      maxPrice
    });
  }

  formatData(items) {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  }

  getRoom = slug => {
    let tempRooms = [...this.state.rooms];
    let room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;
    this.setState(
      {
        [name]: value
      },
      this.filterRooms
    );

    // console.log(type, name, value);
  };

  filterRooms = () => {
    let {
      rooms,
      type,
      capacity,
      price,
      minSize,
      maxSize,
      breakfast,
      pets
    } = this.state;

    //all the rooms

    let tempRoom = [...rooms];

    //transform valee

    capacity = parseInt(capacity);
    price = parseInt(price);

    //filter by type
    if (type !== "all") {
      tempRoom = tempRoom.filter(item => {
        return item.type === type;
      });
    }

    //filtet by capacity

    if (capacity !== 1) {
      tempRoom = tempRoom.filter(item => {
        return item.capacity === capacity;
      });
    }

    //sort by price

    tempRoom = tempRoom.filter(item => {
      return item.price <= price;
    });

    //sort by size

    tempRoom = tempRoom.filter(item => {
      return item.size >= minSize && item.size <= maxSize;
    });

    //sort by checkbox

    if(breakfast) {
      tempRoom = tempRoom.filter(item=> {
       return item.breakfast === true
      })
    }

    if(pets) {
      tempRoom = tempRoom.filter(item=> {
        return item.pets === true
      })
    }

    this.setState({
      sortedRooms: tempRoom
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomProvider, RoomConsumer, RoomContext };
