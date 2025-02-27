// material-ui
import { Button, Dialog, DialogContent, Stack, Typography } from '@mui/material';

// project import
import Avatar from 'components/@extended/Avatar';
import { PopupTransition } from 'components/@extended/Transitions';

// assets
import { DeleteFilled } from '@ant-design/icons';
import { dispatch } from 'store';
import { deleteApplicationDetails } from 'store/reducers/application-details';



// types
interface Props {
    title: string;
    open: boolean;
    handleClose: (status: boolean) => void;
    id: number | null
}

// ==============================|| ProvinceCode - DELETE ||============================== //

export default function DeleteApplicationDetails({ title, open, handleClose, id }: Props) {
    return (
        <Dialog
            open={open}
            onClose={() => handleClose(false)}
            keepMounted
            TransitionComponent={PopupTransition}
            maxWidth="xs"
            aria-labelledby="column-delete-title"
            aria-describedby="column-delete-description"
        >
            <DialogContent sx={{ mt: 2, my: 1 }}>
                <Stack alignItems="center" spacing={3.5}>
                    <Avatar color="error" sx={{ width: 72, height: 72, fontSize: '1.75rem' }}>
                        <DeleteFilled />
                    </Avatar>
                    <Stack spacing={2}>
                        <Typography variant="h4" align="center">
                            Are you sure you want to delete?
                        </Typography>
                        <Typography align="center">
                            By deleting
                            <Typography variant="subtitle1" component="span">
                                {' '}
                                "{title}"{' '}
                            </Typography>
                            Fuel Type Details will be removed from the database.
                        </Typography>
                    </Stack>

                    <Stack direction="row" spacing={2} sx={{ width: 1 }}>
                        <Button fullWidth onClick={() => handleClose(false)} color="secondary" variant="outlined">
                            Cancel
                        </Button>
                        <Button fullWidth color="error" variant="contained" onClick={() => {
                            dispatch(deleteApplicationDetails(id!))
                            handleClose(true)
                        }} autoFocus>
                            Delete
                        </Button>
                    </Stack>
                </Stack>
            </DialogContent>
        </Dialog>
    );
}
