import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectIsLoading,
  selectLoadMore,
  selectUsers,
} from '../../redux/selectors';
import { fetchUsers } from '../../redux/operations';
import { CardContainer, CardWrap } from './Tweets.styled';
import TweetCard from '../../components/TweetCard/TweetCard';
import ButtonLoad from '../../components/ButtonLoad/ButtonLoad';
import { resetUsers } from '../../redux/usersSlice';
import {Loader} from '../../components/Loader/Loader';

const Tweets = () => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (page === 1) {
      dispatch(resetUsers());
    }
    const abortController = new AbortController();

    dispatch(fetchUsers({ page, abortController }));
    return () => {
      abortController.abort();
    };
  }, [dispatch, page]);

  const users = useSelector(selectUsers);
  const canLoadMore = useSelector(selectLoadMore);
  const loading = useSelector(selectIsLoading);

  const loadMore = () => {
    setPage(prevState => {
      return prevState + 1;
    });
  };


  const showButton = canLoadMore && !loading && users.length > 0;
  return (
    <CardContainer>
         <CardWrap>
        {users.map(user => (
          <li key={user.id}>
            <TweetCard user={user}>{user}</TweetCard>
          </li>
        ))}
        {loading && <Loader />}
      </CardWrap>
      {showButton && <ButtonLoad onClick={loadMore} />}
    </CardContainer>
  );
};
export default Tweets;
