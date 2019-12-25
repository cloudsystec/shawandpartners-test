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

const useStyles = makeStyles({
  table: {
    // width: "50%",
  },
  div: {
    width: "50%",
    margin: "auto"
  }
});

function UserList() {

  const classes = useStyles();

  useEffect(() => {
    fetchItems();
  }, []);

  const [userData, setUser] = useState({});
  const [userList, setUserList] = useState([]);

  const fetchItems = async () => {
    const data = await fetch('http://localhost:8001/api/users');

    const items = await data.json();
    //console.log(items);

    setUser(items);
    setUserList(items.data);
  }

  const fetchNext = async (next) => {
    const data = await fetch(next);

    const items = await data.json();
    //console.log(items);

    setUser(items);
    setUserList(items.data);
  }

  return (
    <div className={classes.div}>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Login</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userList.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  <Link to={`/detail/${row.login}`}>{row.id}</Link>
                </TableCell>
                <TableCell align="right">{row.login}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div><Link onClick={()=>{fetchNext(userData.next)}}><h3>Next</h3></Link></div>
    </div>
  );
}

export default UserList;
