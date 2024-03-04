import { useContext } from 'react';
import { AppContext } from 'src/App';
import { PagesContext } from '../../../../pages';
import { CalendarPageModel, ErrorReason, Hint, HoverPopover, Icon } from 'src/shared/index';
import { StatementSelectorProps } from './types';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import { EDIT_PAGE_ERRORS, EditModalContext } from '../../constants';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function StatementSelector({page, setEditMode, setPage, statements, isCategorySelected, setError}: StatementSelectorProps) {
  const { notificationService } = useContext(AppContext);
  const { actionService } = useContext(PagesContext);
  const { theme } = useContext(AppContext);
  const {formControl} = useContext(EditModalContext)

  const save = () => {
    const value = formControl.children.statement.value;
    if (value) {
      const statement = statements.find(statement => statement.id === value)
      const updatedPage: CalendarPageModel = {
        ...page,
        statement: {
          value: statement.value,
          id: statement.id,
        }
      }
      actionService.http.checkPageFields(updatedPage)
        .then(() => {
          setPage(updatedPage)
          setEditMode(false)
        })
        .catch((error: ErrorReason) => {
          if(error.message === "INVALID") {
            formControl.setIsValid(EDIT_PAGE_ERRORS[error.cause.code])
            notificationService.show({...error.cause?.payload, onClose: () => setError(null)})
          }
        })
    } else {
      setPage({...page, statement: null})
      setEditMode(false)
    }
  }

  const revert = () => {
    formControl.children.statement.reset();
    setEditMode(false)
  }

  return (
    <>
      <div className='flex justify-between gap-4'>
        <div className='grow'>
          <HoverPopover rendredComponent={ !isCategorySelected ? <Hint message="Please select category"></Hint> : <></> }>
            <FormControl fullWidth sx={{maxWidth: 550}}>
              <InputLabel id="select-tatement-label">Select Statement</InputLabel>
              <Select
                {...formControl.registerInput('statement')} 
                labelId="select-tatement-label"
                label="Select Statement"
                MenuProps={MenuProps}
              >
                <MenuItem key={'none'} value={null}>None</MenuItem>
                {statements.map((option) => (
                  <MenuItem key={option.id} value={option.id}>{option.value}</MenuItem>
                ))}
              </Select>
              <FormHelperText error={true}>{formControl.children.statement.errorMessage}</FormHelperText>
            </FormControl>
          </HoverPopover>
        </div>
        <div className='flex'>
          <HoverPopover rendredComponent={<Hint message="Apply changes"></Hint>}>
            <Icon onClick={save} type='check' size={7} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
          </HoverPopover>
          <HoverPopover rendredComponent={<Hint message="Revert changes"></Hint>}>
            <Icon onClick={revert} type='cross' size={7} color={theme === 'light' ? 'gray-800' : 'zinc-300'}></Icon>
          </HoverPopover>
        </div>
      </div>
    </>
  )
}
