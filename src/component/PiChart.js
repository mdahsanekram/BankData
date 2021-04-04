import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './CSS/Page.css';
import Data from './data.json';


class PiChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series: [],
        options: {
          chart: {
            width: 380,
            type: 'pie',
          },
          labels: ['Department 1', 'Department 2', 'Department 3', 'Department 4', 'Department 5'],
          responsive: [{
            breakpoint: 480,
            options: {
              chart: {
                width: 200
              },
              legend: {
                position: 'bottom'
              }
            }
          }],
          dataLabels: {
            enabled: true,
            formatter: function (val) {
              return (val).toFixed(0) + "%"
            },
            
      
          },
        },
      
      
      };

     
    }



    componentDidMount()
    {
        for(let i=0;i<Data.length;i++)
        {
          parseFloat(this.state.series.push(Data[i].Sales));
        }


    }
  

    render() {

      
      return (
        <>
       
      

  <div className="Margin">
 
<ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={450} />
</div>
</>


      );
    }
  }

  export default PiChart;
