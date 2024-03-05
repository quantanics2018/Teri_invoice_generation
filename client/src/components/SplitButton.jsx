import * as React from 'react';
import Button from '@mui/joy/Button';
import IconButton from '@mui/joy/IconButton';
import ButtonGroup from '@mui/joy/ButtonGroup';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import fetchImage  from './QrCode';

const options = ['Print and Generate Invoice', 'Perform Invoice'];

export default function SplitButton({performInvoiceToggele}) {
  const [open, setOpen] = React.useState(false);
  const actionRef = React.useRef(null);
  const anchorRef = React.useRef(null);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleClick = () => {
    console.log(`You clicked ${options[selectedIndex]}`);
    if (options[selectedIndex] === 'Preview and Generate Invoice') {
      // alert("modal");

    }
    else if (options[selectedIndex] === 'Print and Generate Invoice') {
      alert("Download pdf");
    }
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  return (
    <React.Fragment>
      {/* <ButtonGroup
        ref={anchorRef}
        variant="outlined"
        color="success"
        aria-label="split button"
      > */}
      <Button
        variant="outlined"
        color="success"
        disabled={performInvoiceToggele}
        onClick={handleClick} style={{ textTransform: 'uppercase' }}
        data-bs-toggle={options[selectedIndex] === 'Perform Invoice' ? 'modal' : undefined}
        data-bs-target={options[selectedIndex] === 'Perform Invoice' ? '#staticBackdrop' : undefined}
      >{options[selectedIndex]}</Button>
      {/* <IconButton
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onMouseDown={() => {
            actionRef.current = () => setOpen(!open);
          }}
          onKeyDown={() => {
            actionRef.current = () => setOpen(!open);
          }}
          onClick={() => {
            actionRef.current?.();
          }}
        >
          <ArrowDropDownIcon />
        </IconButton> */}
      {/* </ButtonGroup> */}
      <Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
        {options.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 2}
            selected={index === selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}
