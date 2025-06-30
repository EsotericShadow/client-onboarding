import { render, screen } from '@testing-library/react';
import MultiStepForm from '@/components/MultiStepForm';

describe('MultiStepForm', () => {
  it('renders the first step', () => {
    render(<MultiStepForm />);
    expect(screen.getByPlaceholderText('Client Name')).toBeInTheDocument();
  });
});
