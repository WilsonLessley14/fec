import React from 'react';
import token from '../../../config.js';

import axios from 'axios';

const API_URL = 'https://app-hrsei-api.herokuapp.com/api/fec2/hr-rpp/';

class StyleSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  styleButtonClick(e) {
    e.preventDefault();
    var styleClicked = this.findStyle(e.target.alt);
    this.props.updateGallery(styleClicked);
  }

  findStyle(name) {
    var returnStyle = 'error';
    this.props.styles.forEach(style => {
      if (style.name === name) {
        returnStyle = style;
      }
    });
    return returnStyle;
  }

  render() {
    var stylesArray = [];
    for (var i = 0; i < this.props.styles.length / 4; i++) {
      stylesArray[i] = this.props.styles.slice(i * 4, (i+1) * 4);
    }

    return (
      <div className="style-selector">
        <table>
          <tbody>{
              stylesArray.map(arrayOf4Styles => (
                <tr>{
                  arrayOf4Styles.map(style => (
                    <td onClick={this.styleButtonClick.bind(this)}>
                      <div className="mask">
                        <img className="style-button" alt={style.name} src={style.photos[0].thumbnail_url}></img>
                      </div>
                    </td>
                  ))
                }</tr>
              ))
            }</tbody>
        </table>

      </div>
    )
  }
};

/*

*/


export default StyleSelector;