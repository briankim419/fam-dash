import React from 'react';
import send from '../../../../app/assets/images/send.png';

const TextFieldWithSubmit = props => {
  const sendLogo = require('../../../../app/assets/images/send.png');
  return (
    <div className='input-group '>
      <div className='inline-form'>
        <input
          className='input-group-field inline-form'
          name={props.name}
          onChange={props.handlerFunction}
          type='text'
          value={props.content}
          placeholder="Press Enter to submit" />
      </div>
    </div>
  );
}

export default TextFieldWithSubmit;
