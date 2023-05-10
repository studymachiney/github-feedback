import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo('en');

export default function getFormattedTime(time: string) {
  return timeAgo.format(new Date(time));
}
