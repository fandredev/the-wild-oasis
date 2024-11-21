import styled from 'styled-components';
import { useUser } from '../hooks/auth/useUser';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  // 1. Load the authentication user
  const { isLoading, isAuthenticated, isFetching } = useUser();

  // 2. If the user is not authenticated, redirect to the login page
  useEffect(() => {
    if (!isAuthenticated && !isLoading && !isFetching) navigate('/login');
  }, [isAuthenticated, isLoading, navigate, isFetching]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 3. If the user is authenticated, render the app

  if (isAuthenticated) return children;
}
