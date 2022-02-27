import DashboardIcon from '@material-ui/icons/Dashboard';
import ListAltIcon from '@material-ui/icons/ListAlt';
import PeopleIcon from '@material-ui/icons/People';
import ChatIcon from '@material-ui/icons/Chat';
import FileCopyIcon from '@material-ui/icons/FileCopy';

import * as entities from './entity';
import * as titles from './entity-title';

import Dashboard from '../containers/dashboard/DashboardContainer';
import Reports from '../containers/reports/ReportsContainer';
import MusicReports from '../containers/music-reports/MusicReportsContainer';
import Students from '../containers/students/StudentsContainer';
import Texts from '../containers/texts/TextsContainer';
import ExcelImport from '../containers/excel-import/ExcelImportContainer';

export default [
  [
    {
      path: '/dashboard',
      component: Dashboard,
      icon: DashboardIcon,
      title: titles.DASHBOARD,
      props: { entity: entities.DASHBOARD, title: titles.DASHBOARD },
    },
    {
      path: '/reports',
      component: Reports,
      icon: ListAltIcon,
      title: titles.REPORTS,
      props: { entity: entities.REPORTS, title: titles.REPORTS },
    },
    {
      path: '/music-reports',
      component: MusicReports,
      icon: ListAltIcon,
      title: titles.MUSIC_REPORTS,
      props: { entity: entities.MUSIC_REPORTS, title: titles.MUSIC_REPORTS },
    },
    {
      path: '/students',
      component: Students,
      icon: PeopleIcon,
      title: titles.STUDENTS,
      props: { entity: entities.STUDENTS, title: titles.STUDENTS },
    },
    {
      path: '/texts',
      component: Texts,
      icon: ChatIcon,
      title: titles.TEXTS,
      props: { entity: entities.TEXTS, title: titles.TEXTS },
    },
  ],
  [{ path: '/excel-import', component: ExcelImport, icon: FileCopyIcon, title: 'העלאת קבצים' }],
];
