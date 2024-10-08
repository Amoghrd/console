import * as React from 'react';
import { Split, SplitItem } from '@patternfly/react-core';
import { CheckIcon } from '@patternfly/react-icons/dist/esm/icons/check-icon';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { RootState } from '@console/internal/redux';
import { toggleCloudShellExpanded } from '../../redux/actions/cloud-shell-actions';
import { isCloudShellExpanded } from '../../redux/reducers/cloud-shell-selectors';
import useCloudShellAvailable from './useCloudShellAvailable';

type DispatchProps = {
  onClick: () => void;
};

type StateProps = {
  open?: boolean;
};

type Props = StateProps & DispatchProps & { className?: string };

const ClouldShellMastheadAction: React.FC<Props> = ({ onClick, className, open }) => {
  const terminalAvailable = useCloudShellAvailable();
  const { t } = useTranslation();
  if (!terminalAvailable) {
    return null;
  }
  return (
    <button
      className={className}
      type="button"
      onClick={onClick}
      data-tour-id="tour-cloud-shell-button"
      data-quickstart-id="qs-masthead-cloudshell"
    >
      <Split className="pf-v5-u-w-100">
        <SplitItem isFilled>{t('webterminal-plugin~OpenShift command line')}</SplitItem>
        {open ? (
          <SplitItem>
            <span
              style={{
                color: 'var(--pf-v5-global--active-color--100)',
                fontSize: 'var(--pf-v5-global--FontSize--xs)',
                paddingLeft: 'var(--pf-v5-global--spacer--md)',
              }}
            >
              <CheckIcon />
            </span>
          </SplitItem>
        ) : null}
      </Split>
    </button>
  );
};

const stateToProps = (state: RootState): StateProps => ({
  open: isCloudShellExpanded(state),
});

const dispatchToProps = (dispatch): DispatchProps => ({
  onClick: () => dispatch(toggleCloudShellExpanded()),
});

export default connect<StateProps, DispatchProps>(
  stateToProps,
  dispatchToProps,
)(ClouldShellMastheadAction);
