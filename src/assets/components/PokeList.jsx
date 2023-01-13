import React, { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  CircularProgress,
  Toolbar,
  AppBar,
  TextField,
  InputAdornment,
  Box,
  Avatar,
  CardHeader,
  Chip,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  pokedexContainer: {
    paddingTop: "20px",
    paddingLeft: "50px",
    paddingRight: "50px",
  },
  cardMedia: {
    margin: "auto",
  },
  cardContent: {
    textAlign: "center",
  },
  searchContainer: {
    display: "flex",
    backgroundColor: fade(theme.palette.common.white, 0.15),
    paddingLeft: "20px",
    paddingRight: "20px",
    marginTop: "5px",
    marginBottom: "5px",
  },
}));

const Pokedex = (props) => {
  const classes = useStyles();
  const { history } = props;
  const [pokemonData, setPokemonData] = useState({});
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=151`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      });
  }, []);

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const getPokemonCard = (pokemonId) => {
    const { id, name, sprite } = pokemonData[pokemonId];

    const toFirstCharUppercase = (name) =>
      name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <Grid item xs={12} sm={6}  lg={4} key={pokemonId}>
        <Card
          onClick={() => history.push(`/${id}`)}
          style={{ borderRadius: "15px" }}
        >
          <CardHeader
            avatar={
              <Avatar
                style={{ height: "130px", width: "130px", marginLeft: '15px' }}
                src={sprite}
                aria-label="recipe"
              />
            }
            title={
              <Typography
                variant="h6"
                style={{ flexGrow: "1", textAlign: "center", fontWeight: 'bold', marginRight: '30px' }}
              >
                {`# ${id}`}
              </Typography>
            }
            subheader={
              <Typography
                variant="subtitle2"
                style={{ flexGrow: "1", textAlign: "center", fontWeight: 'bold', marginRight: '30px',  marginTop: '5px' }}
              >
                <Chip
                  label={toFirstCharUppercase(name)}
                  style={{
                    backgroundColor: "#ffd740",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                  }}
                />
              </Typography>
              }
          />
          {/* <CardMedia
            className={classes.cardMedia}
            image={sprite}
            style={{ width: "130px", height: "130px" }}
          />
          <CardContent className={classes.cardContent}>
            <Typography>{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent> */}
        </Card>
      </Grid>
    );
  };

  return (
    <>
      <div className={classes.searchContainer}>
        <TextField
          style={{ margin: "30px", marginTop: "20px", marginBottom: "20px" }}
          variant="outlined"
          onChange={handleSearchChange}
          placeholder="Busca por nombre o numero de Pokemon..."
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
      {pokemonData ? (
        <Grid container spacing={2} className={classes.pokedexContainer}>
          {Object.keys(pokemonData).map(
            (pokemonId) =>
              (pokemonData[pokemonId].id.toString().includes(filter) || pokemonData[pokemonId].name.includes(filter)) &&
              getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
