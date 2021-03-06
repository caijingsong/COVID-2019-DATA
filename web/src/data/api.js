import { Observable, from } from "rxjs";

import mock_data from "./mock_data";
import {currentLang} from "../locale/index"

const domain = "https://covid.hyn.space/api/";
// const domain = "http://10.10.1.115:3000/api/";

export const api = {
  requestDemoData() {
    return new Observable(observer => {
      setTimeout(() => {
        const ramdom = Math.random() >= 0;
        if (ramdom) {
          console.log("mock request success.");
          observer.next(mock_data.demo_data_success);
          observer.complete();
        } else {
          console.log("mock request fail.");
          observer.error(new Error("data request error"));
        }
      }, 1500);
    });
  },

  //each country virus status data list
  /* requstCountryVirusStatusOld() {
    //request mock
    return new Observable(observer => {
      setTimeout(() => {
        const ramdom = Math.random() >= 0;
        if (ramdom) {
          console.log("mock request success.");
          observer.next(mock_data.mock_virus_status_list);
          observer.complete();
        } else {
          console.log("mock request fail.");
          observer.error(new Error("data request error"));
        }
      }, 500);
    });
  }, */

  requstCountryVirusStatus() {
    // todo: test
    /* return new Observable(observer => {
      setTimeout(() => {
        const ramdom = Math.random() >= 0;
        if (ramdom) {
          console.log("mock request success");
          observer.next(mock_data.mock_virus_status_list);
          observer.complete();
        } else {
          console.log("mock request fail.");
          observer.error(new Error("data request error"));
        }
      }, 500);
    }); */

    return from(
      fetch(
        `${domain}data/country/latest?lang=${currentLang()}` /* , {credentials: 'no-cors'} */
      ).then(res => res.json())
    );
  },

  uploadPoiInfo(data) {
    return from(
      fetch(`${domain}covid-collector/event/collector`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        })
      }).then(res => res.json())
    );
  },

  updatePoiInfo(data) {
    console.log("request updatePoiInfo api " + JSON.stringify(data));
    return from(
      fetch(`${domain}covid-collector/event/detail/${data.id}`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        })
      }).then(res => res.json())
    );
  },

  reportPoiInfo(data) {
    console.log("request reportPoiInfo api " + JSON.stringify(data));
    return from(
      fetch(`${domain}covid-collector/event/detail/${data.id}/delete-mark`, {
        body: JSON.stringify(data),
        method: "POST",
        headers: new Headers({
          "content-type": "application/json"
        })
      }).then(res => res.json())
    );
  },

  //daily status data for charts.
  requestDailyVirusStatus(area) {
    // todo: test
    /* return new Observable(observer => {
      setTimeout(() => {
        const ramdom = Math.random() >= 0;
        if (ramdom) {
          console.log("mock request success");
          observer.next(mock_data.mock_virus_status_daily_tick);
          observer.complete();
        } else {
          console.log("mock request fail.");
          observer.error(new Error("data request error"));
        }
      }, 500);
    }); */

    return from(
      fetch(`${domain}data/country/daily/${area}?lang=${currentLang()}`).then(res => res.json())
    );
  },

  requestVirusInfo(pid) {
    return from(
      fetch(`${domain}covid-collector/event/detail/${pid}`).then(res =>
        res.json()
      )
    );
  }
};
