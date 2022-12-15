import { Pagination } from 'react-bootstrap';

const Paginate = ({ pagination: paginationData, action }) => {
  const buttonClickHandler = (page) => {
    action(page);
  };

  return (
    <Pagination>
      {paginationData && paginationData.prev && (
        <Pagination.Item
          onClick={(e) => buttonClickHandler(paginationData.prev.page)}
        >
          <i className='fas fa-chevron-left'></i> Précédent
        </Pagination.Item>
      )}
      {paginationData && paginationData.next && (
        <Pagination.Item
          onClick={(e) => buttonClickHandler(paginationData.next.page)}
        >
          Suivant <i className='fas fa-chevron-right'></i>
        </Pagination.Item>
      )}
    </Pagination>
  );
};

export default Paginate;
