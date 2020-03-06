const initialState = {
  baseModalOpen: false,
  resourcesLoading: false,
  resources: null,
  selectedResource: null,
  swipeBack: false,
  onSwipe: false,
  adHocMeetingTimes: [
    {
      display: '15 minutes',
      value: 15,
    },
    {
      display: '30 minutes',
      value: 30,
    },
    {
      display: '1 hour',
      value: 60,
    },
  ],
};

export default initialState;
