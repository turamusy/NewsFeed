export default class R {
  static servers = {
    nytimes: 'https://api.nytimes.com',
  };
  static colors = {
    white: '#FFFFFF',
    black: '#000000',
    aquamarineBlue: '#75d0e3',
    blueCyan: '#75c0e3',
    solitude: '#F2F4F9',
    cornflowerBlue: '#5983FF',
    mediumBlue: '#1C1CD4',
    zanah: '#B5BDB5',
    regentGrey: '#717d80',
  };
  static string = {
    general: {
      section: 'Section',
      title: 'NYT News Feed',
      by: 'By:',
      published: 'Published:',
      unknown: 'unknown',
    },
    list: {
      empty: 'List is empty',
    },
    error: {
      noСonnection: 'Waiting for network',
    },
  };
  static url = {
    topStories: (section: string) => {
      return `/svc/topstories/v2/${section}.json`;
    },
  };
}
