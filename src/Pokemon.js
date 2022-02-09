import React, { useState, useEffect } from "react";
import { toFirstCharUppercase } from "./constants";
import {
  Typography,
  Link,
  Button,
  CircularProgress,
  Grid,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

const useStyles = makeStyles({});

const Pokemon = (props) => {
  const { history, match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      })
      .catch(function (error) {
        setPokemon(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemon;
    const fullImageUrl = `https://pokeres.bastionbot.org/images/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Grid
          container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Typography variant="h1">
            {`${id}.`} {toFirstCharUppercase(name)}
            <img src={front_default} />
          </Typography>
          <img style={{ width: "300px", height: "300px" }} src={fullImageUrl} />
          <Typography variant="h3">Pokemon Info</Typography>
          <Typography>
            {"Species: "}
            <Link href={species.url}>{species.name}</Link>
          </Typography>
          <Typography>Height: {height} </Typography>
          <Typography>Weight: {height} </Typography>
          <Typography variant="h6">Types: </Typography>
          {types.map((typeInfo) => {
            const { type } = typeInfo;
            const { name } = type;
            return <Typography key={name}>{`${name}`}</Typography>;
          })}
          <Button
            style={{ margin: "auto" }}
            variant="contained"
            onClick={() => history.push("/")}
          >
            BACK TO POKEDEX
          </Button>
        </Grid>
      </>
    );
  };

  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
      {pokemon === false && <Typography>Pokemon not found</Typography>}
      {/*pokemon !== undefined && (
        <Button
          variant="contained"
          onClick={() => history.push("/")}
        >
          BACK TO POKEDEX
        </Button>
      )*/}
    </>
  );
};

export default Pokemon;
