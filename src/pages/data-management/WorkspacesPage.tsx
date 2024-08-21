import BasePage from './components/BasePage';

const rows = [
  {
    key: '1',
    name: 'Workspace1',
    default: 'Yes',
    isolated: 'No',
  },
  {
    key: '2',
    name: 'Workspace2',
    default: 'No',
    isolated: 'Yes',
  },
  {
    key: '3',
    name: 'Workspace3',
    default: 'No',
    isolated: 'No',
  },
  {
    key: '4',
    name: 'Workspace4',
    default: 'Yes',
    isolated: 'Yes',
  },
  {
    key: '5',
    name: 'Workspace5',
    default: 'No',
    isolated: 'No',
  },
  {
    key: '6',
    name: 'Workspace6',
    default: 'Yes',
    isolated: 'No',
  },
  {
    key: '7',
    name: 'Workspace7',
    default: 'No',
    isolated: 'Yes',
  },
  {
    key: '8',
    name: 'Workspace8',
    default: 'Yes',
    isolated: 'No',
  },
  {
    key: '9',
    name: 'Workspace9',
    default: 'No',
    isolated: 'Yes',
  },
  {
    key: '10',
    name: 'Workspace10',
    default: 'No',
    isolated: 'No',
  },
];

export default function DataSourcesPage() {
  return <BasePage rows={rows} />;
}
