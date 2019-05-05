import React from 'react';
import { get } from 'lodash';

import { Tab } from '@material-ui/core';
import {
  ChromeReaderMode as ReaderIcon,
  AddCircle as AddCircleIcon,
} from '@material-ui/icons';

export const Tabs = {
  cohorts: {
    view: {
      component: <Tab key='cohorts.view' label='View Cohorts' value='cohorts.view' icon={<ReaderIcon />} />,
      pathname: '/cohorts',
    },
    create: {
      component: <Tab key='cohorts.create' label='Add Cohort' value='cohorts.create' icon={<AddCircleIcon />} />,
      pathname: '/cohorts/create',
    },
  },
  students: {
    create: {
      component: <Tab key='students.create' label='Add Student' value='students.create' icon={<AddCircleIcon />} />,
      pathname: '/students/create',
    },
  },
};

export function listTabs (paths) {
  console.group('Tabs::listTabs');
  console.log('paths:', paths);
  console.groupEnd();
  return paths.map((path) => {
    return get(Tabs, `${path}.component`);
  });
}

export function handleTabChange (event, value) {
  const { history } = this.props;
  const pathname = get(Tabs, `${value}.pathname`);
  return history.push({ pathname });
}
