import React from 'react';
import './bootstrap.min.css';

function TableRows(props) {
    const emotionsArray = Object.entries(props.emotions);
    const emotions = emotionsArray.map((emotion) =>
        <tr>
            <td>emotion[0]</td>
            <td>emotion[1]</td>
        </tr>
    );
    return ({emotions});
}

class EmotionTable extends React.Component {
    render() {
      return (  
        <div>
          {/*You can remove this line and the line below. */}
          {JSON.stringify(this.props.emotions)}
          <table className="table table-bordered">
            <tbody>
            {
               <TableRows prop={this.props} />
            }
            </tbody>
          </table>
          </div>
          );
        }
    
}
export default EmotionTable;
