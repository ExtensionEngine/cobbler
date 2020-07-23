import format from 'date-fns/format';
import Vue from 'vue';

Vue.filter('formatDate', date => format(new Date(date), 'yyyy-MM-dd'));
