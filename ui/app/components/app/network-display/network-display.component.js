// TODO:MODIFIED BY PLATON
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  PLATON_TEST_CODE,
  PLATON_AMIGO_CODE,
  PLATON_BATALA_CODE,
} from '../../../../../app/scripts/controllers/network/enums'

const networkToClassHash = {
  [PLATON_TEST_CODE]: 'platon_test',
  [PLATON_AMIGO_CODE]: 'platon_amigo',
  [PLATON_BATALA_CODE]: 'platon_batala',
}

export default class NetworkDisplay extends Component {
  static defaultProps = {
    colored: true,
  }

  static propTypes = {
    colored: PropTypes.bool,
    network: PropTypes.string,
    provider: PropTypes.object,
  }

  static contextTypes = {
    t: PropTypes.func,
  }

  renderNetworkIcon () {
    const { network } = this.props
    const networkClass = networkToClassHash[network]

    return networkClass
      ? <div className={`network-display__icon network-display__icon--${networkClass}`} />
      : <div
          className="i fa fa-question-circle fa-med"
          style={{
            margin: '0 4px',
            color: 'rgb(125, 128, 130)',
          }}
        />
  }

  render () {
    const { colored, network, provider: { type, nickname } } = this.props
    const networkClass = networkToClassHash[network]

    return (
      <div
        className={classnames('network-display__container', {
          'network-display__container--colored': colored,
          ['network-display__container--' + networkClass]: colored && networkClass,
        })}
      >
        {
          networkClass
            ? <div className={`network-display__icon network-display__icon--${networkClass}`} />
            : <div
                className="i fa fa-question-circle fa-med"
                style={{
                  margin: '0 4px',
                  color: 'rgb(125, 128, 130)',
                }}
              />
        }
        <div className="network-display__name">
          { type === 'rpc' && nickname ? nickname : this.context.t(type) }
        </div>
      </div>
    )
  }
}
