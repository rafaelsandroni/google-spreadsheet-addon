const { testFieldTypes } = require('../support/helper.js')
const { testHandlesNullData, assertNumberOfRecords } = require('../support/integrationHelper.js')

const {
  slug,
  from,
  to,
  days,
  numberOfDays,
  formatDate
} = require('../support/setup.js')

describe('SAN_ETH_SPENT_OVER_TIME', () => {
  const expected = {
    date: 'string',
    ethSpent: 'number'
  }

  const response = san.SAN_ETH_SPENT_OVER_TIME(slug, from, to)
  const headers = response[0]
  const results = response[1]
  testFieldTypes(results, expected)
  testHandlesNullData(
    'fetchEthSpentOverTime',
    san.SAN_ETH_SPENT_OVER_TIME,
    slug,
    from,
    to)

  it('has proper headers', () => {
    const expectedHeaders = ['Date', 'ETH Spent']
    expect(headers).to.deep.equal(expectedHeaders)
  })

  it('returns a record per every day', () => {
    const activities = san.SAN_ETH_SPENT_OVER_TIME(slug, from, to)

    assertNumberOfRecords(activities, numberOfDays)

    for (let [index, day] of days.entries()) {
      expect(activities[index + 1][0]).to.equal(formatDate(day))
    }
  })
})
