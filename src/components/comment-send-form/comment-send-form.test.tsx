import {describe, expect} from 'vitest';
import {withHistory, withStore} from '../../mocks/mock-component.tsx';
import {initialUserState} from '../../store/user-process/user-process.slice.ts';
import {render, screen} from '@testing-library/react';
import {CommentSendForm} from './comment-send-form.tsx';
import {initialLoadingState} from '../../store/loading-process/loading-process.slice.ts';
import {Authorization} from '../../const.ts';


describe('Component: CommentSendForm', () => {
  it('should render correctly when user authorized', () => {
    const commentSendFormElementId = 'comment-send-form-element';
    const {withStoreComponent} = withStore(
      <CommentSendForm/>,
      {USER: {...initialUserState, authStatus: Authorization.Auth}, LOADERS: initialLoadingState});

    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.getByTestId(commentSendFormElementId)).toBeInTheDocument();
  });

  it('shouldn\'t render when user non-authorized', () => {
    const commentSendFormElementId = 'comment-send-form-element';
    const {withStoreComponent} = withStore(
      <CommentSendForm/>,
      {USER: {...initialUserState, authStatus: Authorization.NoAuth}, LOADERS: initialLoadingState});
    const preparedComponent = withHistory(withStoreComponent);
    render(preparedComponent);

    expect(screen.queryByTestId(commentSendFormElementId)).not.toBeInTheDocument();
  });
});
