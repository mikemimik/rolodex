import React from 'react';

import { Tab } from '@material-ui/core';
import {
  PersonPin as PersonPinIcon,
  ChromeReaderMode as ReaderIcon,
  AddCircle as AddCircleIcon,
} from '@material-ui/icons';

export const CohortTabs = [
  <Tab key='view' label='View Cohorts' value='view' icon={<ReaderIcon />} />,
  <Tab key='create' label='Add Cohort' value='create' icon={<AddCircleIcon />} />,
  <Tab key='three' label='Item Three' value='three' icon={<PersonPinIcon />} />,
];

export function handleTabChange (event, value) {
  console.group('CohortTabs::handleTabChange');
  console.log('this:', this);
  console.groupEnd();
  const { history } = this.props;
  switch (value) {
    case 'view': return history.push({ pathname: '/cohorts' });
    case 'create': return history.push({ pathname: '/cohorts/create' });
    default: {}
  }
}
