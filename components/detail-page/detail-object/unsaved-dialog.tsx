import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from '@material-ui/core'
import React from 'react'

interface props {
	/**
	 * Defines if the dialog is shown
	 */
	open: boolean;
	/**
	 * This event is fires when the user want's to discard the changes
	 */
	onLeave: () => void;
	/**
	 * This event is fires when the user want's to stay on the current page
	 */
	onStay: () => void;
}

/**
 * This dialog warns the user that there are unsaved changed on the
 * current page
 */
const UnsavedDialog = ({open, onLeave, onStay}: props) => {
	return (
		<Dialog open={open}>
			<DialogTitle>Unsaved changes</DialogTitle>
			<DialogContent>
				<DialogContentText>
					There are unsaved changed on this page
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onLeave}>
					Leave
				</Button>
				<Button onClick={onStay}>
					Stay
				</Button>
			</DialogActions>
		</Dialog>
	)
}

export default UnsavedDialog
