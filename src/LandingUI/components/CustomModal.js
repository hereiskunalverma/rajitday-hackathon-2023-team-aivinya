import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TwitterIcon from '@mui/icons-material/Twitter';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: 'none',
  borderRadius: '7px',
  boxShadow: 24,
  p: 4
};

export default function CustomModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <button
        className={
          props.triggerBtnStyle
            ? 'rounded-md'
            : 'px-4 py-2 text-lg font-medium text-center text-white bg-indigo-600 rounded-md '
        }
        style={props.triggerBtnStyle}
        onClick={handleOpen}
      >
        {props.triggerContent}
      </button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Typography>Join the waitlist</Typography> */}
        {/* <p>{props.triggerContent}</p> */}

        <Box sx={style}>{props.content}</Box>
      </Modal>
    </div>
  );
}
