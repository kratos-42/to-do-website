import { Button, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import AddToDo from './add-to-do';
import EditToDo from './edit-to-do';
import React from 'react';
import axios from 'axios';

const useStyles = makeStyles({
  paper: {
    padding: 3,
    textAlign: 'center'
  }
});

const Details = ({ props }) => {
  const {
    mode,
    setMode,
    toDoDetails
  } = props;

  const classes = useStyles();
  const handleDelete = async () => {
    try {
      await axios.request({
        method: 'delete',
        url: `http://localhost:8000/to-dos/${toDoDetails.id}`
      });
    } catch (error) {
      console.log(error);
    }

    props.handleSubmit();
  };

  const handleEdit = () => setMode('edit');

  switch (mode) {
    case 'add':
      return (<AddToDo props={props} />);

    case 'edit':
      return (<EditToDo props={props} />);

    default:
      return (
        <>
          <Paper className={classes.paper}>
            {mode === 'edit'}
            <Typography variant={'h2'}>
              {toDoDetails.title}
            </Typography>
            <Typography variant={'subtitle1'}>
              {toDoDetails.description}
            </Typography>
          </Paper>
          <Button
            color={'primary'}
            onClick={handleEdit}
            variant={'contained'}
          >
            Edit
          </Button>
          <Button
            color={'secondary'}
            onClick={handleDelete}
            variant={'contained'}
          >
            Delete
          </Button>
        </>
      );
  }
};

export default Details;
