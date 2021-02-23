import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchServices, deleteService } from '../actions/actionCreators';

function ServiceList(props) {
  const { history } = props;
  const { items, loading, error, deletingFinish } = useSelector(state => state.serviceList);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchServices(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (deletingFinish) {
      fetchServices(dispatch);
    }
  }, [dispatch, deletingFinish]);

  const handleError = () => {
    fetchServices(dispatch);
  }

  const handleEdit = id => {
    history.push(process.env.PUBLIC_URL + '/services/' + id);
  }

  const handleRemove = id => {
    deleteService(dispatch, id);
  }

  if (error) {
    return (
      <>
        <p className="error">{error}</p>
        <button className="error-button" onClick={handleError}>Попробовать ещё раз</button>
      </>
    )
  }

  if (loading) {
    return (
      <svg className="spinner ServiceList-spinner" viewBox="0 0 50 50">
        <circle className="spinner-circle ServiceList-spinner-circle" cx="25" cy="25" r="20" fill="none"></circle>
      </svg>
    )
  }

  return (
    <ul className="ServiceList">
      {items.map(o => (
        <li className="ServiceList-item" key={o.id}>
          <p className="ServiceList-text">{`${o.name}: ${o.price} руб.`}</p>
          {!(o.deleting || o.isDeleted) && <button className="ServiceList-button-edit" onClick={() => handleEdit(o.id)}>&#x270E;</button>}
          <button 
            className={o.deleting || o.isDeleted ? 'ServiceList-button-delete button-spinner' : 'ServiceList-button-delete'} 
            disabled={o.deleting || o.isDeleted}
            onClick={() => handleRemove(o.id)}>
            &#x2715;
            {(o.deleting || o.isDeleted) &&
              <svg className="spinner ServiceList-button-spinner" viewBox="0 0 50 50">
                <circle className="spinner-circle ServiceList-button-spinner-circle" cx="25" cy="25" r="20" fill="none"></circle>
              </svg> 
            }
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ServiceList;
