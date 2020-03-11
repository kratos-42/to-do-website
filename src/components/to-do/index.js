import { Grid, List, ListItem, ListItemText, Paper } from '@material-ui/core';
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import Details from './details';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles({
  listItem: {
    color: '#000',
    textAlign: 'center'
  },
  paper: {
    elevation: 3,
    textAlign: 'center'
  }
});

const ToDo = () => {
  const classes = useStyles();
  const [toDoList, setToDoList] = useState([]);
  const [toDoDetails, setToDoDetails] = useState({});
  const [toDoMode, setToDoMode] = useState('view');
  const fetchData = async () => {
    const {
      data: { data }
    } = await axios.get('http://localhost:8000/to-dos');

    setToDoList(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers.
  const handleItemClick = toDo => {
    setToDoMode('view');
    setToDoDetails(toDo);
  };

  const handleNewItemClick = () => {
    setToDoDetails({});
    setToDoMode('add');
  };

  const handleSubmit = async () => {
    setToDoDetails({});

    await fetchData();

    setToDoMode('view');
  };

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        item
        md={3}
        xs={4}
      >
        <Paper className={classes.paper}>
          <List component={'ul'}>
            <ListItem
              button
              className={classes.listItem}
              onClick={handleNewItemClick}
            >
              <ListItemText primary={'Add a To Do'} />
            </ListItem>
            {toDoList.map(toDo => (
              <ListItem
                button
                className={classes.listItem}
                key={toDo.title}
                onClick={() => handleItemClick(toDo)}
              >
                <ListItemText primary={toDo.title} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      {!isEmpty(toDoDetails) || toDoMode === 'add' ? (
        <Grid
          item
          sm={7}
          xs={8}
        >
          <Details props={{
            handleSubmit,
            mode: toDoMode,
            setMode: setToDoMode,
            toDoDetails
          }}
          />
        </Grid>
      ) : null
      }
    </Grid>
  );
};

export default ToDo;
