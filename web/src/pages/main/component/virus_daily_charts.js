import React, { Component } from "react";
import Charts from "./charts";
import { withStyles, Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import { injectIntl } from 'react-intl';

const styles = (theme) => ({
  root: {
    width: "100%",
    height: "100%",
    backgroundColor: "white"
  }
});

class VirusDailyPanel extends Component {
  render() {

    const { intl, classes, dailyData } = this.props;

    var area;
    if (dailyData
      && dailyData.data
      && dailyData.data.dailyTotal
      && dailyData.data.dailyTotal.dead) {
      var dead = dailyData.data.dailyTotal.dead;
      var deadArray = dead.map(item =>
        item.area
      );
      area = deadArray[0] + ' ' + intl.formatMessage({
        id: 'situation',
      });
    }

    return (
      <Box className={classes.root}>
        <Box pl={2} pt={1}>
          <Typography style={{ height: '20px', fontSize: 14 }}>{area}</Typography>
        </Box>
        <Charts dailyData={dailyData}></Charts>
      </Box>
    );
  }
}

const mapStateToProps = (state, onwProps) => ({
  dailyData: state.virusDailyReducer,
});

export default connect(
  mapStateToProps,
)(withStyles(styles)(injectIntl(VirusDailyPanel)));