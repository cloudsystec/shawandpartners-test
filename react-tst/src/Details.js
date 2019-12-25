import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles({
  table: {
    // width: "50%",
  },
  div: {
    width: "50%",
    margin: "auto",
  },
  divinner: {
    textAlign: "left"
  },
  large: {
    width: 210,
    height: 210
  }
});

function Details({ match }) {

  const classes = useStyles();

  useEffect(() => {
    fetchItems();
  }, []);

  const [userData, setUser] = useState({});
  const [userRepos, setUserRepos] = useState([]);

  const fetchItems = async () => {
    const data = await fetch(`http://localhost:8001/api/users/${match.params.id}/details`);
    const dataRepos = await fetch(`http://localhost:8001/api/users/${match.params.id}/repos`);

    const items = await data.json();
    const repos = await dataRepos.json();
    console.log(items);
    console.log(repos);

    setUser(items.data);
    setUserRepos(repos.data);
  }

  return (
    <div className={classes.div}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center"
      >
        <Avatar className={classes.large} src={userData.avatar_url} ></Avatar>
        <div className={classes.div} >
          <div className={classes.divinner} ><b>Id: </b>{userData.id}</div>
          <div className={classes.divinner} ><b>Repo: </b><a  target="_blank" href={userData.profile_url}>{userData.profile_url}</a></div>
          <div className={classes.divinner} ><b>Created At: </b>{userData.created_at}</div>
        </div>
      </Grid>
      <br />
      <br />
      <br />
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell> 
              <TableCell>login</TableCell>
              <TableCell>Repo Url</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userRepos.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>
                  <a  target="_blank" href={row.html_url}>{row.html_url}</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Details;
