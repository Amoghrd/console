import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { devNavigationMenu } from '@console/dev-console/integration-tests/support/constants/global';
import { app, navigateTo } from '@console/dev-console/integration-tests/support/pages/app';
import { topologyPage } from '@console/topology/integration-tests/support/pages/topology/topology-page';
import { topologySidePane } from '@console/topology/integration-tests/support/pages/topology/topology-side-pane-page';
import { pageTitle } from '../../constants';

Given('user is at the Topology page', () => {
  navigateTo(devNavigationMenu.Topology);
  topologyPage.verifyTopologyPage();
});

When('user navigates to Topology page', () => {
  navigateTo(devNavigationMenu.Topology);
  app.waitForLoad();
  topologyPage.verifyTopologyPage();
});

Then('user is able to see workload {string} in topology page list view', (workloadName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(workloadName);
});

Then('user is able to see workload {string} in topology page', (workloadName: string) => {
  topologyPage.verifyWorkloadInTopologyPage(workloadName);
});

Then('user will be redirected to Topology page', () => {
  topologyPage.verifyTopologyPage();
});

When('user clicks on workload {string}', (workloadName: string) => {
  topologyPage.waitForLoad();
  topologyPage.componentNodeClick(workloadName);
});

Then('user can see sidebar opens with Resources tab selected by default', () => {
  topologySidePane.verifySelectedTab('Resources');
});

Then('side bar is displayed with the pipelines section', () => {
  topologySidePane.verifyTab('Resources');
  topologySidePane.verifySection(pageTitle.PipelineRuns);
});
