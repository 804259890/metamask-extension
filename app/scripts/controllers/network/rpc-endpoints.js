// TODO:ADD BY PLATON
const { PLATON_TEST,PLATON_AMIGO,PLATON_BATALA } = require('./enums')

function getRPCEndpoints(network) {
	switch (network) {
    case PLATON_TEST:
      return ['http://192.168.120.88:6789']
    case PLATON_AMIGO:
      return ['http://54.252.202.130:6789/']
    case PLATON_BATALA:
      return ['http://54.169.225.255:6789/']
    default:
      return []
	}
}

module.exports = { getRPCEndpoints }

