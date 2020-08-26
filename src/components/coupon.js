import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import DeleteIcon from '@material-ui/icons/Delete';
import Tooltip from '@material-ui/core/Tooltip';
import { deleteCoupon } from '../api/api'
const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});

export default function FeaturedPost(props) {
  const classes = useStyles();
  const { coupon } = props;
  const dateToYMD=(date)=> {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}
const onDeleteCoupon=async(id)=>{
  try {
    const DeletedCoupon = await deleteCoupon(id)
    if (DeletedCoupon) {
      props.onGetCoupons()
    }
  } catch (err) {

  }
}
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card className={classes.card}>
          <div className={classes.cardDetails}>
            <CardContent>
              <Typography component="h2" variant="h5">
                {coupon.postedBy}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {dateToYMD(new Date(coupon.createdAt))}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {coupon.coupon}
              </Typography>
              <Tooltip onClick={()=>onDeleteCoupon(coupon.id)} title="Delete Coupon">
            <DeleteIcon/>
            </Tooltip>
            </CardContent>
          </div>
          {/* <Hidden xsDown>
            <CardMedia className={classes.cardMedia} image={post.image} title={post.imageTitle} />
          </Hidden> */}
        </Card>
      </CardActionArea>
    </Grid>
  );
}