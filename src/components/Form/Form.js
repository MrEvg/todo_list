import './Form.css';
import {useState} from "react";

export default function Form({putTodo}) {
  const [value, setValue] = useState('');

  return (
    <form className='form'
          onSubmit={e => {
            e.preventDefault();
            putTodo(value);
            setValue('');
          }}>
      <input
        type='text'
        placeholder='Введите текст...'
        className='input'
        value={value}
        onChange={e => setValue(e.target.value)}/>
    </form>
  )
}