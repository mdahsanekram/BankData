import React from 'react';
import './CSS/Page.css';
import Data from './data.json';
import { Table } from 'react-bootstrap';
import axios from 'axios';

class TableData extends React.Component {
  constructor(props)
  {
      super(props);

      this.state  = {
        data :[]
      }
  }


  componentDidMount()
    {       

        axios.get('https://vast-shore-74260.herokuapp.com/banks?city=MUMBAI')

            .then((response)=>{             
				        
                this.setState({
                  
                  
                });
                console.log("hii");
                
            }).catch(function(error)
            {
                alert(error);
            })
            .then(function () {
              console.log("response");
              });

    }

    render() {
      
        return (
            <div className="Margin">
            

    <table className="table table-bordered">
    <thead>  
                        <tr>
                          <th scope="col">Department Name </th>
                          <th scope="col">Sales</th>
                          <th scope="col">Percentage</th>
                          
                        </tr>
                      </thead>
                      <tbody>
                        
    {
      Data.map(post=>{return(
        
        <tr>
          <td>{post.Department_Name}</td>
          <td>{post.Sales}</td>
          <td>{post.Percentage}</td>
          </tr>
        

      )
      }
      )
      
    }
    </tbody>
    </table>
    

            </div>
        );
    }
}
export default TableData;