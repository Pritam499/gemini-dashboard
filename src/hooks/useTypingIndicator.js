import { useSelector } from 'react-redux';

export default function useTypingIndicator() {
  return useSelector(state => state.messages.typing);
}
