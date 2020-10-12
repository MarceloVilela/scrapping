import MeetUpData from '../infra/crosscutting/schemas/MeetUpData';

export default interface IMeetUpRepository {
  listMeetUp(): Promise<MeetUpData[]>;
};
