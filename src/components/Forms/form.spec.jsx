import {render,waitFor} from '../../test-utils';
import userEvent from '@testing-library/user-event'

import Forms from './index';

test('disables button when submitting form', async () => {
  const {getByRole} = render(<Forms />)

  const input = getByRole('textbox')
  expect(input).toHaveAttribute('value','jimmy')
  
  const button = getByRole('button')
  expect(button).toHaveAttribute('type','submit')
  expect(button).not.toHaveAttribute('disabled')
  
  userEvent.click(button)

  await waitFor(() =>{
    expect(button).toHaveAttribute('disabled')
  })
})
