let initState = {
  name: '京程一灯',
  description: '冲击月薪3万',
};
export default function infoReducer(state, action) {
  if (!state) {
    state = initState;
  }
  switch (action.type) {
    case 'SET_NAME':
      return {
        ...state,
        name: action.name,
      };
    case 'SET_DECREMENT':
      return {
        ...state,
        description: action.description,
      };
    default:
      return state;
  }
}
