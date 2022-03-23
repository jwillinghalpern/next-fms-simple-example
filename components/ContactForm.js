import { useRef } from 'react';
import Button from './Button';
import { FormStyles } from './FormStyles';

export default function ContactForm({ handleChange, handleSubmit, fieldData }) {
  const formEl = useRef(null);
  const nameFirstEl = useRef(null);

  function onSubmit(e) {
    e.preventDefault();
    console.log('onSubmit');
    if (!formEl.current.checkValidity()) {
      return formEl.current.requestSubmit();
    }
    console.log('calling handleSubmit');
    handleSubmit();
  }

  return (
    <FormStyles>
      <form ref={formEl}>
        <label>
          First
          <input
            ref={nameFirstEl}
            type={'text'}
            name={'nameFirst'}
            placeholder={'First'}
            value={fieldData?.nameFirst || ''}
            required={true}
            onChange={handleChange}
          />
        </label>
        <label>
          Last
          <input
            type={'text'}
            name={'nameLast'}
            placeholder={'Last'}
            value={fieldData?.nameLast || ''}
            required={true}
            onChange={handleChange}
          />
        </label>
        <label>
          Company
          <input
            type={'text'}
            name={'nameCompany'}
            placeholder={'Last'}
            value={fieldData?.nameCompany || ''}
            required={true}
            onChange={handleChange}
          />
        </label>
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </form>
    </FormStyles>
  );
}
