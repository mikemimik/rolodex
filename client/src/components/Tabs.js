import React from 'react';
import { get } from 'lodash';

import { Tab } from '@material-ui/core';
import {
  ChromeReaderMode as ReaderIcon,
  AddCircle as AddCircleIcon,
  Person as PersonIcon,
} from '@material-ui/icons';

export const Tabs = {
  cohorts: {
    view: {
      component: <Tab key='cohorts.view' label='View Cohorts' value='cohorts.view' icon={<ReaderIcon />} />,
      pathname: () => '/cohorts',
    },
    create: {
      component: <Tab key='cohorts.create' label='Add Cohort' value='cohorts.create' icon={<AddCircleIcon />} />,
      pathname: () => '/cohorts/create',
    },
  },
  students: {
    view: {
      component: <Tab key='students.view' label='View Students' value='students.view' icon={<PersonIcon />} />,
      pathname: ({ cohortId }) => `/cohorts/${cohortId}`,
    },
    create: {
      component: <Tab key='students.create' label='Add Student' value='students.create' icon={<AddCircleIcon />} />,
      pathname: () => '/students/create',
    },
  },
  projects: {
    create: {
      component: <Tab key='project.create' label='Add Project' value='projects.create' icon={<AddCircleIcon />} />,
      pathname: () => '/projects/create',
    },
  },
};

export function listTabs (paths) {
  return paths.map((path) => {
    return get(Tabs, `${path}.component`);
  });
}

export function handleTabChange (event, value) {
  const { history, match: { params } } = this.props;
  const pathname = get(Tabs, `${value}.pathname`)(params);
  return history.push({ pathname });
}
