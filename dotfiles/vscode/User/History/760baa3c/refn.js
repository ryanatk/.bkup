import withStep from '../withStep';
import Edit from './Edit';
import Display from './Display';

const BoothQuestions = () => {
  return withStep(Display, Edit, 'Booth Work');
};

export default BoothQuestions;
