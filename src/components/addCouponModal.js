import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { postCoupon } from '../api/api'
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles((theme) => ({
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export default function AddCouponModal({ open, setOpen,onFetch }) {
    const classes = useStyles();
    const [form, setForm] = useState({
        coupon: '',
    })
    const [loading, setLoading] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setLoading(true)
            var user = JSON.parse(localStorage.getItem('user'))
            const data = {
                coupon: form.coupon,
                postedBy: user.name
            }
            const newCoupon = await postCoupon(data)
            if (newCoupon) {
                setForm({
                    ...form,
                    coupon: '',
                })
                onFetch()
                handleClose()
            }
            setLoading(false)
        } catch (err) {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
    }
    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Slide in alert dialog
      </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">{"Add new Coupon"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        <form className={classes.form} onSubmit={handleSubmit} >
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="coupon"
                                label="Coupon"
                                name="coupon"
                                value={form.coupon}
                                onChange={handleChange}
                                autoFocus
                                multiline
                            />
                           

                            <Button
                                disabled={loading}
                                type="submit"
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Save
          </Button>

                        </form>

                    </DialogContentText>
                </DialogContent>

            </Dialog>
        </div>
    );
}