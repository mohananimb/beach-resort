import React from "react";
import Room from "./Room";
export default function RoomList({ rooms }) {
  if (rooms.length === 0) {
    return (
      <div className="empty-search">
        <h3>unfortunately no rooms match your search parameters</h3>
      </div>
    );
  }
  return (
    <div>
      <section className="roomslist">
        <div className="roomslist-center">
          {rooms.map(item => {
            return <Room key={item.id} room={item} />;
          })}
        </div>
      </section>
    </div>
  );
}