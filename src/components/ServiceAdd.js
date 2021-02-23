import {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeServiceField, editService, addService, addServiceFailure, addServiceFinish } from '../actions/actionCreators';

function ServiceAdd(props) {
  const { history, match } = props;
  const { item, loading, loadingError, adding, addingError, finish } = useSelector(state => state.serviceAdd);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(editService(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (finish) {
      dispatch(addServiceFinish());
      history.push(process.env.PUBLIC_URL + '/services');      
    };
  // eslint-disable-next-line
  }, [finish]);

  const handleError = () => {
    dispatch(editService(match.params.id));
  }

  const handleChange = evt => {
    const { name, value } = evt.target;
    dispatch(changeServiceField(name, value));
  };

  const handleCancel = () => {
    history.push(process.env.PUBLIC_URL + '/services');
  }

  const handleSubmit = evt => {
    evt.preventDefault();
    const service = {
      id: item.id,
      name: item.name.trim(),
      price: typeof(item.price) === 'string' ? item.price.trim() : item.price,
      content: item.content.trim(),
    }

    if (!service.name) {
      dispatch(addServiceFailure('Поле "Название" не должно быть пустым'));
      return;
    }

    if (!service.price) {
      dispatch(addServiceFailure('В поле "Стоимость" должно быть целое положительное число без пробелов'));
      return;
    }

    service.price = Math.trunc(+service.price);

    if (isNaN(service.price) || service.price <= 0) {
      dispatch(addServiceFailure('В поле "Стоимость" должно быть целое положительное число без пробелов'));
      return;      
    } 

    dispatch(addService(service));
  }

  if (loadingError) {
    return (
      <>
        <p className="error">{loadingError}</p>
        <button className="error-button" onClick={handleError}>Попробовать ещё раз</button>
      </>
    )
  }

  if (loading) {
    return (
      <svg className="spinner ServiceAdd-spinner" viewBox="0 0 50 50">
        <circle className="spinner-circle ServiceAdd-spinner-circle" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    )
  }

  return (
    <form className="ServiceAdd" onSubmit={handleSubmit}>
      <label>
        Название
        <input name='name' disabled={adding} onChange={handleChange} value={item.name} />
      </label>
      <label>
        Стоимость
        <input name='price' disabled={adding} onChange={handleChange} value={item.price} />
      </label>
      <label>
        Описание
        <input name='content' disabled={adding} onChange={handleChange} value={item.content} />
      </label>
      <div className="ServiceAdd-buttons">
        <button 
          className={adding ? 'ServiceAdd-button-cancel button-disabled' : 'ServiceAdd-button-cancel'} 
          onClick={handleCancel} 
          disabled={adding}>
          Отмена
        </button>
        <button 
          className={adding ? 'ServiceAdd-button-save button-spinner' : 'ServiceAdd-button-save'} 
          type='submit' 
          disabled={adding}>
          {adding ? 'С' : 'Сохранить'}
          {adding &&
            <svg className="spinner ServiceAdd-button-spinner" viewBox="0 0 50 50">
              <circle className="spinner-circle ServiceAdd-button-spinner-circle" cx="25" cy="25" r="20" fill="none"></circle>
            </svg> 
          }
        </button>
      </div>
      {addingError && <p className="ServiceAdd-error">{addingError}</p>}
    </form>
  );
}

export default ServiceAdd;
