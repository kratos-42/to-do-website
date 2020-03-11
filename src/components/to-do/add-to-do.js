import { Button, Paper, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import axios from 'axios';

const useStyles = makeStyles({
  paper: {
    padding: 3,
    textAlign: 'center'
  }
});

const AddToDo = ({ props }) => {
  const [description, setDescription] = useState();
  const [title, setTitle] = useState();
  const classes = useStyles();
  const createToDo = data => {
    try {
      return axios.request({
        data,
        method: 'post',
        url: 'http://localhost:8000/to-dos'
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    const toDo = {
      description,
      title
    };

    await createToDo(toDo);

    props.handleSubmit();
  };

  const handleCancel = () => {
    props.handleSubmit();
  };

  const handleDescriptionChange = event => setDescription(event.target.value);
  const handleTitleChange = event => setTitle(event.target.value);

  return (
    <>
      <Paper className={classes.paper}>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id={'standard'}
              label={'title'}
              onChange={handleTitleChange}
              rows={'10'}
              value={title}
            />
          </div>
          <div>
            <TextField
              id={'standard-multiline-static'}
              label={'description'}
              multiline
              onChange={handleDescriptionChange}
              rows={'10'}
              size={'medium'}
              value={description}
            />
          </div>
        </form>
      </Paper>
      <Button
        color={'primary'}
        onClick={handleSubmit}
        variant={'contained'}
      >
        Save
      </Button>
      <Button
        color={'secondary'}
        onClick={handleCancel}
        variant={'contained'}
      >
        Cancel
      </Button>
    </>
  );
};

export default AddToDo;
