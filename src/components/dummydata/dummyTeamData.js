// DashboardPage, TeamProfilePage 더미 데이터

const teamData = {
  teams: [
    {
      code: 'kdt',
      name: '애는착해',
      role: '운영진',
      meetingTime: '주말 저녁',
      averageAge: 35,
      members: [
        { id: 1, name: '김정섭', level: '아마추어3', role: 'teamLeader', photo: '/images/img_profile_default.png' },
        { id: 2, name: '백준규', level: '아마추어2', role: 'teamMember', photo: '/images/img_profile_default.png' },
        { id: 3, name: '이초인', level: '루키', role: 'teamMember', photo: '/images/img_profile_default.png' },
      ],
      schedule: [],
      logo: '/images/dummyTeamLogo.png',
      userStatus: 'teamLeader'
    },
    {
      code: 'great',
      name: '위대한팀',
      role: '멤버',
      meetingTime: '평일 저녁',
      averageAge: 28,
      members: [
        { id: 1, name: '이영표', level: '세미프로1', role: 'teamMember', photo: '/images/img_profile_default.png' },
        { id: 2, name: '박지성', level: '세미프로2', role: 'teamMember', photo: '/images/img_profile_default.png' },
        { id: 3, name: '손흥민', level: '세미프로3', role: 'teamLeader', photo: '/images/img_profile_default.png' },
      ],
      schedule: [],
      logo: '/images/dummyTeamLogo.png',
      userStatus: 'teamMember'
    },
    {
      code: 'legend',
      name: '레전드FC',
      role: '멤버',
      meetingTime: '주말 오후',
      averageAge: 40,
      members: [
        { id: 1, name: '차범근', level: '세미프로1', role: 'teamLeader', photo: '/images/img_profile_default.png' },
        { id: 2, name: '박지성', level: '세미프로2', role: 'teamMember', photo: '/images/img_profile_default.png' },
        { id: 3, name: '김민재', level: '세미프로1', role: 'teamMember', photo: '/images/img_profile_default.png' },
      ],
      schedule: [],
      logo: '/images/dummyTeamLogo.png',
      userStatus: 'nonMember'
    },
  ],
};

export default teamData;
