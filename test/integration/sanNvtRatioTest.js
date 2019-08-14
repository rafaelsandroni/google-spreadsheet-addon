const { testFieldTypes } = require('../helper.js')

const {
  testHandlesNullData,
  assertNumberOfRecords
} = require('../integration_helper.js')

const {
  slug,
  from,
  to,
  days,
  numberOfDays,
  formatDate
} = require('../setup.js')

describe('SAN_NVT_RATIO', () => {
  const expected = {
    date: 'string',
    nvtRatioTxVolume: 'number',
    nvtRatioCirculation: 'number'
  }

  const response = san.SAN_NVT_RATIO(slug, from, to)
  const headers = response[0]
  const results = response[1]

  testFieldTypes(results, expected)
  testHandlesNullData(
    'fetchNvtRatio',
    san.SAN_NVT_RATIO,
    slug,
    from,
    to)

  it('has proper headers', () => {
    const expectedHeaders = [
      'Date',
      'NVT Ratio Transaction Volume',
      'NVT Ratio Circulation'
    ]
    expect(headers).to.deep.equal(expectedHeaders)
  })

  it('returns a record per every day', () => {
    const results = san.SAN_NVT_RATIO(slug, from, to)

    assertNumberOfRecords(results, numberOfDays)

    for (let [index, day] of days.entries()) {
      expect(results[index + 1][0]).to.equal(formatDate(day))
    }
  })
})
