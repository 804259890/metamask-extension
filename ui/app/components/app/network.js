// TODO:MODIFY BY PLATON
const Component = require('react').Component
const PropTypes = require('prop-types')
const h = require('react-hyperscript')
const connect = require('react-redux').connect
const classnames = require('classnames')
const inherits = require('util').inherits
const NetworkDropdownIcon = require('./dropdowns/components/network-dropdown-icon')

Network.contextTypes = {
  t: PropTypes.func,
}

module.exports = connect()(Network)


inherits(Network, Component)

function Network () {
  Component.call(this)
}

Network.prototype.render = function () {
  const props = this.props
  const context = this.context
  const networkNumber = props.network
  let providerName, providerNick, providerUrl
  try {
    providerName = props.provider.type
    providerNick = props.provider.nickname || ''
    providerUrl = props.provider.rpcTarget
  } catch (e) {
    providerName = null
  }
  const providerId = providerNick || providerName || providerUrl || null
  let iconName
  let hoverText

  if (providerName === 'platon_test') {
    hoverText = context.t('platon_test')
    iconName = 'platon-test-network'
  } else if (providerName === 'platon_amigo') {
    hoverText = context.t('platon_amigo')
    iconName = 'platon-amigo-network'
  } else if (providerName === 'platon_batala') {
    hoverText = context.t('platon_batala')
    iconName = 'platon-batala-network'
  } else {
    hoverText = providerId
    iconName = 'private-network'
  }

  return (
    h('div.network-component.pointer', {
      className: classnames({
        'network-component--disabled': this.props.disabled,
        'platon-test-network': providerName === 'platon_test',
        'platon-amigo-network': providerName === 'platon_amigo',
        'platon-batala-network': providerName === 'platon_batala',
      }),
      title: hoverText,
      onClick: (event) => {
        if (!this.props.disabled) {
          this.props.onClick(event)
        }
      },
    }, [
      (function () {
        switch (iconName) {
          case 'platon-test-network':
            return h('.network-indicator', [
              h(NetworkDropdownIcon, {
                backgroundColor: '#ebb33f', // $tulip-tree
                nonSelectBackgroundColor: '#ecb23e',
                loading: networkNumber === 'loading',
              }),
              h('.network-name', context.t('platon_test')),
              h('i.fa.fa-chevron-down.fa-lg.network-caret'),
            ])
          case 'platon-amigo-network':
            return h('.network-indicator', [
              h(NetworkDropdownIcon, {
                backgroundColor: '#ebb33f', // $tulip-tree
                nonSelectBackgroundColor: '#ecb23e',
                loading: networkNumber === 'loading',
              }),
              h('.network-name', context.t('platon_amigo')),
              h('i.fa.fa-chevron-down.fa-lg.network-caret'),
            ])
          case 'platon-batala-network':
            return h('.network-indicator', [
              h(NetworkDropdownIcon, {
                backgroundColor: '#ebb33f', // $tulip-tree
                nonSelectBackgroundColor: '#ecb23e',
                loading: networkNumber === 'loading',
              }),
              h('.network-name', context.t('platon_batala')),
              h('i.fa.fa-chevron-down.fa-lg.network-caret'),
            ])
          default:
            return h('.network-indicator', [
              networkNumber === 'loading'
              ? h('span.pointer.network-indicator', {
                style: {
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'row',
                },
                onClick: (event) => this.props.onClick(event),
              }, [
                h('img', {
                  title: context.t('attemptingConnect'),
                  style: {
                    width: '27px',
                  },
                  src: 'images/loading.svg',
                }),
              ])
              : h('i.fa.fa-question-circle.fa-lg', {
                style: {
                  margin: '10px',
                  color: 'rgb(125, 128, 130)',
                },
              }),

              h('.network-name', providerNick || context.t('privateNetwork')),
              h('i.fa.fa-chevron-down.fa-lg.network-caret'),
            ])
        }
      })(),
    ])
  )
}
