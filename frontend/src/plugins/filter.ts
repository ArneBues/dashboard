import moment from 'moment';
import marked from 'marked';

const filter = {
  dateFormat(date: Date | string) {
    console.log(date);
    return moment(date).format('D-M-Y HH:mm:ss');
  },
  dateMonth(date: Date | string) {
    console.log(date);
    console.log('YO');
    return moment(date).format('MMMM YYYY');
  },
  formatMarked(text: string) {
    return marked(text);
  },
};

export default filter;
