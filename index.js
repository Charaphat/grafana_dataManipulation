import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { InfluxDB, Point } from '@influxdata/influxdb-client'

const app = express();
const PORT = process.env.PORT || 5000;
const url = "https://ap-southeast-2-1.aws.cloud2.influxdata.com/"
const token = "2wk4KC5YfC9vd_dfQ5tVPx5B-4uRe80wPDc_VGZLXIVbRM6pNY89lru3BIHcRjbj88Aj9eIWV5Qq0CRGi3lH5g=="
const org = "charaphat"
const bucket = "input_grafana"

function apiProcess(value) {
    const influxDB = new InfluxDB({ url, token })
    const writeApi = influxDB.getWriteApi(org, bucket)
    const point1 = new Point('Light').floatField('value', value);
    writeApi.writePoint(point1);
    writeApi.close().then(() => {console.log('WRITE FINISHED');});
    return;
}

app.use(bodyParser.json());

var data =[];
app.use(cors());
app.get('/',(req,res) =>{ 
    res.send(data);



});

app.post('/',(req,res) => {
    const grafana = req.body.Light;
    data.push(grafana);
    res.send(data);
    apiProcess(grafana);
    
})




app.listen(PORT, () => console.log(`Server Running on port: http://localhost:${PORT}`));
