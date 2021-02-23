import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import React from 'react'

interface props {
	/**
	 * Defines if the dialog is shown
	 */
	open: boolean;
	/**
	 * This event is fires when the user want's to remove the object
	 */
	onRemove: () => void;
	/**
	 * This event is fires when the user want's to keep the object
	 */
	onKeep: () => void;
}

/**
 * This dialog warns the user that there are unsaved changed on the
 * current page
 */
const RemoveDialog = ({open, onRemove, onKeep}: props) => {
	return (
		<Dialog open={open}>
			<DialogTitle>Remove warning</DialogTitle>
			<DialogContent>
				<DialogContentText>
					You are on the point to remove something.
					This can not be undone!
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onRemove}>
					Remove
				</Button>
				<Button onClick={onKeep}>
					Keep
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default RemoveDialog
