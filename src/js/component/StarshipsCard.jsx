import React, { useState, useEffect, useContext } from "react";
import "../../styles/CardsStyles.css";
import { HeartButton } from "../component/HeartButton.jsx";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const StarshipsCard = () => {
  const { store, actions } = useContext(Context);

  useEffect(() => {
    if (store.starships.length === 0 && store.error === null) {
      actions.fetchStarships();
    }
  }, []);

  if (store.error) {
    return (
      <div className="error">
        Error al cargar las naves espaciales: {store.error}
      </div>
    );
  }

  return (
    <>
      {store.starships.length !== 0 ? (
        <div className="CardGroups">
          {store.starships.map((starship) => (
            <div key={starship.name} className="CharacterCard">
              <div className="card h-100">
                <img
                  src={`https://starwars-visualguide.com/assets/img/starships/${starship.uid}.jpg`}
                  className="card-img-top w-100"
                  alt="..."
                  onError={(event) => {
                    event.target.src =
                      "https://starwars-visualguide.com/assets/img/placeholder.jpg";
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{starship.name}</h5>
                  <ul>
                    <li>
                      <strong>Model: </strong>
                      {starship && starship.details
                        ? JSON.stringify(starship.details.model)
                        : "Cargando..."}{" "}
                    </li>
                    <li>
                      <strong>Manufacturer: </strong>
                      {starship && starship.details
                        ? JSON.stringify(starship.details.manufacturer)
                        : "Cargando..."}{" "}
                    </li>
                    <li>
                      <strong>Passengers: </strong>
                      {starship && starship.details
                        ? JSON.stringify(starship.details.passengers)
                        : "Cargando..."}{" "}
                    </li>
                  </ul>
                </div>
                <div className="card-footer d-flex justify-content-between">
                  <Link to={`/starship/${starship.uid}`}>
                    <button>Learn more!</button>
                  </Link>
                  <HeartButton someItem={starship} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="loading">Loading...</div>
      )}
    </>
  );
};
